var express = require("express");
var router = express.Router();
var { insert } = require("services/runQuery");
var { uploadFile, getLink } = require("services/uploadFile");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post(
  "/createAccount",
  uploadFile("images").fields([
    {
      name: "idCard",
      maxCount: 1
    },
    {
      name: "avatar",
      maxCount: 1
    }
  ]),
  function(req, res, next) {
    req.body.type = "CUSTOMER";
    insert(
      "useraccount",
      {
        displayName: req.body.displayName,
        password: req.body.password,
        email: req.body.email,
        type: req.body.type,
        avatar: req.body.avatar
      },
      function(error, result) {
        if (error) throw error;
        insert("customer", {
          status: "NOT VERIFIED",
          idCard: req.body.idCard,
          user_id: result.insertedId
        });
        return res.send(req.body);
      }
    );
  }
);

module.exports = router;
