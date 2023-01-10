const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const cardRouter = require('./routes/cardRoutes');
const bankRouter = require('./routes/bankRoutes');
const orderRouter = require('./routes/orderRoutes');

const app = express();
app.use(morgan('dev'));

app.use(express.json({ limit: '10kb' })); // A function that can modify an incoming request data

// MOUTING OUR ROUTES

// 1)API ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/cards', cardRouter);
app.use('/api/v1/banks', bankRouter);
app.use('/api/v1/orders', orderRouter);

module.exports = app;
