var db = require("../common/database");
var conn = db.getConnection();
var q = require("q");

function GetAllByIdPartner(partner_id) {
    if (partner_id) {
        var defer = q.defer();
        var query = conn.query(`SELECT voucher.* FROM voucher, campaign WHERE voucher.campaign_id = campaign.id AND campaign.partner_id = ${partner_id}`,
            function (err, result) {
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

function GetOneByCampaignId(campaign_id) {
    if (campaign_id) {
        var defer = q.defer();
        var query = conn.query(`SELECT voucher.*, campaign.image as campaign_image, campaign.partner_id, campaign.discount, campaign.description FROM voucher, campaign 
                                WHERE voucher.campaign_id = campaign.id AND campaign.id = ${campaign_id} AND available = 1 LIMIT 1`,
            function (err, result) {
                if (err) {
                    console.log(err);
                    defer.reject(err);
                } else {
                    defer.resolve(result[0]);
                }
            });
        return defer.promise;
    }
    return false;
}

module.exports = {
    GetAllByIdPartner: GetAllByIdPartner,
    GetOneByCampaignId: GetOneByCampaignId
}