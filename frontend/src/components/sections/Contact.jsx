import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
    FaEnvelope, FaPhone, FaMapMarkerAlt,
    FaGithub, FaLinkedin, FaPaperPlane,
    FaCheckCircle, FaExclamationCircle,
} from "react-icons/fa";
import { SiSpringboot } from "react-icons/si";

// ── Contact info items ────────────────────────────────────────────────────────
const CONTACT_ITEMS = [
    {
        icon: <FaEnvelope size={18} />,
        label: "Email",
        value: "dyavanpallyrohan@gmail.com",
        href: "mailto:dyavanpallyrohan@gmail.com",
        color: "#a3e635",
    },
    {
        icon: <FaPhone size={18} />,
        label: "Phone",
        value: "+91 8919999232",
        href: "tel:+918919999232",
        color: "#38bdf8",
    },
    {
        icon: <FaMapMarkerAlt size={18} />,
        label: "Location",
        value: "Hyderabad, Telangana, India",
        href: "https://maps.google.com/?q=Hyderabad,Telangana",
        color: "#818cf8",
    },
    {
        icon: <FaGithub size={18} />,
        label: "GitHub",
        value: "dyavanpallyrohankumar",
        href: "https://github.com/dyavanpallyrohankumar",
        color: "#f8fafc",
    },
    {
        icon: <FaLinkedin size={18} />,
        label: "LinkedIn",
        value: "dyavanpallyrohankumar",
        href: "https://linkedin.com/in/dyavanpallyrohankumar",
        color: "#38bdf8",
    },
];

// ── Floating label input ──────────────────────────────────────────────────────
function FloatInput({ label, name, type = "text", value, onChange, error, multiline = false }) {
    const [focused, setFocused] = useState(false);
    const filled = value && value.length > 0;
    const active = focused || filled;

    const baseStyle = {
        width: "100%",
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${error ? "#f87171" : focused ? "rgba(163,230,53,0.5)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 10,
        padding: multiline ? "28px 18px 14px" : "22px 18px 10px",
        color: "#f8fafc",
        fontSize: 15,
        fontFamily: "'DM Sans', sans-serif",
        outline: "none",
        transition: "border-color 0.2s, background 0.2s",
        resize: multiline ? "vertical" : "none",
        minHeight: multiline ? 130 : "auto",
        boxSizing: "border-box",
    };

    return (
        <div style={{ position: "relative", width: "100%" }}>
            <motion.label
                style={{
                    position: "absolute",
                    left: 18,
                    pointerEvents: "none",
                    fontSize: active ? 11 : 15,
                    color: error ? "#f87171" : focused ? "#a3e635" : "rgba(248,250,252,0.35)",
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: active ? "0.1em" : "0",
                    transition: "all 0.2s",
                    top: active ? (multiline ? 10 : 8) : multiline ? 22 : "50%",
                    transform: active || multiline ? "none" : "translateY(-50%)",
                    zIndex: 1,
                }}
            >
                {label}
            </motion.label>

            {multiline ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={baseStyle}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={baseStyle}
                />
            )}

            {error && (
                <p style={{ margin: "4px 0 0 4px", fontSize: 11, color: "#f87171", fontFamily: "'DM Mono', monospace" }}>
                    {error}
                </p>
            )}
        </div>
    );
}

