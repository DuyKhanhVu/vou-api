const bcrypt = require('bcrypt');
var model = require('../model/model');
var userModel = require('../model/userModel');

async function signIn(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var checkUser = await userModel.GetUserByUsername(username);
    try {
        var result = await model.GetAll('partner');
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function signUp(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var checkUser = await userModel.GetUserByUsername(username);
    if ((password.length < 6) || (password.length > 16)) {
        res.status(400).json({ message: 'That password is to short (or too long). Please make sure your password is between 6 and 16 characters.' })
    } else if (checkUser.length > 0) {
        res.status(409).json({ message: 'username have been exists' })
    } else {
        var salt = 8;
        var passwordHash = await bcrypt.hash(password, salt);

        var user = {
            username: username,
            password: passwordHash
        }

        try {
            var result = await model.Create('user', user);
            res.status(200).json({message: `You have successfully created your account. Your id is ${result.insertId}`})
        } catch (err) {
            res.status(400).json(err)
        }
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
    signIn: signIn,
    signUp: signUp,
    getAllVoucher: getAllVoucher
}