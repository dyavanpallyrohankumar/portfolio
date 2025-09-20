const express = require("express");
const router = express.Router();
const About = require("../models/About");

// GET about
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST or create/update single about document
router.post("/", async (req, res) => {
  try {
    // Replace existing or create new
    let about = await About.findOne();
    if (about) {
      about.set(req.body);
      await about.save();
    } else {
      about = await About.create(req.body);
    }
    res.json(about);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const protect = require("../middleware/authMiddleware");

// GET all projects (public)

// CREATE project (admin only)
// This route seems to be a duplicate or placeholder. Remove or implement as needed.
// router.post("/", protect, async (req, res) => { ... });

// UPDATE project (admin only)
router.put("/:id", protect, async (req, res) => {
  try {
    const updatedAbout = await About.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAbout) {
      return res.status(404).json({ error: "About document not found" });
    }
    res.json(updatedAbout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE project (admin only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const deletedAbout = await About.findByIdAndDelete(req.params.id);
    if (!deletedAbout) {
      return res.status(404).json({ error: "About document not found" });
    }
    res.json({ message: "About document deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
