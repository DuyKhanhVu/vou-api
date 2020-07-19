var path = require('path');
var model = require('../model/model');
var voucherModel = require('../model/voucherModel');
var userVoucherModel = require('../model/userVoucherModel');
const { PubSub } = require('@google-cloud/pubsub');
const pubSubClient = new PubSub();
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(__dirname, '/config/google_credential.json')

async function getVoucherById(req, res, next) {
    var id = req.params.id;
    try {
        var result = await model.GetById("voucher", id);
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getVoucherByCampaignId(req, res, next) {
    var campaign_id = req.params.campaign_id;
    var result = {}
    try {
        result = await voucherModel.GetOneByCampaignId(campaign_id);
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }

    await model.Update("voucher", { available: false }, result.id);
    user_voucher = {
        user_id: req.user.id,
        voucher_id: result.id,
        available: true,
        created_at: new Date(),
    }
    await model.Create("user_voucher", user_voucher);

    var data = JSON.stringify({
        username: req.user.username,
        display_name: req.user.display_name,
        partner_id: req.body.partner_id,
        campaign_id: campaign_id,
        score: req.body.score,
        game: req.body.game,
        created_at: new Date()
    })
    console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS)
    console.log(data);
    const dataBuffer = Buffer.from(data);
    await pubSubClient.topic('projects/vou-app-278013/topics/vou-app').publish(dataBuffer);
    
}

async function updateVoucherById(req, res, next) {
    var id = req.params.id;
    var voucher = {
        ...req.body
    }
    try {
        var result = await model.Update("voucher", voucher, id);
        voucher.id = id;
        res.status(200).json(voucher)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function deleteVoucherById(req, res, next) {
    var id = req.params.id;
    try {
        var result = await model.DeleteById("voucher", id);
        res.status(200).json({ message: `Deleted voucher's id = ${id}` })
    } catch (err) {
        res.status(400).json(err)
    }
}

async function checkAvailableUserVoucher(req, res, next) {
    var code = req.params.code;
    try {
        result = await userVoucherModel.GetUserVoucherByCode(code);
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    getVoucherById: getVoucherById,
    getVoucherByCampaignId: getVoucherByCampaignId,
    updateVoucherById: updateVoucherById,
    deleteVoucherById: deleteVoucherById,
    checkAvailableUserVoucher: checkAvailableUserVoucher
}