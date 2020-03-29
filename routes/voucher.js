var express = require('express');
var router = express.Router();
var voucherController = require('../controllers/voucherController');

router.get('/:id', voucherController.getVoucherById);

router.delete('/:id', voucherController.deleteVoucherById);

router.patch('/:id', voucherController.updateVoucherById);

module.exports = router;
