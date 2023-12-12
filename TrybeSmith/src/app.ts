import express from 'express';

import productRoute from './routes/product.router';
import ordersRoute from './routes/orders.router';
import loginRoute from './routes/login.router';

const app = express();

app.use(express.json());

app.use('/products', productRoute);
app.use('/orders', ordersRoute);
app.use('/login', loginRoute);

export default app;
