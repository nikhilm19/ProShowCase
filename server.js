const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongo = require("mongoose");
const path = require("path");
const User = require("./models/user").userModel;
const Project = require("./models/project").projectModel;

const userRoute = require("./routes/user");
const projectRoute = require("./routes/project");
const auth = require("./routes/auth");
const passport = require("./passport/setup");
const dotenv = require("dotenv").config();

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

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "frontend", "build")));



if (process.env.NODE_ENV === "production") {

  app.use(express.static(path.join(__dirname, "frontend", "build")));

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

app.get("/", (req, res) => {
  console.log(req.body);
 
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html")); // relative path
  });

  return res.json("hello world");
});
