import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setStatus({ loading: true, success: false });

    setTimeout(() => {
      setStatus({ loading: false, success: true });
      alert(` Thank you, ${formData.name}! Your message has been sent.`);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <motion.section
      className="contact-section"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="contact-title"> Contact Me</h2>
      <p className="contact-subtext">
        Feel free to reach out via this form or connect with me on social media.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Your Name</label>
        <input
          name="name"
          type="text"
          placeholder="e.g., John Doe"
          value={formData.name}
          onChange={handleChange}
          required
          className="contact-input"
        />

        <label htmlFor="email">Your Email</label>
        <input
          name="email"
          type="email"
          placeholder="e.g., john@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="contact-input"
        />

        <label htmlFor="message">Your Message</label>
        <textarea
          name="message"
          placeholder="Type your message here..."
          rows="6"
          value={formData.message}
          onChange={handleChange}
          required
          className="contact-textarea"
        />

        <button type="submit" className="contact-button" disabled={status.loading}>
          {status.loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <div className="contact-socials">
        <p>Or reach me on:</p>
        <div className="social-icons">
  <a href="mailto:rasingollasaranga35@gmail.com" target="_blank" rel="noreferrer">
    <FaEnvelope className="icon" /> Gmail
  </a>
  <a href="https://www.linkedin.com/in/saranga-rasingolla/" target="_blank" rel="noreferrer">
    <FaLinkedin className="icon" /> LinkedIn
  </a>
  <a href="https://github.com/saranga" target="_blank" rel="noreferrer">
    <FaGithub className="icon" /> GitHub
  </a>
</div>
      </div>
    </motion.section>
  );
};

export default Contact;
