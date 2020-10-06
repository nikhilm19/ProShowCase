const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongo = require("mongoose");
const User = require("../models/user").userModel;
const Project = require("../models/project").projectModel;
const Comment = require("../models/comment").commentModel;
const commentsRoute = express.Router();

const commentsController = require("../controllers/comment");

commentsRoute.route("/:project_id").get(commentsController.getMany);
commentsRoute.route("/search").get(commentsController.search);
commentsRoute.route("/:comment_id").get(commentsController.getOne);
commentsRoute.route("/").post(commentsController.create);

module.exports = commentsRoute;
