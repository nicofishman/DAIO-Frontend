import { authorize, refresh } from 'react-native-app-auth';
import axios from 'axios';

const getAuthConfig = async () => {
    const credentials = await getSpotifyCredentials();
    console.log(credentials.redirectUri)
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
    const result = await axios.get('http://192.168.0.15:3000/credentials/spotify')
    return result.data
}

export const getFirebaseCredentials = async () => {
    const result = await axios.get('http://192.168.0.15:3000/credentials/firebase');
    return result.data;
}

export const onLogin = async () => {
    const authConfig = await getAuthConfig();
    try {
        const result = await authorize(authConfig);
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
    const userData = await axios.get('http://192.168.0.15:3000/spotify/me', { headers: { accessToken: accessToken } });
    return userData.data;
}

export const getUserTopArtists = async (accessToken) => {
    const userTopArtists = await axios.get('http://192.168.0.15:3000/spotify/topartists', { headers: { accessToken: accessToken } });
    return userTopArtists.data;
}

export const getUserTopTracks = async (accessToken) => {
    const userTopTracks = await axios.get('http://192.168.0.15:3000/spotify/toptracks', { headers: { accessToken: accessToken } });
    return userTopTracks.data;
}

export const addUser = async (userData) => {
    try {
        await axios.post('http://192.168.0.15:3000/database/adduser', userData);
    } catch (error) {
        console.log(error);
    }
}