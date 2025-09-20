const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  category: String,
  skills: [String]
}, { timestamps: true });

module.exports = mongoose.model("Skill", SkillSchema);
