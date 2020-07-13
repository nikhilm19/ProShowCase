const mongo = require("mongoose");

var Schema = mongo.Schema;

var projectSchema = new Schema({
  project_id: { type: String, unique: true },
  title: String,
  brief: String,
  keywords: [String],
  teamMembers: [mongo.SchemaTypes.Mixed],
  dept: String,
  shift: String,
  technologies: [mongo.SchemaTypes.Mixed],
  demo: { type: String, unique: true },
  githubRepo: { type: String, unique: true },
  year: Number,
  guide: mongo.SchemaTypes.Mixed,
  referenceMaterial: [mongo.SchemaTypes.Mixed],
  publishedPapers: [mongo.SchemaTypes.Mixed],
  implementationSnaps: [mongo.SchemaTypes.Mixed], //url to cloud storage
});

var project = mongo.model("project", projectSchema, "projects");

module.exports = {
  projectModel: project,
  projectSchema: projectSchema,
};
