const express = require('express');
const productListRoute = require('./routes/products.routes');
const salesRoute = require('./routes/sales.routes');

const app = express();

app.use(express.json());
app.use('/products', productListRoute);
app.use('/sales', salesRoute);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
