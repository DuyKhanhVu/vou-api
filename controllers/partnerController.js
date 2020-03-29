var model = require('../model/model');
var voucherModel = require('../model/voucherModel');
var CodeGenerator = require('node-code-generator');
var QRCode = require('qrcode')

async function createVoucher(req, res, next) {
    // Generate an array of random unique codes according to the provided pattern:
    var generator = new CodeGenerator();
    var codes = generator.generateCodes('**********', 10, {});

    const qr_code = await QRCode.toDataURL(codes[0])
    var voucher = {
        code: codes[0],
        qr_code: qr_code,
        start_time: req.body.startTime,
        end_time: req.body.endTime,
        discount: req.body.discount,
        partner_id: req.params.partner_id
    }

    try {
        var result = await model.Create('voucher', voucher);
        voucher.id = result.insertId;
        res.status(200).json(voucher)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getAllVoucher(req, res, next) {
    var partner_id = req.params.partner_id;
    try {
        var result = await voucherModel.GetAllByIdPartner(partner_id);
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    createVoucher: createVoucher,
    getAllVoucher: getAllVoucher
}