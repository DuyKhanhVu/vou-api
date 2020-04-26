var db = require("../common/database");
var conn = db.getConnection();
var q = require("q");

function GetAllBanner() {
    var defer = q.defer();
    var query = conn.query(`SELECT * FROM banner, campaign WHERE banner.campaign_id = campaign.id`, function (err, result) {
        if (err) {
            console.log(err);
            defer.reject(err);
        } else {
            defer.resolve(result);
        }
    });
    return defer.promise;
}

function GetBannerById(id) {
    if (id) {
        var defer = q.defer();
        var query = conn.query(`SELECT * FROM banner, campaign WHERE banner.id = ${id} AND banner.campaign_id = campaign.id`, function (err, result) {
            if (err) {
                console.log(err);
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

module.exports = {
    GetAllBanner: GetAllBanner,
    GetBannerById: GetBannerById,
}