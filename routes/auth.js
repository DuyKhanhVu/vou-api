var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');

router.post('/signin', authController.signIn);

router.post('/signup', authController.signUp);

module.exports = router;
