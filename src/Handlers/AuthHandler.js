import querystring from 'querystring';

import { authorize } from 'react-native-app-auth';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAuthConfig = async () => {
    const credentials = await getSpotifyCredentials();

    console.log(credentials.redirectUri);
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
            'user-top-read'
        ],
        serviceConfiguration: {
            authorizationEndpoint: 'https://accounts.spotify.com/authorize',
            tokenEndpoint: 'https://accounts.spotify.com/api/token'
        }
    };

    return spotifyAuthConfig;
};

const checkRefreshToken = async () => {
    const refreshDate = await AsyncStorage.getItem('refresh_date');

    if (new Date() > refreshDate) {
        console.log('refreshing');
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        const newRefreshTokenResponse = await refreshLogin(refreshToken);

        // await AsyncStorage.setItem('refresh_token', newRefreshTokenResponse.refresh_token);
        await AsyncStorage.setItem('access_token', newRefreshTokenResponse.access_token);
        await AsyncStorage.setItem('refresh_date', new Date(new Date().getTime() + (newRefreshTokenResponse.expires_in * 1000)).toISOString());

        return {
            accessToken: newRefreshTokenResponse.access_token,
            refreshToken: newRefreshTokenResponse.refresh_token,
            refreshDate: new Date(new Date().getTime() + (newRefreshTokenResponse.expires_in * 1000))
        };
    } else {
        return {
            accessToken: await AsyncStorage.getItem('access_token'),
            refreshToken: await AsyncStorage.getItem('refresh_token'),
            refreshDate: await AsyncStorage.getItem('refresh_date')
        };
    }
};

export const searchTrack = async (query) => {
    const { accessToken: accessTokenRes } = await checkRefreshToken();
    const result = await axios.get(`http://daio-backend.herokuapp.com/spotify/song/${query}`, {
        headers: {
            accessToken: accessTokenRes
        }
    });

    return result.data;
};

export const searchArtist = async (query) => {
    const { accessToken: accessTokenRes } = await checkRefreshToken();
    const result = await axios.get(`http://daio-backend.herokuapp.com/spotify/artist/${query}`, {
        headers: {
            accessToken: accessTokenRes
        }
    });

    return result.data;
};

export const getSpotifyCredentials = async () => {
    const result = await axios.get('http://daio-backend.herokuapp.com/credentials/spotify');

    return result.data;
};

export const onLogin = async () => {
    const authConfig = await getAuthConfig();

    try {
        const result = await authorize(authConfig);

        alert(JSON.stringify(result));

        return result;
    } catch (error) {
        console.log(JSON.stringify('error' + error));
    }
};

const refreshLogin = async (refreshToken) => {
    const creds = await getSpotifyCredentials();
    const url = 'https://accounts.spotify.com/api/token';
    const postData = {
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
    };
    const options = {
        headers: {
            Authorization: 'Basic ' + creds.encodedClientIdAndSecret,
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

export const getUserData = async () => {
    const { accessToken: accessTokenRes } = await checkRefreshToken();
    const userData = await axios.get('http://daio-backend.herokuapp.com/spotify/me', { headers: { accessToken: accessTokenRes } });
    return userData.data;
};

export const getUserById = async (id) => {
    const userData = await axios.get(`http://daio-backend.herokuapp.com/database/getusersandinfo/${id}`);

    return userData.data;
};

export const getUserTopArtists = async () => {
    const { accessToken: accessTokenRes } = await checkRefreshToken();
    const userTopArtists = await axios.get('http://daio-backend.herokuapp.com/spotify/topartists', { headers: { accessToken: accessTokenRes } });

    return userTopArtists.data;
};

export const getUserTopTracks = async () => {
    const { accessToken: accessTokenRes } = await checkRefreshToken();
    const userTopTracks = await axios.get('http://daio-backend.herokuapp.com/spotify/toptracks', { headers: { accessToken: accessTokenRes } });

    return userTopTracks.data;
};

export const getUsersAndInfo = async () => {
    const { accessToken: accessTokenRes } = await checkRefreshToken();
    const result = await axios.get('http://daio-backend.herokuapp.com/database/getusersandinfo', { headers: { accessToken: accessTokenRes } });

    return result.data;
};

export const getUsers = async () => {
    const result = await axios.get('http://daio-backend.herokuapp.com/database/getusers');

    return result.data;
};

export const addUser = async (userData) => {
    const { accessToken: accessTokenRes } = await checkRefreshToken();

    try {
        await axios.post('http://daio-backend.herokuapp.com/database/adduser', userData, { headers: { accessToken: accessTokenRes } });
    } catch (error) {
        console.log(error);
    }
};

export const getNotInteractedUsers = async (userId) => {
    const { accessToken: accessTokenRes } = await checkRefreshToken();
    const result = await axios.get('http://daio-backend.herokuapp.com/match/dameusuarios', { headers: { accessToken: accessTokenRes, userId } });

    return result.data;
};

export const addInteraction = async (interactionData) => {
    try {
        const res = await axios.post('http://daio-backend.herokuapp.com/database/addinteraction', interactionData);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getGenresByArtists = async (artists) => {
    const { accessToken: accessTokenRes } = await checkRefreshToken();
    const genres = [];

    await Promise.all(artists.map(async (artist) => {
        await axios.get(`https://api.spotify.com/v1/artists/${artist.id}`, { headers: { Authorization: `Bearer ${accessTokenRes}` } })
            .catch(error => {
                console.log('error', error.request);
            })
            .then(response => {
                genres.push(response.data.genres);
            });
    }));

    return genres.flat();
};

export const getArtistsById = async (artistId) => {
    const { accessToken: accessTokenRes } = await checkRefreshToken();
    const artistData = [];

    await Promise.all(artistId.map(async (artist) => {
        await axios.get(`https://daio-backend.herokuapp.com/spotify/artistid/${artist}`, { headers: { accessToken: accessTokenRes } })
            .then(response => {
                // console.log('?', response.data);
                artistData.push(response.data);
            })
            .catch(error => {
                console.log('error', error);
            });
    }));

    return artistData;
};

export const getInteractions = async (userId) => {
    const { accessToken: accessTokenRes } = await checkRefreshToken();
    const interactions = await axios.get('http://daio-backend.herokuapp.com/database/getinteractions', { headers: { accessToken: accessTokenRes, userId } });

    return interactions.data;
};

export const updatePreferences = async (preferences) => {
    const res = await axios.post('http://daio-backend.herokuapp.com/database/adduser', preferences);

    return res.data;
};
