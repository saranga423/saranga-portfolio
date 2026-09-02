import React, { useEffect, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
  FiArrowLeft,
  FiCode,
  FiLayers,
  FiClock,
  FiUser,
  FiMessageSquare,
  FiZap,
  FiExternalLink,
} from "react-icons/fi";
import { SectionHeading } from "../About/SectionHeading";
import API from "../../api/api";

const EMAIL = "rasingollasaranga35@gmail.com";

const SERVICES = [
  { id: "fullstack", label: "Full Stack Development", icon: FiCode },
  { id: "frontend", label: "Frontend Engineering", icon: FiLayers },
  { id: "uiux", label: "UI / UX Design", icon: FiZap },
  { id: "mern", label: "MERN Applications", icon: FiCode },
  { id: "api", label: "API Development", icon: FiLayers },
  { id: "consulting", label: "Technical Consulting", icon: FiZap },
];

const TIMELINES = [
  { id: "asap", label: "ASAP" },
  { id: "2w", label: "1–2 Weeks" },
  { id: "1m", label: "1 Month" },
  { id: "3m", label: "2–3 Months" },
  { id: "flex", label: "Flexible" },
];

const SOCIALS = [
  {
    icon: FiGithub,
    label: "GitHub",
    href: "https://github.com/saranga423",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com",
  },
  {
    icon: FiMail,
    label: "Email",
    href: `mailto:${EMAIL}`,
  },
];

const STEPS = [
  { id: "who", label: "Profile", icon: FiUser },
  { id: "project", label: "Project", icon: FiCode },
  { id: "message", label: "Message", icon: FiMessageSquare },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const slideVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 30 : -30,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: EASE },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -30 : 30,
    transition: { duration: 0.25, ease: EASE },
  }),
};

function ContactBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <motion.div
        className="absolute -left-48 top-20 h-[520px] w-[520px] rounded-full bg-primary/[0.10] blur-[150px]"
        animate={
          reduceMotion ? {} : { x: [0, 30, 0], y: [0, -20, 0] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -right-48 bottom-0 h-[560px] w-[560px] rounded-full bg-cyan-400/[0.055] blur-[160px]"
        animate={
          reduceMotion ? {} : { x: [0, -25, 0], y: [0, 25, 0] }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
    </div>
  );
}

function AvailabilityCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-6"
    >
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/[0.08] blur-[70px]" />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
            Availability
          </span>

          <span className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-emerald-300/80">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Open
          </span>
        </div>

        <h3 className="text-xl font-semibold tracking-[-0.025em] text-white">
          Available for new work.
        </h3>

        <p className="mt-3 text-sm leading-6 text-white/35">
          Open to freelance, contract, and full-time opportunities. Typical
          response within 24 hours.
        </p>

        <div className="mt-6 space-y-3 border-t border-white/[0.06] pt-5">
          {[
            { icon: FiCode, text: "Web & App Development" },
            { icon: FiLayers, text: "Security Consulting" },
            { icon: FiClock, text: "GMT+5:30 · Sri Lanka" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/[0.08] text-primary/80">
                <Icon size={12} />
              </span>
              <span className="text-xs text-white/40">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SocialRow() {
  return (
    <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
      {SOCIALS.map(({ icon: Icon, label, href }) => (
        <motion.a
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 transition-colors hover:border-primary/20 hover:bg-primary/[0.045]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/[0.08] text-primary/80">
            <Icon size={14} />
          </span>

          <span className="text-sm text-white/50 transition-colors group-hover:text-white/75">
            {label}
          </span>

          <FiArrowRight
            size={12}
            className="ml-auto text-white/15 transition-all group-hover:translate-x-1 group-hover:text-primary/70"
          />
        </motion.a>
      ))}
    </div>
  );
}

function StepBar({ step }: { step: number }) {
  return (
    <div className="mb-9">
      <div className="mb-4 flex items-center">
        {STEPS.map((item, index) => {
          const Icon = item.icon;
          const done = index < step;
          const active = index === step;

          return (
            <React.Fragment key={item.id}>
              <div className="flex shrink-0 items-center gap-2">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300"
                  style={{
                    background: done
                      ? "#6366f1"
                      : active
                        ? "rgba(99,102,241,.12)"
                        : "rgba(255,255,255,.035)",
                    borderColor: active
                      ? "rgba(99,102,241,.55)"
                      : done
                        ? "rgba(99,102,241,.8)"
                        : "rgba(255,255,255,.08)",
                  }}
                >
                  {done ? (
                    <FiCheckCircle size={12} className="text-white" />
                  ) : (
                    <Icon
                      size={12}
                      className={
                        active ? "text-primary/90" : "text-white/25"
                      }
                    />
                  )}
                </div>

                <span
                  className="hidden text-[10px] uppercase tracking-[0.12em] sm:block"
                  style={{
                    color: active
                      ? "#a5b4fc"
                      : done
                        ? "rgba(165,180,252,.55)"
                        : "rgba(255,255,255,.22)",
                  }}
                >
                  {item.label}
                </span>
              </div>

              {index < STEPS.length - 1 && (
                <div className="mx-3 h-px flex-1 bg-white/[0.07]">
                  <motion.div
                    className="h-full bg-primary/50"
                    initial={false}
                    animate={{ width: index < step ? "100%" : "0%" }}
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="h-1 overflow-hidden rounded-full bg-white/[0.05]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
          animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.4, ease: EASE }}
        />
      </div>
    </div>
  );
}

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function Field({ label, error, ...props }: InputProps) {
  const id = props.id ?? props.name;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block font-mono text-[9px] uppercase tracking-[0.18em] text-white/30"
      >
        {label}
      </label>

      <input
        id={id}
        {...props}
        className={`w-full rounded-xl border bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/15 ${
          error
            ? "border-red-400/40"
            : "border-white/[0.08] focus:border-primary/45 focus:bg-primary/[0.035]"
        }`}
        aria-invalid={Boolean(error)}
      />

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-xs text-red-300/80"
        >
          <FiAlertCircle size={11} />
          {error}
        </motion.p>
      )}
    </div>
  );
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  max?: number;
}

function TextareaField({
  label,
  error,
  max,
  ...props
}: TextareaProps) {
  const id = props.id ?? props.name;
  const value = typeof props.value === "string" ? props.value : "";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30"
        >
          {label}
        </label>

        {max && (
          <span className="font-mono text-[9px] text-white/20">
            {value.length}/{max}
          </span>
        )}
      </div>

      <textarea
        id={id}
        {...props}
        maxLength={max}
        rows={6}
        className={`w-full resize-none rounded-xl border bg-white/[0.035] px-4 py-3.5 text-sm leading-6 text-white outline-none transition placeholder:text-white/15 ${
          error
            ? "border-red-400/40"
            : "border-white/[0.08] focus:border-primary/45 focus:bg-primary/[0.035]"
        }`}
        aria-invalid={Boolean(error)}
      />

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-xs text-red-300/80"
        >
          <FiAlertCircle size={11} />
          {error}
        </motion.p>
      )}
    </div>
  );
}

interface ChipGroupProps {
  label: string;
  options: {
    id: string;
    label: string;
    icon?: React.ElementType;
  }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function ChipGroup({
  label,
  options,
  value,
  onChange,
  error,
}: ChipGroupProps) {
  return (
    <div className="space-y-2">
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
        {label}
      </span>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((option) => {
          const Icon = option.icon;
          const active = value === option.id;

          return (
            <motion.button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              whileTap={{ scale: 0.97 }}
              className="flex min-h-[48px] items-center gap-2 rounded-xl border px-3 text-left text-xs transition-all"
              style={{
                background: active
                  ? "rgba(99,102,241,.12)"
                  : "rgba(255,255,255,.025)",
                borderColor: active
                  ? "rgba(99,102,241,.45)"
                  : "rgba(255,255,255,.07)",
                color: active
                  ? "#c7d2fe"
                  : "rgba(255,255,255,.38)",
              }}
            >
              {Icon && <Icon size={12} className="shrink-0" />}
              <span className="leading-4">{option.label}</span>
            </motion.button>
          );
        })}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-xs text-red-300/80"
        >
          <FiAlertCircle size={11} />
          {error}
        </motion.p>
      )}
    </div>
  );
}

interface FormData {
  name: string;
  email: string;
  service: string;
  timeline: string;
  subject: string;
  message: string;
}

const EMPTY: FormData = {
  name: "",
  email: "",
  service: "",
  timeline: "",
  subject: "",
  message: "",
};

type FieldErrors = Partial<Record<keyof FormData, string>>;

function validateStep(step: number, form: FormData): FieldErrors {
  const errors: FieldErrors = {};

  if (step === 0) {
    if (!form.name.trim()) {
      errors.name = "Your name is required";
    } else if (form.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Enter a valid email address";
    }
  }

  if (step === 1) {
    if (!form.service) errors.service = "Pick a service to continue";
    if (!form.timeline) errors.timeline = "Pick a timeline to continue";
    if (!form.subject.trim()) errors.subject = "Subject is required";
  }

  if (step === 2) {
    if (!form.message.trim()) {
      errors.message = "Message can't be empty";
    } else if (form.message.trim().length < 20) {
      errors.message = "Please add a bit more detail (20+ characters)";
    }
  }

  return errors;
}

