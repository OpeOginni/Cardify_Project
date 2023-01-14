// Here we will create the model that Stores Card Issues AKA Banks

const mongoose = require('mongoose');
const slugify = require('slugify');

// We Create a schema for the Bank Object
// name, reps, uncompletedOrders, completedOrders, logo

const bankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A bank must have a name'],
    unique: true,
  },
  reps:
    // Array of Bank Represntatives who will take care of the Issuer Account
    [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  uncompletedOrders:
    // Array of Orders that are uet to be completed
    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  completedOrders:
    // Array of Orders that are uet to be completed
    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  logo: {
    type: String,
    // required: [true, 'A Bank must have a Logo'],
  },
  slug: String,
});

// MIDDLEWARES
bankSchema.pre('save', async function (next) {
  this.slug = slugify(this.name, { lower: true }); // Creating a slug of the bank name...Makes it easier to search for a bank
  next();
});
// Creating the Bank model
const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank;
