import {
  motion,
  type Variants,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiDownload,
  FiChevronDown,
  FiSearch,
  FiFolder,
} from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import photo from "../../assets/images/photo.jpg";

// ─────────────────────────────────────────────────────
// Roles cycled through the search query
// ─────────────────────────────────────────────────────

const ROLES = [
  "Software Engineer",
  "Cybersecurity & Pen Testing Enthusiast",
  "Analytical Thinker",
  "UI/UX-Driven Solutions",
];

const MONO = "'JetBrains Mono', monospace";

interface ResultItem {
  icon: React.ElementType;
  label: string;
  shortcut: string;
  href: string;
  download?: boolean;
  scroll?: boolean;
}

// ─────────────────────────────────────────────────────
// Animations
// ─────────────────────────────────────────────────────

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

// ─────────────────────────────────────────────────────
// Small building blocks
// ─────────────────────────────────────────────────────

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[11px] text-white/45"
      style={{ fontFamily: MONO }}
    >
      {children}
    </span>
  );
}

// Typed search query, cycling through ROLES
function TypedQuery() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const current = ROLES[index];
    const speed = deleting ? 35 : 55;

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1600);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(current.slice(0, displayed.length - 1));
        } else {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <span className="text-white/70">
      {displayed}
      <motion.span
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
        transition={{
          duration: 1,
          repeat: shouldReduceMotion ? 0 : Infinity,
          times: [0, 0.5, 0.5, 1],
        }}
        className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-white/40 align-middle"
      />
    </span>
  );
}

// ─────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const scrollToProjects = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const RESULTS: ResultItem[] = [
    { icon: FiDownload, label: "Download Resume", shortcut: "⌘ R", href: "/resume.pdf", download: true },
    { icon: FiFolder, label: "View Projects", shortcut: "⌘ P", href: "#projects", scroll: true },
    { icon: FiGithub, label: "Open GitHub", shortcut: "⌘ G", href: "https://github.com/" },
    { icon: FiLinkedin, label: "Open LinkedIn", shortcut: "⌘ L", href: "https://linkedin.com/" },
    { icon: FiMail, label: "Send an Email", shortcut: "⌘ E", href: "mailto:example@gmail.com" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#060509] px-6 py-24 text-white"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[160px]" />

      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <motion.div
        style={{ opacity: contentOpacity, y: shouldReduceMotion ? 0 : contentY }}
        className="relative z-10 mx-auto w-full max-w-[640px]"
      >
        {/* cmdk hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/25"
          style={{ fontFamily: MONO }}
        >
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
          <span className="ml-1">Quick search</span>
        </motion.div>

        {/* Palette card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-[#0E0C16]/95 shadow-2xl shadow-black/60 backdrop-blur-xl"
        >
          {/* search bar */}
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
            <FiSearch className="text-white/30" />
            <span className="flex-1 truncate text-[15px]">
              <TypedQuery />
            </span>
            <span className="text-[11px] text-white/25" style={{ fontFamily: MONO }}>
              Results · {RESULTS.length + 1}
            </span>
          </div>

          <motion.div variants={stagger} initial="hidden" animate="show">
            {/* identity result — active */}
            <motion.div
              variants={fadeUp}
              className="flex items-start gap-4 border-b border-l-2 border-white/5 border-l-indigo-400 bg-indigo-500/[0.07] px-5 py-4"
            >
              <div className="relative h-12 w-12 flex-shrink-0">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10 bg-white/5">
                  {!imgLoaded && !imgError && (
                    <div className="absolute inset-0 animate-pulse bg-white/10" />
                  )}
                  {imgError ? (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20">
                      <FiMail size={14} />
                    </div>
                  ) : (
                    <img
                      src={photo}
                      alt="Saranga Rasingolla"
                      onLoad={() => setImgLoaded(true)}
                      onError={() => setImgError(true)}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                        imgLoaded ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  )}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0E0C16] bg-emerald-500" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate font-semibold text-white">Saranga Rasingolla</p>
                  <Kbd>↵</Kbd>
                </div>
                <p className="mt-0.5 text-sm text-white/40">
                  Full-Stack Developer — Colombo, LK
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  I build modern web experiences that combine
                  <span className="font-medium text-white"> performance,</span>
                  <span className="font-medium text-white"> scalability,</span> and
                  <span className="font-medium text-white"> exceptional design.</span>
                </p>
                <div
                  className="mt-3 flex gap-4 text-[11px] uppercase tracking-[0.2em] text-white/30"
                  style={{ fontFamily: MONO }}
                >
                  <span>2+ yrs experience</span>
                  <span>20+ projects shipped</span>
                </div>
              </div>
            </motion.div>

            {/* action results */}
            {RESULTS.map((item) => (
              <motion.a
                key={item.label}
                variants={fadeUp}
                href={item.href}
                onClick={item.scroll ? scrollToProjects : undefined}
                download={item.download || undefined}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between gap-3 border-b border-white/5 px-5 py-3.5 text-sm text-white/70 transition-colors last:border-b-0 hover:bg-white/[0.04] hover:text-white"
              >
                <span className="flex items-center gap-3">
                  <item.icon className="text-white/35 transition-colors group-hover:text-indigo-300" size={15} />
                  {item.label}
                </span>
                <span className="flex items-center gap-2">
                  <Kbd>{item.shortcut}</Kbd>
                  <FiArrowRight className="text-white/0 transition-all group-hover:translate-x-0.5 group-hover:text-white/30" size={13} />
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* footer */}
          <div
            className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-[11px] text-white/30"
            style={{ fontFamily: MONO }}
          >
            <span className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Kbd>↑↓</Kbd> navigate
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>↵</Kbd> select
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              available for work
            </span>
          </div>
        </motion.div>

        {/* scroll hint */}
        <motion.button
          onClick={scrollToProjects}
          animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: shouldReduceMotion ? 0 : Infinity }}
          aria-label="Scroll to projects"
          className="mx-auto mt-8 flex items-center gap-2 text-white/25 transition-colors hover:text-white/50"
          style={{ fontFamily: MONO }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <FiChevronDown size={14} />
        </motion.button>
      </motion.div>
    </section>
  );
}