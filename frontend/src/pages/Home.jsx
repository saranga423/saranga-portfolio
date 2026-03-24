import React, { useMemo, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Logos
import htmlLogo from '../assets/logos/html5.svg';
import cssLogo from '../assets/logos/css3.svg';
import jsLogo from '../assets/logos/javascript.svg';
import tsLogo from '../assets/logos/typescript.svg';
import gimpLogo from '../assets/logos/gimp.svg';
import pythonLogo from '../assets/logos/python.svg';
import javaLogo from '../assets/logos/java.svg';
import mysqlLogo from '../assets/logos/mysql.svg';
import reactLogo from '../assets/logos/react.svg';
import nodeLogo from '../assets/logos/nodejs.svg';
import mongoLogo from '../assets/logos/mongodb.svg';
import springLogo from '../assets/logos/spring.svg';
import gitLogo from '../assets/logos/git.svg';
import figmaLogo from '../assets/logos/figma.svg';
import reduxLogo from '../assets/logos/redux.svg';
import tailwindLogo from '../assets/logos/tailwind.svg';
import githubLogo from '../assets/logos/github.svg';
import vscodeLogo from '../assets/logos/vscode.svg';
import jiraLogo from '../assets/logos/jira.svg';
import netlifyLogo from '../assets/logos/netlify.svg';
import vercelLogo from '../assets/logos/vercel.svg';
import intelliJLogo from '../assets/logos/intellij-idea.svg';
import oracleLogo from '../assets/logos/Oracle.svg';
import phpLogo from '../assets/logos/PHP.svg';
import powerbiLogo from '../assets/logos/powerBi.svg';
import profileImage from '../assets/pic.jpg';

// ─── Data ──────────────────────────────────────────────────────────────────────

const TECH_LOGOS = [
  { src: htmlLogo, alt: 'HTML5' },
  { src: cssLogo, alt: 'CSS3' },
  { src: jsLogo, alt: 'JavaScript' },
  { src: tsLogo, alt: 'TypeScript' },
  { src: reactLogo, alt: 'React' },
  { src: reduxLogo, alt: 'Redux' },
  { src: tailwindLogo, alt: 'Tailwind CSS' },
  { src: nodeLogo, alt: 'Node.js' },
  { src: mongoLogo, alt: 'MongoDB' },
  { src: springLogo, alt: 'Spring Boot' },
  { src: javaLogo, alt: 'Java' },
  { src: pythonLogo, alt: 'Python' },
  { src: mysqlLogo, alt: 'MySQL' },
  { src: gitLogo, alt: 'Git' },
  { src: githubLogo, alt: 'GitHub' },
  { src: gimpLogo, alt: 'GIMP' },
  { src: intelliJLogo, alt: 'IntelliJ IDEA' },
  { src: vscodeLogo, alt: 'VS Code' },
  { src: jiraLogo, alt: 'Jira' },
  { src: netlifyLogo, alt: 'Netlify' },
  { src: vercelLogo, alt: 'Vercel' },
  { src: figmaLogo, alt: 'Figma' },
  { src: oracleLogo, alt: 'Oracle' },
  { src: phpLogo, alt: 'PHP' },
  { src: powerbiLogo, alt: 'Power BI' }
];

const STAT_ITEMS = [
  { value: 1, suffix: '+', label: 'Years Building\nProjects' },
  { value: 20, suffix: '+', label: 'UI Components\nDelivered' },
  { value: 10, suffix: '+', label: 'Technologies\nUsed' },
  { value: 6, suffix: '+', label: 'Systems\nContributed To' }
];

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    href: 'https://github.com/saranga423',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/saranga-rasingolla',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM3.56 20.45h3.55V9H3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
      </svg>
    )
  },
  {
    name: 'Email',
    href: 'mailto:sarangarasingolla@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="2,4 12,13 22,4" />
      </svg>
    )
  }
];

