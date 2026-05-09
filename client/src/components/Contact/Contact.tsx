import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

import {
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiCheck,
  FiCopy,
  FiFigma,
} from "react-icons/fi";

import { SectionHeading } from "../About/SectionHeading";

import { useState, useRef, JSX } from "react";
import { Icon } from "lucide-react";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const EMAIL = "rasingollasaranga35@gmail.com";

const SOCIALS = [
  { Icon: FiGithub,   href: "https://github.com/saranga423",   label: "GitHub"   },
  { Icon: FiLinkedin, href: "https://linkedin.com/in/saranga-rasingolla-2a6287249", label: "LinkedIn" },
  { Icon: FiFigma,    href: "https://www.figma.com/design/1Ztnoqf3BdIWeFx5auJtC1/SARANGA-RASINGOLLA?node-id=0-1&p=f&t=gYtrw0uWbWxLeb6B-0", label: "Figma"    },
  { Icon: FiMail,     href: `mailto:${EMAIL}`,       label: "Email"    },
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

/* ─────────────────────────────────────────────
   ANIMATED INPUT FIELD
───────────────────────────────────────────── */
function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
})

{
  const [focused, setFocused] = useState(false);
  const [filled,  setFilled ] = useState(false);

  return (
    <div className="relative">
      {/* Floating label */}
      <motion.label
        htmlFor={name}
        animate={{
          y:        focused || filled ? -22 : 0,
          scale:    focused || filled ? 0.78 : 1,
          color:    focused ? "var(--color-primary)" : "rgba(237,224,204,0.4)",
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0, position: "absolute", top: 14, left: 20, pointerEvents: "none", zIndex: 1 }}
        className="text-sm uppercase tracking-[0.22em] font-display"
      >
        {label}
      </motion.label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={focused ? placeholder : ""}
        onFocus={() => setFocused(true)}
        onBlur={e  => { setFocused(false); setFilled(e.target.value.length > 0); }}
        style={{
          width: "100%",
          background: "rgba(28,24,20,0.5)",
          border: `1px solid ${focused ? "rgba(158,198,243,0.55)" : "rgba(237,224,204,0.1)"}`,
          borderRadius: 0,
          padding: "14px 20px 10px",
          color: "#FFF1D5",
          fontSize: 14,
          fontFamily: "inherit",
          outline: "none",
          transition: "border-color 0.25s, box-shadow 0.25s",
          boxShadow: focused ? "0 0 0 3px rgba(158,198,243,0.12)" : "none",
        }}
        className="placeholder:text-foreground/25"
      />

      {/* Bottom accent line */}
      <motion.div
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 2, background: "#9EC6F3", originX: 0,
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   TEXTAREA FIELD
───────────────────────────────────────────── */
function TextareaField({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [filled,  setFilled ] = useState(false);

  return (
    <div className="relative">
      <motion.label
        htmlFor={name}
        animate={{
          y:     focused || filled ? -22 : 0,
          scale: focused || filled ? 0.78 : 1,
          color: focused ? "var(--color-primary)" : "rgba(237,224,204,0.4)",
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0, position: "absolute", top: 14, left: 20, pointerEvents: "none", zIndex: 1 }}
        className="text-sm uppercase tracking-[0.22em] font-display"
      >
        {label}
      </motion.label>

      <textarea
        id={name}
        name={name}
        rows={5}
        placeholder={focused ? placeholder : ""}
        onFocus={() => setFocused(true)}
        onBlur={e  => { setFocused(false); setFilled(e.target.value.length > 0); }}
        style={{
          width: "100%", resize: "none",
          background: "rgba(28,24,20,0.5)",
          border: `1px solid ${focused ? "rgba(158,198,243,0.55)" : "rgba(237,224,204,0.1)"}`,
          borderRadius: 0,
          padding: "14px 20px 10px",
          color: "#FFF1D5",
          fontSize: 14,
          fontFamily: "inherit",
          outline: "none",
          transition: "border-color 0.25s, box-shadow 0.25s",
          boxShadow: focused ? "0 0 0 3px rgba(158,198,243,0.12)" : "none",
        }}
        className="placeholder:text-foreground/25"
      />

      <motion.div
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 2, background: "#9EC6F3", originX: 0,
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   PILL SELECTOR
───────────────────────────────────────────── */
function PillGroup({
  label, options, multi = false,
}: {
  label: string;
  options: string[];
  multi?: boolean;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (opt: string) => {
    if (multi) {
      setSelected(p => p.includes(opt) ? p.filter(x => x !== opt) : [...p, opt]);
    } else {
      setSelected(p => p[0] === opt ? [] : [opt]);
    }
  };

  return (
    <div>
      <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-foreground/40 font-display">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const active = selected.includes(opt);
          return (
            <motion.button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "6px 14px",
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontFamily: "'Times New Roman', serif",
                cursor: "pointer",
                border: `1px solid ${active ? "rgba(158,198,243,0.7)" : "rgba(237,224,204,0.1)"}`,
                background: active ? "rgba(158,198,243,0.12)" : "transparent",
                color: active ? "#9EC6F3" : "rgba(237,224,204,0.45)",
                transition: "all 0.2s ease",
                boxShadow: active ? "0 0 12px rgba(158,198,243,0.15)" : "none",
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget).style.borderColor = "rgba(158,198,243,0.35)";
                  (e.currentTarget ).style.color = "rgba(237,224,204,0.7)";
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget).style.borderColor = "rgba(237,224,204,0.1)";
                  (e.currentTarget).style.color = "rgba(237,224,204,0.45)";
                }
              }}
            >
              {active && <FiCheck size={9} style={{ display: "inline", marginRight: 5, verticalAlign: "middle" }} />}
              {opt}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}



/* ─────────────────────────────────────────────
   MAGNETIC SUBMIT BUTTON
───────────────────────────────────────────── */
function MagneticButton({ sent }: { sent: boolean }): JSX.Element {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useTransform(y, [-30, 30], [4, -4]);
  const rotY = useTransform(x, [-60, 60], [-4,  4]);

  const handleMove = (e: { clientX: number; clientY: number; }) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width  / 2);
    y.set(e.clientY - rect.top  - rect.height / 2);
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
        perspective: 600,
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 36px",
        background: sent ? "rgba(158,198,243,0.3)" : "#9EC6F3",
        color: "#0E0C0A",
        border: "none",
        cursor: sent ? "default" : "pointer",
        fontFamily: "'Times New Roman', serif",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        transition: "box-shadow 0.3s",
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      disabled={sent}
      className="group relative overflow-hidden"
    >
      {/* Shine sweep */}
      {!sent && (
        <motion.span
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.28) 50%, transparent 65%)",
            backgroundSize: "200%",
          }}
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
      )}
      <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 10 }}>
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.span
              key="sent"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <FiCheck size={14} /> Message Received
            </motion.span>
          ) : (
            <motion.span
              key="send"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              Send Inquiry
              <motion.span
                className="group-hover:rotate-45 transition-transform duration-300"
                style={{ display: "inline-flex" }}
              >
                <FiArrowUpRight size={16} />
              </motion.span>
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   CONTACT SECTION
───────────────────────────────────────────── */
const Contact = () => {
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  /* Step‑based progress bar width */
  const progressPct = step === 1 ? "50%" : "100%";

  return (
    <section id="contact" className="relative py-32 overflow-hidden">

      {/* Background ember glow */}
      <div style={{
        position: "absolute", bottom: -200, left: "50%",
        transform: "translateX(-50%)",
        width: 900, height: 500,
        background: "radial-gradient(ellipse, rgba(158,198,243,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Diagonal decorative rule */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "40%", height: 1,
        background: "linear-gradient(to left, transparent, rgba(158,198,243,0.3))",
      }} />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="05"
          eyebrow="Contact"
          title={<>Let's build something <em className="italic text-gradient">memorable</em>.</>}
          description="Accepting a select number of engagements for 2026. Tell me about what you're building."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 mt-16">

          {/* ═══ LEFT — info panel ═══ */}
          

          {/* ═══ RIGHT — form ═══ */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <div style={{
              background: "rgba(28,24,20,0.4)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(237,224,204,0.08)",
              padding: "40px",
            }}>

              {/* Progress indicator */}
              <div style={{ marginBottom: 36 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  {["Project details", "Message"].map((s, i) => (
                    <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <motion.span
                        animate={{ background: i + 1 <= step ? "#9EC6F3" : "rgba(237,224,204,0.15)" }}
                        style={{
                          width: 22, height: 22, borderRadius: "50%",
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          fontSize: 10, fontFamily: "Courier New, monospace",
                          color: i + 1 <= step ? "#0E0C0A" : "rgba(237,224,204,0.4)",
                          fontWeight: "bold",
                        }}
                      >{i + 1}</motion.span>
                      <span style={{
                        fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                        fontFamily: "Courier New, monospace",
                        color: i + 1 <= step ? "#9EC6F3" : "rgba(237,224,204,0.3)",
                      }}>{s}</span>
                    </div>
                  ))}
                </div>
                {/* Track */}
                <div style={{ height: 1, background: "rgba(237,224,204,0.08)", position: "relative" }}>
                  <motion.div
                    animate={{ width: progressPct }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: "absolute", top: 0, left: 0, height: "100%", background: "#9EC6F3" }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                    style={{ display: "flex", flexDirection: "column", gap: 24 }}
                  >
                    {/* ── Step 1 ── */}
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.35 }}
                          style={{ display: "flex", flexDirection: "column", gap: 24 }}
                        >
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                            <Field label="Name"  name="name"  placeholder="Your full name"   />
                            <Field label="Email" name="email" type="email" placeholder="you@studio.com" />
                          </div>

                          <PillGroup
                            label="Service needed (multi-select)"
                            options={SERVICES}
                            multi
                          />
                          <PillGroup
                            label="Budget range"
                            options={BUDGETS}
                          />

                          <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <motion.button
                              type="button"
                              onClick={() => setStep(2)}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              style={{
                                display: "inline-flex", alignItems: "center", gap: 10,
                                padding: "12px 28px",
                                background: "transparent",
                                border: "1px solid rgba(159,179,223,0.5)",
                                color: "#9EC6F3",
                                cursor: "pointer",
                                fontFamily: "'Times New Roman', serif",
                                fontSize: 13, letterSpacing: "0.12em",
                                textTransform: "uppercase",
                              }}
                            >
                              Next: Your message <FiArrowUpRight size={14} />
                            </motion.button>
                          </div>
                        </motion.div>
                      )}

                      {/* ── Step 2 ── */}
                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.35 }}
                          style={{ display: "flex", flexDirection: "column", gap: 24 }}
                        >
                          <Field label="Subject" name="subject" placeholder="A new product, a redesign…" />
                          <TextareaField
                            label="Project brief"
                            name="message"
                            placeholder="Tell me about the work, timeline and any hard deadlines."
                          />

                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <button
                              type="button"
                              onClick={() => setStep(1)}
                              style={{
                                background: "none", border: "none", cursor: "pointer",
                                color: "rgba(237,224,204,0.4)",
                                fontFamily: "Courier New, monospace", fontSize: 11,
                                letterSpacing: "0.2em", textTransform: "uppercase",
                              }}
                              onMouseEnter={e => (e.currentTarget.style.color = "#FFF1D5")}
                              onMouseLeave={e => (e.currentTarget.style.color = "rgba(237,224,204,0.4)")}
                            >
                              ← Back
                            </button>

                            {/* Magnetic submit */}
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 12,
                              padding: "14px 36px",
                              background: "#9EC6F3",
                              color: "#0E0C0A",
                              border: "none", cursor: "pointer",
                              fontFamily: "'Times New Roman', serif",
                              fontSize: 13, fontWeight: 700,
                              letterSpacing: "0.14em", textTransform: "uppercase",
                              position: "relative", overflow: "hidden",
                            }}>
                              <MagneticButton sent={sent} />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.form>
                ) : (
                  /* ── Success state ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      textAlign: "center", padding: "60px 0",
                      gap: 20,
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      style={{
                        width: 64, height: 64, borderRadius: "50%",
                        background: "rgba(158,198,243,0.12)",
                        border: "1px solid rgba(158,198,243,0.4)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <FiCheck size={26} color="#9EC6F3" />
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      style={{
                        fontFamily: "'Times New Roman', serif",
                        fontSize: 28, fontStyle: "italic",
                        color: "#FFF1D5", margin: 0,
                      }}
                    >
                      Message received.
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      style={{
                        fontFamily: "Courier New, monospace",
                        fontSize: 11, letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(237,224,204,0.4)", maxWidth: 320,
                        lineHeight: 1.8,
                      }}
                    >
                      I'll read this carefully and reply within 24 hours. Talk soon.
                    </motion.p>

                    {/* Animated ember line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      style={{ height: 1, width: 120, background: "linear-gradient(90deg, transparent, #9EC6F3, transparent)" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

export default Contact;