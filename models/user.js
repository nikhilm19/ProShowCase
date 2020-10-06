const mongo = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const projectSchema = require("./project").projectSchema;

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
  type: String,
  id: String,
  email: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  name: String,
  phone: Number,
  username: String,
  enrollment_no: Number,
  grad_year: Number,
  dept: String,
  shift: String,
  password: String,
  project: [{ type: Schema.Types.ObjectId, ref: "project" }],
  comment: [{ type: Schema.Types.ObjectId, ref: "comment" }],
});
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

var user = mongo.model("user", userSchema);

module.exports = {
  userModel: user,
  userSchema: userSchema,
};
