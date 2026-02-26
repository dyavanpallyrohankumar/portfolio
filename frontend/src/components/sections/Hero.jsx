import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
    FaGithub, FaLinkedin, FaEnvelope, FaDownload,
    FaReact, FaNodeJs, FaDocker, FaAws, FaJava,
} from "react-icons/fa";
import {
    SiSpringboot, SiMongodb, SiPostgresql,
    SiTypescript, SiJenkins, SiTailwindcss,
} from "react-icons/si";

// ── Typewriter hook ───────────────────────────────────────────────────────────
function useTypewriter(words, speed = 80, pause = 2000) {
    const [display, setDisplay] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = words[wordIndex % words.length];
        let timeout;

        if (!deleting && display === current) {
            timeout = setTimeout(() => setDeleting(true), pause);
        } else if (deleting && display === "") {
            setDeleting(false);
            setWordIndex((i) => (i + 1) % words.length);
        } else {
            timeout = setTimeout(() => {
                setDisplay(deleting ? current.slice(0, display.length - 1) : current.slice(0, display.length + 1));
            }, deleting ? speed / 2 : speed);
        }
        return () => clearTimeout(timeout);
    }, [display, deleting, wordIndex, words, speed, pause]);

    return display;
}

// ── Mouse-parallax orbs ───────────────────────────────────────────────────────
function ParallaxOrbs() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });

    useEffect(() => {
        const move = (e) => {
            mouseX.set((e.clientX / window.innerWidth - 0.5) * 60);
            mouseY.set((e.clientY / window.innerHeight - 0.5) * 60);
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
        <>
            <motion.div style={{
                position: "absolute", top: "10%", right: "8%",
                width: 380, height: 380, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(163,230,53,0.07) 0%, transparent 70%)",
                pointerEvents: "none",
                x: smoothX, y: smoothY,
            }} />
            <motion.div style={{
                position: "absolute", bottom: "15%", left: "5%",
                width: 280, height: 280, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)",
                pointerEvents: "none",
                x: useSpring(useMotionValue(0), { stiffness: 30, damping: 30 }),
            }} />
        </>
    );
}

