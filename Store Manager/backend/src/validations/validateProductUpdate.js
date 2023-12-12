const { findAll } = require('../models/poductsList.model');

const validateProductUpdate = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;

  const allProducts = await findAll();
  const idProduct = Object.values(allProducts).map((product) => product.id);

  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (!idProduct.includes(+id)) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return next();
};

module.exports = validateProductUpdate;