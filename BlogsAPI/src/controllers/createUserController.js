const { createUserService } = require('../services/createUserService');

const createUserController = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  try {
    const token = await createUserService({ displayName, email, password, image });
    return res.status(201).json({ token });
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};

module.exports = {
  createUserController,
};