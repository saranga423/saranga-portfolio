import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
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
} from "react-icons/fi";
import { SectionHeading } from "../About/SectionHeading";
import API from "../../api/api";

// ─── Constants ──────────────────────────────────────────────────────────────

const EMAIL = "rasingollasaranga35@gmail.com";

const SERVICES = [
  { id: "fullstack",   label: "Full Stack Dev",       icon: FiCode   },
  { id: "frontend",    label: "Frontend Engineering",  icon: FiLayers },
  { id: "uiux",        label: "UI / UX Design",        icon: FiZap    },
  { id: "mern",        label: "MERN Applications",     icon: FiCode   },
  { id: "api",         label: "API Development",       icon: FiLayers },
  { id: "consulting",  label: "Technical Consulting",  icon: FiZap    },
];

const TIMELINES = [
  { id: "asap",   label: "ASAP"        },
  { id: "2w",     label: "1–2 Weeks"   },
  { id: "1m",     label: "1 Month"     },
  { id: "3m",     label: "2–3 Months"  },
  { id: "flex",   label: "Flexible"    },
];

const SOCIALS = [
  { icon: FiGithub,   label: "GitHub",   href: "https://github.com/saranga423" },
  { icon: FiLinkedin, label: "LinkedIn",  href: "https://linkedin.com"          },
  { icon: FiMail,     label: "Email",     href: `mailto:${EMAIL}`               },
];

// Multi-step structure: each step is a named group
const STEPS = [
  { id: "who",     label: "About you",   icon: FiUser          },
  { id: "project", label: "Your project",icon: FiCode          },
  { id: "message", label: "Message",     icon: FiMessageSquare },
];

// ─── Animation Variants ─────────────────────────────────────────────────────

// Typed as Variants:
//  • every variant is a function (TargetResolver) — satisfies framer-motion's type
//  • ease uses a cubic-bezier tuple, not a plain string — fixes TS2322
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const slideVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 32 : -32,
  }),
  center: (_custom: unknown) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: EASE },
  }),
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -32 : 32,
    transition: { duration: 0.25, ease: EASE },
  }),
};

// ─── Micro Background ────────────────────────────────────────────────────────

function ContactBackground() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      {/* Soft color blooms */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600, height: 600,
          left: "-10%", top: "20%",
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
        }}
        animate={shouldReduceMotion ? {} : { y: [0, -24, 0], x: [0, 16, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500, height: 500,
          right: "-8%", bottom: "10%",
          background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
        }}
        animate={shouldReduceMotion ? {} : { y: [0, 20, 0], x: [0, -12, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
    </div>
  );
}

// ─── Availability Card ────────────────────────────────────────────────────────

function AvailabilityCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl p-5 space-y-4"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center gap-2.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-sm font-semibold text-white">Available now</span>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
        Open to freelance, contract, and full-time roles. Typical response within 24 hours.
      </p>
      <div className="flex flex-col gap-2">
        {[
          { icon: FiCode,   text: "Web & App Development" },
          { icon: FiLayers, text: "Security Consulting"    },
          { icon: FiClock,  text: "GMT+5:30 · Sri Lanka"   },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2.5">
            <Icon size={13} style={{ color: "rgba(99,102,241,0.8)" }} />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Social Links ─────────────────────────────────────────────────────────────

function SocialRow() {
  return (
    <div className="flex flex-col gap-2">
      {SOCIALS.map(({ icon: Icon, label, href }) => (
        <motion.a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
          whileHover={{
            background: "rgba(99,102,241,0.08)",
            borderColor: "rgba(99,102,241,0.25)",
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(99,102,241,0.12)" }}
          >
            <Icon size={14} style={{ color: "#a5b4fc" }} />
          </div>
          <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
            {label}
          </span>
          <FiArrowRight
            size={12}
            className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: "#a5b4fc" }}
          />
        </motion.a>
      ))}
    </div>
  );
}

// ─── Step Progress Bar ───────────────────────────────────────────────────────

function StepBar({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const done = i < step;
          const active = i === step;
          return (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: done
                    ? "rgba(99,102,241,1)"
                    : active
                    ? "rgba(99,102,241,0.2)"
                    : "rgba(255,255,255,0.05)",
                  border: active
                    ? "1.5px solid rgba(99,102,241,0.6)"
                    : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {done ? (
                  <FiCheckCircle size={12} style={{ color: "#fff" }} />
                ) : (
                  <Icon size={11} style={{ color: active ? "#a5b4fc" : "rgba(255,255,255,0.25)" }} />
                )}
              </div>
              <span
                className="text-xs hidden sm:block"
                style={{
                  color: active ? "#a5b4fc" : done ? "rgba(165,180,252,0.6)" : "rgba(255,255,255,0.2)",
                  fontWeight: active ? 600 : 400,
                }}
              >
                {s.label}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className="flex-1 h-px mx-3 transition-all duration-500"
                  style={{
                    width: 40,
                    background: i < step
                      ? "rgba(99,102,241,0.5)"
                      : "rgba(255,255,255,0.07)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      {/* Track bar */}
      <div className="h-px w-full rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #6366f1, #a78bfa)" }}
          animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

// ─── Styled Input ─────────────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function Field({ label, error, ...props }: InputProps) {
  const id = props.id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-medium uppercase tracking-widest"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: error ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.08)",
          caretColor: "#a5b4fc",
        }}
        onFocus={(e) => {
          (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(99,102,241,0.5)";
          (e.currentTarget as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)";
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLInputElement).style.borderColor =
            error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.08)";
          (e.currentTarget as HTMLInputElement).style.boxShadow = "none";
          props.onBlur?.(e);
        }}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-xs"
          style={{ color: "rgba(252,165,165,0.9)" }}
        >
          <FiAlertCircle size={11} />
          {error}
        </motion.p>
      )}
    </div>
  );
}

