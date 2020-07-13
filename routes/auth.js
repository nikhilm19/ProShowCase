const express = require("express");
const auth = express.Router();
const passport = require("passport");

auth.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/xyz" }),
  function (req, res) {
    console.log("yes yes yes");
    res.redirect("/");
  }
);
/*auth.post("/login", (req, res) => {
  console.log("hit login");
  passport.authenticate("local", function (err, user, info) {
    console.log("yes hit login");
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({ errors: "No user found" });
    }
    return res.status(400).json({ errors: " user found" });
  });
});*/

module.exports = auth;
