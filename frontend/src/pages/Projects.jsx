import React, { useEffect, useMemo, useState } from 'react';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaSearch,
  FaLayerGroup,
  FaCode,
  FaLaptopCode,
  FaStar,
  FaFilter,
  FaArrowRight,
  FaFire,
  FaRocket,
  FaGlobe,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

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
    description:
      'A MERN stack travel booking platform with AI-powered experiences, smart recommendations, and interactive map-based functionality.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'AI', 'Maps'],
    github: 'https://github.com/saranga/travelxpert',
    demo: '',
    category: 'Full Stack',
    featured: true,
  },
  {
    title: 'Pet Care System',
    image: petcareImg,
    description:
      'A digital platform for managing pet health records, appointments, and owner communication in a more organized way.',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
    github: 'https://github.com/saranga/pet-care',
    demo: '',
    category: 'Full Stack',
  },
  {
    title: 'Password Checker',
    image: passwordCheckerImg,
    description:
      'A real-time password strength checker using zxcvbn-based validation and instant UI feedback.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/saranga423/password-checker.git',
    demo: 'https://saranga.github.io/password-checker/',
    category: 'Frontend',
  },
  {
    title: 'Resume Analyzer',
    image: resumeAnalyzerImg,
    description:
      'A resume analysis tool that scans uploaded files for patterns, keywords, and useful applicant insights.',
    technologies: ['JavaScript', 'File API', 'NLP Basics'],
    github: 'https://github.com/saranga423/resume-analyzer.git',
    demo: '',
    category: 'Utility',
  },
  {
    title: 'Chatbot App',
    image: chatbotImg,
    description:
      'An interactive chatbot interface with a simple conversational flow and a user-friendly design.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/saranga423/chatbot-app.git',
    demo: 'https://saranga.github.io/chatbot-app/',
    category: 'Frontend',
  },
  {
    title: 'Saranga Portfolio',
    image: portfolioImg,
    description:
      'My personal portfolio website built with React to showcase projects, skills, and professional background.',
    technologies: ['React', 'React Router', 'CSS3'],
    github: 'https://github.com/saranga/saranga-portfolio',
    demo: 'https://www.yourportfolio.com',
    category: 'Portfolio',
    featured: true,
  },
  {
    title: 'E-Commerce App',
    image: ecommerceImg,
    description:
      'An online shopping platform with product browsing, cart management, and checkout-related workflows.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux'],
    github: 'https://github.com/saranga423/E-Commerce-App-MERN-Stack-Project.git',
    demo: '',
    category: 'Full Stack',
    featured: true,
  },
  {
    title: 'Online Learning Platform',
    image: onlineLearningImg,
    description:
      'A web-based learning management platform with authentication, course exploration, role-based access, and progress tracking.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux'],
    github: 'https://github.com/saranga423/E-Commerce-App-MERN-Stack-Project.git',
    demo: '',
    category: 'Full Stack',
  },
  {
    title: 'Gym Management System',
    image: gymImg,
    description:
      'A system to manage gym memberships, plan details, and scheduling processes for better administration.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'Local Storage'],
    github: 'https://github.com/saranga/Gym_System',
    demo: '',
    category: 'Management System',
  },
  {
    title: 'Elegant Cut Salon Website',
    image: salonImg,
    description:
      'A stylish, responsive salon website designed to present services, brand identity, and appointment-related information.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Responsive Design'],
    github: 'https://github.com/saranga/salon',
    demo: '',
    category: 'Frontend',
  },
  {
    title: 'BeatFlow Music App',
    image: beatflowImg,
    description:
      'A modern music experience interface focused on visual polish, user flow, and UI/UX principles.',
    technologies: ['Figma', 'UI/UX Design Principles'],
    github: '',
    demo: 'https://www.figma.com/design/1Ztnoqf3BdIWeFx5auJtC1/SARANGA-RASINGOLLA?node-id=0-1&p=f&t=gYtrw0uWbWxLeb6B-0',
    category: 'UI/UX',
  },
  {
    title: 'Grocery Management System',
    image: groceryImg,
    description:
      'A desktop-based application for inventory tracking, billing, and sales management in grocery stores.',
    technologies: ['Java', 'Swing', 'MySQL'],
    github: 'https://github.com/saranga/GROCERY_MANAGEMENT_SYSTEM',
    demo: '',
    category: 'Desktop App',
  },
  {
    title: 'TopJobs UI/UX Revamp',
    image: topJobsImg,
    description:
      'A UI/UX redesign concept for TopJobs.lk to improve user engagement, usability, and interface quality.',
    technologies: ['Figma', 'UI/UX Research', 'Prototyping', 'User Testing'],
    github: 'https://github.com/saranga/UI-UX-Revamp-of-Top-Jobs.lk',
    demo: 'https://www.figma.com/file/your-topjobs-prototype-link',
    category: 'UI/UX',
  },
];

