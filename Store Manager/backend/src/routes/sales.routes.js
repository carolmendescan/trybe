const { Router } = require('express');
const salesController = require('../controllers/sales.controller');
const saleMiddleware = require('../middlewares/sales.validate.joi');

const productListRoute = Router();

productListRoute.get('/:id', salesController.findById);
productListRoute.get('/', salesController.findAll);
productListRoute.post('/', saleMiddleware, salesController.createSales);

module.exports = productListRoute;