// ─── Styled Textarea ──────────────────────────────────────────────────────────

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  max?: number;
}

function TextareaField({ label, error, max, ...props }: TextareaProps) {
  const id = props.id ?? props.name;
  const len = (props.value as string)?.length ?? 0;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-xs font-medium uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          {label}
        </label>
        {max && (
          <span
            className="text-[10px] font-mono"
            style={{ color: len > max * 0.85 ? "rgba(251,191,36,0.7)" : "rgba(255,255,255,0.2)" }}
          >
            {len} / {max}
          </span>
        )}
      </div>
      <textarea
        id={id}
        {...props}
        maxLength={max}
        rows={5}
        className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none resize-none transition-all"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: error ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.08)",
          caretColor: "#a5b4fc",
        }}
        onFocus={(e) => {
          (e.currentTarget as HTMLTextAreaElement).style.borderColor = "rgba(99,102,241,0.5)";
          (e.currentTarget as HTMLTextAreaElement).style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)";
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLTextAreaElement).style.borderColor =
            error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.08)";
          (e.currentTarget as HTMLTextAreaElement).style.boxShadow = "none";
        }}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-xs"
          style={{ color: "rgba(252,165,165,0.9)" }}
        >
          <FiAlertCircle size={11} />
          {error}
        </motion.p>
      )}
    </div>
  );
}

// ─── Chip Selector ────────────────────────────────────────────────────────────

interface ChipGroupProps<T extends string> {
  label: string;
  options: { id: T; label: string; icon?: React.ElementType }[];
  value: T;
  onChange: (val: T) => void;
  error?: string;
}

function ChipGroup<T extends string>({ label, options, value, onChange, error }: ChipGroupProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className="text-xs font-medium uppercase tracking-widest"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const Icon = opt.icon;
          const active = value === opt.id;
          return (
            <motion.button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id as T)}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: active ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)",
                border: active
                  ? "1px solid rgba(99,102,241,0.55)"
                  : "1px solid rgba(255,255,255,0.07)",
                color: active ? "#a5b4fc" : "rgba(255,255,255,0.38)",
              }}
            >
              {Icon && <Icon size={11} />}
              {opt.label}
            </motion.button>
          );
        })}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-xs"
          style={{ color: "rgba(252,165,165,0.9)" }}
        >
          <FiAlertCircle size={11} />
          {error}
        </motion.p>
      )}
    </div>
  );
}

// ─── Form State & Validation ─────────────────────────────────────────────────

interface FormData {
  name: string;
  email: string;
  service: string;
  timeline: string;
  subject: string;
  message: string;
}

const EMPTY: FormData = { name: "", email: "", service: "", timeline: "", subject: "", message: "" };

type FieldErrors = Partial<Record<keyof FormData, string>>;

