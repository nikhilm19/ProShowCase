const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongo = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("../models/user").userModel;
const userRoute = express.Router();
const passport = require("../passport/setup");
const { json } = require("body-parser");

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    console.log("yes");
  }
}

userRoute.route("/profile").get(function (req, res, next) {
  var token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    console.log("got the token");
    jwt.verify(token, "trumpsuks", function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token.",
        });
      } else {
        req.decoded = decoded;
        console.log(decoded);
        return res.json({
          success: true,
          message: decoded,
        });
      }
    });
  }
});
userRoute.route("/").get(function (req, res) {
  let type = "student";
  if (req.query.type !== null) {
    type = req.query.type;
  }

  User.find({ type: type }, function (err, docs) {
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
userRoute.route("/:type/:id").get(function (req, res) {
  let type = req.params.type;
  let id = req.params.id;
  if (type == "student") {
    User.findOne({ enrollment_no: id }, function (err, user) {
      if (err) {
        res.status(400);
      }
      res.status(200).json({ user: user });
    });
  } else {
    User.findOne({ email: id }, function (err, user) {
      if (err) {
        res.status(400);
      }
      res.status(200).json({ user: user });
    });
  }
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
/*
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
});*/

userRoute.post("/registerx", function (req, res) {
  User.register(new User(req.body), req.body.password, function (err, account) {
    if (err) {
      console.log(err);
    }

    passport.authenticate("local")(req, res, function () {
      res.json(account);
    });
  });
});

userRoute.post("/login", function (req, res, next) {
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
      return res.send({ success: true, message: user });
    });
  })(req, res, next);
});
/*userRoute.post("/login", passport.authenticate("local"), function (req, res) {
  User.findOne(
    {
      username: req.body.username,
    },
    (err, person) => {
      console.log(person);
      if (err) {
        res.json({
          success: false,
          status: err,
        });
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "You are successfully logged in!",
      });
    }
  );
});
*/
module.exports = userRoute;

/*
 passport.authenticate("jwt", { session: true }) */
