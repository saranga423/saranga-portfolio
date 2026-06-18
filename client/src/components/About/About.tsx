import { motion } from "framer-motion";
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
  { label: "Focus",     value: "Full Stack Engineering" },
  { label: "Stack",     value: "MERN · FastAPI"         },
  { label: "Languages", value: "TS · Python · Java"     },
  { label: "Status",    value: "Available"              },
];

// ─── Animation helpers ────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true        },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const slideIn = (delay = 0) => ({
  initial:    { opacity: 0, x: 32 },
  whileInView:{ opacity: 1, x: 0  },
  viewport:   { once: true        },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

// ─── Sub-components ───────────────────────────────────────────────────────────

function Bullet({ active = false }: { active?: boolean }) {
  return (
    <span
      className="mt-[7px] flex h-[7px] w-[7px] shrink-0 rounded-full"
      style={{
        background: active ? "#6366F1" : "rgba(99,102,241,0.35)",
        boxShadow:  active ? "0 0 6px rgba(99,102,241,0.6)" : "none",
      }}
    />
  );
}

function TimelineDot({ active = false }: { active?: boolean }) {
  return (
    <span className="absolute -left-[38px] top-7 flex h-3 w-3 items-center justify-center">
      {active && (
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"
          style={{ background: "#6366F1" }}
        />
      )}
      <span
        className="relative inline-flex h-3 w-3 rounded-full"
        style={{
          background: active ? "#6366F1" : "rgba(99,102,241,0.4)",
          boxShadow:  active ? "0 0 8px rgba(99,102,241,0.7)" : "none",
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
        background: "rgba(99,102,241,0.12)",
        border:     "1px solid rgba(99,102,241,0.3)",
        color:      "#A5B4FC",
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: "#6366F1", boxShadow: "0 0 5px #6366F1" }}
      />
      Current
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const About = () => {
  return (
    <section
      id="about"
      className="relative py-32"
      style={{ background: "#0A0A0F" }}
    >
      {/* Faint ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[400px] w-[600px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.07) 0%, transparent 70%)",
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
          <motion.div {...fadeUp(0.05)} className="lg:col-span-4">
            <div
              className="sticky top-28 rounded-2xl p-8"
              style={{
                background: "rgba(255,255,255,0.03)",
                border:     "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Quote */}
              <p
                className="text-[10px] uppercase tracking-[0.28em]"
                style={{ color: "#6366F1" }}
              >
                Philosophy
              </p>

              <p className="mt-5 text-2xl font-semibold leading-snug text-white">
                "Software is not only engineering — it is clarity, structure,
                and experience."
              </p>

              <hr
                className="my-7 border-none"
                style={{ height: "1px", background: "rgba(255,255,255,0.07)" }}
              />

              {/* Stats */}
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
                {sidebarStats.map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-[11px] uppercase tracking-[0.2em] text-white/35">
                      {label}
                    </dt>
                    <dd className="mt-1.5 font-medium text-white/90">
                      {value === "Available" ? (
                        <span className="flex items-center gap-2">
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{
                              background: "#6366F1",
                              boxShadow: "0 0 5px #6366F1",
                            }}
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
                className="my-7 border-none"
                style={{ height: "1px", background: "rgba(255,255,255,0.07)" }}
              />

              <div className="flex items-end justify-between">
                <div>
                  <p
                    className="font-display text-5xl font-black"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      color: "#6366F1",
                    }}
                  >
                    3+
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/35">
                    Years building
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className="font-display text-5xl font-black"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      color: "#6366F1",
                    }}
                  >
                    3
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/35">
                    Companies
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Timeline ── */}
          <div className="lg:col-span-8">
            <ol
              className="relative space-y-8 pl-8"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}
            >
              {experiences.map((item, i) => (
                <motion.li
                  key={item.role + item.company}
                  {...slideIn(i * 0.1)}
                  className="group relative"
                >
                  <TimelineDot active={item.current} />

                  {/* Card */}
                  <div
                    className="rounded-2xl p-7 transition-all duration-500"
                    style={{
                      background: item.current
                        ? "rgba(99,102,241,0.05)"
                        : "rgba(255,255,255,0.025)",
                      border: item.current
                        ? "1px solid rgba(99,102,241,0.25)"
                        : "1px solid rgba(255,255,255,0.06)",
                      backdropFilter: "blur(10px)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.border =
                        "1px solid rgba(99,102,241,0.35)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 12px 48px rgba(99,102,241,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.border = item.current
                        ? "1px solid rgba(99,102,241,0.25)"
                        : "1px solid rgba(255,255,255,0.06)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    }}
                  >
                    {/* Header */}
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-semibold text-white">
                            {item.role}
                          </h3>
                          {item.current && <CurrentBadge />}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em]">
                          <span style={{ color: "#818CF8" }}>{item.company}</span>
                          <span
                            className="flex items-center gap-1 text-white/30"
                          >
                            <FiMapPin size={10} />
                            {item.location}
                          </span>
                        </div>
                      </div>

                      <span
                        className="flex shrink-0 items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-white/35"
                      >
                        <FiCalendar size={11} />
                        {item.period}
                      </span>
                    </div>

                    {/* Divider */}
                    <hr
                      className="my-5 border-none"
                      style={{
                        height: "1px",
                        background: "rgba(255,255,255,0.05)",
                      }}
                    />

                    {/* Highlights */}
                    <ul className="space-y-3">
                      {item.highlights.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <Bullet active={item.current} />
                          <p className="text-sm leading-relaxed text-white/60">
                            {point}
                          </p>
                        </li>
                      ))}
                    </ul>

                    {/* Key Achievements — only if present */}
                    {item.achievements && item.achievements.length > 0 && (
                      <div
                        className="mt-6 rounded-xl p-5"
                        style={{
                          background: "rgba(99,102,241,0.07)",
                          border: "1px solid rgba(99,102,241,0.15)",
                        }}
                      >
                        <p
                          className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em]"
                          style={{ color: "#818CF8" }}
                        >
                          <FiStar size={11} />
                          Key achievements
                        </p>

                        <ul className="space-y-2.5">
                          {item.achievements.map((a) => (
                            <li key={a} className="flex items-start gap-3">
                              <span
                                className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full"
                                style={{ background: "#6366F1" }}
                              />
                              <p className="text-sm leading-relaxed text-white/70">
                                {a}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.li>
              ))}

              {/* Timeline cap */}
              <li className="relative pl-1 pt-2">
                <span
                  className="absolute -left-[5px] top-3 h-2.5 w-2.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                />
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/20">
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