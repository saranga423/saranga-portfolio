import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skills', path: '/skills' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isHome = useMemo(() => location.pathname === '/', [location.pathname]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        :root {
          --nav-text: #eef3ff;
          --nav-muted: #8fa0be;
          --nav-cyan: #4cc9f0;
          --nav-blue: #4361ee;
          --nav-mint: #72efdd;
          --nav-glass: rgba(10, 18, 34, 0.58);
          --nav-glass-strong: rgba(10, 18, 34, 0.82);
          --nav-border: rgba(255, 255, 255, 0.10);
          --nav-border-soft: rgba(255, 255, 255, 0.06);
          --nav-shadow: 0 18px 44px rgba(0, 0, 0, 0.28);
          --nav-radius: 22px;
          --nav-transition: 0.28s ease;
          --nav-font-head: 'Syne', sans-serif;
          --nav-font-body: 'DM Sans', sans-serif;
        }

        .premium-navbar-shell {
          position: sticky;
          top: 0;
          z-index: 1200;
          padding: 14px 20px 0;
          pointer-events: none;
        }

        .premium-navbar {
          max-width: 1320px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 14px 18px;
          border-radius: 24px;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          background: ${isHome ? 'var(--nav-glass)' : 'var(--nav-glass-strong)'};
          border: 1px solid var(--nav-border);
          box-shadow: ${scrolled ? '0 18px 50px rgba(0, 0, 0, 0.34)' : 'var(--nav-shadow)'};
          position: relative;
          overflow: hidden;
          pointer-events: auto;
          transition: transform var(--nav-transition), background var(--nav-transition), box-shadow var(--nav-transition), border var(--nav-transition);
        }

        .premium-navbar::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          padding: 1px;
          background: linear-gradient(
            120deg,
            rgba(76, 201, 240, 0.45) 0%,
            rgba(76, 201, 240, 0.04) 28%,
            rgba(67, 97, 238, 0.30) 68%,
            rgba(114, 239, 221, 0.28) 100%
          );
          -webkit-mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .premium-navbar::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(140deg, rgba(255,255,255,0.08), transparent 28%),
            linear-gradient(320deg, rgba(76,201,240,0.06), transparent 32%);
          pointer-events: none;
        }

        .premium-navbar.scrolled {
          transform: translateY(0);
          background: var(--nav-glass-strong);
          border-color: rgba(255,255,255,0.12);
        }

        .nav-brand {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          min-width: 0;
        }

        .nav-brand-mark {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--nav-font-head);
          font-size: 1rem;
          font-weight: 800;
          color: #fff;
          background: linear-gradient(135deg, var(--nav-blue), var(--nav-cyan));
          box-shadow:
            0 10px 24px rgba(67, 97, 238, 0.34),
            0 0 18px rgba(76, 201, 240, 0.16);
          flex-shrink: 0;
        }

        .nav-brand-copy {
          min-width: 0;
          display: flex;
          flex-direction: column;
          line-height: 1.05;
        }

        .nav-brand-name {
          font-family: var(--nav-font-head);
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--nav-text);
          white-space: nowrap;
        }

        .nav-brand-role {
          font-family: var(--nav-font-body);
          font-size: 0.76rem;
          font-weight: 500;
          color: var(--nav-muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-top: 4px;
          white-space: nowrap;
        }

        .nav-center {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px;
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--nav-border-soft);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          padding: 10px 14px;
          border-radius: 999px;
          color: var(--nav-muted);
          font-family: var(--nav-font-body);
          font-size: 0.92rem;
          font-weight: 600;
          transition: color var(--nav-transition), background var(--nav-transition), transform var(--nav-transition), box-shadow var(--nav-transition);
          white-space: nowrap;
        }

        .nav-link:hover {
          color: var(--nav-text);
          background: rgba(255,255,255,0.06);
          transform: translateY(-1px);
        }

        .nav-link.active {
          color: #fff;
          background: linear-gradient(135deg, rgba(67, 97, 238, 0.92), rgba(76, 201, 240, 0.88));
          box-shadow: 0 10px 24px rgba(67, 97, 238, 0.22);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 999px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.04));
          -webkit-mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .nav-actions {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-cta {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 16px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          font-family: var(--nav-font-body);
          font-size: 0.9rem;
          font-weight: 700;
          color: #fff;
          background: linear-gradient(135deg, var(--nav-blue), var(--nav-cyan));
          box-shadow: 0 10px 24px rgba(67, 97, 238, 0.28);
          transition: transform var(--nav-transition), box-shadow var(--nav-transition);
        }

        .nav-cta::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.14) 50%, transparent 100%);
          transform: translateX(-100%);
          transition: transform 0.55s ease;
        }

        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 30px rgba(67, 97, 238, 0.34);
        }

        .nav-cta:hover::after {
          transform: translateX(100%);
        }

        .nav-menu-btn {
          display: none;
          width: 46px;
          height: 46px;
          border-radius: 14px;
          border: 1px solid var(--nav-border);
          background: rgba(255,255,255,0.06);
          color: var(--nav-text);
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background var(--nav-transition), transform var(--nav-transition), border var(--nav-transition);
        }

        .nav-menu-btn:hover {
          background: rgba(255,255,255,0.10);
          border-color: rgba(76,201,240,0.28);
          transform: translateY(-1px);
        }

        .nav-menu-icon {
          width: 18px;
          height: 14px;
          position: relative;
        }

        .nav-menu-icon span {
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          border-radius: 999px;
          background: currentColor;
          transition: transform var(--nav-transition), opacity var(--nav-transition), top var(--nav-transition);
        }

        .nav-menu-icon span:nth-child(1) { top: 0; }
        .nav-menu-icon span:nth-child(2) { top: 6px; }
        .nav-menu-icon span:nth-child(3) { top: 12px; }

        .nav-menu-btn.open .nav-menu-icon span:nth-child(1) {
          top: 6px;
          transform: rotate(45deg);
        }

        .nav-menu-btn.open .nav-menu-icon span:nth-child(2) {
          opacity: 0;
        }

        .nav-menu-btn.open .nav-menu-icon span:nth-child(3) {
          top: 6px;
          transform: rotate(-45deg);
        }

        .nav-mobile-panel {
          display: none;
        }

        @media (max-width: 1024px) {
          .premium-navbar-shell {
            padding: 12px 14px 0;
          }

          .premium-navbar {
            padding: 12px 14px;
            gap: 14px;
          }

          .nav-center {
            display: none;
          }

          .nav-actions .nav-cta {
            display: none;
          }

          .nav-menu-btn {
            display: inline-flex;
            position: relative;
            z-index: 3;
          }

          .nav-mobile-panel {
            display: block;
            position: absolute;
            top: calc(100% + 10px);
            left: 0;
            right: 0;
            padding: 10px;
            border-radius: 22px;
            background: rgba(10, 18, 34, 0.92);
            border: 1px solid var(--nav-border);
            box-shadow: 0 20px 40px rgba(0,0,0,0.28);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            opacity: 0;
            transform: translateY(-8px);
            pointer-events: none;
            transition: opacity var(--nav-transition), transform var(--nav-transition);
          }

          .nav-mobile-panel.open {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }

          .nav-mobile-list {
            display: grid;
            gap: 8px;
          }

          .nav-mobile-link {
            display: flex;
            align-items: center;
            justify-content: space-between;
            text-decoration: none;
            padding: 13px 14px;
            border-radius: 16px;
            color: var(--nav-muted);
            font-family: var(--nav-font-body);
            font-size: 0.95rem;
            font-weight: 600;
            background: rgba(255,255,255,0.03);
            border: 1px solid transparent;
            transition: background var(--nav-transition), border var(--nav-transition), color var(--nav-transition), transform var(--nav-transition);
          }

          .nav-mobile-link:hover {
            color: var(--nav-text);
            background: rgba(255,255,255,0.07);
            border-color: rgba(76,201,240,0.16);
            transform: translateY(-1px);
          }

          .nav-mobile-link.active {
            color: #fff;
            background: linear-gradient(135deg, rgba(67,97,238,0.92), rgba(76,201,240,0.82));
            border-color: rgba(255,255,255,0.10);
          }

          .nav-mobile-footer {
            margin-top: 10px;
            display: grid;
          }

          .nav-mobile-cta {
            position: relative;
            overflow: hidden;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 13px 16px;
            border-radius: 16px;
            border: none;
            cursor: pointer;
            font-family: var(--nav-font-body);
            font-size: 0.92rem;
            font-weight: 700;
            color: #fff;
            background: linear-gradient(135deg, var(--nav-blue), var(--nav-cyan));
            box-shadow: 0 10px 24px rgba(67, 97, 238, 0.28);
          }
        }

        @media (max-width: 640px) {
          .premium-navbar-shell {
            padding: 10px 10px 0;
          }

          .premium-navbar {
            border-radius: 20px;
            padding: 12px;
          }

          .nav-brand-copy {
            max-width: 140px;
          }

          .nav-brand-name {
            font-size: 0.94rem;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .nav-brand-role {
            font-size: 0.72rem;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .nav-brand-mark {
            width: 40px;
            height: 40px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .premium-navbar,
          .nav-link,
          .nav-cta,
          .nav-menu-btn,
          .nav-mobile-link,
          .nav-mobile-panel,
          .nav-menu-icon span {
            transition: none !important;
          }

          .nav-cta::after {
            display: none !important;
          }
        }
      `}</style>

      <div className="premium-navbar-shell">
        <header className={`premium-navbar ${scrolled ? 'scrolled' : ''}`}>
          <Link to="/" className="nav-brand" aria-label="Go to home">
            <span className="nav-brand-mark">SR</span>
            <span className="nav-brand-copy">
              <span className="nav-brand-name">Saranga Rasingolla</span>
              <span className="nav-brand-role">Software Engineer</span>
            </span>
          </Link>

          <nav className="nav-center" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="nav-cta"
              onClick={() => {
                const section = document.getElementById('contact') || null;
                if (location.pathname === '/' && section) {
                  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  window.location.href = '/contact';
                }
              }}
            >
              Let’s Talk
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </button>

            <button
              type="button"
              className={`nav-menu-btn ${menuOpen ? 'open' : ''}`}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className="nav-menu-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>

          <div className={`nav-mobile-panel ${menuOpen ? 'open' : ''}`}>
            <nav className="nav-mobile-list" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) => `nav-mobile-link ${isActive ? 'active' : ''}`}
                >
                  <span>{item.label}</span>
                  <span>↗</span>
                </NavLink>
              ))}
            </nav>

            <div className="nav-mobile-footer">
              <button
                type="button"
                className="nav-mobile-cta"
                onClick={() => {
                  setMenuOpen(false);
                  window.location.href = '/contact';
                }}
              >
                Let’s Talk
              </button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;