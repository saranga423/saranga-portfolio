import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

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

// Profile Image
import profileImage from '../assets/pic.jpg';

const Home = () => {
  const navigate = useNavigate();

  // Tech stack logos array
  const techLogos = [
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

  return (
    <div className="home-container">
      <section className="home-section">
        <div className="home-content">
          {/* Left Side */}
          <div className="home-left">
            {/* Intro */}
            <div className="intro-section">
              <p className="intro-greeting">Hello, my name is</p>
              <h1 className="intro-name">Saranga Rasingolla</h1>
              <h2 className="intro-title">
                Full Stack Developer | UI/UX Enthusiast | Software Engineer
              </h2>
            </div>

            {/* Description */}
            <p className="intro-description">
              I craft scalable, responsive, and user-focused web applications using the MERN stack and Spring Boot.
              With a strong eye for design and a problem-solving mindset, I aim to bridge functionality with clean UI.
            </p>

            {/* Buttons */}
            <div className="button-container">
              <button onClick={() => navigate('/contact')} className="btn-primary">
                Get In Touch
              </button>
              <button onClick={() => navigate('/services')} className="btn-secondary">
                View My Services
              </button>
            </div>

            {/* Tech Stack */}
            <div className="tech-stack">
              <span className="stack-title">Tech Stack:</span>
              <ul className="stack-icons">
                {techLogos.map((logo, idx) => (
                  <li key={idx}>
                    <img src={logo.src} alt={logo.alt} />
                  </li>
                ))}
              </ul>
            </div>

            {/* About Me */}
            <section className="about-section">
              <h3>About Me</h3>
              <p>
                I am a passionate software engineer specializing in full-stack development.
                I enjoy building applications that solve real-world problems while focusing on user-friendly
                designs and optimal performance.
              </p>
            </section>
          </div>

          {/* Right Side */}
          <div className="home-right">
            <div className="image-container">
              <div className="image-glow"></div>
              <div className="image-frame">
                <div className="image-overlay"></div>
                <div className="image-placeholder">
                  <img
                    src={profileImage}
                    alt="Saranga Rasingolla"
                    className="profile-image"
                  />
                </div>
              </div>
              <div className="decorative-dot-1"></div>
              <div className="decorative-dot-2"></div>
              <div className="decorative-dot-3"></div>
              <div className="decorative-dot-4"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;