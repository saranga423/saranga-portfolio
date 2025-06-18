import React from "react";
import "../styles/Projects.css";

const projects = [
  {
    title: "TravelXpert",
    tech: "MERN, Google Maps API, OpenAI",
    desc: "An AI-powered travel reservation system featuring hotel & trip booking, map integration, and smart itinerary planning.",
    code: "https://github.com/saranga423/saranga-portfolio.git",
    demo: "https://github.com/saranga423/saranga-portfolio.git"
  },
  {
    title: "My Portfolio",
    tech: "MERN",
    desc: "MERN Stack Developer | Final-year IT Undergraduate | Passionate about AI, UI/UX & Scalable Web Solutions",
    code: "https://github.com/yourusername/travelxpert",
    demo: "https://travelxpert.vercel.app"
  },
  {
    title: "Mini TopJobs",
    tech: "React, Context API, Node.js",
    desc: "A modern job portal with a full-featured admin panel and job listing system for employers and job seekers.",
    code: "https://github.com/yourusername/minitopjobs",
    demo: "#"
  },
  {
    title: "Online Learning Platform",
    tech: "Spring Boot, React, MySQL",
    desc: "Platform for students to create learning plans, share skills, and manage personal development goals.",
    code: "https://github.com/yourusername/learning-platform",
    demo: "#"
  },
  {
    title: "PetCare System",
    tech: "MERN Stack",
    desc: "Special project focused on pet clinic appointments, pet profiles, and care tracking for pet owners.",
    code: "https://github.com/yourusername/petcare-system",
    demo: "#"
  },
  {
    title: "Gym Management System",
    tech: "MERN Stack",
    desc: "System to manage gym members, attendance tracking, and workout plans for trainers and clients.",
    code: "https://github.com/yourusername/gym-management",
    demo: "#"
  },
  {
    title: "Photography Studio Website",
    tech: "React, CSS, Responsive Design",
    desc: "Showcase website for Artsylens Studio with portfolio gallery, client testimonials, and contact form.",
    code: "https://github.com/yourusername/photography-studio",
    demo: "#"
  },
  {
    title: "AI Chatbot UI",
    tech: "React, Context API",
    desc: "Minimal chatbot interface built with React for interacting with GPT-style backend services.",
    code: "https://github.com/yourusername/ai-chatbot-ui",
    demo: "#"
  }
];

const Projects = () => (
  <section className="projects">
    <h2>Projects</h2>
    <div className="project-list">
      {projects.map((p, index) => (
        <div className="project-card" key={index}>
          <h3>{p.title}</h3>
          <p><strong>Tech:</strong> {p.tech}</p>
          <p>{p.desc}</p>
          <div className="project-links">
            {p.demo !== "#" && (
              <a href={p.demo} target="_blank" rel="noreferrer" className="btn">
                Live Demo
              </a>
            )}
            <a href={p.code} target="_blank" rel="noreferrer" className="btn secondary">
              Code
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Projects;
