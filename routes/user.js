var express = require('express');
var router = express.Router();
var middleware = require('../middleware/authMiddleware');
var userController = require('../controllers/userController');

router.use(middleware.isAuthenticated);

router.get('/me', userController.getMyProfile);

router.get('/:id', userController.getUserById);

router.patch('/me', userController.updateMyProfile);

router.get('/voucher/me', userController.getAllMyVoucher);
module.exports = router;
