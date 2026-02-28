import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
    FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs,
    FaHtml5, FaCss3Alt, FaPython, FaDocker, FaFigma,
    FaJava,
    FaAws,
    FaGitAlt,
} from "react-icons/fa";
import {
    SiMongodb, SiExpress, SiJavascript, SiTypescript,
    SiTailwindcss, SiNextdotjs, SiPostgresql, SiRedis, SiGraphql,
    SiSpringboot,
    SiJenkins,
    SiGithubactions,
    SiSupabase,
    SiFlydotio,
    SiRender,
    SiRailway,
    SiNetlify,
    SiFramer,
    SiVercel,
    SiJsonwebtokens,
    SiMysql,
    SiPostman,
} from "react-icons/si";
import { allProjects } from "../../data/staticData";
import { TbBrandReactNative } from "react-icons/tb";
import { useIsMobile } from "./Hero";

// const allProjects =allProjects
// ── Tech Icon Map ─────────────────────────────────────────────────────────────
const techMap = {
    React: { icon: <FaReact />, color: "#38bdf8" },
    "Node.js": { icon: <FaNodeJs />, color: "#4ade80" },
    MongoDB: { icon: <SiMongodb />, color: "#4ade80" },
    Express: { icon: <SiExpress />, color: "#d1d5db" },
    HTML: { icon: <FaHtml5 />, color: "#fb923c" },
    CSS: { icon: <FaCss3Alt />, color: "#60a5fa" },
    JavaScript: { icon: <SiJavascript />, color: "#facc15" },
    TypeScript: { icon: <SiTypescript />, color: "#60a5fa" },
    "Next.js": { icon: <SiNextdotjs />, color: "#f1f5f9" },
    Tailwind: { icon: <SiTailwindcss />, color: "#22d3ee" },
    PostgreSQL: { icon: <SiPostgresql />, color: "#818cf8" },
    Redis: { icon: <SiRedis />, color: "#f87171" },
    GraphQL: { icon: <SiGraphql />, color: "#e879f9" },
    Python: { icon: <FaPython />, color: "#facc15" },
    Docker: { icon: <FaDocker />, color: "#38bdf8" },
    Figma: { icon: <FaFigma />, color: "#f87171" },
    SpringBoot: { icon: <SiSpringboot />, color: "#4ade80" },
    Java: { icon: <FaJava />, color: "#f97316" },
    AWS: { icon: <FaAws />, color: "#fb923c" },
    Jenkins: { icon: <SiJenkins />, color: "#f87171" },
    Git: { icon: <FaGitAlt />, color: "#F05032" },
    GitHub: { icon: <FaGithub />, color: "#f1f5f9" },
    Postman: { icon: <SiPostman />, color: "#FF6C37" },
    MySQL: { icon: <SiMysql />, color: "#4479A1" },
    ReactNative: { icon: <TbBrandReactNative />, color: "#61DAFB" },
    JWT: { icon: <SiJsonwebtokens />, color: "#d63aff" },
    Vercel: { icon: <SiVercel />, color: "#ffffff" },
    FramerMotion: { icon: <SiFramer />, color: "#0055FF" },
    Netlify: { icon: <SiNetlify />, color: "#00c7b7" },
    Railway: { icon: <SiRailway />, color: "#f92672" },
    Render: { icon: <SiRender />, color: "#46e3b7" },
    FlyIo: { icon: <SiFlydotio />, color: "#24185b" },
    Supabase: { icon: <SiSupabase />, color: "#3ecf8e" },
    GitHubActions: { icon: <SiGithubactions />, color: "#2088ff" },

};

// ── Noise SVG overlay (grain texture) ────────────────────────────────────────
const GrainOverlay = () => (
    <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", opacity: 0.035, pointerEvents: "none", zIndex: 9999 }}>
        <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
);

// ── Magnetic Button ───────────────────────────────────────────────────────────
function MagneticBtn({ children, href, style, className }) {
    const ref = useRef();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 300, damping: 20 });
    const sy = useSpring(y, { stiffness: 300, damping: 20 });

    const handleMove = (e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.35);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
    };
    const handleLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ x: sx, y: sy, display: "inline-flex", ...style }}
            className={className}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            whileTap={{ scale: 0.94 }}
        >
            {children}
        </motion.a>
    );
}

