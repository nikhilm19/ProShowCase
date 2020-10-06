const mongo = require("mongoose");
const projectSchema = require("./project").projectSchema;

var Schema = mongo.Schema;

var commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  project: { type: Schema.Types.ObjectId, ref: "project" },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

var comment = mongo.model("comment", commentSchema);

module.exports = {
  commentModel: comment,
  commentSchema: commentSchema,
};
