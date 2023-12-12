const getUserIdService = require('../services/getUserIdService');

const getUserIdController = async (req, res) => {
  const userId = await getUserIdService(req.params.id);

  if (!userId) return res.status(404).json({ message: 'User does not exist' });

  return res.status(200).json(userId);
};

module.exports = {
  getUserIdController,
};