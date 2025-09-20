const express = require("express");
const router = express.Router();
const Education = require("../models/Education");

router.get("/", async (req, res) => {
  try {
    const educations = await Education.find().sort({ endDate: -1 });
    res.json(educations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const e = await Education.create(req.body);
    res.status(201).json(e);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


const protect = require("../middleware/authMiddleware");

// GET all projects (public)
// (Already defined above, so this duplicate route is removed)

// CREATE education (admin only)
router.post("/", protect, async (req, res) => {
  try {
    const e = await Education.create(req.body);
    res.status(201).json(e);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE project (admin only)
router.put("/:id", protect, async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!education) {
      return res.status(404).json({ error: "Education not found" });
    }
    res.json(education);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE project (admin only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).json({ error: "Education not found" });
    }
    res.json({ message: "Education deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
