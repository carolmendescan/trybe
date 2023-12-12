const productsListModel = require('../models/poductsList.model');

const findAll = async () => {
  const result = await productsListModel.findAll();
  return result;
};

const findById = async (id) => {
  const result = await productsListModel.findById(id);
  if (!result) {
    return false;
  }
  return result;
};

const createProduct = async (data) => {
  if (!data) throw new Error('Data não encontrado!');
  const result = await productsListModel.createProduct(data);
  return result;
};

const updateProduct = async (name, productId) => {
await productsListModel.updateProduct(name, productId);
const findProduct = await productsListModel.findById(productId);
return findProduct;
};

module.exports = {
findAll,
findById,
createProduct,
updateProduct,
};