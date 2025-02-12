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
        if (campaign.promo_code.length > 5) { return res.status(400).json({ error: "Promo code too long." }) }
        //Create campaign
        var result = await model.Create('campaign', campaign);
        campaign.id = result.insertId;
        let qr_code_campaign = await QRCode.toDataURL(JSON.stringify(campaign));
        await model.Update('campaign', {qr_code: qr_code_campaign}, campaign.id);

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
                discount: campaign.discount,
                description: campaign.description,
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
        if (req.query.type === 'hot') {
            var result = await campaignModel.GetReceivedVoucher();
        } else {
            var result = await campaignModel.GetAllCampaign();
        }
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getCampaignById(req, res, next) {
    var id = req.params.id;
    try {
        var result = await model.GetById('campaign', id);
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
        await model.Update("campaign", campaign, id);

        var voucher = {}
        if (campaign.discount) {
            voucher.discount = campaign.discount;
        }

        if (campaign.description) {
            voucher.description = campaign.description;
        }
        await campaignModel.UpdateAllVoucherByCampaignId(id, voucher);
        campaign.id = id;
        res.status(200).json({message: "Updated", campaign})
    } catch (err) {
        res.status(400).json(err)
    }
}

async function deleteCampaignById(req, res, next) {
    var id = req.params.id;
    try {
        var result = await campaignModel.DeleteCampaignById(id);
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