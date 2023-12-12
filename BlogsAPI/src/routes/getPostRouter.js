const express = require('express');

const { getPostController } = require('../controllers/getPostController');
const { validateJwt } = require('../middlewares/validateJwt');

const routers = express.Router();

routers.get('/post', validateJwt, getPostController);

module.exports = routers;