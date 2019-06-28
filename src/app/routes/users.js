var express = require("express");
var router = express.Router();
var { insert } = require("services/runQuery");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/createAccount", function(req, res, next) {
  insert("useraccount", req.body, function(error, result) {
    if (error) throw error;
    res.render("login");
  });
});

module.exports = router;
