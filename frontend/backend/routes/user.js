const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongo = require("mongoose");
const User = require("../models/user").userModel;
const userRoute = express.Router();

userRoute.route("/").get(function (req, res) {
  
  User.find(function (err, docs) {
    res.status(200).json({ users: docs });
  });
});

userRoute.route("/:enrollment_no").put(async function (req, res) {
  let enrollment_no = req.params.enrollment_no;

  const newUser = await User.findOneAndUpdate(
    { enrollment_no: enrollment_no },
    req.body,
    { new: true }
  );
  console.log(newUser);
  res.json({ user: newUser });
  /* {
      if (!user) {
        res.status(404).send("User not found");
      } else {
        user = req.body;
        User.up
      }
  
      res.status(200).json({ user: user });
    });*/
});
userRoute.route("/:enrollment_no").get(function (req, res) {
  let enrollment_no = req.params.enrollment_no;

  User.findOne({ enrollment_no: enrollment_no }, function (err, user) {
    if (err) {
      res.status(400);
    }
    res.status(200).json({ user: user });
  });
});

userRoute.route("/").post(function (req, res) {
  let user = new User(req.body);
  console.log(req.body);

  user
    .save()
    .then(res.status(200).json("Added"))
    .catch(() => {
      console.log("error");
    });
});

userRoute.route("/login").post(function (req, res) {
  console.log("hit login");
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({ errors: "No user found" });
    }
    return res.status(400).json({ errors: " user found" });
  });
});

module.exports = userRoute;
