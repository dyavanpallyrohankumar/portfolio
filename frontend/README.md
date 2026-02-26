<div align="center">

```
██████╗  ██████╗ ██╗  ██╗ █████╗ ███╗   ██╗    ██████╗
██╔══██╗██╔═══██╗██║  ██║██╔══██╗████╗  ██║    ██╔══██╗
██████╔╝██║   ██║███████║███████║██╔██╗ ██║    ██║  ██║
██╔══██╗██║   ██║██╔══██║██╔══██║██║╚██╗██║    ██║  ██║
██║  ██║╚██████╔╝██║  ██║██║  ██║██║ ╚████║    ██████╔╝
╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═════╝
```

# &lt;RohanKumar.D /&gt; — Developer Portfolio

### *Dark Industrial · Acid Green · Production Grade*

[![React](https://img.shields.io/badge/React-18.x-38bdf8?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.x-a3e635?style=flat-square&logo=vite)](https://vitejs.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-818cf8?style=flat-square&logo=framer)](https://www.framer.com/motion)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-4ade80?style=flat-square)](./LICENSE)
[![Portfolio](https://img.shields.io/badge/Live-Portfolio-a3e635?style=flat-square)](https://rohankumar.dev)

<br />

> **"Architecting scalable UI systems, building performant React applications,**
> **and crafting clean user experiences using modern frontend architecture."**

<br />

![Portfolio Preview](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80)

</div>

---

## 📋 Table of Contents

- [✨ Overview](#-overview)
- [🎨 Design System](#-design-system)
- [🏗 Architecture](#-architecture)
- [📦 Tech Stack](#-tech-stack)
- [🚀 Features](#-features)
- [📁 Project Structure](#-project-structure)
- [⚙️ Getting Started](#️-getting-started)
- [🔧 Configuration](#-configuration)
- [📄 Sections](#-sections)
- [🌐 Deployment](#-deployment)
- [📬 Contact](#-contact)

---

## ✨ Overview

This is the source code for my **personal developer portfolio** — a production-grade, fully animated web application built to showcase my skills, projects, and professional journey as a Full-Stack Developer.

Built from scratch with a bold **dark industrial aesthetic**, acid-green accents, and an obsessive attention to micro-interactions. Every section is scroll-triggered, every button is magnetic, and every animation has a purpose.

**Live at:** [https://rohankumar.dev](https://rohankumar.dev) *(replace with your actual URL)*

---

## 🎨 Design System

The entire portfolio follows a strict, cohesive design language:

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#080808` | Page backgrounds |
| `--bg-card` | `#0d0d0d` | Card surfaces |
| `--accent` | `#a3e635` | Primary accent, CTAs |
| `--accent-blue` | `#38bdf8` | Secondary accent |
| `--accent-purple` | `#818cf8` | Tertiary accent |
| `--text-primary` | `#f8fafc` | Headings |
| `--text-muted` | `rgba(248,250,252,0.4)` | Body text |
| `--border` | `rgba(255,255,255,0.06)` | Card borders |
| `--border-accent` | `rgba(163,230,53,0.2)` | Highlighted borders |

**Typography:**
- **Display:** `Playfair Display` — serif, 900 weight, for section headings
- **Mono:** `DM Mono` — for labels, code, terminal elements
- **Body:** `DM Sans` — for paragraphs and UI text

**Grid:** 60×60px dot grid overlay at 2.5% opacity on all dark sections.

---

## 🏗 Architecture

```
portfolio/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── layout/
│   │   │   ├── Navbar.jsx      # Fixed nav with scroll detection & mobile menu
│   │   │   └── Footer.jsx      # Full footer with CTA banner & scroll-to-top
│   │   └── ui/
│   │       └── Loader.jsx      # Terminal boot-sequence loading screen
│   ├── sections/            # Full-page portfolio sections
│   │   ├── Hero.jsx            # Hero + About + Marquee + Services (4-in-1)
│   │   ├── Projects.jsx        # Featured project + filterable grid
│   │   ├── ExperienceAndSkills.jsx  # Timeline experience + skill bars
│   │   ├── Education.jsx       # Degrees + certifications + competitive sites
│   │   ├── Contact.jsx         # Contact form + info cards
│   │   └── Resume.jsx          # PDF viewer + fullscreen mode + sidebar
│   ├── data/
│   │   └── staticData.js       # All portfolio content (single source of truth)
│   ├── theme.jsx               # Theme tokens
│   └── App.jsx                 # Root component + routing
├── public/
│   ├── Resume.pdf              # Your actual resume PDF
│   └── assets/                 # Images, icons
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 📦 Tech Stack

### Frontend Core
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.x | UI framework |
| **Vite** | 5.x | Build tool & dev server |
| **Framer Motion** | 11.x | Animations & gestures |
| **Tailwind CSS** | 3.x | Utility-first styling |

### UI & Icons
| Technology | Purpose |
|------------|---------|
| **React Icons** | FaGithub, SiSpringboot, etc. |
| **Google Fonts** | Playfair Display, DM Mono, DM Sans |

### Deployment
| Technology | Purpose |
|------------|---------|
| **Vercel / Netlify** | Hosting & CI/CD |
| **GitHub** | Version control |

---

## 🚀 Features

### 🎭 Animations & Interactions
- **Terminal boot loader** — scramble-text effect, orbit rings, real progress bar, line-by-line boot log
- **Magnetic buttons** — CTAs and icons lean toward the cursor with spring physics
- **3D card tilt** — featured project card follows mouse with perspective rotation
- **Scroll-triggered reveals** — every section animates in via `useInView` with staggered children
- **Typewriter effect** — hero cycling through 5 roles with blinking cursor
- **Mouse-parallax orbs** — background glows that softly follow mouse movement
- **Infinite ticker tapes** — tech stack and skills scroll continuously
- **Animated skill bars** — fill on scroll with eased transitions
- **Count-up numbers** — stats animate from 0 on scroll into view
- **Tech orbit ring** — 8 technology icons orbit a center `</>` on the hero

### 📐 Layout & Design
- **Fully responsive** — mobile-first, collapsing gracefully from desktop → tablet → mobile
- **Dark industrial theme** — `#080808` base, `#0d0d0d` cards, acid-green accents
- **Background dot grid** — 60×60px green grid at low opacity on all sections
- **Grain texture overlay** — SVG noise filter for tactile depth
- **Ghost outline text** — `WebkitTextStroke` for editorial section headings
- **Asymmetric layouts** — two-column splits, off-center compositions, cinema-wide cards

### 🧩 Sections
- **Loader** — terminal boot sequence with orbit animation
- **Navbar** — scroll-aware, mobile menu with clip-path wipe animation, active section tracking, magnetic social icons
- **Hero** — typewriter, parallax orbs, floating tech pills, orbit ring, stat counters, scroll indicator
- **About** — two-column bio + timeline highlights
- **Services** — 6-card focus areas (Backend, Frontend, Cloud, Security, DB, System Design)
- **Projects** — featured cinema card + filterable grid with category tabs
- **Experience & Skills** — collapsible timeline cards + animated skill bars + core concepts cloud
- **Education** — degrees + certifications + competitive site chips
- **Contact** — floating-label form with validation + 5 contact info cards + toast notifications
- **Resume** — PDF iframe with fullscreen mode + sidebar stats + download button
- **Footer** — CTA banner + 3-column grid + scroll-to-top

---

## 📁 Project Structure

### `src/data/staticData.js`

This is the **single source of truth** for all portfolio content. Update this file to change any text, links, or data across the entire site.

```js
// src/data/staticData.js

export const degree = {
  degrees: [
    {
      title: "Bachelor of Technology in Computer Science",
      subtitle: "JNTUH College of Engineering Rajanna Sircilla",
      duration: "November 2021 – July 2025",
      initials: "JN",
      descriptions: [
        "🎓 Specialized in Full-Stack Development & Cloud-Native Systems",
        // ...
      ],
      website_link: "https://jntuhcej.ac.in",
    },
  ],
};

export const certificates = {
  certifications: [
    {
      title: "Associate in IT Foundations (Java)",
      subtitle: "Infosys Lex · 2025",
      certificate_link: "#",
      color_code: "#a3e635",
      icon: "🏅",
    },
    // ...
  ],
};

export const allProjects = [
  {
    id: 1,
    title: "CampusFlow",
    tagline: "Full-Stack Campus Management Platform",
    description: "...",
    image: "/assets/campusflow.png",
    liveUrl: "https://campusflow.com",
    githubUrl: "https://github.com/dyavanpallyrohankumar/campusflow",
    technologies: ["React", "Node.js", "MongoDB", "Docker"],
    year: "2024",
    category: "Fullstack",
    featured: true,
    stats: { stars: 42, forks: 8 },
  },
  // ...
];
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** `>= 18.x`
- **npm** `>= 9.x` or **yarn** `>= 1.22`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/dyavanpallyrohankumar/portfolio.git

# 2. Navigate to project directory
cd portfolio

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be running at **http://localhost:5173**

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

---

## 🔧 Configuration

### Adding Your Resume

Place your resume PDF in the `public/` directory:

```
public/
└── Resume.pdf     ← rename your file to exactly this
```

The Resume section iframe and download button both point to `/Resume.pdf`.

### Updating Portfolio Content

All content lives in `src/data/staticData.js`. Key exports:

| Export | Used In |
|--------|---------|
| `degree` | `Education.jsx` |
| `certificates` | `Education.jsx` |
| `competitiveSite` | `Education.jsx` |
| `allProjects` | `Projects.jsx` |
| `experiences` | `ExperienceAndSkills.jsx` |
| `skillGroups` | `ExperienceAndSkills.jsx` |

### Customizing the Theme

Edit the CSS variables in `src/index.css` or directly update the inline style values. The accent color `#a3e635` appears throughout — a global find-and-replace is the easiest way to re-theme.

### Setting Up the Contact Form

The contact form is currently wired to a simulated API call. To connect a real email service, replace the `handleSubmit` function in `Contact.jsx`:

**Option 1 — EmailJS (no backend needed):**
```bash
npm install @emailjs/browser
```
```js
import emailjs from '@emailjs/browser';

const handleSubmit = async (e) => {
  e.preventDefault();
  await emailjs.send(
    'YOUR_SERVICE_ID',
    'YOUR_TEMPLATE_ID',
    { name: form.name, email: form.email, message: form.message },
    'YOUR_PUBLIC_KEY'
  );
};
```

**Option 2 — Formspree:**
```js
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
});
```

---

## 📄 Sections

| # | Section | File | Key Features |
|---|---------|------|-------------|
| 1 | **Loader** | `Loader.jsx` | Terminal boot log, orbit rings, scramble text, progress bar |
| 2 | **Navbar** | `Navbar.jsx` | Scroll-aware glass nav, active tracking, magnetic icons, clip-path mobile menu |
| 3 | **Hero** | `Hero.jsx` | Typewriter, parallax orbs, floating pills, orbit ring, stat counters |
| 4 | **About** | `Hero.jsx` | Two-column bio, timeline highlights |
| 5 | **Services** | `Hero.jsx` | 6 focus area cards with hover top-line |
| 6 | **Projects** | `Projects.jsx` | Featured 3D card, filterable grid, magnetic buttons |
| 7 | **Experience** | `ExperienceAndSkills.jsx` | Collapsible timeline, current-role pulse |
| 8 | **Skills** | `ExperienceAndSkills.jsx` | Category tabs, animated bars, core CS concepts cloud |
| 9 | **Education** | `Education.jsx` | Degree cards, cert grid, competitive site chips |
| 10 | **Contact** | `Contact.jsx` | Floating-label form, validation, toast, contact cards |
| 11 | **Resume** | `Resume.jsx` | PDF viewer, fullscreen mode, sidebar, download |
| 12 | **Footer** | `Footer.jsx` | CTA banner, 3-column grid, scroll-to-top |

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

Or connect your GitHub repo directly at [vercel.com](https://vercel.com) for automatic deployments on every push to `main`.

### Netlify

```bash
# Build
npm run build

# Drag and drop the 'dist' folder to netlify.com/drop
# OR use netlify CLI:
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### Environment Variables

No environment variables are required for the base portfolio. If you add EmailJS or other services, create a `.env` file:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 📊 Performance

| Metric | Score |
|--------|-------|
| Performance | 95+ |
| Accessibility | 90+ |
| Best Practices | 95+ |
| SEO | 90+ |

*Lighthouse scores on production build. Run `npm run build && npm run preview` then audit locally.*

---

## 🤝 Contributing

This is a personal portfolio, but if you spot a bug or have a suggestion:

1. Fork the repository
2. Create a feature branch: `git checkout -b fix/your-fix`
3. Commit changes: `git commit -m 'fix: description'`
4. Push to branch: `git push origin fix/your-fix`
5. Open a Pull Request

---

## 📜 License

This project is open source under the [MIT License](./LICENSE).

Feel free to use this as inspiration or a starting point for your own portfolio — just don't copy it wholesale. Build something that represents *you*.

---

## 📬 Contact

<div align="center">

**Dyavanpally Rohankumar**

[![Email](https://img.shields.io/badge/Email-dyavanpallyrohan@gmail.com-a3e635?style=flat-square&logo=gmail)](mailto:dyavanpallyrohan@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-dyavanpallyrohankumar-38bdf8?style=flat-square&logo=linkedin)](https://linkedin.com/in/dyavanpallyrohankumar)
[![GitHub](https://img.shields.io/badge/GitHub-dyavanpallyrohankumar-f8fafc?style=flat-square&logo=github)](https://github.com/dyavanpallyrohankumar)
[![Portfolio](https://img.shields.io/badge/Portfolio-Live_Site-a3e635?style=flat-square)](https://rohankumar.dev)

📍 Hyderabad, Telangana, India

</div>

---

<div align="center">

Made with ☕ and too many late nights by **Rohankumar.D**

`<RohanKumar.D />`

</div>