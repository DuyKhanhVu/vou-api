var db = require("../common/database");
var conn = db.getConnection();
var q = require("q");

function GetAllByIdPartner(partner_id) {
    if (partner_id) {
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

function GetOneByPartnerId(partner_id) {
    if (partner_id) {
        var defer = q.defer();
        var query = conn.query(`SELECT * FROM voucher WHERE ? AND available = true LIMIT 1`, { partner_id: partner_id },
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
    GetAllByIdPartner: GetAllByIdPartner,
    GetOneByPartnerId: GetOneByPartnerId
}