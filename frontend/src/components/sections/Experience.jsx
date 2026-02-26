import { useState, useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
    FaJava, FaReact, FaNodeJs, FaDocker, FaAws, FaGitAlt,
    FaDatabase, FaCode, FaBriefcase, FaGraduationCap,
} from "react-icons/fa";
import {
    SiSpringboot, SiMongodb, SiPostgresql, SiMysql,
    SiJavascript, SiHibernate, SiJenkins, SiTailwindcss,
    SiExpress, SiBootstrap, SiHtml5, SiCss3,
} from "react-icons/si";
import { TbBrandCpp } from "react-icons/tb";
import { coreCS, experiences } from "../../data/staticData";

// const experiences = experiences
// const coreCS = coreCS

export const skillGroups = [
    {
        category: "Languages",
        icon: <FaCode />,
        color: "#facc15",
        skills: [
            { name: "Java", icon: <FaJava />, level: 92, color: "#f97316" },
            { name: "JavaScript", icon: <SiJavascript />, level: 85, color: "#facc15" },
            { name: "C", icon: <TbBrandCpp />, level: 72, color: "#94a3b8" },
        ],
    },
    {
        category: "Frontend",
        icon: <FaReact />,
        color: "#38bdf8",
        skills: [
            { name: "React.js", icon: <FaReact />, level: 88, color: "#38bdf8" },
            { name: "HTML5", icon: <SiHtml5 />, level: 90, color: "#fb923c" },
            { name: "CSS3", icon: <SiCss3 />, level: 85, color: "#60a5fa" },
            { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 82, color: "#22d3ee" },
            { name: "Bootstrap", icon: <SiBootstrap />, level: 78, color: "#818cf8" },
        ],
    },
    {
        category: "Backend",
        icon: <SiSpringboot />,
        color: "#4ade80",
        skills: [
            { name: "Spring Boot", icon: <SiSpringboot />, level: 88, color: "#4ade80" },
            { name: "Node.js", icon: <FaNodeJs />, level: 80, color: "#4ade80" },
            { name: "Express.js", icon: <SiExpress />, level: 78, color: "#94a3b8" },
            { name: "Hibernate", icon: <SiHibernate />, level: 80, color: "#facc15" },
            { name: "REST APIs", icon: <FaCode />, level: 90, color: "#a3e635" },
        ],
    },
    {
        category: "Databases",
        icon: <FaDatabase />,
        color: "#e879f9",
        skills: [
            { name: "PostgreSQL", icon: <SiPostgresql />, level: 82, color: "#818cf8" },
            { name: "MongoDB", icon: <SiMongodb />, level: 80, color: "#4ade80" },
            { name: "MySQL", icon: <SiMysql />, level: 78, color: "#38bdf8" },
        ],
    },
    {
        category: "DevOps & Cloud",
        icon: <FaDocker />,
        color: "#38bdf8",
        skills: [
            { name: "Docker", icon: <FaDocker />, level: 78, color: "#38bdf8" },
            { name: "AWS EC2", icon: <FaAws />, level: 72, color: "#fb923c" },
            { name: "Jenkins", icon: <SiJenkins />, level: 70, color: "#f87171" },
            { name: "Git / GitHub", icon: <FaGitAlt />, level: 90, color: "#f97316" },
        ],
    },
];
// ── Animated skill bar ────────────────────────────────────────────────────────
function SkillBar({ skill, delay = 0 }) {
    const ref = useRef();
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            ref={ref}
            style={{ marginBottom: 14 }}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay, duration: 0.5 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: skill.color, fontSize: 15, display: "flex" }}>{skill.icon}</span>
                    <span style={{ fontSize: 13, color: hovered ? "#f8fafc" : "rgba(248,250,252,0.7)", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, transition: "color 0.2s" }}>
                        {skill.name}
                    </span>
                </div>
                <motion.span
                    style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: skill.color }}
                    animate={{ opacity: hovered ? 1 : 0.5 }}
                >
                    {skill.level}%
                </motion.span>
            </div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 100, overflow: "hidden" }}>
                <motion.div
                    style={{ height: "100%", borderRadius: 100, background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})` }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : {}}
                    transition={{ delay: delay + 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>
        </motion.div>
    );
}

// ── Grain overlay ─────────────────────────────────────────────────────────────
const GrainOverlay = () => (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03, pointerEvents: "none", zIndex: 0 }}>
        <filter id="ng"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter="url(#ng)" />
    </svg>
);

// ── Timeline dot ──────────────────────────────────────────────────────────────
function TimelineDot({ color, current }) {
    return (
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <motion.div
                style={{
                    width: 16, height: 16, borderRadius: "50%",
                    background: color, border: `3px solid #080808`,
                    boxShadow: `0 0 0 3px ${color}40`,
                    position: "relative", zIndex: 2, flexShrink: 0,
                }}
                animate={current ? { boxShadow: [`0 0 0 3px ${color}40`, `0 0 0 10px ${color}10`, `0 0 0 3px ${color}40`] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </div>
    );
}

