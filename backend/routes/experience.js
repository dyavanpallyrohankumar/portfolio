const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience");

// GET experiences (ordered newest first)
router.get("/", async (req, res) => {
  try {
    const exp = await Experience.find().sort({ startDate: -1 });
    res.json(exp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create experience
router.post("/", async (req, res) => {
  try {
    const e = await Experience.create(req.body);
    res.status(201).json(e);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const protect = require("../middleware/authMiddleware");


// CREATE project (admin only)
router.post("/", protect, async (req, res) => {
  try {
    const e = await Experience.create(req.body);
    res.status(201).json(e);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE project (admin only)
router.put("/:id", protect, async (req, res) => {
  try {
    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedExperience) {
      return res.status(404).json({ error: "Experience not found" });
    }
    res.json(updatedExperience);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE project (admin only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
    if (!deletedExperience) {
      return res.status(404).json({ error: "Experience not found" });
    }
    res.json({ message: "Experience deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
