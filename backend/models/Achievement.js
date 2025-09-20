const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
  title: String,
  issuer: String,
  year: Number,
  description: String
}, { timestamps: true });

module.exports = mongoose.model("Achievement", AchievementSchema);
