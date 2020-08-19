const express = require("express");
const cors = require("cors");
const User = require("../models/user").userModel;
const userRoute = express.Router();
const userController = require("../controllers/user");

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    console.log("yes");
  }
}

userRoute.route("/profile").get(userController.getProfile);

userRoute
  .route("/")
  .get(userController.getUsers)
  .post(userController.createUser);

userRoute.route("/:enrollment_no").put(userController.updateUser);
userRoute.route("/:type/:id").get(userController.getUser);
userRoute.post("/login", userController.userLogin);

module.exports = userRoute;
