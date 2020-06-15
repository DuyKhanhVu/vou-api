var express = require('express');
var router = express.Router();
var partnerController = require('../controllers/partnerController');
var campaignController = require('../controllers/campaignController');
var userVoucherController = require('../controllers/userVoucherController');
var middleware = require('../middleware/authMiddleware');

router.use(middleware.isAuthenticated);

router.get('/', partnerController.getAllPartner);

router.get('/:id', partnerController.getPartnerById);

router.use(middleware.isAuthenticatedPartner);

router.get('/voucher/me', partnerController.getAllVoucher);

router.get('/user_voucher', partnerController.getAllUserVoucher);

router.patch('/user_voucher/:id', userVoucherController.updateUserVoucher);

router.post('/campaign', campaignController.createCampaign);

module.exports = router;
