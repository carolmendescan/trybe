const { createCategory } = require('../services/postCategoriesService');

const postCategoriesController = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });

  const newCategory = await createCategory({ name });
    return res.status(201).json(newCategory);
};

module.exports = {
  postCategoriesController,
};