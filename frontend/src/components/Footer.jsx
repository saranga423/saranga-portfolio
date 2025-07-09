import React from 'react';
import PropTypes from 'prop-types';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'; 
import '../styles/Footer.css'; // Or Footer.module.css if using CSS Modules

const Footer = ({
  author = 'Saranga Rasingolla',
  year = new Date().getFullYear(),
  socialLinks = {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourprofile',
    twitter: 'https://twitter.com/yourhandle',
  },
  extraContent,
}) => {
  return (
    <footer className="footer" role="contentinfo" aria-label="Footer">
      <div className="footer-content">
        <p className="footer-text">
          &copy; {year} {author}. All rights reserved.
        </p>

        {extraContent && (
          <div className="footer-extra">
            {extraContent}
          </div>
        )}

        <nav aria-label="Social media links" className="footer-social">
          {socialLinks.github && (
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
          )}
          {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          )}
          {socialLinks.twitter && (
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
          )}
        </nav>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  author: PropTypes.string,
  year: PropTypes.number,
  socialLinks: PropTypes.shape({
    github: PropTypes.string,
    linkedin: PropTypes.string,
    twitter: PropTypes.string,
  }),
  extraContent: PropTypes.node,
};

export default Footer;
