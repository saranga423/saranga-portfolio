import { motion } from "framer-motion";

interface Props {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}

export function SectionHeading({ index, eyebrow, title, description }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mb-16 max-w-3xl"
    >
      <div className="mb-4 flex items-center gap-3 text-foreground/55">
        <span className="font-sans-ui text-[11px] tracking-[0.3em]">{index}</span>
        <span className="h-px w-8 bg-foreground/30" />
        <span className="text-[11px] uppercase tracking-[0.3em]">{eyebrow}</span>
      </div>
      <h2 className="font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-6 max-w-2xl text-foreground/65 md:text-lg">{description}</p>
      )}
    </motion.div>
  );
}
