var model = require('../model/model');
var voucherModel = require('../model/voucherModel');

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
    try {
        var result = await voucherModel.GetOneByPartnerId(partner_id);
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function updateVoucherById(req, res, next) {
    var id = req.params.id;
    var voucher = {
        start_time: req.body.startTime,
        end_time: req.body.endTime,
        discount: req.body.discount
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
        res.status(200).json({message: `Deleted voucher's id = ${id}`})
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    getVoucherById: getVoucherById,
    getVoucherByPartnerId: getVoucherByPartnerId,
    updateVoucherById: updateVoucherById,
    deleteVoucherById: deleteVoucherById
}