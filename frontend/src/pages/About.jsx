import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css'; // Make sure to update styles accordingly

const About = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  const tabData = {
    overview: { title: 'Overview', icon: '' },
    education: { title: 'Education', icon: '' },
    experience: { title: 'Experience', icon: '' },
    achievements: { title: 'Achievements', icon: '' },
  };

  const educationData = [/* same as before */];
  const experienceData = [/* same as before */];
  const certifications = [/* same as before */];
  const achievements = [/* same as before */];
  const interests = [/* same as before */];
  const articles = [/* same as before */];

  const skills = {
    "Frontend": ["React.js", "HTML5", "CSS3", "JavaScript (ES6+)", "Tailwind CSS"],
    "Backend": ["Node.js", "Express.js", "Java", "Spring Boot"],
    "Database": ["MongoDB", "PostgreSQL", "MySQL"],
    "Tools & Platforms": ["Git", "Docker", "Postman", "Figma", "VS Code"],
  };

  const projects = [
    {
      name: "TravelXpert",
      description: "AI-powered travel reservation platform with hotel and trip management.",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      link: "https://github.com/saranga/travelxpert"
    },
    {
      name: "Online Learning Platform",
      description: "Spring Boot + React platform for skill-sharing and learning plans.",
      technologies: ["Spring Boot", "React", "MySQL"],
      link: "https://github.com/saranga/learning-platform"
    }
  ];

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

  return (
    <div className={`about-page ${isDark ? 'dark-mode' : ''}`}>
      <div className="about-container">
        {/* Header */}
        <div className="header-card">
          <div className="header-content">
            <div className="profile-container">
              <div className="profile-gradient">
                <div className="profile-inner">SR</div>
              </div>
              <div className="status-indicator">
                <div className="status-dot"></div>
              </div>
            </div>

            <div className="header-text">
              <h1 className="main-title">Saranga Rasingolla</h1>
              <p className="subtitle">Information Technology Undergraduate</p>
              <p className="education-info">SLIIT – BSc (Hons) in Information Technology</p>

              <div className="contact-info">
                <div className="contact-item"> Colombo, Sri Lanka</div>
                <div className="contact-item"> rasingollasaranga35@gmail.com</div>
                <div className="contact-item"> +94 70 357 2917</div>
              </div>

              <div className="action-buttons">
                <a
  href="/resume.pdf"
  download="resume.pdf"
  className="download-button"
  onClick={() => alert("Your CV will download now.")}
>
  Download CV
</a>

                <button className="mode-toggle" onClick={toggleTheme}>🌓 Toggle Theme</button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="summary-card">
          <h2 className="summary-title">Professional Summary</h2>
          <p className="summary-text">
            I am a passionate final-year IT undergraduate with expertise in full-stack web development and a strong foundation in the MERN stack and Java/Spring Boot ecosystem.
            With hands-on experience in enterprise-level software development through internships at DMS Software Technologies and HackerRank, I specialize in creating
            user-centered digital experiences and solving complex technical challenges. My interests span AI integration, mobile development, and UI/UX design,
            with a commitment to continuous learning and open-source contributions.
          </p>
        </div>

        {/* Tab Navigation */}
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

          {/* Tab Content with Animation */}
          <motion.div
            className="tab-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'overview' && (
              <>
                <h3 className="section-header"> Interests & Passions</h3>
                <div className="interests-container">
                  {[
                    "Full Stack Development",
                    "Artificial Intelligence",
                    "UI/UX Design",
                    "Cloud Computing",
                    "DevOps",
                    "Mobile Development",
                    "Open Source",
                    "Technical Writing",
                    "Problem Solving",
                    "Competitive Programming"
                  ].map((interest, i) => (
                    <span key={i} className="interest-tag">{interest}</span>
                  ))}
                </div>

                <h3 className="section-header"> Published Articles</h3>
                <div className="grid-3">
                  {[
                    {
                      title: "Introducing AI in Web Applications",
                      platform: "Dev.to",
                      date: "2024",
                      views: "2.5K",
                      link: "https://dev.to/saranga/introducing-ai-in-web-applications-654321"
                    },
                    {
                      title: "MERN Stack Best Practices",
                      platform: "Medium",
                      date: "2024",
                      views: "3.2K",
                      link: "https://medium.com/@rasingollasaranga35"
                    },
                    {
                      title: "Deploying Spring Boot with Docker",
                      platform: "Hashnode",
                      date: "2024",
                      views: "1.8K",
                      link: "https://hashnode.com/saranga"
                    }
                  ].map((a, i) => (
                    <div key={i} className="article-card">
                      <h4>{a.title}</h4>
                      <p>{a.platform} • {a.date}</p>
                      <p>{a.views} views</p>
                      <a href={a.link} target="_blank" rel="noreferrer">Read Article </a>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'education' && [
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
            ].map((edu, i) => (
              <div key={i} className="info-card">
                <div className="card-header">
                  <div>
                    <h3>{edu.degree}</h3>
                    <p>{edu.institution}</p>
                  </div>
                  <span className={getBadgeClass(edu.status)}>{edu.status}</span>
                </div>
                <p> {edu.period}</p>
                {edu.results && <p>{edu.results}</p>}
                <ul>{edu.highlights.map((h, i) => <li key={i}>{h}</li>)}</ul>
                <a href={edu.link} target="_blank" rel="noreferrer">Visit Institution </a>
              </div>
            ))}

            {activeTab === 'experience' && [
              {
                role: "Software Engineering Intern",
                company: "DMS Software Technologies (Pvt) Ltd",
                period: "Jul 2024 – Jan 2025",
                location: "Colombo 00700, Sri Lanka",
                type: "Internship",
                description: "Contributed to enterprise-grade platforms for tourism and railway systems.",
                achievements: [
                  "Developed a tourism management module for 50+ clients",
                  "Improved system performance using Java Spring Boot optimizations",
                  "Built secure REST APIs integrated with PostgreSQL",
                  "Collaborated with Agile teams using Jira"
                ],
                technologies: ["Java", "Spring Boot", "React.js", "PostgreSQL", "Docker"],
              },
              {
                role: "Software Engineer Intern",
                company: "HackerRank",
                period: "2025",
                location: "Remote",
                type: "Virtual Internship",
                description: "Engaged in real-world coding challenges and internal tooling.",
                achievements: [
                  "Solved 200+ problems across data structures and algorithms",
                  "Built and documented internal JS utility libraries",
                  "Mentored 3 junior developers",
                  "Achieved 5-star ratings in Java and JavaScript"
                ],
                technologies: ["JavaScript", "Python", "Git", "CI/CD"],
              }
            ].map((exp, i) => (
              <div key={i} className="info-card">
                <div className="card-header">
                  <div>
                    <h3>{exp.role}</h3>
                    <p>{exp.company}</p>
                  </div>
                  <span className={getBadgeClass(exp.type)}>{exp.type}</span>
                </div>
                <p> {exp.period} •  {exp.location}</p>
                <p>{exp.description}</p>
                <ul>{exp.achievements.map((a, i) => <li key={i}>{a}</li>)}</ul>
                <div className="tech-tags">
                  {exp.technologies.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}
                </div>
              </div>
            ))}

            {activeTab === 'achievements' && (
              <>
                <h3 className="section-header"> Certifications</h3>
                <div className="grid-2">
                  {[
                    {
                      title: "Meta Front-End Developer Professional Certificate",
                      issuer: "Coursera",
                      date: "2024",
                      credentialId: "META-12345",
                      link: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
                      skills: ["React", "Responsive Design", "Version Control"]
                    },
                    {
                      title: "Full Stack Developer Program",
                      issuer: "University of Moratuwa",
                      date: "2022",
                      credentialId: "UOM-FSD-2022",
                      link: "https://open.uom.lk/",
                      skills: ["Node.js", "MongoDB", "API Design"]
                    }
                  ].map((cert, i) => (
                    <div key={i} className="info-card">
                      <h4>{cert.title}</h4>
                      <p>{cert.issuer} • {cert.date}</p>
                      <p>ID: {cert.credentialId}</p>
                      <div className="skill-tags">
                        {cert.skills.map((s, j) => (
                          <span key={j} className="skill-tag">{s}</span>
                        ))}
                      </div>
                      <a href={cert.link} target="_blank" rel="noreferrer">Verify </a>
                    </div>
                  ))}
                </div>

                <h3 className="section-header"> Notable Achievements</h3>
                <div className="grid-2">
                  {[
                    
                    {
                      title: "Best Final Year Project",
                      description: "Won for AI-powered analytics dashboard",
                      date: "2024",
                      category: "Project"
                    }
                  ].map((ach, i) => (
                    <div key={i} className="info-card">
                      <h4>{ach.title}</h4>
                      <span className={getBadgeClass(ach.category)}>{ach.category}</span>
                      <p>{ach.description}</p>
                      <p>{ach.date}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>        
      </div>
    </div>
  );
};

export default About;
