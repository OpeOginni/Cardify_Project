const Bank = require('../models/bankModel');
const factory = require('./handlerFactory');

exports.getBank = factory.getOne(Bank);
exports.getAllBanks = factory.getAll(Bank);
exports.updateBank = factory.updateOne(Bank);
exports.deleteBank = factory.deleteOne(Bank);
exports.addBank = factory.createOne(Bank);
