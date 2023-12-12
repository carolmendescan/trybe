const { BlogPost, User, Category } = require('../models');

const getPostIdService = async (postId, userId) => {
  const findAll = await BlogPost.findOne({
    where: { userId, id: postId },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
     { model: Category, as: 'categories', through: { attributes: [] } }],
    });

    if (!findAll) throw new Error('Post does not exist');
  return findAll;
};

module.exports = {
  getPostIdService,
};
