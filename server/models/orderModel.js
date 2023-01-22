// Here we will create the model that Stores Placed Orders

const mongoose = require('mongoose');
const Bank = require('./bankModel');
const Card = require('./cardModel');

// We Create a schema for the Order Object
// user, card, price, orderedDate, delivered, deliveredDate

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a User!'],
  },
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    required: [true, 'A card must be Ordered'],
  },
  price: {
    // The total price of the order, Including Delivery Price
    type: Number,
    required: [true, 'Order must have a price'],
  },
  deliveryAddress: {
    type: String,
    required: [true, 'An address must be given'],
  },
  orderedDate: {
    type: Date,
    default: Date.now(),
  },
  delivered: {
    type: Boolean,
    default: false,
  },
  deliveredDate: {
    type: Date,
  },
});

// MIDDLEWARES
orderSchema.pre('save', async function (next) {
  // If the order hasnt been delivered it should be added to the uncompletedOrders attribute in the Bank Object
  if (this.delivered === false) {
    const card = await Card.findById(this.card);
    await Bank.findOneAndUpdate(
      { name: card.issuer.name },
      { $push: { uncompletedOrders: this._id } }
    );
    // await Bank.findByIdAndUpdate(card.issuer._id, {
    //   $push: { uncompletedOrders: this._id },
    // });
  }

  next();
});

// Populating Card to show the Issuer < Bank > and the User

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'card',
    select: 'cardName -_id',
  }).populate({ path: 'user', select: 'name' });
  next();
});

// Creating the Model and Exporting it

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
