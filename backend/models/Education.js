const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  startDate: String,
  endDate: String,
  cgpa: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model("Education", EducationSchema);
