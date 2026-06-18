import React, { useState, useCallback } from "react";
import { motion, useScroll } from "framer-motion";
import { FiArrowUp, FiGithub, FiLinkedin, FiTwitter, FiMail, FiMapPin, FiClock, FiFigma } from "react-icons/fi";
import { SiWhatsapp } from "react-icons/si";

// Types
interface SocialLinkProps {
  Icon: React.ElementType;
  href: string;
  label: string;
}
interface NavLinkProps {
  label: string;
  href: string;
}
interface ScrollRingProps {
  onClick: () => void;
}

// Constants
const EMAIL = "rasingollasaranga35@gmail.com";

const SOCIALS: SocialLinkProps[] = [
  { Icon: FiGithub, href: "https://github.com/saranga423", label: "GitHub" },
  { Icon: FiLinkedin, href: "https://www.linkedin.com/in/saranga-rasingolla-2a6287249/", label: "LinkedIn" },
  { Icon: FiFigma, href: "https://www.figma.com/design/1Ztnoqf3BdIWeFx5auJtC1/SARANGA-RASINGOLLA?node-id=0-1&t=es4NbOk5z90BWbag-00", label: "Figma" },
  { Icon: FiMail, href: `mailto:${EMAIL}`, label: "Email" },
  { Icon: SiWhatsapp, href: "https://wa.me/94703572917", label: "WhatsApp" },
];

const NAV_LINKS: NavLinkProps[] = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const MARQUEE_ITEMS = [
  "available for work",
  "full-stack engineer",
  "React · Node.js · TypeScript",
  "Colombo · Sri Lanka",
  "Open to Remote",
  "2026 Engagements",
];

// Components

// Live Clock Component
const LiveClock: React.FC = () => {
  const [time, setTime] = React.useState<string>("");

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(istTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span style={{
      fontFamily: "Courier New, monospace",
      fontSize: 10,
      letterSpacing: "0.15em",
      color: "rgba(237,224,204,0.55)",
    }}>
      {time || "Loading..."}
    </span>
  );
};

// Scroll to Top Button with appearance control
const ScrollRing: React.FC<ScrollRingProps> = ({ onClick }) => {
  const { scrollYProgress } = useScroll();
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scrolling down 300px
  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate stroke offset
  const strokeOffset = circumference - scrollYProgress.get() * circumference;

  if (!isVisible) return null;

  return (
    <motion.button
      aria-label="Back to top"
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      style={{
        position: "fixed",
        bottom: 40,
        right: 40,
        width: 56,
        height: 56,
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <svg
        width={56}
        height={56}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: "rotate(-90deg)",
        }}
      >
        {/* Track */}
        <circle
          cx={28}
          cy={28}
          r={radius}
          fill="none"
          stroke="rgba(237,224,204,0.08)"
          strokeWidth={1.5}
        />
        {/* Progress */}
        <circle
          cx={28}
          cy={28}
          r={radius}
          fill="none"
          stroke="#9EC6F3"
          strokeWidth={1.5}
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.2s linear" }}
        />
      </svg>
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ color: "#9EC6F3" }}
      >
        <FiArrowUp size={16} />
      </motion.div>
    </motion.button>
  );
};

// Marquee component with seamless loop
const MarqueeStrip: React.FC = () => {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]; // double for seamless loop
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(237,224,204,0.07)",
        borderBottom: "1px solid rgba(237,224,204,0.07)",
        padding: "11px 0",
        position: "relative",
      }}
    >
      {/* Fade edges for overlay effect */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background:
            "linear-gradient(to right, #0E0C0A, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background:
            "linear-gradient(to left, #0E0C0A, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      {/* Moving marquee */}
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{
          display: "flex",
          whiteSpace: "nowrap",
        }}
      >
        {items.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "Courier New, monospace",
                fontSize: 10,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(237,224,204,0.28)",
                padding: "0 32px",
              }}
            >
              {item}
            </span>
            <span style={{ color: "#9EC6F3", fontSize: 8, opacity: 0.5 }}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// Main Footer Component
export function Footer() {
  const handleScrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{ position: "relative", background: "#0A0806", overflow: "hidden" }}>
      {/* Ember glow background for aesthetic */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 300,
          background:
            "radial-gradient(ellipse, rgba(158,198,243,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background:
            "linear-gradient(90deg, transparent 0%, #9EC6F3 40%, #BDDDE4 60%, transparent 100%)",
          opacity: 0.6,
        }}
      />

      {/* Marquee strip */}
      <MarqueeStrip />

      {/* Main Content Grid */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "72px 48px 0",
        }}
      >
        {/* Headline & Call to Action */}
        <AnimatedHeadline />

        {/* Info Sections: Contact, Navigation, Location & Socials */}
        <InfoGrid />
      </div>

      {/* Bottom bar with copyright & back-to-top */}
      <BottomBar onScrollToTop={handleScrollToTop} />
    </footer>
  );
}

// Sub-components

