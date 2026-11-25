import React, { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import {
  FiArrowUp,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiClock,
  FiFigma,
  FiArrowUpRight,
  FiHeart,
} from "react-icons/fi";
import { SiWhatsapp } from "react-icons/si";

interface SocialLinkProps {
  Icon: React.ElementType;
  href: string;
  label: string;
}

interface NavLinkProps {
  label: string;
  href: string;
}

const EMAIL = "rasingollasaranga35@gmail.com";

const SOCIALS: SocialLinkProps[] = [
  {
    Icon: FiGithub,
    href: "https://github.com/saranga423",
    label: "GitHub",
  },
  {
    Icon: FiLinkedin,
    href: "https://www.linkedin.com/in/saranga-rasingolla-2a6287249/",
    label: "LinkedIn",
  },
  {
    Icon: FiFigma,
    href: "https://www.figma.com/design/1Ztnoqf3BdIWeFx5auJtC1/SARANGA-RASINGOLLA?node-id=0-1&t=es4NbOk5z90BWbag-00",
    label: "Figma",
  },
  {
    Icon: FiMail,
    href: `mailto:${EMAIL}`,
    label: "Email",
  },
  {
    Icon: SiWhatsapp,
    href: "https://wa.me/94703572917",
    label: "WhatsApp",
  },
];

const NAV_LINKS: NavLinkProps[] = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

const MARQUEE_ITEMS = [
  "available for work",
  "full-stack engineer",
  "React · Node.js · TypeScript",
  "Colombo · Sri Lanka",
  "open to remote",
  "2026 engagements",
];

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Colombo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    };

    update();
    const interval = window.setInterval(update, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return <span>{time || "Loading…"}</span>;
}

function MarqueeStrip() {
  const reduceMotion = useReducedMotion();
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-white/[0.06]">
      <div className="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#07080d] to-transparent sm:w-28" />
      <div className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#07080d] to-transparent sm:w-28" />

      <motion.div
        className="flex w-max py-3.5"
        animate={reduceMotion ? { x: 0 } : { x: ["0%", "-50%"] }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 26,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        {items.map((item, index) => (
          <React.Fragment key={`${item}-${index}`}>
            <span className="px-6 font-mono text-[9px] uppercase tracking-[0.24em] text-white/25 sm:px-8">
              {item}
            </span>
            <span className="flex items-center text-[7px] text-primary/60">
              ◆
            </span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

function SocialIcon({ Icon, href, label }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      title={label}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.95 }}
      className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-white/35 transition-colors hover:border-primary/30 hover:bg-primary/[0.07] hover:text-primary"
    >
      <Icon size={15} />
    </motion.a>
  );
}

function FooterNavigation() {
  return (
    <div>
      <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.22em] text-white/25">
        Navigation
      </p>

      <nav className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-1">
        {NAV_LINKS.map(({ label, href }, index) => (
          <motion.a
            key={label}
            href={href}
            whileHover={{ x: 4 }}
            className="group flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/80"
          >
            <span className="font-mono text-[8px] text-white/15 group-hover:text-primary/60">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{label}</span>
            <FiArrowUpRight
              size={11}
              className="opacity-0 transition-opacity group-hover:opacity-60"
            />
          </motion.a>
        ))}
      </nav>
    </div>
  );
}

function ContactBlock() {
  return (
    <div>
      <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.22em] text-white/25">
        Start a conversation
      </p>

      <a
        href={`mailto:${EMAIL}`}
        className="group inline-flex max-w-full items-center gap-2 text-sm text-white/55 transition-colors hover:text-primary"
      >
        <FiMail size={14} className="shrink-0" />
        <span className="break-all">{EMAIL}</span>
        <FiArrowUpRight
          size={12}
          className="shrink-0 opacity-30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-80"
        />
      </a>

      <p className="mt-4 max-w-xs text-xs leading-5 text-white/25">
        Available for freelance, contract, and full-time opportunities.
      </p>

      <div className="mt-5 flex items-center gap-2">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-emerald-300/60">
          Currently available
        </span>
      </div>
    </div>
  );
}

function LocationBlock() {
  return (
    <div>
      <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.22em] text-white/25">
        Location
      </p>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/[0.07] text-primary/70">
            <FiMapPin size={12} />
          </span>
          <div>
            <p className="text-sm text-white/55">Colombo, Sri Lanka</p>
            <p className="mt-1 text-[10px] text-white/20">GMT+5:30</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/[0.07] text-primary/70">
            <FiClock size={12} />
          </span>
          <div>
            <p className="font-mono text-sm text-white/55">
              <LiveClock />
            </p>
            <p className="mt-1 text-[10px] text-white/20">Local time</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 350);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      whileHover={{ y: -4, scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-[100] flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-[#0b0e15]/90 text-primary shadow-[0_10px_35px_rgba(0,0,0,.35)] backdrop-blur-xl sm:bottom-8 sm:right-8"
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 -rotate-90"
        viewBox="0 0 48 48"
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="rgba(255,255,255,.07)"
          strokeWidth="1"
        />
        <motion.circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          pathLength={1}
          style={{ pathLength: scrollYProgress }}
        />
      </svg>

      <FiArrowUp size={16} />
    </motion.button>
  );
}

function FooterBottom() {
  return (
    <div className="flex flex-col gap-5 border-t border-white/[0.06] py-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/20">
          © 2026 Saranga Rasingolla
        </span>

        <span className="hidden h-3 w-px bg-white/10 sm:block" />

        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/15">
          React · TypeScript · Modern Web
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-[9px] text-white/20">
        Built with precision
        <FiHeart size={9} className="text-primary/60" />
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#07080d] text-foreground">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-220px] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/[0.055] blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />

      <MarqueeStrip />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="border-b border-white/[0.06] py-20 sm:py-28"
        >
          <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.25em] text-primary/60">
            Have a project in mind?
          </p>

          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <h2 className="max-w-4xl text-[clamp(3.4rem,9vw,8rem)] font-semibold leading-[0.86] tracking-[-0.065em] text-white">
                Let’s{" "}
                <span className="text-primary">talk.</span>
              </h2>

              <p className="mt-7 max-w-lg text-sm leading-6 text-white/30 sm:text-base">
                From product ideas to complex engineering challenges, let’s
                turn the next idea into something useful.
              </p>
            </div>

            <motion.a
              href={`mailto:${EMAIL}`}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex w-fit items-center gap-3 rounded-full border border-primary/25 bg-primary/[0.08] px-5 py-3.5 text-xs font-medium text-primary transition-colors hover:bg-primary/[0.14]"
            >
              Start a conversation
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <FiArrowUpRight size={13} />
              </span>
            </motion.a>
          </div>
        </motion.div>

        {/* Information grid */}
        <div className="grid gap-12 border-b border-white/[0.06] py-12 sm:py-14 lg:grid-cols-[1.15fr_.8fr_.9fr] lg:gap-16">
          <ContactBlock />
          <FooterNavigation />
          <LocationBlock />
        </div>

        {/* Social row */}
        <div className="flex flex-col gap-6 border-b border-white/[0.06] py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/15">
            Find me online
          </p>

          <div className="flex flex-wrap gap-2">
            {SOCIALS.map((social) => (
              <SocialIcon key={social.label} {...social} />
            ))}
          </div>
        </div>

        <FooterBottom />
      </div>

      <ScrollToTop />
    </footer>
  );
}

export default Footer;
