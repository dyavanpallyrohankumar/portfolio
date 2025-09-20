const express = require("express");
const router = express.Router();
const SiteSettings = require("../models/SiteSettings");

router.get("/", async (req, res) => {
  try {
    const settings = await SiteSettings.findOne();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (settings) {
      settings.set(req.body);
      await settings.save();
    } else {
      settings = await SiteSettings.create(req.body);
    }
    res.json(settings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
