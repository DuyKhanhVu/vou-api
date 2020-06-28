var express = require('express');
var router = express.Router();
var favoriteStoreController = require('../controllers/favoriteStoreController');
var middleware = require('../middleware/authMiddleware');

router.use(middleware.isAuthenticated);

router.post('/', favoriteStoreController.createFavoriteStore);

router.get('/', favoriteStoreController.getMyFavoriteStore);

router.delete('/', favoriteStoreController.deleteMyFavoriteStore);

module.exports = router;
