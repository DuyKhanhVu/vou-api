var db = require("../common/database");
var conn = db.getConnection();
var q = require("q");

function GetTransferPieceHistoryByUserId(user_id) {
    if (user_id) {
        var defer = q.defer();
        var query = conn.query(`SELECT matches.*, user.display_name AS source_name
                    FROM (SELECT piece_transfer_history.*, user.display_name AS target_name FROM piece_transfer_history
                            INNER JOIN user ON piece_transfer_history.id_target = user.id) AS matches
                    INNER JOIN user ON matches.id_source = user.id
                    WHERE matches.id_source = ${user_id} OR matches.id_target = ${user_id}`,
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

function UpdatePiecesAfterGetVoucher(user_id) {
    if (user_id) {
        var defer = q.defer();
        var query = conn.query(`UPDATE puzzle
                                SET piece1 = piece1 - 1, piece2 = piece2 - 1, piece3 = piece3 - 1, piece4 = piece4 - 1,
                                    piece5 = piece5 - 1, piece6 = piece6 - 1, piece7 = piece7 - 1, piece8 = piece8 - 1,
                                    piece9 = piece9 - 1, piece10 = piece10 - 1, piece11 = piece11 - 1, piece12 = piece12 - 1
                                WHERE user_id = ${user_id}`,
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
    GetTransferPieceHistoryByUserId: GetTransferPieceHistoryByUserId,
    UpdatePiecesAfterGetVoucher: UpdatePiecesAfterGetVoucher
}