var express = require("express");
var router = express.Router();
var passport = require("passport");
var mysql = require("mysql");
var conn = require("db/dbconfig");

router.get("/login", function(req, res, next) {
  return res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: false
  }),
  function(req, res) {
    return res.send(req.user);
  }
);

router.get("/logout", function(req, res) {
  req.logout();
  res.send(null);
});

router.get("/test", function(req, res) {
  var email = "admin@admin";
  var password = "123";
  var sqlString = mysql.format(
    "SELECT id, displayName, type, email, avatar, displayName from useraccount where email = ? AND password = ? LIMIT 0,1 ",
    [email, password]
  );
  conn.query(sqlString, function(err, result) {
    if (err) throw err;
    if (!result) return res.send("error");
    else return res.send(result);
  });
});

module.exports = router;
