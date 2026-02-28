import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
    FaDownload, FaExpand, FaCompress, FaExternalLinkAlt,
    FaGithub, FaLinkedin, FaJava, FaReact, FaNodeJs,
    FaDocker, FaAws,
} from "react-icons/fa";
import {
    SiSpringboot, SiPostgresql, SiMongodb,
    SiJenkins, SiTailwindcss,
} from "react-icons/si";
import { useIsMobile } from "./Hero";

// ── Quick-stat row pulled from resume ────────────────────────────────────────
const RESUME_STATS = [
    { label: "Years Experience", value: "2+", color: "#a3e635" },
    { label: "Projects Shipped", value: "5+", color: "#38bdf8" },
    { label: "GitHub Repos", value: "10+", color: "#818cf8" },
    { label: "Certifications", value: "2", color: "#fb923c" },
];

const SKILLS_PREVIEW = [
    { icon: <FaJava />, name: "Java", color: "#f97316" },
    { icon: <SiSpringboot />, name: "Spring Boot", color: "#4ade80" },
    { icon: <FaReact />, name: "React.js", color: "#38bdf8" },
    { icon: <FaNodeJs />, name: "Node.js", color: "#4ade80" },
    { icon: <SiPostgresql />, name: "PostgreSQL", color: "#818cf8" },
    { icon: <SiMongodb />, name: "MongoDB", color: "#4ade80" },
    { icon: <FaDocker />, name: "Docker", color: "#38bdf8" },
    { icon: <FaAws />, name: "AWS", color: "#fb923c" },
    { icon: <SiJenkins />, name: "Jenkins", color: "#f87171" },
    { icon: <SiTailwindcss />, name: "Tailwind", color: "#22d3ee" },
];

