const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect); // Prevents users that are not logged in from accessing the routes bellow

router
  .route('/')
  .get(
    authController.restrictTo('admin', 'bank-rep'), // Restricts this routes to admins and bank-reps
    orderController.getAllOrders
  )
  .post(orderController.createOrder);

router.post('/checkout-session/:cardId', orderController.getCheckoutSession);

router.get('/user/:userId', orderController.getUserOrders);

router.use(authController.restrictTo('admin', 'bank-rep')); // Restricted to only admins and Bank Reps

router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

// router.route('/:bankId')

module.exports = router;
