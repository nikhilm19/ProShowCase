const express = require("express");
const User = require("../models/user").userModel;
const jwt = require("jsonwebtoken");
const passport = require("../passport/setup");
const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email) => {
  const user = await User.findOne({ email: email });
  if (user) {
    var date = new Date();
    var mail = {
      id: user._id,
      createdAt: date.toString(),
    };
    var mailToken = jwt.sign(mail, "trumpsuks", { expiresIn: "1h" });
    //send the email here
    let transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: "inikhilm19@gmail.com", // generated ethereal user
        pass: "twwchii@2020", // generated ethereal password
      },
    });

    let info = {
      from: '"Nikhil at ProShowCase" <inikhilm19@gmail.com', // sender address
      to: "nikmul19@gmail.com", // list of receivers
      subject: "Verify your account for Proshowcase", // Subject line

      html: `<a href='http://localhost:3000/#/verify/${mailToken}'>Click this link to verify your account</a><p>With love,<br>Proshowcase</p>`, // html body
    };
    transporter.sendMail(info, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
};
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
    User.register(new User(newUser), req.body.password, async function (
      err,
      account
    ) {
      if (err) {
        err.success = false;
        return res.json(err);
      }
      console.log(account);

      // adding email verification here

      var date = new Date();
      var mail = {
        id: account._id,
        createdAt: date.toString(),
      };

      sendVerificationEmail(account.email);

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

const verify = (req, res) => {
  let token = req.query.id;
  console.log("inside verify");
  console.log(token);
  if (token) {
    try {
      jwt.verify(token, "trumpsuks", (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(200).json({ success: false, error: err });
        } else {
          User.findByIdAndUpdate(
            decoded.id,
            { isVerified: true },
            { new: true },
            (err, doc) => {
              if (err) {
                return res.status(200).json({ success: false, error: err });
              } else {
                let message = {
                  user: doc,
                };
                return res
                  .cookie("token", token, { httpOnly: false })
                  .send({ success: true, message: message, token });
              }
            }
          );
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(200).json({ success: false, error: err });
    }
  }
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

      if (!userDoc.isVerified) {
        console.log("not verified");

        sendVerificationEmail(userDoc.email);

        return res.send({
          success: false,
          message: "Verification email sent !",
        });
      }

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
  verify: verify,
};
