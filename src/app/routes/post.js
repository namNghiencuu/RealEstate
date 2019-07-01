var express = require("express");
var router = express.Router();
var { uploadFile, getLinkMany } = require("services/uploadFile");
var {
  selectAll,
  selectById,
  selectByOneAttribute,
  insert
} = require("services/runQuery");
var mysql = require("mysql");
var connection = require("db/dbconfig");

router.get("/post/:id", async function(req, res, next) {
  let post = await selectById("post", req.params.id).then(function(value) {
    value[0].propertyFacility = value[0].propertyFacility.split(",");
    value[0].images = value[0].images.split(",");
    value[0].legalDocument = value[0].legalDocument.split(",");
    value[0].user = req.user;
    return value[0];
  });
  if (post.status != "VERIFIED") {
    if (req.user.id == post.customer_id) {
      return res.render("post_template", { data: post });
    } else {
      res.render("error", { message: "post is not published yet" });
    }
  } else {
    return res.render("post_template", { data: post });
  }
});

router.post(
  "/post",
  uploadFile("images").fields([
    {
      name: "images",
      maxCount: 10
    },
    {
      name: "legalDocument",
      maxCount: 2
    }
  ]),
  function(req, res, next) {
    req.body.customer_id = req.user.id;
    req.body.images = getLinkMany(req.files.images).toString();
    req.body.legalDocument = getLinkMany(req.files.legalDocument).toString();
    req.body.propertyFacility = req.body.propertyFacility.toString();
    insert("post", req.body, (error, result) => {
      if (error) return res.send(error);
      return res.send(result);
    });
  }
);

router.get("/allpost", function(req, res, next) {
  return res.send(selectAll("post"));
});

router.get("/personalPost", async function(req, res, next) {
  let posts = await selectByOneAttribute("post", "customer_id", req.user.id);
  return res.render("personalPost", { listPost: posts });
});

router.get("/verifyPost", async function(req, res, next) {
  try {
    let sqlString = "SELECT * FROM post WHERE status = ?";
    sqlString = mysql.format(sqlString, ["DRAFT"]);
    connection.query(sqlString, function(err, result) {
      if (err) throw err;
      return res.render("verifyPost", { listPost: result });
    });
  } catch (error) {
    throw error;
  }
});

router.post("/verifyPost", async function(req, res, next) {
  try {
    let sqlString = "UPDATE post SET status = ? WHERE id = ?";
    sqlString = mysql.format(sqlString, ["VERIFIED", req.body.post_id]);
    connection.query(sqlString, function(err, result) {
      if (err) throw err;
      return res.render("verifyPost", { listPost: result });
    });
  } catch (error) {
    throw error;
  }
});

module.exports = router;
