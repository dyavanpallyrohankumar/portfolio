import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { certifications, competitiveSites, degrees } from "../../data/staticData";

// const degrees = degrees

// const certifications = certifications

// const competitiveSites = competitiveSites
// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ target, suffix = "", decimals = 0 }) {
    const [count, setCount] = useState(0);
    const ref = useRef();
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        const dur = 1400;
        const start = performance.now();
        const run = (now) => {
            const t = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            const val = ease * target;
            setCount(decimals > 0 ? parseFloat(val.toFixed(decimals)) : Math.floor(val));
            if (t < 1) requestAnimationFrame(run);
        };
        requestAnimationFrame(run);
    }, [inView, target, decimals]);

    return <span ref={ref}>{count}{suffix}</span>;
}

// ── Noise grain overlay ───────────────────────────────────────────────────────
const Grain = () => (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03, pointerEvents: "none", zIndex: 0 }}>
        <filter id="edu-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#edu-noise)" />
    </svg>
);

// ── Section divider ───────────────────────────────────────────────────────────
function SectionLabel({ text }) {
    return (
        <motion.div
            style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <span style={{ flex: 1, height: 1, background: "rgba(163,230,53,0.15)", display: "block" }} />
            <span style={{ fontSize: 11, letterSpacing: "0.28em", color: "#a3e635", fontFamily: "'DM Mono', monospace", fontWeight: 700, whiteSpace: "nowrap" }}>
                {text}
            </span>
            <span style={{ flex: 1, height: 1, background: "rgba(163,230,53,0.15)", display: "block" }} />
        </motion.div>
    );
}

