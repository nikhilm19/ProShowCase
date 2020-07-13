const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongo = require("mongoose");
const User = require("../models/user").userModel;
const Project = require("../models/project").projectModel;
const projectsRoute = express.Router();

projectsRoute.route("/").get(function (req, res) {
  Project.find(function (err, docs) {

    if(err){
      res.status(401).json({error:err});
    }
    res.status(200).json({ projects: docs });
  });
});

projectsRoute.route("/:project_id").put(async function (req, res) {
  let project_id = req.params.project_id;

  const newProject = await Project.findOneAndUpdate(
    { project_id: project_id },
    req.body,
    { new: true }
  );
  console.log(newProject);
  res.json({ project: newProject });
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
projectsRoute.route("/:project_id").get(function (req, res) {
  let project_id = req.params.project_id;

  Project.findOne({ _id: project_id }, function (err, project) {
    if (err) {
      res.status(400);
    }
    res.status(200).json(project);
  });
});

projectsRoute.route("/").post(function (req, res) {
  let keywords = req.body.keywords.split(",");

  let len = keywords.length;

  for (var i = 0; i < len; i++) {
    keywords[i] = keywords[i].trim();
  }

  req.body.keywords = keywords;
  console.log(req.body);
  let project = new Project(req.body);

  project
    .save()
    .then(async (doc) => {
      const users = await User.find({
        email: { $in: doc.teamMembers },
      });
      users.map((user) => {
        user.project = doc.id;

        user.save();
      });
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
    });

  User.find({});
});

module.exports = projectsRoute;
