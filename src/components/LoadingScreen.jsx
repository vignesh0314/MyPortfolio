import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profileImg from "../assets/profile.png";

/* ── Letter-split helper ── */
const letters = "VIGNESH M".split("");

/* ── Stagger variants ── */
const letterVariants = {
    hidden: { opacity: 0, y: 60, filter: "blur(12px)" },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.55, delay: 0.3 + i * 0.07, ease: [0.22, 1, 0.36, 1] },
    }),
    exit: (i) => ({
        opacity: 0,
        y: -40,
        filter: "blur(8px)",
        transition: { duration: 0.35, delay: i * 0.04, ease: "easeIn" },
    }),
};

const taglineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 1.2, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

const overlayVariants = {
    visible: { y: "0%" },
    exit: {
        y: "-100%",
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.15 },
    },
};

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [leaving, setLeaving] = useState(false);

    /* ── Animate the progress bar 0→100 over ~1.8s ── */
    useEffect(() => {
        let start = null;
        const duration = 1800;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const pct = Math.min((elapsed / duration) * 100, 100);
            setProgress(pct);
            if (pct < 100) {
                requestAnimationFrame(step);
            } else {
                /* Slight pause then slide out */
                setTimeout(() => setLeaving(true), 350);
            }
        };
        requestAnimationFrame(step);
    }, []);

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {!leaving && (
                <motion.div
                    key="loader"
                    variants={overlayVariants}
                    initial="visible"
                    exit="exit"
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#060a10",
                        overflow: "hidden",
                    }}
                >
                    {/* ── Background shimmer rays ── */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage:
                                "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(82,39,255,0.18) 0%, transparent 70%)",
                            pointerEvents: "none",
                        }}
                    />

                    {/* ── Rotating ring ── */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                        style={{
                            position: "absolute",
                            width: 340,
                            height: 340,
                            borderRadius: "50%",
                            border: "1px solid rgba(139,92,246,0.15)",
                            boxShadow: "0 0 40px rgba(82,39,255,0.08)",
                        }}
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                        style={{
                            position: "absolute",
                            width: 200,
                            height: 200,
                            borderRadius: "50%",
                            border: "1px solid rgba(6,182,212,0.12)",
                        }}
                    />

                    {/* ── Profile photo avatar ── */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            width: 90,
                            height: 90,
                            borderRadius: "50%",
                            padding: 2,
                            background: "linear-gradient(135deg, #5227ff, #a78bfa, #22d3ee)",
                            boxShadow: "0 0 40px rgba(82,39,255,0.4), 0 0 80px rgba(82,39,255,0.15)",
                            marginBottom: 32,
                            flexShrink: 0,
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                overflow: "hidden",
                                border: "2px solid #060a10",
                            }}
                        >
                            <img
                                src={profileImg}
                                alt="Vignesh M"
                                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                            />
                        </div>
                    </motion.div>

                    {/* ── Animated name letters ── */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            marginBottom: 16,
                            overflow: "hidden",
                        }}
                    >
                        {letters.map((char, i) =>
                            char === " " ? (
                                <span key={i} style={{ width: 18 }} />
                            ) : (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={letterVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    style={{
                                        display: "inline-block",
                                        fontSize: "clamp(2.2rem, 6vw, 4rem)",
                                        fontWeight: 800,
                                        letterSpacing: "-0.02em",
                                        background: "linear-gradient(135deg, #e2e8f0, #a78bfa 50%, #22d3ee)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        fontFamily: "Outfit, sans-serif",
                                    }}
                                >
                                    {char}
                                </motion.span>
                            )
                        )}
                    </div>

                    {/* ── Tagline ── */}
                    <motion.p
                        variants={taglineVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                            fontSize: "0.8rem",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            color: "rgba(148,163,184,0.7)",
                            marginBottom: 48,
                            fontFamily: "Outfit, sans-serif",
                        }}
                    >
                        Full-Stack Developer · AI Enthusiast
                    </motion.p>

                    {/* ── Progress bar ── */}
                    <div
                        style={{
                            width: "min(280px, 60vw)",
                            height: 2,
                            background: "rgba(255,255,255,0.07)",
                            borderRadius: 999,
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        {/* Track glow */}
                        <motion.div
                            style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                height: "100%",
                                width: `${progress}%`,
                                background: "linear-gradient(90deg, #5227ff, #a78bfa, #22d3ee)",
                                borderRadius: 999,
                                boxShadow: "0 0 12px rgba(139,92,246,0.8)",
                            }}
                        />
                    </div>

                    {/* ── Progress number ── */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            marginTop: 12,
                            fontSize: "0.7rem",
                            letterSpacing: "0.15em",
                            color: "rgba(139,92,246,0.7)",
                            fontFamily: "Outfit, sans-serif",
                            fontVariantNumeric: "tabular-nums",
                        }}
                    >
                        {Math.floor(progress)}%
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
