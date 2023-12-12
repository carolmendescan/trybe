const { User } = require('../models');
const { createToken } = require('../utils/JWT');

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user) {
    throw new Error('Invalid fields');
  }

  const payload = {
    id: user.id,
  };
  const token = createToken(payload);

  return token;
};

module.exports = {
  login,
};
