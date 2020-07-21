const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require("config");
var model = require('../model/model');
var adminModel = require('../model/adminModel');
const bannerModel = require('../model/bannerModel');

async function adminLogIn(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    try {

        var admin = await model.GetAllByFieldString('admin', 'username', username);

        if (bcrypt.compareSync(password, admin[0].password)) {
            delete admin[0]["password"];
            var payload = { admin: admin[0] };
            var jwtToken = jwt.sign(payload, config.get("jwtSecret"), { expiresIn: "12h" });
            res.status(200).json({ message: 'Sign in is successfully', token: jwtToken })
        } else {
            res.status(401).json({ message: 'The username or password you entered is incorrect.' })
        }
    } catch (err) {
        res.status(401).json({ message: 'The username or password you entered is incorrect.' })
    }
}

async function getAllUser(req, res, next) {
    try {
        var result = await adminModel.GetAllUser();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getAllPartner(req, res, next) {
    try {
        var result = await adminModel.GetAllPartner();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err)
    }
}

async function updatePartner(req, res, next) {
    var partner_id = req.params.id;
    partner = {
        ...req.body
    }

    try {
        await model.Update('partner', partner, partner_id);
        res.status(200).json({ message: "Updated successfully" })
    } catch (err) {
        res.status(400).json(err)
    }
}

async function createBanner(req, res, next) {
    var banner = {
        ...req.body
    }

    try {
        await model.Create('banner', banner);
        var result = await bannerModel.GetAllBanner();
        res.status(201).json({ message: "Created", banners: result });
    } catch (err) {
        res.status(400).json(err)
    }
}

async function deleteBanner(req, res, next) {
    var banner_id = req.params.id;
    try {
        await model.DeleteById('banner', banner_id);
        res.status(200).json({ message: "Deleted" });
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    adminLogIn: adminLogIn,
    getAllUser: getAllUser,
    getAllPartner: getAllPartner,
    updatePartner: updatePartner,
    createBanner: createBanner,
    deleteBanner: deleteBanner
}