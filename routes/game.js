var express = require('express');
var router = express.Router();
var gameController = require('../controllers/gameController');

router.get('/', gameController.getAllGame);

router.get('/:id', gameController.getGameById);

module.exports = router;
