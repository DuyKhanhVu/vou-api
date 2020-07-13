var model = require('../model/model');

async function updateUserVoucher(req, res, next) {
    var id = req.params.id;
    var user_voucher = {
        ...req.body
    }
    try {
        var result = await model.Update('user_voucher', user_voucher, id)
        var user_voucher = await model.GetAllByField('user_voucher', 'id', id);
        var user = await model.GetAllByField('user', 'id', user_voucher[0].user_id);
        delete user[0].password;
        delete user[0].refresh_tolen;
        res.status(200).json({ message: 'Updated successfully', user: user[0], user_voucher: user_voucher[0] })
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    updateUserVoucher: updateUserVoucher
}