// ── Toast notification ────────────────────────────────────────────────────────
function Toast({ type, message, onClose }) {
    return (
        <motion.div
            style={{
                position: "fixed", bottom: 32, right: 32, zIndex: 9999,
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 20px", borderRadius: 12,
                background: type === "success" ? "rgba(13,13,13,0.95)" : "rgba(13,13,13,0.95)",
                border: `1px solid ${type === "success" ? "rgba(163,230,53,0.4)" : "rgba(248,113,113,0.4)"}`,
                backdropFilter: "blur(20px)",
                boxShadow: `0 8px 40px ${type === "success" ? "rgba(163,230,53,0.1)" : "rgba(248,113,113,0.1)"}`,
                maxWidth: 360,
            }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
        >
            <span style={{ color: type === "success" ? "#a3e635" : "#f87171", fontSize: 18, flexShrink: 0 }}>
                {type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
            </span>
            <p style={{ margin: 0, fontSize: 14, color: "rgba(248,250,252,0.8)", lineHeight: 1.5 }}>
                {message}
            </p>
            <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(248,250,252,0.3)", cursor: "pointer", fontSize: 18, padding: 0, marginLeft: 8 }}>×</button>
        </motion.div>
    );
}

// ── Main Contact ──────────────────────────────────────────────────────────────
export default function Contact() {
    const ref = useRef();
    const inView = useInView(ref, { once: true, margin: "-80px" });

    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle"); // idle | sending | success | error
    const [toast, setToast] = useState(null);

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.email.trim()) e.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email address";
        if (!form.subject.trim()) e.subject = "Subject is required";
        if (!form.message.trim()) e.message = "Message is required";
        else if (form.message.trim().length < 20) e.message = "Message too short (min 20 chars)";
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        setStatus("sending");

        const subject = encodeURIComponent(form.subject);

        const body = encodeURIComponent(
            `Hello Rohan,

You have received a new message from your portfolio website.

----------------------------------

Name: ${form.name}
Email: ${form.email}
Subject: ${form.subject}

Message:
${form.message}

----------------------------------

Sent from rohankumar.dev`
        );

        const mailtoLink = `mailto:dyavanpallyrohan@gmail.com?subject=${subject}&body=${body}`;

        // Small delay for animation smoothness
        setTimeout(() => {
            window.location.href = mailtoLink;

            setStatus("success");
            setToast({
                type: "success",
                message: "Email client opened. Complete the send process there.",
            });

            setForm({ name: "", email: "", subject: "", message: "" });

            setTimeout(() => {
                setStatus("idle");
            }, 2500);

        }, 600);
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Mono&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        textarea { font-family: 'DM Sans', sans-serif !important; }
      `}</style>

            <section
                id="contact"
                ref={ref}
                style={{
                    background: "#080808",
                    padding: "100px 24px 120px",
                    position: "relative",
                    overflow: "hidden",
                    fontFamily: "'DM Sans', sans-serif",
                }}
            >
                {/* Grid background */}
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `linear-gradient(rgba(163,230,53,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.025) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px", pointerEvents: "none",
                }} />

                {/* Glow */}
                <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(163,230,53,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

                    {/* ── Header ──────────────────────────────────────────────── */}
                    <motion.div
                        style={{ marginBottom: 72 }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.p style={{ fontSize: 11, letterSpacing: "0.3em", color: "#a3e635", fontFamily: "'DM Mono', monospace", margin: "0 0 16px" }}>
                            — GET IN TOUCH
                        </motion.p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
                            <h2 style={{
                                fontSize: "clamp(46px, 7vw, 82px)", fontWeight: 900,
                                letterSpacing: "-0.04em", lineHeight: 1,
                                fontFamily: "'Playfair Display', Georgia, serif",
                                color: "#f8fafc", margin: 0,
                            }}>
                                Let's{" "}
                                <span style={{ WebkitTextStroke: "2px #a3e635", WebkitTextFillColor: "transparent" }}>
                                    Connect
                                </span>
                            </h2>

                            {/* Availability badge */}
                            <motion.div
                                style={{
                                    display: "flex", alignItems: "center", gap: 8,
                                    padding: "10px 20px", borderRadius: 100,
                                    border: "1px solid rgba(163,230,53,0.25)",
                                    background: "rgba(163,230,53,0.06)",
                                }}
                                animate={{ boxShadow: ["0 0 0px rgba(163,230,53,0)", "0 0 20px rgba(163,230,53,0.1)", "0 0 0px rgba(163,230,53,0)"] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <motion.span
                                    style={{ width: 8, height: 8, borderRadius: "50%", background: "#a3e635", display: "block" }}
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <span style={{ fontSize: 12, color: "#a3e635", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
                                    OPEN TO OPPORTUNITIES
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* ── 2-col layout ────────────────────────────────────────── */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48, alignItems: "start" }}>

                        {/* LEFT: Info ─────────────────────────────────────────── */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                            <motion.p
                                style={{ fontSize: 16, color: "rgba(248,250,252,0.4)", lineHeight: 1.8, margin: 0 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2 }}
                            >
                                I'm actively looking for <strong style={{ color: "#f8fafc" }}>full-stack and backend roles</strong>.
                                Have a project, opportunity, or just want to say hi? My inbox is always open.
                            </motion.p>

                            {/* Contact cards */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {CONTACT_ITEMS.map((item, i) => (
                                    <motion.a
                                        key={i}
                                        href={item.href}
                                        target={item.href.startsWith("http") ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "flex", alignItems: "center", gap: 16,
                                            padding: "16px 20px", borderRadius: 12,
                                            border: "1px solid rgba(255,255,255,0.06)",
                                            background: "#0d0d0d",
                                            textDecoration: "none",
                                        }}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={inView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.3 + i * 0.08 }}
                                        whileHover={{ borderColor: `${item.color}35`, background: `${item.color}07`, x: 6 }}
                                    >
                                        <div style={{
                                            width: 40, height: 40, borderRadius: 10,
                                            background: `${item.color}12`,
                                            border: `1px solid ${item.color}25`,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: item.color, flexShrink: 0,
                                        }}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 11, color: "rgba(248,250,252,0.3)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", marginBottom: 2 }}>
                                                {item.label.toUpperCase()}
                                            </div>
                                            <div style={{ fontSize: 14, color: "rgba(248,250,252,0.7)", fontWeight: 500 }}>
                                                {item.value}
                                            </div>
                                        </div>
                                        <span style={{ marginLeft: "auto", color: "rgba(248,250,252,0.15)", fontSize: 14 }}>→</span>
                                    </motion.a>
                                ))}
                            </div>

                            {/* Currently at */}
                            <motion.div
                                style={{
                                    padding: "20px 22px", borderRadius: 14,
                                    border: "1px solid rgba(163,230,53,0.15)",
                                    background: "rgba(163,230,53,0.03)",
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.75 }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                                    <motion.span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a3e635", display: "block" }}
                                        animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                                    <span style={{ fontSize: 10, letterSpacing: "0.2em", color: "#a3e635", fontFamily: "'DM Mono', monospace" }}>
                                        CURRENT STATUS
                                    </span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <div style={{
                                        width: 38, height: 38, borderRadius: 10,
                                        background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "#4ade80", fontSize: 18,
                                    }}>
                                        <SiSpringboot />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: "#f8fafc" }}>Software Developer Intern</div>
                                        <div style={{ fontSize: 12, color: "rgba(248,250,252,0.35)", fontFamily: "'DM Mono', monospace" }}>@ Infosys · July 2025 – Present</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* RIGHT: Form ─────────────────────────────────────────── */}
                        <motion.div
                            style={{
                                background: "#0d0d0d",
                                border: "1px solid rgba(255,255,255,0.06)",
                                borderRadius: 20,
                                padding: "36px 36px",
                                position: "relative",
                                overflow: "hidden",
                            }}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Top gradient line */}
                            <div style={{
                                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                                background: "linear-gradient(90deg, transparent, #a3e635, transparent)",
                            }} />

                            <h3 style={{
                                fontSize: 22, fontWeight: 800, color: "#f8fafc",
                                fontFamily: "'Playfair Display', Georgia, serif",
                                letterSpacing: "-0.02em", margin: "0 0 6px",
                            }}>
                                Send a Message
                            </h3>
                            <p style={{ fontSize: 13, color: "rgba(248,250,252,0.3)", margin: "0 0 28px", fontFamily: "'DM Mono', monospace" }}>
                // I typically respond within 24 hours
                            </p>

                            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }} noValidate>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                                    <FloatInput label="Your Name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
                                    <FloatInput label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
                                </div>
                                <FloatInput label="Subject" name="subject" value={form.subject} onChange={handleChange} error={errors.subject} />
                                <FloatInput label="Message" name="message" value={form.message} onChange={handleChange} error={errors.message} multiline />

                                <motion.button
                                    type="submit"
                                    disabled={status === "sending"}
                                    style={{
                                        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                                        padding: "14px 28px", borderRadius: 10,
                                        background: status === "success" ? "#4ade80" : "#a3e635",
                                        color: "#080808",
                                        fontSize: 14, fontWeight: 800,
                                        border: "none", cursor: status === "sending" ? "not-allowed" : "pointer",
                                        opacity: status === "sending" ? 0.8 : 1,
                                        fontFamily: "'DM Sans', sans-serif",
                                        marginTop: 4,
                                    }}
                                    whileHover={status !== "sending" ? { scale: 1.02, boxShadow: "0 0 30px rgba(163,230,53,0.25)" } : {}}
                                    whileTap={status !== "sending" ? { scale: 0.97 } : {}}
                                >
                                    {status === "sending" ? (
                                        <>
                                            <motion.div
                                                style={{ width: 16, height: 16, border: "2px solid #080808", borderTopColor: "transparent", borderRadius: "50%" }}
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                                            />
                                            Sending...
                                        </>
                                    ) : status === "success" ? (
                                        <><FaCheckCircle /> Message Sent!</>
                                    ) : (
                                        <><FaPaperPlane size={13} /> Send Message</>
                                    )}
                                </motion.button>
                            </form>

                            {/* Bottom note */}
                            <p style={{ fontSize: 11, color: "rgba(248,250,252,0.2)", margin: "16px 0 0", fontFamily: "'DM Mono', monospace", textAlign: "center" }}>
                                Your data is never stored or shared.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
                )}
            </AnimatePresence>
        </>
    );
}