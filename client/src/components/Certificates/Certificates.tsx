import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FiAward, FiArrowUpRight, FiExternalLink } from "react-icons/fi";
import { useRef, useState } from "react";
import { SectionHeading } from "../About/SectionHeading";

/* ─────────────────────────────────────────────
   PALETTE
───────────────────────────────────────────── */
const P = {
  blue:  "#9FB3DF",
  sky:   "#9EC6F3",
  mist:  "#BDDDE4",
  cream: "#FFF1D5",

  bg:    "#070B14",
  bg2:   "#0B1120",

  card:  "rgba(13,17,32,0.72)",

  border: "rgba(255,241,213,0.08)",

  serif: `'Times New Roman', Times, serif`,

  mono: `'Courier New', Courier, monospace`,
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
type Certificate = {
  title:    string;
  issuer:   string;
  category: string;
  featured?: boolean;
  year?:    string;
};

const certs: Certificate[] = [
  {
    title:    "AI/ML Engineer — Stage 1",
    issuer:   "SLIIT",
    category: "Artificial Intelligence",
    featured: true,
    year:     "2024",
  },
  {
    title:    "Frontend Web Development",
    issuer:   "University of Moratuwa",
    category: "Frontend Engineering",
    year:     "2023",
  },
  {
    title:    "Online Learning Programme in Python",
    issuer:   "University of Moratuwa",
    category: "Programming",
    year:     "2023",
  },
  {
    title:    "Web Design Programme",
    issuer:   "University of Moratuwa",
    category: "UI / UX",
    year:     "2023",
  },
  {
    title:    "Python for Beginners",
    issuer:   "University of Moratuwa",
    category: "Python Development",
    year:     "2022",
  },
  {
    title:    "Software Engineer Intern",
    issuer:   "HackerRank",
    category: "Software Engineering",
    year:     "2022",
  },
  {
    title:    "Java Course",
    issuer:   "Sololearn",
    category: "Backend Development",
    year:     "2022",
  },
  {
    title:    "HTML Course",
    issuer:   "Sololearn",
    category: "Web Fundamentals",
    year:     "2021",
  },
  {
    title:    "Google Analytics for Beginners",
    issuer:   "Google Analytics Academy",
    category: "Analytics",
    year:     "2021",
  },
];

/* colour per category */
const categoryColor = (cat: string): string => {
  if (cat.includes("AI") || cat.includes("Machine"))  return P.sky;
  if (cat.includes("Frontend") || cat.includes("UI")) return P.mist;
  if (cat.includes("Python") || cat.includes("Java")) return P.blue;
  if (cat.includes("Software") || cat.includes("Eng")) return P.cream;
  return P.blue;
};

/* ─────────────────────────────────────────────
   3-D TILT CARD WRAPPER
───────────────────────────────────────────── */
function TiltCard({
  children,
  style = {},
  className = "",
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x   = useMotionValue(0);
  const y   = useMotionValue(0);
  const rX  = useSpring(useTransform(y, [-1, 1], [ 5, -5]), { stiffness: 200, damping: 30 });
  const rY  = useSpring(useTransform(x, [-1, 1], [-5,  5]), { stiffness: 200, damping: 30 });

  const move = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width  - 0.5) * 2);
    y.set(((e.clientY - rect.top ) / rect.height - 0.5) * 2);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      style={{ rotateX: rX, rotateY: rY, perspective: 900, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   FEATURED CARD  (wide, full-width)
───────────────────────────────────────────── */
function FeaturedCard({ c, index }: { c: Certificate; index: number }) {
  const [hovered, setHovered] = useState(false);
  const accent = categoryColor(c.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="col-span-full mb-2"
    >
      <TiltCard>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative", overflow: "hidden",
            background:
  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",

backdropFilter: "blur(22px)",
            border:"1px solid rgba(255,241,213,0.08)",
            borderTop: `2px solid ${accent}`,
            padding: "44px 48px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            gap: 32,
            transition: "border-color 0.4s, box-shadow 0.4s",
            boxShadow: hovered
  ? `
      0 18px 50px rgba(0,0,0,0.4),
      0 0 25px rgba(159,179,223,0.08)
    `
  : "none",
          }}
        >
          {/* Radial glow */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `radial-gradient(ellipse at 20% 50%, ${accent}12, transparent 65%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.5s",
          }} />

          {/* Left content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Index + category row */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <span style={{
                fontFamily: P.mono, fontSize: 10,
                letterSpacing: "0.3em", color: "rgba(159,179,223,0.35)",
              }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div style={{ height: 1, width: 32, background: `${accent}40` }} />
              <span style={{
                fontFamily: P.mono, fontSize: 9,
                letterSpacing: "0.28em", textTransform: "uppercase",
                color: accent,
              }}>
                {c.category}
              </span>
              <span style={{
                marginLeft: "auto",
                fontFamily: P.mono, fontSize: 9,
                letterSpacing: "0.2em",
                color: "rgba(159,179,223,0.25)",
              }}>
                {c.year}
              </span>
            </div>

            <h3 style={{
              fontFamily: P.serif,
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 700,
              fontStyle: "italic",
              color: P.cream,
              margin: "0 0 12px",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}>
              {c.title}
            </h3>

            <p style={{
              fontFamily: P.mono,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(189,221,228,0.5)",
              marginBottom: 18,
            }}>
              Issued by {c.issuer}
            </p>
          </div>

          {/* Right badge */}
          <div style={{
            position: "relative", zIndex: 1,
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              border: `1px solid ${accent}30`,
              background: `${accent}08`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: hovered
  ? `
      0 18px 50px rgba(0,0,0,0.4),
      0 0 25px rgba(159,179,223,0.08)
    `
  : "none",
              transition: "box-shadow 0.4s",
            }}>
              <FiAward size={26} color={accent} />
            </div>
            <span style={{
              fontFamily: P.mono, fontSize: 9,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: `${accent}70`,
            }}>Featured</span>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   STANDARD CARD
───────────────────────────────────────────── */
function CertCard({ c, index }: { c: Certificate; index: number }) {
  const [hovered, setHovered] = useState(false);
  const accent = categoryColor(c.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard style={{ height: "100%" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative", overflow: "hidden",
            background:
  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",

backdropFilter: "blur(22px)",
            border:
  "1px solid rgba(255,241,213,0.06)",
            borderLeft: `2px solid ${hovered ? accent : "rgba(159,179,223,0.12)"}`,
            padding: "32px 28px",
            height: "100%",
            display: "flex", flexDirection: "column",
            transition: "border-color 0.35s, box-shadow 0.35s",
            boxShadow: hovered
  ? `
      0 18px 50px rgba(0,0,0,0.4),
      0 0 25px rgba(159,179,223,0.08)
    `
  : "none",
          }}
        >
          {/* Corner glow */}
          <div style={{
            position: "absolute", top: -40, left: -40,
            width: 160, height: 160, borderRadius: "50%",
            background: `radial-gradient(circle, ${accent}15, transparent 70%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.45s",
            pointerEvents: "none",
          }} />

          {/* Top row — index + arrow */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", marginBottom: 24,
          }}>
            <span style={{
              fontFamily: P.mono, fontSize: 10,
              letterSpacing: "0.3em",
              color: "rgba(159,179,223,0.2)",
            }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <motion.div
              animate={{
                x: hovered ? 3 : 0,
                y: hovered ? -3 : 0,
                color: hovered ? accent : "rgba(159,179,223,0.3)",
              }}
              transition={{ duration: 0.2 }}
            >
              <FiArrowUpRight size={16} />
            </motion.div>
          </div>

          {/* Award icon */}
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            border: `1px solid ${accent}25`,
            background: `${accent}08`,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 24,
            boxShadow: hovered
  ? `
      0 18px 50px rgba(0,0,0,0.4),
      0 0 25px rgba(159,179,223,0.08)
    `
  : "none",
            transition: "box-shadow 0.35s",
          }}>
            <FiAward size={18} color={accent} />
          </div>

          {/* Category */}
          <p style={{
            fontFamily: P.mono, fontSize: 9,
            letterSpacing: "0.28em", textTransform: "uppercase",
            color: accent, marginBottom: 10,
          }}>
            {c.category}
          </p>

          {/* Title */}
          <h3 style={{
            fontFamily: P.serif,
            fontSize: 18, fontWeight: 700,
            fontStyle: "italic",
            color: P.cream,
            margin: "0 0 auto",
            lineHeight: 1.3,
            paddingBottom: 16,
          }}>
            {c.title}
          </h3>

          {/* Divider */}
          <motion.div
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: 1, margin: "16px 0",
              background: `linear-gradient(90deg, ${accent}50, transparent)`,
              originX: 0,
            }}
          />

          {/* Issuer + year row */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center",
          }}>
            <p style={{
              fontFamily: P.mono, fontSize: 10,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: "rgba(189,221,228,0.4)",
            }}>
              {c.issuer}
            </p>
            {c.year && (
              <span style={{
                fontFamily: P.mono, fontSize: 9,
                letterSpacing: "0.15em",
                color: "rgba(159,179,223,0.25)",
              }}>{c.year}</span>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   COUNT STRIP
───────────────────────────────────────────── */
function CountStrip() {
  const categories = [...new Set(certs.map(c => c.category))];
  const issuers    = [...new Set(certs.map(c => c.issuer))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 1,
        background: "rgba(159,179,223,0.06)",
        marginBottom: 56,
        border: "1px solid rgba(159,179,223,0.08)",
      }}
    >
      {[
        { num: certs.length,        label: "Certificates"  },
        { num: issuers.length,      label: "Institutions"  },
        { num: categories.length,   label: "Disciplines"   },
      ].map(({ num, label }) => (
        <div key={label} style={{
          background: "#090C14",
          padding: "28px 0",
          textAlign: "center",
          transition: "background 0.3s",
        }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(158,198,243,0.04)")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#090C14")}
        >
          <p style={{
            fontFamily: P.serif, fontSize: 36,
            fontWeight: 700, fontStyle: "italic",
            color: P.cream, margin: 0,
            background: `linear-gradient(135deg, ${P.cream}, ${P.sky})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            {num}
          </p>
          <p style={{
            fontFamily: P.mono, fontSize: 9,
            letterSpacing: "0.28em", textTransform: "uppercase",
            color: "rgba(159,179,223,0.35)", margin: "6px 0 0",
          }}>
            {label}
          </p>
        </div>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SECTION
───────────────────────────────────────────── */
const Certificates = () => {
  const featured = certs.filter(c => c.featured);
  const regular  = certs.filter(c => !c.featured);

  return (
    <section
      id="certificates"
      style={{
        position: "relative",
        padding: "120px 0",
        background:
  `
    radial-gradient(circle at top left,
    rgba(159,179,223,0.08),
    transparent 28%),

    radial-gradient(circle at bottom right,
    rgba(189,221,228,0.06),
    transparent 24%),

    linear-gradient(
      180deg,
      #070B14 0%,
      #0B1120 100%
    )
  `,
        overflow: "hidden",
        fontFamily: P.serif,
      }}
    >
      {/* ── Ambient background glows ── */}
      <div style={{
        position: "absolute", top: -200, right: -200,
        width: 700, height: 700,
        background: `radial-gradient(circle, ${P.sky}0A 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -100, left: -100,
        width: 500, height: 500,
        background: `radial-gradient(circle, ${P.mist}08 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Horizontal hairlines at top + bottom */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${P.blue}30, ${P.mist}40, transparent)`,
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${P.blue}20, transparent)`,
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        {/* Heading */}
        <SectionHeading
          index="04"
          eyebrow="Certifications"
          title={
            <>
              Continuous learning through{" "}
              <em style={{
                fontStyle: "italic",
                background: `linear-gradient(135deg, ${P.sky}, ${P.mist})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                engineering
              </em>
              {" "}and innovation.
            </>
          }
          description="Professional certifications across software engineering, AI, frontend development, analytics, and modern application design."
        />

        {/* Stats strip */}
        <CountStrip />

        {/* Featured card(s) */}
        <div style={{ display: "grid" }}>
          {featured.map((c, i) => (
            <FeaturedCard key={c.title} c={c} index={i} />
          ))}
        </div>

        {/* Regular grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 16,
        }}>
          {regular.map((c, i) => (
            <CertCard key={c.title} c={c} index={i + featured.length} />
          ))}
        </div>

        {/* Bottom footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            marginTop: 56,
            display: "flex", alignItems: "center", gap: 20,
            padding: "20px 0",
            borderTop: "1px solid rgba(159,179,223,0.07)",
          }}
        >
          <div style={{ height: 1, flex: 1, background: "rgba(159,179,223,0.07)" }} />
          <span style={{
            fontFamily: P.mono, fontSize: 9,
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: "rgba(159,179,223,0.25)",
          }}>
            {certs.length} credentials · Continuously expanding
          </span>
          <div style={{ height: 1, flex: 1, background: "rgba(159,179,223,0.07)" }} />
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;