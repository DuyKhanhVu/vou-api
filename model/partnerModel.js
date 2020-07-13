var db = require("../common/database");
var conn = db.getConnection();
var q = require("q");

function GetPartnerByUsername(username) {
    if (username) {
        var defer = q.defer();
        var query = conn.query(`SELECT * FROM partner WHERE ?`, { username: username }, function (err, result) {
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

function GetAllPartner() {
    var defer = q.defer();
    var query = conn.query(`SELECT * FROM user WHERE id IN (SELECT id FROM partner) 
                            AND  id IN (SELECT DISTINCT (partner_id) FROM campaign);`,
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

function GetAllMyEmployee(partner_id) {
    if (partner_id) {
        var defer = q.defer();
        var query = conn.query(`SELECT * FROM employee WHERE partner_id = ${partner_id}`, function (err, result) {
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
    GetPartnerByUsername: GetPartnerByUsername,
    GetAllPartner: GetAllPartner,
    GetAllMyEmployee: GetAllMyEmployee
}