const WORK_EXPERIENCE = [
  {
    company: 'ICIEOS',
    role: 'Software Engineering Intern',
    period: '2024 – 2025',
    type: 'Internship',
    description:
      'Contributed to portfolio and client-facing systems using React, Next.js, MERN stack technologies, and Firebase. Built reusable UI components, integrated REST APIs, collaborated with QA and BA teams, and supported agile delivery workflows.',
    highlights: [
      'Developed and enhanced 20+ frontend UI components',
      'Contributed to 6 production-level systems',
      'Worked closely with QA, BA, and development teams',
      'Participated in stand-ups, sprint discussions, and client collaboration'
    ],
    tech: ['React', 'Next.js', 'MERN', 'Firebase', 'REST APIs']
  },
  {
    company: 'DMS Software Technologies',
    role: 'Software Engineering Intern',
    period: '2023 – 2024',
    type: 'Internship',
    description:
      'Worked on enterprise and domain-specific systems including tourism and railway-related applications. Focused on Oracle-based UI development, database-driven workflows, usability improvements, and backend logic.',
    highlights: [
      'Worked on tourism and railway systems',
      'Improved UI/UX for internal and client-facing applications',
      'Customized Oracle Forms and Reports modules',
      'Used PL/SQL and MySQL for system functionality'
    ],
    tech: ['Oracle Forms', 'Oracle Reports', 'PL/SQL', 'MySQL', 'UI/UX']
  }
];

const FEATURED_PROJECTS = [
  {
    title: 'Smart Pollination Assistant',
    category: 'AI + IoT + Mobile',
    description:
      'An intelligent greenhouse support system for pumpkin farming that combines computer vision, sensor insights, and edge-to-cloud workflows to improve pollination readiness and reduce manual observation.',
    stack: ['Flutter', 'FastAPI', 'YOLO', 'IoT'],
    route: '/projects'
  },
  {
    title: 'Fake News Detection System',
    category: 'NLP + Explainable AI',
    description:
      'A misinformation detection platform with explainable AI, keyword-level reasoning, analytics dashboards, and feedback-driven improvement workflows for more transparent predictions.',
    stack: ['React', 'FastAPI', 'SQLAlchemy', 'scikit-learn'],
    route: '/projects'
  },
  {
    title: 'Clarity Score Platform',
    category: 'Workflow + Product UI',
    description:
      'A role-aware platform for sprint-based clarity submissions, approval flows, reporting, and structured collaboration across developers, business analysts, and reporters.',
    stack: ['Next.js', 'TypeScript', 'MUI', 'REST API'],
    route: '/projects'
  }
];

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// ─── Hooks ──────────────────────────────────────────────────────────────────────

function useScrambleText(target, duration = 1600) {
  const [display, setDisplay] = useState('');
  const frameRef = useRef(null);

  useEffect(() => {
    let start = null;
    const total = target.length;

    const step = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const revealed = Math.floor(progress * total);

      const chars = target.split('').map((ch, i) => {
        if (ch === ' ') return ' ';
        if (i < revealed) return ch;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      });

      setDisplay(chars.join(''));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };

    const delay = setTimeout(() => {
      frameRef.current = requestAnimationFrame(step);
    }, 300);

    return () => {
      clearTimeout(delay);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration]);

  return display;
}

function useCountUp(target, duration = 1800, delay = 600) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = null;

      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(step);
        }
      };

      frameRef.current = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, delay]);

  return count;
}

// ─── Sub-components ─────────────────────────────────────────────────────────────

function StatCard({ item, index }) {
  const count = useCountUp(item.value, 1600, 700 + index * 120);

  return (
    <article className="stat-card" style={{ animationDelay: `${0.55 + index * 0.1}s` }}>
      <div className="stat-value">
        {count}
        {item.suffix}
      </div>
      <p className="stat-label">{item.label}</p>
    </article>
  );
}

