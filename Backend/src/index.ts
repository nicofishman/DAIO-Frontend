import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import routerSpotify from './Routes/Spotify.routes';

const app = express();
app.use(express.json()); //Middleware to parse JSON
app.use(cors()); //Middleware to enable CORS
app.use(cookieParser()); //Middleware to enable cookies

const PORT = 3000;

app.use('/spotify', routerSpotify);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});