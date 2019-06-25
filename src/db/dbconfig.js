var mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "admin123456",
  database: "realestate"
});

module.exports = pool;
