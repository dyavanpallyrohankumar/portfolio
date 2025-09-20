const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  techStack: [String],
  github: String,
  liveDemo: String,
  image: String,
  featured: { type: Boolean, default: false },
  startDate: String,
  endDate: String,
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);
