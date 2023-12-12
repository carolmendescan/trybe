const emailValidate = (req, res, next) => {
  const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { email } = req.body;
    if (!checkEmail.test(email)) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  }
  next();
};

module.exports = emailValidate;