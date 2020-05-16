var model = require('../model/model');
var campaignModel = require('../model/campaignModel');

async function createCampaign(req, res, next) {
    var campaign = {
        ...req.body,
    }

    try {
        var result = await model.Create('campaign', campaign);
        campaign.id = result.insertId;
        res.status(200).json(campaign)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getAllCampaign(req, res, next) {
    try {
        var result = await campaignModel.GetAllCampaign()
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getCampaignById(req, res, next) {
    var id = req.params.id;
    try {
        var result = await campaign
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getAllCampaignByPartnerId(req, res, next) {
    var id = req.params.id;
    try {
        var result = await model.GetAllByField("campaign", "partner_id", id);
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function updateCampaignById(req, res, next) {
    var id = req.params.id;
    var campaign = {
        ...req.body
    }
    try {
        var result = await model.Update("campaign", campaign, id);
        campaign.id = id;
        res.status(200).json(campaign)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function deleteCampaignById(req, res, next) {
    var id = req.params.id;
    try {
        var result = await model.DeleteById("campaign", id);
        res.status(200).json({ message: `Deleted campaign's id = ${id}` })
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    createCampaign: createCampaign,
    getAllCampaign: getAllCampaign,
    getCampaignById: getCampaignById,
    getAllCampaignByPartnerId: getAllCampaignByPartnerId,
    updateCampaignById: updateCampaignById,
    deleteCampaignById: deleteCampaignById
}