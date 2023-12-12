const express = require('express');
const { loginValidate } = require('../middlewares/login.validate');

const authController = require('../controllers/auth.controller');

const routers = express.Router();

routers.post('/login', loginValidate, authController.login);

module.exports = routers;