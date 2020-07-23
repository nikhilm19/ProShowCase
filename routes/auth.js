const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongo = require("mongoose");
const User = require("../models/user").userModel;
const auth = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("../passport/setup");

auth.post("/register", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    let newUser = {
      type: req.body.type,
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      username: req.body.username,
      dept: req.body.dept,
      shift: req.body.shift,
    };

    if (newUser.type === "student") {
      newUser.enrollment_no = req.body.enrollment_no;
      newUser.grad_year = req.body.grad_year;
    }
    User.register(new User(newUser), req.body.password, function (
      err,
      account
    ) {
      if (err) {
        err.success = false;
        return res.json(err);
      }
      console.log(account);

      req.login(account, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        } else {
          const token = jwt.sign({ account }, "trumpsuks", { expiresIn: "1h" });
          console.log(token);

          let message = {
            user: {
              id: account._id,
              type: account.type,
              email: account.email,
              name: account.name,
              phone: account.phone,
              username: account.username,
              dept: account.dept,
              shift: account.shift,
            },
          };
          if (newUser.type === "student") {
            message.user.enrollment_no = account.enrollment_no;
            message.user.grad_year = req.body.grad_year;
          }

          return res
            .cookie("token", token, { httpOnly: false })
            .send({ success: true, message: message, token });
        }
      });
    });
  })(req, res, next);

  /*passport.authenticate("local-signup", function (err, user, info) {
    console.log("hello");
    console.log(user);
    console.log(info);
    if (err) {
      console.log("errr");
      console.log(err);
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.send({ success: false, message: user });
    }

    return 
  })(req, res, next);*/
});
auth.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      err.success = false;
      return res.json(err); // will generate a 500 error
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
        return res.json(loginErr);
      }
      const token = jwt.sign({ user }, "trumpsuks", {});
      // send enrollment number here.

      //check for type of user

      let message = {
        user: {
          id: user._id,
          type: user.type,
          email: user.email,
          name: user.name,
          phone: user.phone,
          username: user.username,
          dept: user.dept,
          shift: user.shift,
          project: user.project,
        },
      };
      if (user.type === "student") {
        message.user.enrollment_no = user.enrollment_no;
        message.user.grad_year = user.grad_year;
      }

      return res
        .cookie("token", token, {
          expires: new Date(Date.now() + 31536000000),
          httpOnly: false,
        })
        .json({ success: true, message: message, token });
    });
  })(req, res, next);
});
module.exports = auth;
