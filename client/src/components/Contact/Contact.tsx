import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";

import {
  FiArrowUpRight,
  FiArrowLeft,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiCheck,
  FiFigma,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";

import { SectionHeading } from "../About/SectionHeading";
import API from "../../api/api";

import React, { useState, useRef } from "react";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */

const EMAIL = "rasingollasaranga35@gmail.com";

const SOCIALS = [
  { Icon: FiGithub,   href: "https://github.com/saranga423",                          label: "GitHub"   },
  { Icon: FiLinkedin, href: "https://linkedin.com/in/saranga-rasingolla-2a6287249",    label: "LinkedIn" },
  { Icon: FiFigma,    href: "https://www.figma.com",                                  label: "Figma"    },
  { Icon: FiMail,     href: `mailto:${EMAIL}`,                                        label: "Email"    },
];

const SERVICES = [
  "Full-Stack Development",
  "API Architecture",
  "Performance Auditing",
  "Technical Consulting",
  "UI / UX Engineering",
  "Code Review",
];

const BUDGETS = ["< $5k", "$5k – $15k", "$15k – $40k", "$40k+"];

type FormDataType = {
  name: string;
  email: string;
  service: string;
  budget: string;
  subject: string;
  message: string;
};

const EMPTY_FORM: FormDataType = {
  name: "",
  email: "",
  service: "",
  budget: "",
  subject: "",
  message: "",
};

const STEPS = [
  { id: 1, label: "About you" },
  { id: 2, label: "Project scope" },
  { id: 3, label: "Details" },
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ─────────────────────────────────────────────
   FIELD
───────────────────────────────────────────── */

function Field({
  label, name, type = "text", placeholder, value, onChange, error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;

  return (
    <div className="relative">
      <motion.label
        htmlFor={name}
        animate={{
          y: focused || filled ? -22 : 0,
          scale: focused || filled ? 0.78 : 1,
          color: error ? "#F3A9A9" : focused ? "#9EC6F3" : "rgba(255,241,213,0.4)",
        }}
        transition={{ duration: 0.22 }}
        style={{ originX: 0, position: "absolute", top: 14, left: 20, pointerEvents: "none", zIndex: 1 }}
        className="text-sm uppercase tracking-[0.22em]"
      >
        {label}
      </motion.label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={focused ? placeholder : ""}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-invalid={!!error}
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${
            error ? "rgba(243,169,169,0.6)" : focused ? "rgba(158,198,243,0.55)" : "rgba(255,241,213,0.08)"
          }`,
          padding: "16px 20px 12px",
          color: "#FFF1D5",
          fontSize: 14,
          outline: "none",
          transition: "all 0.25s ease",
          boxShadow: focused ? "0 0 0 3px rgba(158,198,243,0.12)" : "none",
        }}
      />

      <motion.div
        animate={{ scaleX: focused ? 1 : 0 }}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: error ? "#F3A9A9" : "#9EC6F3", originX: 0 }}
      />

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 flex items-center gap-1.5 text-xs"
            style={{ color: "#F3A9A9" }}
          >
            <FiAlertCircle size={12} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TEXTAREA
───────────────────────────────────────────── */

function TextareaField({
  label, name, placeholder, value, onChange, error,
}: {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;

  return (
    <div className="relative">
      <motion.label
        htmlFor={name}
        animate={{
          y: focused || filled ? -22 : 0,
          scale: focused || filled ? 0.78 : 1,
          color: error ? "#F3A9A9" : focused ? "#9EC6F3" : "rgba(255,241,213,0.4)",
        }}
        style={{ originX: 0, position: "absolute", top: 14, left: 20, pointerEvents: "none" }}
        className="text-sm uppercase tracking-[0.22em]"
      >
        {label}
      </motion.label>

      <textarea
        id={name}
        name={name}
        rows={5}
        value={value}
        onChange={onChange}
        placeholder={focused ? placeholder : ""}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-invalid={!!error}
        style={{
          width: "100%",
          resize: "none",
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${
            error ? "rgba(243,169,169,0.6)" : focused ? "rgba(158,198,243,0.55)" : "rgba(255,241,213,0.08)"
          }`,
          padding: "16px 20px 12px",
          color: "#FFF1D5",
          fontSize: 14,
          outline: "none",
          transition: "all 0.25s ease",
        }}
      />

      <motion.div
        animate={{ scaleX: focused ? 1 : 0 }}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: error ? "#F3A9A9" : "#9EC6F3", originX: 0 }}
      />

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 flex items-center gap-1.5 text-xs"
            style={{ color: "#F3A9A9" }}
          >
            <FiAlertCircle size={12} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SELECTABLE PILL GROUP (for Service / Budget)
───────────────────────────────────────────── */

function PillGroup({
  label, options, value, onSelect, error,
}: {
  label: string;
  options: string[];
  value: string;
  onSelect: (val: string) => void;
  error?: string;
}) {
  return (
    <div>
      <p
        className="mb-3 text-sm uppercase tracking-[0.22em]"
        style={{ color: error ? "#F3A9A9" : "rgba(255,241,213,0.4)" }}
      >
        {label}
      </p>

      <div className="flex flex-wrap gap-2.5">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onSelect(opt)}
              style={{
                padding: "10px 18px",
                fontSize: 12.5,
                letterSpacing: "0.04em",
                border: `1px solid ${active ? "#9EC6F3" : "rgba(255,241,213,0.12)"}`,
                background: active ? "rgba(158,198,243,0.14)" : "rgba(255,255,255,0.02)",
                color: active ? "#9EC6F3" : "rgba(255,241,213,0.65)",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2.5 flex items-center gap-1.5 text-xs"
            style={{ color: "#F3A9A9" }}
          >
            <FiAlertCircle size={12} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROGRESS INDICATOR
───────────────────────────────────────────── */

function StepProgress({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="mb-10 flex items-center gap-3">
      {STEPS.map((s, i) => (
        <React.Fragment key={s.id}>
          <div className="flex items-center gap-2.5">
            <motion.div
              animate={{
                background: step >= s.id ? "#9EC6F3" : "rgba(255,255,255,0.06)",
                color: step >= s.id ? "#0B1120" : "rgba(255,241,213,0.35)",
                scale: step === s.id ? 1.1 : 1,
              }}
              transition={{ duration: 0.25 }}
              className="flex h-7 w-7 shrink-0 items-center justify-center text-xs font-semibold"
              style={{ border: step >= s.id ? "none" : "1px solid rgba(255,241,213,0.15)" }}
            >
              {step > s.id ? <FiCheck size={13} /> : s.id}
            </motion.div>
            <span
              className="hidden text-xs uppercase tracking-[0.16em] sm:inline"
              style={{ color: step >= s.id ? "rgba(255,241,213,0.8)" : "rgba(255,241,213,0.3)" }}
            >
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className="h-px flex-1" style={{ background: step > s.id ? "#9EC6F3" : "rgba(255,255,255,0.08)" }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAGNETIC BUTTON
───────────────────────────────────────────── */

function MagneticButton({ sent, loading }: { sent: boolean; loading: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useTransform(y, [-30, 30], [4, -4]);
  const rotY = useTransform(x, [-60, 60], [-4, 4]);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      type="submit"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 36px",
        background: sent ? "rgba(158,198,243,0.4)" : loading ? "rgba(158,198,243,0.7)" : "#9EC6F3",
        color: "#0B1120",
        border: "none",
        cursor: sent || loading ? "default" : "pointer",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
      }}
      whileHover={sent || loading ? {} : { scale: 1.04 }}
      whileTap={sent || loading ? {} : { scale: 0.97 }}
      disabled={sent || loading}
    >
      {sent ? (
        <><FiCheck size={14} /> Message Sent</>
      ) : loading ? (
        <>
          <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}>
            <FiLoader size={14} />
          </motion.span>
          Sending...
        </>
      ) : (
        <>Send Inquiry <FiArrowUpRight size={16} /></>
      )}
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────── */

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<FormDataType>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormDataType, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const selectField = (name: keyof FormDataType, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  /* ── Per-step validation ── */
  const validateStep = (s: 1 | 2 | 3): boolean => {
    const next: Partial<Record<keyof FormDataType, string>> = {};

    if (s === 1) {
      if (!formData.name.trim()) next.name = "Please enter your name.";
      if (!formData.email.trim()) next.email = "Please enter your email.";
      else if (!EMAIL_RE.test(formData.email)) next.email = "Enter a valid email address.";
    }

    if (s === 2) {
      if (!formData.service) next.service = "Select the service you're interested in.";
      if (!formData.budget) next.budget = "Select an estimated budget.";
    }

    if (s === 3) {
      if (!formData.subject.trim()) next.subject = "Please add a subject.";
      if (!formData.message.trim()) next.message = "Please add a short message.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((p) => (p < 3 ? ((p + 1) as 1 | 2 | 3) : p));
  };

  const goBack = () => setStep((p) => (p > 1 ? ((p - 1) as 1 | 2 | 3) : p));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setLoading(true);
    setSubmitError(null);

    try {
      await API.post("/contact", formData);
      setSent(true);
    } catch (error) {
      console.log(error);
      setSubmitError("Something went wrong sending your message. Please try again or email me directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="05"
          eyebrow="Contact"
          title={<>Let's build something <em>memorable</em>.</>}
          description="Accepting select projects for 2026."
        />

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-16 border border-white/10 bg-white/3 p-10 backdrop-blur-xl"
        >
          {!sent && <StepProgress step={step} />}

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-10 text-center"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ background: "rgba(158,198,243,0.15)", border: "1px solid rgba(158,198,243,0.4)" }}
                >
                  <FiCheck size={22} color="#9EC6F3" />
                </div>
                <p className="text-lg text-[#FFF1D5]">Thanks, {formData.name.split(" ")[0] || "there"} — your message is on its way.</p>
                <p className="text-sm text-white/40">I'll get back to you within 1–2 business days.</p>
              </motion.div>
            ) : (
              <motion.div key={`step-${step}`} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }} className="space-y-6">

                {/* ── STEP 1: About you ── */}
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <Field label="Name" name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} error={errors.name} />
                      <Field label="Email" name="email" type="email" placeholder="you@studio.com" value={formData.email} onChange={handleChange} error={errors.email} />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={goNext}
                        className="border border-[#9EC6F3]/40 px-8 py-3 text-sm uppercase tracking-[0.15em] text-[#9EC6F3] transition-colors hover:bg-[#9EC6F3]/10"
                      >
                        Continue
                      </button>
                    </div>
                  </>
                )}

                {/* ── STEP 2: Project scope ── */}
                {step === 2 && (
                  <>
                    <PillGroup label="Service" options={SERVICES} value={formData.service} onSelect={(v) => selectField("service", v)} error={errors.service} />
                    <PillGroup label="Estimated Budget" options={BUDGETS} value={formData.budget} onSelect={(v) => selectField("budget", v)} error={errors.budget} />
                    <div className="flex items-center justify-between pt-2">
                      <button type="button" onClick={goBack} className="flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-white/40 transition-colors hover:text-white/70">
                        <FiArrowLeft size={13} /> Back
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        className="border border-[#9EC6F3]/40 px-8 py-3 text-sm uppercase tracking-[0.15em] text-[#9EC6F3] transition-colors hover:bg-[#9EC6F3]/10"
                      >
                        Continue
                      </button>
                    </div>
                  </>
                )}

                {/* ── STEP 3: Details ── */}
                {step === 3 && (
                  <>
                    <Field label="Subject" name="subject" placeholder="Project subject" value={formData.subject} onChange={handleChange} error={errors.subject} />
                    <TextareaField label="Message" name="message" placeholder="Tell me about your project..." value={formData.message} onChange={handleChange} error={errors.message} />

                    <AnimatePresence>
                      {submitError && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-2 text-sm"
                          style={{ color: "#F3A9A9" }}
                        >
                          <FiAlertCircle size={14} /> {submitError}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center justify-between">
                      <button type="button" onClick={goBack} className="flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-white/40 transition-colors hover:text-white/70">
                        <FiArrowLeft size={13} /> Back
                      </button>
                      <MagneticButton sent={sent} loading={loading} />
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        <div className="mt-12 flex gap-4">
          {SOCIALS.map(({ Icon, href, label }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center border border-white/10 bg-white/[0.03] text-[#9EC6F3] transition-all hover:scale-105 hover:border-[#9EC6F3]/40"
              aria-label={label}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;