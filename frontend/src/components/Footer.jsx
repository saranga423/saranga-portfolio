import React from 'react';
import PropTypes from 'prop-types';
import { FaGithub, FaLinkedin, FaTwitter, FaMedium, FaWhatsapp } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = ({
  author = 'Saranga Rasingolla',
  year = new Date().getFullYear(),
  socialLinks = {
    github: 'https://github.com/saranga',
    linkedin: 'https://www.linkedin.com/in/saranga-rasingolla-2a6287249?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BFMdnLvQQROOf5t2nxvll6A%3D%3D',
    
    medium: 'https://medium.com/@rasingollasaranga35',
    whatsapp: 'https://wa.me/94703572917',
  },
  extraContent,
}) => {
  return (
    <footer className="footer" role="contentinfo" aria-label="Site footer">
      <div className="footer-content">
        <p className="footer-text">&copy; {year} {author}. All rights reserved.</p>

        <nav className="footer-social" aria-label="Social media">
          {socialLinks.github && (
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <FaGithub />
            </a>
          )}
          {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
              <FaLinkedin />
            </a>
          )}
          {socialLinks.twitter && (
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile">
              <FaTwitter />
            </a>
          )}
          {socialLinks.medium && (
            <a href={socialLinks.medium} target="_blank" rel="noopener noreferrer" aria-label="Medium Profile">
              <FaMedium />
            </a>
          )}
          {socialLinks.whatsapp && (
            <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Contact">
              <FaWhatsapp />
            </a>
          )}
        </nav>

        {extraContent && (
          <div className="footer-extra">{extraContent}</div>
        )}
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
    medium: PropTypes.string,
    whatsapp: PropTypes.string,
  }),
  extraContent: PropTypes.node,
};

export default Footer;
