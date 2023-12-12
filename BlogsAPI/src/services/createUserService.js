const { User } = require('../models');
const { createToken } = require('../utils/JWT');

const createUserService = async ({ displayName, email, password, image }) => {
  const emailExist = await User.findOne({ where: { email } });
  const checkEmail = emailExist === null ? {} : emailExist;
   if (checkEmail.email === email) {
    throw new Error('User already registered');
  }
  const user = await User.create({ displayName, email, password, image });
  
  const payload = {
    displayName: user.displayName,
    email: user.email,
  };
  const token = createToken(payload);

  return token;
};

module.exports = {
  createUserService,
};