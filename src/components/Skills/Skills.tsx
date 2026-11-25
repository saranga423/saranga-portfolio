import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  FiArrowUpRight,
  FiZap,
} from "react-icons/fi";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type IconComponent = React.ComponentType<{ size?: number; color?: string; className?: string }>;
type SkillLevel = "expert" | "proficient" | "familiar";

type Skill = {
  icon?: IconComponent;
  name: string;
  level?: SkillLevel;
};

type Category = {
  id: string;
  label: string;
  filterIcon: IconComponent;
  color: string;
  glowColor: string;
  skills: Skill[];
};

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

const LEVEL_META: Record<SkillLevel, { label: string; bar: number; color: string }> = {
  expert: { label: "Expert", bar: 100, color: "#6EE7B7" },
  proficient: { label: "Proficient", bar: 68, color: "#818CF8" },
  familiar: { label: "Familiar", bar: 38, color: "#FCD34D" },
};

const totalSkills = categories.reduce((sum, category) => sum + category.skills.length, 0);
const expertCount = categories
  .flatMap((category) => category.skills)
  .filter((skill) => skill.level === "expert").length;

const ROWS = [
  { catIds: ["ai", "design"], duration: 34, direction: -1 as const },
  { catIds: ["languages", "frontend", "backend"], duration: 42, direction: 1 as const },
  { catIds: ["mobile", "data", "soft"], duration: 38, direction: -1 as const },
  { catIds: ["database", "tools", "cloud", "testing"], duration: 50, direction: 1 as const },
];

function ProficiencyBar({ level }: { level: SkillLevel }) {
  const meta = LEVEL_META[level];

  return (
    <div className="mt-3 flex items-center gap-2">
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${meta.bar}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="h-full rounded-full"
          style={{ background: meta.color }}
        />
      </div>
      <span
        className="font-mono text-[8px] uppercase tracking-[0.14em]"
        style={{ color: meta.color }}
      >
        {meta.label}
      </span>
    </div>
  );
}

function SearchBar({
  value,
  onChange,
  onClear,
}: {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "/") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <div className="group flex h-11 w-full max-w-sm items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3.5 transition-colors focus-within:border-primary/30 focus-within:bg-primary/[0.035]">
      <FiSearch
        className="shrink-0 text-white/25 transition-colors group-focus-within:text-primary/70"
        size={14}
      />
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search skills..."
        aria-label="Search skills"
        className="min-w-0 flex-1 bg-transparent font-mono text-[11px] text-white outline-none placeholder:text-white/20"
      />
      {value ? (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="rounded-md p-1 text-white/25 transition-colors hover:bg-white/5 hover:text-white/70"
        >
          <FiX size={12} />
        </button>
      ) : (
        <kbd className="hidden rounded-md border border-white/[0.07] bg-white/[0.04] px-1.5 py-1 font-mono text-[8px] text-white/20 sm:block">
          ⌘/
        </kbd>
      )}
    </div>
  );
}

function LevelLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {(["expert", "proficient", "familiar"] as SkillLevel[]).map((level) => (
        <div key={level} className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: LEVEL_META[level].color }}
          />
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">
            {LEVEL_META[level].label}
          </span>
        </div>
      ))}
    </div>
  );
}

function StatCard({
  value,
  label,
  accent,
}: {
  value: number | string;
  label: string;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5">
      <div className="font-mono text-xl font-semibold tracking-tight" style={{ color: accent }}>
        {value}
      </div>
      <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
        {label}
      </div>
    </div>
  );
}

function CategoryCard({
  category,
  index,
  onOpen,
}: {
  category: Category;
  index: number;
  onOpen: (category: Category) => void;
}) {
  const Icon = category.filterIcon;
  const expert = category.skills.filter((skill) => skill.level === "expert").length;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.035, duration: 0.55, ease: EASE }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onOpen(category)}
      className="group relative min-h-[158px] overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-left transition-colors hover:border-white/[0.14] hover:bg-white/[0.04]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: category.glowColor }}
      />

      <div className="relative flex items-start justify-between">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl border"
          style={{
            color: category.color,
            borderColor: `${category.color}28`,
            background: `${category.color}0d`,
          }}
        >
          <Icon size={17} />
        </span>

        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/15">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative mt-7">
        <h3 className="text-sm font-medium text-white/75 transition-colors group-hover:text-white">
          {category.label}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-mono text-[9px] text-white/25">
            {category.skills.length} skills
          </span>
          {expert > 0 && (
            <>
              <span className="text-white/10">·</span>
              <span className="font-mono text-[9px] text-emerald-300/50">
                {expert} expert
              </span>
            </>
          )}
        </div>
      </div>

      <FiArrowUpRight
        size={13}
        className="absolute bottom-5 right-5 text-white/15 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary/80"
      />
    </motion.button>
  );
}

