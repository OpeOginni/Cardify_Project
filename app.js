const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser'); // To get access to Web Cookies
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const path = require('path');

// Need to Require needed Modules
const mongoose = require('mongoose'); // We are using mongoose to help Connect to our DataBase
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' }); //Pointing to where we will store Environment Varaibles

const userRouter = require('./server/routes/userRoutes');
const cardRouter = require('./server/routes/cardRoutes');
const bankRouter = require('./server/routes/bankRoutes');
const orderRouter = require('./server/routes/orderRoutes');
const viewRouter = require('./server/routes/viewRoutes');

const DB = process.env.DATABASE;

mongoose.set('strictQuery', true);

async function dbConnect() {
  await mongoose
    .connect(DB) // Connect to our MonogoDB Database
    .then(() => console.log('DB connection successful')); // Log to console when successful
}

// dbConnect().catch((err) => console.log(err)); // We try to connect to the Database and Catch and Log an error if One occurs

nextApp
  .prepare()
  .then(async () => {
    // Called function to connect db here so that I can await it...this is cause of thee poor network connection in my area
    await dbConnect().catch((err) => console.log(err)); // We try to connect to the Database and Catch and Log an error if One occurs

    const app = express();
    app.use(morgan('dev'));

    app.use(express.json({ limit: '10kb' })); // A function that can modify an incoming request data
    app.use(cookieParser());

    // MOUTING OUR ROUTES

    // 1)API ROUTES
    app.use('/api/v1/users', userRouter); // 127.0.0.1:3000/api/v1/users
    app.use('/api/v1/cards', cardRouter);
    app.use('/api/v1/banks', bankRouter);
    app.use('/api/v1/orders', orderRouter);
    app.use('/api/v1/auth', viewRouter); // 127.0.0.1:3000/api/v1/authenticate

    const serveFiles = express.static(path.join(__dirname, '/public')); // To help serve our images
    app.use('/images', serveFiles);

    // app.use('*', (req, res) => {
    //   return handle(req, res);
    // });
    app.all('*', (req, res) => {
      return handle(req, res);
    });

    const server = app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
  })
  .catch((err) => {
    console.log('Error', err);
  });

// module.exports = app;