function TechMarquee({ logos }) {
  const doubled = useMemo(() => [...logos, ...logos], [logos]);

  return (
    <div className="marquee-outer" aria-label="Tech stack">
      <div className="marquee-track">
        {doubled.map((logo, i) => (
          <div key={i} className="marquee-item" title={logo.alt}>
            <img src={logo.src} alt={logo.alt} loading="lazy" className="marquee-img" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (!glowRef.current) return;
      glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return <div ref={glowRef} className="cursor-glow" />;
}

// ─── Main Component ─────────────────────────────────────────────────────────────

const Home = () => {
  const navigate = useNavigate();
  const nameDisplay = useScrambleText('Saranga Rasingolla', 1800);

  return (
    <main className="home-page">
      <style>{CSS}</style>

      <CursorGlow />

      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="home-container">
        <section aria-label="Hero section">
          <div className="home-grid">
            <div className="left-card fade-up d1">
              <div className="badge-row">
                <div className="badge badge-pulse">
                  <span className="dot dot-cyan" />
                  Building modern digital experiences
                </div>

                <div className="badge" aria-label="Availability status">
                  <span className="dot dot-green" />
                  Open to internships & projects
                </div>
              </div>

              <header>
                <p className="greeting-tag">✦ Hello, my name is</p>

                <h1 className="hero-name" aria-label="Saranga Rasingolla">
                  {nameDisplay || '\u00A0'}
                </h1>

                <h2 className="hero-title">
                  <span className="title-segment">Software Engineer</span>
                  <span className="title-sep">·</span>
                  <span className="title-segment">Full Stack Developer</span>
                  <span className="title-sep">·</span>
                  <span className="title-segment">UI/UX Enthusiast</span>
                </h2>
              </header>

              <p className="hero-description fade-up d2">
                I design and build scalable, responsive, and user-focused digital
                products with a strong emphasis on clean architecture, performance,
                and polished user experience — turning real problems into practical,
                visually refined solutions.
              </p>

              <div className="btn-row fade-up d3">
                <button type="button" onClick={() => navigate('/contact')} className="btn btn-primary">
                  <span>Get In Touch</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>

                <button type="button" onClick={() => navigate('/services')} className="btn btn-ghost">
                  My Services
                </button>

                <button type="button" onClick={() => navigate('/projects')} className="btn btn-ghost">
                  Projects
                </button>
              </div>

              <div className="stats-grid fade-up d4" aria-label="Profile statistics">
                {STAT_ITEMS.map((item, i) => (
                  <StatCard key={item.label} item={item} index={i} />
                ))}
              </div>

              <div className="social-row fade-up d5" aria-label="Social links">
                {SOCIAL_LINKS.map((link) => (
                  <a key={link.name} href={link.href} target="_blank" rel="noreferrer" className="social-link">
                    <span className="social-icon">{link.icon}</span>
                    <span className="social-name">{link.name}</span>
                    <svg className="social-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                ))}
              </div>

              <section className="section-box fade-up d6" aria-labelledby="tech-heading">
                <h3 id="tech-heading" className="section-label">
                  <span className="label-line" />
                  Tech Stack
                  <span className="label-line" />
                </h3>
                <TechMarquee logos={TECH_LOGOS} />
              </section>

              <section className="section-box about-box fade-up d6" aria-labelledby="about-heading">
                <h3 id="about-heading" className="about-title">About Me</h3>
                <p className="about-text">
                  Passionate about full-stack development, modern frontend engineering,
                  and UI/UX design. I enjoy creating clean interfaces, integrating backend
                  services, and continuously improving performance, maintainability, and
                  usability — always with a product-first mindset.
                </p>
              </section>

              <section className="section-box projects-box fade-up d6" aria-labelledby="projects-heading">
                <div className="section-head-row">
                  <h3 id="projects-heading" className="about-title">Featured Projects</h3>
                  <button type="button" className="inline-link-btn" onClick={() => navigate('/projects')}>
                    View all
                  </button>
                </div>

                <div className="project-grid">
                  {FEATURED_PROJECTS.map((project) => (
                    <article key={project.title} className="project-card">
                      <div className="project-top">
                        <span className="project-category">{project.category}</span>
                      </div>

                      <h4 className="project-title">{project.title}</h4>
                      <p className="project-desc">{project.description}</p>

                      <div className="project-tags">
                        {project.stack.map((item) => (
                          <span key={item} className="chip">
                            {item}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="project-link"
                        onClick={() => navigate(project.route)}
                      >
                        Explore project
                        <span>↗</span>
                      </button>
                    </article>
                  ))}
                </div>
              </section>

              <section className="section-box timeline-box fade-up d6" aria-labelledby="experience-heading">
                <div className="section-head-row">
                  <h3 id="experience-heading" className="about-title">Timeline / Experience</h3>
                </div>

                <div className="timeline">
                  {WORK_EXPERIENCE.map((item, index) => (
                    <article key={`${item.company}-${index}`} className="timeline-item">
                      <div className="timeline-dot-wrap">
                        <span className="timeline-dot" />
                        {index !== WORK_EXPERIENCE.length - 1 && <span className="timeline-line" />}
                      </div>

                      <div className="timeline-card">
                        <div className="timeline-top">
                          <div>
                            <p className="timeline-role">{item.role}</p>
                            <h4 className="timeline-company">{item.company}</h4>
                          </div>

                          <div className="timeline-meta">
                            <span className="timeline-type">{item.type}</span>
                            <span className="timeline-period">{item.period}</span>
                          </div>
                        </div>

                        <p className="timeline-desc">{item.description}</p>

                        <ul className="timeline-list">
                          {item.highlights.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>

                        <div className="timeline-tags">
                          {item.tech.map((tech) => (
                            <span key={tech} className="chip">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside className="right-wrap fade-right d3" aria-label="Profile section">
              <div className="image-container">
                <div className="image-glow" />
                <div className="deco-ring ring-outer" />
                <div className="deco-ring ring-inner" />

                <div className="image-frame">
                  <div className="image-overlay" />
                  <img src={profileImage} alt="Saranga Rasingolla" className="profile-img" />
                </div>

                <span className="accent-dot" style={{ top: '6%', left: '10%' }} />
                <span className="accent-dot" style={{ right: '8%', bottom: '12%' }} />
                <span className="accent-dot sm" style={{ top: '22%', right: '-2%' }} />
                <span className="accent-dot sm" style={{ left: '-1%', bottom: '28%' }} />

                <div className="float-card float-top">
                  <span className="float-icon">⚡</span>
                  <div>
                    <span className="float-label">Focus</span>
                    <strong className="float-val">Frontend + Full Stack</strong>
                  </div>
                </div>

                <div className="float-card float-bottom">
                  <span className="float-icon">✦</span>
                  <div>
                    <span className="float-label">Core Strength</span>
                    <strong className="float-val">Modern UI & Clean Code</strong>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;

// ─── Styles ─────────────────────────────────────────────────────────────────────

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

  :root {
    --c-bg:       #060d18;
    --c-text:     #eef3ff;
    --c-muted:    #8a9ab8;
    --c-cyan:     #4cc9f0;
    --c-blue:     #4361ee;
    --c-mint:     #72efdd;
    --c-glass:    rgba(255,255,255,0.055);
    --c-glass2:   rgba(255,255,255,0.035);
    --c-border:   rgba(255,255,255,0.10);
    --c-border2:  rgba(255,255,255,0.07);
    --font-head:  'Syne', sans-serif;
    --font-body:  'DM Sans', sans-serif;
    --radius-lg:  28px;
    --radius-md:  18px;
    --shadow-lg:  0 24px 64px rgba(0,0,0,0.40);
    --shadow-md:  0 10px 30px rgba(0,0,0,0.22);
    --t:          0.28s ease;
  }

  .home-page {
    min-height: 100vh;
    color: var(--c-text);
    font-family: var(--font-body);
    background:
      radial-gradient(circle at 5% 8%, rgba(76,201,240,0.13) 0%, transparent 28%),
      radial-gradient(circle at 90% 15%, rgba(67,97,238,0.16) 0%, transparent 26%),
      radial-gradient(circle at 50% 95%, rgba(114,239,221,0.10) 0%, transparent 30%),
      linear-gradient(155deg, #060d18, #0b1a30, #111f40);
    background-attachment: fixed;
    overflow-x: hidden;
    position: relative;
  }

  .cursor-glow {
    position: fixed;
    top: 0;
    left: 0;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(76,201,240,0.07) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transition: transform 0.12s ease-out;
    will-change: transform;
  }

  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
    opacity: 0.35;
  }

  .orb-1 {
    width: 520px;
    height: 520px;
    background: radial-gradient(circle, rgba(76,201,240,0.25), transparent 70%);
    top: -180px;
    left: -180px;
    animation: orbDrift1 14s ease-in-out infinite alternate;
  }

  .orb-2 {
    width: 420px;
    height: 420px;
    background: radial-gradient(circle, rgba(67,97,238,0.28), transparent 70%);
    bottom: -140px;
    right: -140px;
    animation: orbDrift2 16s ease-in-out infinite alternate;
  }

  .orb-3 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(114,239,221,0.18), transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: orbDrift3 18s ease-in-out infinite alternate;
  }

  .home-container {
    max-width: 1340px;
    margin: 0 auto;
    padding: 52px 28px 72px;
    position: relative;
    z-index: 1;
  }

  .home-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.75fr);
    gap: 52px;
    align-items: start;
  }

  .left-card {
    position: relative;
    padding: 38px 40px;
    border-radius: var(--radius-lg);
    background: var(--c-glass);
    border: 1px solid var(--c-border);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255,255,255,0.09);
  }

  .left-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius-lg);
    padding: 1px;
    background: linear-gradient(120deg, rgba(76,201,240,0.5) 0%, transparent 40%, rgba(67,97,238,0.4) 100%);
    -webkit-mask: linear-gradient(#000,#000) content-box, linear-gradient(#000,#000);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .badge-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 26px;
    align-items: center;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 16px;
    border-radius: 999px;
    background: rgba(255,255,255,0.06);
    border: 1px solid var(--c-border);
    backdrop-filter: blur(12px);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--c-muted);
    letter-spacing: 0.01em;
  }

  .badge-pulse {
    animation: badgePulse 3.5s ease-in-out infinite;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .dot-cyan {
    background: var(--c-cyan);
    box-shadow: 0 0 14px rgba(76,201,240,0.7);
  }

  .dot-green {
    background: #34d399;
    box-shadow: 0 0 14px rgba(52,211,153,0.65);
    animation: pulse-green 2s ease-in-out infinite;
  }

  .greeting-tag {
    font-size: 0.9rem;
    font-weight: 400;
    color: var(--c-mint);
    letter-spacing: 0.05em;
    margin: 0 0 12px;
  }

  .hero-name {
    font-family: var(--font-head);
    font-size: clamp(2.4rem, 5.5vw, 4.4rem);
    line-height: 1;
    font-weight: 800;
    letter-spacing: -1.5px;
    margin: 0 0 14px;
    background: linear-gradient(135deg, #fff 30%, var(--c-cyan) 70%, var(--c-mint) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    min-height: 1.05em;
    font-variant-ligatures: none;
  }

  .hero-title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-size: clamp(0.9rem, 1.6vw, 1.1rem);
    font-weight: 500;
    color: var(--c-muted);
  }

  .title-segment {
    color: var(--c-cyan);
    font-weight: 600;
  }

  .title-sep {
    color: rgba(255,255,255,0.2);
    font-size: 1.1em;
  }

  .hero-description {
    max-width: 680px;
    margin: 22px 0 28px;
    font-size: 1.02rem;
    line-height: 1.85;
    color: var(--c-muted);
    font-weight: 300;
  }

  .btn-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 28px;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 22px;
    border-radius: 14px;
    border: none;
    cursor: pointer;
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 0.92rem;
    letter-spacing: 0.01em;
    transition: var(--t);
    position: relative;
    overflow: hidden;
  }

  .btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  .btn:hover::after {
    transform: translateX(100%);
  }

  .btn-primary {
    color: #fff;
    background: linear-gradient(135deg, var(--c-blue) 0%, var(--c-cyan) 100%);
    box-shadow: 0 8px 24px rgba(67,97,238,0.35);
  }

  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 32px rgba(67,97,238,0.45);
  }

  .btn-ghost {
    color: var(--c-text);
    background: rgba(255,255,255,0.06);
    border: 1px solid var(--c-border);
    backdrop-filter: blur(10px);
  }

  .btn-ghost:hover {
    transform: translateY(-3px);
    background: rgba(255,255,255,0.10);
    border-color: rgba(76,201,240,0.35);
    box-shadow: 0 10px 24px rgba(76,201,240,0.10);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
    margin-bottom: 26px;
  }

  .stat-card {
    padding: 20px 16px 18px;
    border-radius: 20px;
    background: var(--c-glass2);
    border: 1px solid var(--c-border2);
    backdrop-filter: blur(12px);
    box-shadow: 0 8px 22px rgba(0,0,0,0.14);
    transition: var(--t);
    opacity: 0;
    animation: fadeUp 0.6s ease forwards;
  }

  .stat-card:hover {
    transform: translateY(-4px);
    border-color: rgba(76,201,240,0.28);
    box-shadow: 0 16px 32px rgba(76,201,240,0.10);
  }

  .stat-value {
    font-family: var(--font-head);
    font-size: 1.9rem;
    font-weight: 800;
    color: var(--c-cyan);
    margin: 0 0 5px;
    line-height: 1;
  }

  .stat-label {
    margin: 0;
    font-size: 0.8rem;
    line-height: 1.5;
    color: var(--c-muted);
    white-space: pre-line;
    font-weight: 400;
  }

  .social-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 28px;
  }

  .social-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 11px 16px;
    border-radius: 14px;
    text-decoration: none;
    color: var(--c-text);
    background: var(--c-glass2);
    border: 1px solid var(--c-border2);
    backdrop-filter: blur(12px);
    font-size: 0.88rem;
    font-weight: 500;
    transition: var(--t);
  }

  .social-link:hover {
    transform: translateY(-3px);
    background: rgba(255,255,255,0.09);
    border-color: rgba(76,201,240,0.35);
    box-shadow: 0 10px 22px rgba(76,201,240,0.10);
    color: var(--c-cyan);
  }

  .social-icon {
    opacity: 0.75;
    flex-shrink: 0;
  }

  .social-link:hover .social-icon {
    opacity: 1;
  }

  .social-arrow {
    opacity: 0;
    transform: translateX(-4px);
    transition: var(--t);
    flex-shrink: 0;
  }

  .social-link:hover .social-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  .section-box {
    margin-top: 18px;
    padding: 24px;
    border-radius: 22px;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--c-border2);
  }

  .section-label {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 0 18px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--c-mint);
  }

  .label-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(114,239,221,0.5), transparent);
  }

  .section-head-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
    flex-wrap: wrap;
  }

  .inline-link-btn {
    border: none;
    background: transparent;
    color: var(--c-cyan);
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
  }

  .inline-link-btn:hover {
    color: var(--c-mint);
  }

  .marquee-outer {
    overflow: hidden;
    mask-image: linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%);
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%);
  }

  .marquee-track {
    display: flex;
    gap: 14px;
    width: max-content;
    animation: marqueeScroll 28s linear infinite;
  }

  .marquee-track:hover {
    animation-play-state: paused;
  }

  .marquee-item {
    width: 54px;
    height: 54px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 14px;
    background: rgba(255,255,255,0.07);
    border: 1px solid var(--c-border2);
    transition: var(--t);
  }

  .marquee-item:hover {
    background: rgba(76,201,240,0.10);
    border-color: rgba(76,201,240,0.35);
    transform: translateY(-4px) scale(1.08);
    box-shadow: 0 12px 24px rgba(76,201,240,0.15);
  }

  .marquee-img {
    width: 58%;
    height: 58%;
    object-fit: contain;
  }

  .about-box {
    margin-top: 14px;
  }

  .about-title {
    margin: 0;
    font-family: var(--font-head);
    font-size: 1.15rem;
    color: var(--c-cyan);
  }

  .about-text {
    margin: 0;
    font-size: 0.97rem;
    line-height: 1.85;
    color: var(--c-muted);
    font-weight: 300;
  }

  .project-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .project-card {
    position: relative;
    padding: 18px;
    border-radius: 18px;
    background: var(--c-glass2);
    border: 1px solid var(--c-border2);
    transition: var(--t);
    overflow: hidden;
  }

  .project-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 18px;
    padding: 1px;
    background: linear-gradient(130deg, rgba(76,201,240,0.32), transparent 45%, rgba(67,97,238,0.26));
    -webkit-mask: linear-gradient(#000,#000) content-box, linear-gradient(#000,#000);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .project-card:hover {
    transform: translateY(-4px);
    border-color: rgba(76,201,240,0.22);
    box-shadow: 0 16px 30px rgba(76,201,240,0.08);
    background: rgba(255,255,255,0.055);
  }

  .project-top {
    margin-bottom: 10px;
  }

  .project-category {
    display: inline-flex;
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(114,239,221,0.08);
    border: 1px solid rgba(114,239,221,0.14);
    color: var(--c-mint);
    font-size: 0.76rem;
    font-weight: 600;
  }

  .project-title {
    margin: 0 0 8px;
    font-size: 1rem;
    font-weight: 700;
    color: var(--c-text);
  }

  .project-desc {
    margin: 0 0 14px;
    font-size: 0.9rem;
    line-height: 1.72;
    color: var(--c-muted);
    font-weight: 300;
  }

  .project-tags,
  .timeline-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    padding: 7px 10px;
    border-radius: 999px;
    background: rgba(76,201,240,0.08);
    border: 1px solid rgba(76,201,240,0.16);
    color: var(--c-cyan);
    font-size: 0.76rem;
    font-weight: 600;
  }

  .project-link {
    margin-top: 14px;
    display: inline-flex;
    gap: 8px;
    align-items: center;
    background: transparent;
    border: none;
    color: var(--c-cyan);
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
  }

  .project-link:hover {
    color: var(--c-mint);
  }

  .timeline {
    position: relative;
    display: grid;
    gap: 18px;
  }

  .timeline-item {
    display: grid;
    grid-template-columns: 28px minmax(0, 1fr);
    gap: 14px;
    align-items: start;
  }

  .timeline-dot-wrap {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .timeline-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: 10px;
    background: linear-gradient(135deg, var(--c-mint), var(--c-cyan));
    box-shadow: 0 0 18px rgba(76,201,240,0.55);
    z-index: 2;
  }

  .timeline-line {
    position: absolute;
    top: 26px;
    bottom: -22px;
    width: 2px;
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(76,201,240,0.45), rgba(67,97,238,0.12));
  }

  .timeline-card {
    position: relative;
    padding: 20px;
    border-radius: 18px;
    background: var(--c-glass2);
    border: 1px solid var(--c-border2);
    transition: var(--t);
    overflow: hidden;
  }

  .timeline-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 18px;
    padding: 1px;
    background: linear-gradient(130deg, rgba(76,201,240,0.30), transparent 40%, rgba(67,97,238,0.24));
    -webkit-mask: linear-gradient(#000,#000) content-box, linear-gradient(#000,#000);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .timeline-card:hover {
    transform: translateY(-4px);
    border-color: rgba(76,201,240,0.22);
    box-shadow: 0 16px 30px rgba(76,201,240,0.08);
    background: rgba(255,255,255,0.055);
  }

  .timeline-top {
    display: flex;
    justify-content: space-between;
    gap: 14px;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 12px;
  }

  .timeline-role {
    margin: 0 0 4px;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--c-mint);
    font-weight: 700;
  }

  .timeline-company {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: var(--c-text);
  }

  .timeline-meta {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-end;
  }

  .timeline-type,
  .timeline-period {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 7px 11px;
    border-radius: 999px;
    font-size: 0.76rem;
    font-weight: 600;
    white-space: nowrap;
  }

  .timeline-type {
    background: rgba(114,239,221,0.08);
    border: 1px solid rgba(114,239,221,0.14);
    color: var(--c-mint);
  }

  .timeline-period {
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--c-border2);
    color: var(--c-muted);
  }

  .timeline-desc {
    margin: 0 0 14px;
    font-size: 0.92rem;
    line-height: 1.75;
    color: var(--c-muted);
    font-weight: 300;
  }

  .timeline-list {
    margin: 0 0 14px;
    padding-left: 18px;
    color: var(--c-muted);
  }

  .timeline-list li {
    margin-bottom: 8px;
    font-size: 0.88rem;
    line-height: 1.65;
  }

  .right-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image-container {
    position: relative;
    width: min(100%, 400px);
    aspect-ratio: 1 / 1;
  }

  .image-glow {
    position: absolute;
    inset: 8% 10%;
    border-radius: 30px;
    background:
      radial-gradient(circle, rgba(76,201,240,0.28), transparent 60%),
      radial-gradient(circle at 70% 30%, rgba(67,97,238,0.22), transparent 55%);
    filter: blur(36px);
    z-index: 0;
    animation: glowPulse 4s ease-in-out infinite alternate;
  }

  .deco-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(76,201,240,0.18);
    z-index: 1;
    animation: ringRotate 20s linear infinite;
  }

  .ring-outer {
    inset: -18px;
    border-style: dashed;
    animation-direction: normal;
  }

  .ring-inner {
    inset: -6px;
    border-color: rgba(114,239,221,0.12);
    animation-direction: reverse;
    animation-duration: 14s;
  }

  .image-frame {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 14px;
    border-radius: 32px;
    overflow: hidden;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.13);
    backdrop-filter: blur(18px);
    box-shadow: var(--shadow-lg);
    z-index: 2;
  }

  .image-frame::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 32px;
    padding: 1px;
    background: linear-gradient(150deg, rgba(76,201,240,0.45) 0%, transparent 45%, rgba(67,97,238,0.35) 100%);
    -webkit-mask: linear-gradient(#000,#000) content-box, linear-gradient(#000,#000);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(145deg, rgba(255,255,255,0.10), transparent 35%),
      linear-gradient(325deg, rgba(76,201,240,0.07), transparent 30%);
    pointer-events: none;
    z-index: 1;
    border-radius: 22px;
  }

  .profile-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 22px;
    transform: scale(1.02);
  }

  .accent-dot {
    position: absolute;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--c-mint), var(--c-cyan));
    box-shadow: 0 0 20px rgba(76,201,240,0.55);
    z-index: 3;
    animation: dotPulse 3s ease-in-out infinite;
  }

  .accent-dot.sm {
    width: 9px;
    height: 9px;
    animation-delay: 1s;
  }

  .float-card {
    position: absolute;
    z-index: 4;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 18px;
    border-radius: 18px;
    background: rgba(10, 20, 40, 0.75);
    border: 1px solid rgba(255,255,255,0.13);
    backdrop-filter: blur(20px);
    box-shadow: 0 16px 32px rgba(0,0,0,0.25);
    min-width: 190px;
  }

  .float-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 18px;
    padding: 1px;
    background: linear-gradient(120deg, rgba(76,201,240,0.35), transparent 60%);
    -webkit-mask: linear-gradient(#000,#000) content-box, linear-gradient(#000,#000);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .float-top {
    top: 6%;
    left: -14%;
    animation: floatCard 4.5s ease-in-out infinite;
  }

  .float-bottom {
    right: -14%;
    bottom: 10%;
    animation: floatCard 4.5s ease-in-out infinite 1.2s;
  }

  .float-icon {
    font-size: 1.4rem;
    line-height: 1;
  }

  .float-label {
    display: block;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--c-mint);
    margin-bottom: 3px;
    font-weight: 600;
  }

  .float-val {
    display: block;
    font-size: 0.88rem;
    color: var(--c-text);
    font-weight: 700;
  }

  .fade-up {
    opacity: 0;
    transform: translateY(28px);
    animation: fadeUp 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .fade-right {
    opacity: 0;
    transform: translateX(32px);
    animation: fadeInRight 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .d1 { animation-delay: 0.05s; }
  .d2 { animation-delay: 0.18s; }
  .d3 { animation-delay: 0.30s; }
  .d4 { animation-delay: 0.44s; }
  .d5 { animation-delay: 0.56s; }
  .d6 { animation-delay: 0.68s; }

  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInRight {
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes badgePulse {
    0%, 100% { box-shadow: 0 0 0 rgba(76,201,240,0); }
    50% { box-shadow: 0 0 0 5px rgba(76,201,240,0.06); }
  }

  @keyframes pulse-green {
    0%, 100% { box-shadow: 0 0 8px rgba(52,211,153,0.5); }
    50% { box-shadow: 0 0 18px rgba(52,211,153,0.9); }
  }

  @keyframes dotPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.25); opacity: 0.7; }
  }

  @keyframes glowPulse {
    from { opacity: 0.6; }
    to { opacity: 1; }
  }

  @keyframes ringRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes floatCard {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }

  @keyframes marqueeScroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @keyframes orbDrift1 {
    from { transform: translate(0, 0) scale(1); }
    to { transform: translate(60px, 40px) scale(1.1); }
  }

  @keyframes orbDrift2 {
    from { transform: translate(0, 0) scale(1); }
    to { transform: translate(-50px, -30px) scale(1.08); }
  }

  @keyframes orbDrift3 {
    from { transform: translate(-50%, -50%) scale(1); }
    to { transform: translate(-50%, -50%) scale(1.15); }
  }

  @media (max-width: 1200px) {
    .project-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 1100px) {
    .home-grid {
      grid-template-columns: 1fr;
    }

    .stats-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .float-top {
      left: -2%;
    }

    .float-bottom {
      right: -2%;
    }
  }

  @media (max-width: 768px) {
    .home-container {
      padding: 22px 16px 44px;
    }

    .left-card {
      padding: 24px 20px;
    }

    .badge-row {
      justify-content: center;
    }

    .hero-description {
      text-align: center;
    }

    .btn-row {
      flex-direction: column;
    }

    .btn-row .btn {
      width: 100%;
      justify-content: center;
    }

    .social-row {
      justify-content: center;
    }

    .image-container {
      width: min(100%, 300px);
      margin: 0 auto;
    }

    .timeline-top {
      flex-direction: column;
      align-items: flex-start;
    }

    .timeline-meta {
      align-items: flex-start;
    }
  }

  @media (max-width: 520px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }

    .float-top,
    .float-bottom {
      position: static;
      width: 100%;
      animation: none;
      margin-top: 10px;
    }

    .title-sep {
      display: none;
    }

    .timeline-item {
      grid-template-columns: 18px minmax(0, 1fr);
      gap: 12px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
    }

    .fade-up,
    .fade-right {
      opacity: 1 !important;
      transform: none !important;
    }

    .stat-card {
      opacity: 1 !important;
    }
  }
`;