// ── Animated number ───────────────────────────────────────────────────────────
function AnimNum({ n }) {
    const [val, setVal] = useState(0);
    const ref = useRef();
    const inView = useInView(ref, { once: true });
    useEffect(() => {
        if (!inView) return;
        let frame;
        const start = performance.now();
        const dur = 1200;
        const run = (now) => {
            const t = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            setVal(Math.floor(ease * n));
            if (t < 1) frame = requestAnimationFrame(run);
        };
        frame = requestAnimationFrame(run);
        return () => cancelAnimationFrame(frame);
    }, [inView, n]);
    return <span ref={ref}>{val}</span>;
}

// ── Scrolling ticker ──────────────────────────────────────────────────────────
const ALL_TECH = ["React", "Node.js", "TypeScript", "Next.js", "MongoDB", "PostgreSQL", "Redis", "GraphQL", "Docker", "Tailwind", "Python", "Figma", "JavaScript", "Express"];
function Ticker() {
    const isMobile = useIsMobile();
    const items = [...ALL_TECH, ...ALL_TECH];
    return (
        <div style={{ overflow: "hidden", borderTop: "1px solid rgba(163,230,53,0.15)", borderBottom: "1px solid rgba(163,230,53,0.15)", padding: "10px 0", margin: "0 0 72px" }}>
            <motion.div
                style={{ display: "flex", gap: 40, width: "max-content", alignItems: "center" }}
                animate={{ x: [0, "-50%"] }}
                transition={{ duration: isMobile ? 30 : 22, repeat: Infinity, ease: "linear" }}
            >
                {items.map((t, i) => {
                    const tech = techMap[t];
                    return (
                        <span key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" }}>
                            {tech && <span style={{ color: tech.color, fontSize: 15 }}>{tech.icon}</span>}
                            {t.toUpperCase()}
                            <span style={{ color: "rgba(163,230,53,0.3)", fontSize: 18 }}>·</span>
                        </span>
                    );
                })}
            </motion.div>
        </div>
    );
}

