const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// All routes below needs a user to be signed in to access AKA they are protected
router.use(authController.protect);

router.get('/me', userController.getMe, userController.getUser); // Getts the currently Logged in user
router.delete('/deleteMe', userController.deleteMe); // Deletes the currently logged in user

router
  .route('/') // https://127.0.0.1/api/v1/users
  .get(userController.getAllUsers)
  .post(userController.createUser); // The signup Route should be used to create users...This should be used for other roles

router
  .route('/:id') // Route when an ID is passed as a param   https://127.0.0.1/api/v1/users/<userId>
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
