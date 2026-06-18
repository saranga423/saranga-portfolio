import {
  motion,
  Variants,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiDownload,
  FiChevronDown,
  FiFolder,
  FiCommand,
  FiArrowRight,
  FiTerminal,
} from "react-icons/fi";
import { useEffect, useRef, useState, useCallback } from "react";
import photo from "../../assets/images/photo.jpg";

// ─── Constants ──────────────────────────────────────────────────────────────

const ROLES = [
  "Software Engineer",
  "Cybersecurity & Pen Testing Enthusiast",
  "Analytical Thinker",
  "UI/UX-Driven Solutions",
];

interface ResultItem {
  icon: React.ElementType;
  label: string;
  shortcut: string;
  href: string;
  download?: boolean;
  scroll?: boolean;
}

// NOTE: github/linkedin/email below are placeholders — swap in real links.
const RESULTS: ResultItem[] = [
  { icon: FiDownload, label: "Download Resume", shortcut: "⌘ R", href: "/resume.pdf", download: true },
  { icon: FiFolder, label: "View Projects", shortcut: "⌘ P", href: "#projects", scroll: true },
  { icon: FiGithub, label: "Open GitHub", shortcut: "⌘ G", href: "https://github.com/" },
  { icon: FiLinkedin, label: "Open LinkedIn", shortcut: "⌘ L", href: "https://linkedin.com/" },
  { icon: FiMail, label: "Send an Email", shortcut: "⌘ E", href: "mailto:example@gmail.com" },
];

// ─── Glass design tokens ────────────────────────────────────────────────────
// One place to tune the entire frosted-glass material. `glassSurface()` is the
// reusable "recipe" — fill + blur + hairline border + inner sheen — that every
// glass element in this file is built from, so the material stays consistent.

const GLASS_FILL = "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))";
const GLASS_FILL_SOFT = "rgba(255,255,255,0.05)";
const GLASS_BORDER = "rgba(255,255,255,0.14)";
const GLASS_BORDER_SOFT = "rgba(255,255,255,0.08)";
const GLASS_HIGHLIGHT = "inset 0 1px 0 rgba(255,255,255,0.14)";
const GLASS_SHADOW = "0 8px 32px rgba(0,0,0,0.45)";
const GLASS_BLUR = "blur(22px) saturate(160%)";
const GLASS_BLUR_SM = "blur(14px) saturate(150%)";

function glassSurface(overrides?: React.CSSProperties): React.CSSProperties {
  return {
    background: GLASS_FILL_SOFT,
    backdropFilter: GLASS_BLUR_SM,
    WebkitBackdropFilter: GLASS_BLUR_SM,
    border: `1px solid ${GLASS_BORDER_SOFT}`,
    boxShadow: GLASS_HIGHLIGHT,
    ...overrides,
  };
}

// ─── Animation Variants ─────────────────────────────────────────────────────

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Subtle grain overlay ────────────────────────────────────────────────────
// A faint fractal-noise texture keeps large glass surfaces from looking like a
// flat blur — it's the difference between "frosted glass" and "blurred photo".

function NoiseOverlay({ opacity = 0.025 }: { opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay"
      style={{
        opacity,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

// ─── Animated Grid Background ───────────────────────────────────────────────

function GridBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full opacity-[0.045]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* Radial vignette to fade out the grid at edges */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, #0f172a 80%)",
        }}
      />
    </div>
  );
}

// ─── Spotlight (cursor glow) ─────────────────────────────────────────────────

function Spotlight({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (shouldReduceMotion) return;
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY, shouldReduceMotion, sectionRef]);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute z-0"
      style={{
        left: springX,
        top: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: 600,
        height: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 70%)",
      }}
    />
  );
}

// ─── Floating Orbs ───────────────────────────────────────────────────────────
// Saturated color washed behind the glass panel — this is what the panel's
// backdrop-blur actually has to refract, so the glassmorphism reads as real
// rather than just "a translucent gray box".

