var express = require('express');
var router = express.Router();
var partnerController = require('../controllers/partnerController');
var campaignController = require('../controllers/campaignController');
var middleware = require('../middleware/authMiddleware');

router.use(middleware.isAuthenticated);

router.get('/', partnerController.getAllPartner);

router.use(middleware.isAuthenticatedPartner);

router.post('/voucher', partnerController.createVoucher);

router.get('/voucher', partnerController.getAllVoucher);

router.get('/user_voucher', partnerController.getAllUserVoucher);

router.post('/campaign', campaignController.createCampaign);

module.exports = router;
