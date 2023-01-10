const express = require('express');
const cardController = require('../controllers/cardController');

const router = express.Router();

router
  .route('/') // https://127.0.0.1/api/v1/cards
  .get(cardController.getAllCards)
  .post(cardController.createCard);

router
  .route('/:id') // Route when an ID is passed as a param   https://127.0.0.1/api/v1/cards/<CardId>
  .get(cardController.getCard)
  .patch(cardController.updateCard)
  .delete(cardController.deleteCard);

module.exports = router;
