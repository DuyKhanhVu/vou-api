const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require("config");
var model = require('../model/model');
var userModel = require('../model/userModel');
var partnerModel = require('../model/partnerModel');

async function signIn(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    try {
        if (req.body.is_partner) {
            var user = await partnerModel.GetPartnerByUsername(username);
        } else {
            var user = await userModel.GetUserByUsername(username);
        }

        if (bcrypt.compareSync(password, user.password)) {
            delete user["password"];
            delete user["refresh_token"];
            var payload = { user: user };
            var jwtToken = jwt.sign(payload, config.get("jwtSecret"), { expiresIn: "12h" });
            res.status(200).json({ message: 'Sign in is successfully', token: jwtToken })
        } else {
            res.status(401).json({ message: 'The username or password you entered is incorrect.' })
        }
    } catch (err) {
        res.status(401).json({ message: 'The username or password you entered is incorrect.' })
    }
}

async function signUp(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var checkUser = await userModel.GetUserByUsername(username);
    if ((password.length < 6) || (password.length > 16)) {
        res.status(400).json({ message: 'That password is to short (or too long). Please make sure your password is between 6 and 16 characters.' })
    } else if (checkUser > 0) {
        res.status(409).json({ message: 'username have been exists' })
    } else {
        var salt = 8;
        var passwordHash = await bcrypt.hash(password, salt);

        var user = {
            username: username,
            password: passwordHash
        }

        try {
            result = await model.Create('user', user);
            if (req.body.id_partner) {
                user.id = result.insertId;
                await model.Create('partner', user);
            }
            res.status(200).json({ message: `You have successfully created your account`, user: user })
        } catch (err) {
            res.status(400).json(err)
        }
    }
}

module.exports = {
    signIn: signIn,
    signUp: signUp,
}