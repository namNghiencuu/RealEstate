var express = require("express");
var router = express.Router();
var connection = require("db/dbconfig");
var mysql = require("mysql");
var { insert } = require("services/runQuery");

router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/billingAfterPost", function(req, res, next) {
  res.render("billingafterpost", { title: "Express" });
});
router.get("/buy", function(req, res, next) {
  res.render("buy", { title: "Express" });
});
router.get("/checkaccount", function(req, res, next) {
  res.render("checkaccount", { title: "Express" });
});
router.get("/checkpackages", function(req, res, next) {
  res.render("checkpackages", { title: "Express" });
});
router.get("/chooseProperty", function(req, res, next) {
  res.render("chooseProperty", { title: "Express" });
});
router.get("/contactEstate", function(req, res, next) {
  res.render("contactEstate", { title: "Express" });
});
router.get("/error", function(req, res, next) {
  res.render("error", { title: "Express" });
});
router.get("/interbank", function(req, res, next) {
  res.render("interbank", { title: "Express" });
});
router.get("/menuestate", function(req, res, next) {
  res.render("menuestate", { title: "Express" });
});
router.get("/realestate", function(req, res, next) {
  res.render("realestate", { title: "Express" });
});
router.get("/renthome", function(req, res, next) {
  res.render("renthome", { title: "Express" });
});
router.get("/salehome", function(req, res, next) {
  res.render("salehome", { title: "Express" });
});
router.post("/salehome", function(req, res, next) {
  try {
    let sqlString =
      "INSERT INTO post(title, addressString, price, propertyArea) values ( ??, ??, ??, ??)";
    sqlString = mysql.format(sqlString, [
      req.body.title,
      req.body.address,
      req.body.price,
      req.body.area
    ]);
    connection.query(sqlString, function(err, result) {
      if (err) throw err;
      res.send(result);
      let sqlString = mysql.format(
        "INSERT INTO personalpost(post_id, customer_id) values( ??, ??)",
        [resul.insertId, 1]
      );
      connection.query(sqlString, function(err, result) {
        if (err) throw err;
        console.log("insert into personalpost");
      });
    });
  } catch (error) {
    console.log(error + "");
  }
});
router.get("/allpost", function(req, res, next) {
  let sqlString = "SELECT * FROM post";
  connection.query(sqlString, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});
router.post("/post", function(req, res, next) {
  req.body.customer_id = req.user.id;
  res.send(req.body);
});
router.get("/typeproperty", function(req, res, next) {
  res.render("typeproperty", { title: "Express" });
});

module.exports = router;
