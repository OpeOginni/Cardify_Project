const express = require('express');
const bankController = require('../controllers/bankController');

const router = express.Router();

router
  .route('/') // https://127.0.0.1/api/v1/banks
  .get(bankController.getAllBanks)
  .post(bankController.addBank);

router
  .route('/:id') // Route when an ID is passed as a param   https://127.0.0.1/api/v1/banks/<bankId>
  .get(bankController.getBank)
  .patch(bankController.updateBank)
  .delete(bankController.deleteBank);

module.exports = router;
