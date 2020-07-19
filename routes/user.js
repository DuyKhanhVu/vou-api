var express = require('express');
var router = express.Router();
var middleware = require('../middleware/authMiddleware');
var userController = require('../controllers/userController');

router.use(middleware.isAuthenticated);

router.get('/me', userController.getMyProfile);

router.get('/username/:username', userController.getUserByUsername);

router.get('/:id', userController.getUserById);

router.patch('/me', userController.updateMyProfile);

router.get('/voucher/me', userController.getAllMyVoucher);

router.patch('/change-password', userController.changePassword);

module.exports = router;
