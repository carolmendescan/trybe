const { decodeToken } = require('../utils/JWT');

const validateJwt = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decodedToken = decodeToken(token);
    req.userId = decodedToken.id;
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  return next();
};

module.exports = {
  validateJwt,
};
