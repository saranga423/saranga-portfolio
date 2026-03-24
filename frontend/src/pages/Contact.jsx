import React, { useEffect, useMemo, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPaperPlane,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaClock,
  FaLaptopCode,
  FaBriefcase,
  FaArrowRight,
} from 'react-icons/fa';

const Contact = () => {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: '',
  });

  const [errors, setErrors] = useState({});
  const [activeField, setActiveField] = useState('');

  useEffect(() => {
    if (status.success) {
      const timer = setTimeout(() => {
        setStatus({ loading: false, success: false, error: '' });
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [status.success]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.from_name.trim()) {
      nextErrors.from_name = 'Name is required';
    } else if (formData.from_name.trim().length < 2) {
      nextErrors.from_name = 'Name must be at least 2 characters';
    }

    if (!formData.from_email.trim()) {
      nextErrors.from_email = 'Email is required';
    } else if (!validateEmail(formData.from_email)) {
      nextErrors.from_email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      nextErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      nextErrors.subject = 'Subject must be at least 3 characters';
    }

    if (!formData.message.trim()) {
      nextErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      nextErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }

    if (status.error) {
      setStatus((prev) => ({
        ...prev,
        error: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      loading: false,
      success: false,
      error: '',
    });

    if (!validateForm()) return;
    if (!formRef.current) return;

    setStatus({
      loading: true,
      success: false,
      error: '',
    });

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      setStatus({
        loading: false,
        success: true,
        error: '',
      });

      setFormData({
        from_name: '',
        from_email: '',
        subject: '',
        message: '',
      });

      setErrors({});
    } catch (error) {
      console.error('EmailJS error:', error);

      setStatus({
        loading: false,
        success: false,
        error: 'Message could not be sent. Please try again in a moment.',
      });
    }
  };

  const contactCards = useMemo(
    () => [
      {
        title: 'Email',
        subtitle: 'rasingollasaranga35@gmail.com',
        href: 'mailto:rasingollasaranga35@gmail.com',
        icon: <FaEnvelope />,
        accent: '#4cc9f0',
      },
      {
        title: 'LinkedIn',
        subtitle: 'Professional Network',
        href: 'https://www.linkedin.com/in/saranga-rasingolla/',
        icon: <FaLinkedin />,
        accent: '#4361ee',
      },
      {
        title: 'GitHub',
        subtitle: 'Code & Projects',
        href: 'https://github.com/saranga423',
        icon: <FaGithub />,
        accent: '#72efdd',
      },
    ],
    []
  );

  const quickInfo = useMemo(
    () => [
      {
        label: 'Location',
        value: 'Available for remote work',
        icon: <FaMapMarkerAlt />,
      },
      {
        label: 'Response Time',
        value: 'Usually within 24 hours',
        icon: <FaClock />,
      },
      {
        label: 'Availability',
        value: 'Open to new opportunities',
        icon: <FaBriefcase />,
      },
      {
        label: 'Specialties',
        value: 'Full-stack development, React, Node.js',
        icon: <FaLaptopCode />,
      },
    ],
    []
  );

  const styles = {
    page: {
      minHeight: '100vh',
      padding: '36px 16px 64px',
      background: `
        radial-gradient(circle at top left, rgba(76, 201, 240, 0.16), transparent 26%),
        radial-gradient(circle at 85% 20%, rgba(67, 97, 238, 0.18), transparent 24%),
        radial-gradient(circle at 50% 100%, rgba(114, 239, 221, 0.12), transparent 28%),
        linear-gradient(135deg, #07111f, #0b1f3a, #132b52)
      `,
      backgroundAttachment: 'fixed',
      color: '#f8fbff',
      fontFamily:
        'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      position: 'relative',
      overflow: 'hidden',
    },
    blurA: {
      position: 'absolute',
      top: '20px',
      left: '-60px',
      width: '260px',
      height: '260px',
      borderRadius: '999px',
      background: 'rgba(76, 201, 240, 0.15)',
      filter: 'blur(80px)',
      pointerEvents: 'none',
    },
    blurB: {
      position: 'absolute',
      right: '-80px',
      bottom: '0',
      width: '320px',
      height: '320px',
      borderRadius: '999px',
      background: 'rgba(67, 97, 238, 0.15)',
      filter: 'blur(100px)',
      pointerEvents: 'none',
    },
    container: {
      maxWidth: '1320px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 1,
    },
    heroCard: {
      position: 'relative',
      padding: '32px',
      borderRadius: '30px',
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.14)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
      overflow: 'hidden',
      marginBottom: '24px',
    },
    heroOverlay: {
      position: 'absolute',
      inset: 0,
      background:
        'linear-gradient(135deg, rgba(255,255,255,0.08), transparent 30%), linear-gradient(315deg, rgba(255,255,255,0.04), transparent 35%)',
      pointerEvents: 'none',
    },
    heroContent: {
      position: 'relative',
      zIndex: 1,
    },
    badgeRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      marginBottom: '18px',
    },
    pill: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 14px',
      borderRadius: '999px',
      background: 'rgba(255,255,255,0.07)',
      border: '1px solid rgba(255,255,255,0.12)',
      fontSize: '0.88rem',
      fontWeight: 600,
    },
    pillDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #72efdd, #4cc9f0)',
      boxShadow: '0 0 12px rgba(76, 201, 240, 0.5)',
    },
    title: {
      margin: '0 0 10px',
      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
      lineHeight: 1.05,
      fontWeight: 800,
      letterSpacing: '-1px',
    },
    subtitle: {
      margin: 0,
      maxWidth: '760px',
      color: '#b8c4d6',
      fontSize: '1.02rem',
      lineHeight: 1.85,
    },
    topStats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      gap: '16px',
      marginTop: '24px',
    },
    statCard: {
      padding: '18px',
      borderRadius: '22px',
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 10px 28px rgba(0,0,0,0.16)',
    },
    statValue: {
      margin: '0 0 6px',
      fontSize: '1.5rem',
      fontWeight: 800,
      color: '#4cc9f0',
    },
    statLabel: {
      margin: 0,
      color: '#b8c4d6',
      fontSize: '0.94rem',
      lineHeight: 1.5,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1.1fr) minmax(340px, 0.9fr)',
      gap: '24px',
      alignItems: 'start',
    },
    formCard: {
      padding: '28px',
      borderRadius: '28px',
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.12)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      boxShadow: '0 18px 40px rgba(0,0,0,0.2)',
    },
    sectionHeadingRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '10px',
    },
    sectionHeadingIcon: {
      width: '42px',
      height: '42px',
      borderRadius: '14px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, rgba(67,97,238,0.22), rgba(76,201,240,0.18))',
      border: '1px solid rgba(76,201,240,0.22)',
      color: '#4cc9f0',
      fontSize: '1rem',
      flexShrink: 0,
    },
    sectionHeading: {
      margin: 0,
      fontSize: '1.2rem',
      fontWeight: 800,
    },
    sectionSubtext: {
      margin: '0 0 22px',
      color: '#b8c4d6',
      fontSize: '0.95rem',
      lineHeight: 1.75,
    },
    statusBoxSuccess: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '14px 16px',
      borderRadius: '16px',
      marginBottom: '18px',
      background: 'rgba(52, 211, 153, 0.12)',
      border: '1px solid rgba(52, 211, 153, 0.22)',
      color: '#baf8e5',
    },
    statusBoxError: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '14px 16px',
      borderRadius: '16px',
      marginBottom: '18px',
      background: 'rgba(239, 68, 68, 0.12)',
      border: '1px solid rgba(239, 68, 68, 0.22)',
      color: '#fecaca',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: '16px',
    },
    fullWidth: {
      gridColumn: '1 / -1',
    },
    fieldWrap: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    label: {
      fontSize: '0.92rem',
      fontWeight: 700,
      color: '#e8f5ff',
    },
    input: (hasError, isActive) => ({
      width: '100%',
      boxSizing: 'border-box',
      padding: '14px 16px',
      borderRadius: '16px',
      border: hasError
        ? '1px solid rgba(239,68,68,0.45)'
        : isActive
        ? '1px solid rgba(76,201,240,0.35)'
        : '1px solid rgba(255,255,255,0.14)',
      background: isActive ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.06)',
      color: '#f8fbff',
      outline: 'none',
      fontSize: '0.96rem',
      transition: 'all 0.25s ease',
      boxShadow: isActive ? '0 0 0 4px rgba(76,201,240,0.08)' : 'none',
    }),
    textarea: (hasError, isActive) => ({
      width: '100%',
      boxSizing: 'border-box',
      padding: '14px 16px',
      borderRadius: '16px',
      border: hasError
        ? '1px solid rgba(239,68,68,0.45)'
        : isActive
        ? '1px solid rgba(76,201,240,0.35)'
        : '1px solid rgba(255,255,255,0.14)',
      background: isActive ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.06)',
      color: '#f8fbff',
      outline: 'none',
      fontSize: '0.96rem',
      resize: 'vertical',
      minHeight: '150px',
      transition: 'all 0.25s ease',
      boxShadow: isActive ? '0 0 0 4px rgba(76,201,240,0.08)' : 'none',
    }),
    errorText: {
      margin: 0,
      color: '#fca5a5',
      fontSize: '0.84rem',
      lineHeight: 1.5,
    },
    submitWrap: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '14px',
      marginTop: '8px',
      flexWrap: 'wrap',
    },
    submitHint: {
      margin: 0,
      color: '#b8c4d6',
      fontSize: '0.9rem',
      lineHeight: 1.7,
    },
    submitBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      minWidth: '180px',
      padding: '14px 20px',
      borderRadius: '16px',
      border: '1px solid rgba(76,201,240,0.22)',
      background: 'linear-gradient(135deg, #4361ee, #4cc9f0)',
      color: '#fff',
      fontWeight: 800,
      fontSize: '0.95rem',
      cursor: status.loading ? 'not-allowed' : 'pointer',
      opacity: status.loading ? 0.8 : 1,
      boxShadow: '0 14px 28px rgba(67, 97, 238, 0.28)',
    },
    sidebar: {
      display: 'grid',
      gap: '18px',
    },
    infoCard: {
      padding: '24px',
      borderRadius: '26px',
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.12)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      boxShadow: '0 18px 40px rgba(0,0,0,0.2)',
    },
    socialGrid: {
      display: 'grid',
      gap: '14px',
      marginTop: '16px',
    },
    socialCard: (accent) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '16px',
      borderRadius: '18px',
      textDecoration: 'none',
      color: '#f8fbff',
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.12)',
      boxShadow: '0 10px 24px rgba(0,0,0,0.14)',
      position: 'relative',
      overflow: 'hidden',
      '--accent': accent,
    }),
    socialIconWrap: (accent) => ({
      width: '46px',
      height: '46px',
      borderRadius: '16px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${accent}33, ${accent}18)`,
      border: `1px solid ${accent}55`,
      color: accent,
      flexShrink: 0,
      fontSize: '1rem',
    }),
    socialTextWrap: {
      minWidth: 0,
      flex: 1,
    },
    socialTitle: {
      margin: '0 0 4px',
      fontSize: '0.96rem',
      fontWeight: 800,
    },
    socialSubtitle: {
      margin: 0,
      color: '#b8c4d6',
      fontSize: '0.9rem',
      lineHeight: 1.6,
      wordBreak: 'break-word',
    },
    arrowWrap: {
      color: '#dff8ff',
      fontSize: '0.9rem',
      flexShrink: 0,
    },
    quickInfoGrid: {
      display: 'grid',
      gap: '12px',
      marginTop: '16px',
    },
    quickInfoItem: {
      display: 'grid',
      gridTemplateColumns: '42px minmax(0, 1fr)',
      gap: '12px',
      alignItems: 'start',
      padding: '14px',
      borderRadius: '18px',
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.12)',
    },
    quickInfoIcon: {
      width: '42px',
      height: '42px',
      borderRadius: '14px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, rgba(67,97,238,0.22), rgba(76,201,240,0.18))',
      border: '1px solid rgba(76,201,240,0.22)',
      color: '#4cc9f0',
      fontSize: '0.95rem',
    },
    quickInfoLabel: {
      margin: '0 0 4px',
      fontSize: '0.92rem',
      fontWeight: 800,
    },
    quickInfoValue: {
      margin: 0,
      color: '#b8c4d6',
      fontSize: '0.9rem',
      lineHeight: 1.7,
    },
    availabilityCard: {
      padding: '22px',
      borderRadius: '24px',
      background:
        'linear-gradient(135deg, rgba(67,97,238,0.16), rgba(76,201,240,0.12))',
      border: '1px solid rgba(76,201,240,0.18)',
      boxShadow: '0 16px 30px rgba(67, 97, 238, 0.16)',
    },
    availabilityRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '10px',
    },
    availabilityDotWrap: {
      width: '14px',
      height: '14px',
      borderRadius: '50%',
      background: 'rgba(52,211,153,0.15)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    availabilityDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#34d399',
      boxShadow: '0 0 12px rgba(52,211,153,0.55)',
    },
    availabilityTitle: {
      margin: 0,
      fontSize: '1rem',
      fontWeight: 800,
    },
    availabilityText: {
      margin: 0,
      color: '#d8efff',
      lineHeight: 1.8,
      fontSize: '0.92rem',
    },
    spinner: {
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      border: '2px solid rgba(255,255,255,0.35)',
      borderTopColor: '#ffffff',
      animation: 'contactSpin 0.8s linear infinite',
    },
  };

  return (
    <section style={styles.page} id="contact">
      <style>
        {`
          @keyframes contactSpin {
            to { transform: rotate(360deg); }
          }

          .contact-hover {
            transition: transform 0.28s ease, box-shadow 0.28s ease, border 0.28s ease, background 0.28s ease;
          }

          .contact-hover:hover {
            transform: translateY(-5px);
          }

          .contact-card-hover:hover {
            box-shadow: 0 24px 50px rgba(76, 201, 240, 0.12);
            border-color: rgba(76, 201, 240, 0.22);
          }

          .contact-social-hover:hover {
            border-color: rgba(76, 201, 240, 0.24);
            box-shadow: 0 18px 32px rgba(76, 201, 240, 0.12);
          }

          .contact-submit-hover:hover {
            transform: translateY(-3px);
            box-shadow: 0 18px 34px rgba(67, 97, 238, 0.34);
          }

          .contact-fade-up {
            opacity: 0;
            transform: translateY(22px);
            animation: contactFadeUp 0.7s ease forwards;
          }

          .contact-delay-1 { animation-delay: 0.05s; }
          .contact-delay-2 { animation-delay: 0.12s; }
          .contact-delay-3 { animation-delay: 0.2s; }

          @keyframes contactFadeUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          input::placeholder,
          textarea::placeholder {
            color: #8fa4be;
          }

          @media (max-width: 1100px) {
            .contact-top-stats,
            .contact-main-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 768px) {
            .contact-page-padding {
              padding: 22px 12px 40px !important;
            }

            .contact-hero-card,
            .contact-form-card,
            .contact-info-card {
              padding: 20px !important;
            }

            .contact-form-grid {
              grid-template-columns: 1fr !important;
            }

            .contact-submit-wrap {
              flex-direction: column !important;
              align-items: stretch !important;
            }

            .contact-submit-wrap button {
              width: 100% !important;
            }
          }
        `}
      </style>

      <div style={styles.blurA} />
      <div style={styles.blurB} />

      <div style={styles.container} className="contact-page-padding">
        <div
          style={styles.heroCard}
          className="contact-fade-up contact-delay-1 contact-hero-card"
        >
          <div style={styles.heroOverlay} />
          <div style={styles.heroContent}>
            <div style={styles.badgeRow}>
              <div style={styles.pill}>
                <span style={styles.pillDot} />
                Let’s Connect
              </div>
              <div style={styles.pill}>
                <FaPaperPlane />
                Open for opportunities
              </div>
            </div>

            <h1 style={styles.title}>Get In Touch</h1>
            <p style={styles.subtitle}>
              I would love to hear from you. Whether you have a project idea, an internship or
              job opportunity, a collaboration request, or just want to say hello, feel free to
              reach out through the form or connect with me directly.
            </p>

            <div style={styles.topStats} className="contact-top-stats">
              <div style={styles.statCard} className="contact-hover contact-card-hover">
                <p style={styles.statValue}>24h</p>
                <p style={styles.statLabel}>Typical response window</p>
              </div>
              <div style={styles.statCard} className="contact-hover contact-card-hover">
                <p style={styles.statValue}>Remote</p>
                <p style={styles.statLabel}>Available for flexible collaboration</p>
              </div>
              <div style={styles.statCard} className="contact-hover contact-card-hover">
                <p style={styles.statValue}>Full Stack</p>
                <p style={styles.statLabel}>Focused on modern web solutions</p>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.grid} className="contact-main-grid">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            style={styles.formCard}
            className="contact-fade-up contact-delay-2 contact-form-card"
          >
            <div style={styles.sectionHeadingRow}>
              <div style={styles.sectionHeadingIcon}>
                <FaPaperPlane />
              </div>
              <h2 style={styles.sectionHeading}>Send a Message</h2>
            </div>

            <p style={styles.sectionSubtext}>
              Fill out the form below and I will get back to you as soon as possible.
            </p>

            {status.success && (
              <div style={styles.statusBoxSuccess} role="alert" aria-live="polite">
                <FaCheckCircle />
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
            )}

            {status.error && (
              <div style={styles.statusBoxError} role="alert" aria-live="assertive">
                <span>{status.error}</span>
              </div>
            )}

            <div style={styles.formGrid} className="contact-form-grid">
              <div style={styles.fieldWrap}>
                <label htmlFor="from_name" style={styles.label}>Your Name *</label>
                <input
                  id="from_name"
                  name="from_name"
                  type="text"
                  value={formData.from_name}
                  onChange={handleChange}
                  onFocus={() => setActiveField('from_name')}
                  onBlur={() => setActiveField('')}
                  placeholder="e.g., John Doe"
                  autoComplete="name"
                  style={styles.input(!!errors.from_name, activeField === 'from_name')}
                />
                {errors.from_name && <p style={styles.errorText}>{errors.from_name}</p>}
              </div>

              <div style={styles.fieldWrap}>
                <label htmlFor="from_email" style={styles.label}>Your Email *</label>
                <input
                  id="from_email"
                  name="from_email"
                  type="email"
                  value={formData.from_email}
                  onChange={handleChange}
                  onFocus={() => setActiveField('from_email')}
                  onBlur={() => setActiveField('')}
                  placeholder="e.g., john@example.com"
                  autoComplete="email"
                  style={styles.input(!!errors.from_email, activeField === 'from_email')}
                />
                {errors.from_email && <p style={styles.errorText}>{errors.from_email}</p>}
              </div>

              <div style={{ ...styles.fieldWrap, ...styles.fullWidth }}>
                <label htmlFor="subject" style={styles.label}>Subject *</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setActiveField('subject')}
                  onBlur={() => setActiveField('')}
                  placeholder="e.g., Internship opportunity"
                  style={styles.input(!!errors.subject, activeField === 'subject')}
                />
                {errors.subject && <p style={styles.errorText}>{errors.subject}</p>}
              </div>

              <div style={{ ...styles.fieldWrap, ...styles.fullWidth }}>
                <label htmlFor="message" style={styles.label}>Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setActiveField('message')}
                  onBlur={() => setActiveField('')}
                  placeholder="Tell me about your project, collaboration request, or opportunity..."
                  style={styles.textarea(!!errors.message, activeField === 'message')}
                />
                {errors.message && <p style={styles.errorText}>{errors.message}</p>}
              </div>
            </div>

            <div style={styles.submitWrap} className="contact-submit-wrap">
              <p style={styles.submitHint}>
                This form is connected with EmailJS. Make sure your service ID, template ID, and public key are set.
              </p>

              <button
                type="submit"
                disabled={status.loading}
                style={styles.submitBtn}
                className="contact-hover contact-submit-hover"
              >
                {status.loading ? (
                  <>
                    <span style={styles.spinner} />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>

          <div style={styles.sidebar} className="contact-fade-up contact-delay-3">
            <div style={styles.infoCard} className="contact-info-card">
              <div style={styles.sectionHeadingRow}>
                <div style={styles.sectionHeadingIcon}>
                  <FaEnvelope />
                </div>
                <h3 style={styles.sectionHeading}>Connect With Me</h3>
              </div>

              <p style={styles.sectionSubtext}>
                Reach out directly through email or explore my professional profiles and code repositories.
              </p>

              <div style={styles.socialGrid}>
                {contactCards.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={styles.socialCard(item.accent)}
                    className="contact-hover contact-social-hover"
                  >
                    <div style={styles.socialIconWrap(item.accent)}>{item.icon}</div>
                    <div style={styles.socialTextWrap}>
                      <p style={styles.socialTitle}>{item.title}</p>
                      <p style={styles.socialSubtitle}>{item.subtitle}</p>
                    </div>
                    <div style={styles.arrowWrap}>
                      <FaArrowRight />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div style={styles.infoCard} className="contact-info-card">
              <div style={styles.sectionHeadingRow}>
                <div style={styles.sectionHeadingIcon}>
                  <FaLaptopCode />
                </div>
                <h3 style={styles.sectionHeading}>Quick Info</h3>
              </div>

              <div style={styles.quickInfoGrid}>
                {quickInfo.map((item) => (
                  <div
                    key={item.label}
                    style={styles.quickInfoItem}
                    className="contact-hover contact-card-hover"
                  >
                    <div style={styles.quickInfoIcon}>{item.icon}</div>
                    <div>
                      <p style={styles.quickInfoLabel}>{item.label}</p>
                      <p style={styles.quickInfoValue}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={styles.availabilityCard}
              className="contact-hover contact-card-hover contact-info-card"
            >
              <div style={styles.availabilityRow}>
                <div style={styles.availabilityDotWrap}>
                  <div style={styles.availabilityDot} />
                </div>
                <h3 style={styles.availabilityTitle}>Currently Available</h3>
              </div>

              <p style={styles.availabilityText}>
                I am open to internships, freelance opportunities, project collaborations, and software engineering roles focused on modern frontend or full-stack development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;