function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex min-h-[430px] flex-col items-center justify-center px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
        className="mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/[0.08]"
      >
        <FiCheckCircle size={34} className="text-emerald-300" />
      </motion.div>

      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.22em] text-emerald-300/60">
        Transmission complete
      </p>

      <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white">
        Message sent.
      </h3>

      <p className="mt-3 max-w-sm text-sm leading-6 text-white/35">
        Thanks for reaching out. I’ll review your message and get back to you
        within 24 hours.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-8 rounded-xl border border-white/10 px-4 py-2.5 text-xs text-white/45 transition hover:border-primary/25 hover:text-white/75"
      >
        Send another message
      </button>
    </motion.div>
  );
}

const Contact = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [form, setForm] = useState<FormData>(EMPTY);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("contactDraft");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (parsed && typeof parsed === "object") {
          setForm((current) => ({
            ...current,
            ...parsed,
          }));
        }
      }
    } catch {
      // Ignore invalid local drafts.
    }
  }, []);

  useEffect(() => {
    try {
      if (!sent) {
        localStorage.setItem("contactDraft", JSON.stringify(form));
      }
    } catch {
      // Ignore localStorage failures.
    }
  }, [form, sent]);

  const updateField = useCallback(
    (field: keyof FormData) =>
      (
        event: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement
        >
      ) => {
        const value = event.target.value;

        setForm((previous) => ({
          ...previous,
          [field]: value,
        }));

        setErrors((previous) => {
          if (!previous[field]) return previous;

          const next = { ...previous };
          delete next[field];
          return next;
        });
      },
    []
  );

  const updateValue = useCallback(
    (field: keyof FormData) => (value: string) => {
      setForm((previous) => ({
        ...previous,
        [field]: value,
      }));

      setErrors((previous) => {
        if (!previous[field]) return previous;

        const next = { ...previous };
        delete next[field];
        return next;
      });
    },
    []
  );

  const next = () => {
    const stepErrors = validateStep(step, form);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    setDirection(1);
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  };

  const back = () => {
    setErrors({});
    setDirection(-1);
    setStep((current) => Math.max(current - 1, 0));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const stepErrors = validateStep(2, form);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      await API.post("/contact", form);

      setSent(true);
      localStorage.removeItem("contactDraft");
    } catch {
      setErrors({
        message: "Failed to send your message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSent(false);
    setStep(0);
    setDirection(1);
    setForm(EMPTY);
    setErrors({});
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#07080d] py-24 text-foreground sm:py-32"
    >
      <ContactBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          eyebrow="Contact"
          title={
            <>
              Let’s build something{" "}
              <span className="text-primary">meaningful.</span>
            </>
          }
          description="Have an idea, product, or technical challenge? Tell me what you’re working on and I’ll get back to you."
        />

        <div className="grid gap-6 lg:grid-cols-[310px_minmax(0,1fr)] lg:items-start lg:gap-8">
          {/* Information panel */}
          <motion.aside
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="space-y-4"
          >
            <AvailabilityCard />

            <div className="rounded-[22px] border border-primary/15 bg-primary/[0.035] p-5">
              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-primary/50">
                Direct channel
              </p>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 text-sm text-primary/80 transition hover:text-primary"
              >
                <FiMail size={13} />
                <span className="break-all">{EMAIL}</span>
              </a>

              <p className="mt-3 text-xs leading-5 text-white/25">
                Prefer email? Send your brief directly and skip the form.
              </p>
            </div>

            <SocialRow />

            <div className="flex items-center gap-2 px-1 pt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/20">
                Typical response · under 24 hours
              </span>
            </div>
          </motion.aside>

          {/* Form panel */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#0a0c12]/90 p-5 shadow-[0_25px_80px_rgba(0,0,0,.22)] backdrop-blur-2xl sm:p-8"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <AnimatePresence mode="wait">
              {sent ? (
                <SuccessScreen key="success" onReset={reset} />
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary/60">
                        Project inquiry
                      </p>
                      <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-white">
                        Start the conversation
                      </h3>
                    </div>

                    <span className="hidden items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-white/25 sm:flex">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Secure form
                    </span>
                  </div>

                  <div className="mt-8">
                    <StepBar step={step} />
                  </div>

                  <form onSubmit={submit} noValidate>
                    <AnimatePresence mode="wait" custom={direction}>
                      {step === 0 && (
                        <motion.div
                          key="step-profile"
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="space-y-5"
                        >
                          <div className="mb-6">
                            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/20">
                              01 / Introduction
                            </p>
                            <h4 className="mt-2 text-base font-medium text-white/85">
                              Who are you?
                            </h4>
                            <p className="mt-1 text-xs leading-5 text-white/30">
                              Give me the basics so I know who I’m speaking
                              with.
                            </p>
                          </div>

                          <Field
                            label="Full name"
                            name="name"
                            id="name"
                            placeholder="e.g. Alex Morgan"
                            value={form.name}
                            onChange={updateField("name")}
                            error={errors.name}
                            autoComplete="name"
                          />

                          <Field
                            label="Email address"
                            name="email"
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={updateField("email")}
                            error={errors.email}
                            autoComplete="email"
                          />
                        </motion.div>
                      )}

                      {step === 1 && (
                        <motion.div
                          key="step-project"
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="space-y-6"
                        >
                          <div className="mb-6">
                            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/20">
                              02 / Scope
                            </p>
                            <h4 className="mt-2 text-base font-medium text-white/85">
                              Tell me about the project
                            </h4>
                            <p className="mt-1 text-xs leading-5 text-white/30">
                              Choose what you need and roughly when you need
                              it.
                            </p>
                          </div>

                          <ChipGroup
                            label="Service"
                            options={SERVICES}
                            value={form.service}
                            onChange={updateValue("service")}
                            error={errors.service}
                          />

                          <ChipGroup
                            label="Timeline"
                            options={TIMELINES}
                            value={form.timeline}
                            onChange={updateValue("timeline")}
                            error={errors.timeline}
                          />

                          <Field
                            label="Subject"
                            name="subject"
                            id="subject"
                            placeholder="e.g. SaaS dashboard redesign"
                            value={form.subject}
                            onChange={updateField("subject")}
                            error={errors.subject}
                          />
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step-message"
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="space-y-6"
                        >
                          <div className="mb-6">
                            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/20">
                              03 / Brief
                            </p>
                            <h4 className="mt-2 text-base font-medium text-white/85">
                              What are you building?
                            </h4>
                            <p className="mt-1 text-xs leading-5 text-white/30">
                              Share the context, goals, requirements, or
                              technical challenge.
                            </p>
                          </div>

                          <TextareaField
                            label="Project message"
                            name="message"
                            id="message"
                            placeholder="Tell me about the problem you’re solving, what you need built, and anything else that matters…"
                            value={form.message}
                            onChange={updateField("message")}
                            error={errors.message}
                            max={1200}
                          />

                          <div className="rounded-2xl border border-primary/10 bg-primary/[0.035] p-4">
                            <div className="mb-3 flex items-center gap-2">
                              <FiZap size={12} className="text-primary/70" />
                              <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-primary/50">
                                Inquiry preview
                              </span>
                            </div>

                            <div className="grid gap-2 text-xs sm:grid-cols-2">
                              <p className="truncate text-white/35">
                                <span className="text-white/20">From: </span>
                                {form.name || "Your name"}
                              </p>

                              <p className="truncate text-white/35">
                                <span className="text-white/20">Email: </span>
                                {form.email || "Your email"}
                              </p>

                              <p className="truncate text-white/35">
                                <span className="text-white/20">Service: </span>
                                {SERVICES.find(
                                  (service) => service.id === form.service
                                )?.label || "Not selected"}
                              </p>

                              <p className="truncate text-white/35">
                                <span className="text-white/20">
                                  Timeline:{" "}
                                </span>
                                {TIMELINES.find(
                                  (timeline) => timeline.id === form.timeline
                                )?.label || "Not selected"}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-9 flex items-center justify-between border-t border-white/[0.06] pt-6">
                      {step > 0 ? (
                        <motion.button
                          type="button"
                          onClick={back}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-4 py-2.5 text-xs text-white/40 transition hover:border-white/15 hover:text-white/70"
                        >
                          <FiArrowLeft size={12} />
                          Back
                        </motion.button>
                      ) : (
                        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/15">
                          Step {step + 1} of {STEPS.length}
                        </span>
                      )}

                      {step < STEPS.length - 1 ? (
                        <motion.button
                          type="button"
                          onClick={next}
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-semibold text-white shadow-[0_0_24px_rgba(99,102,241,.22)] transition hover:bg-primary/90"
                        >
                          Continue
                          <FiArrowRight size={12} />
                        </motion.button>
                      ) : (
                        <motion.button
                          type="submit"
                          disabled={loading}
                          whileHover={loading ? {} : { y: -1 }}
                          whileTap={loading ? {} : { scale: 0.97 }}
                          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-semibold text-white shadow-[0_0_24px_rgba(99,102,241,.22)] transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {loading ? (
                            <>
                              <motion.span
                                className="h-3 w-3 rounded-full border border-white/30 border-t-white"
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 0.7,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              />
                              Sending…
                            </>
                          ) : (
                            <>
                              Send inquiry
                              <FiSend size={12} />
                            </>
                          )}
                        </motion.button>
                      )}
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <FiExternalLink size={10} className="text-white/15" />
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/15">
            Your information is used only to respond to your inquiry
          </span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
