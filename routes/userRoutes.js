const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router
  .route('/') // https://127.0.0.1/api/v1/users
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id') // Route when an ID is passed as a param   https://127.0.0.1/api/v1/users/<userId>
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
