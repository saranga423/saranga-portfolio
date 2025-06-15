import React from "react";
import "../styles/Home.css";
import profileImg from "../assets/profile.png";

const Home = () => (
  <main className="home" role="main" aria-label="Home page">
    {/* Intro Section */}
    <section className="home-content" aria-label="Introduction">
      <div className="home-text">
        <h1>Hello, I'm Saranga</h1>
        <p>
          A MERN Stack Developer passionate about building web apps & user
          interfaces.
        </p>
        <a href="/projects" className="cta" aria-label="View My Projects">
          View My Projects
        </a>
      </div>
      <div className="home-image" aria-label="Profile Picture">
        <img src={profileImg} alt="Saranga Rasingolla" />
      </div>
    </section>

    {/* What I Do */}
    <section className="home-section" aria-labelledby="what-i-do-heading">
      <h2 id="what-i-do-heading">What I Do</h2>
      <p>
        From full-stack engineering to deploying AI-driven solutions — I bring
        ideas to life with design, logic, and strategy. I build fast,
        accessible, and scalable applications with a strong focus on UI/UX.
      </p>
    </section>

    {/* Featured Projects */}
    <section className="home-section" aria-labelledby="featured-projects-heading">
      <h2 id="featured-projects-heading">Featured Projects</h2>
      <ul>
        <li>
          <strong>TravelXpert</strong> – AI-powered hotel and trip booking system
          (MERN, Google Maps API)
        </li>
        <li>
          <strong>Mini TopJobs</strong> – Job listing portal with admin panel
          (React, Context API)
        </li>
      </ul>
      <a href="/projects" className="cta small" aria-label="See More Projects">
        See More Projects
      </a>
    </section>

    {/* Publications */}
    <section className="home-section" aria-labelledby="publications-heading">
      <h2 id="publications-heading">Publications</h2>
      <ul>
        <li>
          <a
            href="https://medium.com/@rasingollasaranga35/how-agile-is-reshaping-project-delivery-in-2025-63a91a8028c8"
            target="_blank"
            rel="noopener noreferrer"
          >
            How Agile is Reshaping Project Delivery in 2025
          </a>{" "}
          – Insights into the future of Agile methodologies.
        </li>
      </ul>
    </section>

    {/* Certificates */}
    <section className="home-section" aria-labelledby="certificates-heading">
      <h2 id="certificates-heading">Certificates</h2>
      <ul>
        <li>Full-Stack Web Development – University of Moratuwa</li>
        <li>Python for Beginners – University of Moratuwa</li>
        
      </ul>
    </section>

    {/* Skills */}
    <section className="home-section" aria-labelledby="skills-heading">
      <h2 id="skills-heading">Skills</h2>
      <ul className="skills-list">
        <li>
          <strong>Frontend:</strong> React, JavaScript, HTML5, CSS3
        </li>
        <li>
          <strong>Backend:</strong> Node.js, Express
        </li>
        <li>
          <strong>Database:</strong> MongoDB, SQL
        </li>
        <li>
          <strong>Tools & Platforms:</strong> Git, Docker, Postman, VS Code
        </li>
        <li>
          <strong>Testing:</strong> Jest, Mocha
        </li>
        <li>
          <strong>Deployment:</strong> Heroku, Netlify, Vercel
        </li>
      </ul>
    </section>

    

    {/* Contact / Call to Action */}
    <section className="home-section contact-section" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Get In Touch</h2>
      <p>
        Interested in collaborating or want to say hello? Reach out via{" "}
        <a href="mailto:saranga@example.com">email</a> or connect with me on{" "}
        <a
          href="https://linkedin.com/in/sarangarasingolla"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        .
      </p>
    </section>
  </main>
);

export default Home;
