import { Router } from 'express';

import loginController from '../controllers/loginController';

const Route = Router();

Route.post('/', loginController.loginController);

export default Route;