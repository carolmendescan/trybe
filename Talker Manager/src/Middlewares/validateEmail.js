const validateEmail = (req, res, next) => {
  const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  } if (!checkEmail.test(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

module.exports = validateEmail;