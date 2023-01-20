const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(
    authController.restrictTo('admin', 'bank-rep'),
    orderController.getAllOrders
  )
  .post(orderController.createOrder);

router.post('/checkout-session/:cardId', orderController.getCheckoutSession);

router.use(authController.restrictTo('admin', 'bank-rep')); // Restricted to only admins and Bank Reps

router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

// router.route('/:bankId')

module.exports = router;
