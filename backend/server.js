require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const aboutRoutes = require("./routes/about");
const projectsRoutes = require("./routes/projects");
const skillsRoutes = require("./routes/skills");
const experienceRoutes = require("./routes/experience");
const educationRoutes = require("./routes/education");
const certificationsRoutes = require("./routes/certifications");
const contactRoutes = require("./routes/contact");
const achievementsRoutes = require("./routes/achievements");
const blogsRoutes = require("./routes/blogs");
const settingsRoutes = require("./routes/settings");

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

// Connect DB
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("Missing MONGO_URI in .env");
  process.exit(1);
}
connectDB(MONGO_URI);

// Routes
app.use("/api/about", aboutRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/certifications", certificationsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/achievements", achievementsRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/settings", settingsRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Portfolio API is running" });
});

// global error handler (basic)
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
