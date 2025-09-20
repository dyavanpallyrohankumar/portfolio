const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: String,
  publishedOn: Date,
  summary: String,
  content: String,
  link: String,
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model("Blog", BlogSchema);
