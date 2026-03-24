import React, { useEffect, useMemo, useState } from "react";
import {
  FaCode,
  FaPalette,
  FaPlug,
  FaRocket,
  FaServer,
  FaLightbulb,
  FaPaperPlane,
  FaArrowRight,
  FaCheckCircle,
  FaGem,
  FaLayerGroup,
  FaChartLine,
} from "react-icons/fa";

const services = [
  {
    title: "Full-Stack Web Development",
    description:
      "End-to-end development of modern web applications using MERN or Java/Spring Boot with scalable architecture, secure APIs, and production-focused implementation.",
    tag: "Engineering",
    icon: <FaCode />,
    color: "#4cc9f0",
  },
  {
    title: "UI/UX Design",
    description:
      "Crafting intuitive and visually refined interfaces with strong focus on usability, accessibility, wireframing, prototyping, and modern interaction patterns.",
    tag: "Design",
    icon: <FaPalette />,
    color: "#72efdd",
  },
  {
    title: "API Integration",
    description:
      "Reliable REST API design and integration for seamless communication between frontend, backend, databases, and third-party systems.",
    tag: "Integration",
    icon: <FaPlug />,
    color: "#38bdf8",
  },
  {
    title: "Performance Optimization",
    description:
      "Improving load times, responsiveness, code quality, and SEO through optimization strategies, lazy loading, efficient rendering, and frontend best practices.",
    tag: "Optimization",
    icon: <FaRocket />,
    color: "#60a5fa",
  },
  {
    title: "Deployment & Hosting",
    description:
      "Deployment pipelines and hosting workflows with Vercel, Render, and production-ready release practices including CI/CD and version control discipline.",
    tag: "Deployment",
    icon: <FaServer />,
    color: "#4361ee",
  },
  {
    title: "Technical Consulting",
    description:
      "Strategic support for architecture decisions, stack selection, code reviews, product direction, and technical planning for scalable digital solutions.",
    tag: "Consulting",
    icon: <FaLightbulb />,
    color: "#4cc9f0",
  },
];

const stats = [
  {
    value: 6,
    suffix: "+",
    label: "Core Services",
    icon: <FaLayerGroup />,
  },
  {
    value: 100,
    suffix: "%",
    label: "Premium Focus",
    icon: <FaGem />,
  },
  {
    value: 24,
    suffix: "/7",
    label: "Execution Mindset",
    icon: <FaChartLine />,
  },
];

const initialFormState = {
  name: "",
  email: "",
  service: "",
  message: "",
};

