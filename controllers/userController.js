var model = require('../model/model');
var userVoucherModel = require('../model/userVoucherModel');

async function getMyProfile(req, res, next) {
    delete req.user.password
    res.status(200).json(req.user)
}

async function getUserById(req, res, next) {
    var id = req.params.id;
    try {
        var result = await model.GetById("user", id);
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function updateMyProfile(req, res, next) {
    var id = req.user.id;
    var user = {
        ...req.body
    }
    if (user.username || user.password) {
        res.status(400).json({ error: "Can't update username or password" })
    } else {
        try {
            var result = await model.Update("user", user, id);
            res.status(200).json(user)
        } catch (err) {
            res.status(400).json(err)
        }
    }
}

async function getAllMyVoucher(req, res, next) {
    var id = req.user.id;
    try {
        var result = await userVoucherModel.GetAllUserVoucherByUserId(id);
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    getMyProfile: getMyProfile,
    getUserById: getUserById,
    updateMyProfile: updateMyProfile,
    getAllMyVoucher: getAllMyVoucher
}