// ── PDF Preview panel ─────────────────────────────────────────────────────────
function PDFPreview({ fullscreen, onToggleFullscreen, isMobile }) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    return (
        <div style={{
            position: "relative",
            borderRadius: fullscreen ? 0 : 18,
            overflow: "hidden",
            border: "1px solid rgba(163,230,53,0.15)",
            background: "#0d0d0d",
            height: fullscreen
                ? "100vh"
                : isMobile
                    ? "70vh"
                    : "85vh",
            display: "flex", flexDirection: "column",
        }}>
            {/* PDF toolbar */}
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: isMobile ? "12px 14px" : "14px 20px",
                flexWrap: "wrap",
                rowGap: 8,
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(10px)",
                flexShrink: 0,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {["#f87171", "#facc15", "#4ade80"].map((c) => (
                        <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
                    ))}
                    <span style={{ marginLeft: 8, fontSize: 11, color: "rgba(248,250,252,0.25)", fontFamily: "'DM Mono', monospace" }}>
                        Rohankumar_Resume.pdf
                    </span>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                    <motion.a
                        href="/Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "6px 14px", borderRadius: 7,
                            border: "1px solid rgba(255,255,255,0.08)",
                            background: "rgba(255,255,255,0.03)",
                            color: "rgba(248,250,252,0.45)", fontSize: 12,
                            textDecoration: "none", fontFamily: "'DM Mono', monospace",
                        }}
                        whileHover={{ borderColor: "rgba(163,230,53,0.3)", color: "#a3e635" }}
                    >
                        <FaExternalLinkAlt size={10} /> Open
                    </motion.a>
                    <motion.button
                        onClick={onToggleFullscreen}
                        style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "6px 14px", borderRadius: 7,
                            border: "1px solid rgba(255,255,255,0.08)",
                            background: "rgba(255,255,255,0.03)",
                            color: "rgba(248,250,252,0.45)", fontSize: 12,
                            cursor: "pointer", fontFamily: "'DM Mono', monospace",
                            width: isMobile ? "100%" : "auto",
                            justifyContent: "center",
                        }}
                        whileHover={{ borderColor: "rgba(163,230,53,0.3)", color: "#a3e635" }}
                    >
                        {fullscreen ? <FaCompress size={10} /> : <FaExpand size={10} />}
                        {fullscreen ? "Exit" : "Fullscreen"}
                    </motion.button>
                </div>
            </div>

            {/* iFrame */}
            <div style={{ flex: 1, position: "relative" }}>
                {!loaded && !error && (
                    <div style={{
                        position: "absolute", inset: 0,
                        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                        gap: 16, background: "#0d0d0d",
                    }}>
                        <motion.div
                            style={{
                                width: 48, height: 48, borderRadius: "50%",
                                border: "2px solid rgba(163,230,53,0.15)",
                                borderTop: "2px solid #a3e635",
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        <p style={{ fontSize: 13, color: "rgba(248,250,252,0.25)", fontFamily: "'DM Mono', monospace" }}>
                            Loading resume...
                        </p>
                    </div>
                )}

                {/* {error ? (
                    <div style={{
                        position: "absolute", inset: 0,
                        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                        gap: 20, padding: 32, background: "#0d0d0d",
                    }}>
                        <div style={{ fontSize: 48 }}>📄</div>
                        <p style={{ fontSize: 15, color: "rgba(248,250,252,0.4)", textAlign: "center", lineHeight: 1.7, maxWidth: 320 }}>
                            PDF preview not available in this environment.
                            <br />
                            Click the button below to view or download.
                        </p>
                        <motion.a
                            href="/Resume.pdf"
                            download="Rohankumar_Resume.pdf"
                            style={{
                                display: "flex", alignItems: "center", gap: 8,
                                padding: "12px 28px", borderRadius: 10,
                                background: "#a3e635", color: "#080808",
                                fontSize: 14, fontWeight: 800, textDecoration: "none",
                            }}
                            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                        >
                            <FaDownload size={13} /> Download Resume
                        </motion.a>
                    </div>
                ) : (
                    <iframe
                        src="/Resume.pdf"
                        title="Rohankumar Resume"
                        onLoad={() => setLoaded(true)}
                        onError={() => setError(true)}
                        style={{
                            width: "100%", height: "100%", border: "none",
                            opacity: loaded ? 1 : 0, transition: "opacity 0.4s",
                        }}
                    />
                )} */}

                {error ? (
                    <div style={{
                        position: "absolute", inset: 0,
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                        gap: 20, padding: 32, background: "#0d0d0d",
                    }}>
                        <div style={{ fontSize: 48 }}>📄</div>
                        <p style={{
                            fontSize: 15,
                            color: "rgba(248,250,252,0.4)",
                            textAlign: "center",
                            lineHeight: 1.7,
                            maxWidth: 320
                        }}>
                            PDF preview not available.
                        </p>
                        <motion.a
                            href="/Resume.pdf"
                            download="Rohankumar_Resume.pdf"
                            style={{
                                display: "flex", alignItems: "center", gap: 8,
                                padding: "12px 28px", borderRadius: 10,
                                background: "#a3e635", color: "#080808",
                                fontSize: 14, fontWeight: 800, textDecoration: "none",
                            }}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            <FaDownload size={13} /> Download Resume
                        </motion.a>
                    </div>
                ) : isMobile ? (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 20,
                            padding: 32,
                            background: "#0d0d0d",
                            textAlign: "center",
                        }}
                    >
                        <FaDownload size={40} color="#a3e635" />

                        <p style={{
                            fontSize: 14,
                            color: "rgba(248,250,252,0.4)",
                            fontFamily: "'DM Mono', monospace"
                        }}>
                            Resume preview is optimized for desktop.
                        </p>

                        <motion.a
                            href="/Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                padding: isMobile ? "10px 20px" : "12px 28px",
                                borderRadius: 10,
                                background: "#a3e635",
                                color: "#080808",
                                fontWeight: 800,
                                textDecoration: "none",
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            Open Resume
                        </motion.a>
                    </div>
                ) : (
                    <iframe
                        src="/Resume.pdf"
                        title="Rohankumar Resume"
                        onLoad={() => setLoaded(true)}
                        onError={() => setError(true)}
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                            opacity: loaded ? 1 : 0,
                            transition: "opacity 0.4s",
                        }}
                    />
                )}
            </div>
        </div>
    );
}

