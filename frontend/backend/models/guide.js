const mongo = require("mongoose");
const projectSchema = require("./project").projectSchema;

var Schema = mongo.Schema;

var guideSchema = new Schema({
  id: String,
  email: String,
  name: String,
  phone: Number,
  username: String,

  dept: String,
  shift: String,
  projects: [{ type: projectSchema, default: {} }],
});

var guide = mongo.model("guide", guideSchema, "users");

module.exports = {
  guideModel: guide,
  guideSchema: guideSchema,
};
