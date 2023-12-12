const productListModel = require('../models/poductsList.model');

const validateSales = async (sales) => {
  const searchId = await sales.map(({ productId }) => productListModel.findById(productId));
  const promisse = await Promise.all(searchId);
  const result = promisse.every((product) => product);
  if (!result) {
    return { type: 404, message: 'Product not found' };
  }
  return null;
     };
  
  module.exports = { validateSales };
