import { getSpotifyCredentials, getUserData, getUsers } from '../Handlers/AuthHandler'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useRegisterContext } from '../Context/RegisterContext';
import { View, Text, StyleSheet, Button } from 'react-native';
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

    const [credentials, setCredentials] = useState({})

    const { setSpotifyId, handleChangeNombre } = useRegisterContext()

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


    const logOut = async () => {
        console.log('Logging out');
        await AsyncStorage.setItem('access_token', '').then(() => {
            setAccessToken(undefined);
        }).catch(err => {
            console.log(err);
        });
    }

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
            setSpotifyId(user.id)
            handleChangeNombre(user.id)
            navigation.navigate('RegisterFirst', { user, accessToken });
        } else {
            navigation.navigate('Match');
        }
    }


    return (
        <>
            {accessToken && data ?
                (
                    <View style={styles.container}>
                        <Text>{JSON.stringify(data, null, "\t")}</Text>
                        <SpotifyLogin title='Log Out' fnOnPress={logOut} />
                        <Button title='Match' onPress={handleLogin} />
                    </View>
                ) :
                <View style={styles.container}>
                    <SpotifyLogin title='Spotify Login' fnOnPress={spotifyPromptAsync} />
                </View>
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
