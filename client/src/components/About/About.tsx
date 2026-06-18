import { motion, useReducedMotion } from "framer-motion";
import { FiMapPin, FiCalendar, FiStar } from "react-icons/fi";
import { SectionHeading } from "./SectionHeading";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  current?: boolean;
  highlights: string[];
  achievements?: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const experiences: Experience[] = [
  {
    period: "2026 — Present", // ← replace with real start date
    role: "Full Stack Developer",
    company: "Astute Business Partners",
    location: "Sri Lanka",
    current: true,
    highlights: [
      "Designed, developed, and maintained web applications using modern front-end and back-end technologies.",
      "Built responsive user interfaces with HTML, CSS, JavaScript, React.js, and Bootstrap.",
      "Developed RESTful APIs and backend services using Node.js, Express.js, and related technologies.",
      "Managed and optimized databases including MySQL, PostgreSQL, and MongoDB.",
      "Implemented authentication, authorization, and security best practices to protect application data.",
      "Integrated third-party APIs and services to enhance application functionality.",
      "Participated in Agile/Scrum processes including sprint planning, daily stand-ups, and retrospectives.",
      "Collaborated with cross-functional teams to gather requirements and deliver business-aligned solutions.",
    ],
    achievements: [
      "Successfully delivered multiple web-based projects within deadline.",
      "Improved application performance and user experience through targeted code optimization.",
      "Automated business processes, reducing manual effort and increasing operational efficiency.",
      "Contributed to scalable and maintainable software architecture across the product suite.",
    ],
  },
  {
    period: "2025 — 2026",
    role: "Intern Software Engineer",
    company: "icieos (Pvt) Ltd",
    location: "Sri Lanka",
    highlights: [
      "Worked across React.js, Node.js, Express.js, MongoDB, REST APIs, and Git-based workflows.",
      "Contributed to Course Pivot — a full-stack educational platform for online learning management and secure transactions.",
      "Developed admin dashboards with realtime analytics, user management systems, and financial transaction tracking.",
      "Implemented secure payment portal integrations and scalable backend modules.",
      "Contributed to service marketplace systems and performance evaluation platforms with role-based dashboards.",
      "Optimized frontend and backend workflows while maintaining scalability across multi-user environments.",
    ],
  },
  {
    period: "July 2024 — January 2025",
    role: "Junior Full-Stack Engineer",
    company: "DMS Software Technologies PVT LTD",
    location: "Sri Lanka",
    highlights: [
      "Contributed to enterprise-level Sri Lanka Railways systems using Oracle Forms, Reports, and PL/SQL.",
      "Participated in requirements gathering sessions and UI/UX design reviews with stakeholders.",
      "Developed backend inventory and procurement management modules.",
      "Worked through complete SDLC phases from analysis to deployment.",
      "Collaborated on the NKAR Tour Guide platform focused on tourism-oriented UI/UX experiences.",
      "Prepared technical documentation and knowledge transfer materials for long-term maintainability.",
    ],
  },
];

// ─── Sidebar stats ────────────────────────────────────────────────────────────

const sidebarStats = [
  { label: "Focus", value: "Full Stack Engineering" },
  { label: "Stack", value: "MERN · FastAPI" },
  { label: "Languages", value: "TS · Python · Java" },
  { label: "Status", value: "Available" },
];

// ─── Design tokens ────────────────────────────────────────────────────────────
// Centralised so the indigo accent palette only needs to change in one place.

const ACCENT = "#6366F1";
const ACCENT_LIGHT = "#818CF8"; // company labels, achievement heading
const ACCENT_LIGHTEST = "#A5B4FC"; // "Current" badge text

const GLOW_SM = "0 0 5px rgba(99,102,241,1)";
const GLOW_MD = "0 0 6px rgba(99,102,241,0.6)";
const GLOW_LG = "0 0 8px rgba(99,102,241,0.7)";

const BORDER_ACCENT = "rgba(99,102,241,0.25)"; // current-role card, resting
const BORDER_ACCENT_HOVER = "rgba(99,102,241,0.35)"; // hover state, all cards
const BORDER_ACCENT_SOFT = "rgba(99,102,241,0.15)"; // achievements box
const BORDER_ACCENT_BADGE = "rgba(99,102,241,0.3)"; // "Current" badge
const BG_ACCENT = "rgba(99,102,241,0.05)"; // current-role card fill
const BG_ACCENT_SOFT = "rgba(99,102,241,0.07)"; // achievements fill + ambient glow
const BG_ACCENT_BADGE = "rgba(99,102,241,0.12)"; // "Current" badge fill
const SHADOW_ACCENT_HOVER = "0 12px 48px rgba(99,102,241,0.08)";
const DOT_BULLET_INACTIVE = "rgba(99,102,241,0.35)";
const DOT_TIMELINE_INACTIVE = "rgba(99,102,241,0.4)";

