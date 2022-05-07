import React, { useState, useEffect } from 'react';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import { Button, Text } from 'react-native';
import { getSpotifyCredentials, getUserData, getUserTopArtists } from '../../Handlers/AuthHandler'
import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key, setData, setUserTopArtists) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        const data = await getUserData(result);
        setData(data);
        const topArtists = await getUserTopArtists(result);
        setUserTopArtists(topArtists)
        return result;
    } else {
        return null;
    }
}

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};


export default function App() {
    const [data, setData] = useState('User is not logged in');
    const [userTopArtists, setUserTopArtists] = useState([]);
    const [accessToken, setAccessToken] = useState(undefined);


    const [credentials, setCredentials] = useState({})
    useEffect(async () => {
        const credentials = await getSpotifyCredentials()
        setCredentials(credentials)
        const access_token = await getValueFor('access_token', setData, setUserTopArtists);
        if (access_token) {
            setAccessToken(access_token)
        } else {
            setAccessToken(undefined)
        }
    }, []);
    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: credentials.clientId,
            scopes: ['user-read-email', 'playlist-modify-public'],
            // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
            // this must be set to false
            usePKCE: false,
            redirectUri: makeRedirectUri({
                scheme: 'your.app'
            }),
        },
        discovery
    );

    useEffect(async () => {
        if (response?.type === 'success') {
            console.log('success', response.params.accessToken);
            const { access_token } = response.params;
            await save('access_token', access_token)
            setAccessToken(access_token)
            const data = await getUserData(access_token);
            setData(data);
        }
    }, [request]);


    return (
        <>
            {accessToken !== undefined ?
                (
                    <>

                        <Text>{data.display_name}</Text>
                        <Text>{JSON.stringify(data)}</Text>
                        <Text>{JSON.stringify(userTopArtists)}</Text>
                    </>
                ) :
                <Button
                    disabled={!request}
                    title="Login"
                    onPress={() => {
                        promptAsync();
                    }}
                />
            }

        </>
    );
}