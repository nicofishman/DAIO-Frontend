import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json()); //Middleware to parse JSON
app.use(cors()); //Middleware to enable CORS

const PORT = 3000;

app.get('/ping', (_req, res) => {
    res.send('Pong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});