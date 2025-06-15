import React from "react";
import "../styles/Contact.css";

const Contact = () => (
  <section className="contact">
    <h2>Contact Me</h2>
    <form action="https://formspree.io/f/your-form-id" method="POST">
      <input type="text" name="name" placeholder="Your Name" required />
      <input type="email" name="email" placeholder="Your Email" required />
      <textarea name="message" placeholder="Your Message" required></textarea>
      <button type="submit">Send</button>
    </form>

    <div className="contact-info">
      <h3>Or reach me here:</h3>
      <ul>
        <li>Email: <a href="mailto:saranga@example.com">saranga@example.com</a></li>
        <li>LinkedIn: <a href="https://linkedin.com/in/saranga-rasingolla-2a6287249" target="_blank" rel="noreferrer">https://www.linkedin.com/in/saranga-rasingolla-2a6287249</a></li>
        <li>GitHub: <a href="https://github.com/saranga-rasingolla" target="_blank" rel="noreferrer">github.com/saranga-rasingolla</a></li>
        <li>Phone: <a href="tel:+94712345678">+94 71 234 5678</a></li>
      </ul>
    </div>
  </section>
);

export default Contact;
