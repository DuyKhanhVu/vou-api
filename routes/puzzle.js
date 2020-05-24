var express = require('express');
var router = express.Router();
var puzzleController = require('../controllers/puzzleController');
var middleware = require('../middleware/authMiddleware');

router.use(middleware.isAuthenticated);

router.post('/me', puzzleController.createPuzzle);

router.get('/me', puzzleController.getPuzzle);

router.patch('/:id', puzzleController.updatePuzzle);

module.exports = router;
