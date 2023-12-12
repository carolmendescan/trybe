const express = require('express');

const createUserController = require('../controllers/createUserController');
const displayNameValidate = require('../middlewares/displayName.validate');
const emailValidate = require('../middlewares/email.validate');
const passwordValidate = require('../middlewares/password.validate');

const routers = express.Router();

routers.post(
  '/user',
displayNameValidate,
emailValidate,
passwordValidate,
createUserController.createUserController,
);

module.exports = routers;