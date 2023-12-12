const { BlogPost, User, Category } = require('../models');

const getPostService = async () => {
  const findAll = BlogPost.findAll(
  { include: [
    { model: User, as: 'user', attributes: { exclude: 'password' } },
   { model: Category, as: 'categories', through: { attributes: [] } }],
  },
  );
  return findAll;
};

module.exports = {
  getPostService,
};