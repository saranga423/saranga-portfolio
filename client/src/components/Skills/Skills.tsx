import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  FiCloud, FiCpu, FiX, FiSearch, FiChevronRight,
  FiZap, FiStar,
} from "react-icons/fi";

// ─── Palette ─────────────────────────────────────────────────────────────────

const P = {
  bg:     "#070B14",
  bg2:    "#0D1220",
  bg3:    "#111827",
  cream:  "#FFF1D5",
  border: "rgba(255,255,255,0.07)",
  serif:  `'Times New Roman', Times, serif`,
  mono:   `'Courier New', Courier, monospace`,
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Types ────────────────────────────────────────────────────────────────────

type IconComponent = React.ComponentType<{ size?: number; color?: string; className?: string }>;
type SkillLevel = "expert" | "proficient" | "familiar";
type Skill = { icon?: IconComponent; name: string; level?: SkillLevel };
type Category = {
  id: string; label: string; filterIcon: IconComponent;
  color: string; glowColor: string; skills: Skill[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories: Category[] = [
  {
    id: "languages", label: "Languages", filterIcon: FiCode,
    color: "#818CF8", glowColor: "rgba(129,140,248,0.15)",
    skills: [
      { icon: SiJavascript, name: "JavaScript",  level: "expert"     },
      { icon: SiTypescript, name: "TypeScript",  level: "proficient" },
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
      { icon: SiOpenai,        name: "ChatGPT",         level: "expert"     },
      { icon: SiClaude,        name: "Claude",          level: "expert"     },
      { icon: SiGithubcopilot, name: "GitHub Copilot",  level: "proficient" },
      { icon: FiCpu,           name: "Cursor",          level: "proficient" },
      { icon: FiZap,           name: "Prompt Eng.",     level: "proficient" },
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

const LEVEL_META: Record<SkillLevel, { label: string; color: string; bar: number }> = {
  expert:     { label: "Expert",     color: "#6EE7B7", bar: 100 },
  proficient: { label: "Proficient", color: "#818CF8", bar: 68  },
  familiar:   { label: "Familiar",   color: "#FCD34D", bar: 38  },
};

const totalSkills = categories.reduce((s, c) => s + c.skills.length, 0);
const expertCount = categories.flatMap(c => c.skills).filter(s => s.level === "expert").length;

const ROWS: { catIds: string[]; duration: number; direction: 1 | -1; maxWidth: number }[] = [
  { catIds: ["ai", "design"],                          duration: 34, direction: -1, maxWidth: 360 },
  { catIds: ["languages", "frontend", "backend"],      duration: 42, direction:  1, maxWidth: 560 },
  { catIds: ["mobile", "data", "soft"],                duration: 38, direction: -1, maxWidth: 560 },
  { catIds: ["database", "tools", "cloud", "testing"], duration: 50, direction:  1, maxWidth: 760 },
];

// ─── Proficiency Bar ──────────────────────────────────────────────────────────

function ProficiencyBar({ level, color }: { level: SkillLevel; color: string }) {
  const meta = LEVEL_META[level];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
      <div
        style={{
          flex: 1, height: 2,
          background: "rgba(255,255,255,0.07)",
          borderRadius: 2, overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${meta.bar}%` }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          style={{ height: "100%", background: meta.color, borderRadius: 2 }}
        />
      </div>
      <span style={{
        fontFamily: P.mono, fontSize: 8, letterSpacing: "0.14em",
        textTransform: "uppercase", color: meta.color, opacity: 0.75,
        whiteSpace: "nowrap",
      }}>
        {meta.label}
      </span>
    </div>
  );
}

// ─── Search Bar ───────────────────────────────────────────────────────────────

function SearchBar({
  value, onChange, onClear,
}: {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  // ⌘/ focuses search
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${P.border}`,
        padding: "0 14px", height: 40, maxWidth: 340,
        position: "relative",
      }}
    >
      <FiSearch size={13} color="rgba(255,255,255,0.3)" />
      <input
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search skills…"
        style={{
          flex: 1, background: "transparent", border: "none", outline: "none",
          fontFamily: P.mono, fontSize: 11.5, color: P.cream, caretColor: "#818CF8",
        }}
        aria-label="Search skills"
      />
      {value && (
        <button
          onClick={onClear}
          style={{ background: "transparent", border: "none", cursor: "pointer", padding: 2 }}
          aria-label="Clear search"
        >
          <FiX size={12} color="rgba(255,255,255,0.3)" />
        </button>
      )}
      <kbd style={{
        fontFamily: P.mono, fontSize: 9, color: "rgba(255,255,255,0.18)",
        background: "rgba(255,255,255,0.05)", border: `1px solid ${P.border}`,
        padding: "2px 5px", letterSpacing: "0.05em",
      }}>
        ⌘/
      </kbd>
    </div>
  );
}

// ─── Level Legend ─────────────────────────────────────────────────────────────

function LevelLegend() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      {(["expert", "proficient", "familiar"] as SkillLevel[]).map((lvl) => {
        const m = LEVEL_META[lvl];
        return (
          <div key={lvl} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: m.color, flexShrink: 0 }} />
            <span style={{ fontFamily: P.mono, fontSize: 8.5, letterSpacing: "0.14em", textTransform: "uppercase", color: P.cream, opacity: 0.35 }}>
              {m.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Stat Pill ────────────────────────────────────────────────────────────────

function StatPill({ value, label, color }: { value: number | string; label: string; color: string }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "10px 20px",
      background: `${color}08`,
      border: `1px solid ${color}20`,
    }}>
      <span style={{
        fontFamily: P.mono, fontSize: 20, fontWeight: 700,
        color, letterSpacing: "-0.02em", lineHeight: 1,
      }}>
        {value}
      </span>
      <span style={{
        fontFamily: P.mono, fontSize: 8, letterSpacing: "0.18em",
        textTransform: "uppercase", color: P.cream, opacity: 0.3, marginTop: 4,
      }}>
        {label}
      </span>
    </div>
  );
}

// ─── Skill Panel ──────────────────────────────────────────────────────────────

function SkillPanel({ cat, onClose }: { cat: Category; onClose: () => void }) {
  const [panelSearch, setPanelSearch] = useState("");

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const CatIcon = cat.filterIcon;
  const filtered = cat.skills.filter(s =>
    s.name.toLowerCase().includes(panelSearch.toLowerCase())
  );

  const expertN     = cat.skills.filter(s => s.level === "expert").length;
  const profN       = cat.skills.filter(s => s.level === "proficient").length;
  const familiarN   = cat.skills.filter(s => s.level === "familiar").length;

  return (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 300,
        background: "rgba(7,11,20,0.88)", backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      }}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 580, width: "100%", maxHeight: "90vh",
          background: P.bg2,
          border: `1px solid ${cat.color}25`,
          display: "flex", flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "24px 28px 20px",
          borderBottom: `1px solid ${P.border}`,
          background: `linear-gradient(135deg, ${cat.color}08, transparent)`,
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 44, height: 44,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `${cat.color}15`,
                border: `1px solid ${cat.color}30`,
              }}>
                <CatIcon size={20} color={cat.color} />
              </div>
              <div>
                <p style={{ fontFamily: P.mono, fontSize: 8.5, letterSpacing: "0.2em", textTransform: "uppercase", color: cat.color, opacity: 0.7, marginBottom: 3 }}>
                  Domain
                </p>
                <h3 style={{ fontFamily: P.serif, fontSize: 24, fontWeight: 400, color: P.cream, lineHeight: 1 }}>
                  {cat.label}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                background: "rgba(255,255,255,0.05)", border: `1px solid ${P.border}`,
                color: P.cream, opacity: 0.5, cursor: "pointer", padding: 6,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
            >
              <FiX size={15} />
            </button>
          </div>

          {/* Mini stats row */}
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            {expertN > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", background: "rgba(110,231,183,0.08)", border: "1px solid rgba(110,231,183,0.2)" }}>
                <FiStar size={9} color="#6EE7B7" />
                <span style={{ fontFamily: P.mono, fontSize: 8.5, color: "#6EE7B7", opacity: 0.9 }}>{expertN} expert</span>
              </div>
            )}
            {profN > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", background: "rgba(129,140,248,0.08)", border: "1px solid rgba(129,140,248,0.2)" }}>
                <span style={{ fontFamily: P.mono, fontSize: 8.5, color: "#818CF8", opacity: 0.9 }}>{profN} proficient</span>
              </div>
            )}
            {familiarN > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", background: "rgba(252,211,77,0.08)", border: "1px solid rgba(252,211,77,0.2)" }}>
                <span style={{ fontFamily: P.mono, fontSize: 8.5, color: "#FCD34D", opacity: 0.9 }}>{familiarN} familiar</span>
              </div>
            )}
          </div>

          {/* Panel search */}
          {cat.skills.length > 5 && (
            <div style={{ marginTop: 14, position: "relative", display: "flex", alignItems: "center", gap: 8 }}>
              <FiSearch size={12} color="rgba(255,255,255,0.25)" style={{ position: "absolute", left: 10 }} />
              <input
                value={panelSearch}
                onChange={(e) => setPanelSearch(e.target.value)}
                placeholder={`Filter ${cat.label} skills…`}
                style={{
                  width: "100%", paddingLeft: 30, paddingRight: 10, height: 32,
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${P.border}`,
                  fontFamily: P.mono, fontSize: 10.5, color: P.cream, outline: "none",
                  caretColor: cat.color,
                }}
              />
            </div>
          )}
        </div>

        {/* Skills grid — scrollable */}
        <div style={{
          overflowY: "auto", padding: "20px 28px 24px",
          flex: 1,
        }}>
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ fontFamily: P.mono, fontSize: 10, color: P.cream, opacity: 0.3, textAlign: "center", padding: "24px 0" }}
              >
                No skills match "{panelSearch}"
              </motion.p>
            ) : (
              <motion.div
                key="grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))",
                  gap: 8,
                }}
              >
                {filtered.map((skill, i) => {
                  const Icon = skill.icon ?? FiCode;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3, ease: EASE }}
                      style={{
                        padding: "12px 14px",
                        background: `${cat.color}08`,
                        border: `1px solid ${cat.color}18`,
                        display: "flex", flexDirection: "column", gap: 8,
                        position: "relative", overflow: "hidden",
                      }}
                    >
                      {/* Subtle corner accent for expert */}
                      {skill.level === "expert" && (
                        <div style={{
                          position: "absolute", top: 0, right: 0,
                          width: 0, height: 0,
                          borderStyle: "solid",
                          borderWidth: "0 14px 14px 0",
                          borderColor: `transparent ${cat.color}60 transparent transparent`,
                        }} />
                      )}
                      <Icon size={16} color={cat.color} />
                      <p style={{ fontFamily: P.mono, fontSize: 11, color: P.cream, opacity: 0.85, lineHeight: 1.3 }}>
                        {skill.name}
                      </p>
                      {skill.level && <ProficiencyBar level={skill.level} color={cat.color} />}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div style={{
          borderTop: `1px solid ${P.border}`,
          padding: "10px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: P.mono, fontSize: 8.5, letterSpacing: "0.16em", textTransform: "uppercase", color: P.cream, opacity: 0.18 }}>
            {panelSearch ? `${filtered.length} of ${cat.skills.length}` : `${cat.skills.length} skills`}
          </span>
          <button
            onClick={onClose}
            style={{
              background: "transparent", border: `1px solid ${P.border}`,
              fontFamily: P.mono, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
              color: P.cream, opacity: 0.35, cursor: "pointer", padding: "4px 10px",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
          >
            ESC · Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Marquee Tile ─────────────────────────────────────────────────────────────

function MarqueeTile({
  cat, onClick, onHoverChange,
}: {
  cat: Category; onClick: () => void; onHoverChange: (h: boolean) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = cat.filterIcon;
  const expertCount = cat.skills.filter(s => s.level === "expert").length;

  const setH = (v: boolean) => { setHovered(v); onHoverChange(v); };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        flexShrink: 0,
        width: 178, height: 62,
        margin: "0 6px",
        background: hovered ? `${cat.color}14` : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? cat.color + "50" : P.border}`,
        display: "flex", alignItems: "center", gap: 10,
        padding: "0 14px",
        cursor: "pointer",
        position: "relative", overflow: "hidden",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "background 0.18s, border-color 0.18s, transform 0.2s, box-shadow 0.2s",
        boxShadow: hovered ? `0 8px 24px ${cat.color}18` : "none",
      }}
    >
      {hovered && (
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 20% 50%, ${cat.glowColor}, transparent 65%)`,
          pointerEvents: "none",
        }} />
      )}

      {/* Top highlight line */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 1, background: cat.color, transformOrigin: "left",
        }}
        transition={{ duration: 0.22 }}
      />

      <div style={{
        width: 32, height: 32, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hovered ? `${cat.color}18` : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? cat.color + "35" : P.border}`,
        transition: "background 0.18s, border-color 0.18s",
      }}>
        <Icon size={14} color={hovered ? cat.color : "rgba(255,255,255,0.4)"} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 3, position: "relative", minWidth: 0 }}>
        <span style={{
          fontFamily: P.mono, fontSize: 10.5, letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: hovered ? cat.color : "rgba(255,255,255,0.5)",
          whiteSpace: "nowrap",
          transition: "color 0.18s",
        }}>
          {cat.label}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{
            fontFamily: P.mono, fontSize: 8.5,
            color: P.cream, opacity: hovered ? 0.4 : 0.2,
            whiteSpace: "nowrap",
          }}>
            {cat.skills.length} skills
          </span>
          {expertCount > 0 && (
            <span style={{
              fontFamily: P.mono, fontSize: 8,
              color: "#6EE7B7", opacity: hovered ? 0.7 : 0.3,
              whiteSpace: "nowrap",
            }}>
              · {expertCount} expert
            </span>
          )}
        </div>
      </div>

      <FiChevronRight
        size={11}
        style={{
          marginLeft: "auto", flexShrink: 0,
          color: cat.color,
          opacity: hovered ? 0.7 : 0,
          transition: "opacity 0.18s",
          position: "relative",
        }}
      />
    </button>
  );
}

