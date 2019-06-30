var express = require("express");
var router = express.Router();
var passport = require("passport");
var jwt = require("jsonwebtoken");

router.get("/login", function(req, res, next) {
  res.render("login");
});

router.post("/login", function(req, res, next) {
  passport.authenticate(
    "local",
    {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
      session: false
    },
    function(err, user, info) {
      if (err || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user
        });
      }
      req.login(user, { session: false }, err => {
        if (err) {
          res.send(err);
        } // generate a signed son web token with the contents of user object and return it in the response           const token = jwt.sign(user, 'your_jwt_secret');
        return res.json({ user, token });
      });
    }
  )(req, res);
});

module.exports = router;
