import 'dotenv/config';
import { Request, Response } from 'express';

export const getCredentials = async (_req: Request, res: Response) => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
    const spotifyCredentials = { clientId, clientSecret, redirectUri };
    res.json(spotifyCredentials);
};
