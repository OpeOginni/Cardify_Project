const User = require('../models/userModel');
const factory = require('./handlerFactory');

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

// For Development
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.createUser = factory.createOne(User); // Only Signup should be used to create a user
