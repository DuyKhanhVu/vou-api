var express = require('express');
var router = express.Router();
var middleware = require('../middleware/authMiddleware');
var userController = require('../controllers/userController');

router.use(middleware.isAuthenticated,);

router.get('/me', userController.getMyProfile);

module.exports = router;
