var express = require('express');
var router = express.Router();
var voucherController = require('../controllers/voucherController');
var middleware = require('../middleware/authMiddleware');

router.use(middleware.isAuthenticated);

router.get('/:id', voucherController.getVoucherById);

router.get('/partner/:partner_id', voucherController.getVoucherByPartnerId);

router.use(middleware.isAuthenticatedPartner);

router.delete('/:id', voucherController.deleteVoucherById);

router.patch('/:id', voucherController.updateVoucherById);

router.get('/is_available/:code', voucherController.checkAvailableUserVoucher);

module.exports = router;
