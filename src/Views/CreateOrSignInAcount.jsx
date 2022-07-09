import { View, Text, StyleSheet, Image, Dimensions, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import ButtonCreateAccount from '../Components/Common/ButtonCreateAccount';
import ButtonLoginAccount from '../Components/Common/ButtonLoginAccount';
import querystring from 'querystring';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRegisterContext } from '../Context/RegisterContext';
import { getSpotifyCredentials, getUserData, getUsers } from '../Handlers/AuthHandler';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import axios from 'axios'
import { useFonts } from 'expo-font';

async function save(key, value) {
    await AsyncStorage.setItem(key, value);
}

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const CreateOrSignInAcount = ({ navigation }) => {
    const [accessToken, setAccessToken] = useState(undefined);

    const [credentials, setCredentials] = useState({})

    const { setSpotifyId, handleChangeNombre, setProgressBar } = useRegisterContext()

    const [requestCode, responseCode, spotifyPromptAsync] = useAuthRequest(
        {
            responseType: "code",
            clientId: credentials.clientId,
            scopes: ['user-read-email', 'playlist-modify-public', 'user-top-read'],
            // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
            // this must be set to false
            usePKCE: false,
            redirectUri: makeRedirectUri(credentials.redirectUri),
        },
        discovery
    );
    useEffect(async () => {
        const spotifyCredentials = await getSpotifyCredentials();
        setCredentials(spotifyCredentials)
        const access_token = await AsyncStorage.getItem('access_token');
        if (access_token) {
            setAccessToken(access_token)
        } else {
            setAccessToken(undefined)
        }
    }, []);

    const getTokenWithCode = async (code) => {
        const url = discovery.tokenEndpoint;
        const postData = {
            code: code,
            redirect_uri: makeRedirectUri(credentials.redirectUri),
            grant_type: 'authorization_code',
        }
        const options = {
            headers: {
                'Authorization': 'Basic ' + credentials.encodedClientIdAndSecret,
                'Content-Type': 'application/x-www-form-urlencoded',
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
    }

    useEffect(async () => {
        if (responseCode?.type === 'success') {
            const { code } = responseCode.params;
            const { access_token, refresh_token, expires_in } = await getTokenWithCode(code);
            await AsyncStorage.setItem('access_token', access_token);
            await AsyncStorage.setItem('refresh_token', refresh_token);
            await AsyncStorage.setItem('refresh_date', (new Date().getTime() + expires_in * 1000).toString());
            const userData = await getUserData(access_token);
            await AsyncStorage.setItem('spotify_id', userData.id);
            setAccessToken(access_token)
            handleLogin(access_token)
        }
    }, [responseCode]);

    const handleLogin = async (token) => {
        const user = await getUserData(token);
        const usersInDb = await getUsers();
        const isUserInDb = usersInDb.some(userInDb => userInDb.spotifyId === user.id);
        if (!isUserInDb) {
            //TODO: SETSPOTIFYID ESTA VACIO
            console.log('User is not in db', user.id);
            setSpotifyId(user.id)
            handleChangeNombre(user.id)
            setProgressBar(0)
            navigation.navigate('Register', { screen: 'RegisterFirst' }, { user, accessToken });
        } else {
            navigation.navigate('Main', { screen: 'Match' });
        }
    }

    const [loaded] = useFonts({
        QuicksandLight: require('../../assets/fonts/Quicksand/Quicksand-Light.ttf'),
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
            <View style={{ width: windowWidth, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../Assets/Common/logoDAIO.png')} style={styles.logo} />
                <Image style={styles.backgroundImg1} source={require('../Assets/register/createOrSignInAcountBackground1.png')} />
                <Image style={styles.backgroundImg2} source={require('../Assets/register/createOrSignInAcountBackground2.png')} />
            </View>

            <View style={{ top: 180 }}>
                <Text style={{ width: windowWidth * 0.75, left: 10, fontSize: 12, fontFamily: 'QuicksandLight' }}>
                    <Text>Al apretar "Crear Cuenta" o "Iniciar Sesion", está aceptando nuestros </Text>
                    <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>terminos y condiciones</Text>
                    <Text>. En estos dejamos en claro todos los robos de datos y actividades inmorales contra su persona.</Text>
                </Text>
            </View>
            <View style={{ position: 'absolute', bottom: 80 }}>
                <ButtonCreateAccount onPress={() => spotifyPromptAsync()}></ButtonCreateAccount>
                <ButtonLoginAccount onPress={() => spotifyPromptAsync()}></ButtonLoginAccount>
            </View>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={'transparent'}
            />
        </View>
    )
}

export default CreateOrSignInAcount

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
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
        width: windowWidth,
    },
    backgroundImg2: {
        position: 'absolute',
        zIndex: -10,
        resizeMode: 'cover',
        width: windowWidth,
        top: 310
    },
})