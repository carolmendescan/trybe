const { getPostIdService } = require('../services/getPostIdService');

const getPostIdController = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    const postId = await getPostIdService(id, userId);
    return res.status(200).json(postId);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getPostIdController,
};
