var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');
var middleware = require('../middleware/authMiddleware');

router.post('/signin', adminController.adminLogIn);

router.use(middleware.isAuthenticatedAdmin);

router.get('/user', adminController.getAllUser);

router.get('/partner', adminController.getAllPartner);

router.patch('/partner/:id', adminController.updatePartner);

module.exports = router;
