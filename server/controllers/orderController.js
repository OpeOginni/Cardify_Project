const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/orderModel');
const factory = require('./handlerFactory');
const Card = require('../models/cardModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getOrder = factory.getOne(Order);
exports.getAllOrders = factory.getAll(Order);

// For Development
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
exports.createOrder = factory.createOne(Order);

// Getting all orders from a particular user
exports.getUserOrders = catchAsync(async (req, res, next) => {
  let orderedCards = []; // an array of all the cards that were ordered
  let orderedDate = [];
  const orders = await Order.find({ user: req.params.userId });
  console.log(orders);
  for (var i = 0; i < orders.length; i++) {
    const card = await Card.find({ cardName: orders[i].card.cardName });
    orderedDate.push(orders[i].orderedDate);
    console.log(card);
    orderedCards.push(card);
  }
  console.log(orderedCards);
  res.status(200).json({
    status: 'success',
    orders: orderedCards,
    orderedDate: orderedDate,
  });
});

// Creating a Stripe checkout session
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently ordered card
  const card = await Card.findById(req.params.cardId);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/cards`, // User will be sent to cards page if purchase was successful
    cancel_url: `${req.protocol}://${req.get('host')}/`, // User will be sent to home page if purchase wasnt successful
    customer_email: req.body.email,
    client_reference_id: req.params.cardId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: req.body.price * 100,
          product_data: {
            name: `${card.cardType}`,
            description: card.issuer.name,
            images: [`http://127.0.0.1:3000/images${card.images[0]}`],
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  });

  //3) Create Order
  /* For a production site the order should only be created after the checkout session 
  as been successfuly completed, meaning the user has paid.
  
  To do this a webhook has to be created, but that won't be implemented in this project
   Here we assume one the user creates a checout session they complete the session*/
  const order = await Order.create({
    user: req.body.user,
    card: req.body.card,
    price: req.body.price,
    deliveryAddress: req.body.deliveryAddress,
  });

  // 4) Create session as a response
  res.status(200).json({
    status: 'success',
    session: session,
    order: order,
  });
});
