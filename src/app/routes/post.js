var express = require("express");
var router = express.Router();

router.get("/post/:id", function(req, res, next) {
  return res.render("post_template", { title: "Express" });
});

router.post("/post", uploadFile("images").array("images", 10), function(
  req,
  res,
  next
) {
  req.body.customer_id = req.user.id;
  req.body.imageLink = getLinkMany(req.files).toString();
  return res.send(req.body);
});

router.get("/allpost", function(req, res, next) {
  let sqlString = "SELECT * FROM post";
  connection.query(sqlString, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