// ── Experience Card ───────────────────────────────────────────────────────────
function ExperienceCard({ exp, index, isLast }) {
    const ref = useRef();
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const [expanded, setExpanded] = useState(true);

    return (
        <motion.div
            ref={ref}
            style={{ display: "flex", gap: 0, position: "relative" }}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Timeline column */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 48, flexShrink: 0, paddingTop: 4 }}>
                <TimelineDot color={exp.color} current={exp.current} />
                {!isLast && (
                    <motion.div
                        style={{ width: 2, flex: 1, marginTop: 8, background: "rgba(255,255,255,0.06)", minHeight: 60 }}
                        initial={{ height: 0 }}
                        animate={inView ? { height: "100%" } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                )}
            </div>

            {/* Card */}
            <motion.div
                style={{
                    flex: 1, marginBottom: isLast ? 0 : 32,
                    borderRadius: 18,
                    border: `1px solid ${exp.current ? `${exp.color}30` : "rgba(255,255,255,0.06)"}`,
                    background: exp.current ? `linear-gradient(135deg, rgba(163,230,53,0.03) 0%, #0d0d0d 100%)` : "#0d0d0d",
                    overflow: "hidden",
                }}
                whileHover={{ borderColor: `${exp.color}45` }}
                transition={{ duration: 0.2 }}
            >
                {/* Card header */}
                <div
                    style={{ padding: "24px 28px", cursor: "pointer", userSelect: "none" }}
                    onClick={() => setExpanded(!expanded)}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            {/* Company logo */}
                            <div style={{
                                width: 48, height: 48, borderRadius: 12,
                                background: `${exp.color}15`,
                                border: `1px solid ${exp.color}30`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 13, fontWeight: 800, color: exp.color,
                                fontFamily: "'DM Mono', monospace", flexShrink: 0,
                            }}>
                                {exp.logo_path ? (
                                    <img
                                        src={new URL(
                                            `../../assets/images/${exp.logo_path}`,
                                            import.meta.url
                                        ).href}
                                        alt={exp.company}
                                        style={{
                                            width: 34,
                                            height: 34,
                                            objectFit: "contain",
                                        }}
                                    />
                                ) : (
                                    exp.initials
                                )}
                            </div>
                            <div>
                                <h3 style={{
                                    fontSize: 20, fontWeight: 800, color: "#f8fafc",
                                    fontFamily: "'Playfair Display', Georgia, serif",
                                    letterSpacing: "-0.02em", margin: "0 0 4px",
                                }}>
                                    {exp.role}
                                </h3>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                                    <span style={{ fontSize: 15, fontWeight: 600, color: exp.color }}>{exp.company}</span>
                                    <span style={{ fontSize: 11, color: "#475569" }}>·</span>
                                    <span style={{ fontSize: 12, color: "#475569", fontFamily: "'DM Mono', monospace" }}>{exp.type}</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                            <div style={{
                                padding: "4px 12px", borderRadius: 100,
                                background: `${exp.color}15`, border: `1px solid ${exp.color}25`,
                                fontSize: 11, color: exp.color, fontFamily: "'DM Mono', monospace",
                                letterSpacing: "0.05em",
                            }}>
                                {exp.period}
                            </div>
                            <span style={{ fontSize: 11, color: "#475569", fontFamily: "'DM Mono', monospace" }}>
                                📍 {exp.location}
                            </span>
                            {exp.current && (
                                <motion.div
                                    style={{
                                        display: "flex", alignItems: "center", gap: 5,
                                        fontSize: 10, color: "#a3e635", fontFamily: "'DM Mono', monospace",
                                        letterSpacing: "0.1em",
                                    }}
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a3e635", display: "inline-block" }} />
                                    CURRENTLY HERE
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Expand toggle */}
                    <motion.div
                        style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 16, color: "#475569", fontSize: 11, fontFamily: "'DM Mono', monospace" }}
                        animate={{ opacity: 0.6 }}
                        whileHover={{ opacity: 1, color: exp.color }}
                    >
                        <motion.span animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>▶</motion.span>
                        {expanded ? "COLLAPSE" : "EXPAND DETAILS"}
                    </motion.div>
                </div>

                {/* Expandable content */}
                <AnimatePresence initial={false}>
                    {expanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            style={{ overflow: "hidden" }}
                        >
                            <div style={{ padding: "0 28px 28px" }}>
                                {/* Divider */}
                                <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 20 }} />

                                {/* Highlights */}
                                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
                                    {exp.highlights.map((h, i) => (
                                        <motion.li
                                            key={i}
                                            style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.08 }}
                                        >
                                            <span style={{ color: exp.color, marginTop: 6, fontSize: 7, flexShrink: 0 }}>◆</span>
                                            <p style={{ margin: 0, fontSize: 14, color: "rgba(248,250,252,0.6)", lineHeight: 1.75 }}>{h}</p>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Tags */}
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                                    {exp.tags.map((tag) => (
                                        <span key={tag} style={{
                                            padding: "3px 11px", borderRadius: 6,
                                            background: "rgba(255,255,255,0.04)",
                                            border: "1px solid rgba(255,255,255,0.07)",
                                            fontSize: 11, color: "#64748b",
                                            fontFamily: "'DM Mono', monospace",
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}

// ── Skills Section ────────────────────────────────────────────────────────────
function SkillsSection() {
    const [activeGroup, setActiveGroup] = useState(0);
    const ref = useRef();
    const inView = useInView(ref, { once: true });

    return (
        <div ref={ref}>
            {/* Category tabs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
                {skillGroups.map((g, i) => (
                    <motion.button
                        key={i}
                        onClick={() => setActiveGroup(i)}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "8px 18px", borderRadius: 100,
                            border: `1px solid ${activeGroup === i ? g.color : "rgba(255,255,255,0.08)"}`,
                            background: activeGroup === i ? `${g.color}12` : "transparent",
                            color: activeGroup === i ? g.color : "rgba(255,255,255,0.35)",
                            fontSize: 12, fontWeight: 600, cursor: "pointer",
                            fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em",
                            transition: "all 0.2s",
                        }}
                    >
                        <span style={{ fontSize: 14, display: "flex" }}>{g.icon}</span>
                        {g.category.toUpperCase()}
                    </motion.button>
                ))}
            </div>

            {/* Skill bars */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeGroup}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        background: "#0d0d0d",
                        border: `1px solid rgba(255,255,255,0.06)`,
                        borderRadius: 18,
                        padding: "32px 36px",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                        <span style={{ color: skillGroups[activeGroup].color, fontSize: 20, display: "flex" }}>
                            {skillGroups[activeGroup].icon}
                        </span>
                        <h3 style={{
                            margin: 0, fontSize: 18, fontWeight: 800,
                            color: "#f8fafc", fontFamily: "'Playfair Display', Georgia, serif",
                            letterSpacing: "-0.02em",
                        }}>
                            {skillGroups[activeGroup].category}
                        </h3>
                    </div>
                    {skillGroups[activeGroup].skills.map((s, i) => (
                        <SkillBar key={s.name} skill={s} delay={i * 0.08} />
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// ── Core Concepts Pills ───────────────────────────────────────────────────────
function CoreConcepts() {
    const ref = useRef();
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <div ref={ref} style={{ marginTop: 48 }}>
            <motion.p
                style={{ fontSize: 11, letterSpacing: "0.25em", color: "#a3e635", fontFamily: "'DM Mono', monospace", margin: "0 0 20px" }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
            >
                — CORE CS CONCEPTS
            </motion.p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {coreCS.map((concept, i) => (
                    <motion.div
                        key={i}
                        style={{
                            padding: "7px 16px", borderRadius: 8,
                            background: "rgba(163,230,53,0.05)",
                            border: "1px solid rgba(163,230,53,0.15)",
                            fontSize: 12, color: "rgba(248,250,252,0.6)",
                            fontFamily: "'DM Mono', monospace",
                            cursor: "default",
                        }}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: i * 0.04, duration: 0.4 }}
                        whileHover={{ borderColor: "rgba(163,230,53,0.4)", color: "#a3e635", background: "rgba(163,230,53,0.1)" }}
                    >
                        {concept}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// ── Section Label ─────────────────────────────────────────────────────────────
function SectionLabel({ text }) {
    return (
        <motion.div
            style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 52 }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
        >
            <span style={{ flex: 1, height: 1, background: "rgba(163,230,53,0.12)", display: "block" }} />
            <span style={{ fontSize: 11, letterSpacing: "0.25em", color: "#a3e635", fontFamily: "'DM Mono', monospace", fontWeight: 700 }}>{text}</span>
            <span style={{ flex: 1, height: 1, background: "rgba(163,230,53,0.12)", display: "block" }} />
        </motion.div>
    );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function ExperienceAndSkills() {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Mono&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        button { outline: none; }
      `}</style>

            <div style={{
                background: "#080808",
                padding: "100px 0 120px",
                fontFamily: "'DM Sans', sans-serif",
                position: "relative",
                overflow: "hidden",
            }}>
                {/* Background grid */}
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `linear-gradient(rgba(163,230,53,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.025) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px", pointerEvents: "none",
                }} />
                <GrainOverlay />

                {/* Glow */}
                <div style={{ position: "absolute", top: -150, left: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(163,230,53,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -150, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

                    {/* ── Page Header ─────────────────────────────────────────── */}
                    <motion.div
                        style={{ marginBottom: 80, textAlign: "center" }}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.p
                            style={{ fontSize: 11, letterSpacing: "0.3em", color: "#a3e635", fontFamily: "'DM Mono', monospace", margin: "0 0 16px" }}
                        >
                            — WHERE I'VE BEEN &amp; WHAT I KNOW
                        </motion.p>
                        <h1 style={{
                            fontSize: "clamp(48px, 7vw, 84px)", fontWeight: 900,
                            lineHeight: 1, letterSpacing: "-0.04em",
                            color: "#f8fafc", fontFamily: "'Playfair Display', Georgia, serif",
                            margin: "0 0 20px",
                        }}>
                            Experience &amp;{" "}
                            <span style={{ WebkitTextStroke: "2px #a3e635", WebkitTextFillColor: "transparent" }}>Skills</span>
                        </h1>
                        <p style={{ fontSize: 16, color: "rgba(248,250,252,0.35)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
                            Building production-grade systems since day one — from enterprise Java backends to cloud-native deployments.
                        </p>
                    </motion.div>

                    {/* ── Two-column layout ───────────────────────────────────── */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 60,
                        alignItems: "start",
                    }}>
                        {/* LEFT: Experience */}
                        <div>
                            <SectionLabel text="EXPERIENCE" />
                            {experiences.map((exp, i) => (
                                <ExperienceCard
                                    key={exp.id}
                                    exp={exp}
                                    index={i}
                                    isLast={i === experiences.length - 1}
                                />
                            ))}
                        </div>

                        {/* RIGHT: Skills */}
                        <div>
                            <SectionLabel text="TECHNICAL SKILLS" />
                            <SkillsSection />
                            <CoreConcepts />
                        </div>
                    </div>

                    {/* ── Bottom certs strip ──────────────────────────────────── */}
                    <motion.div
                        style={{
                            marginTop: 80,
                            padding: "28px 36px",
                            borderRadius: 18,
                            border: "1px solid rgba(163,230,53,0.15)",
                            background: "rgba(163,230,53,0.03)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: 20,
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div>
                            <p style={{ margin: "0 0 4px", fontSize: 11, letterSpacing: "0.2em", color: "#a3e635", fontFamily: "'DM Mono', monospace" }}>
                                — CERTIFICATIONS
                            </p>
                            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#f8fafc", fontFamily: "'Playfair Display', serif" }}>
                                Infosys Certified · 2025
                            </h3>
                        </div>
                        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                            {["Associate in IT Foundations (Java)", "Data Structures & Algorithms using Java"].map((cert) => (
                                <div key={cert} style={{
                                    padding: "8px 18px", borderRadius: 10,
                                    border: "1px solid rgba(163,230,53,0.2)",
                                    background: "rgba(163,230,53,0.06)",
                                    fontSize: 13, color: "rgba(248,250,252,0.7)",
                                    fontFamily: "'DM Mono', monospace",
                                }}>
                                    🏅 {cert}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </>
    );
}