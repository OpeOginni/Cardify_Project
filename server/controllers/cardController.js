const Card = require('../models/cardModel');
const factory = require('./handlerFactory');
const Bank = require('../models/bankModel');
const catchAsync = require('../utils/catchAsync');

exports.getCard = factory.getOne(Card);
exports.getAllCards = factory.getAll(Card);
exports.updateCard = factory.updateOne(Card);
exports.deleteCard = factory.deleteOne(Card);
exports.createCard = factory.createOne(Card);

exports.getCardsFromBank = catchAsync(async (req, res, next) => {
  // Get the cards from a particular bank
  const issuer = await Bank.findOne({ slug: req.params.issuerSlug });
  const cards = await Card.find({ issuer: issuer._id });
  res
    .status(200)
    .json({ status: 'success', results: cards.length, data: cards });
});

exports.getFeaturedCards = catchAsync(async (req, res, next) => {
  // Get some cards that we will display on the Main Cards Page
  const featuredCards = await Card.find({ featured: true });
  res.status(200).json({
    status: 'success',
    results: featuredCards.length,
    data: featuredCards,
  });
});
