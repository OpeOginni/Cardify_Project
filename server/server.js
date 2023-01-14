// Need to Require needed Modules
const mongoose = require('mongoose'); // We are using mongoose to help Connect to our DataBase
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' }); //Pointing to where we will store Environment Varaibles
const app = require('../app');

// Conecting to MongoDB
const DB = process.env.DATABASE;

mongoose.set('strictQuery', true);

async function dbConnect() {
  await mongoose
    .connect(DB) // Connect to our MonogoDB Database
    .then(() => console.log('DB connection successful')); // Log to console when successful
}

dbConnect().catch((err) => console.log(err)); // We try to connect to the Database and Catch and Log an error if One occurs

// STARTING THE SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
