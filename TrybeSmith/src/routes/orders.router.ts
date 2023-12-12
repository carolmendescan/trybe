import { Router } from 'express';

import getOrdersController from '../controllers/getOrdersController';

const Route = Router();

Route.get('/', getOrdersController.getOrdersController);

export default Route;