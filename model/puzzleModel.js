var db = require("../common/database");
var conn = db.getConnection();
var q = require("q");

function GetTransferPieceHistoryByUserId(user_id) {
    if (user_id) {
        var defer = q.defer();
        var query = conn.query(`SELECT * FROM piece_transfer_history WHERE id_target = ${user_id} OR id_source = ${user_id}`,
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
    GetTransferPieceHistoryByUserId: GetTransferPieceHistoryByUserId
}