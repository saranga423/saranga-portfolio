import { motion } from "framer-motion";

import {
  FiArrowUpRight,
  FiGithub,
} from "react-icons/fi";

import { SectionHeading } from "../About/SectionHeading";
import project1 from "../../assets/projects/1.jpg";
import project2 from "../../assets/projects/2.jpg";


import project3 from "../../assets/projects/3.jpg";
import project4 from "../../assets/projects/4.jpg";
import project5 from "../../assets/projects/5.jpg";
import project6 from "../../assets/projects/6.jpg";
import project7 from "../../assets/projects/7.jpg";
import project8 from "../../assets/projects/8.jpg";

/* =========================================================
   PROJECT DATA
========================================================= */

const projects = [
  {
    n: "01",

    title: "Bus Ticketing System",

    tag: "Full Stack · MERN",

    blurb:
      "A full-stack reservation platform featuring QR ticket validation, realtime scheduling, route management, and seamless booking workflows.",

    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "QR Code",
    ],

    image:
      project1,

    grad:
      "linear-gradient(135deg, #9FB3DF 0%, #BDDDE4 100%)",
  },

  {
    n: "02",

    title: "Photography Mobile App",

    tag: "Mobile UI · Figma",

    blurb:
      "A cinematic photography application prototype designed with immersive galleries and refined editorial layouts.",

    stack: [
      "Figma",
      "UI/UX",
      "Mobile Design",
    ],

    image:
      project2,

    grad:
      "linear-gradient(135deg, #BDDDE4 0%, #FFF1D5 100%)",
  },

  {
    n: "03",

    title: "BeatFlow",

    tag: "Music Platform",

    blurb:
      "A next-generation music streaming concept focused on immersive audio experiences and elegant listening workflows.",

    stack: [
      "Figma",
      "UI/UX",
      "Mobile",
    ],

    image:
      project3,

    grad:
      "linear-gradient(135deg, #9EC6F3 0%, #BDDDE4 100%)",
  },

  {
    n: "04",

    title: "Math Quiz Game",

    tag: "Android · Kotlin",

    blurb:
      "A gamified mathematics learning application featuring score tracking and interactive educational experiences.",

    stack: [
      "Kotlin",
      "Android",
      "Mobile",
    ],

    image:
      project4,

    grad:
      "linear-gradient(135deg, #9FB3DF 0%, #FFF1D5 100%)",
  },

  {
    n: "05",

    title: "E-Commerce Platform",

    tag: "Commerce · MERN",

    blurb:
      "A scalable ecommerce platform with authentication, product workflows, responsive storefronts, and customer management.",

    stack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
    ],

    image:
      project5,

    grad:
      "linear-gradient(135deg, #BDDDE4 0%, #9EC6F3 100%)",
  },

  {
    n: "06",

    title: "Chatbot Application",

    tag: "AI · MERN",

    blurb:
      "A conversational chatbot system with automated responses, intelligent query handling, and realtime interactions.",

    stack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "NLP",
    ],

    image:
      project6,

    grad:
      "linear-gradient(135deg, #9FB3DF 0%, #BDDDE4 100%)",
  },

  {
    n: "07",

    title: "Resume Analyzer",

    tag: "AI · Resume Intelligence",

    blurb:
      "A smart resume analysis platform delivering formatting insights, keyword analysis, and job match recommendations.",

    stack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Python",
    ],

    image:
      project7,

    grad:
      "linear-gradient(135deg, #FFF1D5 0%, #BDDDE4 100%)",
  },

  {
    n: "08",

    title: "Travel Reservation System",

    tag: "Booking · MERN",

    blurb:
      "A hotel and travel management platform supporting modern reservation workflows and accommodation administration.",

    stack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
    ],

    image:
      project8,

    grad:
      "linear-gradient(135deg, #9EC6F3 0%, #FFF1D5 100%)",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const Projects = () => {
  return (
    <section
      id="projects"
      className="
        relative
        py-32
      "
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* heading */}
        <SectionHeading
          index="03"

          eyebrow="Selected Work"

          title={
            <>
              Projects crafted with{" "}

              <em className="italic gradient-text">
                engineering precision
              </em>
              .
            </>
          }

          description="
            A curated collection of full-stack,
            AI, mobile, and design-focused
            applications built across MERN,
            Python, Java, and modern UI systems.
          "
        />

        {/* =================================================
            GRID
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-8

            md:grid-cols-2
          "
        >
          {projects.map((p, i) => (
            <motion.article
              key={p.title}

              initial={{
                opacity: 0,
                y: 40,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{
                once: true,
                margin: "-60px",
              }}

              transition={{
                duration: 0.8,
                delay: i * 0.06,
              }}

              className="
                group
                relative
                overflow-hidden

                rounded-3xl

                border border-white/10

                bg-white/3

                p-2

                transition-all
                duration-500

                hover:-translate-y-2
                hover:border-cyan-400/30
                hover:shadow-[0_20px_50px_rgba(0,255,255,0.08)]
              "
            >
              {/* =================================================
                  TOP CARD
              ================================================= */}

              <div
  className="
    relative
    aspect-16/10
    overflow-hidden
    rounded-[28px]
  "
>
  {/* =====================================================
      IMAGE
  ===================================================== */}

  <img
    src={p.image}

    alt={p.title}

    className="
      absolute
      inset-0

      h-full
      w-full

      object-cover

      transition-transform
      duration-700

      group-hover:scale-105
    "
  />

  {/* =====================================================
      DARK OVERLAY
  ===================================================== */}

  <div
    className="
      absolute
      inset-0

      bg-black/35
    "
  />

  {/* =====================================================
      GRADIENT OVERLAY
  ===================================================== */}

  <div
    className="
      absolute
      inset-0

      bg-linear-to-t
      from-[#0B1120]
      via-[#0B1120]/20
      to-transparent
    "
  />

  {/* =====================================================
      HOVER GLOW
  ===================================================== */}

  <div
    className="
      absolute
      inset-0

      opacity-0

      transition-opacity
      duration-700

      group-hover:opacity-100
    "
    style={{
      background:
        "radial-gradient(circle at top left, rgba(159,179,223,0.22), transparent 45%)",
    }}
  />

  {/* =====================================================
      NUMBER
  ===================================================== */}

  <div
    className="
      absolute
      bottom-5
      left-5
      z-20
    "
  >
    <span
      className="
        text-[7rem]
        font-black
        leading-none

        text-white/10
      "
    >
      {p.n}
    </span>
  </div>

  {/* =====================================================
      ACTIONS
  ===================================================== */}

  <div
    className="
      absolute
      right-5
      top-5
      z-20

      flex
      gap-2
    "
  >
    <a
      href="#"

      className="
        flex
        h-11
        w-11
        items-center
        justify-center

        rounded-full

        border border-white/10

        bg-black/20

        text-[#FFF1D5]

        backdrop-blur-xl

        transition-all

        hover:scale-110
        hover:border-[#9EC6F3]/30
        hover:bg-[#9EC6F3]/20
      "
    >
      <FiGithub size={16} />
    </a>

    <a
      href="#"

      className="
        flex
        h-11
        w-11
        items-center
        justify-center

        rounded-full

        border border-white/10

        bg-black/20

        text-[#FFF1D5]

        backdrop-blur-xl

        transition-all

        hover:scale-110
        hover:border-[#9EC6F3]/30
        hover:bg-[#9EC6F3]/20
      "
    >
      <FiArrowUpRight size={16} />
    </a>
  </div>
</div>

              {/* =================================================
                  CONTENT
              ================================================= */}

              <div className="px-5 py-6">

                {/* tag */}
                <p
                  className="
                    text-[11px]

                    uppercase

                    tracking-[0.25em]

                    text-cyan-400
                  "
                >
                  {p.tag}
                </p>

                {/* title */}
                <h3
                  className="
                    mt-3

                    text-3xl
                    font-semibold

                    text-white
                  "
                >
                  {p.title}
                </h3>

                {/* description */}
                <p
                  className="
                    mt-4

                    text-sm
                    leading-relaxed

                    text-white/65
                  "
                >
                  {p.blurb}
                </p>

                {/* stack */}
                <div
                  className="
                    mt-6

                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  {p.stack.map((t) => (
                    <span
                      key={t}

                      className="
                        rounded-full

                        border border-white/10

                        px-3 py-1

                        text-[11px]

                        uppercase

                        tracking-[0.18em]

                        text-white/60
                      "
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;