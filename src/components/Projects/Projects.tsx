import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiGithub, FiX } from "react-icons/fi";
import { SectionHeading } from "../About/SectionHeading";
import { useState, useEffect, useRef, useCallback } from "react";

import project1 from "../../assets/projects/1.jpg";
import project2 from "../../assets/projects/2.jpg";
import project3 from "../../assets/projects/3.jpg";
import project4 from "../../assets/projects/4.jpg";
import project5 from "../../assets/projects/5.jpg";
import project6 from "../../assets/projects/6.jpg";
import project7 from "../../assets/projects/7.jpg";
import project8 from "../../assets/projects/8.jpg";
import project9 from "../../assets/projects/zumba.png";

/* ─────────────────────────────────────────────
   PALETTE
───────────────────────────────────────────── */
const P = {
  blue:   "#9FB3DF",
  sky:    "#9EC6F3",
  mist:   "#BDDDE4",
  cream:  "#FFF1D5",
  bg:     "#070B14",
  bg2:    "#0D1220",
  border: "rgba(255,255,255,0.07)",
  serif:  `'Times New Roman', Times, serif`,
  mono:   `'Courier New', Courier, monospace`,
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const projects = [
  {
    n: "01", title: "Bus Ticketing System", tag: "Full Stack · MERN",
    blurb: "A full-stack reservation platform featuring QR ticket validation, realtime scheduling, route management, and seamless booking workflows.",
    stack: ["React", "Node.js", "Express", "MongoDB", "QR Code"],
    image: project1, github: "#", live: "#", accent: P.sky,
  },
  {
    n: "02", title: "Photography Mobile App", tag: "Mobile UI · Figma",
    blurb: "A cinematic photography application prototype designed with immersive galleries and refined editorial layouts.",
    stack: ["Figma", "UI/UX", "Mobile Design"],
    image: project2, github: "#", live: "#", accent: P.mist,
  },
  {
    n: "03", title: "BeatFlow", tag: "Music Platform",
    blurb: "A next-generation music streaming concept focused on immersive audio experiences and elegant listening workflows.",
    stack: ["Figma", "UI/UX", "Mobile"],
    image: project3, github: "#", live: "#", accent: P.blue,
  },
  {
    n: "04", title: "Math Quiz Game", tag: "Android · Kotlin",
    blurb: "A gamified mathematics learning application featuring score tracking and interactive educational experiences.",
    stack: ["Kotlin", "Android", "Mobile"],
    image: project4, github: "#", live: "#", accent: P.cream,
  },
  {
    n: "05", title: "E-Commerce Platform", tag: "Commerce · MERN",
    blurb: "A scalable ecommerce platform with authentication, product workflows, responsive storefronts, and customer management.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    image: project5, github: "#", live: "#", accent: P.sky,
  },
  {
    n: "06", title: "Chatbot Application", tag: "AI · MERN",
    blurb: "A conversational chatbot system with automated responses, intelligent query handling, and realtime interactions.",
    stack: ["MongoDB", "Express", "React", "Node.js", "NLP"],
    image: project6, github: "#", live: "#", accent: P.mist,
  },
  {
    n: "07", title: "Resume Analyzer", tag: "AI · Resume Intelligence",
    blurb: "A smart resume analysis platform delivering formatting insights, keyword analysis, and job match recommendations.",
    stack: ["MongoDB", "Express", "React", "Node.js", "Python"],
    image: project7, github: "#", live: "#", accent: P.blue,
  },
  {
    n: "08", title: "Travel Reservation System", tag: "Booking · MERN",
    blurb: "A hotel and travel management platform supporting modern reservation workflows and accommodation administration.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    image: project8, github: "#", live: "#", accent: P.cream,
  },
  {
    n: "09", title: "Zumba Fitness", tag: "Web Design · React",
    blurb: "A vibrant fitness web application prototype with interactive workout routines, class scheduling, and user engagement features.",
    stack: ["React", "CSS", "JavaScript"],
    image: project9, github: "https://github.com/saranga423/zumba", live: "https://zumba-hanna.vercel.app/", accent: P.sky,
  }
];

const TOTAL = projects.length;
// Full loop duration in seconds — slower / more relaxed than the old 32s orbit.
const LOOP_DURATION = 55;

/* ─────────────────────────────────────────────
   RESPONSIVE SIZING
   Instead of 3 fixed breakpoints (which used to "jump"
   at 640px / 1024px), every dimension is linearly
   interpolated between a mobile value and a desktop
   value based on the arena's actual measured width.
   This removes the visible snap at breakpoints.
───────────────────────────────────────────── */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

function getResponsiveSizes(width: number) {
  // t = 0 at narrow phones, t = 1 at large desktop; smoothly interpolated in between.
  const t = clamp01((width - 360) / (1400 - 360));

  return {
    cardW: lerp(132, 200, t),
    cardH: lerp(96, 134, t),
    gap: lerp(14, 32, t),
    arcHeight: lerp(18, 56, t),
    arenaPaddingY: lerp(70, 120, t),
  };
}

/* ─────────────────────────────────────────────
   PROJECT MODAL
───────────────────────────────────────────── */
type Project = typeof projects[0];

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 300,
            background: "rgba(7,11,20,0.88)",
            backdropFilter: "blur(12px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 24,
          }}
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 560, width: "100%",
              background: P.bg2,
              border: `1px solid ${project.accent}25`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Image */}
            <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
              <img src={project.image} alt={project.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, transparent 40%, rgba(13,18,32,0.95) 100%)",
              }} />
              <span style={{
                position: "absolute", bottom: 16, left: 20,
                fontFamily: P.serif, fontSize: 72, fontWeight: 400,
                color: "rgba(255,255,255,0.07)", lineHeight: 1,
              }}>{project.n}</span>
            </div>

            {/* Close */}
            <button onClick={onClose}
              style={{
                position: "absolute", top: 14, right: 14,
                background: "rgba(0,0,0,0.4)", border: "none",
                color: P.cream, opacity: 0.6, cursor: "pointer",
                width: 32, height: 32, display: "flex",
                alignItems: "center", justifyContent: "center",
                borderRadius: "50%",
              }}
              aria-label="Close"
            >
              <FiX size={16} />
            </button>

            {/* Content */}
            <div style={{ padding: "24px 28px 28px" }}>
              <p style={{
                fontFamily: P.mono, fontSize: 9, letterSpacing: "0.2em",
                textTransform: "uppercase", color: project.accent,
                opacity: 0.8, marginBottom: 10,
              }}>{project.tag}</p>

              <h3 style={{
                fontFamily: P.serif, fontSize: 28, fontWeight: 400,
                color: P.cream, lineHeight: 1.2, marginBottom: 14,
              }}>{project.title}</h3>

              <p style={{
                fontSize: 13, color: P.cream, opacity: 0.5,
                lineHeight: 1.75, marginBottom: 20,
                borderTop: `1px solid ${P.border}`, paddingTop: 16,
              }}>{project.blurb}</p>

              {/* Stack */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {project.stack.map((t) => (
                  <span key={t} style={{
                    padding: "4px 12px",
                    border: `1px solid ${project.accent}25`,
                    background: project.accent + "0D",
                    fontFamily: P.mono, fontSize: 9,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: project.accent,
                  }}>{t}</span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: "flex", gap: 12 }}>
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "9px 18px",
                    border: `1px solid ${P.border}`,
                    fontFamily: P.mono, fontSize: 9,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: P.cream, opacity: 0.6, textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                >
                  <FiGithub size={12} /> GitHub
                </a>
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "9px 18px",
                    background: project.accent + "18",
                    border: `1px solid ${project.accent}30`,
                    fontFamily: P.mono, fontSize: 9,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: project.accent, textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                >
                  <FiArrowUpRight size={12} /> Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   CAROUSEL CARD
   Cards travel left → right along a horizontal
   track that gently arcs upward through the
   centre of the arena (a shallow dome), rather
   than a full ellipse orbit.
───────────────────────────────────────────── */
function CarouselCard({
  project, x, arenaWidth, cardW, cardH, arcHeight, onClick,
}: {
  project: Project;
  x: number;
  arenaWidth: number;
  cardW: number;
  cardH: number;
  arcHeight: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  // Normalized horizontal position relative to the arena centre, roughly -1 … 1
  // across the visible width (can exceed that range just off-screen — fine).
  const center = arenaWidth / 2;
  const norm = (x + cardW / 2 - center) / (center || 1);
  const clampedNorm = Math.max(-1.3, Math.min(1.3, norm));

  // Shallow dome: highest (most negative y) at the centre, settles to 0 at the edges.
  const y = -arcHeight * (1 - Math.min(1, clampedNorm * clampedNorm));

  const depth = 1 - Math.min(1, Math.abs(clampedNorm));
  const scale = 0.78 + 0.22 * depth;
  const opacity = 0.4 + 0.6 * depth;
  const zIndex = Math.round(10 + depth * 20);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: 0,
        width: cardW,
        height: cardH,
        marginTop: -cardH / 2,
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity,
        zIndex: hovered ? 50 : zIndex,
        cursor: "pointer",
        willChange: "transform",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <motion.div
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.25 }}
        style={{
          width: "100%", height: "100%",
          border: `1px solid ${hovered ? project.accent + "55" : P.border}`,
          overflow: "hidden",
          position: "relative",
          background: P.bg2,
          transition: "border-color 0.25s",
        }}
      >
        <img src={project.image} alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />

        {/* overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(7,11,20,0.92) 0%, rgba(7,11,20,0.2) 60%, transparent 100%)",
        }} />

        {/* accent line top */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: 2, background: project.accent, transformOrigin: "left",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* label */}
        <div style={{
          position: "absolute", bottom: 10, left: 12, right: 12,
        }}>
          <p style={{
            fontFamily: P.mono, fontSize: 8, letterSpacing: "0.18em",
            textTransform: "uppercase", color: project.accent,
            opacity: 0.8, marginBottom: 2,
          }}>{project.tag}</p>
          <p style={{
            fontFamily: P.serif, fontSize: 13, color: P.cream,
            lineHeight: 1.2, fontWeight: 400,
          }}>{project.title}</p>
        </div>

        {/* number ghost */}
        <span style={{
          position: "absolute", top: 4, left: 8,
          fontFamily: P.serif, fontSize: 32, fontWeight: 400,
          color: "rgba(255,255,255,0.06)", lineHeight: 1,
          userSelect: "none",
        }}>{project.n}</span>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TRACK LINE  (subtle arc visual under the cards)
───────────────────────────────────────────── */
function ArcTrack({ arenaWidth, arcHeight, centerY }: { arenaWidth: number; arcHeight: number; centerY: number }) {
  if (!arenaWidth) return null;
  const midX = arenaWidth / 2;
  const d = `M 0 ${centerY} Q ${midX} ${centerY - arcHeight * 2} ${arenaWidth} ${centerY}`;
  return (
    <svg
      style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}
      width={arenaWidth} height={centerY * 2}
    >
      <path d={d} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
const Projects = () => {
  const [scrollX, setScrollX] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [arenaWidth, setArenaWidth] = useState(0);
  const [sizes, setSizes] = useState(() => getResponsiveSizes(1200));

  const arenaRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Continuous, smooth responsive measurement — no stepped breakpoints.
  useEffect(() => {
    const el = arenaRef.current;
    if (!el) return;

    const update = (width: number) => {
      setArenaWidth(width);
      setSizes(getResponsiveSizes(width));
    };

    update(el.clientWidth);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        update(entry.contentRect.width);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { cardW, cardH, gap, arcHeight, arenaPaddingY } = sizes;
  const step = cardW + gap;
  const trackWidth = step * TOTAL;

  // RAF-based horizontal scroll — slower, more relaxed pace than the old orbit.
  useEffect(() => {
    if (paused || selected || trackWidth === 0) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
      return;
    }

    const pxPerMs = trackWidth / (LOOP_DURATION * 1000);

    const tick = (timestamp: number) => {
      if (lastTimeRef.current !== null) {
        const delta = timestamp - lastTimeRef.current;
        setScrollX((x) => (x + pxPerMs * delta) % trackWidth);
      }
      lastTimeRef.current = timestamp;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [paused, selected, trackWidth]);

  const handleCardClick = useCallback((p: Project) => {
    setPaused(true);
    setSelected(p);
  }, []);

  const handleClose = useCallback(() => {
    setSelected(null);
    setPaused(false);
  }, []);

  const arenaH = cardH + arcHeight * 2 + arenaPaddingY;
  const centerY = arenaH / 2;

  // Duplicate the set so the loop reads as continuous (second copy fills in
  // behind the first as it scrolls off to the left).
  const trackItems = [...projects, ...projects];

  return (
    <section id="projects" style={{ padding: "120px 0", background: P.bg, color: P.cream }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        <SectionHeading
          index="03"
          eyebrow="Selected Work"
          title={<>Projects crafted with <em className="italic gradient-text">engineering precision</em>.</>}
          description="A curated collection of full-stack, AI, mobile, and design-focused applications built across MERN, Python, Java, and modern UI systems."
        />

        {/* ── Carousel arena ── */}
        <div
          ref={arenaRef}
          style={{
            position: "relative",
            height: arenaH,
            overflow: "hidden",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => !selected && setPaused(false)}
        >
          <ArcTrack arenaWidth={arenaWidth} arcHeight={arcHeight} centerY={centerY} />

          {arenaWidth > 0 && trackItems.map((p, i) => {
            // Raw x position along the doubled track, then wrapped by the
            // current scroll offset so cards loop seamlessly.
            let x = i * step - scrollX;
            // Bring anything that's drifted far off either side back into
            // a renderable range (keeps the loop seamless at any width).
            while (x < -step * 1.5) x += trackWidth * 2;
            while (x > arenaWidth + step * 1.5) x -= trackWidth * 2;

            return (
              <CarouselCard
                key={`${p.title}-${i}`}
                project={p}
                x={x}
                arenaWidth={arenaWidth}
                cardW={cardW}
                cardH={cardH}
                arcHeight={arcHeight}
                onClick={() => handleCardClick(p)}
              />
            );
          })}

          {/* Pause hint */}
          <div style={{
            position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
            fontFamily: P.mono, fontSize: 9, letterSpacing: "0.2em",
            textTransform: "uppercase", color: P.cream, opacity: 0.2,
            pointerEvents: "none",
          }}>
            {paused ? "click a project to open" : "hover to pause · click to explore"}
          </div>
        </div>

        {/* ── Project list (reference) ── */}
        <div style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 1,
          borderTop: `1px solid ${P.border}`,
        }}>
          {projects.map((p) => (
            <button
              key={p.title}
              onClick={() => handleCardClick(p)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: `1px solid ${P.border}`,
                borderRight: `1px solid ${P.border}`,
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.18s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{
                fontFamily: P.mono, fontSize: 9,
                color: p.accent, opacity: 0.6, minWidth: 20,
              }}>{p.n}</span>
              <span style={{
                fontFamily: P.serif, fontSize: 14,
                color: P.cream, opacity: 0.7,
              }}>{p.title}</span>
            </button>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={handleClose} />
    </section>
  );
};

export default Projects;