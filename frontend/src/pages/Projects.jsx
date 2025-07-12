import React, { useState } from 'react';
import '../styles/Projects.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Import images
import travelxpertImg from '../assets/travelxpert.jpeg';
import petcareImg from '../assets/petcare.png';
import passwordCheckerImg from '../assets/password-checker.png';
import resumeAnalyzerImg from '../assets/resume-analyzer.jpg';
import chatbotImg from '../assets/chatbot.png';
import portfolioImg from '../assets/portfolio.jpg';
import ecommerceImg from '../assets/ecommerce.png';
import gymImg from '../assets/gym.jpg';
import salonImg from '../assets/salon.jpg';
import beatflowImg from '../assets/beatflow.jpg';
import groceryImg from '../assets/grocery.jpg';
import topJobsImg from '../assets/topjobs.jpg';
import onlineLearningImg from '../assets/OnlineLearning.jpg';

const projects = [
  {
    title: 'TravelXpert',
    image: travelxpertImg,
    description: 'A MERN stack travel booking platform with AI and map features.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'AI', 'Maps'],
    github: 'https://github.com/saranga/travelxpert',
    demo: '',
  },
  {
    title: 'Pet Care System',
    image: petcareImg,
    description: 'Manage pet health records and appointments online.',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
    github: 'https://github.com/saranga/pet-care',
    demo: '',
  },
  {
    title: 'Password Checker',
    image: passwordCheckerImg,
    description: 'Real-time password strength validation using zxcvbn.js.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/saranga423/password-checker.git',
    demo: 'https://saranga.github.io/password-checker/',
  },
  {
    title: 'Resume Analyzer',
    image: resumeAnalyzerImg,
    description: 'Analyze resume files for key patterns and insights.',
    technologies: ['JavaScript', 'File API', 'NLP Basics (if applicable)'],
    github: 'https://github.com/saranga423/resume-analyzer.git',
    demo: '',
  },
  {
    title: 'Chatbot App',
    image: chatbotImg,
    description: 'Interactive chatbot with preset replies.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/saranga423/chatbot-app.git',
    demo: 'https://saranga.github.io/chatbot-app/',
  },
  {
    title: 'Saranga Portfolio',
    image: portfolioImg,
    description: 'My personal portfolio website built in React.',
    technologies: ['React', 'React Router', 'CSS3'],
    github: 'https://github.com/saranga/saranga-portfolio',
    demo: 'https://www.yourportfolio.com',
  },
  {
    title: 'E-Commerce App',
    image: ecommerceImg,
    description: 'Online shopping platform with cart & checkout functionalities.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux (if applicable)'],
    github: 'https://github.com/saranga423/E-Commerce-App-MERN-Stack-Project.git',
    demo: '',
  },

  {
  title: 'Online Learning Platform',
  image: onlineLearningImg,
  description: 'A web-based learning management system enabling users to explore courses, manage learning plans, and track progress. Features include user authentication, role-based access, and real-time course updates.',
  technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux'],
  github: 'https://github.com/saranga423/E-Commerce-App-MERN-Stack-Project.git',
  demo: '',
},
  {
    title: 'Gym Management System',
    image: gymImg,
    description: 'System to manage gym memberships, plans, and schedules.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'Local Storage (if applicable)'],
    github: 'https://github.com/saranga/Gym_System',
    demo: '',
  },
  {
    title: 'Elegant Cut Salon Website',
    image: salonImg,
    description: 'A stylish and responsive website for showcasing salon services and booking appointments.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Responsive Design'],
    github: 'https://github.com/saranga/salon',
    demo: '',
  },
  {
    title: 'BeatFlow Music App',
    image: beatflowImg,
    description: 'A modern UI/UX design for a music listening experience.',
    technologies: ['Figma', 'UI/UX Design Principles'],
    demo: 'https://www.figma.com/design/1Ztnoqf3BdIWeFx5auJtC1/SARANGA-RASINGOLLA?node-id=0-1&p=f&t=gYtrw0uWbWxLeb6B-0',
  },
  {
    title: 'Grocery Management System',
    image: groceryImg,
    description: 'Desktop app to manage inventory, sales, and billing for grocery stores.',
    technologies: ['Java', 'Swing (if applicable)', 'MySQL (if applicable)'],
    github: 'https://github.com/saranga/GROCERY_MANAGEMENT_SYSTEM',
    demo: '',
  },
  {
    title: 'TopJobs UI/UX Revamp',
    image: topJobsImg,
    description: 'UI/UX redesign for TopJobs.lk to enhance user experience and engagement.',
    technologies: ['Figma', 'UI/UX Research', 'Prototyping', 'User Testing (if applicable)'],
    github: 'https://github.com/saranga/UI-UX-Revamp-of-Top-Jobs.lk',
    demo: 'https://www.figma.com/file/your-topjobs-prototype-link',
  },
];

const allTechs = ['All', ...Array.from(new Set(projects.flatMap(p => p.technologies || [])))];

const Projects = () => {
  const [selectedTech, setSelectedTech] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredProjects = selectedTech === 'All'
    ? projects
    : projects.filter(p => p.technologies?.includes(selectedTech));

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  return (
    <section className="projects-section" id="projects">
      <h2 className="projects-title">My Projects</h2>

      <div className="tech-filter">
        {allTechs.map(tech => (
          <button
            key={tech}
            className={`filter-btn ${selectedTech === tech ? 'active' : ''}`}
            onClick={() => setSelectedTech(tech)}
          >
            {tech}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {visibleProjects.map((project, idx) => (
          <motion.div
            key={idx}
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="project-img loaded"
              loading="lazy"
            />
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>

            <div className="project-tech">
              {project.technologies && project.technologies.map((tech, i) => (
                <span key={i} className="tech-badge" title={tech}>
                  {tech}
                </span>
              ))}
            </div>

            <div className="project-links">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <FaGithub /> GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link demo"
                  aria-label={`View live demo of ${project.title}`}
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length > visibleCount && (
        <div className="load-more">
          <button onClick={() => setVisibleCount(prev => prev + 6)}>
            Load More Projects
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;
