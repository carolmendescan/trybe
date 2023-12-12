const salesService = require('../services/sales.services');

const findAll = async (_req, res) => {
const sales = await salesService.findAll();
  return res.status(200).json(sales);
};

const findById = async (req, res) => {
  const { id } = req.params;
const sales = await salesService.findById(id);
if (!sales) {
   return res.status(404).json({ message: 'Sale not found' });
}
  return res.status(200).json(sales);
};

const createSales = async (req, res) => {
const sale = req.body;
try {
  const { type, message } = await salesService.createSales(sale);
  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
} catch (err) {
  return res.status(500).json(err.message);
}
};

module.exports = {
  findAll,
  findById,
  createSales,
};