const express = require('express');
const postCategoriesRouter = require('./routes/categoriesRouter');
const { authRouter,
  createUserRouter,
  getUserRouter,
  getUserIdRouter,
  getCategRouter,
  postPostRouter,
  getPostRouter,
  getPostIdRouter,
  putPostIdRouter,
 } = require('./routes');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/', authRouter);
app.use('/', createUserRouter);
app.use('/', getUserRouter);
app.use('/', getUserIdRouter);
app.use('/', postCategoriesRouter);
app.use('/', getCategRouter);
app.use('/', postPostRouter);
app.use('/', getPostRouter);
app.use('/', getPostIdRouter);
app.use('/', putPostIdRouter);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
