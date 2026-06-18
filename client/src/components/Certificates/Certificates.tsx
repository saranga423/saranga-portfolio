import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { FiAward, FiArrowUpRight, FiExternalLink, FiX } from "react-icons/fi";
import { useRef, useState, useMemo, useEffect } from "react";
import { SectionHeading } from "../About/SectionHeading";

/* ─────────────────────────────────────────────
   PALETTE & CONSTANTS
───────────────────────────────────────────── */
const P = {
  blue: "#9FB3DF",
  sky: "#9EC6F3",
  mist: "#BDDDE4",
  cream: "#FFF1D5",
  bg: "#070B14",
  bg2: "#0B1120",
  card: "rgba(13,17,32,0.72)",
  border: "rgba(255,241,213,0.08)",
  serif: `'Times New Roman', Times, serif`,
  mono: `'Courier New', Courier, monospace`,
};

const GLOW_SHADOW = `0 18px 50px rgba(0,0,0,0.4), 0 0 25px rgba(159,179,223,0.08)`;

type Certificate = {
  title: string;
  issuer: string;
  category: string;
  featured?: boolean;
  year?: string;
  url?: string;
};

const certs: Certificate[] = [
  { title: "AI/ML Engineer — Stage 1", issuer: "SLIIT", category: "Artificial Intelligence", featured: true, year: "2024" },
  { title: "Frontend Web Development", issuer: "University of Moratuwa", category: "Frontend Engineering", year: "2023" },
  { title: "Online Learning Programme in Python", issuer: "University of Moratuwa", category: "Programming", year: "2023" },
  { title: "Web Design Programme", issuer: "University of Moratuwa", category: "UI / UX", year: "2023" },
  { title: "Python for Beginners", issuer: "University of Moratuwa", category: "Python Development", year: "2022" },
  { title: "Software Engineer Intern", issuer: "HackerRank", category: "Software Engineering", year: "2022" },
  { title: "Java Course", issuer: "Sololearn", category: "Backend Development", year: "2022" },
  { title: "HTML Course", issuer: "Sololearn", category: "Web Fundamentals", year: "2021" },
  { title: "Google Analytics for Beginners", issuer: "Google Analytics Academy", category: "Analytics", year: "2021" },
];

const categoryColor = (cat: string): string => {
  if (cat.includes("AI") || cat.includes("Machine")) return P.sky;
  if (cat.includes("Frontend") || cat.includes("UI")) return P.mist;
  if (cat.includes("Python") || cat.includes("Java")) return P.blue;
  return P.cream;
};

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rX = useSpring(useTransform(y, [-1, 1], [5, -5]), { stiffness: 200, damping: 30 });
  const rY = useSpring(useTransform(x, [-1, 1], [-5, 5]), { stiffness: 200, damping: 30 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
        y.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rX, rotateY: rY, perspective: 900, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CredentialLink({ url, accent, compact = false }: { url: string; accent: string; compact?: boolean }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        fontFamily: P.mono, fontSize: compact ? 9 : 10,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: accent, textDecoration: "none",
        borderBottom: `1px solid ${accent}40`,
      }}
    >
      <FiExternalLink size={11} />
      View Credential
    </a>
  );
}

function CertModal({ cert, onClose }: { cert: Certificate | null; onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!cert) return null;
  const accent = categoryColor(cert.category);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(7,11,20,0.8)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: 400, width: "100%", background: P.bg2,
            border: `1px solid ${accent}30`, padding: 32, position: "relative",
          }}
        >
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "transparent", border: "none", color: P.cream, cursor: "pointer" }}>
            <FiX size={20} />
          </button>
          <h3 style={{ fontFamily: P.serif, fontSize: 24, color: P.cream, marginBottom: 8 }}>{cert.title}</h3>
          <p style={{ fontFamily: P.mono, fontSize: 10, color: accent, textTransform: "uppercase" }}>{cert.issuer} • {cert.year}</p>
          {cert.url && <div style={{ marginTop: 24 }}><CredentialLink url={cert.url} accent={accent} /></div>}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
const Certificates = () => {
  const [active, setActive] = useState<string | null>(null);
  const [selected, setSelected] = useState<Certificate | null>(null);

  const categories = useMemo(() => Array.from(new Set(certs.map((c) => c.category))), []);
  const filtered = active ? certs.filter((c) => c.category === active) : certs;

  return (
    <section id="certificates" style={{ padding: "120px 0", background: P.bg, color: P.cream }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        <SectionHeading index="04" eyebrow="Certifications" title="Continuous Learning" description="A collection of professional certifications." />

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: 40, flexWrap: "wrap" }}>
          <button onClick={() => setActive(null)} style={{ padding: "8px 16px", borderRadius: 20, border: `1px solid ${active ? P.border : P.sky}`, background: "transparent", color: active ? P.blue : P.sky, cursor: "pointer" }}>All</button>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{ padding: "8px 16px", borderRadius: 20, border: `1px solid ${active === cat ? categoryColor(cat) : P.border}`, background: "transparent", color: active === cat ? categoryColor(cat) : P.blue, cursor: "pointer" }}>{cat}</button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((c) => (
              <TiltCard key={c.title}>
                <motion.div 
                  layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setSelected(c)}
                  style={{ padding: 24, background: P.card, border: `1px solid ${P.border}`, cursor: "pointer", height: "100%" }}
                >
                  <FiAward size={24} color={categoryColor(c.category)} />
                  <h4 style={{ marginTop: 16, fontFamily: P.serif }}>{c.title}</h4>
                  <p style={{ fontSize: 11, fontFamily: P.mono, opacity: 0.6 }}>{c.issuer}</p>
                </motion.div>
              </TiltCard>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <CertModal cert={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default Certificates;