const AnimatedHeadline: React.FC = () => {
  const letters = "Let's talk.".split("");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: 56 }}
    >
      <p style={{
        fontFamily: "Courier New, monospace",
        fontSize: 9,
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        color: "rgba(237,224,204,0.3)",
        marginBottom: 16,
      }}>— Have a project in mind?</p>
      {/* Letter hover animation */}
      <h2 style={{
        fontFamily: "'Times New Roman', serif",
        fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
        fontWeight: 700,
        lineHeight: 0.88,
        letterSpacing: "-0.03em",
        margin: 0,
        display: "flex",
        flexWrap: "wrap",
        cursor: "default",
      }}>
        {letters.map((char, i) => (
          <motion.span
            key={i}
            onHoverStart={() => setHoverIndex(i)}
            onHoverEnd={() => setHoverIndex(null)}
            animate={{
              color:
                hoverIndex === i
                  ? "#9EC6F3"
                  : char === "."
                  ? "#9EC6F3"
                  : hoverIndex !== null && Math.abs(hoverIndex - i) === 1
                  ? "#BDDDE4"
                  : "#FFF1D5",
              y: hoverIndex === i ? -6 : 0,
            }}
            transition={{ duration: 0.18 }}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </h2>
    </motion.div>
  );
};

const InfoGrid: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.15 }}
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: 48,
      paddingBottom: 56,
      borderBottom: "1px solid rgba(237,224,204,0.07)",
    }}
  >
    <ContactInfo />
    <NavigationLinks />
    <LocationSocials />
  </motion.div>
);

const ContactInfo: React.FC = () => (
  <div>
    <p style={{
      fontFamily: "Courier New, monospace",
      fontSize: 9,
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      color: "rgba(237,224,204,0.3)",
      marginBottom: 16,
    }}>§ Direct</p>
    {/* Email CTA */}
    <a
      href={`mailto:${EMAIL}`}
      style={{
        fontFamily: "'Times New Roman', serif",
        fontSize: 15,
        fontStyle: "italic",
        color: "rgba(237,224,204,0.65)",
        textDecoration: "none",
        display: "block",
        marginBottom: 20,
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#9EC6F3")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(237,224,204,0.65)")}
    >
      {EMAIL} ↗
    </a>
  </div>
);

const NavigationLinks: React.FC = () => (
  <div>
    <p style={{
      fontFamily: "Courier New, monospace",
      fontSize: 9,
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      color: "rgba(237,224,204,0.3)",
      marginBottom: 16,
    }}>§ Navigation</p>
    {NAV_LINKS.map(({ label, href }) => (
      <motion.a
        key={label}
        href={href}
        style={{
          fontFamily: "'Times New Roman', serif",
          fontSize: 16,
          fontStyle: "italic",
          color: "rgba(237,224,204,0.45)",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
        whileHover={{ x: 6 }}
      >
        <span style={{ fontSize: 10, color: "#9EC6F3", opacity: 0.6 }}>→</span>
        {label}
      </motion.a>
    ))}
  </div>
);

const LocationSocials: React.FC = () => (
  <div>
    {/* Location + Time + Availability Badge + Social icons */}
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
      <FiMapPin size={12} color="rgba(212,162,84,0.7)" />
      <span style={{
        fontFamily: "Courier New, monospace",
        fontSize: 11,
        letterSpacing: "0.15em",
        color: "rgba(237,224,204,0.45)",
      }}>Colombo, Sri Lanka</span>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
      <FiClock size={12} color="rgba(212,162,84,0.7)" />
      <span style={{ color: "rgba(237,224,204,0.35)" }}>
        <LiveClock />
        <span style={{
          fontFamily: "Courier New, monospace",
          fontSize: 10,
          letterSpacing: "0.15em",
          color: "rgba(237,224,204,0.25)",
          marginLeft: 6,
        }}>IST</span>
      </span>
    </div>
    {/* Availability Badge */}
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 12px",
      border: "1px solid rgba(158,198,243,0.25)",
      background: "rgba(158,198,243,0.06)",
    }}>
      <span style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "#9EC6F3",
        display: "inline-block",
        animation: "pulse 2s ease-in-out infinite",
      }} />
      <span style={{
        fontFamily: "Courier New, monospace",
        fontSize: 10,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "#9EC6F3",
      }}>Open to work</span>
    </div>
    {/* Social Icons */}
    <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
      {SOCIALS.map(({ Icon, href, label }) => (
        <motion.a
          key={label}
          href={href}
          title={label}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -3, scale: 1.1 }}
          style={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(237,224,204,0.1)",
            color: "rgba(237,224,204,0.4)",
            borderRadius: "50%",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <Icon size={14} />
        </motion.a>
      ))}
    </div>
  </div>
);

const BottomBar: React.FC<{ onScrollToTop: () => void }> = ({ onScrollToTop }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 0 32px",
      }}
    >
      {/* Left: Copyright info */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <span style={{
          fontFamily: "Courier New, monospace",
          fontSize: 10,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(237,224,204,0.25)",
        }}>© 2026 Saranga Rasingolla</span>
        <div style={{ width: 1, height: 12, background: "rgba(237,224,204,0.1)" }} />
        <span style={{
          fontFamily: "Courier New, monospace",
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(237,224,204,0.2)",
        }}>Built with React · TypeScript</span>
      </div>
      {/* Right: Back to top */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{
          fontFamily: "Courier New, monospace",
          fontSize: 9,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(237,224,204,0.2)",
        }}>Back to top</span>
        <ScrollRing onClick={onScrollToTop} />
      </div>
    </motion.div>
  );
};