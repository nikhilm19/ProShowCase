const jwt = require("jsonwebtoken");

const User = require("../models/user").userModel;
const passport = require("../passport/setup");

const getProfile = (req, res, next) => {
  var token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    console.log("got the token");
    jwt.verify(token, "trumpsuks", async function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token.",
        });
      } else {
        req.decoded = decoded;
        console.log("decoded", decoded);
        let email;
        if (decoded.userDoc) {
          email = decoded.userDoc.email;
        } else email = decoded.user.email;

        const user = await User.findOne({ email: email })
          .populate("project")
         
            console.log("user=", user);

            decoded.account = user;
            return res.status(200).json({ success: true, message: decoded });
         
      }
    });
  }
};

const getUsers = (req, res) => {
  let type = "student";
  if (req.query.type !== null) {
    type = req.query.type;
  }

  User.find({ type: type }, function (err, docs) {
    res.status(200).json({ users: docs });
  });
};

const getUser = (req, res) => {
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
};

const updateUser = async (req, res) => {
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
};
const createUser = (req, res) => {
  let user = new User(req.body);
  console.log(req.body);

  user
    .save()
    .then(res.status(200).json("Added"))
    .catch(() => {
      console.log("error");
    });
};

const userLogin = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.send({ success: false, message: info.message });
    }
    req.login(user, async (loginErr) => {
      if (loginErr) {
        res.json(loginErr);
      }
      const userDoc = await User.findOne({ email: user.email }).populate(
        "project"
      );
      console.log(userDoc);

      return res.send({ success: true, message: user });
    });
  })(req, res, next);
};

module.exports = {
  createUser: createUser,
  getUser: getUser,
  getUsers: getUsers,
  userLogin: userLogin,
  updateUser: updateUser,
  getProfile: getProfile,
};