const HAIRLINE = "rgba(255,255,255,0.07)";
const HAIRLINE_SOFT = "rgba(255,255,255,0.05)";
const BORDER_RAIL = "rgba(255,255,255,0.08)"; // timeline spine
const SURFACE = "rgba(255,255,255,0.03)"; // sidebar card
const SURFACE_SOFT = "rgba(255,255,255,0.025)"; // non-current card
const BORDER_NEUTRAL = "rgba(255,255,255,0.06)"; // non-current card

// ─── Animation helpers ────────────────────────────────────────────────────────
// Every helper accepts a `reduced` flag so the whole timeline can collapse to
// simple opacity fades when the user has requested less motion.

const fadeUp = (delay = 0, reduced = false) => ({
  initial: reduced ? { opacity: 0 } : { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: reduced ? 0.3 : 0.75,
    delay: reduced ? 0 : delay,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

const slideIn = (delay = 0, reduced = false) => ({
  initial: reduced ? { opacity: 0 } : { opacity: 0, x: 32 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: {
    duration: reduced ? 0.3 : 0.7,
    delay: reduced ? 0 : delay,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

// Small cascading reveal used for list items inside an already-visible card.
const revealItem = (index: number, reduced = false) => ({
  initial: reduced ? { opacity: 0 } : { opacity: 0, y: 6 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: reduced ? 0.2 : 0.35,
    delay: reduced ? 0 : Math.min(index * 0.05, 0.3),
    ease: "easeOut" as const,
  },
});

// ─── Sub-components ───────────────────────────────────────────────────────────

function Bullet({ active = false }: { active?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="mt-1.75 flex h-1.75 w-1.75 shrink-0 rounded-full"
      style={{
        background: active ? ACCENT : DOT_BULLET_INACTIVE,
        boxShadow: active ? GLOW_MD : "none",
      }}
    />
  );
}

function TimelineDot({
  active = false,
  reducedMotion = false,
}: {
  active?: boolean;
  reducedMotion?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className="absolute -left-6.5 top-6 flex h-3 w-3 items-center justify-center sm:-left-9.5 sm:top-7"
    >
      {active && !reducedMotion && (
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"
          style={{ background: ACCENT }}
        />
      )}
      <span
        className="relative inline-flex h-3 w-3 rounded-full"
        style={{
          background: active ? ACCENT : DOT_TIMELINE_INACTIVE,
          boxShadow: active ? GLOW_LG : "none",
        }}
      />
    </span>
  );
}

function CurrentBadge() {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em]"
      style={{
        background: BG_ACCENT_BADGE,
        border: `1px solid ${BORDER_ACCENT_BADGE}`,
        color: ACCENT_LIGHTEST,
      }}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: ACCENT, boxShadow: GLOW_SM }}
      />
      Current
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const About = () => {
  // Collapses every animation in this section to a simple fade when the user
  // has "Reduce motion" enabled at the OS/browser level.
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 lg:py-32"
      style={{ background: "#0A0A0F" }}
    >
      {/* Faint ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-100 w-150 -translate-x-1/2"
        style={{
          background: `radial-gradient(ellipse at center, ${BG_ACCENT_SOFT} 0%, transparent 70%)`,
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <SectionHeading
          index="01"
          eyebrow="Experience"
          title={
            <>
              Engineering products with{" "}
              <em className="italic text-gradient">precision</em> and
              scalability.
            </>
          }
          description="Full-stack software engineer with hands-on experience building enterprise systems, MERN platforms, scalable APIs, and production-ready interfaces across modern web stacks."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* ── Sidebar ── */}
          <motion.div
            {...fadeUp(0.05, reducedMotion)}
            className="lg:col-span-4"
          >
            <div
              className="rounded-2xl p-6 sm:p-8 lg:sticky lg:top-28"
              style={{
                background: SURFACE,
                border: `1px solid ${HAIRLINE}`,
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Quote */}
              <p
                className="text-[10px] uppercase tracking-[0.28em]"
                style={{ color: ACCENT }}
              >
                Philosophy
              </p>

              <p className="mt-5 text-xl font-semibold leading-snug text-white sm:text-2xl">
                "Software is not only engineering — it is clarity, structure,
                and experience."
              </p>

              <hr
                aria-hidden="true"
                className="my-6 border-none sm:my-7"
                style={{ height: "1px", background: HAIRLINE }}
              />

              {/* Stats */}
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
                {sidebarStats.map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                      {label}
                    </dt>
                    <dd className="mt-1.5 font-medium text-white/90">
                      {value === "Available" ? (
                        <span className="flex items-center gap-2">
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: ACCENT, boxShadow: GLOW_SM }}
                          />
                          {value}
                        </span>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Year count */}
              <hr
                aria-hidden="true"
                className="my-6 border-none sm:my-7"
                style={{ height: "1px", background: HAIRLINE }}
              />

              <div className="flex items-end justify-between">
                <div>
                  <p
                    className="font-display text-4xl font-black sm:text-5xl"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      color: ACCENT,
                    }}
                  >
                    3+
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Years building
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className="font-display text-4xl font-black sm:text-5xl"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      color: ACCENT,
                    }}
                  >
                    3
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Companies
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Timeline ── */}
          <div className="lg:col-span-8">
            <ol
              aria-label="Work experience timeline, most recent first"
              className="relative space-y-8 pl-5 sm:pl-8"
              style={{ borderLeft: `1px solid ${BORDER_RAIL}` }}
            >
              {experiences.map((item, i) => {
                const cardBorder = item.current ? BORDER_ACCENT : BORDER_NEUTRAL;
                const cardBg = item.current ? BG_ACCENT : SURFACE_SOFT;

                return (
                  <motion.li
                    key={`${item.role}-${item.company}`}
                    {...slideIn(i * 0.1, reducedMotion)}
                    className="relative"
                  >
                    <TimelineDot active={item.current} reducedMotion={reducedMotion} />

                    {/* Card — hover state is driven by Framer Motion instead of
                        manual DOM mutation, so it stays in sync with React and
                        respects the reduced-motion setting automatically. */}
                    <motion.div
                      className="rounded-2xl p-5 sm:p-7"
                      style={{
                        background: cardBg,
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: cardBorder,
                        backdropFilter: "blur(10px)",
                      }}
                      whileHover={{
                        borderColor: BORDER_ACCENT_HOVER,
                        boxShadow: SHADOW_ACCENT_HOVER,
                      }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      {/* Header */}
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-lg font-semibold text-white sm:text-xl">
                              {item.role}
                            </h3>
                            {item.current && <CurrentBadge />}
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em]">
                            <span style={{ color: ACCENT_LIGHT }}>{item.company}</span>
                            <span className="flex items-center gap-1 text-white/40">
                              <FiMapPin aria-hidden="true" size={10} />
                              {item.location}
                            </span>
                          </div>
                        </div>

                        <span className="flex shrink-0 items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-white/40">
                          <FiCalendar aria-hidden="true" size={11} />
                          {item.period}
                        </span>
                      </div>

                      {/* Divider */}
                      <hr
                        aria-hidden="true"
                        className="my-5 border-none"
                        style={{ height: "1px", background: HAIRLINE_SOFT }}
                      />

                      {/* Highlights */}
                      <ul className="space-y-3">
                        {item.highlights.map((point, idx) => (
                          <motion.li
                            key={point}
                            {...revealItem(idx, reducedMotion)}
                            className="flex items-start gap-3"
                          >
                            <Bullet active={item.current} />
                            <p className="text-sm leading-relaxed text-white/65">
                              {point}
                            </p>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Key Achievements — only if present */}
                      {item.achievements && item.achievements.length > 0 && (
                        <div
                          className="mt-6 rounded-xl p-4 sm:p-5"
                          style={{
                            background: BG_ACCENT_SOFT,
                            border: `1px solid ${BORDER_ACCENT_SOFT}`,
                          }}
                        >
                          <p
                            className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em]"
                            style={{ color: ACCENT_LIGHT }}
                          >
                            <FiStar aria-hidden="true" size={11} />
                            Key achievements
                          </p>

                          <ul className="space-y-2.5">
                            {item.achievements.map((a, idx) => (
                              <motion.li
                                key={a}
                                {...revealItem(idx, reducedMotion)}
                                className="flex items-start gap-3"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-1.75 h-1.25 w-1.25 shrink-0 rounded-full"
                                  style={{ background: ACCENT }}
                                />
                                <p className="text-sm leading-relaxed text-white/75">
                                  {a}
                                </p>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  </motion.li>
                );
              })}

              {/* Timeline cap */}
              <li className="relative pl-1 pt-2">
                <span
                  aria-hidden="true"
                  className="absolute -left-1.25 top-3 h-2.5 w-2.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                />
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/30">
                  Career start
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;