import querystring from 'querystring';

import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useRegisterContext } from '../Context/RegisterContext';
import { getSpotifyCredentials, getUserData, getUsers } from '../Handlers/AuthHandler';
import SpotifyLogin from '../Components/SpotifyLogin';

async function save (key, value) {
    await AsyncStorage.setItem(key, value);
}

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token'
};

export default function Login ({ navigation }) {
    const [accessToken, setAccessToken] = useState(undefined);

    const [credentials, setCredentials] = useState({});
    const [loading, _setLoading] = useState(true);

    const { setSpotifyId, handleChangeNombre } = useRegisterContext();

    const [_requestCode, responseCode, _spotifyPromptAsync] = useAuthRequest(
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

        if (accessToken) {
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

            await save('access_token', accessToken);
            await save('refresh_token', refreshToken);
            await save('refresh_date', (new Date().getTime() + expiresIn * 1000).toString());
            const userData = await getUserData(accessToken);

            await save('spotify_id', userData.id);
            setAccessToken(accessToken);
            handleLogin(accessToken);
        }
    }, [responseCode]);

    const handleLogin = async (token) => {
        const user = await getUserData(token);
        const usersInDb = await getUsers();
        const isUserInDb = usersInDb.some(userInDb => userInDb.spotifyId === user.id);

        if (!isUserInDb) {
            // TODO: SETSPOTIFYID ESTA VACIO
            setSpotifyId(user.id);
            handleChangeNombre(user.id);
            navigation.navigate('Register', { screen: 'RegisterFirst' }, { user, accessToken });
        } else {
            navigation.navigate('Main', { screen: 'Match' });
        }
    };

    return (
        <>
            {
                loading
                    ? <ActivityIndicator color='#e38889' size={70} style={{ flex: 2.3 }} />
                    : (
                        <View style={styles.container}>
                            <SpotifyLogin title='Spotify Login' />
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
        justifyContent: 'center'
    }
});
