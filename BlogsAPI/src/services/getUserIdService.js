const { User } = require('../models');

const getUserIdService = async (id) => {
  const userId = await User.findByPk(id, { attributes: { exclude: 'password' } });
   return userId;
};

module.exports = getUserIdService;