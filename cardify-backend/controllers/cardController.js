const Card = require('../models/cardModel');
const factory = require('./handlerFactory');

exports.getCard = factory.getOne(Card);
exports.getAllCards = factory.getAll(Card);
exports.updateCard = factory.updateOne(Card);
exports.deleteCard = factory.deleteOne(Card);
exports.createCard = factory.createOne(Card);
