import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { getSpotifyCredentials, getUserData, getUsers } from '../Handlers/AuthHandler'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useRegisterContext } from '../Context/RegisterContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SpotifyLogin from '../Components/SpotifyLogin';
import querystring from 'querystring';

async function save(key, value) {
    await AsyncStorage.setItem(key, value);
}

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};


export default function Login({ navigation }) {
    const [data, setData] = useState('User is not logged in');
    const [accessToken, setAccessToken] = useState(undefined);
    const [beingCalled, setBeingCalled] = useState(false)

    const [credentials, setCredentials] = useState({})
    const [loading, setLoading] = useState(true)

    const { setSpotifyId, handleChangeNombre } = useRegisterContext()

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
        // console.log(makeRedirectUri(spotifyCredentials.redirectUri))
        const access_token = await AsyncStorage.getItem('access_token');
        if (access_token) {
            setAccessToken(access_token)
        } else {
            setAccessToken(undefined)
        }
    }, []);

    // const logOut = async () => {
    //     console.log('Logging out');
    //     await AsyncStorage.setItem('access_token', '').then(() => {
    //         setAccessToken(undefined);
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }

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
            console.log(responseCode.params.code);
            const { code } = responseCode.params;
            const { access_token, refresh_token, expires_in } = await getTokenWithCode(code);
            console.log({ access_token, refresh_token, expires_in })
            await save('access_token', access_token)
            await save('refresh_token', refresh_token)
            await save('refresh_date', (new Date().getTime() + expires_in * 1000).toString())
            const userData = await getUserData(access_token);
            await save('spotify_id', userData.id);
            setAccessToken(access_token)
            handleLogin(access_token)
        }
    }, [responseCode]);

    const handleLogin = async (token) => {
        const user = await getUserData(token);
        console.log(user.display_name);
        const usersInDb = await getUsers();
        const isUserInDb = usersInDb.some(userInDb => userInDb.spotifyId === user.id);
        if (!isUserInDb) {
            //TODO: SETSPOTIFYID ESTA VACIO
            console.log('User is not in db', user.id);
            setSpotifyId(user.id)
            handleChangeNombre(user.id)
            navigation.navigate('Register', { screen: 'RegisterFirst' }, { user, accessToken });
        } else {
            navigation.navigate('Main', { screen: 'Match' });
        }
    }

    return (
        <>
            {
                loading ?
                    <ActivityIndicator style={{ flex: 2.3 }} size={70} color='#e38889' />
                    :
                    (
                        <View style={styles.container}>
                            <SpotifyLogin title='Spotify Login'/>
                        </View>
                    )
            }

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
