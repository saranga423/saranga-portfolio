import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  FiArrowDown,
  FiArrowRight,
  FiCommand,
  FiDownload,
  FiFolder,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiTerminal,
  FiX,
} from "react-icons/fi";
import { useCallback, useEffect, useRef, useState } from "react";
import photo from "../../assets/images/photo.jpg";

const ROLES = [
  "Software Engineer",
  "Cybersecurity Enthusiast",
  "Analytical Thinker",
  "UI/UX-Driven Developer",
];

interface ActionItem {
  icon: React.ElementType;
  label: string;
  description: string;
  shortcut: string;
  href: string;
  scroll?: boolean;
  download?: boolean;
}

const ACTIONS: ActionItem[] = [
  {
    icon: FiFolder,
    label: "View projects",
    description: "Explore selected work and case studies",
    shortcut: "P",
    href: "#projects",
    scroll: true,
  },
  {
    icon: FiDownload,
    label: "Download resume",
    description: "Get the latest CV as a PDF",
    shortcut: "R",
    href: "../../../public/Saranga_Rasingolla .pdf",
    download: true,
  },
  {
    icon: FiGithub,
    label: "GitHub",
    description: "See code, experiments and open-source work",
    shortcut: "G",
    href: "https://github.com/",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    description: "Connect professionally",
    shortcut: "L",
    href: "https://linkedin.com/",
  },
  {
    icon: FiMail,
    label: "Send email",
    description: "Start a conversation",
    shortcut: "E",
    href: "mailto:example@gmail.com",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

function Background() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#070707]" />

      <div className="absolute -left-40 top-[-15%] h-[520px] w-[520px] rounded-full bg-cyan-400/[0.08] blur-[130px]" />
      <div className="absolute -right-32 top-[12%] h-[460px] w-[460px] rounded-full bg-blue-500/[0.07] blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[35%] h-[500px] w-[500px] rounded-full bg-violet-500/[0.05] blur-[140px]" />

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at center, black, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black, transparent 78%)",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[min(65vw,720px)] w-[min(65vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]"
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />

      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

function CursorGlow({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 55, damping: 24 });
  const y = useSpring(0, { stiffness: 55, damping: 24 });

  useEffect(() => {
    if (reduce) return;
    const section = sectionRef.current;
    if (!section) return;

    const move = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      x.set(event.clientX - rect.left);
      y.set(event.clientY - rect.top);
    };

    section.addEventListener("mousemove", move);
    return () => section.removeEventListener("mousemove", move);
  }, [reduce, sectionRef, x, y]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-[1] h-[520px] w-[520px] rounded-full"
      style={{
        left: x,
        top: y,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(34,211,238,.09), rgba(34,211,238,.025) 35%, transparent 70%)",
      }}
    />
  );
}

function TopBar({ onCommand }: { onCommand: () => void }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute left-0 right-0 top-0 z-20"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-10">
      

        <div className="flex items-center gap-2">
        </div>
      </div>
    </motion.header>
  );
}

function Avatar() {
  return (
    <div className="relative mx-auto h-28 w-28">
      <div className="absolute -inset-3 rounded-full border border-cyan-300/10" />
      <div className="absolute -inset-6 rounded-full border border-white/[0.035]" />
      <div className="absolute inset-0 rounded-full bg-cyan-300/10 blur-2xl" />

      <img
        src={photo}
        alt="Saranga Rasingolla"
        className="relative h-full w-full rounded-full object-cover"
        style={{
          border: "1px solid rgba(255,255,255,.18)",
          boxShadow:
            "0 0 0 5px rgba(34,211,238,.055), 0 20px 60px rgba(0,0,0,.45)",
        }}
      />

      <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-[3px] border-[#080808] bg-emerald-400" />
    </div>
  );
}

function RoleTicker() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setText(ROLES[0]);
      return;
    }

    const role = ROLES[index];
    const speed = deleting ? 28 : 55;

    const timer = window.setTimeout(() => {
      if (!deleting) {
        if (text.length < role.length) {
          setText(role.slice(0, text.length + 1));
        } else {
          setDeleting(true);
        }
      } else if (text.length > 0) {
        setText(role.slice(0, text.length - 1));
      } else {
        setDeleting(false);
        setIndex((value) => (value + 1) % ROLES.length);
      }
    }, text.length === role.length && !deleting ? 1700 : speed);

    return () => window.clearTimeout(timer);
  }, [deleting, index, reduce, text]);

  return (
    <div className="mt-6 flex items-center justify-center gap-2 font-mono text-sm text-cyan-300">
      <FiTerminal size={14} className="text-cyan-400/70" />
      <span>{text}</span>
      <span className="h-4 w-px animate-pulse bg-cyan-300/70" />
    </div>
  );
}

