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

function GetReceivedVoucher() {
    var defer = q.defer();
    var query = conn.query(`SELECT campaign.*, count(*) as voucher_recieved FROM voucher, campaign, user_voucher
                            WHERE user_voucher.voucher_id = voucher.id AND voucher.campaign_id = campaign.id AND campaign.deleted = false
                            GROUP BY campaign.id
                            ORDER BY voucher_recieved DESC`,
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

function UpdateAllVoucherByCampaignId(campaign_id, voucher) {
    if (campaign_id) {
        var defer = q.defer();
        var query = conn.query(`UPDATE voucher SET ? WHERE campaign_id = ${campaign_id}`, voucher, function (err, result) {
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
    GetReceivedVoucher: GetReceivedVoucher,
    UpdateAllVoucherByCampaignId: UpdateAllVoucherByCampaignId,
    DeleteCampaignById: DeleteCampaignById
}