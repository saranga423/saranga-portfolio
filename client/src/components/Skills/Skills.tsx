import { motion } from "framer-motion";

import { SectionHeading } from "../About/SectionHeading";

import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiFastapi,
  SiPython,
  SiTailwindcss,
  SiGit,
  SiDocker,
} from "react-icons/si";

/* =========================================================
   TYPES
========================================================= */

type Skill = {
  icon: React.ComponentType<{
    className?: string;
  }>;

  name: string;

  desc: string;
};

/* =========================================================
   DATA
========================================================= */

const skills: Skill[] = [
  {
    icon: SiReact,

    name: "React",

    desc:
      "Component architecture & motion",
  },

  {
    icon: SiReact,

    name: "Next.js",
    desc:
      "Server-side rendering & API routes",
  },

  {
    icon: SiReact,

    name: "TypeScript",
    desc:
      "Typed JavaScript for reliability",
  },

  {
    icon: SiNodedotjs,

    name: "Node.js",

    desc:
      "APIs, services & tooling",
  },

  {
    icon: SiMongodb,

    name: "MongoDB",

    desc:
      "Document modeling at scale",
  },

  {
    icon: SiFastapi,

    name: "FastAPI",

    desc:
      "Typed Python services",
  },

  {
    icon: SiPython,

    name: "Python",

    desc:
      "Automation & AI workflows",
  },

  {
    icon: SiTailwindcss,

    name: "Tailwind",

    desc:
      "Modern design systems",
  },

  {
    icon: SiGit,

    name: "Git",

    desc:
      "Version control & collaboration",
  },

  {
    icon: SiDocker,

    name: "Docker",

    desc:
      "Containerized deployments",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const Skills = () => {
  return (
    <section
      id="skills"

      className="
        relative
        py-32
      "
    >
      <div className="mx-auto max-w-6xl px-6">

        {/* heading */}
        <SectionHeading
          index="02"

          eyebrow="Capabilities"

          title={
            <>
              The tools I shape{" "}

              <em className="italic text-gradient">
                ideas
              </em>{" "}

              with.
            </>
          }

          description="
            A focused engineering stack chosen
            for scalability, clarity, and
            production-grade software delivery.
          "
        />

        {/* =================================================
            GRID
        ================================================= */}

        <div
          className="
            grid
            grid-cols-2
            gap-4

            sm:grid-cols-3
            lg:grid-cols-4
          "
        >
          {skills.map((s, i) => {
            const Icon = s.icon;

            return (
              <motion.div
                key={s.name}

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
                  duration: 0.6,
                  delay: i * 0.04,
                }}

                whileHover={{
                  y: -6,
                }}

                className="
                  group
                  relative
                  overflow-hidden

                  rounded-2xl

                  border border-white/10

                  bg-white/3

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

                {/* icon */}
                <Icon
                  className="
                    relative
                    z-10

                    text-4xl

                    text-cyan-400

                    transition-transform
                    duration-500

                    group-hover:scale-110
                  "
                />

                {/* title */}
                <h3
                  className="
                    relative
                    z-10

                    mt-6

                    text-2xl
                    font-semibold

                    text-white
                  "
                >
                  {s.name}
                </h3>

                {/* desc */}
                <p
                  className="
                    relative
                    z-10

                    mt-2

                    text-sm

                    text-white/55
                  "
                >
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;