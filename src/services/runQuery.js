var connection = require("db/dbconfig");
var mysql = require("mysql");

module.exports = {
  insert: (table, data, cb) => {
    return new Promise((resolve, reject) => {
      try {
        let sqlString = "INSERT INTO " + table + " SET ?";
        sqlString = mysql.format(sqlString, [data]);
        connection.query(sqlString, function(err, result) {
          if (err) throw err;
          resolve(cb(null, result));
        });
      } catch (error) {
        reject(cb(error, null));
      }
    });
  },
  selectAll: table => {
    return new Promise((resolve, reject) => {
      try {
        let sqlString = mysql.format("SELECT * FROM ??", [table]);
        connection.query(sqlString, function(err, result) {
          if (err) throw err;
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  selectById: (table, id) => {
    return new Promise((resolve, reject) => {
      try {
        let sqlString = "SELECT * FROM " + table + " WHERE id = ?";
        sqlString = mysql.format(sqlString, [id]);
        connection.query(sqlString, function(err, result) {
          if (err) throw err;
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  selectByOneAttribute: (table, attribute, value) => {
    return new Promise((resolve, reject) => {
      try {
        let sqlString =
          "SELECT * FROM " + table + " WHERE " + attribute + " = ?";
        sqlString = mysql.format(sqlString, [value]);
        connection.query(sqlString, function(err, result) {
          if (err) throw err;
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
};
