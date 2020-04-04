var userModel = require('../model/userModel');
var config = require('config');
var jwt = require('jsonwebtoken');

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
                    var user = await userModel.GetUserByUsername(payload.username);
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
        res.status(401).json({ message: 'Unauthorized user!' });
    }
};

module.exports = {
    isAuthenticated: isAuthenticated
}