import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { ThemeContext } from '../contexts/ThemeContext';
import profileImage from '../assets/pic.jpg';

// ─── Constants ────────────────────────────────────────────────────────────────

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const TECH_STACK = [
  'React','Next.js','JavaScript','TypeScript','Node.js','Express',
  'MongoDB','MySQL','Java','Spring Boot','Oracle','PL/SQL',
  'Firebase','REST APIs','UI/UX','Figma','Git','FastAPI',
];

const TABS = [
  { key: 'overview',      label: 'Overview',     icon: '◈' },
  { key: 'education',     label: 'Education',    icon: '◉' },
  { key: 'experience',    label: 'Experience',   icon: '◆' },
  { key: 'achievements',  label: 'Achievements', icon: '◇' },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrambleText(target, duration = 1600, startDelay = 220) {
  const [display, setDisplay] = useState('');
  const frameRef = useRef(null);
  useEffect(() => {
    let start = null;
    const timeout = setTimeout(() => {
      const tick = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const revealed = Math.floor(progress * target.length);
        const next = target.split('').map((ch, i) => {
          if (ch === ' ') return ' ';
          if (i < revealed) return ch;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join('');
        setDisplay(next);
        if (progress < 1) frameRef.current = requestAnimationFrame(tick);
        else setDisplay(target);
      };
      frameRef.current = requestAnimationFrame(tick);
    }, startDelay);
    return () => { clearTimeout(timeout); if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [target, duration, startDelay]);
  return display;
}

function useCountUp(target, duration = 1500, delay = 0) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);
  useEffect(() => {
    let start = null;
    const timeout = setTimeout(() => {
      const tick = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        setCount(Math.round(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frameRef.current = requestAnimationFrame(tick);
      };
      frameRef.current = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timeout); if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [target, duration, delay]);
  return count;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCounter({ value, suffix = '', label, index, colors }) {
  const count = useCountUp(value, 1500, 600 + index * 130);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 + index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.22 } }}
      style={{
        padding: '20px 18px',
        borderRadius: '20px',
        background: colors.statBg,
        border: `1px solid ${colors.borderSoft}`,
        boxShadow: colors.shadowSm,
        cursor: 'default',
        transition: 'border-color 0.28s ease, box-shadow 0.28s ease',
      }}
      className="about-stat-card"
    >
      <div style={{
        fontFamily: '"Syne", sans-serif',
        fontSize: '1.9rem',
        fontWeight: 800,
        color: colors.primary,
        lineHeight: 1,
        marginBottom: 6,
        letterSpacing: '-1px',
      }}>
        {count}{suffix}
      </div>
      <div style={{ color: colors.muted, fontSize: '0.85rem', lineHeight: 1.5, fontWeight: 400 }}>
        {label}
      </div>
    </motion.div>
  );
}

function ShimmerBorder({ radius = 'inherit', opacity = 1, gradient }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: radius, padding: '1px',
      background: gradient || 'linear-gradient(128deg, rgba(76,201,240,0.45) 0%, transparent 38%, rgba(67,97,238,0.35) 72%, rgba(114,239,221,0.22) 100%)',
      WebkitMask: 'linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)',
      WebkitMaskComposite: 'xor', maskComposite: 'exclude',
      pointerEvents: 'none', opacity,
    }} />
  );
}

function InfoCard({ children, colors, accentColor, delay = 0, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      style={{
        position: 'relative', borderRadius: '22px', overflow: 'hidden',
        background: colors.cardSoft,
        border: `1px solid ${colors.borderSoft}`,
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        boxShadow: colors.shadowMd, padding: '22px', ...style,
      }}
      className="about-info-card"
    >
      <ShimmerBorder />
      {/* Per-card accent glow */}
      <div style={{
        position: 'absolute', inset: '20% 25%', borderRadius: '50%',
        background: `radial-gradient(circle, ${accentColor || 'rgba(76,201,240,0.14)'}, transparent 70%)`,
        filter: 'blur(24px)', pointerEvents: 'none', opacity: 0,
        transition: 'opacity 0.4s ease',
      }} className="about-card-glow" />
      {children}
    </motion.div>
  );
}

