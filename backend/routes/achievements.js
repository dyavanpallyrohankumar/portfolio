const express = require("express");
const router = express.Router();
const Achievement = require("../models/Achievement");

router.get("/", async (req, res) => {
  try {
    const items = await Achievement.find().sort({ year: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const a = await Achievement.create(req.body);
    res.status(201).json(a);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const protect = require("../middleware/authMiddleware");

// GET all projects (public)
// Already defined above, so this duplicate route is removed.

// CREATE project (admin only)
router.post("/", protect, async (req, res) => {
  try {
    const a = await Achievement.create(req.body);
    res.status(201).json(a);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE project (admin only)
router.put("/:id", protect, async (req, res) => {
  try {
    const updatedAchievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAchievement) {
      return res.status(404).json({ error: "Achievement not found" });
    }
    res.json(updatedAchievement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE project (admin only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const deletedAchievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!deletedAchievement) {
      return res.status(404).json({ error: "Achievement not found" });
    }
    res.json({ message: "Achievement deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
