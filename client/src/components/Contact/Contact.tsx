import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";

import {
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiCheck,
  FiFigma,
} from "react-icons/fi";

import { SectionHeading } from "../About/SectionHeading";
import API from "../../api/api";

import React, {
  useState,
  useRef,
} from "react";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */

const EMAIL =
  "rasingollasaranga35@gmail.com";

const SOCIALS = [
  {
    Icon: FiGithub,
    href: "https://github.com/saranga423",
    label: "GitHub",
  },

  {
    Icon: FiLinkedin,
    href: "https://linkedin.com/in/saranga-rasingolla-2a6287249",
    label: "LinkedIn",
  },

  {
    Icon: FiFigma,
    href: "https://www.figma.com",
    label: "Figma",
  },

  {
    Icon: FiMail,
    href: `mailto:${EMAIL}`,
    label: "Email",
  },
];

const SERVICES = [
  "Full-Stack Development",
  "API Architecture",
  "Performance Auditing",
  "Technical Consulting",
  "UI / UX Engineering",
  "Code Review",
];

const BUDGETS = [
  "< $5k",
  "$5k – $15k",
  "$15k – $40k",
  "$40k+",
];

type FormDataType = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

/* ─────────────────────────────────────────────
   FIELD
───────────────────────────────────────────── */

