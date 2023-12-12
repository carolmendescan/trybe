const authService = require('../services/auth.service');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login({ email, password });
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  login,
};