// ── Degree card ───────────────────────────────────────────────────────────────
function DegreeCard({ degree, index }) {
    const ref = useRef();
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [expanded, setExpanded] = useState(true);

    return (
        <motion.div
            ref={ref}
            style={{
                position: "relative",
                display: "flex",
                borderRadius: 20,
                background: "#0d0d0d",
                border: "1px solid rgba(163,230,53,0.12)",
                overflow: "hidden",
            }}
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ borderColor: "rgba(163,230,53,0.28)" }}
        >
            {/* Left accent bar — animated height */}
            <motion.div
                style={{
                    width: 4,
                    flexShrink: 0,
                    background: "linear-gradient(to bottom, #a3e635, #38bdf8)",
                    transformOrigin: "top"
                }}
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
            />

            <div style={{ padding: "32px 36px", flex: 1 }}>
                {/* Header row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14, marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                        {/* Institution logo placeholder */}
                        <div style={{
                            width: 52, height: 52, borderRadius: 12, flexShrink: 0,
                            background: "rgba(163,230,53,0.08)",
                            border: "1px solid rgba(163,230,53,0.2)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 14, fontWeight: 800, color: "#a3e635",
                            fontFamily: "'DM Mono', monospace",
                        }}>
                            {degree.logo_path ? (
                                <img
                                    src={new URL(
                                        `../../assets/images/${degree.logo_path}`,
                                        import.meta.url
                                    ).href}
                                    alt={degree.alt_name}
                                    style={{
                                        width: 42,
                                        height: 42,
                                        objectFit: "contain",
                                    }}
                                />
                            ) : (
                                degree.initials || "🎓"
                            )}                        </div>
                        <div>
                            <h2 style={{
                                fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 800,
                                color: "#f8fafc", letterSpacing: "-0.025em",
                                fontFamily: "'Playfair Display', Georgia, serif",
                                margin: "0 0 5px",
                            }}>
                                {degree.title}
                            </h2>
                            <h3 style={{ fontSize: 14, fontWeight: 500, color: "#64748b", margin: 0, fontFamily: "'DM Mono', monospace" }}>
                                {degree.subtitle}
                            </h3>
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                        <motion.div
                            style={{
                                padding: "6px 16px", borderRadius: 100,
                                background: "rgba(163,230,53,0.08)",
                                border: "1px solid rgba(163,230,53,0.25)",
                                fontSize: 12, color: "#a3e635",
                                fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap",
                            }}
                            whileHover={{ scale: 1.04 }}
                        >
                            🗓 {degree.duration}
                        </motion.div>
                        {/* Expand toggle */}
                        <motion.button
                            onClick={() => setExpanded(!expanded)}
                            style={{
                                display: "flex", alignItems: "center", gap: 5,
                                background: "none", border: "none", cursor: "pointer",
                                fontSize: 11, color: "rgba(248,250,252,0.25)",
                                fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em",
                            }}
                            whileHover={{ color: "#a3e635" }}
                        >
                            <motion.span animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>▶</motion.span>
                            {expanded ? "COLLAPSE" : "EXPAND"}
                        </motion.button>
                    </div>
                </div>

                {/* Divider */}
                <motion.div
                    style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 20, transformOrigin: "left" }}
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                />

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
                            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
                                {degree.descriptions.map((desc, j) => (
                                    <motion.li
                                        key={j}
                                        style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: j * 0.07 }}
                                    >
                                        <span style={{ color: "#a3e635", marginTop: 7, fontSize: 6, flexShrink: 0 }}>◆</span>
                                        <p style={{ margin: 0, fontSize: 15, color: "rgba(248,250,252,0.55)", lineHeight: 1.75 }}>{desc}</p>
                                    </motion.li>
                                ))}
                            </ul>

                            {degree.website_link && (
                                <motion.a
                                    href={degree.website_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "inline-flex", alignItems: "center", gap: 8,
                                        padding: "10px 22px", borderRadius: 9,
                                        border: "1px solid rgba(163,230,53,0.35)",
                                        background: "transparent", color: "#a3e635",
                                        fontSize: 13, fontWeight: 600, textDecoration: "none",
                                    }}
                                    whileHover={{ background: "#a3e635", color: "#080808", scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    Visit Website →
                                </motion.a>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

// ── Cert card ─────────────────────────────────────────────────────────────────
function CertCard({ cert, index }) {
    const [hovered, setHovered] = useState(false);
    const ref = useRef();
    const inView = useInView(ref, { once: true, margin: "-40px" });

    return (
        <motion.a
            ref={ref}
            href={cert.certificate_link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", display: "block" }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, scale: 1.02 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
            <div style={{
                position: "relative",
                borderRadius: 18,
                background: "#0d0d0d",
                border: `1px solid ${hovered ? cert.color_code + "50" : "rgba(255,255,255,0.06)"}`,
                overflow: "hidden",
                transition: "border-color 0.3s",
            }}>
                {/* Glow */}
                <motion.div
                    style={{
                        position: "absolute", inset: 0,
                        background: `radial-gradient(circle at 50% 30%, ${cert.color_code}18 0%, transparent 70%)`,
                        pointerEvents: "none", zIndex: 0,
                    }}
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Color header */}
                <div style={{
                    height: 110, position: "relative", zIndex: 1,
                    background: `linear-gradient(135deg, ${cert.color_code}22, ${cert.color_code}08)`,
                    borderBottom: `1px solid ${cert.color_code}20`,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: 4,
                }}>
                    {/* Corner accent */}
                    <div style={{
                        position: "absolute", top: 0, right: 0,
                        width: 40, height: 40,
                        borderLeft: `1px solid ${cert.color_code}30`,
                        borderBottom: `1px solid ${cert.color_code}30`,
                        borderBottomLeftRadius: 12,
                    }} />

                    <motion.div
                        style={{ fontSize: 36, lineHeight: 1 }}
                        animate={{ scale: hovered ? 1.2 : 1, rotate: hovered ? 8 : 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                        {cert.icon}
                    </motion.div>

                    <motion.div
                        style={{
                            fontSize: 11, fontWeight: 700, color: "#080808",
                            background: cert.color_code,
                            padding: "3px 12px", borderRadius: 100,
                            fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em",
                        }}
                        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
                        transition={{ duration: 0.2 }}
                    >
                        VIEW CERT →
                    </motion.div>
                </div>

                {/* Body */}
                <div style={{ padding: "18px 20px 22px", position: "relative", zIndex: 1 }}>
                    <h3 style={{
                        fontSize: 15, fontWeight: 700, color: "#f8fafc",
                        margin: "0 0 6px", letterSpacing: "-0.01em",
                        lineHeight: 1.4,
                    }}>
                        {cert.title}
                    </h3>
                    <p style={{ fontSize: 12, color: "#475569", margin: 0, fontFamily: "'DM Mono', monospace" }}>
                        {cert.subtitle}
                    </p>
                </div>

                {/* Bottom slide bar */}
                <motion.div
                    style={{
                        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                        background: cert.color_code,
                        transformOrigin: "left",
                    }}
                    animate={{ scaleX: hovered ? 1 : 0 }}
                    transition={{ duration: 0.35 }}
                />
            </div>
        </motion.a>
    );
}

// ── Competitive site chip ─────────────────────────────────────────────────────
function SiteChip({ site, index }) {
    const ref = useRef();
    const inView = useInView(ref, { once: true });

    return (
        <motion.a
            ref={ref}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "9px 20px", borderRadius: 100,
                border: `1px solid ${site.color}30`,
                background: `${site.color}08`,
                color: "rgba(248,250,252,0.7)",
                fontSize: 13, fontWeight: 500,
                textDecoration: "none",
                fontFamily: "'DM Mono', monospace",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            whileHover={{ scale: 1.08, y: -4, borderColor: `${site.color}70`, color: site.color, background: `${site.color}14` }}
            whileTap={{ scale: 0.95 }}
        >
            <span style={{ fontSize: 16 }}>{site.icon}</span>
            {site.name}
        </motion.a>
    );
}

// ── Main Education Section ────────────────────────────────────────────────────
export default function Education() {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        button { outline: none; }
      `}</style>

            <section
                id="education"
                style={{
                    background: "#080808",
                    padding: "100px 0 120px",
                    position: "relative",
                    overflow: "hidden",
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#f8fafc",
                }}
            >
                {/* Grid background */}
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `linear-gradient(rgba(163,230,53,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.025) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px", pointerEvents: "none",
                }} />

                <Grain />

                {/* Atmospheric glows */}
                <div style={{ position: "absolute", top: -120, right: -80, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(163,230,53,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -100, left: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

                    {/* ── HERO HEADER ──────────────────────────────────────────── */}
                    <motion.div
                        style={{ textAlign: "center", marginBottom: 88 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.p
                            style={{ fontSize: 11, letterSpacing: "0.3em", color: "#a3e635", fontFamily: "'DM Mono', monospace", margin: "0 0 18px" }}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            — MY LEARNING JOURNEY
                        </motion.p>

                        <motion.h1
                            style={{
                                fontSize: "clamp(52px, 8vw, 92px)",
                                fontWeight: 900, lineHeight: 1,
                                letterSpacing: "-0.04em",
                                fontFamily: "'Playfair Display', Georgia, serif",
                                color: "#f8fafc", margin: "0 0 20px",
                            }}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        >
                            Education
                            <span style={{ WebkitTextStroke: "2px #a3e635", WebkitTextFillColor: "transparent" }}> &</span>
                            <br />
                            <span style={{ color: "#a3e635" }}>Growth</span>
                        </motion.h1>

                        <motion.p
                            style={{ fontSize: 16, color: "rgba(248,250,252,0.35)", margin: "0 auto 44px", lineHeight: 1.75, maxWidth: 520 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55 }}
                        >
                            Qualifications, certifications &amp; competitive programming platforms
                        </motion.p>

                        {/* Stats row */}
                        <motion.div
                            style={{ display: "flex", justifyContent: "center", gap: 48, marginBottom: 44, flexWrap: "wrap" }}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            {[
                                { label: "Certifications", value: 4, suffix: "+" },
                                { label: "GPA", value: 8.5, suffix: "/10", decimals: 1 },
                                { label: "Projects", value: 5, suffix: "+" },
                                { label: "Users Served", value: 5000, suffix: "+" },
                            ].map((s, i) => (
                                <motion.div
                                    key={i}
                                    style={{ textAlign: "center" }}
                                    whileHover={{ y: -4 }}
                                >
                                    <div style={{
                                        fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 900, lineHeight: 1,
                                        fontFamily: "'Playfair Display', serif",
                                        background: "linear-gradient(135deg, #f8fafc, #a3e635)",
                                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                    }}>
                                        <Counter target={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                                    </div>
                                    <div style={{ fontSize: 11, color: "#475569", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginTop: 5 }}>
                                        {s.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Competitive sites */}
                        <motion.div
                            style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.85 }}
                        >
                            {competitiveSites.map((site, i) => (
                                <SiteChip key={i} site={site} index={i} />
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ── DEGREES ──────────────────────────────────────────────── */}
                    <section style={{ marginBottom: 72 }}>
                        <SectionLabel text="ACADEMIC DEGREES" />
                        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                            {degrees.map((degree, i) => (
                                <DegreeCard key={i} degree={degree} index={i} />
                            ))}
                        </div>
                    </section>

                    {/* ── CERTIFICATIONS ───────────────────────────────────────── */}
                    <section style={{ marginBottom: 72 }}>
                        <SectionLabel text="CERTIFICATIONS" />
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                            gap: 20,
                        }}>
                            {certifications.map((cert, i) => (
                                <CertCard key={i} cert={cert} index={i} />
                            ))}
                        </div>
                    </section>

                    {/* ── BOTTOM CTA STRIP ─────────────────────────────────────── */}
                    <motion.div
                        style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            flexWrap: "wrap", gap: 24,
                            padding: "28px 36px", borderRadius: 18,
                            border: "1px solid rgba(163,230,53,0.15)",
                            background: "linear-gradient(135deg, rgba(163,230,53,0.04) 0%, rgba(8,8,8,0) 100%)",
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div>
                            <p style={{ margin: "0 0 4px", fontSize: 11, letterSpacing: "0.2em", color: "#a3e635", fontFamily: "'DM Mono', monospace" }}>
                                — WANT TO SEE MORE?
                            </p>
                            <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#f8fafc", fontFamily: "'Playfair Display', serif", letterSpacing: "-0.02em" }}>
                                Check out my full project portfolio
                            </h3>
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                            <motion.a
                                href="/projects"
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: 8,
                                    padding: "12px 26px", borderRadius: 10,
                                    background: "#a3e635", color: "#080808",
                                    fontSize: 14, fontWeight: 800, textDecoration: "none",
                                }}
                                whileHover={{ scale: 1.05, boxShadow: "0 0 28px rgba(163,230,53,0.25)" }}
                                whileTap={{ scale: 0.96 }}
                            >
                                View Projects →
                            </motion.a>
                            <motion.a
                                href="/contact"
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: 8,
                                    padding: "11px 22px", borderRadius: 10,
                                    border: "1px solid rgba(163,230,53,0.3)",
                                    color: "#a3e635", fontSize: 14, fontWeight: 600, textDecoration: "none",
                                }}
                                whileHover={{ background: "rgba(163,230,53,0.08)" }}
                                whileTap={{ scale: 0.96 }}
                            >
                                Contact Me
                            </motion.a>
                        </div>
                    </motion.div>

                </div>
            </section>
        </>
    );
}