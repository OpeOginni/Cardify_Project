const Order = require('../models/orderModel');
const factory = require('./handlerFactory');

exports.getOrder = factory.getOne(Order);
exports.getAllOrders = factory.getAll(Order);

// For Development
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
exports.createOrder = factory.createOne(Order);
