const authRouter = require('./auth.router');
const createUserRouter = require('./createUserRouter');
const getUserRouter = require('./getUser.router');
const getUserIdRouter = require('./getUserIdRouter');
const postCategoriesRouter = require('./categoriesRouter');
const getCategRouter = require('./getCategRouter');
const postPostRouter = require('./postPostRouter');
const getPostRouter = require('./getPostRouter');
const getPostIdRouter = require('./getPostIdRouter');
const putPostIdRouter = require('./putPostIdRouter');

module.exports = {
  authRouter,
  createUserRouter,
  getUserRouter,
  getUserIdRouter,
  postCategoriesRouter,
  getCategRouter,
  postPostRouter,
  getPostRouter,
  getPostIdRouter,
  putPostIdRouter,
};
