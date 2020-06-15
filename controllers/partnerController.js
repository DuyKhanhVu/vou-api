var model = require('../model/model');
var voucherModel = require('../model/voucherModel');
var userVoucherModel = require('../model/userVoucherModel');
var partnerModel = require('../model/partnerModel');

async function getAllPartner(req, res, next) {
    try {
        var results = await partnerModel.GetAllPartner();
        for (const result of results) {
            delete result["password"]
            delete result["refresh_token"]
            delete result["is_partner"]
        }
        res.status(200).json(results)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getPartnerById(req, res, next) {
    var id = req.params.id;
    try {
        var result = await model.GetById('partner', id);
        delete result[0]["password"]
        delete result[0]["refresh_token"]
        delete result[0]["is_partner"]
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getAllVoucher(req, res, next) {
    var partner_id = req.user.id;
    try {
        var result = await voucherModel.GetAllByIdPartner(partner_id);
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getAllUserVoucher(req, res, next) {
    var partner_id = req.user.id;
    try {
        var result = await userVoucherModel.GetAllUserVoucherByIdPartner(partner_id);
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    getAllPartner: getAllPartner,
    getPartnerById: getPartnerById,
    getAllVoucher: getAllVoucher,
    getAllUserVoucher: getAllUserVoucher
}