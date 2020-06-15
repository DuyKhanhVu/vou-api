var model = require('../model/model');
var campaignModel = require('../model/campaignModel');
var CodeGenerator = require('node-code-generator');
var QRCode = require('qrcode')

async function createCampaign(req, res, next) {
    var campaign = {
        ...req.body,
    }
    delete campaign.voucher_image;

    try {
        if (campaign.promo_code.length > 10) { return res.status(400).json({ error: "Promo code too long." }) }
        //Create campaign
        var result = await model.Create('campaign', campaign);
        campaign.id = result.insertId;

        //Create voucher
        var generator = new CodeGenerator();
        var codes = generator.generateCodes(`${campaign.promo_code}**********`, campaign.num_of_voucher, {});

        var vouchers = []

        for (const code of codes) {
            let qr_code = await QRCode.toDataURL(code)
            let voucher = {
                code: code,
                qr_code: qr_code,
                image: req.body.voucher_image,
                campaign_id: campaign.id
            }

            try {
                var result = await model.Create('voucher', voucher);
                voucher.id = result.insertId;
                vouchers.push(voucher)
            } catch (err) {
                res.status(400).json(err)
            }
        }
        res.status(200).json({campaign: campaign, vouchers: vouchers})
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getAllCampaign(req, res, next) {
    try {
        var result = await model.GetAll("campaign")
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
        var result = await campaignModel.GetAllCampaignByPartnerId(id);
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