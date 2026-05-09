import { motion } from "framer-motion";

import {
  FiAward,
  FiArrowUpRight,
} from "react-icons/fi";

import { SectionHeading } from "../About/SectionHeading";

/* =========================================================
   TYPES
========================================================= */

type Certificate = {
  title: string;

  issuer: string;

  category: string;
};

/* =========================================================
   DATA
========================================================= */

const certs: Certificate[] = [
  {
    title:
      "Online Learning Programme in Python",

    issuer:
      "University of Moratuwa",

    category:
      "Programming",
  },

  {
    title:
      "Frontend Web Development",

    issuer:
      "University of Moratuwa",

    category:
      "Frontend Engineering",
  },

  {
    title:
      "Python for Beginners",

    issuer:
      "University of Moratuwa",

    category:
      "Python Development",
  },

  {
    title:
      "Web Design Programme",

    issuer:
      "University of Moratuwa",

    category:
      "UI / UX",
  },

  {
    title:
      "AI/ML Engineer — Stage 1",

    issuer:
      "SLIIT",

    category:
      "Artificial Intelligence",
  },

  {
    title:
      "HTML Course",

    issuer:
      "Sololearn",

    category:
      "Web Fundamentals",
  },

  {
    title:
      "Java Course",

    issuer:
      "Sololearn",

    category:
      "Backend Development",
  },

  {
    title:
      "Software Engineer Intern",

    issuer:
      "HackerRank",

    category:
      "Software Engineering",
  },

  {
    title:
      "Google Analytics for Beginners",

    issuer:
      "Google Analytics Academy",

    category:
      "Analytics",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const Certificates = () => {
  return (
    <section
      id="certificates"

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
          index="04"

          eyebrow="Certifications"

          title={
            <>
              Continuous learning through{" "}

              <em className="italic text-gradient">
                engineering
              </em>{" "}

              and innovation.
            </>
          }

          description="
            Certifications and professional
            learning experiences across
            software engineering, AI,
            frontend development, analytics,
            and modern application design.
          "
        />

        {/* =================================================
            GRID
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-5

            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {certs.map((c, i) => (
            <motion.div
              key={c.title}

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
                margin: "-50px",
              }}

              transition={{
                duration: 0.7,
                delay: i * 0.05,
              }}

              whileHover={{
                y: -6,
              }}

              className="
                group
                relative

                overflow-hidden

                rounded-3xl

                border border-white/10

                bg-white/[0.03]

                p-6

                transition-all
                duration-500

                hover:border-cyan-400/30
                hover:shadow-[0_10px_40px_rgba(0,255,255,0.08)]
              "
            >
              {/* glow */}
              <div
                className="
                  absolute
                  inset-0

                  opacity-0

                  transition-opacity
                  duration-500

                  group-hover:opacity-100
                "

                style={{
                  background:
                    "radial-gradient(circle at top, rgba(34,211,238,0.15), transparent 70%)",
                }}
              />

              {/* top */}
              <div
                className="
                  relative
                  z-10

                  flex
                  items-start
                  justify-between
                "
              >
                {/* icon */}
                <div
                  className="
                    flex
                    h-12
                    w-12

                    items-center
                    justify-center

                    rounded-2xl

                    bg-cyan-500/10

                    text-cyan-400
                  "
                >
                  <FiAward size={20} />
                </div>

                {/* arrow */}
                <FiArrowUpRight
                  className="
                    text-white/35

                    transition-all
                    duration-300

                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                    group-hover:text-cyan-400
                  "
                />
              </div>

              {/* content */}
              <div className="relative z-10 mt-8">

                {/* category */}
                <p
                  className="
                    text-[11px]

                    uppercase

                    tracking-[0.25em]

                    text-cyan-400
                  "
                >
                  {c.category}
                </p>

                {/* title */}
                <h3
                  className="
                    mt-3

                    text-2xl
                    font-semibold
                    leading-snug

                    text-white
                  "
                >
                  {c.title}
                </h3>

                {/* issuer */}
                <p
                  className="
                    mt-3

                    text-sm

                    text-white/55
                  "
                >
                  {c.issuer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;