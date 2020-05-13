var db = require("../common/database");
var conn = db.getConnection();
var q = require("q");

function GetAllUserVoucherByIdPartner(partner_id) {
    if (partner_id) {
        var defer = q.defer();
        var query = conn.query(`SELECT * FROM user_voucher, voucher WHERE user_voucher.voucher_id = voucher.id and voucher.partner_id = ${partner_id}`,
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

function GetAllUserVoucherByUserId(user_id) {
    if (user_id) {
        var defer = q.defer();
        var query = conn.query(`SELECT voucher.*, user_voucher.created_at, campaign.name as campiagn_name, campaign.image as campaign_image, campaign.start_time, campaign.end_time ` +
                                `FROM user_voucher, voucher, campaign ` + 
                                `WHERE user_voucher.voucher_id = voucher.id ` + 
                                `AND user_voucher.user_id = ${user_id} ` + 
                                `AND user_voucher.available = true AND voucher.campaign_id = campaign.id`,
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
    GetAllUserVoucherByIdPartner: GetAllUserVoucherByIdPartner,
    GetAllUserVoucherByUserId: GetAllUserVoucherByUserId,
}