import 'dotenv/config';
import { Request, Response } from 'express';
import mysql, { MysqlError } from 'mysql';

type User = {
    spotifyId: string,
    username: string,
    avatarId: 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15,
    description: string
}

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
    const con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });
    con.connect(function (err: MysqlError) {
        if (err) throw err;
        console.log('Connected!');
    });
    con.query('SELECT * FROM users', function (err: MysqlError, result: User[]) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
    con.end();
};

export const setUser = async (req: Request, res: Response): Promise<void> => {
    const user: any = req.body;
    console.log(user);
    const con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });
    con.connect(function (err: MysqlError) {
        if (err) throw err;
        console.log('Connected!');
    });
    con.query(`INSERT INTO users (spotifyId, username, avatarId, description) VALUES (${user.spotifyId}, ${user.username}, ${user.avatarId}, ${user.description})`, function (err: MysqlError, result: User[]) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
    con.end();
};
