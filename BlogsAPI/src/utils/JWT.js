const jwt = require('jsonwebtoken');

const TOKEN = process.env.JWT_SECRET || 'segredo';

const createToken = (payload) => jwt.sign(payload, TOKEN);

const decodeToken = (token) => jwt.verify(token, TOKEN);

module.exports = {
createToken,
decodeToken,
};
