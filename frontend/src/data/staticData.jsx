export const degrees = [
    {
        title: "Bachelor of Technology in Computer Science",
        subtitle: "JNTUH College of Engineering Rajanna Sircilla",
        duration: "November 2021 – July 2025",
        logo_path: "jntuh.png",
        alt_name: "JNTUH",
        initials: "JN",
        descriptions: [
            "🎓 Specialized in Full-Stack Development & Cloud-Native Systems",
            "🏆 Built CampusFlow — a platform serving 5000+ users with 99.9% uptime",
            "📚 Strong foundation in DSA, OOP, DBMS, OS, CN & System Design",
            "💻 Active contributor to college tech events and coding competitions",
        ],
        website_link: "https://jntuhcej.ac.in",
    },
];

export const certifications = [
    {
        title: "Associate in IT Foundations",
        subtitle: "Infosys Lex · 2025",
        certificate_link: "#",
        alt_name: "Infosys",
        color_code: "#a3e635",
        icon: "🏅",
    },
    {
        title: "Data Structures & Algorithms using Java",
        subtitle: "Infosys Lex · 2025",
        certificate_link: "#",
        alt_name: "DSA",
        color_code: "#38bdf8",
        icon: "⚙️",
    },
    {
        title: "Spring Boot Microservices",
        subtitle: "Udemy · 2024",
        certificate_link: "#",
        alt_name: "Spring",
        color_code: "#4ade80",
        icon: "🚀",
    },
    {
        title: "React — The Complete Guide",
        subtitle: "Udemy · 2024",
        certificate_link: "#",
        alt_name: "React",
        color_code: "#818cf8",
        icon: "⚛️",
    },
];

export const competitiveSites = [
    { name: "LeetCode", url: "#", icon: "⚡", color: "#fb923c" },
    { name: "HackerRank", url: "#", icon: "🏅", color: "#4ade80" },
    { name: "CodeChef", url: "#", icon: "👨‍🍳", color: "#facc15" },
    { name: "Codeforces", url: "#", icon: "🔥", color: "#f87171" },
];
// ─────────────────────────────────────────────────────────────────────────────

// ── Data (from resume) ────────────────────────────────────────────────────────
export const experiences = [
    {
        id: 1,
        role: "Software Developer Intern",
        company: "Infosys",
        type: "Full-time Internship",
        period: "July 2025 – Present",
        location: "Hyderabad, Telangana",
        logo_path: "infosys.avif",
        color: "#a3e635",
        current: true,
        highlights: [
            "Developed and tested RESTful APIs using Spring Boot and Hibernate, applying MVC architecture and SOLID principles during enterprise-grade training projects.",
            "Collaborated in Agile Scrum teams following SDLC best practices — daily standups, sprint planning, code reviews, and version control using Git/GitHub.",
            "Contributed to enterprise application modules aligned with microservices architecture and cloud deployment standards.",
        ],
        tags: [
            "Spring Boot",
            "Hibernate",
            "REST APIs",
            "Agile",
            "Microservices",
            "Git",
        ],
    },
    {
        id: 2,
        role: "IT Intern",
        company: "Ordnance Factory",
        type: "Summer Internship",
        period: "May 2024 – June 2024",
        location: "Telangana, India",
        logo_path: "odf.avif",
        color: "#38bdf8",
        current: false,
        highlights: [
            "Built a real-time dashboard for the Chief General Manager, improving data accessibility and decision-making speed across departments.",
            "Developed 4 digital portals from scratch, streamlining workflow efficiency and reducing manual processes by significant margins.",
            "Enhanced UI/UX and integrated data visualization tools, enabling faster operational insights for key stakeholders.",
        ],
        tags: ["Dashboard", "UI/UX", "Data Visualization", "Portals", "Workflow"],
    },
];

export const coreCS = [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "System Design",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
    "Microservices Architecture",
    "API Security",
    "Agile / SDLC",
    "CI/CD Pipelines",
    "Authentication & Authorization",
    "MVC Architecture",
];



