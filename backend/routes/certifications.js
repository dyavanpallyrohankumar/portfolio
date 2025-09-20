const express = require("express");
const router = express.Router();
const Certification = require("../models/Certification");

router.get("/", async (req, res) => {
  try {
    const certs = await Certification.find().sort({ year: -1 });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const c = await Certification.create(req.body);
    res.status(201).json(c);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const protect = require("../middleware/authMiddleware");

// GET all projects (public)
// This route is already defined above, so you can safely remove this duplicate.

// CREATE project (admin only)
router.post("/", protect, async (req, res) => {
  try {
    const c = await Certification.create(req.body);
    res.status(201).json(c);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE project (admin only)
router.put("/:id", protect, async (req, res) => {
  try {
    const updatedCert = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCert) {
      return res.status(404).json({ error: "Certification not found" });
    }
    res.json(updatedCert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE project (admin only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const deletedCert = await Certification.findByIdAndDelete(req.params.id);
    if (!deletedCert) {
      return res.status(404).json({ error: "Certification not found" });
    }
    res.json({ message: "Certification deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
