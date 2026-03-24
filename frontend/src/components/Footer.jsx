import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaMedium,
  FaWhatsapp,
  FaArrowUp,
  FaHeart,
  FaPaperPlane,
  FaCode,
  FaBell,
} from 'react-icons/fa';

const Footer = ({
  author = 'Saranga Rasingolla',
  role = 'Software Engineer & Full Stack Developer',
  year = new Date().getFullYear(),
  email = 'rasingollasaranga35@gmail.com',
  location = 'Sri Lanka',
  socialLinks = {
    github: 'https://github.com/saranga423',
    linkedin: 'https://www.linkedin.com/in/saranga-rasingolla-2a6287249',
    medium: 'https://medium.com/@rasingollasaranga35',
    whatsapp: 'https://wa.me/94703572917',
  },
}) => {
  const [subscribeEmail, setSubscribeEmail] = useState('');

  const socialItems = [
    { key: 'github', href: socialLinks.github, label: 'GitHub', sub: 'Codebase', icon: <FaGithub />, color: '#f0f6fc' },
    { key: 'linkedin', href: socialLinks.linkedin, label: 'LinkedIn', sub: 'Network', icon: <FaLinkedin />, color: '#0077b5' },
    { key: 'twitter', href: socialLinks.twitter, label: 'Twitter', sub: 'Thoughts', icon: <FaTwitter />, color: '#1da1f2' },
    { key: 'medium', href: socialLinks.medium, label: 'Medium', sub: 'Blog', icon: <FaMedium />, color: '#ffc017' },
  ].filter((item) => item.href);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const styles = {
    footerWrap: {
      position: 'relative',
      padding: '80px 20px 40px',
      backgroundColor: '#030712',
      fontFamily: "'Inter', -apple-system, sans-serif",
      overflow: 'hidden',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
    },
    footerCard: {
      position: 'relative',
      padding: '60px 50px',
      borderRadius: '40px',
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(30px)',
      zIndex: 1,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr 0.8fr',
      gap: '50px',
      marginBottom: '60px',
    },
    title: {
      fontSize: '2.2rem',
      fontWeight: '800',
      color: '#fff',
      margin: '0 0 8px 0',
      letterSpacing: '-0.02em',
    },
    // Newsletter Specific Styles
    newsletterTitle: {
      fontSize: '1.1rem',
      fontWeight: '700',
      color: '#fff',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    inputGroup: {
      display: 'flex',
      background: 'rgba(255, 255, 255, 0.05)',
      padding: '6px',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: '15px',
    },
    input: {
      flex: 1,
      background: 'transparent',
      border: 'none',
      padding: '12px 16px',
      color: '#fff',
      fontSize: '0.9rem',
      outline: 'none',
    },
    subscribeBtn: {
      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: '0.3s',
    },
    ctaBox: {
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
      padding: '30px',
      borderRadius: '28px',
      border: '1px solid rgba(168, 85, 247, 0.2)',
      textAlign: 'center',
    }
  };

  return (
    <footer style={styles.footerWrap}>
      <style>
        {`
          .footer-social-card:hover { 
            background: rgba(255,255,255,0.08) !important; 
            transform: translateY(-5px);
          }
          .subscribe-btn:hover { 
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
            transform: scale(1.02);
          }
          .input-focus:focus-within {
            border-color: rgba(168, 85, 247, 0.5) !important;
            background: rgba(255, 255, 255, 0.08) !important;
          }
          @media (max-width: 1024px) {
            .footer-grid-responsive { grid-template-columns: 1fr !important; gap: 40px !important; }
            .footer-card-responsive { padding: 40px 25px !important; }
          }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.footerCard} className="footer-card-responsive">
          <div style={styles.grid} className="footer-grid-responsive">
            
            {/* Column 1: Info */}
            <div>
              <h2 style={styles.title}>{author}</h2>
              <div style={{ color: '#a855f7', fontWeight: '600', marginBottom: '20px' }}>{role}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {socialItems.map((item) => (
                  <a key={item.key} href={item.href} target="_blank" rel="noreferrer" 
                     style={{
                       width: '45px', height: '45px', borderRadius: '12px', 
                       display: 'flex', alignItems: 'center', justifyContent: 'center',
                       background: 'rgba(255,255,255,0.04)', color: item.color,
                       border: '1px solid rgba(255,255,255,0.05)', textDecoration: 'none'
                     }} className="footer-social-card">
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Newsletter */}
            <div>
              <div style={styles.newsletterTitle}>
                <FaBell style={{ color: '#a855f7' }} /> Join the Newsletter
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Get the latest articles and project updates delivered straight to your inbox. No spam, ever.
              </p>
              <div style={styles.inputGroup} className="input-focus">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  style={styles.input}
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                />
                <button style={styles.subscribeBtn} className="subscribe-btn">
                  Join
                </button>
              </div>
            </div>

            {/* Column 3: Contact CTA */}
            <div style={styles.ctaBox}>
              <h4 style={{ color: '#fff', margin: '0 0 10px' }}>Have a project?</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '20px' }}>
                I'm currently open to new opportunities and collaborations.
              </p>
              <a href={`mailto:${email}`} 
                 style={{ 
                   display: 'block', padding: '12px', background: '#fff', 
                   color: '#030712', borderRadius: '12px', textDecoration: 'none', 
                   fontWeight: '700', fontSize: '0.9rem'
                 }}>
                Let's Talk
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{ 
            paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
            flexWrap: 'wrap', gap: '20px' 
          }}>
            <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
              © {year} {author}. Built with React & <FaHeart style={{ color: '#ef4444' }} />
            </p>
            <button onClick={scrollToTop} style={{
              background: 'none', border: '1px solid rgba(255,255,255,0.1)', 
              color: '#94a3b8', padding: '8px 15px', borderRadius: '10px', 
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem'
            }}>
              Back to top <FaArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;