export const allProjects = [
    // {
    //     id: 1,
    //     title: "NeuralFlow Studio",
    //     tagline: "Visual AI Pipeline Builder",
    //     description:
    //         "A node-based visual editor for constructing machine-learning pipelines. Drag-and-drop nodes, real-time data previews, and one-click cloud deployment — designed for ML engineers who think in graphs.",
    //     image:
    //         "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80",
    //     liveUrl: "#",
    //     githubUrl: "#",
    //     technologies: ["React", "Node.js", "MongoDB", "TypeScript"],
    //     year: "2024",
    //     category: "AI / Fullstack",
    //     featured: true,
    //     stats: { stars: 420, forks: 87 },
    // },
    {
        id: 1,
        title: "CampusFlow",
        tagline: "Smart Campus Management Platform",
        description:
            "A scalable campus automation platform serving 5000+ users with role-based dashboards, secure authentication, and cloud deployment.",
        image:
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80",
        liveUrl: "https://play.google.com/store/apps/details?id=com.jntr.campusflow&pcampaignid=web_share",
        githubUrl: "https://github.com/dyavanpallyrohankumar?tab=repositories",
        technologies: [
            "React",
            "JavaScript",
            "MongoDB",
            "Express",
            "Node.js",
            "Redis",
            "Docker", "Jenkins"
        ],
        year: "2025",
        category: "Infrastructure",
        featured: true,
        stats: { users: "5000+", uptime: "99.9%" },
    },
    {
        id: 2,
        title: "MTech Cutoff Hub",
        tagline: "Admission Cutoff Analytics Platform",
        description:
            "A scalable analytics backend for processing and filtering GATE & PGCET admission cutoff data using secure REST APIs.",
        image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
        liveUrl: "#",
        githubUrl: "https://github.com/dyavanpallyrohankumar/mtechCutOffHub",

        technologies: [
            "SpringBoot",
            "Java",
            "PostgreSQL",
            "Docker"
        ],
        year: "2026",
        category: "Analytics",
        featured: false,
        stats: { modules: 12, apiEndpoints: 40 },
    },
    {
        id: 3,
        title: "Student Data Lookup System",
        tagline: "Secure Sheet-Based Data Retrieval",
        description:
            "A secure student verification system with proxy-based API integration to protect backend sheet access.",
        image:
            "https://images.unsplash.com/photo-1508780709619-79562169bc64?w=900&q=80",
        liveUrl: "https://student-data-lookup.vercel.app/",
        githubUrl: "https://github.com/dyavanpallyrohankumar?tab=repositories",
        technologies: [
            "React",
            "JavaScript", "Google Apps Script",
            "REST API",
            "Google Sheets"
        ],
        year: "2024",
        category: "Analytics",
        featured: false,
        stats: { records: "10k+", security: "Proxy-based" },
    },

    {
        id: 4,
        title: "WhatsApp Chat Viewer",
        tagline: "Local Chat Parsing & UI Rendering",
        description:
            "A client-side React application that parses WhatsApp exports and renders conversations in a structured UI with search and highlighting.",
        image:
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&q=80",
        liveUrl: "https://readwhatsapp.vercel.app/",
        githubUrl: "https://github.com/dyavanpallyrohankumar?tab=repositories",
        technologies: [
            "React",
            "JavaScript",
            "Tailwind"
        ],
        year: "2024",
        category: "Design Systems",
        featured: false,
        stats: { parsing: "Client-side" },
    },

    {
        id: 5,
        title: "MedValt",
        tagline: "Microservices-Based Hospital System",
        description:
            "A modular hospital management platform using distributed services, secure authentication, and scalable backend infrastructure.",
        image:
            "https://images.unsplash.com/photo-1581093458791-9f3c3250d3d1?w=900&q=80",
        liveUrl: "#",
        githubUrl: "https://github.com/dyavanpallyrohankumar?tab=repositories",
        technologies: [
            "Node.js",
            "Express",
            "PostgreSQL",
            "Docker"
        ],
        year: "2025",
        category: "Infrastructure",
        featured: false,
        stats: { services: 6, modules: 15 },
    },

    {
        id: 6,
        title: "Katyalaganya",
        tagline: "Modern Matrimonial & Matchmaking Platform",
        description:
            "A scalable matchmaking platform with advanced filtering, secure profile management, and responsive UI.",
        image:
            "https://images.unsplash.com/photo-1529636798458-92182e662485?w=900&q=80",
        liveUrl: "https://kathri-lagnaya.vercel.app/",
        githubUrl: "https://github.com/dyavanpallyrohankumar?tab=repositories",
        technologies: [
            "React",
            "Node.js",
            "Express",
            "MongoDB",
            "Tailwind",
            "Docker"
        ],
        year: "2025",
        category: "E-Commerce",
        featured: false,
        stats: {
            profiles: "1000+",
            filters: "Advanced Matching"
        }
    }
];
