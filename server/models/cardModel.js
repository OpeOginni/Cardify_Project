// Here we create the Model that will be used to store Available Cards to the Database

const mongoose = require('mongoose');
const slugify = require('slugify');
const Bank = require('./bankModel');

// We Create a schema for the Card Object
// cardType, issuer < bank that issues the card > , description, images, price, createdAt, cardName

const cardSchema = new mongoose.Schema({
  cardType: {
    type: String,
    required: [true, 'A card must have a name'],
    trim: true, // Remove leading and trailing whitespaces. " ABC  " = "ABC"
    minLenght: [5, 'A card mist have more than or equal to 10 chracters'],
  },
  issuer: {
    type: mongoose.Schema.Types.ObjectId, // The attribute type is that of an Object Id
    ref: Bank, // The Referecnce is the Bank Model, so the Object Id is that of a Bank Object
    required: [true, 'Card must belong to a Bank'],
  },
  description: {
    type: String,
    trim: true,
  },
  images: [String], // An Array of strings
  price: {
    type: Number,
    required: [true, 'A price must be put to order a card'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  cardName: String,
});

// Populating Issuer
cardSchema.pre(/^find/, function (next) {
  // Whenever any find operations are made for a Card Object the Issuer attribute is poulated and the Name of the issuer is returned as a response
  this.populate({ path: 'issuer', select: 'name -_id' });
  next();
});

// MIDDLEWARES
cardSchema.pre('save', async function (next) {
  const _issuer = await Bank.findById(this.issuer); // Get the Name of the Issuer
  this.cardName = slugify(`${_issuer.name} ${this.cardType}`, { lower: true }); // Creating a slug of the Issuer Name and the Card Name
  next();
});

// Creating the Card model
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
