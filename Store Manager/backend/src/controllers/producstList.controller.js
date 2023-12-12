const productsListService = require('../services/productList.service');

const findAll = async (_req, res) => {
const products = await productsListService.findAll();
  return res.status(200).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;
const products = await productsListService.findById(id);
if (!products) {
   return res.status(404).json({ message: 'Product not found' });
}
  return res.status(200).json(products);
};

const createProduct = async (req, res) => {
  const data = req.body;
  try {
    const result = await productsListService.createProduct(data);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
const updated = await productsListService.updateProduct(name, id);
if (updated.message) return res.status(422).json(updated);
  return res.status(200).json(updated);
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
};