var model = require('../model/model');

async function getAllGame(req, res, next) {
    try {
        var result = await model.GetAll('game');
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getGameById(req, res, next) {
    try {
        var result = await model.GetById('game', req.params.id);
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    getAllGame: getAllGame,
    getGameById: getGameById
}