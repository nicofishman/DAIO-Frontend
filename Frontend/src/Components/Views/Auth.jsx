import React, { useState, useEffect } from 'react';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import { Button, Text } from 'react-native';
import { getSpotifyCredentials, getUserData } from '../../Handlers/AuthHandler'


// Endpoint
const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function App() {
    const [credentials, setCredentials] = useState({})
    useEffect(async () => {
        const credentials = await getSpotifyCredentials()
        setCredentials(credentials)
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

    const [data, setData] = useState({})
    useEffect(async () => {
        if (response?.type === 'success') {
            const { access_token } = response.params;
            const data = await getUserData(access_token);
            setData(data);
        }
    }, [response]);


    return (
        <>
            <Button
                disabled={!request}
                title="Login"
                onPress={() => {
                    promptAsync();
                }}
            />

            <Text>{JSON.stringify(data)}</Text>
        </>
    );
}