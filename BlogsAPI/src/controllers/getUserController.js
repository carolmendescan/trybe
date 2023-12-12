const getUserService = require('../services/getUserService');

const getUserController = async (req, res) => {
const users = await getUserService();

return res.status(200).json(users);
};

module.exports = {
  getUserController,
};