import { Router } from 'express';
import { getCredentials } from '../Controllers/Credentials.controller';

const routerCredentials = Router();

routerCredentials.get('/', getCredentials);

export default routerCredentials;
