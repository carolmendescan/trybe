const express = require('express');

const { getUserIdController } = require('../controllers/getUserIdController');
const { validateJwt } = require('../middlewares/validateJwt');

const routers = express.Router();

routers.get('/user/:id', validateJwt, getUserIdController);

module.exports = routers;