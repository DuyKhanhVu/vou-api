var model = require('../model/model');
var voucherModel = require('../model/voucherModel');
var CodeGenerator = require('node-code-generator');
var QRCode = require('qrcode')

async function getAllPartner(req, res, next) {
    try {
        var result = await model.GetAllByField('user','is_partner', true);
        delete result["password"]
        delete result["refresh_token"]
        delete result["is_partner"]
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function createVoucher(req, res, next) {
    // Generate an array of random unique codes according to the provided pattern:
    if (req.body.promo_code.length > 10) {
        return res.status(400).json({ error: "Promo code too long." })
    }
    var generator = new CodeGenerator();
    var codes = generator.generateCodes(`${req.body.promo_code}**********`, req.body.count, {});

    var vouchers = []

    for (const code of codes) {
        let qr_code = await QRCode.toDataURL(code)
        let voucher = {
            promo_code: req.body.promo_code,
            code: code,
            qr_code: qr_code,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            discount: req.body.discount,
            partner_id: req.user.id
        }

        try {
            var result = await model.Create('voucher', voucher);
            voucher.id = result.insertId;
            vouchers.push(voucher)
        } catch (err) {
            res.status(400).json(err)
        }
    }
    return res.status(200).json(vouchers)

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

module.exports = {
    getAllPartner: getAllPartner,
    createVoucher: createVoucher,
    getAllVoucher: getAllVoucher
}