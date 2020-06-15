var express = require('express');
var router = express.Router();
var voucherController = require('../controllers/voucherController');
var middleware = require('../middleware/authMiddleware');

router.use(middleware.isAuthenticated);

router.get('/:id', voucherController.getVoucherById);

router.get('/campaign/:campaign_id', voucherController.getVoucherByCampaignId);

router.use(middleware.isAuthenticatedPartner);

router.delete('/:id', voucherController.deleteVoucherById);

router.patch('/:id', voucherController.updateVoucherById);

router.get('/is_available/:code', voucherController.checkAvailableUserVoucher);

module.exports = router;