function FloatingOrbs() {
  const shouldReduceMotion = useReducedMotion();
  const orbs = [
    { cx: "10%", cy: "30%", r: 220, delay: 0, dur: 18 },
    { cx: "85%", cy: "20%", r: 180, delay: 4, dur: 22 },
    { cx: "70%", cy: "80%", r: 150, delay: 8, dur: 16 },
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: o.cx,
            top: o.cy,
            width: o.r * 2,
            height: o.r * 2,
            translateX: "-50%",
            translateY: "-50%",
            background:
              i === 0
                ? "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)"
                : i === 1
                ? "radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          }}
          animate={shouldReduceMotion ? {} : { y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: o.dur, delay: o.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─── Avatar with glass halo + ring animation ─────────────────────────────────

function Avatar() {
  return (
    <motion.div variants={scaleIn} className="relative mx-auto mb-8 w-fit">
      {/* Glass halo sitting behind the rings/photo */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-full"
        style={glassSurface({ background: GLASS_FILL })}
      />
      {/* Pulsing rings */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{ border: "1.5px solid rgba(99,102,241,0.4)" }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{ border: "1.5px solid rgba(99,102,241,0.25)" }}
        animate={{ scale: [1, 1.22, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2.8, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <img
        src={photo}
        alt="Saranga Rasingolla"
        className="relative z-10 h-24 w-24 rounded-full object-cover"
        style={{
          border: "2px solid rgba(255,255,255,0.25)",
          boxShadow: "0 0 0 4px rgba(99,102,241,0.12), 0 8px 24px rgba(0,0,0,0.35)",
        }}
      />
      {/* "Available" dot */}
      <span
        aria-hidden="true"
        className="absolute bottom-1 right-1 z-20 h-4 w-4 rounded-full border-2 border-slate-900 bg-emerald-400"
      />
    </motion.div>
  );
}

// ─── Typing Roles ─────────────────────────────────────────────────────────────

function TypedRoles() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayed(ROLES[0]);
      return;
    }
    const current = ROLES[index];
    const speed = deleting ? 30 : 50;
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1800);
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
  }, [displayed, deleting, index, shouldReduceMotion]);

  return (
    <div className="mb-1 mt-3 flex justify-center">
      <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={glassSurface()}>
        <FiTerminal aria-hidden="true" size={14} className="shrink-0 text-indigo-400 opacity-70" />
        <span className="font-mono text-sm tracking-wide text-indigo-300 md:text-base">
          {displayed}
          <motion.span
            aria-hidden="true"
            animate={shouldReduceMotion ? {} : { opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
            className="ml-0.5 inline-block h-[1em] w-0.5 bg-indigo-400/70 align-middle"
          />
        </span>
      </div>
    </div>
  );
}

// ─── Command Palette ─────────────────────────────────────────────────────────

function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = RESULTS.filter((r) => r.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  const handleAction = useCallback(
    (item: ResultItem) => {
      onClose();
      if (item.scroll) {
        document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
      } else if (item.download) {
        const a = document.createElement("a");
        a.href = item.href;
        a.download = "";
        a.click();
      } else {
        window.open(item.href, "_blank", "noopener,noreferrer");
      }
    },
    [onClose]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") setActive((p) => Math.min(p + 1, filtered.length - 1));
      if (e.key === "ArrowUp") setActive((p) => Math.max(p - 1, 0));
      if (e.key === "Enter" && filtered[active]) handleAction(filtered[active]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, active, filtered, handleAction, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: "rgba(2,6,23,0.55)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Palette */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Quick actions"
            className="fixed left-1/2 top-[22%] z-50 w-full max-w-md"
            style={{ translateX: "-50%" }}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="overflow-hidden rounded-xl"
              style={{
                background: "linear-gradient(160deg, rgba(15,23,42,0.6), rgba(15,23,42,0.35))",
                backdropFilter: "blur(28px) saturate(180%)",
                WebkitBackdropFilter: "blur(28px) saturate(180%)",
                border: `1px solid ${GLASS_BORDER}`,
                boxShadow: `0 24px 60px rgba(0,0,0,0.5), ${GLASS_HIGHLIGHT}`,
              }}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3">
                <FiCommand aria-hidden="true" size={14} className="shrink-0 text-indigo-400" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  placeholder="Type a command…"
                  aria-label="Search quick actions"
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                />
                <kbd className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-white/30">ESC</kbd>
              </div>
              {/* Results */}
              <div className="py-1.5">
                {filtered.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      className="w-full text-left"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => handleAction(item)}
                    >
                      <div
                        className="flex items-center gap-3 px-4 py-2.5 transition-colors"
                        style={{ background: i === active ? "rgba(99,102,241,0.15)" : "transparent" }}
                      >
                        <div
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                          style={{ background: "rgba(99,102,241,0.15)" }}
                        >
                          <Icon aria-hidden="true" size={13} className="text-indigo-400" />
                        </div>
                        <span className="flex-1 text-sm text-white/80">{item.label}</span>
                        <kbd className="font-mono text-[11px] text-white/25">{item.shortcut}</kbd>
                      </div>
                    </button>
                  );
                })}
                {filtered.length === 0 && (
                  <p className="py-6 text-center text-sm text-white/30">No results for "{query}"</p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Status Bar ───────────────────────────────────────────────────────────────

function StatusBadge({
  children,
  dot,
  reducedMotion = false,
}: {
  children: React.ReactNode;
  dot?: boolean;
  reducedMotion?: boolean;
}) {
  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium"
      style={{
        background: "linear-gradient(135deg, rgba(16,185,129,0.14), rgba(16,185,129,0.04))",
        backdropFilter: GLASS_BLUR_SM,
        WebkitBackdropFilter: GLASS_BLUR_SM,
        border: "1px solid rgba(16,185,129,0.28)",
        boxShadow: GLASS_HIGHLIGHT,
        color: "#34d399",
      }}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 rounded-full bg-emerald-400 ${reducedMotion ? "" : "animate-pulse"}`}
        />
      )}
      {children}
    </div>
  );
}

// ─── Scroll Indicator ────────────────────────────────────────────────────────

function ScrollIndicator({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group mx-auto mt-14 flex flex-col items-center gap-1.5"
      aria-label="Scroll to projects"
    >
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/25 transition-colors group-hover:text-white/50">
        Scroll
      </span>
      <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
        <FiChevronDown
          aria-hidden="true"
          size={14}
          className="text-white/25 transition-colors group-hover:text-white/50"
        />
      </motion.div>
    </button>
  );
}

// ─── Social Links ─────────────────────────────────────────────────────────────

function SocialLinks() {
  const links = [
    { icon: FiGithub, href: "https://github.com/", label: "GitHub" },
    { icon: FiLinkedin, href: "https://linkedin.com/", label: "LinkedIn" },
    { icon: FiMail, href: "mailto:example@gmail.com", label: "Email" },
  ];
  return (
    <div className="mt-5 flex items-center justify-center gap-3">
      {links.map(({ icon: Icon, href, label }) => (
        <motion.a
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={glassSurface({ color: "rgba(255,255,255,0.5)" })}
          whileHover={{
            scale: 1.06,
            background: "linear-gradient(135deg, rgba(99,102,241,0.22), rgba(255,255,255,0.04))",
            borderColor: "rgba(99,102,241,0.45)",
            color: "#c7d2fe",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.25 }}
        >
          <Icon aria-hidden="true" size={15} />
        </motion.a>
      ))}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [cmdOpen, setCmdOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const closeCmdPalette = useCallback(() => {
    setCmdOpen(false);
    // Return focus to the trigger rather than dropping it on the floor.
    triggerRef.current?.focus();
  }, []);

  // Global ⌘K shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollToProjects = useCallback(() => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20"
        style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #080d1a 100%)" }}
      >
        {/* Layered background */}
        <GridBackground />
        <FloatingOrbs />
        <Spotlight sectionRef={sectionRef} />

        {/* Scroll-linked wrapper */}
        <motion.div
          style={{ opacity: contentOpacity, y: shouldReduceMotion ? 0 : contentY }}
          className="relative z-10 mx-auto w-full max-w-2xl"
        >
          {/* Glass panel — the signature element. Everything inside sits on
              frosted glass floating over the colored orbs and grid behind it. */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="relative overflow-hidden rounded-4xl px-6 py-12 text-center sm:rounded-[40px] sm:px-10 sm:py-14 md:px-14 md:py-16"
            style={{
              background: GLASS_FILL,
              backdropFilter: GLASS_BLUR,
              WebkitBackdropFilter: GLASS_BLUR,
              border: `1px solid ${GLASS_BORDER}`,
              boxShadow: `${GLASS_SHADOW}, ${GLASS_HIGHLIGHT}`,
            }}
          >
            <NoiseOverlay />

            <div className="relative z-10">
              {/* Status badge */}
              <motion.div variants={fadeUp} className="mb-7 flex justify-center">
                <StatusBadge dot reducedMotion={!!shouldReduceMotion}>
                  Open to opportunities
                </StatusBadge>
              </motion.div>

              {/* Avatar */}
              <Avatar />

              {/* Name */}
              <motion.h1
                variants={fadeUp}
                className="mt-2 text-4xl font-bold tracking-tight text-white md:text-6xl"
                style={{ letterSpacing: "-0.02em" }}
              >
                Saranga{" "}
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #c084fc 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Rasingolla
                </span>
              </motion.h1>

              {/* Typed roles */}
              <motion.div variants={fadeUp}>
                <TypedRoles />
              </motion.div>

              {/* Short bio */}
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-5 max-w-md text-sm leading-relaxed md:text-base"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Building resilient software with a security-first mindset. Passionate
                about clean architecture, performance, and delightful interfaces.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
              >
                {/* Primary — stays a vibrant solid fill for emphasis, with a
                    glass-style top sheen so it still belongs to this material. */}
                <motion.a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToProjects();
                  }}
                  className="group flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                    boxShadow: "0 0 20px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.25)",
                  }}
                  whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(99,102,241,0.45), inset 0 1px 0 rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                >
                  View Projects
                  <FiArrowRight aria-hidden="true" size={14} className="transition-transform group-hover:translate-x-0.5" />
                </motion.a>

                {/* Download Resume — true glass */}
                <motion.a
                  href="/resume.pdf"
                  download
                  className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold"
                  style={glassSurface({ border: `1px solid ${GLASS_BORDER}`, color: "rgba(255,255,255,0.75)" })}
                  whileHover={{
                    background: "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(255,255,255,0.04))",
                    borderColor: "rgba(99,102,241,0.4)",
                    color: "#fff",
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                >
                  <FiDownload aria-hidden="true" size={13} />
                  Resume
                </motion.a>

                {/* Command Palette trigger — glass, most subdued of the three */}
                <motion.button
                  ref={triggerRef}
                  onClick={() => setCmdOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={cmdOpen}
                  className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm"
                  style={glassSurface({ color: "rgba(255,255,255,0.4)" })}
                  whileHover={{
                    background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(255,255,255,0.02))",
                    borderColor: "rgba(99,102,241,0.3)",
                    color: "rgba(165,180,252,0.9)",
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                >
                  <FiCommand aria-hidden="true" size={13} />
                  <span>Quick actions</span>
                  <kbd
                    className="rounded px-1.5 py-0.5 font-mono text-[10px]"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    ⌘K
                  </kbd>
                </motion.button>
              </motion.div>

              {/* Social links */}
              <motion.div variants={fadeUp}>
                <SocialLinks />
              </motion.div>

              {/* Divider */}
              <motion.div variants={fadeUp} className="mt-10 flex items-center justify-center gap-4">
                <div className="h-px w-16" style={{ background: "rgba(255,255,255,0.08)" }} />
                <span
                  className="rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest"
                  style={glassSurface({ color: "rgba(255,255,255,0.45)" })}
                >
                  Based in Sri Lanka
                </span>
                <div className="h-px w-16" style={{ background: "rgba(255,255,255,0.08)" }} />
              </motion.div>

              {/* Scroll hint */}
              <motion.div variants={fadeUp}>
                <ScrollIndicator onClick={scrollToProjects} />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Command Palette */}
      <CommandPalette open={cmdOpen} onClose={closeCmdPalette} />
    </>
  );
}