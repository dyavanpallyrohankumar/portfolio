const mongoose = require("mongoose");

const CertificationSchema = new mongoose.Schema({
  title: String,
  issuer: String,
  year: Number,
  certificateLink: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model("Certification", CertificationSchema);
