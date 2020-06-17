var express = require('express');
var router = express.Router();
var puzzleController = require('../controllers/puzzleController');
var middleware = require('../middleware/authMiddleware');

router.use(middleware.isAuthenticated);

router.post('/me', puzzleController.createPuzzle);

router.get('/me', puzzleController.getPuzzle);

router.get('/piece/:id', puzzleController.getNewPiece);

router.post('/transfer', puzzleController.transferPiece);

router.get('/transfer_history/me', puzzleController.getTransferPieceHistory);

module.exports = router;