function SkillPanel({
  category,
  onClose,
}: {
  category: Category;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const reduceMotion = Boolean(useReducedMotion());
  const Icon = category.filterIcon;

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const filtered = useMemo(
    () =>
      category.skills.filter((skill) =>
        skill.name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [category.skills, query]
  );

  const counts = {
    expert: category.skills.filter((skill) => skill.level === "expert").length,
    proficient: category.skills.filter((skill) => skill.level === "proficient").length,
    familiar: category.skills.filter((skill) => skill.level === "familiar").length,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[#05070b]/85 p-4 backdrop-blur-xl sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="skill-panel-title"
      onMouseDown={onClose}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: reduceMotion ? 0 : 22,
          scale: reduceMotion ? 1 : 0.97,
        }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{
          opacity: 0,
          y: reduceMotion ? 0 : 12,
          scale: reduceMotion ? 1 : 0.98,
        }}
        transition={{ duration: 0.3, ease: EASE }}
        onMouseDown={(event) => event.stopPropagation()}
        className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border bg-[#0b0e16] shadow-2xl"
        style={{ borderColor: `${category.color}30` }}
      >
        <div
          className="border-b border-white/[0.07] p-5 sm:p-6"
          style={{
            background: `linear-gradient(135deg, ${category.color}0d, transparent 55%)`,
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl border"
                style={{
                  color: category.color,
                  borderColor: `${category.color}30`,
                  background: `${category.color}12`,
                }}
              >
                <Icon size={20} />
              </div>
              <div>
                <p
                  className="font-mono text-[8px] uppercase tracking-[0.22em]"
                  style={{ color: category.color }}
                >
                  Skill domain
                </p>
                <h3 id="skill-panel-title" className="mt-1 text-xl font-semibold tracking-tight text-white">
                  {category.label}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close skill details"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/35 transition-colors hover:bg-white/[0.07] hover:text-white"
            >
              <FiX size={15} />
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {(["expert", "proficient", "familiar"] as SkillLevel[]).map((level) =>
              counts[level] ? (
                <span
                  key={level}
                  className="rounded-lg border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em]"
                  style={{
                    color: LEVEL_META[level].color,
                    borderColor: `${LEVEL_META[level].color}25`,
                    background: `${LEVEL_META[level].color}08`,
                  }}
                >
                  {counts[level]} {LEVEL_META[level].label.toLowerCase()}
                </span>
              ) : null
            )}
          </div>

          {category.skills.length > 5 && (
            <div className="relative mt-4">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
                size={12}
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Filter ${category.label} skills...`}
                autoFocus
                className="h-10 w-full rounded-lg border border-white/[0.08] bg-black/20 pl-9 pr-3 font-mono text-[10px] text-white outline-none placeholder:text-white/20 focus:border-white/15"
              />
            </div>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
          {filtered.length === 0 ? (
            <div className="py-14 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-white/25">
              No matching skills
            </div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {filtered.map((skill, index) => {
                const SkillIcon = skill.icon ?? FiCode;

                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reduceMotion ? 0 : index * 0.025,
                      duration: 0.3,
                    }}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-lg"
                        style={{
                          color: category.color,
                          background: `${category.color}0c`,
                        }}
                      >
                        <SkillIcon size={15} />
                      </span>
                      <span className="font-mono text-[10px] leading-4 text-white/65">
                        {skill.name}
                      </span>
                    </div>
                    {skill.level && <ProficiencyBar level={skill.level} />}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.07] px-5 py-3">
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/20">
            {query ? `${filtered.length} / ${category.skills.length} skills` : `${category.skills.length} skills`}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/30 transition-colors hover:text-white/70"
          >
            ESC · Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MarqueeTile({
  category,
  onOpen,
  reduceMotion,
}: {
  category: Category;
  onOpen: (category: Category) => void;
  reduceMotion: boolean;
}) {
  const Icon = category.filterIcon;

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(category)}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      className="group mx-1.5 flex h-16 w-[180px] shrink-0 items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 text-left transition-colors hover:border-white/[0.14] hover:bg-white/[0.045]"
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
        style={{
          color: category.color,
          borderColor: `${category.color}22`,
          background: `${category.color}09`,
        }}
      >
        <Icon size={14} />
      </span>
      <span className="min-w-0">
        <span className="block truncate font-mono text-[10px] uppercase tracking-[0.08em] text-white/50 transition-colors group-hover:text-white/80">
          {category.label}
        </span>
        <span className="mt-1 block font-mono text-[8px] text-white/20">
          {category.skills.length} skills
        </span>
      </span>
      <FiChevronRight
        className="ml-auto shrink-0 text-white/10 transition-colors group-hover:text-primary/60"
        size={12}
      />
    </motion.button>
  );
}

function MarqueeRow({
  catIds,
  duration,
  direction,
  paused,
  onOpen,
  reduceMotion,
}: {
  catIds: string[];
  duration: number;
  direction: 1 | -1;
  paused: boolean;
  onOpen: (category: Category) => void;
  reduceMotion: boolean;
}) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  const rowCategories = catIds
    .map((id) => categories.find((category) => category.id === id))
    .filter((category): category is Category => Boolean(category));

  useEffect(() => {
    if (paused || reduceMotion) {
      lastRef.current = null;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      return;
    }

    const tick = (timestamp: number) => {
      if (lastRef.current !== null) {
        const delta = timestamp - lastRef.current;
        setProgress((current) => (current + delta / (duration * 1000)) % 1);
      }
      lastRef.current = timestamp;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, paused, reduceMotion]);

  const x = direction === 1 ? -progress * 50 : -50 + progress * 50;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="flex w-max" style={{ transform: `translateX(${x}%)` }}>
        {[0, 1].map((duplicate) => (
          <div key={duplicate} className="flex" aria-hidden={duplicate === 1}>
            {rowCategories.map((category) => (
              <MarqueeTile
                key={`${duplicate}-${category.id}`}
                category={category}
                onOpen={onOpen}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const Skills = () => {
  const [selected, setSelected] = useState<Category | null>(null);
  const [paused, setPaused] = useState(false);
  const [search, setSearch] = useState("");
  const reduceMotion = Boolean(useReducedMotion());

  const openCategory = useCallback((category: Category) => {
    setSelected(category);
    setPaused(true);
  }, []);

  const closeCategory = useCallback(() => {
    setSelected(null);
    setPaused(false);
  }, []);

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return categories;

    return categories.filter(
      (category) =>
        category.label.toLowerCase().includes(query) ||
        category.skills.some((skill) => skill.name.toLowerCase().includes(query))
    );
  }, [search]);

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#07080d] py-24 text-foreground sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/[0.045] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Capabilities"
          title={
            <>
              The tools I shape <em className="gradient-text italic">ideas</em> with.
            </>
          }
          description="A practical engineering stack spanning product interfaces, APIs, data, mobile, cloud tooling, testing, and AI-assisted development."
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-10 grid grid-cols-2 gap-2 sm:grid-cols-4"
        >
          <StatCard value={totalSkills} label="Total skills" accent="#818CF8" />
          <StatCard value={categories.length} label="Skill domains" accent="#6EE7B7" />
          <StatCard value={expertCount} label="Expert level" accent="#FCD34D" />
          <StatCard value="6+" label="Years building" accent="#C4B5FD" />
        </motion.div>

        <div className="mb-5 flex flex-col gap-4 border-y border-white/[0.06] py-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar
            value={search}
            onChange={setSearch}
            onClear={() => setSearch("")}
          />
          <LevelLegend />
        </div>

        <AnimatePresence initial={false}>
          {!search && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-10 overflow-hidden"
            >
              <div
                className="space-y-2 py-4"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => !selected && setPaused(false)}
              >
                {ROWS.map((row, index) => (
                  <MarqueeRow
                    key={index}
                    catIds={row.catIds}
                    duration={row.duration}
                    direction={row.direction}
                    paused={paused}
                    onOpen={openCategory}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </div>

              <p className="text-center font-mono text-[8px] uppercase tracking-[0.22em] text-white/15">
                {reduceMotion
                  ? "Select a domain to explore"
                  : paused
                    ? "Click a domain to explore"
                    : "Hover to pause · click to explore"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/20">
            {search ? `Matching domains · ${filteredCategories.length}` : "Skill index"}
          </p>
          <span className="hidden font-mono text-[8px] uppercase tracking-[0.16em] text-white/15 sm:block">
            Select a card for detail
          </span>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={search ? "filtered" : "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredCategories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
                onOpen={openCategory}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredCategories.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/[0.08] py-16 text-center">
            <FiSearch className="mx-auto mb-3 text-white/15" size={20} />
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/25">
              No skills match “{search}”
            </p>
          </div>
        )}

        <div className="mt-10 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-white/[0.07]" />
          <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-white/15">
            {totalSkills} skills · {categories.length} domains
          </p>
          <span className="h-px w-12 bg-white/[0.07]" />
        </div>
      </div>

      <AnimatePresence>
        {selected && <SkillPanel category={selected} onClose={closeCategory} />}
      </AnimatePresence>
    </section>
  );
};

export default Skills;
