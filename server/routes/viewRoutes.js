const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn);

module.exports = router;
