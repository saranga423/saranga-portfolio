import { motion } from "framer-motion";
import { FiArrowDownRight, FiMinus } from "react-icons/fi";

interface Props {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative mb-14 w-full max-w-6xl sm:mb-20"
    >
      {/* Decorative background number */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-12 select-none font-mono text-[90px] font-bold leading-none tracking-[-0.08em] text-white/[0.025] sm:-top-16 sm:text-[130px]"
      >
        {index}
      </div>

      {/* Top metadata row */}
      <div className="relative flex items-center gap-3">
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
      </div>

      {/* Main heading */}
      <div className="relative mt-7 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end lg:gap-16">
        <h2 className="font-display text-[clamp(2.7rem,6vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-foreground">
          {title}
        </h2>

        {description && (
          <div className="relative lg:pb-1">
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
      </div>

      {/* Bottom rule */}
      <div className="relative mt-9 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-primary/30 via-foreground/10 to-transparent" />

        <FiArrowDownRight
          aria-hidden="true"
          size={15}
          className="shrink-0 text-primary/50"
        />
      </div>
    </motion.div>
  );
}

export default SectionHeading;
