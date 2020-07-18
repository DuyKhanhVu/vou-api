var db = require("../common/database");
var conn = db.getConnection();
var q = require("q");

function GetMyFavoriteStore(user_id) {
    if (user_id) {
        var defer = q.defer();
        var query = conn.query(`SELECT user.* FROM favorite_store, user 
                            WHERE favorite_store.user_id = ${user_id} AND favorite_store.partner_id = user.id;`,
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

function DeleteMyFavoriteStore(user_id, partner_id) {
    if (user_id) {
        var defer = q.defer();
        var query = conn.query(`DELETE FROM favorite_store
                            WHERE favorite_store.user_id = ${user_id} AND favorite_store.partner_id = ${partner_id};`,
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
    GetMyFavoriteStore: GetMyFavoriteStore,
    DeleteMyFavoriteStore: DeleteMyFavoriteStore
}