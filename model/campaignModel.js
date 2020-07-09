var db = require("../common/database");
var conn = db.getConnection();
var q = require("q");

function GetAllCampaign() {
    var defer = q.defer();
    var query = conn.query(`SELECT campaign.*, ` +
        `(SELECT COUNT(*) FROM voucher WHERE voucher.campaign_id = campaign.id AND voucher.available = TRUE) AS num_of_voucher ` +
        `FROM campaign WHERE deleted = false;`,
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

function GetAllCampaignByPartnerId(partner_id) {
    if (partner_id) {
        var defer = q.defer();
        var query = conn.query(`SELECT campaign.*, ` +
            `(SELECT COUNT(*) FROM voucher WHERE voucher.campaign_id = campaign.id AND voucher.available = TRUE) AS num_of_voucher ` +
            `FROM campaign WHERE deleted = false AND campaign.partner_id = ${partner_id};`,
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

function DeleteCampaignById(id) {
    if (id) {
        var defer = q.defer();
        var query = conn.query(`UPDATE campaign SET deleted = true WHERE id = ${id}`,
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

module.exports = {
    GetAllCampaign: GetAllCampaign,
    GetAllCampaignByPartnerId: GetAllCampaignByPartnerId,
    DeleteCampaignById: DeleteCampaignById
}