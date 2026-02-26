// const Loader = () => {
//     console.log("Loader rendered");
//     return (
//         <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
//             <div className="text-center">
//                 <div className="relative">
//                     <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4 mx-auto"></div>
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold code-font">
//                         <span className="text-blue-500">&lt;/&gt;</span>
//                     </div>
//                 </div>
//                 <h2 className="text-2xl font-bold code-font mt-4">
//                     <span className="text-red-500">&lt;</span>
//                     <span className="gradient-text">₹ØHÅÑKμMÂR's Portfolio</span>
//                     <span className="text-green-500">/&gt;</span>
//                 </h2>
//             </div>
//         </div>
//     );
// };

// export default Loader;


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
    { text: "Initializing runtime environment...", delay: 0, color: "#a3e635" },
    { text: "Loading Spring Boot microservices...", delay: 0.4, color: "#4ade80" },
    { text: "Mounting React component tree...", delay: 0.8, color: "#38bdf8" },
    { text: "Connecting to PostgreSQL cluster...", delay: 1.2, color: "#818cf8" },
    { text: "Running JWT auth handshake...", delay: 1.6, color: "#fb923c" },
    { text: "Deploying to AWS EC2 [us-east-1]...", delay: 2.0, color: "#f87171" },
    { text: "Pipeline ready. Serving portfolio...", delay: 2.4, color: "#a3e635" },
];

const TECH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>/";

// Scramble text effect
function ScrambleText({ text, delay = 0 }) {
    const [display, setDisplay] = useState("");
    const [done, setDone] = useState(false);

    useEffect(() => {
        let timeout = setTimeout(() => {
            let frame = 0;
            const total = text.length;
            const maxFrames = total * 3;

            const run = () => {
                if (frame >= maxFrames) {
                    setDisplay(text);
                    setDone(true);
                    return;
                }

                const revealed = Math.floor((frame / maxFrames) * total);
                const scrambled = text
                    .split("")
                    .map((char, i) => {
                        if (i < revealed) return char;
                        if (char === " ") return " ";
                        return TECH_CHARS[Math.floor(Math.random() * TECH_CHARS.length)];
                    })
                    .join("");

                setDisplay(scrambled);
                frame++;
                requestAnimationFrame(run);
            };
            requestAnimationFrame(run);
        }, delay * 1000);

        return () => clearTimeout(timeout);
    }, [text, delay]);

    return (
        <span style={{ color: done ? "#f8fafc" : "rgba(248,250,252,0.4)", fontFamily: "'DM Mono', monospace" }}>
            {display}
        </span>
    );
}

// Animated progress bar
function ProgressBar({ progress }) {
    return (
        <div style={{ width: "100%", height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 100, overflow: "hidden" }}>
            <motion.div
                style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #4ade80, #a3e635, #38bdf8)",
                    borderRadius: 100,
                    transformOrigin: "left",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
        </div>
    );
}

