const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  name: String,
  title: String,
  summary: String,
  email: String,
  phone: String,
  location: String,
  resumeLink: String,
  socials: {
    github: String,
    linkedin: String,
    twitter: String
  }
}, { timestamps: true });

module.exports = mongoose.model("About", AboutSchema);
