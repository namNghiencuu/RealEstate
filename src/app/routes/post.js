var express = require("express");
var router = express.Router();
var { uploadFile, getLinkMany } = require("services/uploadFile");
var { selectAll, selectById } = require("services/runQuery");

router.get("/post/:id", async function(req, res, next) {
  let post = await selectById("post", req.params.id);
  post.propertyFacility = post.propertyFacility.split(",");
  return res.render("post_template", { data: post });
});

router.post("/post", uploadFile("images").array("images", 10), function(
  req,
  res,
  next
) {
  req.body.customer_id = req.user.id;
  req.body.images = getLinkMany(req.files)
    .toString()
    .split(",");
  return res.render("post_template", { data: req.body });
});

router.get("/allpost", function(req, res, next) {
  return res.send(selectAll("post"));
});

module.exports = router;
