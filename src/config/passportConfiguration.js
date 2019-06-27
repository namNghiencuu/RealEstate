var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
var conn = require("db/dbconfig");
var mysql = require("mysql");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  let sqlString = mysql.format("SELECT * from useraccount where id = ?? ", [
    id
  ]);
  conn.query(sqlString, function(err, result) {
    return done(err, result);
  });
});

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function(email, password, cb) {
      try {
        let sqlString = mysql.format(
          "SELECT id, displayName, type, email, avatar, displayName from useraccount where email = ?? AND password = ?? ",
          [email, password]
        );
        conn.query(sqlString, function(err, result) {
          if (err) throw err;
          console.log(result);
          if (!result)
            return cb(null, false, {
              message: "Incorrect username or password"
            });
          else return cb(null, result, { message: "Logged In" });
        });
      } catch (error) {
        console.log(error.toString());
        return cb(error);
      }
    }
  )
);
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret"
    },
    function(jwtPayload, cb) {
      return UserModel.findOneById(jwtPayload.id)
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);
