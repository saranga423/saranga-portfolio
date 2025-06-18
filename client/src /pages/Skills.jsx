import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/Skills.css";

const techSkills = [
  {
    title: "Backend",
    items: [
      { name: "Node.js", progress: 80 },
      { name: "Express.js", progress: 75 },
    ],
  },
  {
    title: "Database",
    items: [{ name: "MongoDB", progress: 80 },
      {name: "MySQL", progress: 67},
    ],

  },
  {
    title: "Deployment",
    items: [
      { name: "Netlify", progress: 80 },
      { name: "Vercel", progress: 75 },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "HTML", progress: 95 },
      { name: "CSS", progress: 90 },
      { name: "React", progress: 90 },
      { name: "JavaScript", progress: 85 },
    ],
  },
  {
    title: "Practices",
    items: [
      { name: "RESTful APIs", progress: 85 },
      { name: "Agile Methodologies", progress: 80 },
    ],
  },
  {
    title: "Mobile Development",
    items: [
      { name: "Kotlin", progress: 85 },
      { name: "Android", progress: 75 },
    ],
  },
  {
    title: "DevOps",
    items: [
      { name: "CI/CD", progress: 60 },
      
    ],
  },
  {
    title: "Testing",
    items: [
      { name: "Manual Testing", progress: 40 },
      { name: "Software Testing", progress: 50 },
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      { name: "VS Code", progress: 90 },
      { name: "Git", progress: 85 },
      { name: "Postman", progress: 60 },
      { name: "Figma", progress: 87 },
      { name: "Kanban", progress: 60 },
      { name: "Jira", progress: 87 },
      { name: "Oracle", progress: 80 },

    ],
  },
  {
  title: "Cloud & Hosting",
  items: [
    { name: "Firebase", progress: 70 },
    { name: "Google Cloud", progress: 65 },
  ],
},
    {
  title: "Version Control",
  items: [
    { name: "GitHub", progress: 88 },
  ],
},

{
  title: "UI Libraries & Frameworks",
  items: [
    { name: "Bootstrap", progress: 85 },
    { name: "Tailwind CSS", progress: 78 },
    { name: "Material UI", progress: 80 },
  ],
},

];

const softSkills = [
  {
    title: "Interests",
    items: [
      { name: "Continuous Learning", progress: 95 },
      { name: "Open Source", progress: 70 },
      { name: "Research", progress: 40 },
      { name: "Photography", progress: 60 },
    ],
  },
  {
    title: "Languages",
    items: [
      { name: "Sinhala", progress: 98 },
      { name: "English", progress: 86 },
      { name: "Tamil", progress: 30 },
      
    ],
  },
  {
    title: "Soft Skills",
    items: [
      { name: "Teamwork", progress: 90 },
      { name: "Communication", progress: 88 },
      { name: "Problem Solving", progress: 85 },
    ],
  },
  {
  title: "Leadership & Collaboration",
  items: [
    { name: "Project Coordination", progress: 75 },
    { name: "Mentoring", progress: 65 },
    { name: "Time Management", progress: 88 },
  ],
},
{
  title: "Work Environment",
  items: [
    { name: "Remote Collaboration", progress: 80 },
    { name: "Cross-functional Teams", progress: 85 },
    { name: "Scrum Methodology", progress: 70 },
  ],
},

];

const SkillCard = ({ category, index }) => {
  const sortedItems = [...category.items].sort((a, b) => b.progress - a.progress);

  return (
    <motion.div
      className="skill-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <h3>{category.title}</h3>
      <ul>
        {sortedItems.map((item, i) => (
          <li key={i}>
            <div className="skill-header">
              <span className="skill-name">{item.name}</span>
              <span className="skill-percent">{item.progress}%</span>
            </div>
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${item.progress}%` }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
              />
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Skills = () => {
  const [tab, setTab] = useState("tech");

  return (
    <section className="skills-section" aria-labelledby="skills-title">
      <h2 id="skills-title">My Skills</h2>

      <div className="tabs" role="tablist">
        <button
          className={tab === "tech" ? "active" : ""}
          onClick={() => setTab("tech")}
          role="tab"
          aria-selected={tab === "tech"}
          aria-controls="tech-skills-panel"
          id="tech-skills-tab"
        >
          Tech Skills
        </button>
        <button
          className={tab === "soft" ? "active" : ""}
          onClick={() => setTab("soft")}
          role="tab"
          aria-selected={tab === "soft"}
          aria-controls="soft-skills-panel"
          id="soft-skills-tab"
        >
          Soft Skills
        </button>
      </div>

      <div
        className="skills-grid"
        role="tabpanel"
        id={tab === "tech" ? "tech-skills-panel" : "soft-skills-panel"}
        aria-labelledby={tab === "tech" ? "tech-skills-tab" : "soft-skills-tab"}
      >
        {(tab === "tech" ? techSkills : softSkills).map((category, index) => (
          <SkillCard key={index} category={category} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
