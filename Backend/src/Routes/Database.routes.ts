import { Router } from 'express';
import { getUsers, setUser } from '../Controllers/Database.controller';

const databaseRouter = Router();

databaseRouter.get('/getusers', getUsers);
databaseRouter.get('/setuser', setUser);

export default databaseRouter;