// Orbiting rings
function LoaderOrbit() {
    return (
        <div style={{ position: "relative", width: 140, height: 140 }}>
            {/* Outer ring */}
            <motion.div
                style={{
                    position: "absolute", inset: 0,
                    borderRadius: "50%",
                    border: "1px solid rgba(163,230,53,0.15)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
                {/* Ring dot */}
                <div style={{
                    position: "absolute", top: -4, left: "50%", marginLeft: -4,
                    width: 8, height: 8, borderRadius: "50%",
                    background: "#a3e635",
                    boxShadow: "0 0 12px rgba(163,230,53,0.8)",
                }} />
            </motion.div>

            {/* Middle ring */}
            <motion.div
                style={{
                    position: "absolute", inset: 18,
                    borderRadius: "50%",
                    border: "1px solid rgba(56,189,248,0.2)",
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
                <div style={{
                    position: "absolute", bottom: -4, left: "50%", marginLeft: -4,
                    width: 8, height: 8, borderRadius: "50%",
                    background: "#38bdf8",
                    boxShadow: "0 0 12px rgba(56,189,248,0.8)",
                }} />
            </motion.div>

            {/* Inner ring */}
            <motion.div
                style={{
                    position: "absolute", inset: 36,
                    borderRadius: "50%",
                    border: "1px solid rgba(248,113,113,0.2)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
                <div style={{
                    position: "absolute", top: -4, right: -4,
                    width: 8, height: 8, borderRadius: "50%",
                    background: "#f87171",
                    boxShadow: "0 0 12px rgba(248,113,113,0.8)",
                }} />
            </motion.div>

            {/* Center */}
            <motion.div
                style={{
                    position: "absolute", inset: 54,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(163,230,53,0.2) 0%, rgba(163,230,53,0.05) 60%, transparent 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, fontWeight: 900, color: "#a3e635",
                    fontFamily: "'DM Mono', monospace",
                }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                &lt;/&gt;
            </motion.div>
        </div>
    );
}

// ── Main Loader ───────────────────────────────────────────────────────────────
export default function Loader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [currentLine, setCurrentLine] = useState(0);
    const [done, setDone] = useState(false);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        // Progress bar
        const progressInterval = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                // Slower near 80, burst to 100 at end
                const increment = p < 75 ? 1.2 : p < 90 ? 0.5 : 1.8;
                return Math.min(p + increment, 100);
            });
        }, 40);

        // Boot line progression
        BOOT_LINES.forEach((_, i) => {
            setTimeout(() => setCurrentLine(i + 1), (BOOT_LINES[i].delay + 0.6) * 1000);
        });

        // Finish
        const finishTimeout = setTimeout(() => {
            setProgress(100);
            setDone(true);
            setTimeout(() => {
                setExiting(true);
                setTimeout(() => onComplete?.(), 700);
            }, 600);
        }, 3400);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(finishTimeout);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!exiting && (
                <motion.div
                    style={{
                        position: "fixed", inset: 0,
                        background: "#080808",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        zIndex: 9999, fontFamily: "'DM Mono', monospace",
                    }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Background grid */}
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: `linear-gradient(rgba(163,230,53,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.025) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px", pointerEvents: "none",
                    }} />

                    {/* Scanline effect */}
                    <motion.div
                        style={{
                            position: "absolute", inset: 0, pointerEvents: "none",
                            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
                        }}
                    />

                    {/* Corner decorations */}
                    {[
                        { top: 24, left: 24, borderLeft: "2px solid rgba(163,230,53,0.3)", borderTop: "2px solid rgba(163,230,53,0.3)" },
                        { top: 24, right: 24, borderRight: "2px solid rgba(163,230,53,0.3)", borderTop: "2px solid rgba(163,230,53,0.3)" },
                        { bottom: 24, left: 24, borderLeft: "2px solid rgba(163,230,53,0.3)", borderBottom: "2px solid rgba(163,230,53,0.3)" },
                        { bottom: 24, right: 24, borderRight: "2px solid rgba(163,230,53,0.3)", borderBottom: "2px solid rgba(163,230,53,0.3)" },
                    ].map((style, i) => (
                        <motion.div
                            key={i}
                            style={{ position: "absolute", width: 24, height: 24, ...style }}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                        />
                    ))}

                    {/* Main content */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40, width: "100%", maxWidth: 600, padding: "0 32px" }}>

                        {/* Orbit */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <LoaderOrbit />
                        </motion.div>

                        {/* Name */}
                        <motion.div
                            style={{ textAlign: "center" }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div style={{ fontSize: 11, letterSpacing: "0.3em", color: "#a3e635", marginBottom: 10 }}>
                                INITIALIZING
                            </div>
                            <h1 style={{
                                fontSize: "clamp(22px, 4vw, 32px)",
                                fontWeight: 900, margin: 0,
                                letterSpacing: "-0.02em",
                                fontFamily: "'DM Mono', monospace",
                            }}>
                                <span style={{ color: "#a3e635" }}>&lt;</span>
                                <span style={{
                                    background: "linear-gradient(90deg, #f8fafc, #a3e635)",
                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                }}>
                                    RohanKumar.D
                                </span>
                                <span style={{ color: "#a3e635" }}>/&gt;</span>
                            </h1>
                            <div style={{ fontSize: 11, color: "rgba(248,250,252,0.2)", marginTop: 8, letterSpacing: "0.2em" }}>
                                Portfolio · v2025
                            </div>
                        </motion.div>

                        {/* Terminal boot log */}
                        <motion.div
                            style={{
                                width: "100%",
                                background: "rgba(0,0,0,0.6)",
                                border: "1px solid rgba(163,230,53,0.15)",
                                borderRadius: 12,
                                padding: "20px 22px",
                                minHeight: 200,
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {/* Terminal header */}
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                {["#f87171", "#facc15", "#4ade80"].map((c) => (
                                    <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
                                ))}
                                <span style={{ marginLeft: 8, fontSize: 11, color: "rgba(248,250,252,0.2)", letterSpacing: "0.1em" }}>
                                    bash — rohan@portfolio:~
                                </span>
                            </div>

                            {/* Boot lines */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                {BOOT_LINES.slice(0, currentLine).map((line, i) => (
                                    <motion.div
                                        key={i}
                                        style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 12 }}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <span style={{ color: line.color, flexShrink: 0 }}>▶</span>
                                        <ScrambleText text={line.text} delay={0} />
                                        {i === currentLine - 1 && !done && (
                                            <motion.span
                                                style={{ color: "#a3e635", fontSize: 14 }}
                                                animate={{ opacity: [1, 0, 1] }}
                                                transition={{ duration: 0.8, repeat: Infinity }}
                                            >▋</motion.span>
                                        )}
                                        {(i < currentLine - 1 || done) && (
                                            <span style={{ color: "#4ade80", marginLeft: "auto", fontSize: 11, flexShrink: 0 }}>✓ OK</span>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Progress section */}
                        <motion.div
                            style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontSize: 11, color: "rgba(248,250,252,0.25)", letterSpacing: "0.15em" }}>
                                    {done ? "READY TO LAUNCH" : "LOADING ASSETS"}
                                </span>
                                <motion.span
                                    style={{ fontSize: 14, fontWeight: 700, color: "#a3e635" }}
                                    animate={done ? { scale: [1, 1.2, 1] } : {}}
                                >
                                    {Math.round(progress)}%
                                </motion.span>
                            </div>
                            <ProgressBar progress={progress} />

                            {/* Mini tech tags scrolling */}
                            <div style={{ overflow: "hidden", marginTop: 4 }}>
                                <motion.div
                                    style={{ display: "flex", gap: 16, width: "max-content" }}
                                    animate={{ x: [0, "-50%"] }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                >
                                    {[...Array(2)].map((_, ri) =>
                                        ["Java", "Spring Boot", "React", "PostgreSQL", "Docker", "AWS", "Jenkins", "REST APIs", "JWT", "MongoDB"].map((t, i) => (
                                            <span key={`${ri}-${i}`} style={{
                                                fontSize: 10, color: "rgba(248,250,252,0.15)",
                                                letterSpacing: "0.12em", whiteSpace: "nowrap",
                                                display: "flex", alignItems: "center", gap: 8,
                                            }}>
                                                <span style={{ color: "rgba(163,230,53,0.25)", fontSize: 6 }}>●</span>
                                                {t.toUpperCase()}
                                            </span>
                                        ))
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}