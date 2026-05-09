import { motion } from "framer-motion";

import { SectionHeading } from "./SectionHeading";

/* =========================================================
   EXPERIENCE DATA
========================================================= */

const experiences = [
  {
    period: "2025 — 2026",

    role:
      "Intern Software Engineer",

    company:
      "icieos (Pvt) Ltd",

    location:
      "Sri Lanka",

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
    period:
      "July 2024 — January 2025",

    role:
      "Junior Full-Stack Engineer",

    company:
      "DMS Software Technologies PVT LTD",

    location:
      "Sri Lanka",

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

/* =========================================================
   COMPONENT
========================================================= */

const About = () => {
  return (
    <section
      id="about"

      className="
        relative
        py-32
      "
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* =================================================
            HEADING
        ================================================= */}

        <SectionHeading
          index="01"

          eyebrow="Experience"

          title={
            <>
              Engineering products with{" "}

              <em className="italic text-gradient">
                precision
              </em>{" "}

              and scalability.
            </>
          }

          description="
            Full-stack software engineer with
            hands-on experience building
            enterprise systems, MERN platforms,
            scalable APIs, and production-ready
            interfaces across modern web stacks.
          "
        />

        {/* =================================================
            GRID
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-10

            lg:grid-cols-12
          "
        >
          {/* =================================================
              LEFT PANEL
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            viewport={{
              once: true,
            }}

            transition={{
              duration: 0.9,
            }}

            className="lg:col-span-4"
          >
            <div
              className="
                glass

                sticky
                top-28

                rounded-3xl

                p-8
              "
            >
              <p
                className="
                  text-sm
                  uppercase
                  tracking-[0.25em]

                  text-cyan-400
                "
              >
                Philosophy
              </p>

              <p
                className="
                  mt-6

                  text-3xl
                  font-semibold
                  leading-tight

                  text-white
                "
              >
                “Software is not only engineering —
                it is clarity, structure, and
                experience.”
              </p>

              <div
                className="
                  mt-10
                  h-px
                  w-full
                  bg-white/10
                "
              />

              {/* stats */}
              <dl
                className="
                  mt-8

                  grid
                  grid-cols-2
                  gap-6

                  text-sm
                "
              >
                <div>
                  <dt className="text-white/50">
                    Focus
                  </dt>

                  <dd className="mt-1 text-white">
                    Full Stack Engineering
                  </dd>
                </div>

                <div>
                  <dt className="text-white/50">
                    Stack
                  </dt>

                  <dd className="mt-1 text-white">
                    MERN · FastAPI
                  </dd>
                </div>

                <div>
                  <dt className="text-white/50">
                    Languages
                  </dt>

                  <dd className="mt-1 text-white">
                    TS · Python · Java
                  </dd>
                </div>

                <div>
                  <dt className="text-white/50">
                    Status
                  </dt>

                  <dd className="mt-1 text-white">
                    Available
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>

          {/* =================================================
              TIMELINE
          ================================================= */}

          <div className="lg:col-span-8">

            <ol
              className="
                relative

                space-y-8

                border-l border-white/10

                pl-8
              "
            >
              {experiences.map((item, i) => (
                <motion.li
                  key={item.role}

                  initial={{
                    opacity: 0,
                    x: 30,
                  }}

                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}

                  viewport={{
                    once: true,
                  }}

                  transition={{
                    duration: 0.7,
                    delay: i * 0.08,
                  }}

                  className="
                    group
                    relative
                  "
                >
                  {/* timeline dot */}
                  <span
                    className="
                      absolute
                      -left-9.5
                      top-7

                      h-3
                      w-3

                      rounded-full

                      bg-cyan-400

                      ring-4
                      ring-[#0B1120]
                    "
                  />

                  {/* card */}
                  <div
                    className="
                      glass

                      rounded-3xl

                      p-8

                      transition-all
                      duration-500

                      hover:border-cyan-400/20
                      hover:shadow-[0_10px_40px_rgba(0,255,255,0.06)]
                    "
                  >
                    {/* top */}
                    <div
                      className="
                        flex
                        flex-col
                        gap-3

                        md:flex-row
                        md:items-start
                        md:justify-between
                      "
                    >
                      <div>
                        <h3
                          className="
                            text-3xl
                            font-semibold

                            text-white
                          "
                        >
                          {item.role}
                        </h3>

                        <p
                          className="
                            mt-2

                            text-sm

                            uppercase

                            tracking-[0.2em]

                            text-cyan-400
                          "
                        >
                          {item.company}
                        </p>
                      </div>

                      <span
                        className="
                          text-xs

                          uppercase

                          tracking-[0.25em]

                          text-white/45
                        "
                      >
                        {item.period}
                      </span>
                    </div>

                    {/* location */}
                    <p
                      className="
                        mt-4

                        text-sm

                        text-white/45
                      "
                    >
                      {item.location}
                    </p>

                    {/* bullets */}
                    <ul
                      className="
                        mt-6
                        space-y-4
                      "
                    >
                      {item.highlights.map((point) => (
                        <li
                          key={point}

                          className="
                            flex
                            items-start
                            gap-3
                          "
                        >
                          <span
                            className="
                              mt-2

                              h-1.5
                              w-1.5

                              rounded-full

                              bg-cyan-400
                            "
                          />

                          <p
                            className="
                              text-sm
                              leading-relaxed

                              text-white/70
                            "
                          >
                            {point}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;