// ── Floating tech pill ────────────────────────────────────────────────────────
function FloatingPill({ icon, label, color, style, delay }) {
    return (
        <motion.div
            style={{
                position: "absolute",
                display: "flex", alignItems: "center", gap: 7,
                padding: "8px 14px", borderRadius: 100,
                background: "rgba(13,13,13,0.9)",
                border: `1px solid ${color}30`,
                backdropFilter: "blur(12px)",
                fontSize: 12, color,
                fontFamily: "'DM Mono', monospace",
                pointerEvents: "none",
                ...style,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
                opacity: 1, scale: 1,
                y: [0, -10, 0],
            }}
            transition={{
                opacity: { delay, duration: 0.5 },
                scale: { delay, duration: 0.5 },
                y: { delay, duration: 3 + delay, repeat: Infinity, ease: "easeInOut" },
            }}
        >
            <span style={{ fontSize: 15 }}>{icon}</span>
            <span style={{ color: "rgba(248,250,252,0.6)" }}>{label}</span>
        </motion.div>
    );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ value, label, delay }) {
    const ref = useRef();
    const [count, setCount] = useState(0);
    const inView = useRef(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !inView.current) {
                inView.current = true;
                const target = parseInt(value);
                const dur = 1400;
                const start = performance.now();
                const run = (now) => {
                    const t = Math.min((now - start) / dur, 1);
                    const ease = 1 - Math.pow(1 - t, 3);
                    setCount(Math.floor(ease * target));
                    if (t < 1) requestAnimationFrame(run);
                };
                requestAnimationFrame(run);
            }
        }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [value]);

    return (
        <motion.div
            ref={ref}
            style={{
                textAlign: "center", padding: "20px 28px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(13,13,13,0.8)",
                backdropFilter: "blur(12px)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ borderColor: "rgba(163,230,53,0.3)", background: "rgba(163,230,53,0.04)" }}
        >
            <div style={{
                fontSize: 38, fontWeight: 900, lineHeight: 1,
                fontFamily: "'Playfair Display', Georgia, serif",
                background: "linear-gradient(135deg, #f8fafc, #a3e635)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
                {count}{value.includes("+") ? "+" : ""}
            </div>
            <div style={{ fontSize: 11, color: "#475569", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginTop: 6 }}>
                {label}
            </div>
        </motion.div>
    );
}

// ── Tech orbit ring ───────────────────────────────────────────────────────────
function TechOrbit() {
    const techs = [
        { icon: <FaJava />, color: "#f97316", label: "Java" },
        { icon: <SiSpringboot />, color: "#4ade80", label: "Spring" },
        { icon: <FaReact />, color: "#38bdf8", label: "React" },
        { icon: <FaNodeJs />, color: "#4ade80", label: "Node" },
        { icon: <SiMongodb />, color: "#4ade80", label: "Mongo" },
        { icon: <SiPostgresql />, color: "#818cf8", label: "PG" },
        { icon: <FaDocker />, color: "#38bdf8", label: "Docker" },
        { icon: <FaAws />, color: "#fb923c", label: "AWS" },
    ];

    return (
        <div style={{ position: "relative", width: 260, height: 260, margin: "0 auto" }}>
            {/* Center */}
            <motion.div
                style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 72, height: 72, borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(163,230,53,0.15), rgba(163,230,53,0.05))",
                    border: "1px solid rgba(163,230,53,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24, color: "#a3e635",
                    fontFamily: "'DM Mono', monospace", fontWeight: 800,
                    boxShadow: "0 0 40px rgba(163,230,53,0.15)",
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                &lt;/&gt;
            </motion.div>

            {/* Orbit rings */}
            {[90, 115].map((r, ri) => (
                <div key={ri} style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: r * 2, height: r * 2,
                    marginLeft: -r, marginTop: -r,
                    borderRadius: "50%",
                    border: `1px solid rgba(163,230,53,${ri === 0 ? 0.1 : 0.06})`,
                }} />
            ))}

            {/* Orbiting icons */}
            {techs.map((tech, i) => {
                const angle = (i / techs.length) * 360;
                const r = 110;
                return (
                    <motion.div
                        key={i}
                        style={{
                            position: "absolute", top: "50%", left: "50%",
                            width: 34, height: 34,
                            marginLeft: -17, marginTop: -17,
                        }}
                        animate={{ rotate: [angle, angle + 360] }}
                        transition={{ duration: 16, repeat: Infinity, ease: "linear", delay: 0 }}
                    >
                        <motion.div
                            style={{
                                position: "absolute",
                                top: `calc(50% - 17px + ${-r}px)`,
                                left: "50%", marginLeft: -17,
                                width: 34, height: 34,
                                borderRadius: 8,
                                background: "rgba(13,13,13,0.95)",
                                border: `1px solid ${tech.color}35`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: tech.color, fontSize: 16,
                            }}
                            animate={{ rotate: [-(angle), -(angle + 360)] }}
                            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                            title={tech.label}
                        >
                            {tech.icon}
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
}

// ── Social Link ───────────────────────────────────────────────────────────────
function SocialBtn({ icon, href, label }) {
    return (
        <motion.a
            href={href} target="_blank" rel="noopener noreferrer"
            title={label}
            style={{
                width: 42, height: 42, borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(248,250,252,0.4)", textDecoration: "none", fontSize: 17,
            }}
            whileHover={{ borderColor: "rgba(163,230,53,0.4)", color: "#a3e635", background: "rgba(163,230,53,0.07)", scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
        >
            {icon}
        </motion.a>
    );
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
    const role = useTypewriter([
        "Full-Stack Developer",
        "Spring Boot Engineer",
        "React.js Developer",
        "Cloud & DevOps Enthusiast",
        "API Architect",
    ], 70, 2200);

    const [showCursor, setShowCursor] = useState(true);
    useEffect(() => {
        const t = setInterval(() => setShowCursor((v) => !v), 530);
        return () => clearInterval(t);
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>

            <div style={{ background: "#080808", fontFamily: "'DM Sans', sans-serif", color: "#f8fafc" }}>

                {/* ══════════════════════════════════════════════════════════
            SECTION 1 — HERO
        ══════════════════════════════════════════════════════════ */}
                <section id="home" style={{
                    minHeight: "100vh",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative", overflow: "hidden",
                    padding: "100px 24px 60px",
                }}>
                    {/* Background grid */}
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: `linear-gradient(rgba(163,230,53,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.025) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px", pointerEvents: "none",
                    }} />

                    <ParallaxOrbs />

                    {/* Floating tech pills */}
                    <FloatingPill icon={<SiSpringboot />} label="Spring Boot" color="#4ade80" style={{ top: "18%", left: "4%" }} delay={1.2} />
                    <FloatingPill icon={<FaReact />} label="React.js" color="#38bdf8" style={{ top: "28%", right: "3%" }} delay={1.5} />
                    <FloatingPill icon={<FaDocker />} label="Docker" color="#38bdf8" style={{ bottom: "25%", left: "3%" }} delay={1.8} />
                    <FloatingPill icon={<SiPostgresql />} label="PostgreSQL" color="#818cf8" style={{ bottom: "30%", right: "4%" }} delay={2.0} />

                    <div style={{ maxWidth: 900, width: "100%", position: "relative", zIndex: 1 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 60, alignItems: "center" }}>

                            {/* LEFT: Text */}
                            <div>
                                {/* Terminal prompt */}
                                <motion.p
                                    style={{
                                        fontSize: 12, letterSpacing: "0.2em", color: "#a3e635",
                                        fontFamily: "'DM Mono', monospace", margin: "0 0 20px",
                                    }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    $ deploy-portfolio --mode=production
                                </motion.p>

                                {/* Terminal line */}
                                <motion.div
                                    style={{
                                        fontFamily: "'DM Mono', monospace",
                                        fontSize: "clamp(14px, 2vw, 18px)",
                                        color: "rgba(248,250,252,0.4)", margin: "0 0 8px",
                                        letterSpacing: "0.03em",
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <span style={{ color: "#a3e635" }}>rohankumar@dev</span>
                                    <span style={{ color: "#64748b" }}>:</span>
                                    <span style={{ color: "#38bdf8" }}>~</span>
                                    <span style={{ color: "#64748b" }}>$ </span>
                                    <span style={{ color: "#f8fafc" }}>whoami</span>
                                </motion.div>

                                {/* Main name */}
                                <motion.h1
                                    style={{
                                        fontSize: "clamp(48px, 7vw, 86px)",
                                        fontWeight: 900, lineHeight: 0.95,
                                        letterSpacing: "-0.04em",
                                        fontFamily: "'Playfair Display', Georgia, serif",
                                        margin: "0 0 20px",
                                    }}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span style={{
                                        background: "linear-gradient(135deg, #f8fafc 0%, #f8fafc 50%, #a3e635 100%)",
                                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                        display: "block",
                                    }}>
                                        Rohan
                                    </span>
                                    <span style={{
                                        WebkitTextStroke: "2px rgba(163,230,53,0.6)",
                                        WebkitTextFillColor: "transparent",
                                        display: "block",
                                    }}>
                                        Kumar.D
                                    </span>
                                </motion.h1>

                                {/* Typewriter role */}
                                <motion.div
                                    style={{
                                        fontSize: "clamp(16px, 2.5vw, 22px)",
                                        fontFamily: "'DM Mono', monospace",
                                        color: "rgba(248,250,252,0.5)",
                                        margin: "0 0 20px",
                                        minHeight: 34,
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <span style={{ color: "rgba(163,230,53,0.6)" }}>&gt; </span>
                                    <span style={{ color: "#a3e635" }}>{role}</span>
                                    <span style={{ opacity: showCursor ? 1 : 0, color: "#a3e635" }}>▋</span>
                                </motion.div>

                                {/* Bio */}
                                <motion.p
                                    style={{
                                        fontSize: 16, color: "rgba(248,250,252,0.4)",
                                        lineHeight: 1.8, margin: "0 0 32px",
                                        maxWidth: 520,
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                >
                                    CS graduate & Infosys SDE Intern. Building production-grade full-stack systems
                                    with Java, Spring Boot, React, and cloud-native infrastructure.
                                    I ship clean code, fast.
                                </motion.p>

                                {/* Skill chips */}
                                <motion.div
                                    style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.1 }}
                                >
                                    {[
                                        { label: "Spring Boot", color: "#4ade80" },
                                        { label: "React.js", color: "#38bdf8" },
                                        { label: "Microservices", color: "#a3e635" },
                                        { label: "CI/CD", color: "#818cf8" },
                                        { label: "REST APIs", color: "#fb923c" },
                                    ].map((c) => (
                                        <motion.span
                                            key={c.label}
                                            style={{
                                                padding: "5px 13px", borderRadius: 100,
                                                border: `1px solid ${c.color}30`,
                                                background: `${c.color}0a`,
                                                fontSize: 12, color: c.color,
                                                fontFamily: "'DM Mono', monospace",
                                            }}
                                            whileHover={{ borderColor: `${c.color}70`, background: `${c.color}18`, scale: 1.05 }}
                                        >
                                            {c.label}
                                        </motion.span>
                                    ))}
                                </motion.div>

                                {/* CTAs */}
                                <motion.div
                                    style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", marginBottom: 36 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2 }}
                                >
                                    <motion.a
                                        href="#projects"
                                        style={{
                                            display: "inline-flex", alignItems: "center", gap: 8,
                                            padding: "13px 28px", borderRadius: 10,
                                            background: "#a3e635", color: "#080808",
                                            fontSize: 14, fontWeight: 800, textDecoration: "none",
                                        }}
                                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(163,230,53,0.3)" }}
                                        whileTap={{ scale: 0.96 }}
                                    >
                                        Explore My Work ↓
                                    </motion.a>
                                    <motion.a
                                        href="mailto:dyavanpallyrohan@gmail.com"
                                        style={{
                                            display: "inline-flex", alignItems: "center", gap: 8,
                                            padding: "12px 24px", borderRadius: 10,
                                            border: "1px solid rgba(163,230,53,0.3)",
                                            background: "transparent", color: "#a3e635",
                                            fontSize: 14, fontWeight: 600, textDecoration: "none",
                                        }}
                                        whileHover={{ background: "rgba(163,230,53,0.08)", scale: 1.03 }}
                                        whileTap={{ scale: 0.96 }}
                                    >
                                        Get In Touch
                                    </motion.a>
                                    <motion.a
                                        href="/resume.pdf"
                                        download
                                        style={{
                                            display: "inline-flex", alignItems: "center", gap: 7,
                                            padding: "12px 18px", borderRadius: 10,
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            color: "rgba(248,250,252,0.4)", fontSize: 13,
                                            textDecoration: "none",
                                        }}
                                        whileHover={{ borderColor: "rgba(255,255,255,0.2)", color: "#f8fafc" }}
                                    >
                                        <FaDownload size={12} /> Resume
                                    </motion.a>
                                </motion.div>

                                {/* Socials */}
                                <motion.div
                                    style={{ display: "flex", gap: 10 }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.4 }}
                                >
                                    <SocialBtn icon={<FaGithub />} href="https://github.com/dyavanpallyrohankumar" label="GitHub" />
                                    <SocialBtn icon={<FaLinkedin />} href="https://linkedin.com/in/dyavanpallyrohankumar" label="LinkedIn" />
                                    <SocialBtn icon={<FaEnvelope />} href="mailto:dyavanpallyrohan@gmail.com" label="Email" />
                                </motion.div>
                            </div>

                            {/* RIGHT: Orbit */}
                            <motion.div
                                style={{ flexShrink: 0 }}
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="hide-on-mobile"
                            >
                                <TechOrbit />
                            </motion.div>
                        </div>

                        {/* Stats row */}
                        <motion.div
                            style={{
                                display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14,
                                marginTop: 60,
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.3 }}
                        >
                            {[
                                { value: "5000+", label: "Users Served" },
                                { value: "99.9", label: "% Uptime" },
                                { value: "3+", label: "Projects Live" },
                                { value: "2+", label: "Years Coding" },
                            ].map((s, i) => (
                                <StatCard key={i} value={s.value} label={s.label} delay={1.4 + i * 0.1} />
                            ))}
                        </motion.div>
                    </div>

                    {/* Scroll indicator */}
                    <motion.div
                        style={{
                            position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
                            display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                            color: "rgba(248,250,252,0.2)", fontSize: 11,
                            fontFamily: "'DM Mono', monospace", letterSpacing: "0.15em",
                        }}
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        SCROLL
                        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(163,230,53,0.4), transparent)" }} />
                    </motion.div>
                </section>

                {/* ══════════════════════════════════════════════════════════
            SECTION 2 — ABOUT / QUICK BIO
        ══════════════════════════════════════════════════════════ */}
                <section id="about" style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
                    <div style={{ maxWidth: 1100, margin: "0 auto" }}>

                        <motion.p style={{ fontSize: 11, letterSpacing: "0.3em", color: "#a3e635", fontFamily: "'DM Mono', monospace", margin: "0 0 16px" }}
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                            — ABOUT ME
                        </motion.p>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <h2 style={{
                                    fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 900,
                                    letterSpacing: "-0.04em", lineHeight: 1.05,
                                    fontFamily: "'Playfair Display', Georgia, serif",
                                    color: "#f8fafc", margin: "0 0 24px",
                                }}>
                                    Engineer by degree,
                                    <br />
                                    <span style={{ color: "#a3e635" }}>builder</span> by passion.
                                </h2>
                                <p style={{ fontSize: 16, color: "rgba(248,250,252,0.45)", lineHeight: 1.85, margin: "0 0 24px" }}>
                                    I'm <strong style={{ color: "#f8fafc" }}>Dyavanpally Rohankumar</strong>, a Computer Science graduate from JNTUH College of Engineering
                                    and a Software Developer Intern at <strong style={{ color: "#a3e635" }}>Infosys</strong>.
                                    I specialize in building scalable full-stack systems — from secure JWT-based backends
                                    to cloud-deployed React frontends.
                                </p>
                                <p style={{ fontSize: 16, color: "rgba(248,250,252,0.45)", lineHeight: 1.85, margin: "0 0 32px" }}>
                                    My projects have served <strong style={{ color: "#f8fafc" }}>5000+ users</strong>, run with 99.9% uptime on AWS EC2,
                                    and followed real-world Agile engineering practices. I obsess over clean architecture,
                                    API security, and zero-downtime deployments.
                                </p>
                                <div style={{ display: "flex", gap: 12 }}>
                                    <motion.a href="/projects" style={{
                                        padding: "11px 24px", borderRadius: 10,
                                        background: "#a3e635", color: "#080808",
                                        fontSize: 13, fontWeight: 800, textDecoration: "none",
                                    }}
                                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                                        View Projects →
                                    </motion.a>
                                    <motion.a href="/contact" style={{
                                        padding: "10px 22px", borderRadius: 10,
                                        border: "1px solid rgba(163,230,53,0.3)",
                                        color: "#a3e635", fontSize: 13, fontWeight: 600, textDecoration: "none",
                                    }}
                                        whileHover={{ background: "rgba(163,230,53,0.08)" }} whileTap={{ scale: 0.96 }}>
                                        Contact Me
                                    </motion.a>
                                </div>
                            </motion.div>

                            {/* Right: timeline-style highlights */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                style={{ display: "flex", flexDirection: "column", gap: 16 }}
                            >
                                {[
                                    { emoji: "🎓", title: "B.Tech CSE", sub: "JNTUH College · 2021–2025", color: "#38bdf8" },
                                    { emoji: "💼", title: "Infosys · SDE Intern", sub: "July 2025 – Present · Hyderabad", color: "#a3e635" },
                                    { emoji: "🏭", title: "Ordnance Factory · IT Intern", sub: "May–June 2024 · Built 4 Portals", color: "#818cf8" },
                                    { emoji: "🚀", title: "CampusFlow · 5000+ Users", sub: "Full-Stack · AWS · 99.9% Uptime", color: "#fb923c" },
                                    { emoji: "🔐", title: "MTech Cutoff Hub", sub: "Spring Boot · JWT · PostgreSQL", color: "#4ade80" },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        style={{
                                            display: "flex", alignItems: "flex-start", gap: 16,
                                            padding: "16px 20px", borderRadius: 12,
                                            border: `1px solid ${item.color}20`,
                                            background: `${item.color}06`,
                                        }}
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 + i * 0.1 }}
                                        whileHover={{ borderColor: `${item.color}40`, background: `${item.color}0f` }}
                                    >
                                        <span style={{ fontSize: 22 }}>{item.emoji}</span>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: "#f8fafc", marginBottom: 3 }}>{item.title}</div>
                                            <div style={{ fontSize: 12, color: "rgba(248,250,252,0.35)", fontFamily: "'DM Mono', monospace" }}>{item.sub}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════════════
            SECTION 3 — SCROLLING MARQUEE (What I Do)
        ══════════════════════════════════════════════════════════ */}
                <div style={{
                    borderTop: "1px solid rgba(163,230,53,0.1)",
                    borderBottom: "1px solid rgba(163,230,53,0.1)",
                    padding: "16px 0", overflow: "hidden", background: "rgba(163,230,53,0.02)",
                }}>
                    <motion.div
                        style={{ display: "flex", gap: 48, width: "max-content" }}
                        animate={{ x: [0, "-50%"] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    >
                        {[...Array(2)].map((_, ri) =>
                            ["Full-Stack Development", "REST API Design", "Microservices", "CI/CD Pipelines",
                                "Cloud Deployment", "JWT Auth", "React.js", "Spring Boot",
                                "System Design", "DSA", "Agile / Scrum", "Database Design"].map((item, i) => (
                                    <span key={`${ri}-${i}`} style={{
                                        fontSize: 13, fontFamily: "'DM Mono', monospace",
                                        color: "rgba(248,250,252,0.25)", letterSpacing: "0.12em",
                                        display: "flex", alignItems: "center", gap: 16, whiteSpace: "nowrap",
                                    }}>
                                        <span style={{ color: "rgba(163,230,53,0.4)", fontSize: 8 }}>◆</span>
                                        {item.toUpperCase()}
                                    </span>
                                ))
                        )}
                    </motion.div>
                </div>

                {/* ══════════════════════════════════════════════════════════
            SECTION 4 — WHAT I DO (Services / Focus Areas)
        ══════════════════════════════════════════════════════════ */}
                <section id="services" style={{ padding: "100px 24px" }}>
                    <div style={{ maxWidth: 1100, margin: "0 auto" }}>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
                            <div>
                                <motion.p style={{ fontSize: 11, letterSpacing: "0.3em", color: "#a3e635", fontFamily: "'DM Mono', monospace", margin: "0 0 12px" }}
                                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                                    — WHAT I BUILD
                                </motion.p>
                                <motion.h2 style={{
                                    fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900,
                                    letterSpacing: "-0.04em", lineHeight: 1.05,
                                    fontFamily: "'Playfair Display', Georgia, serif",
                                    color: "#f8fafc", margin: 0,
                                }}
                                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                    My Focus Areas
                                </motion.h2>
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                            {[
                                {
                                    icon: "⚙️", title: "Backend Engineering",
                                    desc: "Scalable Spring Boot microservices, RESTful APIs, JWT auth, RBAC, and transactional service layers built for production.",
                                    tags: ["Spring Boot", "Java", "Hibernate", "REST APIs"],
                                    color: "#4ade80",
                                },
                                {
                                    icon: "⚛️", title: "Frontend Development",
                                    desc: "Component-driven React apps with clean architecture, responsive design, and optimized rendering for 5000+ user platforms.",
                                    tags: ["React.js", "Tailwind", "JavaScript"],
                                    color: "#38bdf8",
                                },
                                {
                                    icon: "☁️", title: "Cloud & DevOps",
                                    desc: "Zero-downtime deployments using Docker, Jenkins CI/CD pipelines, and AWS EC2 with 99.9% uptime guarantees.",
                                    tags: ["Docker", "Jenkins", "AWS EC2", "CI/CD"],
                                    color: "#818cf8",
                                },
                                {
                                    icon: "🔐", title: "Security & Auth",
                                    desc: "JWT-based stateless auth, Spring Security filter chains, bcrypt hashing, OTP email verification, and RBAC systems.",
                                    tags: ["JWT", "Spring Security", "bcrypt", "RBAC"],
                                    color: "#fb923c",
                                },
                                {
                                    icon: "🗄️", title: "Database Design",
                                    desc: "Relational and NoSQL schema design, JPA/Hibernate ORM, query optimization, and efficient data modeling across PostgreSQL and MongoDB.",
                                    tags: ["PostgreSQL", "MongoDB", "MySQL", "JPA"],
                                    color: "#a3e635",
                                },
                                {
                                    icon: "🧩", title: "System Design",
                                    desc: "Architecting scalable campus platforms, analytics engines, and distributed systems using microservices patterns and clean architecture.",
                                    tags: ["Microservices", "OOP", "SOLID", "MVC"],
                                    color: "#f87171",
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    style={{
                                        padding: "28px 28px 24px",
                                        borderRadius: 18,
                                        border: "1px solid rgba(255,255,255,0.06)",
                                        background: "#0d0d0d",
                                        position: "relative", overflow: "hidden",
                                    }}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ delay: i * 0.09, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    whileHover={{ borderColor: `${item.color}35`, y: -6 }}
                                >
                                    <motion.div
                                        style={{
                                            position: "absolute", top: 0, left: 0, right: 0, height: 3,
                                            background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                                            opacity: 0,
                                        }}
                                        whileHover={{ opacity: 1 }}
                                    />

                                    <div style={{ fontSize: 30, marginBottom: 16 }}>{item.icon}</div>
                                    <h3 style={{
                                        fontSize: 18, fontWeight: 800, color: "#f8fafc",
                                        fontFamily: "'Playfair Display', Georgia, serif",
                                        letterSpacing: "-0.02em", margin: "0 0 12px",
                                    }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ fontSize: 14, color: "rgba(248,250,252,0.4)", lineHeight: 1.75, margin: "0 0 20px" }}>
                                        {item.desc}
                                    </p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                                        {item.tags.map((t) => (
                                            <span key={t} style={{
                                                padding: "3px 10px", borderRadius: 6,
                                                background: `${item.color}0a`, border: `1px solid ${item.color}25`,
                                                fontSize: 11, color: item.color,
                                                fontFamily: "'DM Mono', monospace",
                                            }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <style>{`
          @media (max-width: 768px) {
            .hide-on-mobile { display: none !important; }
          }
        `}</style>
            </div>
        </>
    );
}