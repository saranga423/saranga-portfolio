import React from 'react';
import '../styles/Skills.css';
import { FaCode, FaDatabase, FaTools, FaUsers, FaLayerGroup } from 'react-icons/fa';

const skillsData = [
  {
    category: 'Frontend Development',
    icon: <FaLayerGroup aria-hidden="true" />,
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
      { name: 'JavaScript (ES6+)', level: 88 },
      { name: 'Figma (UI Design)', level: 85 },
      { name: 'Responsive Design', level: 92 },
    ],
  },
  {
    category: 'Backend Development',
    icon: <FaCode aria-hidden="true" />,
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 82 },
      { name: 'Java', level: 80 },
      { name: 'Spring Boot', level: 78 },
      { name: 'RESTful APIs', level: 87 },
    ],
  },
  {
    category: 'Databases',
    icon: <FaDatabase aria-hidden="true" />,
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'MySQL', level: 80 },
      { name: 'PostgreSQL', level: 75 },
    ],
  },
  {
    category: 'Tools & Platforms',
    icon: <FaTools aria-hidden="true" />,
    skills: [
      { name: 'Git', level: 90 },
      { name: 'GitHub', level: 90 },
      { name: 'VS Code', level: 95 },
      { name: 'IntelliJ IDEA', level: 80 },
      { name: 'Postman', level: 85 },
      { name: 'Render / Vercel', level: 80 },
    ],
  },
  {
    category: 'Soft Skills',
    icon: <FaUsers aria-hidden="true" />,
    skills: [
      { name: 'Problem Solving', level: 90 },
      { name: 'Teamwork & Collaboration', level: 88 },
      { name: 'Time Management', level: 85 },
      { name: 'Professional Communication', level: 86 },
    ],
  },
];

const Skills = () => {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <header className="skills-header">
          <h2 className="skills-title">Skills Overview</h2>
          <p className="skills-subtitle">
            A categorized showcase of my technical competencies and soft skills.
          </p>
        </header>

        <div className="skills-grid">
          {skillsData.map(({ category, icon, skills }) => (
            <article key={category} className="skill-card">
              <header className="skill-card-header">
                <span className="skill-icon">{icon}</span>
                <h3 className="skill-category">{category}</h3>
              </header>
              <ul className="skill-list">
                {skills.map(({ name, level }, i) => (
                  <li key={name} className="skill-item" style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
                    <div className="skill-name-level">
                      <span className="skill-name">{name}</span>
                      <span className="skill-level">{level}%</span>
                    </div>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow={level}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      title={`${level}% proficiency in ${name}`}
                    >
                      <div
                        className="progress-fill"
                        style={{ width: `${level}%` }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
