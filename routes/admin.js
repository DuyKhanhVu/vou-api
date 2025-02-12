var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');
var middleware = require('../middleware/authMiddleware');

router.post('/signin', adminController.adminLogIn);

router.use(middleware.isAuthenticatedAdmin);

router.get('/user', adminController.getAllUser);

router.get('/partner', adminController.getAllPartner);

router.patch('/partner/:id', adminController.updatePartner);

router.post('/banner', adminController.createBanner);

router.delete('/banner/:id', adminController.deleteBanner);

router.post('/game', adminController.createGame);

router.patch('/game/:id', adminController.updateGame);

router.delete('/game/:id', adminController.deleteGame);

module.exports = router;
