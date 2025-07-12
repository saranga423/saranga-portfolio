import React, { useState, useEffect } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPaperPlane,
  FaCheckCircle,
} from 'react-icons/fa';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (status.success) {
      const timer = setTimeout(() => {
        setStatus({ loading: false, success: false, error: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status.success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters long';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendContactData = async (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() < 0.8 ? resolve('Success') : reject(new Error('Failed to send'));
      }, 1500);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: false, success: false, error: '' });
    if (!validateForm()) return;
    setStatus({ loading: true, success: false, error: '' });
    try {
      await sendContactData(formData);
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus({ loading: false, success: false, error: 'Oops! Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        {/* Header */}
        <div className="contact-header">
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">
            I'd love to hear from you! Whether you have a project in mind, want to collaborate, or just want to say hello, feel free to reach out.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Form */}
          <form
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <h2 className="form-heading">
              <FaPaperPlane className="icon-paper-plane" />
              Send Message
            </h2>

            {status.success && (
              <div
                className="form-status success"
                role="alert"
                aria-live="polite"
              >
                <FaCheckCircle className="icon-check" />
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
            )}

            {status.error && (
              <div
                className="form-status error"
                role="alert"
                aria-live="assertive"
              >
                <span>{status.error}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name" className="form-label">Your Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g., John Doe"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                required
              />
              {errors.name && <p id="name-error" className="input-error-text">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Your Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="e.g., john@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                required
              />
              {errors.email && <p id="email-error" className="input-error-text">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Your Message *</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project, idea, or just say hello..."
                rows="6"
                value={formData.message}
                onChange={handleChange}
                autoComplete="off"
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                required
              />
              {errors.message && <p id="message-error" className="input-error-text">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className={`form-submit ${status.loading ? 'loading' : ''}`}
            >
              {status.loading ? (
                <>
                  <div className="spinner"></div>
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane className="button-icon" />
                  Send Message
                </>
              )}
            </button>
          </form>

          {/* Social Links & Info */}
          <div className="contact-info">
            {/* Social Media */}
            <div className="social-section">
              <h3 className="section-title">Connect With Me</h3>
              <p className="section-desc">Follow me on social media or reach out directly through these platforms.</p>

              <div className="social-links">
                <a href="mailto:rasingollasaranga35@gmail.com" className="social-link email">
                  <div className="social-icon email-icon">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="social-label">Email</p>
                    <p className="social-subtext">rasingollasaranga35@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/saranga-rasingolla/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link linkedin"
                >
                  <div className="social-icon linkedin-icon">
                    <FaLinkedin />
                  </div>
                  <div>
                    <p className="social-label">LinkedIn</p>
                    <p className="social-subtext">Professional Network</p>
                  </div>
                </a>

                <a
                  href="https://github.com/saranga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link github"
                >
                  <div className="social-icon github-icon">
                    <FaGithub />
                  </div>
                  <div>
                    <p className="social-label">GitHub</p>
                    <p className="social-subtext">Code & Projects</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Info */}
            <div className="quick-info-section">
              <h3 className="section-title">Quick Info</h3>
              <div className="quick-info-list">
                <p>📍 <strong>Location:</strong> Available for remote work</p>
                <p>⚡ <strong>Response Time:</strong> Usually within 24 hours</p>
                <p>💼 <strong>Availability:</strong> Open to new opportunities</p>
                <p>🌟 <strong>Specialties:</strong> Full-stack development, React, Node.js</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