function BadgePill({ label, type = 'cyan', colors }) {
  const map = {
    cyan:   { bg: 'rgba(76,201,240,0.14)',  color: colors.primary,  border: 'rgba(76,201,240,0.28)'  },
    green:  { bg: 'rgba(52,211,153,0.14)',  color: colors.success,  border: 'rgba(52,211,153,0.28)'  },
    pink:   { bg: 'rgba(244,114,182,0.14)', color: colors.pink,     border: 'rgba(244,114,182,0.28)' },
    purple: { bg: 'rgba(167,139,250,0.14)', color: colors.purple,   border: 'rgba(167,139,250,0.28)' },
    mint:   { bg: 'rgba(114,239,221,0.14)', color: colors.accent,   border: 'rgba(114,239,221,0.28)' },
  };
  const s = map[type] || map.cyan;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '6px 13px', borderRadius: '999px',
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.03em', whiteSpace: 'nowrap',
    }}>{label}</span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const educationData = [
  {
    degree: 'BSc (Hons) in Information Technology',
    institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
    period: '2022 – Present', status: 'Final Year', statusType: 'cyan',
    highlights: ['MERN Stack Development', 'Java/Spring Boot', 'Agile Methodologies'],
    link: 'https://www.sliit.lk/',
  },
  {
    degree: 'Full Stack Developer Program',
    institution: 'University of Moratuwa (Open Learning)',
    period: '2022', status: 'Completed', statusType: 'green',
    highlights: ['React, Node.js, Express', 'Database Design', 'Git & Deployment'],
    link: 'https://open.uom.lk/',
  },
  {
    degree: 'G.C.E. Advanced Level (Biology Stream)',
    institution: "Mahamaya Girls' College Kandy",
    period: '2020', status: 'Completed', statusType: 'green',
    results: 'Biology, Physics, Chemistry',
    highlights: ['Science Stream', 'Leadership in Science Club'],
    link: 'https://mahamayagirlscollege.lk/',
  },
];

const experienceData = [
  {
    role: 'Software Engineering Intern',
    company: 'DMS Software Technologies (Pvt) Ltd',
    period: 'Jul 2024 – Jan 2025', location: 'Colombo 00700, Sri Lanka',
    type: 'Internship', typeColor: 'green',
    description: 'Contributed to enterprise-grade platforms for railway systems.',
    achievements: [
      'Contributed to enterprise-level software using Oracle Forms, Reports, and PL/SQL.',
      'Participated in requirements gathering sessions and UI/UX design reviews.',
      'Developed and maintained backend modules for inventory and procurement systems.',
      'Gained hands-on experience across the full SDLC from analysis to deployment.',
      'Prepared technical documentation and led knowledge transfer sessions.',
    ],
    technologies: ['Oracle', 'PL/SQL'],
  },
  {
    role: 'Software Engineering Intern – NKAR Tour Guide',
    company: 'DMS Software Technologies (Pvt) Ltd',
    period: 'Jul 2024 – Jan 2025', location: 'Colombo 00700, Sri Lanka',
    type: 'Internship', typeColor: 'green',
    description: 'Contributed to enterprise-grade platforms for the NKAR Tour Guide Project.',
    achievements: [
      'Created a seamless, intuitive UI/UX tailored to tourists and travel planners.',
      'Collaborated with the dev team and attended client visits to align with business needs.',
    ],
    technologies: ['Java', 'Spring Boot'],
  },
];

const certificationsData = [
  { title: 'Online Learning Programme in Python', issuer: 'University of Moratuwa', date: '2022', credentialId: 'META-12345', link: 'https://open.uom.lk/', skills: ['Python', 'Problem Solving', 'Programming Fundamentals'] },
  { title: 'Online Learning Programme in Frontend Web Development', issuer: 'University of Moratuwa', date: '2024', credentialId: 'META-12345', link: 'https://open.uom.lk/', skills: ['HTML', 'CSS', 'Responsive Design'] },
  { title: 'Online Learning Programme in Python for Beginners', issuer: 'University of Moratuwa', date: '2022', credentialId: 'UOM-FSD-2022', link: 'https://open.uom.lk/', skills: ['Python', 'Logic Building', 'Syntax'] },
  { title: 'Online Learning Programme in Web Design', issuer: 'University of Moratuwa', date: '2022', credentialId: 'UOM-FSD-2022', link: 'https://open.uom.lk/', skills: ['Web Design', 'UI Basics', 'Layout'] },
  { title: 'AI/ML Engineer - Stage 1', issuer: 'Sri Lanka Institute of Information Technology (SLIIT)', date: '2022', credentialId: 'UOM-FSD-2022', link: 'https://code.sliit.org/', skills: ['AI Fundamentals', 'ML Basics', 'Data Thinking'] },
  { title: 'Software Engineer Intern', issuer: 'HackerRank', date: '2022', credentialId: 'UOM-FSD-2022', link: 'https://www.hackerrank.com/', skills: ['Coding Practice', 'Problem Solving', 'Programming'] },
];

const achievementsData = [
  { title: 'Final Year Project', description: 'Worked on an AI-powered smart agriculture solution with strong practical impact.', date: '2024', category: 'Project', categoryType: 'cyan' },
];

