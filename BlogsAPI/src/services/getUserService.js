const { User } = require('../models');

const getUserService = async () => {
  const user = await User.findAll({ attributes: { exclude: 'password' } });
 
  return user;
};

module.exports = getUserService;