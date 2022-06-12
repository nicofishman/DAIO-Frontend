import { authorize } from 'react-native-app-auth';
import axios from 'axios';
import querystring from 'querystring';

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

const checkRefreshToken = async (refreshDate, refreshToken) => {
    if (new Date() > refreshDate) {
        const newRefreshTokenResponse = await refreshLogin(refreshToken);
        return {
            accessToken: newRefreshTokenResponse.access_token,
            refreshToken: newRefreshTokenResponse.refresh_token,
            refreshDate: new Date(new Date().getTime() + (newRefreshTokenResponse.expires_in * 1000)),
        };
    }
    return {
        refreshToken: refreshToken,
    };
}


export const searchTrack = async (query, accessToken) => {
    const result = await axios.get(`http://daio-backend.herokuapp.com/spotify/song/${query}`, {
        headers: {
            accessToken: accessToken,
        },
    });
    return result.data;
}

export const searchArtist = async (query, accessToken) => {
    const result = await axios.get(`http://daio-backend.herokuapp.com/spotify/artist/${query}`, {
        headers: {
            accessToken: accessToken,
        },
    });
    return result.data;
}

export const getSpotifyCredentials = async () => {
    const result = await axios.get('http://daio-backend.herokuapp.com/credentials/spotify')
    return result.data
}

export const getFirebaseCredentials = async () => {
    const result = await axios.get('http://daio-backend.herokuapp.com/credentials/firebase');
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
    const creds = await getSpotifyCredentials();
    const url = 'https://accounts.spotify.com/api/token';
    const postData = {
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
    }
    const options = {
        headers: {
            'Authorization': 'Basic ' + creds.encodedClientIdAndSecret,
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

export const getUserData = async (accessToken) => {
    const userData = await axios.get('http://daio-backend.herokuapp.com/spotify/me', { headers: { accessToken: accessToken } });
    return userData.data;
}

export const getUserTopArtists = async (accessToken) => {
    const userTopArtists = await axios.get('http://daio-backend.herokuapp.com/spotify/topartists', { headers: { accessToken: accessToken } });
    return userTopArtists.data;
}

export const getUserTopTracks = async (accessToken) => {
    const userTopTracks = await axios.get('http://daio-backend.herokuapp.com/spotify/toptracks', { headers: { accessToken: accessToken } });
    return userTopTracks.data;
}

export const getUsersAndInfo = async (accessToken) => {
    const result = await axios.get('http://daio-backend.herokuapp.com/database/getusersandinfo', { headers: { accessToken: accessToken } });
    return result.data;
}

export const getUsers = async () => {
    const result = await axios.get('http://daio-backend.herokuapp.com/database/getusers');
    return result.data;
}

export const addUser = async (userData) => {
    try {
        await axios.post('http://daio-backend.herokuapp.com/database/adduser', userData);
    } catch (error) {
        console.log(error);
    }
}