var model = require('../model/model');
var favoriteStoreModel = require('../model/favoriteStoreModel');

async function createFavoriteStore(req, res, next) {
    var favoriteStore = {
        user_id: req.user.id,
        partner_id: req.body.partner_id 
    }
    try {
        await model.Create("favorite_store", favoriteStore);
        res.status(201).json({ message: "Create successfully" })
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getMyFavoriteStore(req, res, next) {
    try {
        var results = await favoriteStoreModel.GetMyFavoriteStore(req.user.id);
        for (const result of results) {
            delete result["password"]
            delete result["refresh_token"]
        }
        res.status(200).json(results)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function deleteMyFavoriteStore(req, res, next) {
    try {
        var result = await favoriteStoreModel.DeleteMyFavoriteStore(req.user.id, req.body.partner_id);
        res.status(200).json({message: 'Deleted'})
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    createFavoriteStore: createFavoriteStore,
    getMyFavoriteStore: getMyFavoriteStore,
    deleteMyFavoriteStore: deleteMyFavoriteStore
}