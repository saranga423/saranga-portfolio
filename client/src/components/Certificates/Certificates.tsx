import { motion, AnimatePresence } from "framer-motion";
import { FiAward, FiExternalLink, FiX } from "react-icons/fi";
import { useState, useEffect, useRef, useCallback } from "react";
import { SectionHeading } from "../About/SectionHeading";

/* ─────────────────────────────────────────────
   PALETTE
───────────────────────────────────────────── */
const P = {
  blue:   "#9FB3DF",
  sky:    "#9EC6F3",
  mist:   "#BDDDE4",
  cream:  "#FFF1D5",
  rose:   "#E8B4B8",
  bg:     "#070B14",
  bg2:    "#0D1220",
  surface:"rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.07)",
  serif:  `'Times New Roman', Times, serif`,
  mono:   `'Courier New', Courier, monospace`,
};

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
type Certificate = {
  title: string;
  issuer: string;
  category: string;
  featured?: boolean;
  year?: string;
  url?: string;
  description?: string;
};

/* ─────────────────────────────────────────────
   DATA
   Replace each url with your real credential link.
───────────────────────────────────────────── */
const certs: Certificate[] = [
  {
    title: "AI/ML Engineer — Stage 2",
    issuer: "SLIIT",
    category: "Artificial Intelligence",
    featured: true,
    year: "2026",
    description: "Advanced machine learning architectures, model deployment, and AI system design.",
    url: "https://code.sliit.org/certificates/mtcwf3j3li",
  },
  {
    title: "AI/ML Engineer — Stage 1",
    issuer: "SLIIT",
    category: "Artificial Intelligence",
    featured: true,
    year: "2024",
    description: "Foundations of supervised and unsupervised learning, neural networks, and data pipelines.",
    url: "https://code.sliit.org/certificates/nlodb1b4bg",
  },
  {
    title: "Frontend Web Development",
    issuer: "University of Moratuwa",
    category: "Frontend Engineering",
    year: "2023",
    description: "Modern HTML/CSS/JS techniques, responsive layouts, and performance optimisation.",
    url: "https://open.uom.lk/lms/certificates/verify/FWD-2023-XXXX",
  },
  {
    title: "Online Learning Programme in Python",
    issuer: "University of Moratuwa",
    category: "Programming",
    year: "2023",
    description: "Intermediate Python programming including data structures and OOP patterns.",
    url: "https://open.uom.lk/lms/certificates/verify/PY-2023-XXXX",
  },
  {
    title: "Web Design Programme",
    issuer: "University of Moratuwa",
    category: "UI / UX",
    year: "2023",
    description: "Principles of visual hierarchy, typography, and user-centred interface design.",
    url: "https://open.uom.lk/lms/certificates/verify/WDP-2023-XXXX",
  },
  {
    title: "Python for Beginners",
    issuer: "University of Moratuwa",
    category: "Programming",
    year: "2022",
    description: "Core Python syntax, control flow, and introductory scripting.",
    url: "https://open.uom.lk/lms/certificates/verify/PYB-2022-XXXX",
  },
  {
    title: "Software Engineer Intern",
    issuer: "HackerRank",
    category: "Software Engineering",
    year: "2022",
    description: "Problem-solving certification covering algorithms and data structures.",
    url: "https://www.hackerrank.com/certificates/XXXXXXXXXXXX",
  },
  {
    title: "Java Course",
    issuer: "Sololearn",
    category: "Backend Development",
    year: "2022",
    description: "Object-oriented Java fundamentals, collections, and exception handling.",
    url: "https://www.sololearn.com/certificates/CT-XXXXXXXXXXXX",
  },
  {
    title: "HTML Course",
    issuer: "Sololearn",
    category: "Web Fundamentals",
    year: "2021",
    description: "Semantic markup, accessibility basics, and document structure.",
    url: "https://www.sololearn.com/certificates/CT-YYYYYYYYYYYY",
  },
  {
    title: "Google Analytics for Beginners",
    issuer: "Google Analytics Academy",
    category: "Analytics",
    year: "2021",
    description: "Traffic analysis, goal tracking, and data-driven decision making.",
    url: "https://analytics.google.com/analytics/academy/certificate/XXXXXXXXXXXX",
  },
];

