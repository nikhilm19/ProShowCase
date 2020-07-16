const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongo = require("mongoose");
const User = require("../models/user").userModel;
const auth = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("../passport/setup");

auth.post("/register", function (req, res) {
  User.register(new User(req.body), req.body.password, function (err, account) {
    if (err) {
      console.log(err);
    }

    passport.authenticate("local")(req, res, function () {
      res.json({
        user: {
          id: account._id,
          type: account.type,
          email: account.email,
          name: account.email,
          phone: account.phone,
          username: account.username,
          dept: account.dept,
          shift: account.shift,
        },
      });
    });
  });
});

auth.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.send({ success: false, message: info.message });
    }
    // ***********************************************************************
    // "Note that when using a custom callback, it becomes the application's
    // responsibility to establish a session (by calling req.login()) and send
    // a response."
    // Source: http://passportjs.org/docs
    // ***********************************************************************
    req.login(user, (loginErr) => {
      if (loginErr) {
        res.json(loginErr);
      }
      const token = jwt.sign({ user }, "trumpsuks", { expiresIn: "1h" });

      const message = {
        user: {
          id: user._id,
          type: user.type,
          email: user.email,
          name: user.email,
          phone: user.phone,
          username: user.username,
          dept: user.dept,
          shift: user.shift,
        },
      };

      return res
        .cookie("token", token, { httpOnly: false })
        .json({ success: true, message: message, token });
    });
  })(req, res, next);
});
module.exports = auth;