const interestsData = [
  'Full Stack Development','Artificial Intelligence','UI/UX Design','Cloud Computing',
  'DevOps','Mobile Development','Open Source','Technical Writing',
  'Problem Solving','Competitive Programming','Photography','Stress Management',
];

const articlesData = [
  { title: 'How Agile Is Reshaping Project Delivery in 2025', platform: 'Medium', date: '2025', link: 'https://medium.com/@rasingollasaranga35' },
];

const STATS = [
  { value: 2,    suffix: '+', label: 'Internship\nProjects'  },
  { value: 6,    suffix: '+', label: 'Systems\nContributed'  },
  { value: 10,   suffix: '+', label: 'Core Skill\nAreas'     },
  { value: 2022, suffix: '',  label: 'Started\nIT Degree'    },
];

// ─── Main Component ───────────────────────────────────────────────────────────

const About = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { isDarkMode } = React.useContext(ThemeContext);
  const [showMessage, setShowMessage] = useState(false);
  const cursorGlowRef = useRef(null);
  const scrambledName = useScrambleText('Saranga Rasingolla', 1800, 260);

  useEffect(() => {
    const move = (e) => {
      if (!cursorGlowRef.current) return;
      cursorGlowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const handleDownloadCV = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  // ── Color tokens ──
  const c = {
    bg: isDarkMode
      ? 'linear-gradient(155deg, #060d18, #0b1a30, #111f40)'
      : 'linear-gradient(155deg, #eef6ff 0%, #f5f9ff 45%, #e8f2ff 100%)',
    text:       isDarkMode ? '#eef3ff'                    : '#0d1f3c',
    muted:      isDarkMode ? '#8a9ab8'                    : '#4d6080',
    primary:    '#4cc9f0',
    secondary:  '#4361ee',
    accent:     '#72efdd',
    success:    '#34d399',
    pink:       '#f472b6',
    purple:     '#a78bfa',
    card:       isDarkMode ? 'rgba(255,255,255,0.065)'    : 'rgba(255,255,255,0.78)',
    cardSoft:   isDarkMode ? 'rgba(255,255,255,0.045)'    : 'rgba(255,255,255,0.62)',
    statBg:     isDarkMode ? 'rgba(255,255,255,0.07)'     : 'rgba(255,255,255,0.72)',
    border:     isDarkMode ? 'rgba(255,255,255,0.12)'     : 'rgba(16,32,58,0.10)',
    borderSoft: isDarkMode ? 'rgba(255,255,255,0.08)'     : 'rgba(16,32,58,0.07)',
    shadowLg:   isDarkMode ? '0 24px 64px rgba(0,0,0,0.42)' : '0 24px 64px rgba(40,80,140,0.12)',
    shadowMd:   isDarkMode ? '0 12px 32px rgba(0,0,0,0.22)' : '0 12px 32px rgba(40,80,140,0.10)',
    shadowSm:   isDarkMode ? '0 6px 18px rgba(0,0,0,0.14)'  : '0 6px 18px rgba(40,80,140,0.07)',
  };

  return (
    <div style={{
      minHeight: '100vh', color: c.text, background: c.bg, backgroundAttachment: 'fixed',
      fontFamily: '"DM Sans", sans-serif', padding: '36px 20px 80px',
      position: 'relative', overflow: 'hidden',
    }}>
      <style>{CSS(isDarkMode, c)}</style>

      {/* Cursor glow */}
      <div ref={cursorGlowRef} style={{
        position: 'fixed', top: 0, left: 0, width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(76,201,240,0.08), transparent 68%)',
        pointerEvents: 'none', zIndex: 0,
        transition: 'transform 0.10s linear', willChange: 'transform',
      }} />

      {/* Ambient orbs */}
      <div className="ab-orb ab-orb1" />
      <div className="ab-orb ab-orb2" />
      <div className="ab-orb ab-orb3" />

      <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ══ HEADER CARD ══ */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative', borderRadius: 32, overflow: 'hidden',
            background: c.card, border: `1px solid ${c.border}`,
            backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            boxShadow: c.shadowLg, marginBottom: 26, padding: '36px 38px',
          }}
        >
          <ShimmerBorder />
          {/* Inner highlight overlay */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 32, pointerEvents: 'none',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, transparent 30%), linear-gradient(315deg, rgba(255,255,255,0.04) 0%, transparent 25%)',
          }} />

          <div className="ab-header-grid">
            {/* ─ Profile image ─ */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* Glow behind image */}
              <div style={{
                position: 'absolute', inset: '5%', borderRadius: 32,
                background: 'radial-gradient(circle, rgba(76,201,240,0.30), rgba(67,97,238,0.22) 50%, transparent 75%)',
                filter: 'blur(28px)', pointerEvents: 'none',
                animation: 'abGlowPulse 4s ease-in-out infinite alternate',
              }} />
              {/* Deco rings */}
              <div style={{
                position: 'absolute', width: 164, height: 164, borderRadius: '50%',
                border: '1px dashed rgba(76,201,240,0.25)',
                animation: 'abSpin 20s linear infinite',
              }} />
              <div style={{
                position: 'absolute', width: 140, height: 140, borderRadius: '50%',
                border: '1px solid rgba(114,239,221,0.18)',
                animation: 'abSpin 14s linear infinite reverse',
              }} />
              {/* Frame */}
              <div style={{
                position: 'relative', width: 122, height: 122, borderRadius: 28,
                padding: 3, zIndex: 2,
                background: 'linear-gradient(135deg, #4cc9f0, #4361ee, #72efdd)',
                boxShadow: '0 16px 36px rgba(67,97,238,0.30)',
              }}>
                <img
                  src={profileImage}
                  alt="Saranga Rasingolla"
                  style={{ width: '100%', height: '100%', borderRadius: 26, objectFit: 'cover', display: 'block' }}
                />
                {/* Online dot */}
                <div style={{
                  position: 'absolute', right: 6, bottom: 6, width: 22, height: 22,
                  borderRadius: '50%', zIndex: 3,
                  background: isDarkMode ? '#081321' : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: c.shadowMd,
                }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%', background: '#34d399',
                    boxShadow: '0 0 14px rgba(52,211,153,0.65)',
                    animation: 'abPulseGreen 2s ease-in-out infinite',
                  }} />
                </div>
              </div>
            </div>

            {/* ─ Info panel ─ */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {/* Status pills */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.55 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 18 }}
                className="ab-center-mobile"
              >
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '9px 15px', borderRadius: '999px',
                  background: c.cardSoft, border: `1px solid ${c.borderSoft}`,
                  fontSize: '0.85rem', fontWeight: 600, color: c.text,
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'linear-gradient(135deg, #72efdd, #4cc9f0)', boxShadow: '0 0 12px rgba(76,201,240,0.5)', flexShrink: 0 }} />
                  Final Year IT Undergraduate
                </div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '9px 15px', borderRadius: '999px',
                  background: c.cardSoft, border: `1px solid ${c.borderSoft}`,
                  fontSize: '0.85rem', fontWeight: 600, color: c.text,
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 12px rgba(52,211,153,0.6)', flexShrink: 0, animation: 'abPulseGreen 2s ease-in-out infinite' }} />
                  Available for internships & projects
                </div>
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28, duration: 0.5 }}
                style={{
                  margin: '0 0 10px', fontFamily: '"Syne", sans-serif',
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                  fontWeight: 800, lineHeight: 1.0, letterSpacing: '-1.5px',
                  background: 'linear-gradient(135deg, #fff 20%, #baf1ff 55%, #72efdd 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  minHeight: '1.05em',
                }}
              >{scrambledName || '\u00A0'}</motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.5 }}
                style={{ margin: '0 0 3px', color: c.primary, fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.02em' }}
              >
                Information Technology Undergraduate
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.40, duration: 0.5 }}
                style={{ margin: '0 0 18px', color: c.muted, fontSize: '0.96rem', lineHeight: 1.6, fontWeight: 300 }}
              >
                SLIIT – BSc (Hons) in Information Technology
              </motion.p>

              {/* Contact chips */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.46, duration: 0.5 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}
                className="ab-center-mobile"
              >
                {[
                  { label: '📍 Colombo, Sri Lanka', href: null },
                  { label: 'rasingollasaranga35@gmail.com', href: 'mailto:rasingollasaranga35@gmail.com' },
                ].map((item) => (
                  <div key={item.label} style={{
                    padding: '9px 14px', borderRadius: 13,
                    background: c.cardSoft, border: `1px solid ${c.borderSoft}`,
                    color: c.text, fontSize: '0.9rem', fontWeight: 400,
                  }}>
                    {item.href
                      ? <a href={item.href} style={{ color: c.text, textDecoration: 'none' }}>{item.label}</a>
                      : item.label}
                  </div>
                ))}
                <div style={{
                  padding: '9px 14px', borderRadius: 13,
                  background: c.cardSoft, border: `1px solid ${c.borderSoft}`,
                  fontSize: '0.9rem', fontWeight: 400,
                }}>
                  <a
                    href="https://wa.me/94703572917"
                    target="_blank" rel="noopener noreferrer"
                    style={{ color: c.text, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7 }}
                  >
                    <FaWhatsapp style={{ color: '#25D366' }} />
                    +94 70 357 2917
                  </a>
                </div>
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52, duration: 0.5 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}
                className="ab-center-mobile"
              >
                <button
                  onClick={handleDownloadCV}
                  className="ab-btn-primary ab-shimmer"
                  style={{
                    padding: '13px 22px', borderRadius: 14, border: 'none', cursor: 'pointer',
                    fontWeight: 700, fontSize: '0.92rem', color: '#fff', fontFamily: '"DM Sans", sans-serif',
                    background: 'linear-gradient(135deg, #4361ee, #4cc9f0)',
                    boxShadow: '0 10px 26px rgba(67,97,238,0.32)',
                    position: 'relative', overflow: 'hidden',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download CV
                </button>
                <a
                  href="mailto:rasingollasaranga35@gmail.com"
                  className="ab-btn-ghost ab-shimmer"
                  style={{
                    padding: '13px 22px', borderRadius: 14, cursor: 'pointer',
                    fontWeight: 700, fontSize: '0.92rem', color: c.text, fontFamily: '"DM Sans", sans-serif',
                    background: c.cardSoft, border: `1px solid ${c.border}`,
                    position: 'relative', overflow: 'hidden',
                    display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
                  Contact Me
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Toast */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              style={{
                position: 'fixed', top: 24, right: 24, zIndex: 50,
                padding: '14px 20px', borderRadius: 18,
                background: c.card, border: `1px solid ${c.border}`,
                boxShadow: c.shadowLg, color: c.text,
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.92rem',
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>📎</span>
              Replace this with your actual CV file link.
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ SUMMARY + STATS ROW ══ */}
        <div className="ab-grid-two" style={{ gap: 24, marginBottom: 26 }}>
          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative', borderRadius: 28, overflow: 'hidden',
              background: c.cardSoft, border: `1px solid ${c.borderSoft}`,
              backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
              boxShadow: c.shadowMd, padding: '28px 30px',
            }}
          >
            <ShimmerBorder />
            <h2 style={{
              margin: '0 0 14px', fontFamily: '"Syne", sans-serif',
              fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: c.text,
            }}>Professional Summary</h2>
            <p style={{ margin: '0 0 18px', fontSize: '0.98rem', lineHeight: 1.9, color: c.muted, fontWeight: 300 }}>
              I am a passionate final-year IT undergraduate with expertise in full-stack web
              development and a strong foundation in the MERN stack and Java/Spring Boot ecosystem.
              Through internship experience at DMS Software Technologies, I have contributed to
              enterprise-level systems, UI/UX improvements, backend modules, and real-world
              software delivery workflows. My interests include modern web engineering, AI
              integration, mobile development, and designing practical, user-centered digital products.
            </p>
            {/* Marquee */}
            <div className="ab-marquee-wrap" style={{
              overflow: 'hidden',
              maskImage: 'linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)',
            }}>
              <div className="ab-marquee-track" style={{ display: 'flex', gap: 10, width: 'max-content' }}>
                {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                  <span key={`${tech}-${i}`} className="ab-marquee-pill" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '9px 14px', borderRadius: '999px',
                    background: isDarkMode ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.72)',
                    border: `1px solid ${c.borderSoft}`,
                    color: c.text, fontWeight: 600, whiteSpace: 'nowrap', fontSize: '0.88rem',
                    transition: 'all 0.25s ease',
                  }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg, #4cc9f0, #72efdd)', boxShadow: '0 0 10px rgba(76,201,240,0.4)', flexShrink: 0 }} />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative', borderRadius: 28, overflow: 'hidden',
              background: c.cardSoft, border: `1px solid ${c.borderSoft}`,
              backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
              boxShadow: c.shadowMd, padding: '28px 30px',
            }}
          >
            <ShimmerBorder />
            <h2 style={{
              margin: '0 0 18px', fontFamily: '"Syne", sans-serif',
              fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: c.text,
            }}>Quick Highlights</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
              {STATS.map((item, i) => (
                <StatCounter key={item.label} {...item} index={i} colors={c} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ══ TABS CARD ══ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative', borderRadius: 30, overflow: 'hidden',
            background: c.card, border: `1px solid ${c.border}`,
            backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)',
            boxShadow: c.shadowLg, padding: '28px 30px',
          }}
        >
          <ShimmerBorder />

          {/* Tab nav */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 30,
            padding: '6px', borderRadius: 18,
            background: isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.55)',
            border: `1px solid ${c.borderSoft}`,
            width: 'fit-content',
          }} className="ab-tab-nav-wrap">
            {TABS.map((tab) => {
              const active = activeTab === tab.key;
              return (
                <motion.button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '11px 20px', borderRadius: 13, border: 'none', cursor: 'pointer',
                    fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '0.9rem',
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    background: active
                      ? 'linear-gradient(135deg, rgba(67,97,238,0.22), rgba(76,201,240,0.18))'
                      : 'transparent',
                    color: active ? c.primary : c.muted,
                    border: active ? '1px solid rgba(76,201,240,0.30)' : '1px solid transparent',
                    boxShadow: active ? '0 6px 18px rgba(67,97,238,0.16)' : 'none',
                    transition: 'all 0.26s ease',
                  }}
                >
                  <span style={{ fontSize: '0.78rem', opacity: 0.85 }}>{tab.icon}</span>
                  {tab.label}
                </motion.button>
              );
            })}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >

              {/* ─── Overview ─── */}
              {activeTab === 'overview' && (
                <>
                  <SectionHeader label="Interests & Passions" accent={c.accent} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
                    {interestsData.map((interest, i) => (
                      <motion.span
                        key={interest}
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                        whileHover={{ y: -3, scale: 1.04 }}
                        style={{
                          padding: '9px 15px', borderRadius: '999px',
                          background: c.cardSoft, border: `1px solid ${c.borderSoft}`,
                          fontSize: '0.88rem', fontWeight: 600, color: c.text, cursor: 'default',
                          transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                        }}
                        className="ab-interest-tag"
                      >
                        {interest}
                      </motion.span>
                    ))}
                  </div>

                  <SectionHeader label="Published Articles" accent={c.accent} />
                  <div className="ab-grid3" style={{ gap: 16 }}>
                    {articlesData.map((a, i) => (
                      <InfoCard key={a.title} colors={c} accentColor="rgba(76,201,240,0.18)" delay={i * 0.08}>
                        <h4 style={{ margin: '0 0 6px', fontFamily: '"Syne", sans-serif', fontSize: '1rem', fontWeight: 800, color: c.text }}>{a.title}</h4>
                        <p style={{ margin: '0 0 12px', color: c.muted, fontSize: '0.86rem' }}>{a.platform} · {a.date}</p>
                        <ArticleLink href={a.link} label="Read Article" color={c.primary} />
                      </InfoCard>
                    ))}
                  </div>
                </>
              )}

              {/* ─── Education ─── */}
              {activeTab === 'education' && (
                <>
                  <SectionHeader label="Education History" accent={c.accent} />
                  <div style={{ display: 'grid', gap: 16 }}>
                    {educationData.map((edu, i) => (
                      <InfoCard key={`${edu.degree}-${edu.period}`} colors={c} accentColor="rgba(114,239,221,0.16)" delay={i * 0.09}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 10 }}>
                          <div>
                            <h3 style={{ margin: '0 0 5px', fontFamily: '"Syne", sans-serif', fontSize: '1.05rem', fontWeight: 800, color: c.text }}>{edu.degree}</h3>
                            <p style={{ margin: 0, color: c.muted, fontSize: '0.92rem', fontWeight: 300 }}>{edu.institution}</p>
                          </div>
                          <BadgePill label={edu.status} type={edu.statusType} colors={c} />
                        </div>
                        <p style={{ margin: '0 0 10px', color: c.primary, fontWeight: 600, fontSize: '0.88rem' }}>{edu.period}</p>
                        {edu.results && <p style={{ margin: '0 0 10px', color: c.muted, fontSize: '0.92rem' }}>{edu.results}</p>}
                        <ul style={{ margin: '0 0 14px 18px', padding: 0, color: c.muted, fontSize: '0.92rem', lineHeight: 1.85, fontWeight: 300 }}>
                          {edu.highlights.map((h) => <li key={h}>{h}</li>)}
                        </ul>
                        <ArticleLink href={edu.link} label="Visit Institution" color={c.primary} />
                      </InfoCard>
                    ))}
                  </div>
                </>
              )}

              {/* ─── Experience ─── */}
              {activeTab === 'experience' && (
                <>
                  <SectionHeader label="Work Experience" accent={c.accent} />
                  <div style={{ display: 'grid', gap: 16 }}>
                    {experienceData.map((exp, i) => (
                      <InfoCard key={`${exp.company}-${i}`} colors={c} accentColor="rgba(52,211,153,0.14)" delay={i * 0.1}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 10 }}>
                          <div>
                            <h3 style={{ margin: '0 0 5px', fontFamily: '"Syne", sans-serif', fontSize: '1.05rem', fontWeight: 800, color: c.text }}>{exp.role}</h3>
                            <p style={{ margin: 0, color: c.muted, fontSize: '0.92rem', fontWeight: 300 }}>{exp.company}</p>
                          </div>
                          <BadgePill label={exp.type} type={exp.typeColor} colors={c} />
                        </div>
                        <p style={{ margin: '0 0 10px', color: c.primary, fontWeight: 600, fontSize: '0.88rem' }}>{exp.period} · {exp.location}</p>
                        <p style={{ margin: '0 0 10px', color: c.muted, fontSize: '0.92rem', lineHeight: 1.75, fontWeight: 300 }}>{exp.description}</p>
                        <ul style={{ margin: '0 0 14px 18px', padding: 0, color: c.muted, fontSize: '0.92rem', lineHeight: 1.85, fontWeight: 300 }}>
                          {exp.achievements.map((a) => <li key={a}>{a}</li>)}
                        </ul>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {exp.technologies.map((t) => (
                            <span key={t} style={{ padding: '6px 12px', borderRadius: '999px', background: 'rgba(76,201,240,0.10)', border: '1px solid rgba(76,201,240,0.20)', color: c.primary, fontSize: '0.82rem', fontWeight: 700 }}>{t}</span>
                          ))}
                        </div>
                      </InfoCard>
                    ))}
                  </div>
                </>
              )}

              {/* ─── Achievements ─── */}
              {activeTab === 'achievements' && (
                <>
                  <SectionHeader label="Certifications" accent={c.accent} />
                  <div className="ab-grid2" style={{ gap: 16, marginBottom: 32 }}>
                    {certificationsData.map((cert, i) => (
                      <InfoCard key={`${cert.title}-${i}`} colors={c} accentColor="rgba(167,139,250,0.16)" delay={i * 0.06}>
                        <h4 style={{ margin: '0 0 6px', fontFamily: '"Syne", sans-serif', fontSize: '0.98rem', fontWeight: 800, color: c.text, lineHeight: 1.3 }}>{cert.title}</h4>
                        <p style={{ margin: '0 0 3px', color: c.muted, fontSize: '0.85rem' }}>{cert.issuer} · {cert.date}</p>
                        <p style={{ margin: '0 0 12px', color: c.muted, fontSize: '0.82rem', opacity: 0.7 }}>ID: {cert.credentialId}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 12 }}>
                          {cert.skills.map((s) => (
                            <span key={s} style={{ padding: '5px 10px', borderRadius: '999px', background: 'rgba(114,239,221,0.10)', border: '1px solid rgba(114,239,221,0.22)', color: c.accent, fontSize: '0.78rem', fontWeight: 700 }}>{s}</span>
                          ))}
                        </div>
                        <ArticleLink href={cert.link} label="Verify ↗" color={c.primary} />
                      </InfoCard>
                    ))}
                  </div>

                  <SectionHeader label="Notable Achievements" accent={c.accent} />
                  <div className="ab-grid2" style={{ gap: 16 }}>
                    {achievementsData.map((ach, i) => (
                      <InfoCard key={ach.title} colors={c} accentColor="rgba(76,201,240,0.16)" delay={i * 0.08}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
                          <h4 style={{ margin: 0, fontFamily: '"Syne", sans-serif', fontSize: '1.02rem', fontWeight: 800, color: c.text }}>{ach.title}</h4>
                          <BadgePill label={ach.category} type={ach.categoryType} colors={c} />
                        </div>
                        <p style={{ margin: '0 0 8px', color: c.muted, fontSize: '0.92rem', lineHeight: 1.75, fontWeight: 300 }}>{ach.description}</p>
                        <p style={{ margin: 0, color: c.muted, fontSize: '0.84rem', opacity: 0.7 }}>{ach.date}</p>
                      </InfoCard>
                    ))}
                  </div>
                </>
              )}

            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

