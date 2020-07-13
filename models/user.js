const mongo = require("mongoose");
const projectSchema = require("./project").projectSchema;

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
  type: String,
  id: String,
  email: String,
  name: String,
  phone: Number,
  username: String,
  enrollment_no: Number,
  grad_year: Number,
  dept: String,
  shift: String,
  password: String,
  project: ObjectId,
});

var user = mongo.model("user", userSchema, "users");

module.exports = {
  userModel: user,
  userSchema: userSchema,
};
