import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FiArrowUp, FiGithub, FiLinkedin, FiTwitter, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const EMAIL = "rasingollasaranga35@gmail.com";

const SOCIALS = [
  { Icon: FiGithub,   href: "https://github.com",       label: "GitHub"   },
  { Icon: FiLinkedin, href: "https://linkedin.com",      label: "LinkedIn" },
  { Icon: FiTwitter,  href: "#",                         label: "Twitter"  },
  { Icon: FiMail,     href: `mailto:${EMAIL}`,           label: "Email"    },
];

const NAV_LINKS = [
  { label: "Work",     href: "#projects"  },
  { label: "About",    href: "#about"     },
  { label: "Skills",   href: "#skills"    },
  { label: "Contact",  href: "#contact"   },
];

/* ─────────────────────────────────────────────
   LIVE CLOCK — IST UTC+5:30
───────────────────────────────────────────── */
function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Colombo" }));
      const h = String(ist.getHours()).padStart(2, "0");
      const m = String(ist.getMinutes()).padStart(2, "0");
      const s = String(ist.getSeconds()).padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span style={{ fontFamily: "Courier New, monospace", fontSize: 11, letterSpacing: "0.18em" }}>
      {time}
    </span>
  );
}

/* ─────────────────────────────────────────────
   SCROLL PROGRESS RING
───────────────────────────────────────────── */
function ScrollRing({ onClick }: { onClick: () => void }) {
  const { scrollYProgress } = useScroll();
  const [pct, setPct] = useState(0);
  const radius = 22;
  const circ   = 2 * Math.PI * radius;

  useEffect(() =>
    scrollYProgress.on("change", v => setPct(v)),
  [scrollYProgress]);

  const dash = circ - pct * circ;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      style={{
        position: "relative", width: 56, height: 56,
        background: "none", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
      aria-label="Back to top"
    >
      {/* SVG ring */}
      <svg
        width={56} height={56}
        style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
      >
        {/* Track */}
        <circle cx={28} cy={28} r={radius}
          fill="none"
          stroke="rgba(237,224,204,0.08)"
          strokeWidth={1.5}
        />
        {/* Progress */}
        <circle cx={28} cy={28} r={radius}
          fill="none"
          stroke="#9EC6F3"
          strokeWidth={1.5}
          strokeDasharray={circ}
          strokeDashoffset={dash}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
      </svg>

      {/* Arrow icon */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ color: "#9EC6F3", display: "flex" }}
      >
        <FiArrowUp size={16} />
      </motion.div>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   MARQUEE STRIP
───────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  "Available for Work",
  "Full-Stack Engineer",
  "React · Node.js · TypeScript",
  "Colombo · Sri Lanka",
  "Open to Remote",
  "2026 Engagements",
];

function MarqueeStrip() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]; // doubled for seamless loop

  return (
    <div style={{
      overflow: "hidden",
      borderTop: "1px solid rgba(237,224,204,0.07)",
      borderBottom: "1px solid rgba(237,224,204,0.07)",
      padding: "11px 0",
      marginBottom: 0,
      position: "relative",
    }}>
      {/* Fade edges */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 80,
        background: "linear-gradient(to right, #0E0C0A, transparent)",
        zIndex: 2, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 80,
        background: "linear-gradient(to left, #0E0C0A, transparent)",
        zIndex: 2, pointerEvents: "none",
      }} />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 0, whiteSpace: "nowrap", width: "max-content" }}
      >
        {items.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <span style={{
              fontFamily: "Courier New, monospace",
              fontSize: 10, letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(237,224,204,0.28)",
              padding: "0 32px",
            }}>
              {item}
            </span>
            <span style={{ color: "#9EC6F3", fontSize: 8, opacity: 0.5 }}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const [hoverLetter, setHoverLetter] = useState<number | null>(null);

  const letters = "Let's talk.".split("");

  return (
    <footer style={{
      position: "relative",
      background: "#0A0806",
      borderTop: "1px solid rgba(237,224,204,0.07)",
      overflow: "hidden",
    }}>

      {/* Ember glow — centre bottom */}
      <div style={{
        position: "absolute", bottom: -100, left: "50%",
        transform: "translateX(-50%)",
        width: 800, height: 300,
        background: "radial-gradient(ellipse, rgba(158,198,243,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Top accent rule */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent 0%, #9EC6F3 40%, #BDDDE4 60%, transparent 100%)",
        opacity: 0.6,
      }} />

      {/* ── MARQUEE ── */}
      <MarqueeStrip />

      {/* ── MAIN BODY ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 48px 0" }}>

        {/* Giant animated headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 56 }}
        >
          <p style={{
            fontFamily: "Courier New, monospace",
            fontSize: 9, letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(237,224,204,0.3)",
            marginBottom: 16,
          }}>
            — Have a project in mind?
          </p>

          {/* Letter-by-letter hover effect on headline */}
          <h2 style={{
            fontFamily: "'Times New Roman', serif",
            fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
            fontWeight: 700, lineHeight: 0.88,
            letterSpacing: "-0.03em",
            margin: 0, cursor: "default",
            display: "flex", flexWrap: "wrap",
          }}>
            {letters.map((char, i) => (
              <motion.span
                key={i}
                onHoverStart={() => setHoverLetter(i)}
                onHoverEnd={() => setHoverLetter(null)}
                animate={{
                  color: hoverLetter === i
                    ? "#9EC6F3"
                    : char === "." ? "#9EC6F3"
                    : hoverLetter !== null && Math.abs(hoverLetter - i) === 1
                      ? "#BDDDE4"
                      : "#FFF1D5",
                  y: hoverLetter === i ? -6 : 0,
                }}
                transition={{ duration: 0.18 }}
                style={{ display: char === " " ? "inline" : "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        {/* ── GRID ROW ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "48px",
            paddingBottom: 56,
            borderBottom: "1px solid rgba(237,224,204,0.07)",
          }}
        >
          {/* Col 1 — Email CTA */}
          <div>
            <p style={{
              fontFamily: "Courier New, monospace", fontSize: 9,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "rgba(237,224,204,0.3)", marginBottom: 16,
            }}>§ Direct</p>

            <motion.a
              href={`mailto:${EMAIL}`}
              whileHover={{ x: 4 }}
              style={{
                fontFamily: "'Times New Roman', serif",
                fontSize: 15, fontStyle: "italic",
                color: "rgba(237,224,204,0.65)",
                textDecoration: "none", display: "block",
                marginBottom: 20,
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#9EC6F3")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(237,224,204,0.65)")}
            >
              {EMAIL} ↗
            </motion.a>

            <motion.a
              href={`mailto:${EMAIL}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "11px 24px",
                background: "#9EC6F3",
                color: "#0E0C0A",
                fontFamily: "'Times New Roman', serif",
                fontSize: 12, fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                textDecoration: "none",
                transition: "box-shadow 0.3s",
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 30px rgba(158,198,243,0.3)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
            >
              Start a project ↗
            </motion.a>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p style={{
              fontFamily: "Courier New, monospace", fontSize: 9,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "rgba(237,224,204,0.3)", marginBottom: 16,
            }}>§ Navigation</p>

            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {NAV_LINKS.map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ x: 6 }}
                  style={{
                    fontFamily: "'Times New Roman', serif",
                    fontSize: 16, fontStyle: "italic",
                    color: "rgba(237,224,204,0.45)",
                    textDecoration: "none",
                    display: "flex", alignItems: "center", gap: 8,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#FFF1D5")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(237,224,204,0.45)")}
                >
                  <span style={{ fontSize: 10, color: "#9EC6F3", opacity: 0.6 }}>→</span>
                  {label}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Col 3 — Location + time + socials */}
          <div>
            <p style={{
              fontFamily: "Courier New, monospace", fontSize: 9,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "rgba(237,224,204,0.3)", marginBottom: 16,
            }}>§ Whereabouts</p>

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <FiMapPin size={12} color="rgba(212,162,84,0.7)" />
              <span style={{
                fontFamily: "Courier New, monospace", fontSize: 11,
                letterSpacing: "0.15em", color: "rgba(237,224,204,0.45)",
              }}>
                Colombo, Sri Lanka
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              <FiClock size={12} color="rgba(212,162,84,0.7)" />
              <span style={{ color: "rgba(237,224,204,0.35)" }}>
                <LiveClock />
                <span style={{
                  fontFamily: "Courier New, monospace", fontSize: 10,
                  letterSpacing: "0.15em", color: "rgba(237,224,204,0.25)",
                  marginLeft: 6,
                }}>IST</span>
              </span>
            </div>

            {/* Availability badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 12px",
              border: "1px solid rgba(158,198,243,0.25)",
              background: "rgba(158,198,243,0.06)",
              marginBottom: 24,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#9EC6F3", display: "inline-block",
                animation: "pulse 2s ease-in-out infinite",
              }} />
              <span style={{
                fontFamily: "Courier New, monospace", fontSize: 10,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "#9EC6F3",
              }}>Open to work</span>
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 8 }}>
              {SOCIALS.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  title={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  style={{
                    width: 36, height: 36,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid rgba(237,224,204,0.1)",
                    color: "rgba(237,224,204,0.4)",
                    textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(158,198,243,0.5)";
                    el.style.color = "#9EC6F3";
                    el.style.boxShadow = "0 0 14px rgba(158,198,243,0.18)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(237,224,204,0.1)";
                    el.style.color = "rgba(237,224,204,0.4)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── BOTTOM BAR ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 0 32px",
          }}
        >
          {/* Left — copyright */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{
              fontFamily: "Courier New, monospace",
              fontSize: 10, letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(237,224,204,0.25)",
            }}>
              © 2026 Saranga Rasingolla
            </span>
            <div style={{ width: 1, height: 12, background: "rgba(237,224,204,0.1)" }} />
            <span style={{
              fontFamily: "Courier New, monospace",
              fontSize: 10, letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(237,224,204,0.2)",
            }}>
              Built with React · TypeScript
            </span>
          </div>

          {/* Right — back to top ring */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{
              fontFamily: "Courier New, monospace",
              fontSize: 9, letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(237,224,204,0.2)",
            }}>
              Back to top
            </span>
            <ScrollRing onClick={scrollToTop} />
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.5); }
        }
        @media (max-width: 768px) {
          footer .grid-3col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}