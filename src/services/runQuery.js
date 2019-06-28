var connection = require("db/dbconfig");
var mysql = require("mysql");

module.exports = {
  insert: (table, data, cb) => {
    try {
      let sqlString = "INSERT INTO " + table + " SET ?";
      sqlString = mysql.format(sqlString, [data]);
      connection.query(sqlString, function(err, result) {
        if (err) throw err;
        return cb(null, result);
      });
    } catch (error) {
      return cb(error, null);
    }
  },
  selectAll: table => {
    try {
      let sqlString = "SELECT * FROM " + table;
      connection.query(sqlString, function(err, result) {
        if (err) throw err;
        return result;
      });
    } catch (error) {
      return error;
    }
  }
};
