var model = require('../model/model');
var voucherModel = require('../model/voucherModel');
var userVoucherModel = require('../model/userVoucherModel');

async function getVoucherById(req, res, next) {
    var id = req.params.id;
    try {
        var result = await model.GetById("voucher", id);
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getVoucherByPartnerId(req, res, next) {
    var partner_id = req.params.partner_id;
    var result = {}
    try {
        result = await voucherModel.GetOneByPartnerId(partner_id);
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
        res.status(200).json({ result: result[0].available === 1 })
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    getVoucherById: getVoucherById,
    getVoucherByPartnerId: getVoucherByPartnerId,
    updateVoucherById: updateVoucherById,
    deleteVoucherById: deleteVoucherById,
    checkAvailableUserVoucher: checkAvailableUserVoucher
}