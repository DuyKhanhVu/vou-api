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

module.exports = {
    GetPartnerByUsername: GetPartnerByUsername
}