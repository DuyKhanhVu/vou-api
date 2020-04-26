var model = require('../model/model');
var bannerModel = require('../model/bannerModel');

async function createBanner(req, res, next) {
    var banner = {
        ...req.body,
    }

    try {
        var result = await model.Create('banner', banner);
        banner.id = result.insertId;
        res.status(200).json(banner)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getAllBanner(req, res, next) {
    var id = req.params.id;
    try {
        var result = await bannerModel.GetAllBanner();
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getBannerById(req, res, next) {
    var id = req.params.id;
    try {
        var result = await bannerModel.GetBannerById(id);
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function updateBannerById(req, res, next) {
    var id = req.params.id;
    var banner = {
        ...req.body
    }
    try {
        var result = await model.Update("banner", banner, id);
        banner.id = id;
        res.status(200).json(banner)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function deleteBannerById(req, res, next) {
    var id = req.params.id;
    try {
        var result = await model.DeleteById("banner", id);
        res.status(200).json({ message: `Deleted banner's id = ${id}` })
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    createBanner: createBanner,
    getAllBanner: getAllBanner,
    getBannerById: getBannerById,
    updateBannerById: updateBannerById,
    deleteBannerById: deleteBannerById
}