const bcrypt = require('bcrypt');
var model = require('../model/model');
var voucherModel = require('../model/voucherModel');
var userVoucherModel = require('../model/userVoucherModel');
var partnerModel = require('../model/partnerModel');

async function getAllPartner(req, res, next) {
    try {
        var results = await partnerModel.GetAllPartner();
        for (const result of results) {
            delete result["password"]
            delete result["refresh_token"]
            delete result["is_partner"]
        }
        res.status(200).json(results)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getPartnerById(req, res, next) {
    var id = req.params.id;
    try {
        var result = await model.GetById('partner', id);
        delete result[0]["password"]
        delete result[0]["refresh_token"]
        delete result[0]["is_partner"]
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
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

async function getAllUserVoucher(req, res, next) {
    var partner_id = req.user.id;
    try {
        var result = await userVoucherModel.GetAllUserVoucherByIdPartner(partner_id);
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function createEmployee(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var checkUser = await model.GetAllByFieldString('employee', 'username', username);
    if ((password.length < 6) || (password.length > 16)) {
        res.status(400).json({ message: 'That password is to short (or too long). Please make sure your password is between 6 and 16 characters.' })
    } else if (checkUser.length > 0) {
        res.status(409).json({ message: 'Username have been exists' })
    } else {
        var salt = 8;
        var passwordHash = await bcrypt.hash(password, salt);

        var employee = {
            username: username,
            password: passwordHash,
            display_name: req.body.display_name,
            partner_id: req.user.id
        }

        try {
            result = await model.Create('employee', employee);
            res.status(200).json({ message: `You have successfully created your account`, employee: employee })
        } catch (err) {
            if (err.code == 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: `Username has already been taken` })
            }
            res.status(400).json(err)
        }
    }
}

async function getAllEmployee(req, res, next) {
    try {
        var result = await partnerModel.GetAllMyEmployee(req.user.id);
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function deleteEmployee(req, res, next) {
    var employee_id = req.params.id;

    try {
        var result = await model.DeleteById('employee', employee_id);
        res.status(200).json({ message: "Deleted successfully" })
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    getAllPartner: getAllPartner,
    getPartnerById: getPartnerById,
    getAllVoucher: getAllVoucher,
    getAllUserVoucher: getAllUserVoucher,
    createEmployee: createEmployee,
    getAllEmployee: getAllEmployee,
    deleteEmployee: deleteEmployee
}