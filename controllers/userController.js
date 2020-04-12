var model = require('../model/model');

async function getMyProfile(req, res, next) {
    delete req.user.password
    res.status(200).json(req.user)
}

module.exports = {
    getMyProfile: getMyProfile,
}