import { authorize, refresh } from 'react-native-app-auth';
import 'dotenv/config'

class AuthenticationHandler {
    constructor() {
        this.spotifyAuthConfig = {
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            redirectUrl: 'exp://localhost:19000/--/',
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
    }

    async onLogin() {
        console.log(process.env.SPOTIFY_CLIENT_ID)
        try {
            const result = await authorize(this.spotifyAuthConfig);
            alert(JSON.stringify(result));
            return result;
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    }

    async refreshLogin(refreshToken) {
        const result = await refresh(this.spotifyAuthConfig, {
            refreshToken: refreshToken,
        });
        return result;
    }

}

const authHandler = new AuthenticationHandler();

export default authHandler;