import querystring from 'querystring';

import { View, StyleSheet, Image, Dimensions, StatusBar, Text} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import axios from 'axios';
import { useFonts, Quicksand_400Regular } from '@expo-google-fonts/quicksand';

import ButtonCreateAccount from '../Components/Common/ButtonCreateAccount';
import ButtonLoginAccount from '../Components/Common/ButtonLoginAccount';
import { useRegisterContext } from '../Context/RegisterContext';
import { getSpotifyCredentials, getUserData, getUsers } from '../Handlers/AuthHandler';

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token'
};

const CreateOrSignInAcount = ({ navigation }) => {
    const [accessToken, setAccessToken] = useState(undefined);

    const [credentials, setCredentials] = useState({});

    const { setSpotifyId, handleChangeNombre, setProgressBar } = useRegisterContext();

    const [_requestCode, responseCode, spotifyPromptAsync] = useAuthRequest(
        {
            responseType: 'code',
            clientId: credentials.clientId,
            scopes: ['user-read-email', 'playlist-modify-public', 'user-top-read'],
            // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
            // this must be set to false
            usePKCE: false,
            redirectUri: makeRedirectUri(credentials.redirectUri)
        },
        discovery
    );

    useEffect(async () => {
        const spotifyCredentials = await getSpotifyCredentials();

        setCredentials(spotifyCredentials);
        const accessToken = await AsyncStorage.getItem('access_token');

        console.log('access_token');
        if (accessToken !== undefined) {
            setAccessToken(accessToken);
        } else {
            setAccessToken(undefined);
        }
    }, []);

    const getTokenWithCode = async (code) => {
        const url = discovery.tokenEndpoint;
        const postData = {
            code,
            redirect_uri: makeRedirectUri(credentials.redirectUri),
            grant_type: 'authorization_code'
        };
        const options = {
            headers: {
                Authorization: 'Basic ' + credentials.encodedClientIdAndSecret,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const responseToken = await axios.post(url, querystring.stringify(postData), options)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error.response.data);
            });

        return responseToken;
    };

    useEffect(async () => {
        if (responseCode?.type === 'success') {
            const { code } = responseCode.params;
            const { access_token: accessToken, refresh_token: refreshToken, expires_in: expiresIn } = await getTokenWithCode(code);
            console.log('access_token', accessToken);
            await AsyncStorage.setItem('access_token', accessToken);
            await AsyncStorage.setItem('refresh_token', refreshToken);
            await AsyncStorage.setItem('refresh_date', (new Date().getTime() + expiresIn * 1000).toString());
            const userData = await getUserData();

            await AsyncStorage.setItem('spotify_id', userData.id);
            setAccessToken(accessToken);
            handleLogin(accessToken);
        }
    }, [responseCode]);

    const handleLogin = async (token) => {
        const user = await getUserData(token);
        const usersInDb = await getUsers();
        const isUserInDb = usersInDb.some(userInDb => userInDb.spotifyId === user.id);

        console.log('db', isUserInDb);
        if (!isUserInDb) {
            // TODO: SETSPOTIFYID ESTA VACIO
            console.log('User is not in db', user.id);
            setSpotifyId(user.id);
            handleChangeNombre(user.id);
            setProgressBar(0);
            navigation.navigate('Register', { screen: 'RegisterFirst' }, { user, accessToken });
        } else {
            navigation.navigate('Main', { screen: 'Match' });
        }
    };

    const [loaded] = useFonts({
        Quicksand_400Regular
    });

    if (!loaded) {
        return null;
    }

    // const ToLogin = () => {
    //     navigation.navigate('Login')
    // }

    // const ToCreateAccount = () => {
    //     navigation.navigate('Login')
    // }

    return (
        <View style={styles.container}>
            <View style={{ width: windowWidth, alignItems: 'center', justifyContent: 'center', marginBottom: windowHeight*.3 }}>
                <Image source={require('../Assets/Common/logoDAIO.png')} style={styles.logo} />
                <Image source={require('../Assets/register/createOrSignInAcountBackground1.png')} style={styles.backgroundImg1} />
                <Image source={require('../Assets/register/createOrSignInAcountBackground2.png')} style={styles.backgroundImg2} />
            </View>

            <Text style={{ width: windowWidth * 0.75, fontSize: 12, fontFamily: 'Quicksand_400Regular', marginBottom: windowHeight*.04 }}>
                <Text>Al apretar "Crear Cuenta" o "Iniciar Sesion", lo redirigirá a </Text>
                <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>iniciar sesion con Spotify</Text>
                <Text>.</Text>
            </Text>
            <ButtonCreateAccount onPress={() => spotifyPromptAsync()} />
            <ButtonLoginAccount onPress={() => spotifyPromptAsync()} />
            <StatusBar
                backgroundColor={'transparent'}
                barStyle="dark-content"
            />
        </View>
    );
};

export default CreateOrSignInAcount;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    logo: {
        resizeMode: 'contain',
        top: 100,
        width: 160,
    },
    backgroundImg1: {
        position: 'absolute',
        zIndex: -10,
        resizeMode: 'cover',
        width: windowWidth
    },
    backgroundImg2: {
        position: 'absolute',
        zIndex: -10,
        resizeMode: 'cover',
        width: windowWidth,
        top: 310
    }
});
