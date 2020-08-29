const express = require("express");
const User = require("../models/user").userModel;
const jwt = require("jsonwebtoken");
const passport = require("../passport/setup");

const register = (req, res, next) => {
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
};

const login = (req, res, next) => {
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

    req.login(user, async (loginErr) => {
      if (loginErr) {
        return res.json(loginErr);
      }

      const userDoc = await User.findById(user._id, {
        salt: 0,
        hash: 0,
      });

      console.log(userDoc);

      const token = jwt.sign({ userDoc }, "trumpsuks", {});
      //todo

      // change the jwt key
      // populate the project inside the message.

      let message = {
        user: userDoc,
      };

      return res
        .cookie("token", token, {
          expires: new Date(Date.now() + 31536000000),
          httpOnly: false,
        })
        .json({ success: true, message: message, token });
    });
  })(req, res, next);
};

module.exports = {
  login: login,
  register: register,
};