// ── Main Resume ───────────────────────────────────────────────────────────────
export default function Resume() {
    const isMobile = useIsMobile();
    const ref = useRef();
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [fullscreen, setFullscreen] = useState(false);
    useEffect(() => {
        if (fullscreen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [fullscreen]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Mono&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
      `}</style>

            {/* Fullscreen overlay */}
            <AnimatePresence>
                {fullscreen && (
                    <motion.div
                        style={{ position: "fixed", inset: 0, zIndex: 9998, background: "#080808" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <PDFPreview fullscreen={false}
                            isMobile={isMobile}
                            onToggleFullscreen={() => setFullscreen(true)} />
                    </motion.div>
                )}
            </AnimatePresence>

            <section
                id="resume"
                ref={ref}
                style={{
                    background: "#080808",
                    padding: isMobile ? "80px 20px 90px" : "100px 24px 120px",
                    position: "relative",
                    overflow: "hidden",
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#f8fafc",
                }}
            >
                {/* Grid bg */}
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `linear-gradient(rgba(163,230,53,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.025) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px", pointerEvents: "none",
                }} />

                <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

                    {/* ── Header ────────────────────────────────────────────── */}
                    <motion.div
                        style={{ marginBottom: 56 }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.p style={{ fontSize: 11, letterSpacing: "0.3em", color: "#a3e635", fontFamily: "'DM Mono', monospace", margin: "0 0 16px" }}>
                            — MY RESUME
                        </motion.p>
                        <div style={{
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",
                            justifyContent: "space-between",
                            alignItems: isMobile ? "flex-start" : "flex-end",
                            gap: isMobile ? 24 : 24, flexWrap: "wrap",
                        }}>
                            <h2 style={{
                                fontSize: "clamp(46px, 6vw, 78px)", fontWeight: 900,
                                letterSpacing: "-0.04em", lineHeight: 1,
                                fontFamily: "'Playfair Display', Georgia, serif",
                                color: "#f8fafc", margin: 0,
                            }}>
                                My{" "}
                                <span style={{ WebkitTextStroke: "2px #a3e635", WebkitTextFillColor: "transparent" }}>
                                    Résumé
                                </span>
                            </h2>

                            {/* Download CTA */}
                            <div style={{
                                display: "flex",
                                gap: 12,
                                flexDirection: isMobile ? "column" : "row",
                                width: isMobile ? "100%" : "auto"
                            }}>                                <motion.a
                                href="/Resume.pdf"
                                download="Rohankumar_Resume.pdf"
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: 9,
                                    padding: "13px 28px", borderRadius: 10,
                                    background: "#a3e635", color: "#080808",
                                    fontSize: 14, fontWeight: 800, textDecoration: "none",
                                }}
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(163,230,53,0.25)" }}
                                whileTap={{ scale: 0.96 }}
                            >
                                    <FaDownload size={13} /> Download PDF
                                </motion.a>
                                <motion.a
                                    href="/Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "inline-flex", alignItems: "center", gap: 9,
                                        padding: "12px 22px", borderRadius: 10,
                                        border: "1px solid rgba(163,230,53,0.3)",
                                        color: "#a3e635", fontSize: 14, fontWeight: 600,
                                        textDecoration: "none",
                                    }}
                                    whileHover={{ background: "rgba(163,230,53,0.08)", scale: 1.03 }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    <FaExternalLinkAlt size={12} /> Open Tab
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Stats row ─────────────────────────────────────────── */}
                    <motion.div
                        style={{
                            display: "grid", gridTemplateColumns: isMobile
                                ? "repeat(2, 1fr)"
                                : "repeat(4, 1fr)", gap: 14, marginBottom: 40
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.7 }}
                    >
                        {RESUME_STATS.map((s, i) => (
                            <motion.div
                                key={i}
                                style={{
                                    padding: "20px 22px", borderRadius: 14,
                                    border: `1px solid ${s.color}20`,
                                    background: `${s.color}06`,
                                    textAlign: "center",
                                }}
                                whileHover={{ borderColor: `${s.color}40`, background: `${s.color}0e`, y: -4 }}
                            >
                                <div style={{
                                    fontSize: 34, fontWeight: 900, lineHeight: 1,
                                    fontFamily: "'Playfair Display', Georgia, serif",
                                    color: s.color,
                                }}>
                                    {s.value}
                                </div>
                                <div style={{ fontSize: 11, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginTop: 6 }}>
                                    {s.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* ── Main grid ─────────────────────────────────────────── */}
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 300px", gap: 28, alignItems: "start" }}>

                        {/* PDF Preview */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <PDFPreview fullscreen={true}
                                isMobile={isMobile}
                                onToggleFullscreen={() => setFullscreen(false)} />
                        </motion.div>

                        {/* Right sidebar */}
                        <motion.div
                            style={{ display: "flex", flexDirection: "column", gap: 20 }}
                            initial={{ opacity: 0, x: 40 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            {/* Skills snapshot */}
                            <div style={{
                                padding: isMobile ? "20px 18px" : "24px 22px", borderRadius: 16,
                                border: "1px solid rgba(255,255,255,0.06)",
                                background: "#0d0d0d",
                            }}>
                                <h4 style={{
                                    fontSize: 11, letterSpacing: "0.2em", color: "#a3e635",
                                    fontFamily: "'DM Mono', monospace", margin: "0 0 18px",
                                }}>
                                    TECH STACK
                                </h4>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {SKILLS_PREVIEW.map((s) => (
                                        <motion.div
                                            key={s.name}
                                            style={{
                                                display: "flex", alignItems: "center", gap: 6,
                                                padding: "5px 11px", borderRadius: 7,
                                                border: `1px solid ${s.color}25`,
                                                background: `${s.color}0a`,
                                                fontSize: 12, color: s.color,
                                            }}
                                            whileHover={{ borderColor: `${s.color}55`, scale: 1.05 }}
                                        >
                                            <span style={{ fontSize: 13, display: "flex" }}>{s.icon}</span>
                                            <span style={{ color: "rgba(248,250,252,0.6)" }}>{s.name}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Experience snapshot */}
                            <div style={{
                                padding: "24px 22px", borderRadius: 16,
                                border: "1px solid rgba(255,255,255,0.06)",
                                background: "#0d0d0d",
                            }}>
                                <h4 style={{
                                    fontSize: 11, letterSpacing: "0.2em", color: "#a3e635",
                                    fontFamily: "'DM Mono', monospace", margin: "0 0 18px",
                                }}>
                                    EXPERIENCE
                                </h4>
                                {[
                                    { role: "SDE Intern", company: "Infosys", period: "2025 – Present", color: "#a3e635", dot: true },
                                    { role: "IT Intern", company: "Ordnance Factory", period: "May – Jun 2024", color: "#38bdf8", dot: false },
                                ].map((e, i) => (
                                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: i === 0 ? 14 : 0 }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 5 }}>
                                            <motion.div
                                                style={{ width: 8, height: 8, borderRadius: "50%", background: e.color, flexShrink: 0 }}
                                                animate={e.dot ? { boxShadow: [`0 0 0 0 ${e.color}60`, `0 0 0 6px transparent`] } : {}}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            />
                                            {i === 0 && <div style={{ width: 1, height: 28, background: "rgba(255,255,255,0.06)", marginTop: 4 }} />}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: "#f8fafc" }}>{e.role}</div>
                                            <div style={{ fontSize: 12, color: e.color, fontWeight: 600 }}>{e.company}</div>
                                            <div style={{ fontSize: 11, color: "rgba(248,250,252,0.25)", fontFamily: "'DM Mono', monospace" }}>{e.period}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Certs */}
                            <div style={{
                                padding: "24px 22px", borderRadius: 16,
                                border: "1px solid rgba(255,255,255,0.06)",
                                background: "#0d0d0d",
                            }}>
                                <h4 style={{
                                    fontSize: 11, letterSpacing: "0.2em", color: "#a3e635",
                                    fontFamily: "'DM Mono', monospace", margin: "0 0 16px",
                                }}>
                                    CERTIFICATIONS
                                </h4>
                                {[
                                    { name: "Associate in IT Foundations (Java)", issuer: "Infosys Lex · 2025" },
                                    { name: "Data Structures & Algorithms using Java", issuer: "Infosys Lex · 2025" },
                                ].map((c, i) => (
                                    <div key={i} style={{
                                        padding: "12px 14px", borderRadius: 10,
                                        border: "1px solid rgba(163,230,53,0.12)",
                                        background: "rgba(163,230,53,0.04)",
                                        marginBottom: i === 0 ? 10 : 0,
                                    }}>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: "#f8fafc", lineHeight: 1.4, marginBottom: 3 }}>{c.name}</div>
                                        <div style={{ fontSize: 11, color: "#a3e635", fontFamily: "'DM Mono', monospace" }}>{c.issuer}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Social links */}
                            <div style={{
                                padding: "20px 22px", borderRadius: 16,
                                border: "1px solid rgba(255,255,255,0.06)",
                                background: "#0d0d0d",
                                display: "flex", gap: 10,
                            }}>
                                {[
                                    { icon: <FaGithub size={16} />, href: "https://github.com/dyavanpallyrohankumar", label: "GitHub", color: "#f8fafc" },
                                    { icon: <FaLinkedin size={16} />, href: "https://linkedin.com/in/dyavanpallyrohankumar", label: "LinkedIn", color: "#38bdf8" },
                                ].map((s) => (
                                    <motion.a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                                            padding: "10px", borderRadius: 10,
                                            border: `1px solid ${s.color}20`,
                                            background: `${s.color}06`,
                                            color: "rgba(248,250,252,0.5)", fontSize: 13, textDecoration: "none",
                                        }}
                                        whileHover={{ borderColor: `${s.color}45`, color: s.color, scale: 1.04 }}
                                    >
                                        {s.icon}
                                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11 }}>{s.label}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}