const mongoose = require("mongoose");

const SiteSettingsSchema = new mongoose.Schema({
  theme: { type: String, default: "light" },
  showCertifications: { type: Boolean, default: true },
  showBlogs: { type: Boolean, default: false },
  lastUpdated: Date
}, { timestamps: true });

module.exports = mongoose.model("SiteSettings", SiteSettingsSchema);
