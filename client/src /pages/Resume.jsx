import React from "react";
import "../styles/Resume.css";

const Resume = () => (
  <section className="resume" aria-label="Resume Section">
    <h1>My Resume</h1>

    <p>
      Download my latest resume here:{" "}
      <a href="/resume.pdf" download className="btn" aria-label="Download Resume PDF">
        Download Resume
      </a>
    </p>
  </section>
  
);

export default Resume;
