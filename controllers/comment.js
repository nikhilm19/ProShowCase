const User = require("../models/user").userModel;
const Project = require("../models/project").projectModel;
const Comment = require("../models/comment").commentModel;
const mongo = require("mongoose");

const getMany = (req, res) => {
  let project_id = "";
  if (req.params.project_id) {
    Comment.find({ project: req.params.project_id })
      .populate("user", "name")
      .exec(function (err, docs) {
        if (err) {
          res.status(401).json({ success: false, error: err });
        }
        res.status(200).json({ success: true, comments: docs });
      });
  } else {
    Comment.find(function (err, docs) {
      if (err) {
        res.status(401).json({ success: false, error: err });
      }
      res.status(200).json({ success: true, comments: docs });
    });
  }
};

const getOne = (req, res) => {
  let comment_id = req.params.comment_id;

  Comment.findById(comment_id, function (err, comment) {
    if (err) {
      res.status(400);
    }
    res.status(200).json(comment);
  });
};

const search = async (req, res) => {
  let filter = {};

  // var guideEmails = [];
  // const allGuides = await User.find({ type: "guide" }, { email: 1 });

  // guideEmails = allGuides.map((guide, index, array) => {
  //   return guide.email;
  // });

  // let guides = req.query.guides;
  // if (req.query.guides) {
  //   guides = guides.split(",");
  // } else guides = guideEmails;

  // // todo get all technologies here
  // console.log("guides", guides);
  // let technologies = req.query.technologies;

  // if (technologies) {
  //   technologies = technologies.split(",");
  // } else {
  //   technologies = ["AI", "ML", "Android", "IOT", "Webapp", "NLP", "Voice"];
  // }
  // console.log(technologies);

  // let batches = req.query.batches;

  // //todo fallback  to all batches

  // console.log(batches);
  // if (batches) {
  //   batches = batches.split(",");
  // } else {
  //   batches = ["2020"];
  // }

  // console.log(technologies);

  // Project.find(
  //   {
  //     "guide.email": { $in: guides },
  //     "technologies.title": { $in: technologies },
  //   },
  //   function (err, projects) {
  //     console.log(projects.length);
  //     if (projects.length === 0) {
  //       return res.send({ success: false, projects: null });
  //     }
  //     return res.send({ success: true, projects: projects });
  //   }
  // );

  var guideEmails = [];

  let guides = req.query.guides;
  if (req.query.guides) {
    filter["guide.email"] = { $in: guides.split(",") };
  }

  // todo get all technologies here

  let technologies = req.query.technologies;

  if (technologies) {
    filter["technologies.title"] = { $in: technologies.split(",") };
  }
  // console.log(technologies);

  let batches = req.query.batches;

  // console.log(batches);
  if (batches) {
    filter["year"] = { $in: batches.split(",") };
  }

  // console.log(technologies);
  console.log(filter);

  Project.find(filter, function (err, projects) {
    console.log(projects.length);
    if (projects.length === 0) {
      return res.send({ success: false, projects: null });
    }
    return res.send({ success: true, projects: projects });
  });
};

const create = (req, res) => {
  let comment = new Comment(req.body);
  console.log(req.body);

  comment
    .save()
    .then(async (doc) => {
      let emails = [];
      console.log("comment doc --->", doc);

      const user = await User.findByIdAndUpdate(doc.user, {
        $addToSet: { comment: doc.id },
      });

      return res.status(200).json({ success: true, comment: doc });
    })
    .catch((err) => {
      console.log("error while comment save---->", err);
      return res.status(401).json({ success: false, error: err });
    });
};

module.exports = {
  getMany: getMany,
  getOne: getOne,
  search: search,
  create: create,
};
