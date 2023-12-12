const { getPostService } = require('../services/getPostService');

const getPostController = async (req, res) => {
const users = await getPostService();

return res.status(200).json(users);
};

module.exports = {
  getPostController,
};