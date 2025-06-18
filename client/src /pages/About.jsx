import React, { useState } from "react";
import "../styles/About.css";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const About = () => {
  const [showCertificates, setShowCertificates] = useState(true);
  const [showPublications, setShowPublications] = useState(true);
  const [showAchievements, setShowAchievements] = useState(true);

  const toggleSection = (section) => {
    if (section === "certificates") setShowCertificates(!showCertificates);
    if (section === "publications") setShowPublications(!showPublications);
    if (section === "achievements") setShowAchievements(!showAchievements);
  };

  const highlights = [
    {
      text: "Final-year Undergraduate – BSc (Hons) in IT at",
      link: { label: "SLIIT", url: "https://www.sliit.lk/" },
    },
    { text: "2+ years hands-on experience with the MERN Stack" },
    { text: "Published on Medium: Agile, Dev Trends" },
    { text: "Passionate about AI, UI/UX, and cloud platforms" },
    { text: "Marketing Trainee at",
      link: { label: "Artsy Lens Studio", url: "https://web.facebook.com/ArtsyLensStudioOnly" },
    },
    { text: "Alumna of Mahamaya Girls' College, Kandy" },
    { text: "Committee member at SLIIT Interactive Society - 2022" },
    { text: "Senior Team member in Chess Club of Mahamaya Girls' College, Kandy" },
    {
      text: "Committee Member of",
      link: {
        label: "Astronomical Society of Mahamaya Girls' College, Kandy",
        url: "https://mahamayagirlscollege.lk/y",
      },
    },
    {
      text: "Committee Member of",
      link: {
        label: "Senior Science Society of Mahamaya Girls' College, Kandy",
        url: "https://mahamayagirlscollege.lk/y",
      },
    },
  ];

  const certificates = [
    { title: "Front-End Web Development – University of Moratuwa", link: "https://open.uom.lk/lms/mod/customcert/verify_certificate.php" },
    { title: "Web Design for Beginners – University of Moratuwa", link: "https://open.uom.lk/lms/mod/customcert/verify_certificate.php" },
    { title: "Python for Beginners – University of Moratuwa", link: "https://open.uom.lk/lms/mod/customcert/verify_certificate.php" },
    { title: "AI/ML Engineer – Stage 1 – SLIIT", link: "https://verify.example.com/aiml-sliit" },
    { title: "HTML Course – Sololearn", link: "https://www.sololearn.com/en/learn" },
    { title: "SQL Course – Sololearn", link: "https://www.sololearn.com/en/learn" },
    { title: "Java Course – Sololearn", link: "https://www.sololearn.com/en/learn" },
    { title: "Google Analytics for Beginners – Google", link: "https://analytics.google.com/analytics/academy/certificate/abc123" },
  ];

  const ToggleHeading = ({ title, isOpen, onClick }) => (
    <button className="toggle-heading" onClick={onClick} aria-expanded={isOpen}>
      {title}
      <span className="toggle-icon">
        {isOpen ? <FaChevronDown /> : <FaChevronRight />}
      </span>
    </button>
  );

  return (
    <main className="about-container">
      {/* About Me */}
      <section className="home-section about-section" aria-labelledby="about-heading">
        <h2 id="about-heading">About Me</h2>
        <p>
          I’m <strong>Saranga Rasingolla</strong>, a MERN Stack Developer and final-year undergraduate at <strong>SLIIT</strong>. I'm passionate about crafting meaningful, scalable web applications and integrating emerging technologies into real-world solutions.
        </p>
        <p>
          I bring strong experience with the <strong>MERN Stack</strong> alongside a deep interest in design thinking, AI-enhanced systems, and modern web architecture.
        </p>
      </section>

      {/* Professional Highlights */}
      <section className="home-section" aria-labelledby="highlights-heading">
        <h3 id="highlights-heading">Professional Highlights</h3>
        <ul className="about-list">
          {highlights.map((item, idx) => (
            <li key={idx}>
              {item.text}{" "}
              {item.link && (
                <a href={item.link.url} target="_blank" rel="noopener noreferrer">
                  {item.link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Achievements */}
      <section className="home-section">
        <ToggleHeading
          title="Achievements"
          isOpen={showAchievements}
          onClick={() => toggleSection("achievements")}
        />
        {showAchievements && (
          <ul className="about-list collapse-section open">
            <li>Built full-stack hotel reservation platform using MERN + OpenAI</li>
            <li>Selected as a Research Assistant candidate (Software Metrics)</li>
            <li>Promoted brand visibility through digital strategy at Artsy Lens</li>
          </ul>
        )}
      </section>

      {/* Publications */}
      <section className="home-section">
        <ToggleHeading
          title="Publications"
          isOpen={showPublications}
          onClick={() => toggleSection("publications")}
        />
        {showPublications && (
          <ul className="about-list collapse-section open">
            <li>
              <a
                href="https://medium.com/@rasingollasaranga35/how-agile-is-reshaping-project-delivery-in-2025-63a91a8028c8"
                target="_blank"
                rel="noopener noreferrer"
              >
                How Agile is Reshaping Project Delivery in 2025
              </a>{" "}
              – Agile’s role in future software development practices.
            </li>
          </ul>
        )}
      </section>

      {/* Certificates */}
      <section className="home-section">
        <ToggleHeading
          title="Certificates"
          isOpen={showCertificates}
          onClick={() => toggleSection("certificates")}
        />
        {showCertificates && (
          <div className="certificates-grid collapse-section open">
            {certificates.map((cert, idx) => (
              <div key={idx} className="certificate-card">
                <p>{cert.title}</p>
                <a href={cert.link} target="_blank" rel="noopener noreferrer">
                  Verify
                </a>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default About;
