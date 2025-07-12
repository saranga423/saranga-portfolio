import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import '../styles/About.css'; 
import { ThemeContext } from '../contexts/ThemeContext';

const About = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { isDarkMode } = useContext(ThemeContext);

  // State for message box
  const [showMessage, setShowMessage] = useState(false);

  const tabData = {
    overview: { title: 'Overview', icon: '' }, 
    education: { title: 'Education', icon: '' },
    experience: { title: 'Experience', icon: '' },
    achievements: { title: 'Achievements', icon: '' },
  };

  // Data for each section
  const educationData = [
    {
      degree: "BSc (Hons) in Information Technology",
      institution: "Sri Lanka Institute of Information Technology (SLIIT)",
      period: "2022 – Present",
      status: "Final Year",
      highlights: ["MERN Stack Development", "Java/Spring Boot", "Agile Methodologies"],
      link: "https://www.sliit.lk/"
    },
    {
      degree: "Full Stack Developer Program",
      institution: "University of Moratuwa (Open Learning)",
      period: "2022",
      status: "Completed",
      highlights: ["React, Node.js, Express", "Database Design", "Git & Deployment"],
      link: "https://open.uom.lk/"
    },
    {
      degree: "G.C.E. Advanced Level (Biology Stream)",
      institution: "Mahamaya Girls' College Kandy",
      period: "2020",
      status: "Completed",
      results: "Biology, Physics, Chemistry",
      highlights: ["Science Stream", "Leadership in Science Club"],
      link: "https://mahamayagirlscollege.lk/"
    }
  ];

  const experienceData = [
    {
      role: "Software Engineering Intern",
      company: "DMS Software Technologies (Pvt) Ltd",
      period: "Jul 2024 – Jan 2025",
      location: "Colombo 00700, Sri Lanka",
      type: "Internship",
      description: "Contributed to enterprise-grade platforms for railway systems.",
      achievements: [
        
        "Contributed to enterprise-level software solutions using Oracle technologies, including Oracle Forms, Oracle Reports, and PL/SQL.",
        "Participated in requirements gathering sessions and UI/UX design reviews to align development with client expectations.",
        "Developed and maintained backend modules for inventory and procurement management systems.",
        "Gained hands-on experience in the full Software Development Life Cycle (SDLC), from analysis to deployment.",
        "Prepared technical documentation and engaged in knowledge transfer sessions to support team collaboration and long-term maintainability."
      ],
      technologies: ["Oracle", "PL/SQL"],
    }, 

    {
      role: "Software Engineering Intern",
      company: "DMS Software Technologies (Pvt) Ltd",
      period: "Jul 2024 – Jan 2025",
      location: "Colombo 00700, Sri Lanka",
      type: "Internship",
      description: "Contributed to enterprise-grade platforms for NKAR Tour Guide Project.",
      achievements: [
        
        "Focused on creating a seamless, intuitive UI/UX tailored to tourists and travel planners.",
        "Collaborated closely with the development team and participated in client visits to gather feedback and align functionality with business requirements and user expectations.",
        
      ],
      technologies: ["Java", "Spring Boot"],
    }, 
  ];

  const certificationsData = [
    {
      title: "Online Learning programme in Python",
      issuer: "University of Moratuwa",
      date: "2022",
      credentialId: "META-12345",
      link: "https://open.uom.lk/",
      skills: ["React", "Responsive Design", "Version Control"]
    },
    {
      title: "Online Learning Programme in Frontend Web Development",
      issuer: "University of Moratuwa",
      date: "2024",
      credentialId: "META-12345",
      link: "https://open.uom.lk/",
      skills: ["React", "Responsive Design", "Version Control"]
    },
    {
      title: "Online Learning programme in Python for Beginners",
      issuer: "University of Moratuwa",
      date: "2022",
      credentialId: "UOM-FSD-2022",
      link: "https://open.uom.lk/",
      skills: ["Node.js", "MongoDB", "API Design"]
    },
    {
      title: "Online learning programme in Web Design",
      issuer: "University of Moratuwa",
      date: "2022",
      credentialId: "UOM-FSD-2022",
      link: "https://open.uom.lk/",
      skills: ["Node.js", "MongoDB", "API Design"]
    },
    {
      title: "AI/ML Engineer - Stage 1",
      issuer: "Sri Lanka Institute of Information Technology (SLIIT)",
      date: "2022",
      credentialId: "UOM-FSD-2022",
      link: "https://code.sliit.org/",
      skills: ["Node.js", "MongoDB", "API Design"]
    },
    {
      title: "Software Engineer Intern",
      issuer: "HackerRank",
      date: "2022",
      credentialId: "UOM-FSD-2022",
      link: "https://open.uom.lk/",
      skills: ["Node.js", "MongoDB", "API Design"]
    }
  ];

  const achievementsData = [
    {
      title: "Final Year Project",
      description: "Won for AI-powered analytics dashboard",
      date: "2024",
      category: "Project"
    }
  ];

  const interestsData = [
    "Full Stack Development",
    "Artificial Intelligence",
    "UI/UX Design",
    "Cloud Computing",
    "DevOps",
    "Mobile Development",
    "Open Source",
    "Technical Writing",
    "Problem Solving",
    "Competitive Programming", 
    "Photography", 
    "Stress management"
  ];

  const articlesData = [
    {
      title: "How Agile Is Reshaping Project Delivery in 2025",
      platform: "Medium",
      date: "2025",
      link: "https://medium.com/@rasingollasaranga35"
    }
  ];

  // Badge CSS classes helper
  const getBadgeClass = (category) => {
    const badgeMap = {
      'Final Year': 'badge-blue',
      'Completed': 'badge-green',
      'Internship': 'badge-green',
      'Virtual Internship': 'badge-purple',
      'Academic': 'badge-yellow',
      'Project': 'badge-blue',
      'Community': 'badge-pink',
      'Content': 'badge-green'
    };
    return `status-badge ${badgeMap[category] || 'badge-blue'}`;
  };

  // Simulate CV download message
  const handleDownloadCV = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div className={`about-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="about-container">

        {/* Header Section */}
        <div className="header-card">
          <div className="header-content">
            <div className="profile-container">
              <div className="profile-gradient">
                <div className="profile-inner">SR</div> {/* Initial */}
              </div>
              <div className="status-indicator">
                <div className="status-dot"></div> {/* Online status */}
              </div>
            </div>

            <div className="header-text">
              <h1 className="main-title">Saranga Rasingolla</h1>
              <p className="subtitle">Information Technology Undergraduate</p>
              <p className="education-info">SLIIT – BSc (Hons) in Information Technology</p>

              <div className="contact-info">
                <div className="contact-item">Colombo, Sri Lanka</div>
                <div className="contact-item">
                  <a href="mailto:rasingollasaranga35@gmail.com" className="email-link">
                  rasingollasaranga35@gmail.com
                  </a>
                </div>
                <div className="contact-item">
                  <a
                    href="https://wa.me/94703572917"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-link"
                  >
                    <FaWhatsapp style={{ color: '#25D366', marginRight: '6px' }} />
                    +94 70 357 2917
                  </a>
                </div>
              </div>

              <div className="action-buttons">
                <button
                  onClick={handleDownloadCV}
                  className="download-button"
                >
                  Download CV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Message Box for CV Download */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              className="message-box"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              Your CV will download now. (Simulated)
            </motion.div>
          )}
        </AnimatePresence>

        {/* Professional Summary */}
        <div className="summary-card">
          <h2 className="summary-title">Professional Summary</h2>
          <p className="summary-text">
            I am a passionate final-year IT undergraduate with expertise in full-stack web development and a strong foundation in the MERN stack and Java/Spring Boot ecosystem.
            With hands-on experience in enterprise-level software development through internships at DMS Software Technologies and HackerRank, I specialize in creating
            user-centered digital experiences and solving complex technical challenges. My interests span AI integration, mobile development, and UI/UX design,
            with a commitment to continuous learning and open-source contributions.
          </p>
        </div>

        {/* Tabs Section */}
        <div className="tabbed-card">
          <div className="tab-navigation">
            {Object.entries(tabData).map(([key, tab]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`tab-button ${activeTab === key ? 'active' : ''}`}
              >
                {tab.icon} {tab.title}
              </button>
            ))}
          </div>

          {/* Animated Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="tab-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {activeTab === 'overview' && (
                <>
                  <h3 className="section-header">Interests & Passions</h3>
                  <div className="interests-container">
                    {interestsData.map((interest, i) => (
                      <span key={i} className="interest-tag">{interest}</span>
                    ))}
                  </div>

                  <h3 className="section-header">Published Articles</h3>
                  <div className="grid-3">
                    {articlesData.map((a, i) => (
                      <div key={i} className="article-card">
                        <h4>{a.title}</h4>
                        <p>{a.platform} • {a.date}</p>
                        <a href={a.link} target="_blank" rel="noreferrer">Read Article</a>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'education' && (
                <>
                  <h3 className="section-header">Education History</h3>
                  {educationData.map((edu, i) => (
                    <div key={i} className="info-card">
                      <div className="card-header">
                        <div>
                          <h3>{edu.degree}</h3>
                          <p>{edu.institution}</p>
                        </div>
                        <span className={getBadgeClass(edu.status)}>{edu.status}</span>
                      </div>
                      <p className="period-location">{edu.period}</p>
                      {edu.results && <p className="card-details">{edu.results}</p>}
                      <ul className="card-highlights">
                        {edu.highlights.map((h, idx) => <li key={idx}>{h}</li>)}
                      </ul>
                      <a href={edu.link} target="_blank" rel="noreferrer" className="card-link">Visit Institution</a>
                    </div>
                  ))}
                </>
              )}

              {activeTab === 'experience' && (
                <>
                  <h3 className="section-header">Work Experience</h3>
                  {experienceData.map((exp, i) => (
                    <div key={i} className="info-card">
                      <div className="card-header">
                        <div>
                          <h3>{exp.role}</h3>
                          <p>{exp.company}</p>
                        </div>
                        <span className={getBadgeClass(exp.type)}>{exp.type}</span>
                      </div>
                      <p className="period-location">{exp.period} • {exp.location}</p>
                      <p className="card-description">{exp.description}</p>
                      <ul className="card-achievements">
                        {exp.achievements.map((a, idx) => <li key={idx}>{a}</li>)}
                      </ul>
                      <div className="tech-tags">
                        {exp.technologies.map((t, idx) => <span key={idx} className="tech-tag">{t}</span>)}
                      </div>
                    </div>
                  ))}
                </>
              )}

              {activeTab === 'achievements' && (
                <>
                  <h3 className="section-header">Certifications</h3>
                  <div className="grid-2">
                    {certificationsData.map((cert, i) => (
                      <div key={i} className="info-card">
                        <h4>{cert.title}</h4>
                        <p className="issuer-date">{cert.issuer} • {cert.date}</p>
                        <p className="credential-id">ID: {cert.credentialId}</p>
                        <div className="skill-tags">
                          {cert.skills.map((s, j) => (
                            <span key={j} className="skill-tag">{s}</span>
                          ))}
                        </div>
                        <a href={cert.link} target="_blank" rel="noreferrer" className="card-link">Verify</a>
                      </div>
                    ))}
                  </div>

                  <h3 className="section-header">Notable Achievements</h3>
                  <div className="grid-2">
                    {achievementsData.map((ach, i) => (
                      <div key={i} className="info-card">
                        <h4>{ach.title}</h4>
                        <span className={getBadgeClass(ach.category)}>{ach.category}</span>
                        <p className="achievement-description">{ach.description}</p>
                        <p className="achievement-date">{ach.date}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default About;