/* ─────────────────────────────────────────────
   CATEGORY CONFIG
───────────────────────────────────────────── */
type CategoryConfig = { accent: string; dim: string; label: string };

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  "Artificial Intelligence": { accent: P.sky,   dim: "rgba(158,198,243,0.12)", label: "AI" },
  "Frontend Engineering":    { accent: P.mist,  dim: "rgba(189,221,228,0.12)", label: "FE" },
  "UI / UX":                 { accent: P.mist,  dim: "rgba(189,221,228,0.10)", label: "UX" },
  "Programming":             { accent: P.blue,  dim: "rgba(159,179,223,0.12)", label: "PY" },
  "Backend Development":     { accent: P.blue,  dim: "rgba(159,179,223,0.10)", label: "BE" },
  "Software Engineering":    { accent: P.cream, dim: "rgba(255,241,213,0.10)", label: "SE" },
  "Web Fundamentals":        { accent: P.cream, dim: "rgba(255,241,213,0.08)", label: "WF" },
  "Analytics":               { accent: P.rose,  dim: "rgba(232,180,184,0.10)", label: "AN" },
};

const getConfig = (cat: string): CategoryConfig =>
  CATEGORY_CONFIG[cat] ?? { accent: P.cream, dim: "rgba(255,241,213,0.08)", label: "–" };

/* ─────────────────────────────────────────────
   MODAL (full detail on click — content unchanged from before)
───────────────────────────────────────────── */
function CertModal({ cert, onClose }: { cert: Certificate | null; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <AnimatePresence>
      {cert && (() => {
        const { accent, dim } = getConfig(cert.category);
        return (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "rgba(7,11,20,0.85)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <motion.div
              key="modal"
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: 440,
                width: "100%",
                background: P.bg2,
                border: `1px solid ${accent}22`,
                padding: 36,
                position: "relative",
              }}
            >
              {/* Close */}
              <button
                onClick={onClose}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: "transparent",
                  border: "none",
                  color: P.cream,
                  opacity: 0.4,
                  cursor: "pointer",
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label="Close"
              >
                <FiX size={18} />
              </button>

              {/* Category pill */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 10px",
                  background: dim,
                  border: `1px solid ${accent}20`,
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: accent,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: P.mono,
                    fontSize: 9,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: accent,
                  }}
                >
                  {cert.category}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: P.serif,
                  fontSize: 26,
                  fontWeight: 400,
                  color: P.cream,
                  lineHeight: 1.25,
                  marginBottom: 12,
                }}
              >
                {cert.title}
              </h3>

              {/* Meta */}
              <p
                style={{
                  fontFamily: P.mono,
                  fontSize: 11,
                  color: accent,
                  opacity: 0.7,
                  letterSpacing: "0.08em",
                  marginBottom: 20,
                }}
              >
                {cert.issuer}
                {cert.year && <>&nbsp;&nbsp;·&nbsp;&nbsp;{cert.year}</>}
              </p>

              {/* Description */}
              {cert.description && (
                <p
                  style={{
                    fontSize: 13,
                    color: P.cream,
                    opacity: 0.5,
                    lineHeight: 1.7,
                    borderTop: `1px solid ${P.border}`,
                    paddingTop: 20,
                    marginBottom: cert.url ? 24 : 0,
                  }}
                >
                  {cert.description}
                </p>
              )}

              {/* Credential link */}
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: P.mono,
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: accent,
                    textDecoration: "none",
                    borderBottom: `1px solid ${accent}40`,
                    paddingBottom: 2,
                  }}
                >
                  <FiExternalLink size={11} />
                  View credential
                </a>
              )}
            </motion.div>
          </motion.div>
        );
      })()}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   ORBIT NODE
   A single certificate positioned on the ring. Depth (front/back of
   the ellipse) drives scale and opacity so the ring reads as a
   single rotating circle in pseudo-3D rather than a flat carousel.
