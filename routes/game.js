var express = require('express');
var router = express.Router();
var gameController = require('../controllers/gameController');

router.get('/', gameController.getAllGame);

module.exports = router;