function Socials() {
  const items = [
    { icon: FiGithub, label: "GitHub", href: "https://github.com/" },
    { icon: FiLinkedin, label: "LinkedIn", href: "https://linkedin.com/" },
    { icon: FiMail, label: "Email", href: "mailto:example@gmail.com" },
  ];

  return (
    <div className="mt-8 flex justify-center gap-2">
      {items.map(({ icon: Icon, label, href }) => (
        <motion.a
          key={label}
          href={href}
          aria-label={label}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noreferrer"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.96 }}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-white/45 transition hover:border-cyan-300/25 hover:bg-cyan-300/[0.07] hover:text-cyan-300"
        >
          <Icon size={16} />
        </motion.a>
      ))}
    </div>
  );
}

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

  const filtered = ACTIONS.filter((item) =>
    `${item.label} ${item.description}`.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, [open]);

  const action = useCallback(
    (item: ActionItem) => {
      onClose();

      if (item.scroll) {
        document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      if (item.download) {
        const link = document.createElement("a");
        link.href = item.href;
        link.download = "";
        link.click();
        return;
      }

      if (item.href.startsWith("mailto:")) {
        window.location.href = item.href;
        return;
      }

      window.open(item.href, "_blank", "noopener,noreferrer");
    },
    [onClose]
  );

  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if (!open) return;

      if (event.key === "Escape") onClose();

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((value) => Math.min(value + 1, Math.max(filtered.length - 1, 0)));
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((value) => Math.max(value - 1, 0));
      }

      if (event.key === "Enter" && filtered[active]) {
        event.preventDefault();
        action(filtered[active]);
      }
    };

    window.addEventListener("keydown", keyboard);
    return () => window.removeEventListener("keydown", keyboard);
  }, [action, active, filtered, onClose, open]);

  useEffect(() => {
    setActive((value) => Math.min(value, Math.max(filtered.length - 1, 0)));
  }, [filtered.length]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label="Close quick actions"
            className="fixed inset-0 z-40 cursor-default bg-black/65 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Quick actions"
            className="fixed left-1/2 top-[15%] z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#101010]/95 shadow-[0_30px_100px_rgba(0,0,0,.65)] backdrop-blur-2xl"
            initial={{ opacity: 0, y: -18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
          >
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-4">
              <FiCommand className="text-cyan-300" size={16} />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                placeholder="Search actions..."
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/25"
              />
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-white/30 hover:bg-white/5 hover:text-white"
                aria-label="Close"
              >
                <FiX size={15} />
              </button>
            </div>

            <div className="p-2">
              {filtered.map((item, index) => {
                const Icon = item.icon;
                const selected = index === active;

                return (
                  <button
                    key={item.label}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => action(item)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                      selected
                        ? "bg-cyan-300/[0.08] text-white"
                        : "text-white/60 hover:bg-white/[0.04]"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                        selected
                          ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-300"
                          : "border-white/10 bg-white/[0.03]"
                      }`}
                    >
                      <Icon size={15} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">{item.label}</span>
                      <span className="mt-0.5 block truncate text-xs text-white/30">
                        {item.description}
                      </span>
                    </span>

                    <kbd className="rounded-md border border-white/10 px-2 py-1 font-mono text-[10px] text-white/25">
                      {item.shortcut}
                    </kbd>
                  </button>
                );
              })}

              {!filtered.length && (
                <div className="px-4 py-10 text-center text-sm text-white/25">
                  No matching actions.
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-3 text-[10px] text-white/20">
              <span>Navigate with ↑ ↓</span>
              <span>Enter to select · Esc to close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const scrollToProjects = useCallback(() => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((value) => !value);
      }
    };

    window.addEventListener("keydown", keyboard);
    return () => window.removeEventListener("keydown", keyboard);
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden bg-[#070707] text-white"
      >
        <Background />
        <CursorGlow sectionRef={sectionRef} />
        <TopBar onCommand={() => setCommandOpen(true)} />

        <motion.div
          style={{ opacity, y: reduce ? 0 : y }}
          className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 pb-16 pt-28 lg:px-10"
        >
          <div className="grid w-full items-center gap-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
            {/* Main introduction */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeUp}>
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-[11px] uppercase tracking-[0.18em] text-white/45">
                  <FiMapPin className="text-cyan-300/80" size={12} />
                  Based in Sri Lanka
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="lg:hidden">
                <Avatar />
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-cyan-300/70"
              >
                Hello, I&apos;m Saranga
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="text-[clamp(3.2rem,9vw,6.8rem)] font-bold leading-[0.92] tracking-[-0.055em]"
              >
                Building
                <br />
                <span className="bg-gradient-to-r from-white via-white to-cyan-300 bg-clip-text text-transparent">
                  better systems.
                </span>
              </motion.h1>

              <motion.div variants={fadeUp}>
                <RoleTicker />
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/42 sm:text-base lg:mx-0"
              >
                Software engineer focused on resilient applications, clean
                architecture, security-minded development, and interfaces that
                feel as good as they perform.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
              >
                <motion.a
                  href="#projects"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToProjects();
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200"
                >
                  Explore my work
                  <FiArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </motion.a>

                <motion.a
                  href="/resume.pdf"
                  download
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/75 transition hover:border-cyan-300/25 hover:bg-cyan-300/[0.06] hover:text-white"
                >
                  <FiDownload size={14} />
                  Download resume
                </motion.a>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Socials />
              </motion.div>
            </motion.div>

            {/* Visual / identity panel */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="relative hidden lg:block"
            >
              <div className="relative mx-auto max-w-[430px]">
                <div className="absolute -inset-8 rounded-[40px] bg-cyan-300/[0.035] blur-3xl" />

                <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] p-7 shadow-[0_35px_100px_rgba(0,0,0,.4)] backdrop-blur-xl">
                  <div className="mb-10 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">
                      PROFILE / 01
                    </span>
                    <span className="flex items-center gap-2 font-mono text-[10px] text-emerald-300/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      ONLINE
                    </span>
                  </div>

                  <Avatar />

                  <div className="mt-9 text-center">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Saranga Rasingolla
                    </h2>
                    <p className="mt-2 text-sm text-white/35">
                      Software Engineer
                    </p>
                  </div>

                  <div className="mt-8 grid grid-cols-3 divide-x divide-white/[0.07] rounded-2xl border border-white/[0.07] bg-black/10 py-4">
                    <div className="text-center">
                      <p className="font-mono text-xs text-cyan-300">01</p>
                      <p className="mt-1 text-[10px] uppercase tracking-wider text-white/25">
                        Mindset
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="font-mono text-xs text-cyan-300">02</p>
                      <p className="mt-1 text-[10px] uppercase tracking-wider text-white/25">
                        Security
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="font-mono text-xs text-cyan-300">03</p>
                      <p className="mt-1 text-[10px] uppercase tracking-wider text-white/25">
                        Design
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-white/25">
                      <FiTerminal size={12} />
                      CURRENT_FOCUS
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/55">
                      Engineering products that balance performance,
                      maintainability, security, and user experience.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <button
          onClick={scrollToProjects}
          className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2 text-white/25 transition hover:text-cyan-300"
          aria-label="Scroll to projects"
        >
          <span className="mb-2 block text-[9px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <motion.span
            className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.025]"
            animate={reduce ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <FiArrowDown size={14} />
          </motion.span>
        </button>
      </section>

      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
      />
    </>
  );
}
