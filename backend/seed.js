require("dotenv").config();
const connectDB = require("./config/db");
const About = require("./models/About");
const Education = require("./models/Education");
const Experience = require("./models/Experience");
const Project = require("./models/Project");
const Skill = require("./models/Skill");
const Certification = require("./models/Certification");
const Achievement = require("./models/Achievement");
const Blog = require("./models/Blog");
const SiteSettings = require("./models/SiteSettings");

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("Please set MONGO_URI in .env");
  process.exit(1);
}

async function seed() {
  await connectDB(MONGO_URI);

  // About
  const aboutCount = await About.countDocuments();
  if (aboutCount === 0) {
    await About.create({
      name: "Dyavanpally Rohankumar",
      title: "Full Stack Developer | Java, React, Node.js",
      summary:
        "Motivated Computer Science graduate with hands-on experience in full-stack development, specializing in Java, Python, JavaScript, React, and TypeScript.",
      email: "dyavanpallyrohan@gmail.com",
      phone: "+91 8919999232",
      location: "Hyderabad, Telangana",
      resumeLink: "",
      socials: {
        github: "https://github.com/dyavanpallyrohankumar",
        linkedin: "https://linkedin.com/in/dyavanpallyrohankumar"
      }
    });
    console.log("Inserted about");
  }

  // Education
  const eduCount = await Education.countDocuments();
  if (eduCount === 0) {
    await Education.create({
      degree: "Bachelor’s in Computer Science and Engineering",
      institution: "JNTUH College of Engineering Rajanna Sircilla",
      startDate: "November 2021",
      endDate: "July 2025",
      cgpa: "6.90/10.00"
    });
    console.log("Inserted education");
  }

  // Experience
  const expCount = await Experience.countDocuments();
  if (expCount === 0) {
    await Experience.create([
      {
        role: "Software Developer Intern",
        company: "Infosys",
        startDate: "July 2025",
        endDate: "Present",
        location: "Chennai, India",
        responsibilities: [
          "Completing intensive 4-month training in Java Full Stack Development including Spring Boot, SQL, HTML, CSS, JavaScript, and React",
          "Developing responsive web applications",
          "Working with REST APIs and Agile practices"
        ],
        currentlyWorking: true
      },
      {
        role: "IT Intern",
        company: "Ordnance Factory",
        startDate: "May 2024",
        endDate: "June 2024",
        location: "Hyderabad, India",
        responsibilities: [
          "Built dashboard for Chief General Manager",
          "Developed 4 digital portals reducing manual processes by 40%",
          "Enhanced UI/UX with data visualization components"
        ],
        currentlyWorking: false
      }
    ]);
    console.log("Inserted experiences");
  }

  // Projects
  const projCount = await Project.countDocuments();
  if (projCount === 0) {
    await Project.create([
      {
        title: "CampusFlow",
        techStack: ["React.js", "React Native", "Node.js", "MongoDB"],
        description:
          "Enterprise app digitizing campus operations for 5000+ users with secure REST APIs, JWT auth, and Docker-based deployment.",
        github: "https://github.com/dyavanpallyrohankumar/campusflow",
        liveDemo: "https://play.google.com/store/apps/details?id=com.jntr.campusflow",
        featured: true
      },
      {
        title: "Student Data Lookup",
        techStack: ["React.js", "Google Apps Script", "REST APIs"],
        description:
          "Secure data retrieval system with React frontend and Google Apps Script backend for student info lookup.",
        github: "https://github.com/dyavanpallyrohankumar",
        liveDemo: "https://student-data-lookup.vercel.app/"
      },
      {
        title: "WhatsApp Chat Viewer",
        techStack: ["React.js", "Vite", "Tailwind CSS"],
        description:
          "Client-side parser for WhatsApp exports with advanced search, highlighting, and optimized performance.",
        github: "https://github.com/dyavanpallyrohankumar",
        liveDemo: "https://readwhatsapp.vercel.app/"
      }
    ]);
    console.log("Inserted projects");
  }

  // Skills
  const skillCount = await Skill.countDocuments();
  if (skillCount === 0) {
    await Skill.create([
      { category: "Programming Languages", skills: ["Java", "Python", "JavaScript", "C++", "SQL", "HTML", "CSS"] },
      { category: "Frontend", skills: ["React.js", "React Native", "Redux", "Bootstrap", "Material UI", "Responsive Design"] },
      { category: "Backend", skills: ["Node.js", "Express.js", "REST APIs", "Java", "Spring Boot"] },
      { category: "Databases", skills: ["MongoDB", "MySQL"] },
      { category: "DevOps", skills: ["Git", "GitHub", "Docker", "Jenkins"] }
    ]);
    console.log("Inserted skills");
  }

  // Certifications
  const certCount = await Certification.countDocuments();
  if (certCount === 0) {
    await Certification.create([
      {
        title: "Programming using Java - Special Batches",
        issuer: "Infosys Lex",
        year: 2025
      },
      {
        title: "Data Structures and Algorithms using Java",
        issuer: "Infosys Lex",
        year: 2025
      },
      {
        title: "Getting Started with Front-End and Web Development",
        issuer: "IBM - Coursera",
        year: 2024,
        certificateLink: "https://www.coursera.org/account/accomplishments/certificate/xyz123"
      }
    ]);
    console.log("Inserted certifications");
  }

  // Optional - Site settings
  const settingsCount = await SiteSettings.countDocuments();
  if (settingsCount === 0) {
    await SiteSettings.create({ theme: "dark", showCertifications: true, showBlogs: false, lastUpdated: new Date() });
    console.log("Inserted site settings");
  }

  console.log("Seeding completed");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
