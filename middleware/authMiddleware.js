var userModel = require('../model/userModel');
var partnerModel = require('../model/partnerModel');
var config = require('config');
var jwt = require('jsonwebtoken');
const model = require('../model/model');

async function isAuthenticated(req, res, next) {
    if (req.headers &&
        req.headers.token &&
        req.headers.token.split(' ')[0] === 'JWT') {

        var jwtToken =  req.headers.token.split(' ')[1];
        jwt.verify(jwtToken, config.get("jwtSecret"), async function(err, payload) {
            if (err) {
                res.status(401).json({message: 'Unauthorized user!'});
            } else {
                try {
                    var user = await userModel.GetUserByUsername(payload.user.username);
                    if (user) {
                        req.user = user;
                        next();
                    } else {
                        res.status(401).json({ message: 'Unauthorized user!' });
                    }
                } catch (err) {
                    res.status(401).json({ message: 'Unauthorized user!' });
                }
            }
        });
    } else {
        res.status(401).json({ message: 'Error validating access token.' });
    }
};

async function isAuthenticatedPartner(req, res, next) {
    if (req.headers &&
        req.headers.token &&
        req.headers.token.split(' ')[0] === 'JWT') {

        var jwtToken =  req.headers.token.split(' ')[1];
        jwt.verify(jwtToken, config.get("jwtSecret"), async function(err, payload) {
            if (err) {
                res.status(401).json({message: 'Unauthorized user!'});
            } else {
                try {
                    var user = await partnerModel.GetPartnerByUsername(payload.user.username);
                    if (user) {
                        req.user = user;
                        next();
                    } else {
                        res.status(401).json({ message: 'This user is not partner' });
                    }
                } catch (err) {
                    res.status(401).json({ message: 'Unauthorized user!' });
                }
            }
        });
    } else {
        res.status(401).json({ message: 'Unauthorized user!' });
    }
};

async function isAuthenticatedAdmin(req, res, next) {
    if (req.headers &&
        req.headers.token &&
        req.headers.token.split(' ')[0] === 'JWT') {

        var jwtToken =  req.headers.token.split(' ')[1];
        jwt.verify(jwtToken, config.get("jwtSecret"), async function(err, payload) {
            if (err) {
                res.status(401).json({message: 'Unauthorized user!'});
            } else {
                try {
                    var admin = await model.GetAllByFieldString('admin', 'username', payload.admin.username);
                    if (admin.length > 0) {
                        req.user = admin[0];
                        next();
                    } else {
                        res.status(401).json({ message: 'This user is not admin' });
                    }
                } catch (err) {
                    res.status(401).json({ message: 'Unauthorized user!' });
                }
            }
        });
    } else {
        res.status(401).json({ message: 'Unauthorized user!' });
    }
};

module.exports = {
    isAuthenticated: isAuthenticated,
    isAuthenticatedPartner: isAuthenticatedPartner,
    isAuthenticatedAdmin: isAuthenticatedAdmin
}