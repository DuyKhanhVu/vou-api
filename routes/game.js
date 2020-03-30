var express = require('express');
var router = express.Router();
var partnerController = require('../controllers/gameController');

router.get('/', partnerController.getAllPartner);

module.exports = router;