function useCountUp(target, duration = 1400) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    let frameId;
    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(start + (target - start) * eased);
      setCount(value);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [target, duration]);

  return count;
}

function CounterCard({ icon, value, label, accent }) {
  const count = useCountUp(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="projects-counter-card"
    >
      <div className="projects-counter-icon" style={{ color: accent }}>
        {icon}
      </div>
      <h3>{count}</h3>
      <p>{label}</p>
    </motion.div>
  );
}

function TechMarquee({ techs }) {
  const items = [...techs, ...techs];

  return (
    <div className="projects-marquee-wrap">
      <div className="projects-marquee-track">
        {items.map((tech, index) => (
          <span key={`${tech}-${index}`} className="projects-marquee-chip">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

const cardMotion = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const Projects = () => {
  const [selectedTech, setSelectedTech] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Featured');
  const [visibleCount, setVisibleCount] = useState(6);

  const allTechs = useMemo(
    () => ['All', ...Array.from(new Set(projects.flatMap((p) => p.technologies || []))).sort()],
    []
  );

  const allCategories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))).sort()],
    []
  );

  const featuredProject =
    projects.find((project) => project.featured) || projects[0];

  const featuredCount = projects.filter((p) => p.featured).length;
  const totalTechCount = allTechs.length - 1;
  const categoryCount = allCategories.length - 1;

  const marqueeTechs = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.technologies || []))),
    []
  );

  const filteredProjects = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    let filtered = projects.filter((project) => {
      const matchesTech =
        selectedTech === 'All' || project.technologies?.includes(selectedTech);

      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;

      const matchesSearch =
        q === '' ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.category?.toLowerCase().includes(q) ||
        project.technologies?.some((tech) => tech.toLowerCase().includes(q));

      return matchesTech && matchesCategory && matchesSearch;
    });

    if (sortBy === 'Featured') {
      filtered = [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured));
    } else if (sortBy === 'A-Z') {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'Category') {
      filtered = [...filtered].sort((a, b) =>
        (a.category || '').localeCompare(b.category || '')
      );
    }

    return filtered;
  }, [selectedTech, selectedCategory, searchTerm, sortBy]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const resetAndSet = (setter, value) => {
    setter(value);
    setVisibleCount(6);
  };

  return (
    <section id="projects" className="projects-section">
      <style>
        {`
          .projects-section {
            position: relative;
            min-height: 100vh;
            padding: 42px 18px 90px;
            overflow: hidden;
            color: #f5f7ff;
            background:
              radial-gradient(circle at 12% 16%, rgba(99, 102, 241, 0.16), transparent 22%),
              radial-gradient(circle at 88% 14%, rgba(34, 211, 238, 0.14), transparent 24%),
              radial-gradient(circle at 50% 100%, rgba(236, 72, 153, 0.08), transparent 24%),
              linear-gradient(135deg, #050816 0%, #0b1024 45%, #111935 100%);
            font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }

          .projects-bg-orb-a,
          .projects-bg-orb-b {
            position: absolute;
            border-radius: 999px;
            filter: blur(110px);
            pointer-events: none;
          }

          .projects-bg-orb-a {
            width: 280px;
            height: 280px;
            top: 80px;
            left: -80px;
            background: rgba(99, 102, 241, 0.18);
          }

          .projects-bg-orb-b {
            width: 340px;
            height: 340px;
            right: -100px;
            bottom: 40px;
            background: rgba(34, 211, 238, 0.18);
          }

          .projects-container {
            max-width: 1380px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
          }

          .projects-hero {
            position: relative;
            padding: 34px;
            border-radius: 30px;
            overflow: hidden;
            margin-bottom: 24px;
            border: 1px solid rgba(255,255,255,0.1);
            background:
              linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.04));
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            box-shadow: 0 22px 60px rgba(0,0,0,0.28);
          }

          .projects-hero::before {
            content: "";
            position: absolute;
            inset: 0;
            background:
              linear-gradient(120deg, rgba(255,255,255,0.08), transparent 35%),
              linear-gradient(315deg, rgba(34,211,238,0.06), transparent 42%);
            pointer-events: none;
          }

          .projects-hero-grid {
            position: relative;
            z-index: 1;
            display: grid;
            grid-template-columns: 1.45fr 1fr;
            gap: 24px;
            align-items: center;
          }

          .projects-badges {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 18px;
          }

          .projects-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 14px;
            border-radius: 999px;
            font-size: 0.86rem;
            font-weight: 800;
            border: 1px solid rgba(255,255,255,0.12);
            background: rgba(255,255,255,0.06);
          }

          .projects-title {
            margin: 0 0 12px;
            font-size: clamp(2.35rem, 4.8vw, 4.4rem);
            line-height: 0.98;
            font-weight: 900;
            letter-spacing: -1.8px;
          }

          .projects-title span {
            background: linear-gradient(135deg, #ffffff 0%, #7dd3fc 40%, #a78bfa 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .projects-subtitle {
            margin: 0;
            max-width: 780px;
            color: #b7c2d9;
            font-size: 1rem;
            line-height: 1.85;
          }

          .projects-featured-spotlight {
            position: relative;
            padding: 1px;
            border-radius: 26px;
            background: linear-gradient(135deg, rgba(99,102,241,0.8), rgba(34,211,238,0.65), rgba(236,72,153,0.55));
            box-shadow: 0 14px 34px rgba(34, 211, 238, 0.12);
          }

          .projects-featured-spotlight-inner {
            border-radius: 25px;
            overflow: hidden;
            background: rgba(8, 13, 32, 0.9);
          }

          .projects-featured-image-wrap {
            position: relative;
            height: 240px;
            overflow: hidden;
          }

          .projects-featured-image-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.6s ease;
          }

          .projects-featured-spotlight:hover .projects-featured-image-wrap img {
            transform: scale(1.06);
          }

          .projects-featured-overlay {
            position: absolute;
            inset: 0;
            background:
              linear-gradient(to top, rgba(6,10,22,0.95), rgba(6,10,22,0.15) 50%, transparent);
          }

          .projects-featured-pill {
            position: absolute;
            top: 14px;
            left: 14px;
            z-index: 2;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            font-size: 0.8rem;
            font-weight: 800;
            border-radius: 999px;
            color: #7dd3fc;
            background: rgba(34, 211, 238, 0.12);
            border: 1px solid rgba(34, 211, 238, 0.22);
          }

          .projects-featured-content {
            padding: 20px;
          }

          .projects-featured-label {
            font-size: 0.82rem;
            font-weight: 800;
            color: #9fb3d9;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
          }

          .projects-featured-title {
            margin: 0 0 8px;
            font-size: 1.35rem;
            font-weight: 900;
          }

          .projects-featured-desc {
            margin: 0 0 16px;
            color: #b7c2d9;
            line-height: 1.75;
            font-size: 0.95rem;
          }

          .projects-featured-links {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .projects-link-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 11px 15px;
            border-radius: 14px;
            text-decoration: none;
            font-weight: 800;
            font-size: 0.9rem;
            color: #fff;
            border: 1px solid rgba(255,255,255,0.12);
            background: rgba(255,255,255,0.06);
            transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
          }

          .projects-link-btn:hover {
            transform: translateY(-3px);
            border-color: rgba(34,211,238,0.22);
          }

          .projects-link-btn.primary {
            background: linear-gradient(135deg, #6366f1, #22d3ee);
            border-color: rgba(34,211,238,0.2);
          }

          .projects-counters {
            margin-top: 24px;
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 16px;
          }

          .projects-counter-card {
            padding: 18px;
            border-radius: 22px;
            border: 1px solid rgba(255,255,255,0.1);
            background: rgba(255,255,255,0.05);
            box-shadow: 0 12px 30px rgba(0,0,0,0.18);
          }

          .projects-counter-icon {
            font-size: 1.1rem;
            margin-bottom: 12px;
          }

          .projects-counter-card h3 {
            margin: 0 0 6px;
            font-size: 1.65rem;
            font-weight: 900;
          }

          .projects-counter-card p {
            margin: 0;
            color: #b7c2d9;
            font-size: 0.92rem;
          }

          .projects-marquee-section {
            margin: 24px 0 26px;
          }

          .projects-marquee-wrap {
            position: relative;
            overflow: hidden;
            border-radius: 18px;
            border: 1px solid rgba(255,255,255,0.1);
            background: rgba(255,255,255,0.05);
            padding: 14px 0;
          }

          .projects-marquee-wrap::before,
          .projects-marquee-wrap::after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            width: 80px;
            z-index: 2;
            pointer-events: none;
          }

          .projects-marquee-wrap::before {
            left: 0;
            background: linear-gradient(to right, rgba(10,16,35,1), rgba(10,16,35,0));
          }

          .projects-marquee-wrap::after {
            right: 0;
            background: linear-gradient(to left, rgba(10,16,35,1), rgba(10,16,35,0));
          }

          .projects-marquee-track {
            display: flex;
            width: max-content;
            animation: projectsMarquee 26s linear infinite;
          }

          .projects-marquee-chip {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin: 0 10px;
            padding: 10px 16px;
            border-radius: 999px;
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(255,255,255,0.12);
            font-size: 0.88rem;
            font-weight: 800;
            color: #eaf2ff;
            white-space: nowrap;
          }

          @keyframes projectsMarquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          .projects-toolbar {
            padding: 24px;
            border-radius: 28px;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.1);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            box-shadow: 0 18px 42px rgba(0,0,0,0.22);
            margin-bottom: 28px;
          }

          .projects-toolbar-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
            flex-wrap: wrap;
            margin-bottom: 20px;
          }

          .projects-toolbar-head h3 {
            margin: 0;
            font-size: 1.15rem;
            font-weight: 900;
          }

          .projects-toolbar-head p {
            margin: 6px 0 0;
            color: #b7c2d9;
            font-size: 0.95rem;
          }

          .projects-toolbar-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 14px;
            border-radius: 999px;
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(255,255,255,0.11);
            font-weight: 800;
          }

          .projects-search-wrap {
            position: relative;
            margin-bottom: 18px;
          }

          .projects-search-icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #9fb3d9;
            font-size: 0.94rem;
          }

          .projects-search {
            width: 100%;
            box-sizing: border-box;
            padding: 15px 16px 15px 44px;
            border-radius: 16px;
            border: 1px solid rgba(255,255,255,0.12);
            background: rgba(255,255,255,0.06);
            color: #fff;
            outline: none;
            font-size: 0.96rem;
          }

          .projects-search::placeholder {
            color: #94a3b8;
          }

          .projects-filters-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 220px;
            gap: 16px;
            align-items: start;
          }

          .projects-filter-title {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 10px;
            color: #b7c2d9;
            font-size: 0.88rem;
            font-weight: 800;
          }

          .projects-chip-group {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .projects-chip {
            padding: 10px 14px;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.11);
            background: rgba(255,255,255,0.05);
            color: #fff;
            font-size: 0.86rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.25s ease;
          }

          .projects-chip:hover {
            transform: translateY(-2px);
            border-color: rgba(34,211,238,0.22);
          }

          .projects-chip.active {
            background: linear-gradient(135deg, rgba(99,102,241,0.28), rgba(34,211,238,0.18));
            color: #7dd3fc;
            border-color: rgba(34,211,238,0.24);
          }

          .projects-sort-wrap {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .projects-sort-wrap label {
            color: #b7c2d9;
            font-size: 0.88rem;
            font-weight: 800;
          }

          .projects-sort-wrap select {
            width: 100%;
            padding: 14px;
            border-radius: 16px;
            border: 1px solid rgba(255,255,255,0.12);
            background: rgba(255,255,255,0.06);
            color: #fff;
            outline: none;
            font-size: 0.94rem;
          }

          .projects-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 22px;
          }

          .projects-card-gradient {
            padding: 1px;
            border-radius: 28px;
            background: linear-gradient(135deg, rgba(99,102,241,0.34), rgba(255,255,255,0.1), rgba(34,211,238,0.28));
            transition: transform 0.28s ease, box-shadow 0.28s ease;
          }

          .projects-card-gradient:hover {
            transform: translateY(-7px);
            box-shadow: 0 24px 60px rgba(34,211,238,0.1);
          }

          .projects-card {
            display: flex;
            flex-direction: column;
            height: 100%;
            border-radius: 27px;
            overflow: hidden;
            background: rgba(10, 14, 30, 0.92);
            border: 1px solid rgba(255,255,255,0.06);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }

          .projects-card-image-wrap {
            position: relative;
            height: 230px;
            overflow: hidden;
          }

          .projects-card-image-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.55s ease;
          }

          .projects-card-gradient:hover .projects-card-image-wrap img {
            transform: scale(1.06);
          }

          .projects-card-image-overlay {
            position: absolute;
            inset: 0;
            background:
              linear-gradient(to top, rgba(7,10,22,0.95), rgba(7,10,22,0.18) 45%, transparent);
          }

          .projects-card-featured {
            position: absolute;
            top: 14px;
            left: 14px;
            z-index: 2;
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 8px 12px;
            border-radius: 999px;
            background: rgba(251, 191, 36, 0.12);
            border: 1px solid rgba(251, 191, 36, 0.22);
            color: #facc15;
            font-size: 0.8rem;
            font-weight: 900;
          }

          .projects-card-category {
            position: absolute;
            right: 14px;
            bottom: 14px;
            z-index: 2;
            padding: 8px 12px;
            border-radius: 999px;
            background: rgba(255,255,255,0.12);
            border: 1px solid rgba(255,255,255,0.16);
            font-size: 0.79rem;
            font-weight: 800;
          }

          .projects-card-content {
            padding: 22px;
            display: flex;
            flex-direction: column;
            flex: 1;
          }

          .projects-card-content h3 {
            margin: 0 0 10px;
            font-size: 1.18rem;
            font-weight: 900;
            line-height: 1.28;
          }

          .projects-card-content p {
            margin: 0 0 16px;
            color: #b7c2d9;
            line-height: 1.8;
            font-size: 0.95rem;
            flex-grow: 1;
          }

          .projects-card-techs {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 18px;
          }

          .projects-tech-badge {
            padding: 8px 11px;
            border-radius: 999px;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.1);
            font-size: 0.8rem;
            font-weight: 800;
            color: #e8f1ff;
          }

          .projects-card-links {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: auto;
          }

          .projects-empty {
            padding: 42px 24px;
            text-align: center;
            border-radius: 24px;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            color: #b7c2d9;
          }

          .projects-empty h3 {
            margin: 0 0 8px;
            color: #fff;
            font-size: 1.1rem;
            font-weight: 900;
          }

          .projects-load-more-wrap {
            display: flex;
            justify-content: center;
            margin-top: 30px;
          }

          .projects-load-more {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 14px 22px;
            border-radius: 16px;
            border: 1px solid rgba(34,211,238,0.2);
            background: linear-gradient(135deg, rgba(99,102,241,0.25), rgba(34,211,238,0.18));
            color: #fff;
            font-weight: 900;
            font-size: 0.95rem;
            cursor: pointer;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
          }

          .projects-load-more:hover {
            transform: translateY(-3px);
            box-shadow: 0 16px 40px rgba(34,211,238,0.12);
          }

          @media (max-width: 1180px) {
            .projects-hero-grid {
              grid-template-columns: 1fr;
            }

            .projects-counters {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .projects-filters-grid {
              grid-template-columns: 1fr;
            }

            .projects-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 768px) {
            .projects-section {
              padding: 24px 12px 50px;
            }

            .projects-hero,
            .projects-toolbar {
              padding: 20px;
            }

            .projects-title {
              font-size: clamp(2rem, 9vw, 3rem);
            }

            .projects-counters,
            .projects-grid {
              grid-template-columns: 1fr;
            }

            .projects-featured-links a,
            .projects-card-links a {
              width: 100%;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .projects-marquee-track,
            .projects-card-gradient,
            .projects-link-btn,
            .projects-load-more,
            .projects-featured-image-wrap img,
            .projects-card-image-wrap img {
              animation: none !important;
              transition: none !important;
            }
          }
        `}
      </style>

      <div className="projects-bg-orb-a" />
      <div className="projects-bg-orb-b" />

      <div className="projects-container">
        <motion.div
          className="projects-hero"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="projects-hero-grid">
            <div>
              <div className="projects-badges">
                <span className="projects-badge">
                  <FaRocket />
                  Premium Showcase
                </span>
                <span className="projects-badge">
                  <FaFire />
                  Featured Work
                </span>
                <span className="projects-badge">
                  <FaGlobe />
                  Modern Product Experiences
                </span>
              </div>

              <h2 className="projects-title">
                Engineered Projects,
                <br />
                <span>Refined for Impact</span>
              </h2>

              <p className="projects-subtitle">
                A curated collection of full-stack systems, frontend applications,
                UI/UX explorations, and practical software solutions built with a
                strong focus on usability, architecture, scalability, and modern
                visual identity.
              </p>
            </div>

            <div className="projects-featured-spotlight">
              <div className="projects-featured-spotlight-inner">
                <div className="projects-featured-image-wrap">
                  <span className="projects-featured-pill">
                    <FaStar />
                    Spotlight Project
                  </span>

                  <img src={featuredProject.image} alt={featuredProject.title} />
                  <div className="projects-featured-overlay" />
                </div>

                <div className="projects-featured-content">
                  <div className="projects-featured-label">Featured Highlight</div>
                  <h3 className="projects-featured-title">{featuredProject.title}</h3>
                  <p className="projects-featured-desc">{featuredProject.description}</p>

                  <div className="projects-featured-links">
                    {featuredProject.github && (
                      <a
                        href={featuredProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects-link-btn"
                      >
                        <FaGithub />
                        GitHub
                      </a>
                    )}

                    {featuredProject.demo && (
                      <a
                        href={featuredProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects-link-btn primary"
                      >
                        <FaExternalLinkAlt />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="projects-counters">
            <CounterCard
              icon={<FaLaptopCode />}
              value={projects.length}
              label="Projects Showcased"
              accent="#7dd3fc"
            />
            <CounterCard
              icon={<FaStar />}
              value={featuredCount}
              label="Featured Projects"
              accent="#facc15"
            />
            <CounterCard
              icon={<FaCode />}
              value={totalTechCount}
              label="Technology Areas"
              accent="#a78bfa"
            />
            <CounterCard
              icon={<FaLayerGroup />}
              value={categoryCount}
              label="Project Categories"
              accent="#34d399"
            />
          </div>
        </motion.div>

        <motion.div
          className="projects-marquee-section"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <TechMarquee techs={marqueeTechs} />
        </motion.div>

        <motion.div
          className="projects-toolbar"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          <div className="projects-toolbar-head">
            <div>
              <h3>Explore Projects</h3>
              <p>
                Search, filter, and sort projects by technology, category, and relevance.
              </p>
            </div>

            <div className="projects-toolbar-badge">
              <FaFilter />
              Smart Filters
            </div>
          </div>

          <div className="projects-search-wrap">
            <FaSearch className="projects-search-icon" />
            <input
              className="projects-search"
              type="text"
              placeholder="Search by title, description, category, or technology..."
              value={searchTerm}
              onChange={(e) => resetAndSet(setSearchTerm, e.target.value)}
            />
          </div>

          <div className="projects-filters-grid">
            <div>
              <div className="projects-filter-title">
                <FaLayerGroup />
                Technology
              </div>
              <div className="projects-chip-group">
                {allTechs.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => resetAndSet(setSelectedTech, tech)}
                    className={`projects-chip ${selectedTech === tech ? 'active' : ''}`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="projects-filter-title">Category</div>
              <div className="projects-chip-group">
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => resetAndSet(setSelectedCategory, category)}
                    className={`projects-chip ${selectedCategory === category ? 'active' : ''}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="projects-sort-wrap">
              <label htmlFor="sortProjects">Sort By</label>
              <select
                id="sortProjects"
                value={sortBy}
                onChange={(e) => resetAndSet(setSortBy, e.target.value)}
              >
                <option value="Featured">Featured First</option>
                <option value="A-Z">Title A-Z</option>
                <option value="Category">Category</option>
              </select>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedTech}-${selectedCategory}-${searchTerm}-${sortBy}`}
            className="projects-grid"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
          >
            {visibleProjects.length > 0 ? (
              visibleProjects.map((project, idx) => (
                <motion.article
                  key={`${project.title}-${idx}`}
                  variants={cardMotion}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  className="projects-card-gradient"
                >
                  <div className="projects-card">
                    <div className="projects-card-image-wrap">
                      {project.featured && (
                        <span className="projects-card-featured">
                          <FaStar />
                          Featured
                        </span>
                      )}

                      {project.category && (
                        <span className="projects-card-category">{project.category}</span>
                      )}

                      <img src={project.image} alt={project.title} loading="lazy" />
                      <div className="projects-card-image-overlay" />
                    </div>

                    <div className="projects-card-content">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>

                      <div className="projects-card-techs">
                        {project.technologies?.map((tech) => (
                          <span key={tech} className="projects-tech-badge">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="projects-card-links">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="projects-link-btn"
                          >
                            <FaGithub />
                            GitHub
                          </a>
                        )}

                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="projects-link-btn primary"
                          >
                            <FaExternalLinkAlt />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="projects-empty">
                <FaCode style={{ fontSize: '1.4rem', marginBottom: 12, color: '#7dd3fc' }} />
                <h3>No matching projects found</h3>
                <p style={{ margin: 0, lineHeight: 1.8 }}>
                  Try changing the technology, category, or search keyword.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length > visibleCount && (
          <div className="projects-load-more-wrap">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="projects-load-more"
            >
              Load More Projects
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;