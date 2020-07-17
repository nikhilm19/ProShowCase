const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require("../models/user").userModel;

passport.use(new LocalStrategy(User.authenticate()));

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      console.log(req);
      process.nextTick(function () {
        User.findOne({ email: email }, function (err, user) {
          if (err) {
            return done("hello");
          }
          if (user) {
            return done(null, false, "false");
          } else {
            console.log("no user");
            return done(null, req.body, null);
          }
        });
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "trumpsuks",
    },
    function (jwtPayload, cb) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return User.findById(jwtPayload.user._id)
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          console.log("error in setup passport");

          console.log(err);
          return cb(err);
        });
    }
  )
);
/*passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log(username, password);
    User.findOne({ username: username }, function (err, user) {
      console.log(typeof user, user);

      let uPwd = user.email;
      console.log("user", uPwd);

      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (password !== user.password) {
        console.log("unsuccessfull");

        return done(null, false, { message: "unduss" });
      }
      if (password === user.password) {
        return done(null, user);

        console.log("successfull");
      }
    });
  })
);*/

module.exports = passport;
