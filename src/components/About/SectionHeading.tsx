import { motion, type Variants } from "framer-motion";
import { FiArrowDownRight, FiMinus } from "react-icons/fi";

interface Props {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.04,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={container}
      className="relative mb-16 w-full max-w-6xl sm:mb-24"
    >
      {/* Decorative background number — drifts in slightly slower, behind everything else */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: 26, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1, ease: EASE }}
        className="pointer-events-none absolute -right-2 -top-14 select-none font-mono text-[96px] font-bold leading-none tracking-[-0.08em] text-transparent sm:-top-20 sm:text-[140px]"
        style={{
          WebkitTextStroke: "1px rgba(255,255,255,0.045)",
        }}
      >
        {index}
      </motion.div>

      {/* Top metadata row */}
      <motion.div variants={fadeUp} className="relative flex items-center gap-3">
        <span className="flex h-7 min-w-7 items-center justify-center rounded-lg border border-primary/20 bg-primary/[0.07] px-2 font-mono text-[10px] font-medium text-primary">
          {index}
        </span>

        <span className="h-px w-8 bg-primary/35" />

        <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-foreground/40">
          {eyebrow}
        </span>

        <span className="ml-1 hidden items-center gap-1 text-[9px] uppercase tracking-[0.2em] text-foreground/20 sm:flex">
          <FiMinus size={10} />
          Portfolio
        </span>
      </motion.div>

      {/* Main heading */}
      <motion.div
        variants={fadeUp}
        className="relative mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end lg:gap-16"
      >
        <h2 className="font-display text-[clamp(2.7rem,6vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-foreground">
          {title}
        </h2>

        {description && (
          <div className="relative lg:pb-1.5">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_currentColor]" />
              <span className="text-[9px] uppercase tracking-[0.24em] text-primary/60">
                Overview
              </span>
            </div>

            <p className="max-w-md text-sm leading-6 text-foreground/45 sm:text-[15px]">
              {description}
            </p>
          </div>
        )}
      </motion.div>

      {/* Bottom rule — draws in from the left once the heading is in view */}
      <motion.div variants={fadeUp} className="relative mt-10 flex items-center gap-4">
        <span className="h-1.5 w-1.5 shrink-0 rounded-sm bg-primary/50" />

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
          style={{ transformOrigin: "left" }}
          className="h-px flex-1 bg-gradient-to-r from-primary/40 via-foreground/10 to-transparent"
        />

        <motion.span
          animate={{ x: [0, 3, 0], y: [0, 3, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="shrink-0"
        >
          <FiArrowDownRight
            aria-hidden="true"
            size={15}
            className="text-primary/50"
          />
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export default SectionHeading;