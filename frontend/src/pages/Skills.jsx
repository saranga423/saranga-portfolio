import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FaCode,
  FaDatabase,
  FaTools,
  FaUsers,
  FaLayerGroup,
  FaSearch,
  FaStar,
  FaChartLine,
  FaLaptopCode,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaFigma,
  FaNodeJs,
  FaJava,
  FaGitAlt,
  FaGithub,
  FaServer,
  FaToolbox,
  FaCogs,
  FaMobileAlt,
  FaLeaf,
  FaMicrochip,
} from 'react-icons/fa';
import {
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiPostman,
  SiFlutter,
  SiDart,
  SiArduino,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

const skillsData = [
  {
    category: 'Frontend Development',
    icon: <FaLayerGroup aria-hidden="true" />,
    description: 'Building responsive, interactive, and modern user interfaces.',
    accent: '#4cc9f0',
    skills: [
      { name: 'React.js', level: 90, icon: <FaReact /> },
      { name: 'HTML5', level: 95, icon: <FaHtml5 /> },
      { name: 'CSS3', level: 90, icon: <FaCss3Alt /> },
      { name: 'JavaScript (ES6+)', level: 88, icon: <FaJs /> },
      { name: 'Figma (UI Design)', level: 85, icon: <FaFigma /> },
      { name: 'Responsive Design', level: 92, icon: <FaLaptopCode /> },
    ],
  },
  {
    category: 'Backend Development',
    icon: <FaCode aria-hidden="true" />,
    description: 'Designing APIs, server-side logic, and scalable backend solutions.',
    accent: '#4361ee',
    skills: [
      { name: 'Node.js', level: 85, icon: <FaNodeJs /> },
      { name: 'Express.js', level: 82, icon: <SiExpress /> },
      { name: 'Java', level: 80, icon: <FaJava /> },
      { name: 'Spring Boot', level: 78, icon: <FaServer /> },
      { name: 'RESTful APIs', level: 87, icon: <FaCode /> },
    ],
  },
  {
    category: 'Mobile Development',
    icon: <FaMobileAlt aria-hidden="true" />,
    description: 'Creating cross-platform mobile applications with high performance.',
    accent: '#02569B',
    skills: [
      { name: 'Flutter', level: 88, icon: <SiFlutter /> },
      { name: 'Dart', level: 85, icon: <SiDart /> },
      { name: 'State Management', level: 84, icon: <FaCogs /> },
      { name: 'Firebase', level: 80, icon: <FaDatabase /> },
    ],
  },
  {
    category: 'IoT & Precision Ag',
    icon: <FaLeaf aria-hidden="true" />,
    description: 'Specialized focus on smart systems and environmental monitoring.',
    accent: '#72efdd',
    skills: [
      { name: 'IoT Integration', level: 85, icon: <FaMicrochip /> },
      { name: 'Arduino/ESP32', level: 82, icon: <SiArduino /> },
      { name: 'Sensor Data Fusion', level: 80, icon: <FaChartLine /> },
      { name: 'Computer Vision', level: 75, icon: <FaCode /> },
    ],
  },
  {
    category: 'Tools & Platforms',
    icon: <FaTools aria-hidden="true" />,
    description: 'Workflow optimization and deployment tools.',
    accent: '#f59e0b',
    skills: [
      { name: 'Git & GitHub', level: 90, icon: <FaGithub /> },
      { name: 'VS Code', level: 95, icon: <VscVscode /> },
      { name: 'Postman', level: 85, icon: <SiPostman /> },
      { name: 'Render / Vercel', level: 80, icon: <FaToolbox /> },
    ],
  },
  {
    category: 'Soft Skills',
    icon: <FaUsers aria-hidden="true" />,
    description: 'Professional execution and collaborative teamwork.',
    accent: '#f472b6',
    skills: [
      { name: 'Problem Solving', level: 90, icon: <FaStar /> },
      { name: 'Team Collaboration', level: 88, icon: <FaUsers /> },
      { name: 'Time Management', level: 85, icon: <FaChartLine /> },
    ],
  },
];

const experienceTabs = [
  { key: 'All', label: 'All Levels' },
  { key: 'Advanced', label: 'Advanced' },
  { key: 'Strong', label: 'Strong' },
  { key: 'Good', label: 'Good' },
  { key: 'Intermediate', label: 'Intermediate' },
];

const getLevelLabel = (level) => {
  if (level >= 90) return 'Advanced';
  if (level >= 80) return 'Strong';
  if (level >= 70) return 'Good';
  return 'Intermediate';
};

const Counter = ({ end, suffix = '', duration = 1400, start }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.round(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [start, end, duration]);
  return <span>{count}{suffix}</span>;
};

const CircularSkillChart = ({ value, accent, label }) => {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (value / 100) * circumference;
  const gradientId = `grad-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div style={{ width: '104px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <svg width="92" height="92" viewBox="0 0 92 92">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accent} />
            <stop offset="100%" stopColor="#72efdd" />
          </linearGradient>
        </defs>
        <circle cx="46" cy="46" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
        <circle cx="46" cy="46" r={radius} fill="none" stroke={`url(#${gradientId})`} strokeWidth="9" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset} transform="rotate(-90 46 46)" style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
        <text x="46" y="52" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="800">{value}%</text>
      </svg>
      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#b8c4d6', textAlign: 'center' }}>{label}</div>
    </div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('All');
  const [hasEntered, setHasEntered] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setHasEntered(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const clearFilters = () => {
    setSearchTerm('');
    setActiveCategory('All');
    setExperienceFilter('All');
  };

  const categories = useMemo(() => ['All', ...skillsData.map(d => d.category)], []);

  const filteredData = useMemo(() => {
    return skillsData
      .filter(g => activeCategory === 'All' || g.category === activeCategory)
      .map(g => ({
        ...g,
        skills: g.skills.filter(s => {
          const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesLevel = experienceFilter === 'All' || getLevelLabel(s.level) === experienceFilter;
          return matchesSearch && matchesLevel;
        })
      }))
      .filter(g => g.skills.length > 0);
  }, [activeCategory, searchTerm, experienceFilter]);

  const allSkills = useMemo(() => skillsData.flatMap(g => g.skills), []);
  const averageLevel = Math.round(allSkills.reduce((a, b) => a + b.level, 0) / allSkills.length);
  const topSkills = useMemo(() => [...allSkills].sort((a, b) => b.level - a.level).slice(0, 4), [allSkills]);

  const styles = {
    page: { padding: '80px 20px', background: '#030712', color: '#fff', fontFamily: 'Inter, sans-serif' },
    container: { maxWidth: '1200px', margin: '0 auto' },
    hero: { background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '30px' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' },
    statCard: { padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' },
    toolbar: { padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', marginBottom: '30px', border: '1px solid rgba(255,255,255,0.1)' },
    searchInput: { width: '100%', padding: '15px 45px', borderRadius: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none', marginBottom: '20px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' },
    card: { background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' },
    emptyState: { textAlign: 'center', padding: '60px', background: 'rgba(255,255,255,0.02)', borderRadius: '30px', border: '1px dashed rgba(255,255,255,0.2)' }
  };

  return (
    <section style={styles.page} id="skills" ref={sectionRef}>
      <div style={styles.container}>
        {/* Header Section */}
        <div style={styles.hero} className="fade-in">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>Expertise & Stack</h2>
          <p style={{ color: '#94a3b8', maxWidth: '700px', marginTop: '10px' }}>
            A comprehensive look at my technical landscape, ranging from full-stack web development to specialized IoT solutions for precision agriculture.
          </p>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <h3 style={{ color: '#4cc9f0', margin: 0 }}><Counter end={allSkills.length} start={hasEntered} /></h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Total Skills</p>
            </div>
            <div style={styles.statCard}>
              <h3 style={{ color: '#72efdd', margin: 0 }}><Counter end={averageLevel} suffix="%" start={hasEntered} /></h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Avg. Proficiency</p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div style={styles.toolbar}>
          <div style={{ position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', left: '18px', top: '18px', color: '#64748b' }} />
            <input 
              style={styles.searchInput} 
              placeholder="Search by technology (e.g. React, Flutter, IoT)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)',
                  background: activeCategory === cat ? '#4cc9f0' : 'transparent',
                  color: activeCategory === cat ? '#000' : '#fff', cursor: 'pointer', fontWeight: 600
                }}
              >{cat}</button>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        {filteredData.length > 0 ? (
          <div style={styles.grid}>
            {filteredData.map((group) => (
              <div key={group.category} style={styles.card}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <div style={{ padding: '10px', background: `${group.accent}22`, borderRadius: '12px', color: group.accent }}>
                    {group.icon}
                  </div>
                  <h3 style={{ margin: 0 }}>{group.category}</h3>
                </div>
                {group.skills.map((skill) => (
                  <div key={skill.name} style={{ marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                      <span>{skill.name}</span>
                      <span style={{ color: '#72efdd' }}>{skill.level}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: hasEntered ? `${skill.level}%` : '0%', 
                        height: '100%', background: group.accent, transition: '1.5s cubic-bezier(0.4, 0, 0.2, 1)' 
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <h3>No results found for "{searchTerm}"</h3>
            <p style={{ color: '#64748b' }}>Try different keywords or reset the filters.</p>
            <button 
              onClick={clearFilters}
              style={{ marginTop: '15px', padding: '10px 20px', background: '#4cc9f0', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
            >Reset Filters</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;