var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var conn = require("db/dbconfig");
var mysql = require("mysql");

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function(email, password, cb) {
      try {
        let sqlString = mysql.format(
          "SELECT id, displayName, type, email, avatar from useraccount where email = ? AND password = ? LIMIT 0,1 ",
          [email, password]
        );
        conn.query(sqlString, function(err, result) {
          if (err) throw err;
          console.log(result);
          if (!result)
            return cb(null, false, {
              message: "username or password is wrong"
            });
          else return cb(null, result[0]);
        });
      } catch (error) {
        console.log(error.toString());
        return cb(error, false, { message: "Error" });
      }
    }
  )
);
passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  let sqlString = mysql.format(
    "SELECT * from useraccount where id = ? LIMIT 0,1",
    [id]
  );
  conn.query(sqlString, function(err, result) {
    done(err, result[0]);
  });
});