// ─── Tiny helpers ─────────────────────────────────────────────────────────────

function SectionHeader({ label, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
      <span style={{ width: 4, height: 18, borderRadius: 3, background: `linear-gradient(180deg, ${accent}, #4cc9f0)`, flexShrink: 0 }} />
      <h3 style={{ margin: 0, fontFamily: '"Syne", sans-serif', fontSize: '1.05rem', fontWeight: 800, color: accent, letterSpacing: '0.01em' }}>{label}</h3>
    </div>
  );
}

function ArticleLink({ href, label, color }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="ab-article-link" style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      textDecoration: 'none', color, fontWeight: 700, fontSize: '0.87rem',
      transition: 'gap 0.22s ease, opacity 0.22s ease', opacity: 0.85,
    }}>
      {label}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
    </a>
  );
}

// ─── CSS ──────────────────────────────────────────────────────────────────────

const CSS = (isDark, c) => `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&display=swap');

  /* ── Ambient orbs ── */
  .ab-orb {
    position: fixed; border-radius: 50%;
    filter: blur(80px); pointer-events: none; z-index: 0; opacity: 0.30;
  }
  .ab-orb1 {
    width: 480px; height: 480px; top: -160px; left: -160px;
    background: radial-gradient(circle, rgba(76,201,240,0.28), transparent 70%);
    animation: abOrbDrift1 14s ease-in-out infinite alternate;
  }
  .ab-orb2 {
    width: 400px; height: 400px; bottom: -120px; right: -120px;
    background: radial-gradient(circle, rgba(67,97,238,0.30), transparent 70%);
    animation: abOrbDrift2 17s ease-in-out infinite alternate;
  }
  .ab-orb3 {
    width: 280px; height: 280px; top: 45%; left: 48%;
    background: radial-gradient(circle, rgba(114,239,221,0.18), transparent 70%);
    transform: translate(-50%,-50%);
    animation: abOrbDrift3 20s ease-in-out infinite alternate;
  }

  /* ── Layout grids ── */
  .ab-header-grid {
    display: grid;
    grid-template-columns: 150px minmax(0, 1fr);
    gap: 30px; align-items: center;
    position: relative; z-index: 1;
  }

  .ab-grid-two {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
  }

  .ab-grid2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ab-grid3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }

  /* ── Marquee ── */
  .ab-marquee-wrap:hover .ab-marquee-track { animation-play-state: paused; }
  .ab-marquee-track { animation: abMarquee 28s linear infinite; }
  .ab-marquee-pill:hover {
    transform: translateY(-3px);
    border-color: rgba(76,201,240,0.28) !important;
    box-shadow: 0 10px 22px rgba(76,201,240,0.10);
  }

  /* ── Buttons ── */
  .ab-shimmer::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.14) 50%, transparent 100%);
    transform: translateX(-120%);
    transition: transform 0.55s ease;
  }
  .ab-shimmer:hover::after { transform: translateX(120%); }

  .ab-btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 34px rgba(67,97,238,0.42) !important;
  }
  .ab-btn-ghost:hover {
    transform: translateY(-3px);
    border-color: rgba(76,201,240,0.35) !important;
    box-shadow: 0 10px 24px rgba(76,201,240,0.10) !important;
    color: #4cc9f0 !important;
  }

  /* ── Interest tags hover ── */
  .ab-interest-tag:hover {
    border-color: rgba(76,201,240,0.30) !important;
    box-shadow: 0 8px 20px rgba(76,201,240,0.10);
  }

  /* ── Info card glow reveal ── */
  .ab-info-card:hover .about-card-glow { opacity: 1 !important; }

  /* ── Article link hover ── */
  .ab-article-link:hover { gap: 10px !important; opacity: 1 !important; }

  /* ── Stat card hover ── */
  .about-stat-card:hover {
    border-color: rgba(76,201,240,0.28) !important;
    box-shadow: 0 16px 32px rgba(76,201,240,0.12) !important;
  }

  /* ── Tab nav scroll on mobile ── */
  .ab-tab-nav-wrap { max-width: 100%; overflow-x: auto; }

  /* ── Animations ── */
  @keyframes abMarquee    { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes abSpin       { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
  @keyframes abGlowPulse  { from { opacity: 0.65; }  to { opacity: 1; }   }
  @keyframes abPulseGreen {
    0%, 100% { box-shadow: 0 0 8px rgba(52,211,153,0.5); }
    50%       { box-shadow: 0 0 18px rgba(52,211,153,0.9); }
  }
  @keyframes abOrbDrift1  { from { transform: translate(0,0) scale(1); } to { transform: translate(50px,35px) scale(1.1); } }
  @keyframes abOrbDrift2  { from { transform: translate(0,0) scale(1); } to { transform: translate(-40px,-28px) scale(1.08); } }
  @keyframes abOrbDrift3  { from { transform: translate(-50%,-50%) scale(1); } to { transform: translate(-50%,-50%) scale(1.15); } }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .ab-grid-two { grid-template-columns: 1fr !important; }
    .ab-grid3    { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
    .ab-header-grid { grid-template-columns: 1fr !important; text-align: center; }
    .ab-center-mobile { justify-content: center !important; }
  }

  @media (max-width: 768px) {
    .ab-grid2, .ab-grid3 { grid-template-columns: 1fr !important; }
    .ab-tab-nav-wrap button { font-size: 0.82rem !important; padding: 9px 14px !important; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }
`;

export default About;