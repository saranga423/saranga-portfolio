import React from "react";
import "../styles/Home.css";
import profileImg from "../assets/profile.png";

const Home = () => (
  <main className="home" role="main" aria-label="Home page">
    {/* Intro Section */}
    <section className="home-content" aria-label="Introduction">
      <div className="home-text">
        <h1 tabIndex={0}>Hello, I'm Saranga</h1>
       <p>
  As an enthusiastic undergraduate pursuing my degree, I have built a solid foundation in Full Stack development, 
  enhanced by hands-on experience through innovative projects.
</p>
<p>
  I am driven by a passion for continuous learning and excited to apply my academic insights to solve real-world challenges with creativity and precision.
</p>
<p>
  Combining strong interpersonal and communication skills, I am actively seeking opportunities that promote both personal growth and professional development, where I can make meaningful contributions while advancing my studies.
</p>

        <a
          href="/projects"
          className="cta"
          aria-label="View My Projects"
          tabIndex={0}
        >
          View My Projects
        </a>
      </div>
      <div className="home-image" aria-label="Profile Picture">
        <img src={profileImg} alt="Portrait of Saranga Rasingolla" />
      </div>
    </section>

    {/* What I Do */}
    {/* What I Do */}
<section className="home-section" aria-labelledby="what-i-do-heading">
  <h2 id="what-i-do-heading" tabIndex={0}>What I Do</h2>
  <p>
    I develop responsive websites and dynamic user interfaces, focusing on clean design and smooth user experiences.
    I enjoy transforming ideas into reality through code and collaboration.
  </p>
</section>


    {/* Featured Projects */}
    <section className="home-section" aria-labelledby="featured-projects-heading">
      <h2 id="featured-projects-heading" tabIndex={0}>Featured Projects</h2>
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
      <a
        href="/projects"
        className="cta small"
        aria-label="See More Projects"
        tabIndex={0}
      >
        See More Projects
      </a>
    </section>
  </main>
);

export default Home;
