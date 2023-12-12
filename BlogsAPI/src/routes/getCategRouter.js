const express = require('express');

const getCategoriesController = require('../controllers/getCategoriesController');
const { validateJwt } = require('../middlewares/validateJwt');

const routers = express.Router();

routers.get('/categories', validateJwt, getCategoriesController.getCategoriesController);

module.exports = routers;