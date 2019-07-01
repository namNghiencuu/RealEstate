var express = require("express");
var router = express.Router();
var connection = require("db/dbconfig");
var mysql = require("mysql");
var multer = require("multer");
var { insert, selectAll, selectById } = require("services/runQuery");
var { uploadFile, getLinkMany, getLink } = require("services/uploadFile");

router.get("/", function(req, res, next) {
  return res.render("index", { title: "Express" });
});
router.get("/billingAfterPost", function(req, res, next) {
  return res.render("billingafterpost", { title: "Express" });
});
router.get("/buy", function(req, res, next) {
  return res.render("buy", { title: "Express" });
});
router.get("/checkaccount", function(req, res, next) {
  return res.render("checkaccount", { title: "Express" });
});
router.get("/checkpackages", function(req, res, next) {
  return res.render("checkpackages", { id: req.params.id });
});

router.post("/checkpackages", function(req, res, next) {
  insert(
    "transaction",
    {
      amount: req.body.packages,
      method: "POST FEE",
      customer_id: req.user.id
    },
    function(err, result) {
      let sqlString = mysql.format(
        "INSERT INTO personalpost(post_id, customer_id) values( ?, ?)",
        [result.insertId, 1]
      );
      connection.query(sqlString, function(err, result) {
        if (err) throw err;
        console.log("insert into personalpost");
      });
    }
  );

  return res.redirect("/personalPost");
});

router.get("/contactEstate", function(req, res, next) {
  return res.render("contactEstate", { title: "Express" });
});
router.get("/error", function(req, res, next) {
  return res.render("error", { title: "Express" });
});
router.get("/interbank", function(req, res, next) {
  return res.render("interbank", { title: "Express" });
});
router.get("/menuestate", function(req, res, next) {
  return res.render("menuestate", { title: "Express" });
});
router.get("/realestate", function(req, res, next) {
  return res.render("realestate", { title: "Express" });
});
router.get("/renthome", function(req, res, next) {
  return res.render("renthome", { title: "Express" });
});
router.get("/VerifyByService", function(req, res, next) {
  res.render("VerifyByService", { title: "Express" });
});
router.get("/salehome", function(req, res, next) {
  return res.render("salehome", { title: "Express" });
});
router.post("/salehome", function(req, res, next) {
  try {
    let sqlString =
      "INSERT INTO post(title, addressString, price, propertyArea) values ( ?, ?, ?, ?)";
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
        "INSERT INTO personalpost(post_id, customer_id) values( ?, ?)",
        [result.insertId, req.user.id]
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

router.get("/typeproperty", function(req, res, next) {
  return res.render("typeproperty", { title: "Express" });
});

router.post("/test", uploadFile("images").array("images", 10), function(
  req,
  res,
  next
) {
  return res.send(getLinkMany(req.files).toString());
});

module.exports = router;
