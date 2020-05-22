var model = require('../model/model');

async function updateUserVoucher(req, res, next) {
    var id = req.params.id;
    var user_voucher = {
        ...req.body
    }
    try {
        var result = await model.Update('user_voucher', user_voucher, id)
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    updateUserVoucher: updateUserVoucher
}