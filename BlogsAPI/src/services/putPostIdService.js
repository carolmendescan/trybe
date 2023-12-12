const { BlogPost } = require('../models');
const { getPostIdService } = require('./getPostIdService');

const putPostIdService = async (title, content, userId, postId) => {
  const teste = await BlogPost.findByPk(postId);
  const postUserId = teste.dataValues.userId;

  if (userId !== postUserId) return ({ message: 'Unauthorized user' });
   await BlogPost.update(
    { title, content },
    { where: { userId, id: postId } },
    );
    const result = await getPostIdService(userId, postId);
  return result;
};

module.exports = {
  putPostIdService,
};
