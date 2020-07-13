const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user").userModel;

User.findOne({ username: "nikmul19" }, function (err, user) {
  console.log(user);
});
passport.use(
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
);

module.exports = passport;
