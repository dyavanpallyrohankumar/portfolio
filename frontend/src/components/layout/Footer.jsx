import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowUp } from "react-icons/fa";
import { SiSpringboot, SiReact, SiMongodb } from "react-icons/si";

const QUICK_LINKS = [
    { label: "About", href: "/#about" },
    // { label: "Skills", href: "experience" },
    { label: "Projects", href: "projects" },
    { label: "Education", href: "education" },
    { label: "Experience", href: "experience" },
    { label: "Contact", href: "contact" },
];

const SOCIALS = [
    { icon: <FaGithub size={18} />, href: "https://github.com/dyavanpallyrohankumar", label: "GitHub" },
    { icon: <FaLinkedin size={18} />, href: "https://linkedin.com/in/dyavanpallyrohankumar", label: "LinkedIn" },
    { icon: <FaEnvelope size={18} />, href: "mailto:dyavanpallyrohan@gmail.com", label: "Email" },
];

const CONTACT_INFO = [
    { icon: <FaEnvelope size={13} />, text: "dyavanpallyrohan@gmail.com", href: "mailto:dyavanpallyrohan@gmail.com" },
    { icon: <FaPhone size={13} />, text: "+91 8919999232", href: "tel:+918919999232" },
    { icon: <FaMapMarkerAlt size={13} />, text: "Hyderabad, Telangana", href: null },
];

const STACK_ICONS = [
    { icon: <SiReact size={14} />, label: "React", color: "#38bdf8" },
    { icon: <SiSpringboot size={14} />, label: "Spring Boot", color: "#4ade80" },
    { icon: <SiMongodb size={14} />, label: "MongoDB", color: "#4ade80" },
];

