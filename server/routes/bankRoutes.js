const express = require('express');
const bankController = require('../controllers/bankController');
const authController = require('../controllers/authController');

const router = express.Router();

//Test
router.route('/').get(bankController.getAllBanks);

// All routes below needs a user to be signed in to access AKA they are protected
router.use(authController.protect);
router.use(authController.restrictTo('admin')); // Only admins can make chages to the Card Issuers / Banks

router
  .route('/') // https://127.0.0.1/api/v1/banks
  //.get(bankController.getAllBanks)
  .post(authController.restrictTo('admin'), bankController.addBank);
// Only admins of the site can add new Card Issuers / Banks

router
  .route('/:id') // Route when an ID is passed as a param   https://127.0.0.1/api/v1/banks/<bankId>
  .get(bankController.getBank)
  .patch(bankController.updateBank)
  .delete(bankController.deleteBank);

module.exports = router;
