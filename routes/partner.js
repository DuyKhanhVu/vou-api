var express = require('express');
var router = express.Router();
var partnerController = require('../controllers/partnerController');

router.get('/', partnerController.getAllPartner);

router.post('/:partner_id/voucher', partnerController.createVoucher);

router.get('/:partner_id/voucher', partnerController.getAllVoucher);

module.exports = router;
