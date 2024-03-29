const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongo = require("mongoose");
const User = require("../models/user").userModel;
const Project = require("../models/project").projectModel;
const projectsRoute = express.Router();

projectsRoute.route("/").get(function (req, res) {
  let guide = "";
  if (req.query.guide) {
    Project.find({ guide: req.query.guide }, function (err, docs) {
      if (err) {
        res.status(401).json({ error: err });
      }
      res.status(200).json({ projects: docs });
    });
  } else {
    Project.find(function (err, docs) {
      if (err) {
        res.status(401).json({ error: err });
      }
      res.status(200).json({ projects: docs });
    });
  }
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
projectsRoute.route("/search").get(async function (req, res) {
  //fallback to all batches
  var guideEmails = [];
  const allGuides = await User.find({ type: "guide" }, { email: 1 });

  guideEmails = allGuides.map((guide, index, array) => {
    return guide.email;
  });

  let guides = req.query.guides;
  if (req.query.guides) {
    guides = guides.split(",");
  } else guides = guideEmails;

  // todo get all technologies here
  console.log("guides", guides);
  let technologies = req.query.technologies;

  if (technologies) {
    technologies = technologies.split(",");
  } else {
    technologies = ["AI", "ML", "Android", "IOT", "Webapp", "NLP", "Voice"];
  }
  console.log(technologies);

  let batches = req.query.batches;

  //todo fallback  to all batches

  console.log(batches);
  if (batches) {
    batches = batches.split(",");
  } else {
    batches = ["2020"];
  }

  console.log(technologies);

  Project.find(
    {
      "guide.email": { $in: guides },
      "technologies.title": { $in: technologies },
    },
    function (err, projects) {
      console.log(projects.length);
      if (projects.length === 0) {
        return res.send({ success: false, projects: null });
      }
      return res.send({ success: true, projects: projects });
    }
  );
});
projectsRoute.route("/:project_id").get(function (req, res) {
  let project_id = req.params.project_id;

  let project_object_id = mongo.Types.ObjectId(project_id);
  console.log(project_object_id);
  Project.findOne({ _id: project_object_id }, function (err, project) {
    if (err) {
      res.status(400);
    }
    res.status(200).json(project);
  });
});

projectsRoute.route("/").post(function (req, res) {
  let keywords = "";
  if (req.body.keywords) {
    keywords = req.body.keywords.split(",");
    let len = keywords.length;
    for (var i = 0; i < len; i++) {
      keywords[i] = keywords[i].trim();
    }
    req.body.keywords = keywords;

    console.log(req.body);
  }

  let project = new Project(req.body);

  project
    .save()
    .then(async (doc) => {
      let emails = [];

      doc.teamMembers.map((user) => {
        emails.push(user.email);
      });
      const users = await User.find({
        email: { $in: emails },
      });
      users.map((user) => {
        user.project.push(doc.id);

        user.save();
      });
      const guide = await User.find({
        email: doc.guide.email,
      });

      guide[0].project.push(doc.id);
      guide[0].save();

      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
    });

  User.find({});
});

module.exports = projectsRoute;
