const express = require('express');

const getUserController = require('../controllers/getUserController');
const { validateJwt } = require('../middlewares/validateJwt');

const routers = express.Router();

routers.get('/user', validateJwt, getUserController.getUserController);

module.exports = routers;