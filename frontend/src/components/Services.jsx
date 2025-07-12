import React, { useState } from 'react';
import '../styles/Services.css';

const services = [
  {
    title: 'Full-Stack Web Development',
    description:
      'End-to-end development of web applications using the MERN stack or Java/Spring Boot. Clean code, scalable architecture, and responsive designs.',
  },
  {
    title: 'UI/UX Design',
    description:
      'Crafting user-friendly interfaces with a focus on accessibility, usability, and modern trends. Experienced in using Figma for wireframes and prototypes.',
  },
  {
    title: 'API Integration',
    description:
      'RESTful API design and integration for seamless front-end/back-end communication, third-party services, and scalable microservices.',
  },
  {
    title: 'Performance Optimization',
    description:
      'Improving load times, responsiveness, and SEO through optimized code, lazy loading, and best practices.',
  },
  {
    title: 'Deployment & Hosting',
    description:
      'Deploying applications using platforms like Render, Vercel, or custom hosting solutions. CI/CD setup and Git version control.',
  },
  {
    title: 'Technical Consulting',
    description:
      'Guiding clients or teams through architectural decisions, tech stack choices, or codebase reviews.',
  },
];

const Services = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="services-section">
      <div className="services-container">
        <h2 className="services-title">My Services</h2>
        <p className="services-intro">
          I offer a range of services that turn ideas into powerful digital solutions.
        </p>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="contact-form-container">
          <h3>Interested in a Service?</h3>
          <p>Fill out the form below and I’ll get back to you soon!</p>

          <form onSubmit={handleSubmit} className="service-form">
  <input
    type="text"
    name="name"
    placeholder="Your Name"
    value={formData.name}
    onChange={handleChange}
    required
  />
  <input
    type="email"
    name="email"
    placeholder="Your Email"
    value={formData.email}
    onChange={handleChange}
    required
  />
  <textarea
    name="message"
    placeholder="Describe the service you're interested in..."
    value={formData.message}
    onChange={handleChange}
    required
  />
  <button type="submit" className="form-button">Send Message</button>
  {submitted && <p className="success-msg">Message sent! I’ll contact you shortly.</p>}
</form>

        </div>
      </div>
    </section>
  );
};

export default Services;