function validateStep(step: number, form: FormData): FieldErrors {
  const errs: FieldErrors = {};
  if (step === 0) {
    if (!form.name.trim()) errs.name = "Your name is required";
    else if (form.name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email address";
  }
  if (step === 1) {
    if (!form.service) errs.service = "Pick a service to continue";
    if (!form.timeline) errs.timeline = "Pick a timeline to continue";
    if (!form.subject.trim()) errs.subject = "Subject is required";
  }
  if (step === 2) {
    if (!form.message.trim()) errs.message = "Message can't be empty";
    else if (form.message.trim().length < 20) errs.message = "Please add a bit more detail (20+ chars)";
  }
  return errs;
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center py-16 text-center gap-5"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}
      >
        <FiCheckCircle size={36} style={{ color: "#34d399" }} />
      </motion.div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-white tracking-tight">Message sent</h3>
        <p className="text-sm max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
          Thanks for reaching out — I'll get back to you within 24 hours.
        </p>
      </div>
      <button
        onClick={onReset}
        className="mt-2 text-xs font-medium px-4 py-2 rounded-lg transition-colors"
        style={{
          color: "rgba(165,180,252,0.7)",
          border: "1px solid rgba(99,102,241,0.2)",
          background: "transparent",
        }}
      >
        Send another message
      </button>
    </motion.div>
  );
}

// ─── Main Contact Component ───────────────────────────────────────────────────

