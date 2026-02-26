import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const NAV_LINKS = [
    { label: "About", href: "/#about" },
    // { label: "Skills", href: "#skills" },
    { label: "Projects", href: "projects" },
    { label: "Education", href: "education" },
    { label: "Experience", href: "experience" },
    { label: "Contact", href: "contact" },
];

// Magnetic icon wrapper
function MagneticIcon({ children, href }) {
    const ref = useRef();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 400, damping: 20 });
    const sy = useSpring(y, { stiffness: 400, damping: 20 });

    const handleMove = (e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.4);
        y.set((e.clientY - r.top - r.height / 2) * 0.4);
    };
    const handleLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ x: sx, y: sy, display: "inline-flex" }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            whileHover={{ color: "#a3e635" }}
            whileTap={{ scale: 0.9 }}
        >
            {children}
        </motion.a>
    );
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);
            // Active section tracking
            const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
            for (const s of sections.reverse()) {
                const el = document.getElementById(s);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActive(`#${s}`);
                    break;
                }
            }
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Mono&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>

            <motion.nav
                style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0,
                    zIndex: 1000,
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "all 0.4s ease",
                    ...(scrolled ? {
                        background: "rgba(8,8,8,0.88)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        borderBottom: "1px solid rgba(163,230,53,0.1)",
                        boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                    } : {
                        background: "transparent",
                        backdropFilter: "none",
                    }),
                }}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: scrolled ? 60 : 76, transition: "height 0.3s ease" }}>

                        {/* ── Logo ───────────────────────────────────────────────── */}
                        <motion.a
                            href="/"
                            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 1 }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <span style={{ color: "#a3e635", fontFamily: "'DM Mono', monospace", fontSize: 20, fontWeight: 700 }}>&lt;</span>
                            <span style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 17, fontWeight: 700,
                                background: "linear-gradient(90deg, #f8fafc 30%, #a3e635 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                letterSpacing: "-0.02em",
                            }}>
                                RohanKumar.D
                            </span>
                            <span style={{ color: "#a3e635", fontFamily: "'DM Mono', monospace", fontSize: 20, fontWeight: 700 }}>/&gt;</span>
                        </motion.a>

                        {/* ── Desktop Links ───────────────────────────────────────── */}
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    style={{ textDecoration: "none", position: "relative", padding: "6px 14px", borderRadius: 8 }}
                                    onMouseEnter={() => setHoveredLink(link.href)}
                                    onMouseLeave={() => setHoveredLink(null)}
                                >
                                    {/* Hover bg */}
                                    <AnimatePresence>
                                        {hoveredLink === link.href && (
                                            <motion.div
                                                style={{
                                                    position: "absolute", inset: 0, borderRadius: 8,
                                                    background: "rgba(163,230,53,0.07)",
                                                    border: "1px solid rgba(163,230,53,0.15)",
                                                }}
                                                initial={{ opacity: 0, scale: 0.85 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.85 }}
                                                transition={{ duration: 0.15 }}
                                            />
                                        )}
                                    </AnimatePresence>

                                    <span style={{
                                        fontSize: 13, fontWeight: 500, position: "relative",
                                        color: active === link.href ? "#a3e635" : "rgba(248,250,252,0.55)",
                                        transition: "color 0.2s",
                                        letterSpacing: "0.02em",
                                    }}>
                                        {link.label}
                                    </span>

                                    {/* Active indicator */}
                                    {active === link.href && (
                                        <motion.div
                                            layoutId="activeLink"
                                            style={{
                                                position: "absolute", bottom: 2, left: "50%",
                                                transform: "translateX(-50%)",
                                                width: 4, height: 4, borderRadius: "50%",
                                                background: "#a3e635",
                                            }}
                                        />
                                    )}
                                </a>
                            ))}

                            {/* Divider */}
                            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)", margin: "0 8px" }} />

                            {/* Social icons */}
                            <div style={{ display: "flex", gap: 14, alignItems: "center", color: "rgba(248,250,252,0.4)", fontSize: 18 }}>
                                <MagneticIcon href="https://github.com/dyavanpallyrohankumar">
                                    <FaGithub />
                                </MagneticIcon>
                                <MagneticIcon href="https://linkedin.com/in/dyavanpallyrohankumar">
                                    <FaLinkedin />
                                </MagneticIcon>
                            </div>

                            {/* Resume CTA */}
                            <motion.a
                                href="/resume"
                                style={{
                                    marginLeft: 12,
                                    padding: "7px 18px", borderRadius: 8,
                                    border: "1px solid rgba(163,230,53,0.4)",
                                    background: "rgba(163,230,53,0.07)",
                                    color: "#a3e635", fontSize: 12, fontWeight: 700,
                                    textDecoration: "none", fontFamily: "'DM Mono', monospace",
                                    letterSpacing: "0.05em",
                                }}
                                whileHover={{ background: "#a3e635", color: "#080808", scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                transition={{ duration: 0.18 }}
                            >
                                RESUME
                            </motion.a>
                        </div>

                        {/* ── Mobile hamburger ────────────────────────────────────── */}
                        <motion.button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            style={{
                                display: "none",
                                width: 40, height: 40,
                                border: "1px solid rgba(163,230,53,0.2)",
                                borderRadius: 8,
                                background: "rgba(163,230,53,0.05)",
                                cursor: "pointer",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 5, padding: 10,
                            }}
                            className="mobile-hamburger"
                            whileTap={{ scale: 0.93 }}
                        >
                            {[0, 1, 2].map((i) => (
                                <motion.span
                                    key={i}
                                    style={{
                                        display: "block",
                                        height: 1.5, borderRadius: 2,
                                        background: "#a3e635",
                                        transformOrigin: "center",
                                    }}
                                    animate={
                                        mobileOpen
                                            ? i === 0 ? { rotate: 45, y: 6.5, width: 20 }
                                                : i === 2 ? { rotate: -45, y: -6.5, width: 20 }
                                                    : { opacity: 0, width: 20 }
                                            : i === 1 ? { width: 14, opacity: 1, rotate: 0, y: 0 }
                                                : { width: 20, opacity: 1, rotate: 0, y: 0 }
                                    }
                                    transition={{ duration: 0.25 }}
                                />
                            ))}
                        </motion.button>
                    </div>
                </div>

                {/* ── Mobile Menu Overlay ──────────────────────────────────────── */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            style={{
                                position: "fixed", inset: 0,
                                background: "#080808",
                                zIndex: -1,
                                display: "flex", flexDirection: "column",
                                justifyContent: "center", alignItems: "center",
                                gap: 0,
                            }}
                            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 44px) 38px)" }}
                            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 44px) 38px)" }}
                            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 44px) 38px)" }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Grid bg */}
                            <div style={{
                                position: "absolute", inset: 0,
                                backgroundImage: `linear-gradient(rgba(163,230,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.03) 1px, transparent 1px)`,
                                backgroundSize: "60px 60px", pointerEvents: "none",
                            }} />

                            {NAV_LINKS.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    style={{
                                        textDecoration: "none",
                                        fontSize: "clamp(36px, 8vw, 64px)",
                                        fontWeight: 900,
                                        fontFamily: "'Playfair Display', Georgia, serif",
                                        letterSpacing: "-0.03em",
                                        color: active === link.href ? "#a3e635" : "rgba(248,250,252,0.25)",
                                        lineHeight: 1.2,
                                        padding: "6px 0",
                                        position: "relative",
                                    }}
                                    initial={{ opacity: 0, x: -60 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    whileHover={{ color: "#a3e635", x: 16 }}
                                >
                                    <span style={{ fontSize: 12, color: "#a3e635", fontFamily: "'DM Mono', monospace", marginRight: 14, verticalAlign: "middle" }}>
                                        0{i + 1}.
                                    </span>
                                    {link.label}
                                </motion.a>
                            ))}

                            {/* Bottom social + resume */}
                            <motion.div
                                style={{ marginTop: 48, display: "flex", gap: 20, alignItems: "center" }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.45 }}
                            >
                                <a href="https://github.com/dyavanpallyrohankumar" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(248,250,252,0.4)", fontSize: 22 }}>
                                    <FaGithub />
                                </a>
                                <a href="https://linkedin.com/in/dyavanpallyrohankumar" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(248,250,252,0.4)", fontSize: 22 }}>
                                    <FaLinkedin />
                                </a>
                                <a href="/resume" style={{
                                    padding: "8px 22px", borderRadius: 8,
                                    border: "1px solid rgba(163,230,53,0.4)",
                                    color: "#a3e635", fontSize: 12, fontWeight: 700,
                                    textDecoration: "none", fontFamily: "'DM Mono', monospace",
                                }}>
                                    RESUME ↗
                                </a>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Responsive styles */}
            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
        </>
    );
}