// ── Featured Card ─────────────────────────────────────────────────────────────
function FeaturedCard({ project }) {
    const isMobile = useIsMobile();
    const ref = useRef();
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const rotX = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });
    const rotY = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });

    const handleMove = (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width;
        const ny = (e.clientY - r.top) / r.height;
        rotX.set((ny - 0.5) * -10);
        rotY.set((nx - 0.5) * 10);
        mouseX.set(nx);
        mouseY.set(ny);
    };
    const handleLeave = () => { rotX.set(0); rotY.set(0); };

    return (
        <motion.div
            ref={ref}
            style={{ perspective: 1200, marginBottom: 64 }}
            initial={{ opacity: 0, y: 80 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
            <motion.div
                style={isMobile ? {} : { rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
                onMouseMove={!isMobile ? handleMove : undefined}
                onMouseLeave={!isMobile ? handleLeave : undefined}
            >
                <div style={{
                    position: "relative",
                    borderRadius: 24,
                    overflow: "hidden",
                    border: "1px solid rgba(163,230,53,0.2)",
                    background: "#0d0d0d",
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    minHeight: isMobile ? "auto" : 460,
                }}>
                    {/* Left: image */}
                    <div style={{ position: "relative", overflow: "hidden" }}>
                        <motion.img
                            src={project.image}
                            alt={project.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                            whileHover={{ scale: 1.06 }}
                            transition={{ duration: 0.7 }}
                        />
                        <div style={{
                            position: "absolute", inset: 0,
                            background: "linear-gradient(to right, transparent 60%, #0d0d0d 100%)",
                        }} />
                        {/* Year badge */}
                        <div style={{
                            position: "absolute", top: 20, left: 20,
                            padding: "4px 12px", borderRadius: 100,
                            background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)",
                            border: "1px solid rgba(163,230,53,0.3)",
                            fontSize: 11, letterSpacing: "0.15em",
                            color: "#a3e635", fontFamily: "'DM Mono', monospace",
                        }}>
                            {project.year}
                        </div>
                    </div>

                    {/* Right: content */}
                    <div style={{ padding: isMobile ? "28px 22px" : "48px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#a3e635", fontFamily: "'DM Mono', monospace", marginBottom: 12 }}>
                            ★ FEATURED · {project.category.toUpperCase()}
                        </div>

                        <h2 style={{
                            fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 900,
                            color: "#f8fafc", letterSpacing: "-0.03em", lineHeight: 1.05,
                            fontFamily: "'Playfair Display', Georgia, serif", margin: "0 0 8px",
                        }}>
                            {project.title}
                        </h2>
                        <p style={{ fontSize: 14, color: "#a3e635", fontFamily: "'DM Mono', monospace", margin: "0 0 20px" }}>
                            {project.tagline}
                        </p>

                        <p style={{ fontSize: 15, color: "rgba(248,250,252,0.55)", lineHeight: 1.75, margin: "0 0 28px" }}>
                            {project.description}
                        </p>

                        {/* Stats */}
                        <div style={{ display: "flex", gap: isMobile ? 20 : 28, marginBottom: 28 }}>
                            {[
                                { label: "GitHub Stars", val: project.stats.stars },
                                { label: "Forks", val: project.stats.forks },
                            ].map((s) => (
                                <div key={s.label}>
                                    <div style={{ fontSize: 26, fontWeight: 800, color: "#f8fafc", fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>
                                        <AnimNum n={s.val} />+
                                    </div>
                                    <div style={{ fontSize: 11, color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2 }}>{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Tech */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                            {project.technologies.map((t) => {
                                const m = techMap[t];
                                return (
                                    <div key={t} style={{
                                        display: "flex", alignItems: "center", gap: 6,
                                        padding: "5px 12px", borderRadius: 6,
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        fontSize: 12, color: m?.color || "#94a3b8",
                                    }}>
                                        {m?.icon} <span style={{ color: "#cbd5e1" }}>{t}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Actions */}
                        <div style={{
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",
                            gap: 12,
                        }}>
                            <MagneticBtn href={project.liveUrl} style={{
                                padding: "12px 28px", borderRadius: 10,
                                background: "#a3e635", color: "#0a0a0a",
                                fontSize: 14, fontWeight: 700,
                                textDecoration: "none", alignItems: "center", gap: 8,
                            }}>
                                <FaExternalLinkAlt size={13} /> Live Demo
                            </MagneticBtn>
                            <MagneticBtn href={project.githubUrl} style={{
                                padding: "12px 24px", borderRadius: 10,
                                border: "1px solid rgba(163,230,53,0.3)",
                                background: "transparent", color: "#a3e635",
                                fontSize: 14, fontWeight: 600,
                                textDecoration: "none", alignItems: "center", gap: 8,
                            }}>
                                <FaGithub size={15} /> Source
                            </MagneticBtn>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
    const isMobile = useIsMobile();
    const ref = useRef();
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            style={{ position: "relative" }}
        >
            <motion.div
                animate={{ y: hovered ? -8 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                style={{
                    borderRadius: 18,
                    overflow: "hidden",
                    background: "#0d0d0d",
                    border: `1px solid ${hovered ? "rgba(163,230,53,0.35)" : "rgba(255,255,255,0.06)"}`,
                    transition: "border-color 0.3s",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Image */}
                <div style={{ position: "relative", overflow: "hidden", height: isMobile ? 190 : 220 }}>
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        animate={{ scale: hovered ? 1.08 : 1 }}
                        transition={{ duration: 0.6 }}
                    />
                    {/* Dark overlay */}
                    <motion.div
                        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}
                        animate={{ opacity: hovered ? 1 : 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <MagneticBtn href={project.liveUrl} style={{
                            width: 48, height: 48, borderRadius: "50%",
                            background: "#a3e635", color: "#0a0a0a",
                            alignItems: "center", justifyContent: "center", fontSize: 16,
                            textDecoration: "none",
                        }}>
                            <FaExternalLinkAlt />
                        </MagneticBtn>
                        <MagneticBtn href={project.githubUrl} style={{
                            width: 48, height: 48, borderRadius: "50%",
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            color: "#f8fafc",
                            alignItems: "center", justifyContent: "center", fontSize: 18,
                            textDecoration: "none",
                        }}>
                            <FaGithub />
                        </MagneticBtn>
                    </motion.div>

                    {/* Category chip */}
                    <div style={{
                        position: "absolute", top: 14, left: 14,
                        padding: "3px 10px", borderRadius: 100,
                        background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
                        border: "1px solid rgba(163,230,53,0.25)",
                        fontSize: 10, letterSpacing: "0.15em",
                        color: "#a3e635", fontFamily: "'DM Mono', monospace",
                    }}>
                        {project.category.toUpperCase()}
                    </div>
                </div>

                {/* Body */}
                <div style={{ padding: "24px 26px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                        <h3 style={{
                            fontSize: 20, fontWeight: 800,
                            color: "#f8fafc", letterSpacing: "-0.02em",
                            fontFamily: "'Playfair Display', Georgia, serif",
                            margin: 0,
                        }}>
                            {project.title}
                        </h3>
                        <span style={{ fontSize: 11, color: "#475569", fontFamily: "'DM Mono', monospace" }}>{project.year}</span>
                    </div>

                    <p style={{ fontSize: 13, color: "#a3e635", fontFamily: "'DM Mono', monospace", margin: "0 0 12px" }}>
                        {project.tagline}
                    </p>

                    <p style={{ fontSize: 14, color: "rgba(248,250,252,0.45)", lineHeight: 1.7, margin: "0 0 20px", flex: 1 }}>
                        {project.description}
                    </p>

                    {/* Stars */}
                    <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                        <span style={{ fontSize: 12, color: "#64748b", fontFamily: "'DM Mono', monospace" }}>
                            ★ {project.stats.stars} stars
                        </span>
                        <span style={{ fontSize: 12, color: "#64748b", fontFamily: "'DM Mono', monospace" }}>
                            ⑂ {project.stats.forks} forks
                        </span>
                    </div>

                    {/* Tech */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 }}>
                        {project.technologies.map((t) => {
                            const m = techMap[t];
                            return (
                                <span key={t} style={{
                                    display: "inline-flex", alignItems: "center", gap: 5,
                                    padding: "3px 10px", borderRadius: 6,
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    fontSize: 11, color: m?.color || "#94a3b8",
                                }}>
                                    {m?.icon} <span style={{ color: "#94a3b8" }}>{t}</span>
                                </span>
                            );
                        })}
                    </div>

                    {/* Buttons */}
                    <div style={{ display: "flex", gap: 10 }}>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
                            flex: 1, textAlign: "center", padding: "9px 0",
                            background: "#a3e635", color: "#0a0a0a",
                            fontWeight: 700, fontSize: 13, borderRadius: 8,
                            textDecoration: "none", transition: "background 0.2s",
                        }}>
                            Live Demo
                        </a>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{
                            flex: 1, textAlign: "center", padding: "9px 0",
                            border: "1px solid rgba(163,230,53,0.3)",
                            color: "#a3e635", fontWeight: 600, fontSize: 13,
                            borderRadius: 8, textDecoration: "none",
                            transition: "all 0.2s", background: "transparent",
                        }}>
                            GitHub
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ── Filter Tabs ───────────────────────────────────────────────────────────────
const CATS = ["All", "AI / Fullstack", "E-Commerce", "Design Systems", "Analytics", "Infrastructure"];

function FilterTabs({ active, setActive }) {
    const isMobile = useIsMobile();

    return (
        <motion.div
            style={{
                display: "flex",
                flexWrap: isMobile ? "nowrap" : "wrap",
                overflowX: isMobile ? "auto" : "visible",
                gap: 8,
                marginBottom: 48,
                paddingBottom: isMobile ? 6 : 0,
            }} initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {CATS.map((cat) => (
                <motion.button
                    key={cat}
                    onClick={() => setActive(cat)}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        padding: "7px 18px",
                        borderRadius: 100,
                        border: `1px solid ${active === cat ? "#a3e635" : "rgba(255,255,255,0.1)"}`,
                        background: active === cat ? "rgba(163,230,53,0.1)" : "transparent",
                        color: active === cat ? "#a3e635" : "rgba(255,255,255,0.4)",
                        fontSize: 12, fontWeight: 600,
                        letterSpacing: "0.05em",
                        cursor: "pointer",
                        fontFamily: "'DM Mono', monospace",
                        transition: "all 0.2s",
                    }}
                >
                    {cat}
                </motion.button>
            ))}
        </motion.div>
    );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function Projects() {
    const isMobile = useIsMobile();
    const featured = allProjects.find((p) => p.featured);
    const rest = allProjects.filter((p) => !p.featured);
    const [activeFilter, setActiveFilter] = useState("All");
    const filtered = activeFilter === "All" ? rest : rest.filter((p) => p.category === activeFilter);
    const totalStars = allProjects.reduce((s, p) => s + p.stats.stars, 0);

    return (
        <>
            <GrainOverlay />
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Mono&family=DM+Sans:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
      `}</style>

            <section style={{
                background: "#080808",
                padding: isMobile ? "80px 0 90px" : "100px 0 120px",
                fontFamily: "'DM Sans', sans-serif",
                position: "relative",
                overflow: "hidden",
            }}>
                {/* Background grid */}
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `
            linear-gradient(rgba(163,230,53,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(163,230,53,0.03) 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                    pointerEvents: "none",
                }} />

                {/* Glow blobs */}
                <div style={{ position: "absolute", top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(163,230,53,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -200, left: -200, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px", position: "relative" }}>

                    {/* ── Header ─────────────────────────────────────────────────── */}
                    <div style={{ marginBottom: 72 }}>
                        <motion.p
                            style={{ fontSize: 11, letterSpacing: "0.3em", color: "#a3e635", fontFamily: "'DM Mono', monospace", margin: "0 0 16px" }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            — SELECTED WORK
                        </motion.p>

                        <div style={{
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",
                            justifyContent: "space-between",
                            alignItems: isMobile ? "flex-start" : "flex-end",
                            gap: isMobile ? 28 : 24, flexWrap: "wrap",
                        }}>
                            <motion.h2
                                style={{
                                    fontSize: "clamp(52px, 7vw, 88px)",
                                    fontWeight: 900, lineHeight: 1,
                                    letterSpacing: "-0.04em",
                                    color: "#f8fafc",
                                    fontFamily: "'Playfair Display', Georgia, serif",
                                    margin: 0,
                                }}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                Things I've
                                <br />
                                <span style={{ color: "#a3e635", WebkitTextStroke: "2px #a3e635", WebkitTextFillColor: "transparent" }}>
                                    Shipped
                                </span>
                            </motion.h2>

                            {/* Meta stats */}
                            <motion.div
                                style={{
                                    display: "flex",
                                    gap: isMobile ? 24 : 40,
                                    width: isMobile ? "100%" : "auto",
                                    justifyContent: isMobile ? "space-between" : "flex-end",
                                }} initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                {[
                                    { val: allProjects.length, label: "Projects" },
                                    { val: totalStars, label: "GitHub Stars" },
                                ].map((s) => (
                                    <div key={s.label} style={{ textAlign: "right" }}>
                                        <div style={{ fontSize: 36, fontWeight: 900, color: "#f8fafc", fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>
                                            <AnimNum n={s.val} />+
                                        </div>
                                        <div style={{ fontSize: 11, color: "#475569", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>
                                            {s.label}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* ── Ticker ────────────────────────────────────────────────── */}
                    <Ticker />

                    {/* ── Featured Project ──────────────────────────────────────── */}
                    {featured && <FeaturedCard project={featured} />}

                    {/* ── Filter + Grid ─────────────────────────────────────────── */}
                    <FilterTabs active={activeFilter} setActive={setActiveFilter} />

                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={activeFilter}
                            style={{
                                display: "grid",
                                gridTemplateColumns: isMobile
                                    ? "1fr"
                                    : "repeat(auto-fill, minmax(340px, 1fr))",
                                gap: 24,
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filtered.map((project, i) => (
                                <ProjectCard key={project.id} project={project} index={i} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* ── Footer CTA ────────────────────────────────────────────── */}
                    <motion.div
                        style={{ textAlign: "center", marginTop: 80 }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p style={{ fontSize: 14, color: "#475569", marginBottom: 24, fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em" }}>
                            Want to see more? All projects are on GitHub.
                        </p>
                        <MagneticBtn
                            href="https://github.com"
                            style={{
                                display: "inline-flex", alignItems: "center", gap: 10,
                                padding: isMobile ? "12px 26px" : "14px 36px", borderRadius: 12,
                                border: "1px solid rgba(163,230,53,0.4)",
                                background: "rgba(163,230,53,0.06)",
                                color: "#a3e635", fontSize: 15, fontWeight: 700,
                                textDecoration: "none",
                            }}
                        >
                            <FaGithub size={18} />
                            View All on GitHub
                        </MagneticBtn>
                    </motion.div>

                </div>
            </section>
        </>
    );
}