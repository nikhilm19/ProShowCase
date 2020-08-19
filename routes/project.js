const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongo = require("mongoose");
const User = require("../models/user").userModel;
const Project = require("../models/project").projectModel;
const projectsRoute = express.Router();

const projectController = require("../controllers/project");

projectsRoute.route("/").get(projectController.getMany);

projectsRoute.route("/:project_id").put(projectController.updateOne);
projectsRoute.route("/search").get(projectController.search);
projectsRoute.route("/:project_id").get(projectController.getOne);

projectsRoute.route("/").post(projectController.create);

module.exports = projectsRoute;