// Scroll-to-top button
function ScrollTop() {
    const [visible, setVisible] = useState(false);

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => setVisible(window.scrollY > 400), { passive: true });
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    style={{
                        position: "fixed", bottom: 32, right: 32,
                        width: 44, height: 44, borderRadius: 10,
                        background: "rgba(163,230,53,0.1)",
                        border: "1px solid rgba(163,230,53,0.35)",
                        color: "#a3e635", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        zIndex: 999,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    whileHover={{ background: "#a3e635", color: "#080808", scale: 1.08 }}
                    whileTap={{ scale: 0.93 }}
                >
                    <FaArrowUp size={14} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

// Animated availability badge
function AvailabilityBadge() {
    return (
        <motion.div
            style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "8px 18px", borderRadius: 100,
                border: "1px solid rgba(163,230,53,0.25)",
                background: "rgba(163,230,53,0.06)",
                marginBottom: 28,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
        >
            <motion.span
                style={{ width: 7, height: 7, borderRadius: "50%", background: "#a3e635", display: "block" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
            <span style={{ fontSize: 12, color: "#a3e635", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
                OPEN TO OPPORTUNITIES
            </span>
        </motion.div>
    );
}

export default function Footer() {
    const ref = useRef();
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Mono&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
      `}</style>

            <footer
                ref={ref}
                style={{
                    background: "#050505",
                    borderTop: "1px solid rgba(163,230,53,0.1)",
                    fontFamily: "'DM Sans', sans-serif",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Background grid */}
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `linear-gradient(rgba(163,230,53,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.02) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px", pointerEvents: "none",
                }} />

                {/* Top glow */}
                <div style={{
                    position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)",
                    width: 600, height: 160,
                    background: "radial-gradient(ellipse, rgba(163,230,53,0.07) 0%, transparent 70%)",
                    pointerEvents: "none",
                }} />

                {/* ── CTA Banner ───────────────────────────────────────────── */}
                <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 0", position: "relative", zIndex: 1 }}>
                    <motion.div
                        style={{
                            borderRadius: 24,
                            border: "1px solid rgba(163,230,53,0.15)",
                            background: "linear-gradient(135deg, rgba(163,230,53,0.04) 0%, rgba(8,8,8,0) 60%)",
                            padding: "56px 52px",
                            marginBottom: 72,
                            display: "grid",
                            gridTemplateColumns: "1fr auto",
                            gap: 40,
                            alignItems: "center",
                        }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div>
                            <AvailabilityBadge />
                            <h2 style={{
                                fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900,
                                letterSpacing: "-0.04em", lineHeight: 1.05,
                                fontFamily: "'Playfair Display', Georgia, serif",
                                color: "#f8fafc", margin: "0 0 16px",
                            }}>
                                Let's build something
                                <br />
                                <span style={{ WebkitTextStroke: "2px #a3e635", WebkitTextFillColor: "transparent" }}>
                                    extraordinary.
                                </span>
                            </h2>
                            <p style={{ fontSize: 15, color: "rgba(248,250,252,0.4)", lineHeight: 1.7, margin: 0, maxWidth: 480 }}>
                                I'm actively looking for internships and full-time roles in full-stack and backend development.
                                If you have an exciting problem to solve, I'd love to hear about it.
                            </p>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-end" }}>
                            <motion.a
                                href="mailto:dyavanpallyrohan@gmail.com"
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: 10,
                                    padding: "14px 32px", borderRadius: 12,
                                    background: "#a3e635", color: "#080808",
                                    fontSize: 14, fontWeight: 800, textDecoration: "none",
                                    whiteSpace: "nowrap",
                                }}
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(163,230,53,0.3)" }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <FaEnvelope size={14} />
                                Say Hello
                            </motion.a>
                            <motion.a
                                href="https://linkedin.com/in/dyavanpallyrohankumar"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: 10,
                                    padding: "12px 28px", borderRadius: 12,
                                    border: "1px solid rgba(163,230,53,0.3)",
                                    color: "#a3e635", fontSize: 14, fontWeight: 600,
                                    textDecoration: "none", whiteSpace: "nowrap",
                                }}
                                whileHover={{ background: "rgba(163,230,53,0.08)", scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <FaLinkedin size={14} />
                                Connect on LinkedIn
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* ── Footer columns ───────────────────────────────────────── */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr",
                        gap: 48,
                        paddingBottom: 56,
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}>
                        {/* Brand column */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1, duration: 0.7 }}
                        >
                            {/* Logo */}
                            <a href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", marginBottom: 20 }}>
                                <span style={{ color: "#a3e635", fontFamily: "'DM Mono', monospace", fontSize: 18, fontWeight: 700 }}>&lt;</span>
                                <span style={{
                                    fontFamily: "'DM Mono', monospace", fontSize: 15, fontWeight: 700,
                                    background: "linear-gradient(90deg, #f8fafc 30%, #a3e635 100%)",
                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                    letterSpacing: "-0.02em",
                                }}>
                                    RohanKumar.D
                                </span>
                                <span style={{ color: "#a3e635", fontFamily: "'DM Mono', monospace", fontSize: 18, fontWeight: 700 }}>/&gt;</span>
                            </a>

                            <p style={{ fontSize: 14, color: "rgba(248,250,252,0.35)", lineHeight: 1.75, margin: "0 0 28px", maxWidth: 320 }}>
                                Full-Stack Developer & Software Engineer. Building scalable systems with Java, Spring Boot, React, and cloud-native tools.
                            </p>

                            {/* Contact info */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                                {CONTACT_INFO.map((c, i) => (
                                    c.href ? (
                                        <a key={i} href={c.href} style={{
                                            display: "flex", alignItems: "center", gap: 10,
                                            fontSize: 13, color: "rgba(248,250,252,0.35)",
                                            textDecoration: "none", transition: "color 0.2s",
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.color = "#a3e635"}
                                            onMouseLeave={e => e.currentTarget.style.color = "rgba(248,250,252,0.35)"}
                                        >
                                            <span style={{ color: "#a3e635" }}>{c.icon}</span>
                                            {c.text}
                                        </a>
                                    ) : (
                                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "rgba(248,250,252,0.35)" }}>
                                            <span style={{ color: "#a3e635" }}>{c.icon}</span>
                                            {c.text}
                                        </div>
                                    )
                                ))}
                            </div>

                            {/* Socials */}
                            <div style={{ display: "flex", gap: 12 }}>
                                {SOCIALS.map((s) => (
                                    <motion.a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={s.label}
                                        style={{
                                            width: 38, height: 38, borderRadius: 10,
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            background: "rgba(255,255,255,0.03)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: "rgba(248,250,252,0.4)", textDecoration: "none",
                                        }}
                                        whileHover={{ borderColor: "rgba(163,230,53,0.4)", color: "#a3e635", background: "rgba(163,230,53,0.07)", scale: 1.1 }}
                                        whileTap={{ scale: 0.92 }}
                                    >
                                        {s.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2, duration: 0.7 }}
                        >
                            <h4 style={{
                                fontSize: 11, letterSpacing: "0.2em", color: "#a3e635",
                                fontFamily: "'DM Mono', monospace", fontWeight: 700,
                                margin: "0 0 22px",
                            }}>
                                NAVIGATION
                            </h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {QUICK_LINKS.map((link) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        style={{
                                            fontSize: 14, color: "rgba(248,250,252,0.35)",
                                            textDecoration: "none", display: "flex", alignItems: "center", gap: 8,
                                        }}
                                        whileHover={{ color: "#f8fafc", x: 6 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <span style={{ color: "rgba(163,230,53,0.4)", fontSize: 10 }}>◆</span>
                                        {link.label}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Stack */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3, duration: 0.7 }}
                        >
                            <h4 style={{
                                fontSize: 11, letterSpacing: "0.2em", color: "#a3e635",
                                fontFamily: "'DM Mono', monospace", fontWeight: 700,
                                margin: "0 0 22px",
                            }}>
                                TECH STACK
                            </h4>

                            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                                {[
                                    { label: "Java · Spring Boot", color: "#f97316" },
                                    { label: "React.js · Node.js", color: "#38bdf8" },
                                    { label: "PostgreSQL · MongoDB", color: "#4ade80" },
                                    { label: "Docker · AWS · Jenkins", color: "#818cf8" },
                                    { label: "REST APIs · Microservices", color: "#a3e635" },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: item.color, flexShrink: 0, display: "block" }} />
                                        <span style={{ fontSize: 13, color: "rgba(248,250,252,0.35)", fontFamily: "'DM Mono', monospace" }}>
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Currently at */}
                            <div style={{
                                padding: "12px 16px", borderRadius: 10,
                                border: "1px solid rgba(163,230,53,0.15)",
                                background: "rgba(163,230,53,0.04)",
                            }}>
                                <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#a3e635", fontFamily: "'DM Mono', monospace", marginBottom: 6 }}>
                                    CURRENTLY AT
                                </div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: "#f8fafc" }}>Infosys</div>
                                <div style={{ fontSize: 11, color: "rgba(248,250,252,0.35)", fontFamily: "'DM Mono', monospace" }}>
                                    Software Developer Intern
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Bottom bar ───────────────────────────────────────────── */}
                    <motion.div
                        style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            padding: "24px 0", flexWrap: "wrap", gap: 16,
                        }}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5 }}
                    >
                        <p style={{ margin: 0, fontSize: 12, color: "rgba(248,250,252,0.2)", fontFamily: "'DM Mono', monospace" }}>
                            © 2025 Dyavanpally Rohankumar. Crafted with precision &amp; ☕
                        </p>

                        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(248,250,252,0.2)", fontFamily: "'DM Mono', monospace" }}>
                            Built with React
                            <span style={{ color: "#38bdf8", display: "flex" }}><SiReact size={13} /></span>
                            ·
                            Powered by Spring Boot
                            <span style={{ color: "#4ade80", display: "flex" }}><SiSpringboot size={13} /></span>
                        </div>
                    </motion.div>
                </div>
            </footer>

            <ScrollTop />
        </>
    );
}