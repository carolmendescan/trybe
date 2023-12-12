const { Category } = require('../models');

const getCategoriesService = async () => {
  const allCategories = await Category.findAll();
   return allCategories;
};

module.exports = getCategoriesService;