import { motion } from "framer-motion";

import {
  FiArrowUpRight,
  FiGithub,
} from "react-icons/fi";

import { SectionHeading } from "../About/SectionHeading";

/* =========================================================
   PROJECT DATA
========================================================= */

const projects = [
  {
    n: "01",

    title: "Bus Ticketing System",

    tag: "Full Stack · MERN",

    blurb:
      "A full-stack online bus reservation platform for Sri Lanka featuring seat booking, QR-based ticket validation, route management, and realtime scheduling.",

    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "QR Code",
    ],

    grad:
      "linear-gradient(135deg, #1B2425 0%, #5CAFB0 100%)",
  },

  {
    n: "02",

    title: "Photography Mobile App",

    tag: "Mobile UI · Figma",

    blurb:
      "A modern photography-focused mobile application prototype designed with cinematic layouts, immersive galleries, and minimalist user flows.",

    stack: [
      "Figma",
      "Mobile Design",
      "UI/UX",
    ],

    grad:
      "linear-gradient(135deg, #2D3E40 0%, #AEC6CF 100%)",
  },

  {
    n: "03",

    title: "BeatFlow",

    tag: "Music App · Mobile",

    blurb:
      "A next-generation music streaming application concept focused on immersive audio experiences and modern listening workflows.",

    stack: [
      "Mobile Design",
      "UI/UX",
      "Figma",
    ],

    grad:
      "linear-gradient(135deg, #151A1A 0%, #4D7C8A 100%)",
  },

  {
    n: "04",

    title: "Math Quiz Game",

    tag: "Android · Kotlin",

    blurb:
      "An interactive mathematics quiz application for Android featuring score tracking and gamified learning experiences.",

    stack: [
      "Kotlin",
      "Android",
      "Mobile Development",
    ],

    grad:
      "linear-gradient(135deg, #2D3E40 0%, #8DBCC7 100%)",
  },

  {
    n: "05",

    title: "E-Commerce Platform",

    tag: "MERN · Commerce",

    blurb:
      "A scalable ecommerce application with product management, authentication, shopping workflows, and responsive customer experiences.",

    stack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
    ],

    grad:
      "linear-gradient(135deg, #243B40 0%, #6FAFB0 100%)",
  },

  {
    n: "06",

    title: "Chatbot Application",

    tag: "AI · MERN",

    blurb:
      "A conversational chatbot system handling automated responses, intelligent query processing, and user-friendly chat interactions.",

    stack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "NLP",
    ],

    grad:
      "linear-gradient(135deg, #1B2425 0%, #5CAFB0 100%)",
  },

  {
    n: "07",

    title: "Resume Analyzer",

    tag: "AI · Resume Intelligence",

    blurb:
      "A smart resume analysis platform evaluating uploaded resumes, formatting issues, keyword density, and job match insights.",

    stack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Python",
    ],

    grad:
      "linear-gradient(135deg, #1E2A2E 0%, #7DA8B5 100%)",
  },

  {
    n: "08",

    title: "Travel Reservation System",

    tag: "Booking · MERN",

    blurb:
      "A hotel and reservation management platform supporting booking workflows, customer management, and accommodation administration.",

    stack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
    ],

    grad:
      "linear-gradient(135deg, #243B40 0%, #8DBCC7 100%)",
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

                bg-white/[0.03]

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
                  aspect-[16/10]
                  overflow-hidden

                  rounded-2xl
                "

                style={{
                  background: p.grad,
                }}
              >
                {/* overlay */}
                <div
                  className="
                    absolute
                    inset-0

                    bg-black/10
                  "
                />

                {/* number */}
                <div
                  className="
                    absolute
                    bottom-6
                    left-6
                  "
                >
                  <span
                    className="
                      text-[7rem]
                      font-black
                      leading-none

                      text-white/15
                    "
                  >
                    {p.n}
                  </span>
                </div>

                {/* buttons */}
                <div
                  className="
                    absolute
                    right-5
                    top-5

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

                      bg-white/10

                      text-white

                      backdrop-blur-xl

                      transition-all

                      hover:scale-110
                      hover:bg-white/20
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

                      bg-white/10

                      text-white

                      backdrop-blur-xl

                      transition-all

                      hover:scale-110
                      hover:bg-white/20
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