function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}) {
  const [focused, setFocused] =
    useState(false);

  const [filled, setFilled] =
    useState(false);

  return (
    <div className="relative">
      <motion.label
        htmlFor={name}
        animate={{
          y:
            focused || filled
              ? -22
              : 0,

          scale:
            focused || filled
              ? 0.78
              : 1,

          color: focused
            ? "#9EC6F3"
            : "rgba(255,241,213,0.4)",
        }}
        transition={{
          duration: 0.22,
        }}
        style={{
          originX: 0,
          position: "absolute",
          top: 14,
          left: 20,
          pointerEvents: "none",
          zIndex: 1,
        }}
        className="
          text-sm
          uppercase
          tracking-[0.22em]
        "
      >
        {label}
      </motion.label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={
          focused
            ? placeholder
            : ""
        }
        onFocus={() =>
          setFocused(true)
        }
        onBlur={(e) => {
          setFocused(false);

          setFilled(
            e.target.value.length > 0
          );
        }}
        style={{
          width: "100%",
          background:
            "rgba(255,255,255,0.03)",

          border: `1px solid ${
            focused
              ? "rgba(158,198,243,0.55)"
              : "rgba(255,241,213,0.08)"
          }`,

          padding:
            "16px 20px 12px",

          color: "#FFF1D5",

          fontSize: 14,

          outline: "none",

          transition:
            "all 0.25s ease",

          boxShadow: focused
            ? "0 0 0 3px rgba(158,198,243,0.12)"
            : "none",
        }}
      />

      <motion.div
        animate={{
          scaleX: focused
            ? 1
            : 0,
        }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "#9EC6F3",
          originX: 0,
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   TEXTAREA
───────────────────────────────────────────── */

function TextareaField({
  label,
  name,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}) {
  const [focused, setFocused] =
    useState(false);

  const [filled, setFilled] =
    useState(false);

  return (
    <div className="relative">
      <motion.label
        htmlFor={name}
        animate={{
          y:
            focused || filled
              ? -22
              : 0,

          scale:
            focused || filled
              ? 0.78
              : 1,

          color: focused
            ? "#9EC6F3"
            : "rgba(255,241,213,0.4)",
        }}
        style={{
          originX: 0,
          position: "absolute",
          top: 14,
          left: 20,
          pointerEvents: "none",
        }}
        className="
          text-sm
          uppercase
          tracking-[0.22em]
        "
      >
        {label}
      </motion.label>

      <textarea
        id={name}
        name={name}
        rows={5}
        value={value}
        onChange={onChange}
        placeholder={
          focused
            ? placeholder
            : ""
        }
        onFocus={() =>
          setFocused(true)
        }
        onBlur={(e) => {
          setFocused(false);

          setFilled(
            e.target.value.length > 0
          );
        }}
        style={{
          width: "100%",
          resize: "none",

          background:
            "rgba(255,255,255,0.03)",

          border: `1px solid ${
            focused
              ? "rgba(158,198,243,0.55)"
              : "rgba(255,241,213,0.08)"
          }`,

          padding:
            "16px 20px 12px",

          color: "#FFF1D5",

          fontSize: 14,

          outline: "none",

          transition:
            "all 0.25s ease",
        }}
      />

      <motion.div
        animate={{
          scaleX: focused
            ? 1
            : 0,
        }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "#9EC6F3",
          originX: 0,
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAGNETIC BUTTON
───────────────────────────────────────────── */

function MagneticButton({
  sent,
}: {
  sent: boolean;
}) {
  const ref =
    useRef<HTMLButtonElement>(null);

  const x =
    useMotionValue(0);

  const y =
    useMotionValue(0);

  const rotX = useTransform(
    y,
    [-30, 30],
    [4, -4]
  );

  const rotY = useTransform(
    x,
    [-60, 60],
    [-4, 4]
  );

  const handleMove = (
    e: React.MouseEvent
  ) => {
    if (!ref.current) return;

    const rect =
      ref.current.getBoundingClientRect();

    x.set(
      e.clientX -
        rect.left -
        rect.width / 2
    );

    y.set(
      e.clientY -
        rect.top -
        rect.height / 2
    );
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

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

        padding:
          "14px 36px",

        background: sent
          ? "rgba(158,198,243,0.4)"
          : "#9EC6F3",

        color: "#0B1120",

        border: "none",

        cursor: "pointer",

        fontSize: 13,

        fontWeight: 700,

        letterSpacing:
          "0.14em",

        textTransform:
          "uppercase",
      }}
      whileHover={{
        scale: 1.04,
      }}
      whileTap={{
        scale: 0.97,
      }}
      disabled={sent}
    >
      {sent ? (
        <>
          <FiCheck size={14} />
          Message Sent
        </>
      ) : (
        <>
          Send Inquiry
          <FiArrowUpRight size={16} />
        </>
      )}
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────── */

const Contact = () => {
  const [sent, setSent] =
    useState(false);

  const [step, setStep] =
    useState<1 | 2>(1);

  const [formData, setFormData] =
    useState<FormDataType>({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await API.post(
        "/contact",
        formData
      );

      setSent(true);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      id="contact"
      className="
        relative
        py-32
      "
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="05"
          eyebrow="Contact"
          title={
            <>
              Let's build something{" "}
              <em>
                memorable
              </em>
              .
            </>
          }
          description="
            Accepting select
            projects for 2026.
          "
        />

        <motion.form
          onSubmit={handleSubmit}
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            mt-16
            space-y-6
            border
            border-white/10
            bg-white/[0.03]
            p-10
            backdrop-blur-xl
          "
        >
          {step === 1 && (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field
                  label="Name"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                />

                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@studio.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setStep(2)
                  }
                  className="
                    border
                    border-[#9EC6F3]/40
                    px-8
                    py-3
                    text-sm
                    uppercase
                    tracking-[0.15em]
                    text-[#9EC6F3]
                  "
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <Field
                label="Subject"
                name="subject"
                placeholder="Project subject"
                value={formData.subject}
                onChange={handleChange}
              />

              <TextareaField
                label="Message"
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
              />

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    setStep(1)
                  }
                  className="
                    text-sm
                    uppercase
                    tracking-[0.15em]
                    text-white/40
                  "
                >
                  Back
                </button>

                <MagneticButton
                  sent={sent}
                />
              </div>
            </>
          )}
        </motion.form>

        <div className="mt-12 flex gap-4">
          {SOCIALS.map(
            (
              {
                Icon,
                href,
                label,
              },
              index
            ) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  border
                  border-white/10
                  bg-white/[0.03]
                  text-[#9EC6F3]
                  transition-all
                  hover:scale-105
                  hover:border-[#9EC6F3]/40
                "
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;