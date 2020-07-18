var db = require("../common/database");
var conn = db.getConnection();
var q = require("q");

function GetAllUser() {
    var defer = q.defer();
    var query = conn.query(`SELECT * FROM user WHERE role = 'user';`,
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
    GetAllUser: GetAllUser
}