───────────────────────────────────────────── */
function OrbitNode({
  cert, angleDeg, rx, ry, onClick,
}: {
  cert: Certificate; angleDeg: number; rx: number; ry: number; onClick: () => void;
}) {
  const { accent, dim } = getConfig(cert.category);
  const [hovered, setHovered] = useState(false);

  const rad = (angleDeg * Math.PI) / 180;
  const x = rx * Math.cos(rad);
  const y = ry * Math.sin(rad);

  const depth   = Math.sin(rad);
  const scale   = 0.72 + 0.28 * ((depth + 1) / 2);
  const opacity = 0.45 + 0.55 * ((depth + 1) / 2);
  const zIndex  = Math.round(10 + depth * 10);

  return (
    <motion.div
      animate={{ x, y, scale, opacity }}
      transition={{ type: "tween", ease: "linear", duration: 0 }}
      style={{
        position: "absolute", top: "50%", left: "50%",
        marginLeft: -64, marginTop: -28,
        width: 128, height: 56,
        zIndex: hovered ? 99 : zIndex,
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <motion.div
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
        style={{
          width: "100%", height: "100%",
          background: hovered ? dim : P.surface,
          border: `1px solid ${hovered ? accent + "55" : P.border}`,
          display: "flex", alignItems: "center", gap: 9,
          padding: "0 12px",
          position: "relative", overflow: "hidden",
          transition: "background 0.2s, border-color 0.2s",
        }}
      >
        {cert.featured && (
          <span style={{
            position: "absolute", top: 0, right: 0,
            width: 5, height: 5, margin: 4,
            borderRadius: "50%", background: accent,
          }} />
        )}

        <div style={{
          width: 26, height: 26, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: `${accent}18`, border: `1px solid ${accent}30`,
        }}>
          <FiAward size={12} color={accent} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0 }}>
          <span style={{
            fontFamily: P.serif, fontSize: 11.5, color: P.cream,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            maxWidth: 84,
          }}>
            {cert.title}
          </span>
          <span style={{
            fontFamily: P.mono, fontSize: 8, letterSpacing: "0.06em",
            color: accent, opacity: 0.8, whiteSpace: "nowrap",
          }}>
            {cert.issuer}
          </span>
        </div>

        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: 1, background: accent, transformOrigin: "left",
          }}
          transition={{ duration: 0.25 }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   CERT ORBIT
   Single ring carrying all certificates, animated via manual rAF
   angle tracking so hover/click can freeze rotation mid-position
   rather than restarting or snapping. Compact by design — small
   radius, centered, no grid or filters underneath.
───────────────────────────────────────────── */
function CertOrbit({ onSelect }: { onSelect: (cert: Certificate) => void }) {
  const [paused, setPaused] = useState(false);
  const [angle, setAngle] = useState(0);
  const rafRef  = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  const [scale, setScale] = useState(1);
  useEffect(() => {
    const measure = () => {
      const w = window.innerWidth;
      if (w < 480) setScale(0.55);
      else if (w < 768) setScale(0.72);
      else if (w < 1024) setScale(0.86);
      else setScale(1);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const DURATION = 36; // seconds per full revolution — slow, compact, unobtrusive
  const RX = 300;
  const RY = 120;

  useEffect(() => {
    if (paused) {
      lastRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    const tick = (ts: number) => {
      if (lastRef.current !== null) {
        const dt = ts - lastRef.current;
        setAngle((prev) => (prev + (360 / (DURATION * 1000)) * dt) % 360);
      }
      lastRef.current = ts;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [paused]);

  const arenaH = Math.round(RY * 2 * scale + 120);

  return (
    <div
      style={{ position: "relative", height: arenaH, display: "flex", alignItems: "center", justifyContent: "center" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{ transform: `scale(${scale})`, transformOrigin: "center center", position: "relative", width: 0, height: 0 }}>

        {/* Ring guide */}
        <svg style={{ position: "absolute", top: "50%", left: "50%", overflow: "visible", pointerEvents: "none" }} width={0} height={0}>
          <ellipse cx={0} cy={0} rx={RX} ry={RY} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        </svg>

        {/* Nodes */}
        {certs.map((cert, i) => {
          const nodeAngle = (angle + (360 / certs.length) * i) % 360;
          return (
            <OrbitNode
              key={cert.title}
              cert={cert}
              angleDeg={nodeAngle}
              rx={RX}
              ry={RY}
              onClick={() => onSelect(cert)}
            />
          );
        })}

        {/* Center mark */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 5 }}>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.04, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute", inset: -24,
              borderRadius: "50%", border: "1px solid rgba(158,198,243,0.4)",
            }}
          />
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(158,198,243,0.6)" }} />
        </div>
      </div>

      {/* Hint */}
      <p style={{
        position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)",
        fontFamily: P.mono, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
        color: P.cream, opacity: 0.18, pointerEvents: "none", whiteSpace: "nowrap",
      }}>
        {paused ? "click a credential to view" : "hover to pause · click to view"}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
const Certificates = () => {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const handleSelect = useCallback((cert: Certificate) => setSelected(cert), []);

  return (
    <section
      id="certificates"
      style={{ padding: "120px 0", background: P.bg, color: P.cream }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        <SectionHeading
          index="04"
          eyebrow="Certifications"
          title="Continuous Learning"
          description="Professional credentials earned across AI, engineering, and design."
        />

        <CertOrbit onSelect={handleSelect} />

        {/* Footer stat */}
        <div style={{ marginTop: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <span style={{ height: 1, width: 48, background: P.border }} />
          <p style={{ fontFamily: P.mono, fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: P.cream, opacity: 0.2 }}>
            {certs.length} credentials · {new Set(certs.map((c) => c.issuer)).size} institutions
          </p>
          <span style={{ height: 1, width: 48, background: P.border }} />
        </div>
      </div>

      <CertModal cert={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default Certificates;