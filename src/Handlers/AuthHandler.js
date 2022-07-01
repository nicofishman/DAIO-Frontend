import { authorize } from 'react-native-app-auth';
import axios from 'axios';
import querystring from 'querystring';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const checkRefreshToken = async () => {
    const refreshDate = await AsyncStorage.getItem('refresh_date');
    if (new Date() > refreshDate) {
        console.log('refreshing');
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        const newRefreshTokenResponse = await refreshLogin(refreshToken);
        console.log('???', newRefreshTokenResponse);
        // await AsyncStorage.setItem('refresh_token', newRefreshTokenResponse.refresh_token);
        await AsyncStorage.setItem('access_token', newRefreshTokenResponse.access_token);
        await AsyncStorage.setItem('refresh_date', new Date(new Date().getTime() + (newRefreshTokenResponse.expires_in * 1000)).toISOString());
        return {
            accessToken: newRefreshTokenResponse.access_token,
            refreshToken: newRefreshTokenResponse.refresh_token,
            refreshDate: new Date(new Date().getTime() + (newRefreshTokenResponse.expires_in * 1000)),
        };
    } else {
        console.log('??', {
            accessToken: await AsyncStorage.getItem('access_token'),
            refreshToken: await AsyncStorage.getItem('refresh_token'),
            refreshDate: await AsyncStorage.getItem('refresh_date'),
        });
        return {
            accessToken: await AsyncStorage.getItem('access_token'),
            refreshToken: await AsyncStorage.getItem('refresh_token'),
            refreshDate: await AsyncStorage.getItem('refresh_date'),
        }
    }
}


export const searchTrack = async (query) => {
    const { accessToken: accessTokenRes } = await checkRefreshToken();
    const result = await axios.get(`http://daio-backend.herokuapp.com/spotify/song/${query}`, {
        headers: {
            accessToken: accessTokenRes,
        },
    });
    return result.data;
}

export const searchArtist = async (query) => {
    const { accessToken: accessTokenRes } = await checkRefreshToken();
    const result = await axios.get(`http://daio-backend.herokuapp.com/spotify/artist/${query}`, {
        headers: {
            accessToken: accessTokenRes,
        },
    });
    return result.data;
}

export const getSpotifyCredentials = async () => {
    const result = await axios.get('http://daio-backend.herokuapp.com/credentials/spotify')
    return result.data
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

export const getUserData = async () => {
    const { accessToken: accessTokenRes } = await checkRefreshToken();
    console.log('?', accessTokenRes);
    const userData = await axios.get('http://daio-backend.herokuapp.com/spotify/me', { headers: { accessToken: accessTokenRes } });
    return userData.data;
}

export const getUserTopArtists = async () => {
    const { accessToken: accessTokenRes } = await checkRefreshToken();
    const userTopArtists = await axios.get('http://daio-backend.herokuapp.com/spotify/topartists', { headers: { accessToken: accessTokenRes } });
    return userTopArtists.data;
}

export const getUserTopTracks = async () => {
    const { accessToken: accessTokenRes } = await checkRefreshToken();
    const userTopTracks = await axios.get('http://daio-backend.herokuapp.com/spotify/toptracks', { headers: { accessToken: accessTokenRes } });
    return userTopTracks.data;
}

export const getUsersAndInfo = async () => {
    const { accessToken: accessTokenRes } = await checkRefreshToken();
    const result = await axios.get('http://daio-backend.herokuapp.com/database/getusersandinfo', { headers: { accessToken: accessTokenRes } });
    return result.data;
}

export const getUsers = async () => {
    const result = await axios.get('http://daio-backend.herokuapp.com/database/getusers');
    return result.data;
}

export const addUser = async (userData) => {
    // console.log(userData);
    try {
        await axios.post('http://daio-backend.herokuapp.com/database/adduser', userData);
    } catch (error) {
        console.log(error);
    }
}

export const getNotInteractedUsers = async (userId) => {
    const { accessToken: accessTokenRes } = await checkRefreshToken();
    // console.log('\n' + accessTokenRes + '\n');
    const result = await axios.get('http://daio-backend.herokuapp.com/match/dameusuarios', { headers: { accessToken: accessTokenRes, userId: userId } });
    // console.log(result.data);
    return result.data;
}

export const addInteraction = async (interactionData) => {
    console.log(interactionData);
    try {
        const res = await axios.post('http://daio-backend.herokuapp.com/database/addinteraction', interactionData);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}