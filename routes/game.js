var express = require('express');
var router = express.Router();
var gameController = require('../controllers/gameController');
var middleware = require('../middleware/authMiddleware');

router.use(middleware.isAuthenticated);

router.get('/', gameController.getAllGame);

module.exports = router;
