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

async function getUserByUsername(req, res, next) {
    var username = req.params.username;
    try {
        var result = await model.GetAllByFieldString("user", "username", username);
        res.status(200).json({ id: result[0].id, display_name: result[0].display_name })
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
    getUserByUsername: getUserByUsername,
    updateMyProfile: updateMyProfile,
    getAllMyVoucher: getAllMyVoucher
}