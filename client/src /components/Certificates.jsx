import React from "react";
import "../styles/Certificates.css";

const certificates = [
  {
    title: "Full Stack Web Development - Coursera",
    file: "/certificates/fullstack-coursera.pdf",
  },
  {
    title: "JavaScript Algorithms - freeCodeCamp",
    file: "/certificates/javascript-freecodecamp.pdf",
  },
  {
    title: "React Developer Nanodegree - Udacity",
    file: "/certificates/react-udacity.pdf",
  },
];

const Certificates = () => (
  <section className="certificates" aria-labelledby="certificates-heading">
    <h2 id="certificates-heading" tabIndex={0}>Certificates & Badges</h2>
    <ul className="certificates-list">
      {certificates.map(({ title, file }, idx) => (
        <li key={idx} className="certificate-item">
          <a
            href={file}
            target="_blank"
            rel="noopener noreferrer"
            download
            aria-label={`Download certificate for ${title}`}
          >
            {title}
          </a>
        </li>
      ))}
    </ul>
  </section>
);

export default Certificates;
