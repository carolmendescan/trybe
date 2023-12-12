const express = require('express');

const { postCategoriesController } = require('../controllers/postCategoriesController');
const { validateJwt } = require('../middlewares/validateJwt');

const routers = express.Router();

routers.post('/categories', validateJwt, postCategoriesController);

module.exports = routers;