const AnimatedCounter = ({ end, suffix = "", duration = 1400 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame;
    let startTime;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(end * eased);
      setCount(current);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const Services = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeField, setActiveField] = useState("");

  const serviceTitles = useMemo(() => services.map((item) => item.title), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData(initialFormState);
  };

  const styles = {
    section: {
      position: "relative",
      padding: "110px 20px",
      overflow: "hidden",
      background:
        "radial-gradient(circle at top left, rgba(76,201,240,0.10), transparent 22%), radial-gradient(circle at top right, rgba(67,97,238,0.12), transparent 24%), radial-gradient(circle at bottom center, rgba(114,239,221,0.08), transparent 24%), linear-gradient(180deg, #06101d 0%, #081221 45%, #091525 100%)",
      fontFamily:
        'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },

    blurA: {
      position: "absolute",
      left: "-50px",
      top: "60px",
      width: "260px",
      height: "260px",
      borderRadius: "999px",
      background: "rgba(76, 201, 240, 0.12)",
      filter: "blur(95px)",
      pointerEvents: "none",
    },

    blurB: {
      position: "absolute",
      right: "-70px",
      bottom: "20px",
      width: "300px",
      height: "300px",
      borderRadius: "999px",
      background: "rgba(67, 97, 238, 0.12)",
      filter: "blur(105px)",
      pointerEvents: "none",
    },

    container: {
      maxWidth: "1280px",
      margin: "0 auto",
      position: "relative",
      zIndex: 2,
    },

    heroShell: {
      position: "relative",
      padding: "1px",
      borderRadius: "32px",
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(76,201,240,0.16), rgba(67,97,238,0.14), rgba(255,255,255,0.04))",
      boxShadow: "0 24px 60px rgba(0,0,0,0.24)",
      marginBottom: "30px",
    },

    heroCard: {
      position: "relative",
      padding: "34px",
      borderRadius: "31px",
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.12)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      overflow: "hidden",
    },

    heroGlow: {
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.08), transparent 30%), linear-gradient(315deg, rgba(255,255,255,0.04), transparent 35%)",
      pointerEvents: "none",
    },

    badgeRow: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: "16px",
    },

    pill: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "9px 14px",
      borderRadius: "999px",
      background: "rgba(255,255,255,0.07)",
      border: "1px solid rgba(255,255,255,0.12)",
      color: "#f8fbff",
      fontSize: "0.84rem",
      fontWeight: 700,
    },

    pillDot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #72efdd, #4cc9f0)",
      boxShadow: "0 0 12px rgba(76,201,240,0.5)",
    },

    title: {
      position: "relative",
      zIndex: 1,
      margin: "0 0 12px",
      color: "#f8fbff",
      fontSize: "clamp(2.2rem, 5vw, 4rem)",
      fontWeight: 900,
      lineHeight: 1.05,
      letterSpacing: "-0.04em",
      maxWidth: "860px",
    },

    titleAccent: {
      background: "linear-gradient(90deg, #ffffff, #72efdd, #4cc9f0)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },

    intro: {
      position: "relative",
      zIndex: 1,
      margin: 0,
      maxWidth: "760px",
      color: "#b8c4d6",
      fontSize: "1rem",
      lineHeight: 1.9,
    },

    statsGrid: {
      position: "relative",
      zIndex: 1,
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "16px",
      marginTop: "26px",
    },

    statOuter: {
      padding: "1px",
      borderRadius: "22px",
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(76,201,240,0.16), rgba(255,255,255,0.04))",
    },

    statCard: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      padding: "18px",
      borderRadius: "21px",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.10)",
    },

    statIcon: {
      width: "48px",
      height: "48px",
      borderRadius: "15px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1rem",
      color: "#72efdd",
      background: "rgba(76,201,240,0.12)",
      border: "1px solid rgba(76,201,240,0.18)",
      flexShrink: 0,
    },

    statValue: {
      margin: "0 0 4px",
      color: "#f8fbff",
      fontSize: "1.5rem",
      fontWeight: 900,
      lineHeight: 1,
    },

    statLabel: {
      margin: 0,
      color: "#b8c4d6",
      fontSize: "0.9rem",
      lineHeight: 1.5,
    },

    sectionHeader: {
      textAlign: "center",
      margin: "56px auto 28px",
      maxWidth: "740px",
    },

    sectionTitle: {
      margin: "0 0 12px",
      color: "#f8fbff",
      fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
      fontWeight: 850,
      letterSpacing: "-0.03em",
    },

    sectionText: {
      margin: 0,
      color: "#b8c4d6",
      lineHeight: 1.8,
      fontSize: "0.98rem",
    },

    servicesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "22px",
      marginBottom: "58px",
    },

    cardOuter: {
      padding: "1px",
      borderRadius: "28px",
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(76,201,240,0.16), rgba(67,97,238,0.10), rgba(255,255,255,0.04))",
      transition: "all 0.28s ease",
    },

    card: {
      position: "relative",
      height: "100%",
      padding: "26px",
      borderRadius: "27px",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.10)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      boxShadow: "0 16px 34px rgba(0,0,0,0.16)",
      overflow: "hidden",
      transition: "all 0.28s ease",
    },

    cardGlow: (color) => ({
      position: "absolute",
      top: "-24px",
      right: "-12px",
      width: "120px",
      height: "120px",
      borderRadius: "999px",
      background: `${color}20`,
      filter: "blur(38px)",
      pointerEvents: "none",
    }),

    cardTop: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "12px",
      marginBottom: "16px",
    },

    iconWrap: (color) => ({
      width: "54px",
      height: "54px",
      borderRadius: "16px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color,
      fontSize: "1.1rem",
      background: `${color}18`,
      border: `1px solid ${color}40`,
      boxShadow: `0 10px 24px ${color}18`,
      flexShrink: 0,
    }),

    number: {
      color: "rgba(255,255,255,0.24)",
      fontSize: "0.92rem",
      fontWeight: 900,
      letterSpacing: "0.08em",
    },

    tag: {
      position: "relative",
      zIndex: 1,
      display: "inline-flex",
      padding: "8px 12px",
      borderRadius: "999px",
      background: "rgba(255,255,255,0.07)",
      border: "1px solid rgba(255,255,255,0.10)",
      color: "#dce9f8",
      fontSize: "0.78rem",
      fontWeight: 700,
      marginBottom: "14px",
    },

    cardTitle: {
      position: "relative",
      zIndex: 1,
      margin: "0 0 12px",
      color: "#f8fbff",
      fontSize: "1.2rem",
      fontWeight: 800,
      lineHeight: 1.35,
    },

    cardDesc: {
      position: "relative",
      zIndex: 1,
      margin: 0,
      color: "#b8c4d6",
      fontSize: "0.95rem",
      lineHeight: 1.8,
    },

    cardFooter: {
      position: "relative",
      zIndex: 1,
      marginTop: "22px",
      paddingTop: "16px",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "10px",
    },

    cardFooterText: {
      color: "#dce9f8",
      fontSize: "0.9rem",
      fontWeight: 700,
    },

    contactOuter: {
      padding: "1px",
      borderRadius: "32px",
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(76,201,240,0.18), rgba(67,97,238,0.12), rgba(255,255,255,0.04))",
      boxShadow: "0 22px 50px rgba(0,0,0,0.20)",
    },

    contactCard: {
      padding: "32px",
      borderRadius: "31px",
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.12)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      position: "relative",
      overflow: "hidden",
    },

    contactGlow: {
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.08), transparent 30%), linear-gradient(315deg, rgba(255,255,255,0.04), transparent 35%)",
      pointerEvents: "none",
    },

    contactGrid: {
      position: "relative",
      zIndex: 1,
      display: "grid",
      gridTemplateColumns: "0.95fr 1.05fr",
      gap: "28px",
    },

    leftTitle: {
      margin: "0 0 12px",
      color: "#f8fbff",
      fontSize: "1.95rem",
      fontWeight: 850,
      lineHeight: 1.15,
    },

    leftText: {
      margin: "0 0 20px",
      color: "#b8c4d6",
      lineHeight: 1.85,
      fontSize: "0.98rem",
    },

    chipWrap: {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
    },

    chip: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 14px",
      borderRadius: "999px",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.10)",
      color: "#dce9f8",
      fontSize: "0.86rem",
      fontWeight: 700,
    },

    form: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },

    formRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "14px",
    },

    fieldWrap: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },

    label: {
      color: "#f8fbff",
      fontSize: "0.9rem",
      fontWeight: 700,
    },

    input: (active) => ({
      width: "100%",
      boxSizing: "border-box",
      padding: "14px 16px",
      borderRadius: "16px",
      background: active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.06)",
      border: active
        ? "1px solid rgba(76,201,240,0.28)"
        : "1px solid rgba(255,255,255,0.12)",
      boxShadow: active ? "0 0 0 4px rgba(76,201,240,0.06)" : "none",
      color: "#ffffff",
      fontSize: "0.95rem",
      outline: "none",
      transition: "all 0.2s ease",
    }),

    textarea: (active) => ({
      width: "100%",
      boxSizing: "border-box",
      minHeight: "150px",
      resize: "vertical",
      padding: "14px 16px",
      borderRadius: "16px",
      background: active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.06)",
      border: active
        ? "1px solid rgba(76,201,240,0.28)"
        : "1px solid rgba(255,255,255,0.12)",
      boxShadow: active ? "0 0 0 4px rgba(76,201,240,0.06)" : "none",
      color: "#ffffff",
      fontSize: "0.95rem",
      outline: "none",
      transition: "all 0.2s ease",
    }),

    button: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      marginTop: "4px",
      padding: "15px 18px",
      borderRadius: "16px",
      border: "1px solid rgba(76,201,240,0.18)",
      background: "linear-gradient(135deg, #4361ee, #4cc9f0)",
      color: "#ffffff",
      fontSize: "0.95rem",
      fontWeight: 800,
      cursor: "pointer",
      boxShadow: "0 14px 28px rgba(67,97,238,0.24)",
      transition: "all 0.28s ease",
    },

    success: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "14px 16px",
      borderRadius: "16px",
      background: "rgba(114,239,221,0.10)",
      border: "1px solid rgba(114,239,221,0.16)",
      color: "#dffcf6",
      fontSize: "0.92rem",
      fontWeight: 700,
    },
  };

  return (
    <>
      <style>
        {`
          .premium-service-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 22px 38px rgba(76,201,240,0.10);
            border-color: rgba(76,201,240,0.18);
          }

          .premium-service-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 18px 34px rgba(67,97,238,0.30);
          }

          input::placeholder,
          textarea::placeholder,
          select {
            color: #9db0c6;
          }

          @media (max-width: 1040px) {
            .premium-services-stats,
            .premium-services-contact {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 760px) {
            .premium-services-row {
              grid-template-columns: 1fr !important;
            }

            .premium-services-shell {
              padding: 86px 14px !important;
            }

            .premium-services-hero,
            .premium-services-contact-card {
              padding: 22px !important;
            }
          }
        `}
      </style>

      <section style={styles.section} className="premium-services-shell" id="services">
        <div style={styles.blurA} />
        <div style={styles.blurB} />

        <div style={styles.container}>
          <div style={styles.heroShell}>
            <div style={styles.heroCard} className="premium-services-hero">
              <div style={styles.heroGlow} />

              <div style={styles.badgeRow}>
                <span style={styles.pill}>
                  <span style={styles.pillDot} />
                  Premium Services
                </span>
                <span style={styles.pill}>
                  <FaGem />
                  Luxury Dark Glass UI
                </span>
              </div>

              <h2 style={styles.title}>
                Services designed with a{" "}
                <span style={styles.titleAccent}>premium digital standard</span>
              </h2>

              <p style={styles.intro}>
                I create polished digital solutions that combine elegant interface design,
                strong engineering structure, smooth user experience, and production-ready
                execution. The result is a portfolio-grade, client-ready, and visually
                elevated product experience.
              </p>

              <div style={styles.statsGrid} className="premium-services-stats">
                {stats.map((item, index) => (
                  <div key={index} style={styles.statOuter}>
                    <div style={styles.statCard}>
                      <div style={styles.statIcon}>{item.icon}</div>
                      <div>
                        <p style={styles.statValue}>
                          <AnimatedCounter end={item.value} suffix={item.suffix} />
                        </p>
                        <p style={styles.statLabel}>{item.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>What I Offer</h3>
            <p style={styles.sectionText}>
              Each service is presented with a refined luxury visual identity,
              gradient-bordered glass cards, premium iconography, and modern interaction polish.
            </p>
          </div>

          <div style={styles.servicesGrid}>
            {services.map((service, index) => {
              const hovered = hoveredCard === index;

              return (
                <div
                  key={index}
                  style={{
                    ...styles.cardOuter,
                    transform: hovered ? "translateY(-6px)" : "translateY(0)",
                    boxShadow: hovered ? `0 20px 36px ${service.color}18` : "none",
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <article
                    style={{
                      ...styles.card,
                      border: hovered
                        ? `1px solid ${service.color}30`
                        : "1px solid rgba(255,255,255,0.10)",
                    }}
                    className="premium-service-card"
                  >
                    <div style={styles.cardGlow(service.color)} />

                    <div style={styles.cardTop}>
                      <div style={styles.iconWrap(service.color)}>{service.icon}</div>
                      <span style={styles.number}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <span style={styles.tag}>{service.tag}</span>

                    <h3 style={styles.cardTitle}>{service.title}</h3>
                    <p style={styles.cardDesc}>{service.description}</p>

                    <div style={styles.cardFooter}>
                      <span style={styles.cardFooterText}>Premium execution</span>
                      <FaArrowRight style={{ color: "#f8fbff" }} />
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          <div style={styles.contactOuter}>
            <div
              style={styles.contactCard}
              className="premium-services-contact-card"
            >
              <div style={styles.contactGlow} />

              <div style={styles.contactGrid} className="premium-services-contact">
                <div>
                  <span style={styles.pill}>
                    <FaPaperPlane />
                    Start a Project
                  </span>

                  <h3 style={styles.leftTitle}>Interested in a Service?</h3>
                  <p style={styles.leftText}>
                    Share your idea, business requirement, or project scope. I can help
                    transform it into a polished and modern digital solution with premium
                    visual quality and strong technical execution.
                  </p>

                  <div style={styles.chipWrap}>
                    <span style={styles.chip}>
                      <FaCheckCircle />
                      Web Applications
                    </span>
                    <span style={styles.chip}>
                      <FaCheckCircle />
                      UI/UX Systems
                    </span>
                    <span style={styles.chip}>
                      <FaCheckCircle />
                      API Solutions
                    </span>
                    <span style={styles.chip}>
                      <FaCheckCircle />
                      Deployment Support
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                  <div style={styles.formRow} className="premium-services-row">
                    <div style={styles.fieldWrap}>
                      <label htmlFor="name" style={styles.label}>
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setActiveField("name")}
                        onBlur={() => setActiveField("")}
                        required
                        style={styles.input(activeField === "name")}
                      />
                    </div>

                    <div style={styles.fieldWrap}>
                      <label htmlFor="email" style={styles.label}>
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setActiveField("email")}
                        onBlur={() => setActiveField("")}
                        required
                        style={styles.input(activeField === "email")}
                      />
                    </div>
                  </div>

                  <div style={styles.fieldWrap}>
                    <label htmlFor="service" style={styles.label}>
                      Service Type
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      onFocus={() => setActiveField("service")}
                      onBlur={() => setActiveField("")}
                      required
                      style={styles.input(activeField === "service")}
                    >
                      <option value="">Select a service</option>
                      {serviceTitles.map((title) => (
                        <option key={title} value={title} style={{ color: "#0f172a" }}>
                          {title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.fieldWrap}>
                    <label htmlFor="message" style={styles.label}>
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Describe the service you are interested in..."
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setActiveField("message")}
                      onBlur={() => setActiveField("")}
                      required
                      style={styles.textarea(activeField === "message")}
                    />
                  </div>

                  <button
                    type="submit"
                    style={styles.button}
                    className="premium-service-button"
                  >
                    <FaPaperPlane />
                    Send Message
                  </button>

                  {submitted && (
                    <div style={styles.success}>
                      <FaCheckCircle />
                      Message sent successfully. I’ll contact you shortly.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;