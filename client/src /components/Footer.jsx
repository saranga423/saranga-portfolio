import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-brand">
          <h3 tabIndex="0">Saranga Rasingolla</h3>
          <p>Full Stack Developer | MERN</p>
        </div>

        <nav className="footer-links" aria-label="Footer main navigation">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <nav className="footer-socials" aria-label="Social media links">
          <a
            href="https://github.com/saranga423"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/saranga-rasingolla-2a6287249"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:rasingollasaranga35@gmail.com"
            aria-label="Send email to Saranga Rasingolla"
          >
            <FaEnvelope />
          </a>
        </nav>
      </div>

      <div className="footer-bottom">
        <p tabIndex="0">&copy; {year} Saranga Rasingolla. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
