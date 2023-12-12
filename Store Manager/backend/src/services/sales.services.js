const salesModel = require('../models/sales.model');
const validateFile = require('../validations/salesValidate');

const findAll = async () => {
  const result = await salesModel.findAll();
  return result;
};

const findById = async (id) => {
  const result = await salesModel.findById(id);
  if (result.length === 0) {
    return false;
  }
  return result;
};

const createSales = async (sales) => {
  const validate = await validateFile.validateSales(sales);
  if (validate) return validate;
  const idSales = await salesModel.createSalesId();
  const saleMap = sales
  .map((sale) => salesModel
  .createSalesProduct(idSales, sale.productId, sale.quantity));
  const salesPromisse = await Promise.all(saleMap);
  const result = {
    id: idSales,
    itemsSold: salesPromisse,
  };
  return { type: null, message: result };
};

module.exports = {
findAll,
findById,
createSales,
};