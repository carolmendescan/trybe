const { Router } = require('express');
const productsListController = require('../controllers/producstList.controller');
const validateName = require('../middlewares/validate.name');
const validateProductUpdate = require('../validations/validateProductUpdate');

const productListRoute = Router();

productListRoute.get('/:id', productsListController.findById);
productListRoute.get('/', productsListController.findAll);
productListRoute.post('/', validateName, productsListController.createProduct);
productListRoute.put(
  '/:id',
validateName,
validateProductUpdate,
productsListController.updateProduct,
);

module.exports = productListRoute;