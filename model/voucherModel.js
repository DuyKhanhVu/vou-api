var db = require("../common/database");
var conn = db.getConnection();
var q = require("q");

function GetAllByIdPartner(partner_id) {
    if (id) {
        var defer = q.defer();
        var query = conn.query(`SELECT * FROM voucher WHERE ?`, { partner_id: partner_id }, function (err, result) {
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
    GetAllByIdPartner: GetAllByIdPartner
}