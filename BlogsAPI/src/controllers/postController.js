const { decodeToken } = require('../utils/JWT');
const { postService } = require('../services/postService');

const postController = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;
  
  try {
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;

    const newPost = await postService({ title, content, categoryIds, userId });
    return res.status(201).json(newPost);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  postController,
};