const express = require('express');

const { postController } = require('../controllers/postController');
const { validateJwt } = require('../middlewares/validateJwt');

const routers = express.Router();

routers.post('/post', validateJwt, postController);

module.exports = routers;