const express = require('express');
const cardController = require('../controllers/cardController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/') // https://127.0.0.1/api/v1/cards
  .get(cardController.getAllCards)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'bank-rep'),
    cardController.createCard
  );

// Route to get all cards from a particular Issuer
// router.use('/:bankId', )

router
  .route('/:id') // Route when an ID is passed as a param   https://127.0.0.1/api/v1/cards/<CardId>
  .get(cardController.getCard)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'bank-rep'),
    cardController.updateCard
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'bank-rep'),
    cardController.deleteCard
  );

router.get('/issuer/:issuerSlug', cardController.getCardsFromBank);

module.exports = router;
