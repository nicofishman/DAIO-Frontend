import { authorize, refresh } from 'react-native-app-auth';
import axios from 'axios';

const getAuthConfig = async () => {
    const credentials = await getSpotifyCredentials();
    const spotifyAuthConfig = {
        clientId: credentials.clientId,
        clientSecret: credentials.clientSecret,
        redirectUrl: credentials.redirectUri,
        scopes: [
            'playlist-read-private',
            'playlist-modify-public',
            'playlist-modify-private',
            'user-library-read',
            'user-library-modify',
            'user-top-read',
        ],
        serviceConfiguration: {
            authorizationEndpoint: 'https://accounts.spotify.com/authorize',
            tokenEndpoint: 'https://accounts.spotify.com/api/token',
        },
    };
    return spotifyAuthConfig;
}

export const getSpotifyCredentials = async () => {
    const result = await axios.get('http://192.168.0.15:3000/credentials')
    return result.data
}

export const onLogin = async () => {
    const authConfig = await getAuthConfig();
    try {
        const result = await authorize(authConfig);
        console.log(result);
        alert(JSON.stringify(result));
        return result;
    } catch (error) {
        console.log(JSON.stringify('error' + error));
    }
}

const refreshLogin = async (refreshToken) => {
    const authConfig = await getAuthConfig();
    const result = await refresh(authConfig, {
        refreshToken: refreshToken,
    });
    return result;
}

export const getUserData = async (accessToken) => {
    console.log('accessToken: ' + accessToken);
    const userData = await axios.get('http://192.168.0.15:3000/spotify/me', { headers: { accessToken: accessToken } });
    return userData.data;
}