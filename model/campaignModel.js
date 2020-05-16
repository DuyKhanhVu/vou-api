var db = require("../common/database");
var conn = db.getConnection();
var q = require("q");

function GetAllCampaign() {
    var defer = q.defer();
    var query = conn.query(`SELECT campaign.*, ` + 
        `(SELECT COUNT(*) FROM voucher WHERE voucher.campaign_id = campaign.id AND voucher.available = TRUE) AS num_of_voucher ` +
        `FROM campaign;`,
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

module.exports = {
    GetAllCampaign: GetAllCampaign
}