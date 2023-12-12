const express = require('express');

const { putPostIdController } = require('../controllers/putPostIdController');
const { validateJwt } = require('../middlewares/validateJwt');

const routers = express.Router();

routers.put('/post/:id', validateJwt, putPostIdController);

module.exports = routers;