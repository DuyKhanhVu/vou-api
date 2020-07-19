var express = require('express');
var router = express.Router();
var campaignController = require('../controllers/campaignController');
var middleware = require('../middleware/authMiddleware');

router.get('/', campaignController.getAllCampaign);

router.use(middleware.isAuthenticated);

router.get('/:id', campaignController.getCampaignById);

router.get('/partner/:id', campaignController.getAllCampaignByPartnerId);

router.use(middleware.isAuthenticatedPartner);

router.delete('/:id', campaignController.deleteCampaignById);

router.patch('/:id', campaignController.updateCampaignById);

module.exports = router;
