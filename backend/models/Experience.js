const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  role: String,
  company: String,
  location: String,
  startDate: String,
  endDate: String,
  responsibilities: [String],
  currentlyWorking: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Experience", ExperienceSchema);
