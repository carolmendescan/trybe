import { Router } from 'express';

import productController from '../controllers/productPostController';
import getProductController from '../controllers/getProductController';

const Route = Router();

Route.post('/', productController.createProductController);
Route.get('/', getProductController.getProductController);

export default Route;