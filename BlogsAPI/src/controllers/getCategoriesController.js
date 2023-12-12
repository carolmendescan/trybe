const getCategoriesService = require('../services/getCategoriesService');

const getCategoriesController = async (req, res) => {
const allCategories = await getCategoriesService();

return res.status(200).json(allCategories);
};

module.exports = {
  getCategoriesController,
};