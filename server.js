const express = require("express");
const app = express();
var subdomain = require("express-subdomain");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongo = require("mongoose");
const path = require("path");
const User = require("./models/user").userModel;
const Project = require("./models/project").projectModel;

const userRoute = require("./routes/user");
const projectRoute = require("./routes/project");
const auth = require("./routes/auth");
const commentRoute = require("./routes/comment");
const passport = require("./passport/setup");
const dotenv = require("dotenv").config();
const authController = require("./controllers/auth");

mongo.connect(process.env.MONGO_URL, { useNewUrlParser: true }, function () {
  console.log("connected");
});

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(passport.initialize());
app.use(passport.session());
app.use("/users", userRoute);
app.use("/projects", projectRoute);
app.use("/auth", auth);
app.use("/comments", commentRoute);

app.use(express.static(path.join(__dirname, "frontend", "build")));
const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV === "production") {
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html")); // relative path
  });
}
const db = mongo.connection;
db.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

//app.get("/auth/verify", authController.verify);

app.get("/", (req, res) => {
  app.get("/*", (req, res) => {
    //res.json("hello");

    res.sendFile(path.join(__dirname, "frontend", "build", "index.html")); // relative path
  });
});
