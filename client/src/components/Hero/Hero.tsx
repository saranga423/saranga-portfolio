import { motion, type Variants } from "framer-motion";
import { FiArrowDownRight, FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";
import photo from "../../assets/images/photo.png";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="grid-texture absolute inset-0 -z-10" />
      <div
        className="absolute inset-0 -z-20"
        style={{ background: "var(--gradient-hero)" }}
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="lg:col-span-7"
        >
          <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-primary" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-foreground/60">
              Portfolio · 2026
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-[14vw] leading-[0.95] tracking-tight md:text-[7.5rem]"
          >
            <span className="block text-foreground">Saranga</span>
            <span className="block italic text-gradient">Rasingolla</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg"
          >
            Full-stack software engineer crafting cinematic, considered digital
            products at the intersection of design and engineering — from refined
            interfaces to resilient backends.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm uppercase tracking-[0.2em] text-primary-foreground transition-all hover:shadow-elegant"
            >
              View work
              <FiArrowDownRight className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 rounded-full border border-border px-7 py-3.5 text-sm uppercase tracking-[0.2em] text-foreground/80 transition-all hover:border-primary/60 hover:text-foreground"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 flex items-center gap-5 text-foreground/60">
            {[FiGithub, FiLinkedin, FiTwitter, FiMail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="rounded-full border border-border p-2.5 transition-all hover:border-primary/60 hover:text-foreground"
              >
                <Icon size={16} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Photo column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative lg:col-span-5"
        >
          <div className="relative mx-auto aspect-4/5 w-full max-w-md">
            <div className="absolute -inset-6 -z-10 rounded-4xl bg-linear-to-br from-primary/30 via-transparent to-accent/20 blur-2xl" />
            <div className="ring-elegant relative h-full w-full overflow-hidden rounded-[1.75rem]">
              <img
                src={photo}
                alt="Saranga, software engineer"
                width={1024}
                height={1280}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
            </div>

            {/* Floating cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="glass-strong absolute -left-6 top-10 hidden rounded-2xl px-4 py-3 sm:block"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                Status
              </p>
              <p className="mt-1 flex items-center gap-2 text-sm text-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Available for work
              </p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="glass-strong absolute -right-4 bottom-12 hidden rounded-2xl px-4 py-3 sm:block"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                Based in
              </p>
              <p className="mt-1 text-sm text-foreground">Colombo · Remote</p>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="glass mt-8 grid grid-cols-3 divide-x divide-border rounded-2xl px-2 py-4">
            {[
              { k: "5+", v: "Years" },
              { k: "40+", v: "Projects" },
              { k: "12", v: "Clients" },
            ].map((s) => (
              <div key={s.v} className="px-2 text-center">
                <p className="font-display text-3xl text-foreground">{s.k}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-foreground/55">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
