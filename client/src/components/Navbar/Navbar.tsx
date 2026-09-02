import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiMenuAlt4,
  HiX,
  HiArrowRight,
} from "react-icons/hi";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("About");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = links
        .map((link) => {
          const section = document.querySelector(link.href);
          if (!section) return null;

          const rect = section.getBoundingClientRect();

          return {
            label: link.label,
            top: Math.abs(rect.top - 120),
          };
        })
        .filter(Boolean) as { label: string; top: number }[];

      if (sections.length) {
        const closest = sections.sort((a, b) => a.top - b.top)[0];

        if (closest) {
          setActive(closest.label);
        }
      }
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleNavigation = (label: string) => {
    setActive(label);
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
    >
      <nav
        className={`
          mx-auto flex h-[68px] w-full max-w-7xl items-center
          justify-between rounded-2xl px-4 sm:px-6
          transition-all duration-500
          ${
            scrolled
              ? "border border-white/10 bg-black/65 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
              : "border border-transparent bg-transparent"
          }
        `}
      >
        {/* ───────────────── Logo ───────────────── */}
        <a
          href="#"
          onClick={() => setActive("About")}
          className="group flex items-center gap-3"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/[0.08] transition-all duration-300 group-hover:border-primary/60 group-hover:bg-primary/[0.14]">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_currentColor]" />

            <span className="absolute inset-0 rounded-xl border border-primary/0 transition-all duration-300 group-hover:inset-[-3px] group-hover:border-primary/20" />
          </span>

          <div className="hidden leading-none sm:block">
            <span className="block font-display text-base font-semibold tracking-tight text-foreground">
              Saranga
            </span>

            <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.22em] text-foreground/30">
              Software Engineer
            </span>
          </div>
        </a>

        {/* ───────────────── Desktop Navigation ───────────────── */}
        <div className="hidden md:flex md:items-center md:gap-2">
          <div className="flex items-center rounded-xl border border-white/[0.06] bg-white/[0.025] p-1">
            {links.map((link) => {
              const isActive = active === link.label;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavigation(link.label)}
                  className="relative rounded-lg px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-300"
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-lg bg-white/[0.07]"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive
                        ? "text-foreground"
                        : "text-foreground/40 hover:text-foreground/80"
                    }`}
                  >
                    {link.label}
                  </span>

                  {isActive && (
                    <motion.span
                      layoutId="navbar-dot"
                      className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_8px_currentColor]"
                    />
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {/* ───────────────── CTA ───────────────── */}
        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={() => setActive("Contact")}
            className="
              group inline-flex items-center gap-2
              rounded-xl border border-primary/30
              bg-primary/[0.07]
              px-4 py-2.5
              text-[11px] font-medium uppercase
              tracking-[0.16em] text-foreground
              transition-all duration-300
              hover:border-primary/60
              hover:bg-primary
              hover:text-primary-foreground
            "
          >
            <span>Let&apos;s talk</span>

            <HiArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        {/* ───────────────── Mobile Menu Button ───────────────── */}
        <button
          onClick={() => setOpen((value) => !value)}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl border border-white/10
            bg-white/[0.035]
            text-foreground/70
            transition-all duration-300
            hover:border-primary/30
            hover:bg-primary/[0.08]
            hover:text-primary
            md:hidden
          "
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <HiX size={19} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <HiMenuAlt4 size={20} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* ───────────────── Mobile Navigation ───────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.button
              aria-label="Close navigation"
              className="fixed inset-0 top-[84px] -z-10 bg-black/40 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{
                opacity: 0,
                y: -12,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.98,
              }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mx-auto mt-2 w-full max-w-7xl
                overflow-hidden rounded-2xl
                border border-white/10
                bg-[#0b0b0b]/90
                shadow-[0_25px_80px_rgba(0,0,0,0.5)]
                backdrop-blur-2xl
                md:hidden
              "
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/70">
                    Navigation
                  </p>

                  <p className="mt-1 text-xs text-foreground/35">
                    Explore the portfolio
                  </p>
                </div>

                <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-emerald-400/70">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Available
                </span>
              </div>

              {/* Links */}
              <div className="p-3">
                {links.map((link, index) => {
                  const isActive = active === link.label;

                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => handleNavigation(link.label)}
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.04,
                        duration: 0.25,
                      }}
                      className={`
                        group relative flex items-center
                        justify-between rounded-xl
                        px-4 py-3.5
                        transition-all duration-300
                        ${
                          isActive
                            ? "bg-primary/[0.08]"
                            : "hover:bg-white/[0.035]"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`
                            font-mono text-[9px]
                            transition-colors
                            ${
                              isActive
                                ? "text-primary/80"
                                : "text-foreground/20"
                            }
                          `}
                        >
                          0{index + 1}
                        </span>

                        <span
                          className={`
                            text-sm font-medium
                            transition-colors
                            ${
                              isActive
                                ? "text-foreground"
                                : "text-foreground/55 group-hover:text-foreground"
                            }
                          `}
                        >
                          {link.label}
                        </span>
                      </div>

                      <HiArrowRight
                        size={14}
                        className={`
                          transition-all duration-300
                          ${
                            isActive
                              ? "text-primary"
                              : "text-foreground/15 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground/50"
                          }
                        `}
                      />

                      {isActive && (
                        <motion.span
                          layoutId="mobile-active"
                          className="absolute bottom-2 left-4 h-0.5 w-5 rounded-full bg-primary shadow-[0_0_8px_currentColor]"
                        />
                      )}
                    </motion.a>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <div className="border-t border-white/[0.06] p-3">
                <a
                  href="#contact"
                  onClick={() => handleNavigation("Contact")}
                  className="
                    flex w-full items-center
                    justify-center gap-2
                    rounded-xl
                    bg-primary
                    px-5 py-3
                    text-xs font-semibold
                    uppercase tracking-[0.18em]
                    text-primary-foreground
                    transition-all duration-300
                    hover:bg-primary/90
                  "
                >
                  Start a conversation
                  <HiArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}