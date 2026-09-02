import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiBriefcase,
  FiCalendar,
  FiChevronRight,
  FiMapPin,
  FiStar,
} from "react-icons/fi";
import { SectionHeading } from "./SectionHeading";

interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  current?: boolean;
  highlights: string[];
  achievements?: string[];
}

const experiences: Experience[] = [
  {
    period: "2026 — Present",
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
    role: "Intern Full-Stack Engineer",
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

const sidebarStats = [
  { label: "Primary focus", value: "Full Stack" },
  { label: "Core stack", value: "MERN · FastAPI" },
  { label: "Languages", value: "TS · Python · Java" },
  { label: "Availability", value: "Open" },
];

const ACCENT = "#6366F1";
const ACCENT_LIGHT = "#A5B4FC";
const LINE = "rgba(255,255,255,0.08)";
const SURFACE = "rgba(255,255,255,0.035)";

const fadeUp = (delay = 0, reduced = false) => ({
  initial: reduced ? { opacity: 0 } : { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: {
    duration: reduced ? 0.3 : 0.7,
    delay: reduced ? 0 : delay,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

function ExperienceNumber({ index, current }: { index: number; current?: boolean }) {
  return (
    <div className="absolute -left-[17px] top-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#0A0A0F] sm:-left-[21px]">
      <span
        className="font-mono text-[9px]"
        style={{ color: current ? ACCENT_LIGHT : "rgba(255,255,255,.3)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function CurrentBadge() {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em]"
      style={{
        borderColor: "rgba(99,102,241,.28)",
        background: "rgba(99,102,241,.09)",
        color: ACCENT_LIGHT,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          background: ACCENT,
          boxShadow: "0 0 8px rgba(99,102,241,.9)",
        }}
      />
      Current
    </span>
  );
}

function ExperienceCard({
  item,
  index,
  reducedMotion,
}: {
  item: Experience;
  index: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.article
      {...fadeUp(index * 0.08, reducedMotion)}
      className="group relative"
    >
      <ExperienceNumber index={index} current={item.current} />

      <motion.div
        whileHover={reducedMotion ? {} : { y: -3 }}
        transition={{ duration: 0.25 }}
        className="relative overflow-hidden rounded-2xl border p-5 sm:p-7"
        style={{
          borderColor: item.current
            ? "rgba(99,102,241,.28)"
            : "rgba(255,255,255,.075)",
          background: item.current
            ? "linear-gradient(145deg, rgba(99,102,241,.075), rgba(255,255,255,.025))"
            : SURFACE,
          backdropFilter: "blur(14px)",
        }}
      >
        {/* Top accent */}
        <div
          className="absolute left-0 top-0 h-px w-0 transition-all duration-500 group-hover:w-full"
          style={{ background: `linear-gradient(90deg, ${ACCENT}, transparent)` }}
        />

        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2.5">
              {item.current && <CurrentBadge />}

              <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                {item.period}
              </span>
            </div>

            <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {item.role}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span style={{ color: ACCENT_LIGHT }}>{item.company}</span>

              <span className="text-white/15">/</span>

              <span className="flex items-center gap-1.5 text-white/35">
                <FiMapPin size={10} />
                {item.location}
              </span>
            </div>
          </div>

          <div
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-white/20 transition group-hover:border-indigo-400/20 group-hover:text-indigo-300 md:flex"
            aria-hidden="true"
          >
            <FiArrowUpRight size={15} />
          </div>
        </div>

        <div className="my-6 h-px bg-white/[0.06]" />

        <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.24em] text-white/25">
              Responsibilities
            </p>

            <ul className="space-y-3">
              {item.highlights.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{
                      background: item.current
                        ? ACCENT
                        : "rgba(99,102,241,.4)",
                      boxShadow: item.current
                        ? "0 0 7px rgba(99,102,241,.55)"
                        : "none",
                    }}
                  />

                  <p className="text-sm leading-6 text-white/55">{point}</p>
                </li>
              ))}
            </ul>
          </div>

          {item.achievements && item.achievements.length > 0 && (
            <div className="lg:w-[230px]">
              <div
                className="rounded-xl border p-4"
                style={{
                  borderColor: "rgba(99,102,241,.15)",
                  background: "rgba(99,102,241,.045)",
                }}
              >
                <p
                  className="mb-3 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: ACCENT_LIGHT }}
                >
                  <FiStar size={11} />
                  Key impact
                </p>

                <ul className="space-y-3">
                  {item.achievements.map((achievement) => (
                    <li key={achievement} className="flex items-start gap-2">
                      <FiChevronRight
                        size={12}
                        className="mt-1 shrink-0"
                        style={{ color: ACCENT }}
                      />
                      <span className="text-xs leading-5 text-white/55">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
}

const About = () => {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0A0A0F] py-24 sm:py-32 lg:py-36"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,.09), transparent 68%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          index="01"
          eyebrow="Experience"
          title={
            <>
              Building software with{" "}
              <em className="italic text-gradient">purpose.</em>
            </>
          }
          description="Full-stack software engineer with hands-on experience across enterprise systems, MERN platforms, scalable APIs, and production-ready interfaces."
        />

        {/* Intro strip */}
        <motion.div
          {...fadeUp(0.05, reducedMotion)}
          className="mb-12 flex flex-col justify-between gap-5 border-y border-white/[0.07] py-5 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl border"
              style={{
                borderColor: "rgba(99,102,241,.2)",
                background: "rgba(99,102,241,.07)",
                color: ACCENT_LIGHT,
              }}
            >
              <FiBriefcase size={15} />
            </span>

            <div>
              <p className="text-sm font-medium text-white/80">
                Professional journey
              </p>
              <p className="mt-0.5 text-xs text-white/30">
                Most recent experience first
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/25">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: ACCENT }}
            />
            3+ years building
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
          {/* Sidebar */}
          <motion.aside
            {...fadeUp(0.1, reducedMotion)}
            className="lg:sticky lg:top-28 lg:h-fit"
          >
            <div
              className="rounded-2xl border p-6"
              style={{
                borderColor: LINE,
                background: "rgba(255,255,255,.025)",
                backdropFilter: "blur(12px)",
              }}
            >
              <p
                className="text-[9px] font-semibold uppercase tracking-[0.25em]"
                style={{ color: ACCENT_LIGHT }}
              >
                Engineering mindset
              </p>

              <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-tight text-white">
                Clarity first.
                <br />
                Quality always.
              </h3>

              <p className="mt-4 text-sm leading-6 text-white/40">
                I enjoy turning complex requirements into systems that are
                reliable, maintainable, and intuitive to use.
              </p>

              <div className="my-7 h-px bg-white/[0.07]" />

              <dl className="space-y-5">
                {sidebarStats.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-start justify-between gap-4"
                  >
                    <dt className="text-[10px] uppercase tracking-[0.16em] text-white/25">
                      {label}
                    </dt>

                    <dd
                      className="text-right text-xs font-medium"
                      style={{
                        color:
                          value === "Open"
                            ? ACCENT_LIGHT
                            : "rgba(255,255,255,.7)",
                      }}
                    >
                      {value === "Open" && (
                        <span
                          className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full"
                          style={{
                            background: ACCENT,
                            boxShadow: "0 0 7px rgba(99,102,241,.7)",
                          }}
                        />
                      )}
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div
                className="mt-7 rounded-xl border p-4"
                style={{
                  borderColor: "rgba(255,255,255,.06)",
                  background: "rgba(0,0,0,.12)",
                }}
              >
                <div className="flex items-center gap-2">
                  <FiCalendar size={12} className="text-white/25" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                    Timeline
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Experience list */}
          <div className="relative pl-5 sm:pl-8">
            <div
              aria-hidden="true"
              className="absolute bottom-2 left-[15px] top-2 w-px sm:left-[19px]"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(99,102,241,.55), rgba(255,255,255,.08) 85%, transparent)",
              }}
            />

            <div className="space-y-7">
              {experiences.map((item, index) => (
                <ExperienceCard
                  key={`${item.role}-${item.company}`}
                  item={item}
                  index={index}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>

            {/* Career start */}
            <motion.div
              {...fadeUp(0.25, reducedMotion)}
              className="relative mt-8 flex items-center gap-4 pl-1"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: "rgba(255,255,255,.15)" }}
              />
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                Career start
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
