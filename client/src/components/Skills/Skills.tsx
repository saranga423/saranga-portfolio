import { useState } from "react";
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
  FiChevronDown, FiChevronUp, FiGrid, FiList, FiCloud, FiCpu,
} from "react-icons/fi";

// ─── Types ────────────────────────────────────────────────────────────────────

// Broad icon type that covers both react-icons/si and react-icons/fi
type IconComponent = React.ComponentType<{
  className?: string;
  size?: number;
  color?: string;
}>;

type Skill = {
  icon?: IconComponent;
  name: string;
  level?: "expert" | "proficient" | "familiar";
};

type Category = {
  id: string;
  label: string;
  filterIcon: IconComponent;
  color: string;
  glowColor: string;
  skills: Skill[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories: Category[] = [
  {
    id: "languages",
    label: "Programming Languages",
    filterIcon: FiCode,
    color: "#818CF8",
    glowColor: "rgba(129,140,248,0.12)",
    skills: [
      { icon: SiJavascript, name: "JavaScript", level: "expert"     },
      { icon: SiPython,     name: "Python",     level: "proficient" },
      { icon: SiKotlin,     name: "Kotlin",     level: "proficient" },
      { icon: SiPhp,        name: "PHP",        level: "familiar"   },
      { icon: FiCode,       name: "Java",       level: "proficient" },
      { icon: FiCode,       name: "C / C++",    level: "familiar"   },
      { icon: FiCode,       name: "R",          level: "familiar"   },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    filterIcon: FiLayout,
    color: "#6EE7B7",
    glowColor: "rgba(110,231,183,0.10)",
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
    id: "backend",
    label: "Backend",
    filterIcon: FiServer,
    color: "#C4B5FD",
    glowColor: "rgba(196,181,253,0.10)",
    skills: [
      { icon: SiNodedotjs,  name: "Node.js",    level: "expert"     },
      { icon: FiServer,     name: "Express.js", level: "expert"     },
      { icon: SiSpringboot, name: "Spring Boot",level: "proficient" },
      { icon: SiFastapi,    name: "FastAPI",    level: "proficient" },
    ],
  },
  {
    id: "database",
    label: "Databases",
    filterIcon: FiDatabase,
    color: "#FCA5A5",
    glowColor: "rgba(252,165,165,0.10)",
    skills: [
      { icon: SiMongodb,   name: "MongoDB",    level: "expert"     },
      { icon: SiMysql,     name: "MySQL",      level: "expert"     },
      { icon: FiDatabase,  name: "PostgreSQL", level: "proficient" },
      { icon: SiFirebase,  name: "Firebase",   level: "proficient" },
      { icon: FiDatabase,  name: "Oracle",     level: "proficient" },
      { icon: FiDatabase,  name: "PL/SQL",     level: "proficient" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    filterIcon: FiTool,
    color: "#FCD34D",
    glowColor: "rgba(252,211,77,0.10)",
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
      { icon: FiTool,         name: "Kanban",        level: "proficient" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    filterIcon: FiSmartphone,
    color: "#67E8F9",
    glowColor: "rgba(103,232,249,0.10)",
    skills: [
      { icon: SiAndroid,    name: "Android (Java)",   level: "proficient" },
      { icon: SiAndroid,    name: "Android Studio",   level: "proficient" },
      { icon: SiKotlin,     name: "Android (Kotlin)", level: "proficient" },
      { icon: SiFlutter,    name: "Flutter",          level: "familiar"   },
      { icon: SiReact,      name: "React Native",     level: "proficient" },
      { icon: SiRedux,      name: "Redux",            level: "proficient" },
      { icon: FiSmartphone, name: "Mobile UI/UX",     level: "proficient" },
    ],
  },
  {
    id: "data",
    label: "Data",
    filterIcon: FiBarChart2,
    color: "#86EFAC",
    glowColor: "rgba(134,239,172,0.10)",
    skills: [
      { icon: FiBarChart2,  name: "Power BI",    level: "proficient" },
      { icon: SiPython,     name: "Pandas",      level: "proficient" },
      { icon: SiPython,     name: "Matplotlib",  level: "familiar"   },
      { icon: FiBarChart2,  name: "Excel",       level: "proficient" },
    ],
  },
  {
    id: "design",
    label: "Design",
    filterIcon: FiPenTool,
    color: "#F9A8D4",
    glowColor: "rgba(249,168,212,0.10)",
    skills: [
      { icon: SiFigma,   name: "Figma",     level: "proficient" },
      { icon: SiCanva,   name: "Canva Pro", level: "expert"     },
      { icon: FiPenTool, name: "Balsamiq",  level: "familiar"   },
    ],
  },
  {
    id: "soft",
    label: "Soft Skills",
    filterIcon: FiUsers,
    color: "#A5B4FC",
    glowColor: "rgba(165,180,252,0.10)",
    skills: [
      { icon: FiUsers, name: "Leadership"         },
      { icon: FiUsers, name: "Strategic Planning" },
      { icon: FiUsers, name: "Critical Thinking"  },
      { icon: FiUsers, name: "Problem-solving"    },
      { icon: FiUsers, name: "Stress Management"  },
      { icon: FiUsers, name: "Flexibility"        },
    ],
  },
  {
    id: "testing",
    label: "Testing",
    filterIcon: FiCheckSquare,
    color: "#6EE7B7",
    glowColor: "rgba(110,231,183,0.10)",
    skills: [
      { icon: FiCheckSquare, name: "Manual Testing"          },
      { icon: FiCheckSquare, name: "Software Testing"        },
      { icon: SiSelenium,    name: "Selenium"                },
      { icon: FiCheckSquare, name: "Bug Tracking"            },
      { icon: FiCheckSquare, name: "User Acceptance Testing" },
      { icon: SiGit,         name: "Version Control"         },
    ],
  },
  {
    id: "ai",
    label: "AI / LLM Tools",
    filterIcon: FiCpu,
    color: "#67E8F9",
    glowColor: "rgba(103,232,249,0.12)",
    skills: [
      { icon: SiOpenai,        name: "ChatGPT",        level: "expert"     },
      { icon: SiClaude,        name: "Claude",         level: "expert"     },
      { icon: SiGithubcopilot, name: "GitHub Copilot", level: "proficient" },
      { icon: FiCpu,           name: "Cursor",         level: "proficient" },
      { icon: FiCpu,           name: "Prompt Engineering", level: "proficient" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    filterIcon: FiCloud,
    color: "#FCD34D",
    glowColor: "rgba(252,211,77,0.12)",
    skills: [
      { icon: FiCloud,        name: "AWS",               level: "familiar"   },
      { icon: FiCloud,        name: "Azure",             level: "familiar"   },
      { icon: SiGooglecloud,  name: "Google Cloud",      level: "familiar"   },
      { icon: SiVercel,       name: "Vercel",            level: "proficient" },
      { icon: SiNetlify,      name: "Netlify",           level: "proficient" },
      { icon: SiGithubactions,name: "GitHub Actions",    level: "familiar"   },
      { icon: SiDocker,       name: "Docker",            level: "proficient" },
      { icon: SiKubernetes,   name: "Kubernetes",        level: "familiar"   },
      { icon: SiTerraform,    name: "Terraform",         level: "familiar"   },
      { icon: FiCloud,        name: "CI/CD Pipelines",   level: "proficient" },
    ],
  },
];

const ALL_ID   = "all";
const PREVIEW  = 5; // cards shown before "Show more"

const LEVEL_META = {
  expert:     { label: "Expert",     dot: "#6EE7B7" },
  proficient: { label: "Proficient", dot: "#818CF8" },
  familiar:   { label: "Familiar",   dot: "#FCD34D" },
};

const totalSkills = categories.reduce((s, c) => s + c.skills.length, 0);

// ─── Skill card ───────────────────────────────────────────────────────────────

function SkillCard({
  skill, color, glowColor, index,
}: {
  skill: Skill; color: string; glowColor: string; index: number;
}) {
  const Icon = skill.icon ?? FiCode;
  const level = skill.level ? LEVEL_META[skill.level] : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0,  scale: 1     }}
      exit={{    opacity: 0, scale: 0.95          }}
      transition={{ duration: 0.38, delay: index * 0.025, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-xl p-4 cursor-default select-none"
      style={{
        background:     "rgba(255,255,255,0.025)",
        border:         "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.border    = `1px solid ${color}45`;
        el.style.boxShadow = `0 8px 28px ${glowColor}`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.border    = "1px solid rgba(255,255,255,0.07)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at top left, ${glowColor}, transparent 65%)` }}
      />

      {/* Icon box */}
      <div
        className="relative z-10 mb-3 flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${color}15`, border: `1px solid ${color}28` }}
      >
        <Icon size={17} color={color} />
      </div>

      {/* Name */}
      <p className="relative z-10 text-[13px] font-medium leading-snug text-white/85">
        {skill.name}
      </p>

      {/* Level badge */}
      {level && (
        <span
          className="relative z-10 mt-2 inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.2em]"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          <span
            className="h-1.25 w-1.25 rounded-full"
            style={{ background: level.dot, boxShadow: `0 0 4px ${level.dot}` }}
          />
          {level.label}
        </span>
      )}
    </motion.div>
  );
}

// ─── Category accordion panel ─────────────────────────────────────────────────

function CategoryPanel({ cat }: { cat: Category }) {
  const [expanded, setExpanded] = useState(false);
  const CatIcon = cat.filterIcon;
  const visible = expanded ? cat.skills : cat.skills.slice(0, PREVIEW);
  const hasMore = cat.skills.length > PREVIEW;

  return (
    <div>
      {/* Header row */}
      <div className="mb-3 flex items-center gap-3">
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
          style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}28` }}
        >
          <CatIcon size={13} color={cat.color} />
        </div>

        <p
          className="text-[11px] font-semibold uppercase tracking-[0.24em]"
          style={{ color: cat.color }}
        >
          {cat.label}
        </p>

        <span className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />

        <span
          className="text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          {cat.skills.length}
        </span>
      </div>

      {/* Cards */}
      <motion.div layout className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <AnimatePresence initial={false}>
          {visible.map((skill, i) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              color={cat.color}
              glowColor={cat.glowColor}
              index={i}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Show more / less */}
      {hasMore && (
        <motion.button
          layout
          onClick={() => setExpanded((p) => !p)}
          className="mt-3 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] transition-colors duration-200"
          style={{ color: "rgba(255,255,255,0.28)" }}
          whileHover={{ color: cat.color } as never}
        >
          {expanded ? (
            <><FiChevronUp size={11} /> Show less</>
          ) : (
            <><FiChevronDown size={11} /> {cat.skills.length - PREVIEW} more</>
          )}
        </motion.button>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

type ViewMode = "grid" | "compact";

const Skills = () => {
  const [active,   setActive]   = useState<string>(ALL_ID);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const visibleCategories =
    active === ALL_ID
      ? categories
      : categories.filter((c) => c.id === active);

  return (
    <section
      id="skills"
      className="relative py-28"
      style={{ background: "#0A0A0F" }}
    >
      {/* Ambient blob */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-100 w-175 -translate-x-1/2"
        style={{
          background: "radial-gradient(ellipse at center, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <SectionHeading
          index="02"
          eyebrow="Capabilities"
          title={
            <>
              The tools I shape{" "}
              <em className="italic text-gradient">ideas</em> with.
            </>
          }
          description="A broad engineering stack — from frontend interfaces to mobile apps, data analysis, and cloud-ready backends — chosen for scalability, clarity, and production-grade delivery."
        />

        {/* ── Toolbar: filter tabs + view toggle ── */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {/* All */}
            <button
              onClick={() => setActive(ALL_ID)}
              className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] transition-all duration-200"
              style={
                active === ALL_ID
                  ? { background: "#6366F1", color: "#fff", border: "1px solid #6366F1" }
                  : { background: "transparent", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.09)" }
              }
            >
              All
              <span
                className="rounded-full px-1.5 py-px text-[9px]"
                style={{ background: active === ALL_ID ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.07)" }}
              >
                {totalSkills}
              </span>
            </button>

            {/* Per-category */}
            {categories.map((cat) => {
              const TabIcon = cat.filterIcon;
              const on = active === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(on ? ALL_ID : cat.id)}
                  className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] transition-all duration-200"
                  style={
                    on
                      ? { background: `${cat.color}18`, color: cat.color, border: `1px solid ${cat.color}50` }
                      : { background: "transparent", color: "rgba(255,255,255,0.38)", border: "1px solid rgba(255,255,255,0.08)" }
                  }
                >
                  <TabIcon size={10} color={on ? cat.color : undefined} />
                  {cat.label}
                  <span
                    className="rounded-full px-1.5 py-px text-[9px]"
                    style={{
                      background: on ? `${cat.color}22` : "rgba(255,255,255,0.06)",
                      color:      on ? cat.color : "rgba(255,255,255,0.28)",
                    }}
                  >
                    {cat.skills.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View mode toggle */}
          <div
            className="flex items-center gap-1 rounded-lg p-1"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {(["grid", "compact"] as ViewMode[]).map((mode) => {
              const Icon = mode === "grid" ? FiGrid : FiList;
              const on   = viewMode === mode;
              return (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className="flex h-7 w-7 items-center justify-center rounded-md transition-all duration-200"
                  style={
                    on
                      ? { background: "#6366F1", color: "#fff" }
                      : { background: "transparent", color: "rgba(255,255,255,0.35)" }
                  }
                  title={mode === "grid" ? "Card view" : "Compact view"}
                >
                  <Icon size={13} />
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Legend ── */}
        <div className="mb-8 flex flex-wrap items-center gap-5">
          {Object.entries(LEVEL_META).map(([, v]) => (
            <span key={v.label} className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.3)" }}>
              <span className="h-1.25 w-1.25 rounded-full" style={{ background: v.dot }} />
              {v.label}
            </span>
          ))}
        </div>

        {/* ── Content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active + viewMode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{    opacity: 0       }}
            transition={{ duration: 0.22 }}
          >
            {/* GRID VIEW — accordion panels per category */}
            {viewMode === "grid" && (
              <div className="space-y-10">
                {visibleCategories.map((cat) => (
                  <CategoryPanel key={cat.id} cat={cat} />
                ))}
              </div>
            )}

            {/* COMPACT VIEW — flat tag cloud grouped by category */}
            {viewMode === "compact" && (
              <div className="space-y-6">
                {visibleCategories.map((cat) => {
                  const CatIcon = cat.filterIcon;
                  return (
                    <div key={cat.id}>
                      <div className="mb-3 flex items-center gap-2">
                        <CatIcon size={11} color={cat.color} />
                        <p
                          className="text-[10px] font-semibold uppercase tracking-[0.24em]"
                          style={{ color: cat.color }}
                        >
                          {cat.label}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill) => {
                          const level = skill.level ? LEVEL_META[skill.level] : null;
                          return (
                            <motion.span
                              key={skill.name}
                              layout
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1   }}
                              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium"
                              style={{
                                background: `${cat.color}0E`,
                                border:     `1px solid ${cat.color}25`,
                                color:      "rgba(255,255,255,0.75)",
                              }}
                            >
                              {level && (
                                <span
                                  className="h-1.25 w-1.25 shrink-0 rounded-full"
                                  style={{ background: level.dot }}
                                />
                              )}
                              {skill.name}
                            </motion.span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Footer stat ── */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <span className="h-px w-14" style={{ background: "rgba(255,255,255,0.07)" }} />
          <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.2)" }}>
            {totalSkills} skills · {categories.length} domains
          </p>
          <span className="h-px w-14" style={{ background: "rgba(255,255,255,0.07)" }} />
        </div>
      </div>
    </section>
  );
};

export default Skills;