const express = require('express');

const { getPostIdController } = require('../controllers/getPostIdController');
const { validateJwt } = require('../middlewares/validateJwt');

const routers = express.Router();

routers.get('/post/:id', validateJwt, getPostIdController);

module.exports = routers;