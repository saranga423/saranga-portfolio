import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "../About/SectionHeading";

import {
  SiReact, SiNodedotjs, SiMongodb, SiFastapi, SiPython,
  SiTailwindcss, SiGit, SiDocker, SiJavascript, SiTypescript,
  SiHtml5, SiMysql, SiFirebase, SiSpringboot,
  SiKotlin, SiPhp, SiFlutter, SiRedux, SiFigma,
  SiCanva, SiJira, SiConfluence, SiGithub,
  SiAndroid, SiApachetomcat, SiEclipseide, SiSelenium,
  SiOpenai, SiClaude, SiGithubcopilot,
  SiVercel, SiNetlify, SiGithubactions, SiKubernetes, SiTerraform, SiGooglecloud,
} from "react-icons/si";

import {
  FiCode, FiLayout, FiServer, FiDatabase, FiTool,
  FiSmartphone, FiBarChart2, FiPenTool, FiUsers, FiCheckSquare,
  FiCloud, FiCpu, FiX,
} from "react-icons/fi";

/* ─────────────────────────────────────────────
   PALETTE (matches portfolio theme)
───────────────────────────────────────────── */
const P = {
  bg:     "#070B14",
  bg2:    "#0D1220",
  cream:  "#FFF1D5",
  border: "rgba(255,255,255,0.07)",
  serif:  `'Times New Roman', Times, serif`,
  mono:   `'Courier New', Courier, monospace`,
};

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
type IconComponent = React.ComponentType<{ size?: number; color?: string; className?: string }>;
type Skill = { icon?: IconComponent; name: string; level?: "expert" | "proficient" | "familiar" };
type Category = {
  id: string; label: string; filterIcon: IconComponent;
  color: string; glowColor: string; skills: Skill[];
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const categories: Category[] = [
  {
    id: "languages", label: "Languages", filterIcon: FiCode,
    color: "#818CF8", glowColor: "rgba(129,140,248,0.15)",
    skills: [
      { icon: SiJavascript, name: "JavaScript",  level: "expert"     },
      { icon: SiPython,     name: "Python",      level: "proficient" },
      { icon: SiKotlin,     name: "Kotlin",      level: "proficient" },
      { icon: SiPhp,        name: "PHP",         level: "familiar"   },
      { icon: FiCode,       name: "Java",        level: "proficient" },
      { icon: FiCode,       name: "C / C++",     level: "familiar"   },
      { icon: FiCode,       name: "R",           level: "familiar"   },
    ],
  },
  {
    id: "frontend", label: "Frontend", filterIcon: FiLayout,
    color: "#6EE7B7", glowColor: "rgba(110,231,183,0.15)",
    skills: [
      { icon: SiHtml5,       name: "HTML5",      level: "expert"     },
      { icon: FiCode,        name: "CSS3",       level: "expert"     },
      { icon: SiReact,       name: "React.js",   level: "expert"     },
      { icon: SiReact,       name: "Next.js",    level: "proficient" },
      { icon: SiTypescript,  name: "TypeScript", level: "proficient" },
      { icon: SiTailwindcss, name: "Tailwind",   level: "expert"     },
      { icon: FiLayout,      name: "Bootstrap",  level: "expert"     },
      { icon: FiLayout,      name: "Web Flow",   level: "familiar"   },
    ],
  },
  {
    id: "backend", label: "Backend", filterIcon: FiServer,
    color: "#C4B5FD", glowColor: "rgba(196,181,253,0.15)",
    skills: [
      { icon: SiNodedotjs,  name: "Node.js",     level: "expert"     },
      { icon: FiServer,     name: "Express.js",  level: "expert"     },
      { icon: SiSpringboot, name: "Spring Boot", level: "proficient" },
      { icon: SiFastapi,    name: "FastAPI",     level: "proficient" },
    ],
  },
  {
    id: "database", label: "Databases", filterIcon: FiDatabase,
    color: "#FCA5A5", glowColor: "rgba(252,165,165,0.15)",
    skills: [
      { icon: SiMongodb,  name: "MongoDB",    level: "expert"     },
      { icon: SiMysql,    name: "MySQL",      level: "expert"     },
      { icon: FiDatabase, name: "PostgreSQL", level: "proficient" },
      { icon: SiFirebase, name: "Firebase",   level: "proficient" },
      { icon: FiDatabase, name: "Oracle",     level: "proficient" },
      { icon: FiDatabase, name: "PL/SQL",     level: "proficient" },
    ],
  },
  {
    id: "tools", label: "Tools", filterIcon: FiTool,
    color: "#FCD34D", glowColor: "rgba(252,211,77,0.15)",
    skills: [
      { icon: SiGithub,       name: "GitHub",        level: "expert"     },
      { icon: SiGit,          name: "Git",           level: "expert"     },
      { icon: SiDocker,       name: "Docker",        level: "proficient" },
      { icon: SiApachetomcat, name: "Apache Tomcat", level: "familiar"   },
      { icon: SiEclipseide,   name: "Eclipse",       level: "proficient" },
      { icon: FiTool,         name: "VS Code",       level: "expert"     },
      { icon: SiJira,         name: "Jira",          level: "proficient" },
      { icon: SiConfluence,   name: "Confluence",    level: "familiar"   },
      { icon: FiTool,         name: "Trello",        level: "proficient" },
    ],
  },
  {
    id: "mobile", label: "Mobile", filterIcon: FiSmartphone,
    color: "#67E8F9", glowColor: "rgba(103,232,249,0.15)",
    skills: [
      { icon: SiAndroid,    name: "Android Java",   level: "proficient" },
      { icon: SiKotlin,     name: "Android Kotlin", level: "proficient" },
      { icon: SiFlutter,    name: "Flutter",        level: "familiar"   },
      { icon: SiReact,      name: "React Native",   level: "proficient" },
      { icon: SiRedux,      name: "Redux",          level: "proficient" },
    ],
  },
  {
    id: "data", label: "Data", filterIcon: FiBarChart2,
    color: "#86EFAC", glowColor: "rgba(134,239,172,0.15)",
    skills: [
      { icon: FiBarChart2, name: "Power BI",   level: "proficient" },
      { icon: SiPython,    name: "Pandas",     level: "proficient" },
      { icon: SiPython,    name: "Matplotlib", level: "familiar"   },
      { icon: FiBarChart2, name: "Excel",      level: "proficient" },
    ],
  },
  {
    id: "design", label: "Design", filterIcon: FiPenTool,
    color: "#F9A8D4", glowColor: "rgba(249,168,212,0.15)",
    skills: [
      { icon: SiFigma,   name: "Figma",    level: "proficient" },
      { icon: SiCanva,   name: "Canva",    level: "expert"     },
      { icon: FiPenTool, name: "Balsamiq", level: "familiar"   },
    ],
  },
  {
    id: "ai", label: "AI / LLM", filterIcon: FiCpu,
    color: "#67E8F9", glowColor: "rgba(103,232,249,0.15)",
    skills: [
      { icon: SiOpenai,        name: "ChatGPT",          level: "expert"     },
      { icon: SiClaude,        name: "Claude",           level: "expert"     },
      { icon: SiGithubcopilot, name: "GitHub Copilot",   level: "proficient" },
      { icon: FiCpu,           name: "Cursor",           level: "proficient" },
      { icon: FiCpu,           name: "Prompt Eng.",      level: "proficient" },
    ],
  },
  {
    id: "cloud", label: "Cloud & DevOps", filterIcon: FiCloud,
    color: "#FCD34D", glowColor: "rgba(252,211,77,0.15)",
    skills: [
      { icon: FiCloud,         name: "AWS",            level: "familiar"   },
      { icon: FiCloud,         name: "Azure",          level: "familiar"   },
      { icon: SiGooglecloud,   name: "Google Cloud",   level: "familiar"   },
      { icon: SiVercel,        name: "Vercel",         level: "proficient" },
      { icon: SiNetlify,       name: "Netlify",        level: "proficient" },
      { icon: SiGithubactions, name: "GitHub Actions", level: "familiar"   },
      { icon: SiKubernetes,    name: "Kubernetes",     level: "familiar"   },
      { icon: SiTerraform,     name: "Terraform",      level: "familiar"   },
    ],
  },
  {
    id: "soft", label: "Soft Skills", filterIcon: FiUsers,
    color: "#A5B4FC", glowColor: "rgba(165,180,252,0.15)",
    skills: [
      { icon: FiUsers, name: "Leadership"         },
      { icon: FiUsers, name: "Critical Thinking"  },
      { icon: FiUsers, name: "Problem-solving"    },
      { icon: FiUsers, name: "Strategic Planning" },
      { icon: FiUsers, name: "Flexibility"        },
    ],
  },
  {
    id: "testing", label: "Testing", filterIcon: FiCheckSquare,
    color: "#6EE7B7", glowColor: "rgba(110,231,183,0.15)",
    skills: [
      { icon: FiCheckSquare, name: "Manual Testing"  },
      { icon: SiSelenium,    name: "Selenium"        },
      { icon: FiCheckSquare, name: "Bug Tracking"    },
      { icon: FiCheckSquare, name: "UAT"             },
      { icon: SiGit,         name: "Version Control" },
    ],
  },
];

const LEVEL_META = {
  expert:     { label: "Expert",     color: "#6EE7B7" },
  proficient: { label: "Proficient", color: "#818CF8" },
  familiar:   { label: "Familiar",   color: "#FCD34D" },
};

const totalSkills = categories.reduce((s, c) => s + c.skills.length, 0);

/* ─────────────────────────────────────────────
   MARQUEE CONFIG
   Categories are distributed across rows, stacked narrow → wide
   to form a pyramid: fewer categories (and a tighter viewport) at
   the top, widening with each row down. Each row scrolls
   continuously, alternating direction, at a slightly different
   speed — a layered "ticker tape" instead of a fixed orbit path.
───────────────────────────────────────────── */
const ROWS: { catIds: string[]; duration: number; direction: 1 | -1; maxWidth: number }[] = [
  { catIds: ["ai", "design"],                          duration: 34, direction: -1, maxWidth: 340 },
  { catIds: ["languages", "frontend", "backend"],      duration: 42, direction: 1,  maxWidth: 500 },
  { catIds: ["mobile", "data", "soft"],                 duration: 38, direction: -1, maxWidth: 540 },
  { catIds: ["database", "tools", "cloud", "testing"], duration: 50, direction: 1,  maxWidth: 700 },
];

/* ─────────────────────────────────────────────
   SKILL DETAIL PANEL (shown when category clicked)
───────────────────────────────────────────── */
function SkillPanel({ cat, onClose }: { cat: Category; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const CatIcon = cat.filterIcon;

  return (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 300,
        background: "rgba(7,11,20,0.88)", backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      }}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 16 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 520, width: "100%",
          background: P.bg2, border: `1px solid ${cat.color}25`,
          padding: 36, position: "relative",
        }}
      >
        {/* Close */}
        <button onClick={onClose}
          style={{
            position: "absolute", top: 14, right: 14,
            background: "transparent", border: "none",
            color: P.cream, opacity: 0.4, cursor: "pointer",
          }}
          aria-label="Close"
        >
          <FiX size={18} />
        </button>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{
            width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
            background: `${cat.color}15`, border: `1px solid ${cat.color}30`,
          }}>
            <CatIcon size={18} color={cat.color} />
          </div>
          <div>
            <p style={{ fontFamily: P.mono, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: cat.color, opacity: 0.8 }}>
              Domain
            </p>
            <h3 style={{ fontFamily: P.serif, fontSize: 22, fontWeight: 400, color: P.cream, lineHeight: 1.2 }}>
              {cat.label}
            </h3>
          </div>
        </div>

        {/* Skills grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8,
          borderTop: `1px solid ${P.border}`, paddingTop: 20,
        }}>
          {cat.skills.map((skill) => {
            const Icon = skill.icon ?? FiCode;
            const lvl = skill.level ? LEVEL_META[skill.level] : null;
            return (
              <div key={skill.name}
                style={{
                  padding: "10px 12px",
                  background: `${cat.color}0A`,
                  border: `1px solid ${cat.color}20`,
                  display: "flex", flexDirection: "column", gap: 6,
                }}
              >
                <Icon size={15} color={cat.color} />
                <p style={{ fontFamily: P.mono, fontSize: 11, color: P.cream, opacity: 0.85 }}>
                  {skill.name}
                </p>
                {lvl && (
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: lvl.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: P.mono, fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: lvl.color, opacity: 0.8 }}>
                      {lvl.label}
                    </span>
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Count footer */}
        <p style={{
          marginTop: 20, fontFamily: P.mono, fontSize: 9, letterSpacing: "0.18em",
          textTransform: "uppercase", color: P.cream, opacity: 0.2, textAlign: "right",
        }}>
          {cat.skills.length} skills
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MARQUEE TILE (single category card inside a ticker row)
───────────────────────────────────────────── */
function MarqueeTile({
  cat, onClick, onHoverChange,
}: {
  cat: Category; onClick: () => void; onHoverChange: (hovered: boolean) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = cat.filterIcon;

  const setHover = (v: boolean) => {
    setHovered(v);
    onHoverChange(v);
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flexShrink: 0,
        width: 168, height: 56,
        margin: "0 7px",
        background: hovered ? `${cat.color}18` : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? cat.color + "55" : P.border}`,
        display: "flex", alignItems: "center", gap: 10,
        padding: "0 16px",
        cursor: "pointer",
        position: "relative", overflow: "hidden",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "background 0.2s, border-color 0.2s, transform 0.2s",
      }}
    >
      {hovered && (
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(circle at 30% 50%, ${cat.glowColor}, transparent 70%)`,
          pointerEvents: "none",
        }} />
      )}

      <div style={{
        width: 28, height: 28, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hovered ? `${cat.color}20` : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? cat.color + "40" : P.border}`,
      }}>
        <Icon size={13} color={hovered ? cat.color : "rgba(255,255,255,0.45)"} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 2, position: "relative", minWidth: 0 }}>
        <span style={{
          fontFamily: P.mono, fontSize: 10.5, letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: hovered ? cat.color : "rgba(255,255,255,0.55)",
          whiteSpace: "nowrap",
        }}>
          {cat.label}
        </span>
        <span style={{
          fontFamily: P.mono, fontSize: 8.5, color: P.cream, opacity: hovered ? 0.45 : 0.25,
          whiteSpace: "nowrap",
        }}>
          {cat.skills.length} skills
        </span>
      </div>

      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 1, background: cat.color, transformOrigin: "left",
        }}
        transition={{ duration: 0.25 }}
      />
    </button>
  );
}

/* ─────────────────────────────────────────────
   MARQUEE ROW (continuous horizontal ticker)
   Renders the row's categories twice back-to-back and translates
   by exactly one set's width, looping seamlessly. Direction and
   duration vary per row; any tile hover pauses the whole row.
───────────────────────────────────────────── */
function MarqueeRow({
  catIds, duration, direction, maxWidth, globalPaused, onNodeClick,
}: {
  catIds: string[]; duration: number; direction: 1 | -1; maxWidth: number;
  globalPaused: boolean;
  onNodeClick: (cat: Category) => void;
}) {
  const [rowHovered, setRowHovered] = useState(false);
  const rowCats = catIds.map((id) => categories.find((c) => c.id === id)!).filter(Boolean);
  const paused = globalPaused || rowHovered;

  // Track elapsed offset (0..1 fraction of one full loop) manually via rAF,
  // so pausing freezes mid-position instead of snapping or restarting.
  const [offset, setOffset] = useState(0);
  const rafRef  = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) {
      lastRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    const tick = (ts: number) => {
      if (lastRef.current !== null) {
        const dt = ts - lastRef.current;
        setOffset((prev) => (prev + dt / (duration * 1000)) % 1);
      }
      lastRef.current = ts;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [paused, duration]);

  const xPercent = direction === 1 ? -offset * 50 : -50 + offset * 50;

  return (
    <div
      style={{
        position: "relative", overflow: "hidden",
        width: "100%", maxWidth, margin: "0 auto",
        maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div
        style={{
          display: "flex", width: "max-content",
          transform: `translateX(${xPercent}%)`,
        }}
      >
        {[0, 1].map((dup) => (
          <div key={dup} style={{ display: "flex" }} aria-hidden={dup === 1}>
            {rowCats.map((cat) => (
              <MarqueeTile
                key={`${dup}-${cat.id}`}
                cat={cat}
                onClick={() => onNodeClick(cat)}
                onHoverChange={setRowHovered}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
const Skills = () => {
  const [selected, setSelected] = useState<Category | null>(null);
  const [paused, setPaused] = useState(false);

  const handleOpen  = useCallback((cat: Category) => { setSelected(cat); setPaused(true); }, []);
  const handleClose = useCallback(() => { setSelected(null); setPaused(false); }, []);

  return (
    <section id="skills" style={{ padding: "120px 0", background: P.bg, color: P.cream }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        <SectionHeading
          index="02"
          eyebrow="Capabilities"
          title={<>The tools I shape <em className="italic gradient-text">ideas</em> with.</>}
          description="A broad engineering stack — from frontend interfaces to mobile apps, data analysis, and cloud-ready backends."
        />

        {/* ── Ticker arena ── */}
        <div
          style={{
            position: "relative",
            display: "flex", flexDirection: "column", gap: 16,
            padding: "32px 0",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => !selected && setPaused(false)}
        >
          {ROWS.map((row, i) => (
            <MarqueeRow
              key={i}
              catIds={row.catIds}
              duration={row.duration}
              direction={row.direction}
              maxWidth={row.maxWidth}
              globalPaused={paused}
              onNodeClick={handleOpen}
            />
          ))}

          {/* Hint */}
          <p style={{
            marginTop: 4, textAlign: "center",
            fontFamily: P.mono, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
            color: P.cream, opacity: 0.18, pointerEvents: "none", whiteSpace: "nowrap",
          }}>
            {paused ? "click a tile to explore" : "hover to pause · click to explore"}
          </p>
        </div>

        {/* ── Category index grid (quick reference) ── */}
        <div style={{
          marginTop: 24,
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 1, borderTop: `1px solid ${P.border}`,
        }}>
          {categories.map((cat) => {
            const Icon = cat.filterIcon;
            return (
              <button
                key={cat.id}
                onClick={() => handleOpen(cat)}
                style={{
                  background: "transparent", border: "none",
                  borderBottom: `1px solid ${P.border}`, borderRight: `1px solid ${P.border}`,
                  padding: "12px 16px", display: "flex", alignItems: "center", gap: 10,
                  cursor: "pointer", textAlign: "left", transition: "background 0.18s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <Icon size={11} color={cat.color} />
                <span style={{ fontFamily: P.mono, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: P.cream, opacity: 0.55 }}>
                  {cat.label}
                </span>
                <span style={{ marginLeft: "auto", fontFamily: P.mono, fontSize: 9, color: cat.color, opacity: 0.5 }}>
                  {cat.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer stat */}
        <div style={{ marginTop: 40, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <span style={{ height: 1, width: 48, background: P.border }} />
          <p style={{ fontFamily: P.mono, fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: P.cream, opacity: 0.2 }}>
            {totalSkills} skills · {categories.length} domains
          </p>
          <span style={{ height: 1, width: 48, background: P.border }} />
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && <SkillPanel cat={selected} onClose={handleClose} />}
      </AnimatePresence>
    </section>
  );
};

export default Skills;