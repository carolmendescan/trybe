const { BlogPost, Category } = require('../models');

const postService = async ({ title, content, categoryIds, userId }) => {
if (!title || !content || !categoryIds) {
  throw new Error('Some required fields are missing');
}

const sameCategoryVerify = await Category.findAll({ where: { id: categoryIds } });
if (sameCategoryVerify.length !== categoryIds.length) {
  throw new Error('one or more "categoryIds" not found');
}

const newPost = await BlogPost.create({
  title,
  content,
  userId,
  published: new Date(),
  updated: new Date(),
});

await Promise.all(
  sameCategoryVerify.map((category) => newPost.addCategory(category)),
);
return newPost;
};
 module.exports = {
postService,
};