const Contact = () => {
  const [step, setStep]       = useState(0);
  const [dir, setDir]         = useState(1);
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [errs, setErrs]       = useState<FieldErrors>({});
  const [form, setForm]       = useState<FormData>(EMPTY);

  // Restore draft
  useEffect(() => {
    try {
      const saved = localStorage.getItem("contactDraft");
      if (saved) setForm(JSON.parse(saved));
    } catch {}
  }, []);

  // Persist draft
  useEffect(() => {
    localStorage.setItem("contactDraft", JSON.stringify(form));
  }, [form]);

  const set = useCallback(
    (field: keyof FormData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        if (errs[field]) setErrs((prev) => ({ ...prev, [field]: undefined }));
      },
    [errs]
  );

  const setVal = useCallback(
    (field: keyof FormData) => (val: string) => {
      setForm((prev) => ({ ...prev, [field]: val }));
      if (errs[field]) setErrs((prev) => ({ ...prev, [field]: undefined }));
    },
    [errs]
  );

  const next = () => {
    const stepErrs = validateStep(step, form);
    if (Object.keys(stepErrs).length) { setErrs(stepErrs); return; }
    setErrs({});
    setDir(1);
    setStep((p) => p + 1);
  };

  const back = () => {
    setErrs({});
    setDir(-1);
    setStep((p) => p - 1);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const stepErrs = validateStep(2, form);
    if (Object.keys(stepErrs).length) { setErrs(stepErrs); return; }
    try {
      setLoading(true);
      await API.post("/contact", form);
      setSent(true);
      localStorage.removeItem("contactDraft");
    } catch {
      setErrs({ message: "Failed to send. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSent(false);
    setStep(0);
    setForm(EMPTY);
    setErrs({});
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-32"
      style={{ background: "linear-gradient(180deg, #0a0f1e 0%, #080d1a 100%)" }}
    >
      <ContactBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading
          index="05"
          eyebrow="Contact"
          title={<>Let's create something <em>extraordinary.</em></>}
          description="Available for freelance, contract, and full-time opportunities."
        />

        <div className="mt-20 grid gap-10 lg:grid-cols-[360px_1fr]">
          {/* ── Left column ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            <AvailabilityCard />

            {/* Direct email */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(99,102,241,0.06)",
                border: "1px solid rgba(99,102,241,0.15)",
              }}
            >
              <p className="text-[11px] font-medium uppercase tracking-widest mb-2" style={{ color: "rgba(165,180,252,0.5)" }}>
                Direct email
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="text-sm font-medium break-all"
                style={{ color: "#a5b4fc" }}
              >
                {EMAIL}
              </a>
            </div>

            <SocialRow />

            {/* "Response time" note */}
            <div className="flex items-center gap-2 px-1">
              <FiClock size={11} style={{ color: "rgba(255,255,255,0.2)" }} />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
                Typical response · under 24 hours
              </span>
            </div>
          </motion.div>

          {/* ── Right column — multi-step form ──────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl p-8 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <AnimatePresence mode="wait" custom={dir}>
              {sent ? (
                <SuccessScreen key="success" onReset={reset} />
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Step progress */}
                  <StepBar step={step} />

                  {/* Step slides */}
                  <form onSubmit={submit} noValidate>
                    <AnimatePresence mode="wait" custom={dir}>
                      {/* Step 0 — Who are you */}
                      {step === 0 && (
                        <motion.div
                          key="step0"
                          custom={dir}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="space-y-5"
                        >
                          <div className="mb-1">
                            <h3 className="text-base font-semibold text-white">Tell me about yourself</h3>
                            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                              Just the basics so I can reply to the right person.
                            </p>
                          </div>
                          <Field
                            label="Full name"
                            name="name"
                            id="name"
                            placeholder="e.g. Alex Morgan"
                            value={form.name}
                            onChange={set("name")}
                            error={errs.name}
                            autoComplete="name"
                          />
                          <Field
                            label="Email address"
                            name="email"
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={set("email")}
                            error={errs.email}
                            autoComplete="email"
                          />
                        </motion.div>
                      )}

                      {/* Step 1 — Project */}
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          custom={dir}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="space-y-5"
                        >
                          <div className="mb-1">
                            <h3 className="text-base font-semibold text-white">About the project</h3>
                            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                              What kind of work do you need, and when?
                            </p>
                          </div>
                          <ChipGroup
                            label="Service needed"
                            options={SERVICES}
                            value={form.service}
                            onChange={setVal("service")}
                            error={errs.service}
                          />
                          <ChipGroup
                            label="Timeline"
                            options={TIMELINES}
                            value={form.timeline}
                            onChange={setVal("timeline")}
                            error={errs.timeline}
                          />
                          <Field
                            label="Subject"
                            name="subject"
                            id="subject"
                            placeholder="e.g. Dashboard redesign for SaaS product"
                            value={form.subject}
                            onChange={set("subject")}
                            error={errs.subject}
                          />
                        </motion.div>
                      )}

                      {/* Step 2 — Message */}
                      {step === 2 && (
                        <motion.div
                          key="step2"
                          custom={dir}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="space-y-5"
                        >
                          <div className="mb-1">
                            <h3 className="text-base font-semibold text-white">Your message</h3>
                            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                              Describe the project, context, or anything that helps me understand the ask.
                            </p>
                          </div>
                          <TextareaField
                            label="Message"
                            name="message"
                            id="message"
                            placeholder="Walk me through what you're working on…"
                            value={form.message}
                            onChange={set("message")}
                            error={errs.message}
                            max={1200}
                          />
                          {/* Summary preview */}
                          <div
                            className="rounded-xl px-4 py-3 space-y-1"
                            style={{
                              background: "rgba(99,102,241,0.06)",
                              border: "1px solid rgba(99,102,241,0.12)",
                            }}
                          >
                            <p className="text-[10px] font-medium uppercase tracking-widest mb-2" style={{ color: "rgba(165,180,252,0.45)" }}>
                              Summary
                            </p>
                            <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                              <span style={{ color: "rgba(255,255,255,0.7)" }}>{form.name}</span>
                              {" · "}{form.email}
                            </p>
                            <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                              {SERVICES.find(s => s.id === form.service)?.label}
                              {" · "}{TIMELINES.find(t => t.id === form.timeline)?.label}
                            </p>
                            {form.subject && (
                              <p className="text-xs" style={{ color: "rgba(165,180,252,0.6)" }}>
                                "{form.subject}"
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className={`mt-8 flex ${step > 0 ? "justify-between" : "justify-end"}`}>
                      {step > 0 && (
                        <motion.button
                          type="button"
                          onClick={back}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-colors"
                          style={{
                            color: "rgba(255,255,255,0.4)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            background: "transparent",
                          }}
                        >
                          <FiArrowLeft size={13} />
                          Back
                        </motion.button>
                      )}

                      {step < STEPS.length - 1 ? (
                        <motion.button
                          type="button"
                          onClick={next}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                          style={{
                            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                            boxShadow: "0 0 18px rgba(99,102,241,0.28)",
                          }}
                        >
                          Continue
                          <FiArrowRight size={13} />
                        </motion.button>
                      ) : (
                        <motion.button
                          type="submit"
                          disabled={loading}
                          whileHover={loading ? {} : { scale: 1.02, boxShadow: "0 0 28px rgba(99,102,241,0.45)" }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                          style={{
                            background: loading
                              ? "rgba(99,102,241,0.4)"
                              : "linear-gradient(135deg, #4f46e5, #7c3aed)",
                            boxShadow: "0 0 18px rgba(99,102,241,0.25)",
                            cursor: loading ? "not-allowed" : "pointer",
                          }}
                        >
                          {loading ? (
                            <>
                              <motion.span
                                className="w-3 h-3 rounded-full border border-white/40 border-t-white"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                              />
                              Sending…
                            </>
                          ) : (
                            <>
                              Send message
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
      </div>
    </section>
  );
};

export default Contact;