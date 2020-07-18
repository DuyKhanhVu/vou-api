var express = require('express');
var router = express.Router();
var bannerController = require('../controllers/bannerController');
var middleware = require('../middleware/authMiddleware');

router.use(middleware.isAuthenticated);

router.get('/', bannerController.getAllBanner);

router.get('/:id', bannerController.getBannerById);

module.exports = router;
