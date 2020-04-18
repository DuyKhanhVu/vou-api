var db = require("../common/database");
var conn = db.getConnection();
var q = require("q");

function Create(table, data, id) {
    if (data) {
        var defer = q.defer();
        var query = conn.query(`INSERT INTO ${table} SET ?`, data, function (err, result) {
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

function GetAll(table) {
    var defer = q.defer();
    var query = conn.query(`SELECT * FROM ${table}`, function (err, result) {
        if (err) {
            console.log(err);
            defer.reject(err);
        } else {
            defer.resolve(result);
        }
    });
    return defer.promise;
}

function GetById(table, id) {
    if (id) {
        var defer = q.defer();
        var query = conn.query(`SELECT * FROM ${table} WHERE ?`, { id: id }, function (err, result) {
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

function GetAllByField(table, col_name, value) {
    if (table && col_name && value) {
        var defer = q.defer();
        var query = conn.query(`SELECT * FROM ${table} WHERE ${col_name} = ${value}`, function (err, result) {
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

function Update(table, data, id) {
    if (data) {
        var defer = q.defer();
        var query = conn.query(`UPDATE ${table} SET ? WHERE id = ${id}`, data, function (err, result) {
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

function DeleteById(table, id) {
    var defer = q.defer();
    var query = conn.query(`DELETE FROM ${table} WHERE ?`, { id: id }, function (err, result) {
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
    Create: Create,
    GetAll: GetAll,
    GetById: GetById,
    GetAllByField: GetAllByField,
    Update: Update,
    DeleteById: DeleteById
}