// ─── Marquee Row ──────────────────────────────────────────────────────────────

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
        maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        style={{
          display: "flex", width: "max-content",
          transform: `translateX(${xPercent}%)`,
        }}
      >
        {[0, 1].map((dup) => (
          <div key={dup} style={{ display: "flex" }} aria-hidden={dup === 1 ? true : undefined}>
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

// ─── Category Grid (filterable index) ────────────────────────────────────────

function CategoryGrid({
  query, onOpen,
}: {
  query: string;
  onOpen: (cat: Category) => void;
}) {
  const filtered = useMemo(() => {
    if (!query.trim()) return categories;
    const q = query.toLowerCase();
    return categories.filter(c =>
      c.label.toLowerCase().includes(q) ||
      c.skills.some(s => s.name.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={query ? "filtered" : "all"}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
          gap: 1,
          borderTop: `1px solid ${P.border}`,
        }}
      >
        {filtered.map((cat, i) => {
          const Icon = cat.filterIcon;
          const matchedSkills = query.trim()
            ? cat.skills.filter(s => s.name.toLowerCase().includes(query.toLowerCase()))
            : [];

          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ delay: i * 0.02, duration: 0.25, ease: EASE }}
              onClick={() => onOpen(cat)}
              style={{
                background: "transparent", border: "none",
                borderBottom: `1px solid ${P.border}`, borderRight: `1px solid ${P.border}`,
                padding: "13px 16px",
                display: "flex", alignItems: "center", gap: 10,
                cursor: "pointer", textAlign: "left",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${cat.color}08`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <Icon size={12} color={cat.color} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{
                  fontFamily: P.mono, fontSize: 10, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: P.cream, opacity: 0.55,
                  display: "block",
                }}>
                  {cat.label}
                </span>
                {matchedSkills.length > 0 && (
                  <span style={{
                    fontFamily: P.mono, fontSize: 8.5, color: cat.color, opacity: 0.7,
                    display: "block", marginTop: 2,
                  }}>
                    {matchedSkills.map(s => s.name).slice(0, 2).join(", ")}
                    {matchedSkills.length > 2 && ` +${matchedSkills.length - 2}`}
                  </span>
                )}
              </div>
              <span style={{
                fontFamily: P.mono, fontSize: 9, color: cat.color, opacity: 0.45, flexShrink: 0,
              }}>
                {cat.skills.length}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Skills Section ──────────────────────────────────────────────────────

const Skills = () => {
  const [selected, setSelected] = useState<Category | null>(null);
  const [paused,   setPaused]   = useState(false);
  const [search,   setSearch]   = useState("");
  const shouldReduceMotion = useReducedMotion();

  const handleOpen  = useCallback((cat: Category) => { setSelected(cat); setPaused(true);  }, []);
  const handleClose = useCallback(() =>               { setSelected(null); setPaused(false); }, []);
  const clearSearch = useCallback(() => setSearch(""), []);

  return (
    <section id="skills" style={{ padding: "120px 0", background: P.bg, color: P.cream }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        <SectionHeading
          index="02"
          eyebrow="Capabilities"
          title={<>The tools I shape <em className="italic gradient-text">ideas</em> with.</>}
          description="A broad engineering stack — from frontend interfaces to mobile apps, data analysis, and cloud-ready backends."
        />

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}
        >
          <StatPill value={totalSkills} label="Total Skills"     color="#818CF8" />
          <StatPill value={categories.length} label="Domains"   color="#6EE7B7" />
          <StatPill value={expertCount} label="Expert Level"     color="#FCD34D" />
          <StatPill value="6+"          label="Years Building"   color="#C4B5FD" />
        </motion.div>

        {/* ── Search + Legend row ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 16, marginBottom: 24, flexWrap: "wrap",
        }}>
          <SearchBar value={search} onChange={setSearch} onClear={clearSearch} />
          <LevelLegend />
        </div>

        {/* ── Marquee (hidden when searching) ── */}
        <AnimatePresence>
          {!search && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                style={{
                  display: "flex", flexDirection: "column", gap: 14,
                  padding: "20px 0 28px",
                }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => !selected && setPaused(false)}
              >
                {ROWS.map((row, i) => (
                  <MarqueeRow
                    key={i}
                    catIds={row.catIds}
                    duration={shouldReduceMotion ? 99999 : row.duration}
                    direction={row.direction}
                    maxWidth={row.maxWidth}
                    globalPaused={paused}
                    onNodeClick={handleOpen}
                  />
                ))}
              </div>

              <p style={{
                textAlign: "center", fontFamily: P.mono, fontSize: 8.5,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: P.cream, opacity: 0.16, marginBottom: 32,
                pointerEvents: "none",
              }}>
                {paused ? "click a tile to explore" : "hover to pause · click to explore"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Category index (filterable) ── */}
        <CategoryGrid query={search} onOpen={handleOpen} />

        {/* ── Footer stat ── */}
        <div style={{ marginTop: 40, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <span style={{ height: 1, width: 48, background: P.border }} />
          <p style={{ fontFamily: P.mono, fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: P.cream, opacity: 0.18 }}>
            {totalSkills} skills · {categories.length} domains
          </p>
          <span style={{ height: 1, width: 48, background: P.border }} />
        </div>
      </div>

      {/* ── Detail panel ── */}
      <AnimatePresence>
        {selected && <SkillPanel cat={selected} onClose={handleClose} />}
      </AnimatePresence>
    </section>
  );
};

export default Skills;
