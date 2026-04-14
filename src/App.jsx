import { useState, useEffect } from "react";

const COLORS = {
  bg: "#070D1A",
  bgCard: "#0D1526",
  bgCardHover: "#111E33",
  accent: "#00C896",
  accentDim: "#00C89622",
  gold: "#F0A500",
  text: "#E8F0FE",
  textMuted: "#7A8FA6",
  border: "#1A2840",
};

const projects = [
  {
    name: "TRACE",
    full: "Transaction Risk & Anomaly Classification Engine",
    desc: "Real-time fraud detection system processing financial transactions using event-driven microservices. Features a weighted rule-based risk engine with 5 fraud detection rules, JWT auth, and real-time Kafka event streaming.",
    tech: ["Java 17", "Spring Boot 3.2", "Kafka", "Redis", "PostgreSQL", "MongoDB", "Docker", "Spring Security 6", "Eureka", "JWT"],
    github: "https://github.com/ritik-hedau18/TRACE-Transaction-Risk-and-Anomaly-Classification-Engine",
    highlight: true,
    tag: "Microservices",
  },
  {
    name: "FoodFlow",
    full: "Food Delivery Backend API",
    desc: "Production-ready REST API for a food delivery platform. Supports full order lifecycle, cart management with lazy-load optimised queries, role-based access, and JWT-secured endpoints.",
    tech: ["Java", "Spring Boot 3", "PostgreSQL", "Spring Security", "JWT", "JPA", "Hibernate"],
    github: "https://github.com/ritik-hedau18/food-delivery-backend",
    highlight: false,
    tag: "REST API",
  },
  {
    name: "MediCore",
    full: "Hospital Management System",
    desc: "Multi-role hospital management platform with ADMIN, DOCTOR, and PATIENT access control. Includes appointment scheduling, patient records management, and a fully secured JWT authentication layer.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Spring Security", "JWT", "Lombok", "ModelMapper"],
    github: "https://github.com/ritik-hedau18",
    highlight: false,
    tag: "Full Stack",
  },
];

const skills = {
  "Backend": ["Java 17", "Spring Boot 3", "Spring Security 6", "Spring Cloud", "REST APIs", "Microservices", "JWT", "Hibernate", "JPA"],
  "Messaging & Cache": ["Apache Kafka", "Redis", "Event-Driven Architecture"],
  "Databases": ["PostgreSQL", "MySQL", "MongoDB"],
  "DevOps & Tools": ["Docker", "Git", "GitHub", "Postman", "IntelliJ IDEA"],
  "Frontend": ["React", "JavaScript", "HTML5", "CSS3"],
};

const navLinks = ["About", "Skills", "Projects", "Contact"];

function useScrollSpy() {
  const [active, setActive] = useState("About");
  useEffect(() => {
    const handler = () => {
      const sections = navLinks.map(n => document.getElementById(n.toLowerCase()));
      let found = "About";
      sections.forEach(s => {
        if (s && window.scrollY >= s.offsetTop - 120) found = s.id.charAt(0).toUpperCase() + s.id.slice(1);
      });
      setActive(found);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Portfolio() {
  const active = useScrollSpy();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Fira+Code:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("ritikhedau18@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const s = {
    root: {
      background: COLORS.bg,
      color: COLORS.text,
      fontFamily: "'DM Sans', sans-serif",
      minHeight: "100vh",
      overflowX: "hidden",
    },
    nav: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 5%",
      height: 64,
      background: "rgba(7,13,26,0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${COLORS.border}`,
    },
    logo: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 700,
      fontSize: 20,
      color: COLORS.accent,
      letterSpacing: "-0.5px",
    },
    navLinks: { display: "flex", gap: 8 },
    navLink: (isActive) => ({
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "6px 14px",
      borderRadius: 6,
      fontSize: 14,
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 400,
      color: isActive ? COLORS.accent : COLORS.textMuted,
      background: isActive ? COLORS.accentDim : "transparent",
      transition: "all 0.2s",
    }),
    hero: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      padding: "80px 5% 40px",
      position: "relative",
      overflow: "hidden",
    },
    heroInner: { maxWidth: 720, position: "relative", zIndex: 2 },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      background: COLORS.accentDim,
      border: `1px solid ${COLORS.accent}44`,
      borderRadius: 20,
      padding: "5px 14px",
      fontSize: 13,
      color: COLORS.accent,
      marginBottom: 28,
      fontFamily: "'Fira Code', monospace",
    },
    dot: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: COLORS.accent,
      animation: "pulse 2s infinite",
    },
    h1: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "clamp(42px, 6vw, 72px)",
      fontWeight: 800,
      lineHeight: 1.05,
      margin: "0 0 6px",
      letterSpacing: "-2px",
      color: COLORS.text,
    },
    h1Accent: { color: COLORS.accent },
    tagline: {
      fontSize: "clamp(18px, 2.5vw, 24px)",
      fontWeight: 300,
      color: COLORS.textMuted,
      margin: "0 0 24px",
      letterSpacing: "0.5px",
    },
    heroBio: {
      fontSize: 16,
      lineHeight: 1.75,
      color: COLORS.textMuted,
      maxWidth: 560,
      margin: "0 0 40px",
    },
    heroBtns: { display: "flex", gap: 14, flexWrap: "wrap" },
    btnPrimary: {
      background: COLORS.accent,
      color: "#070D1A",
      border: "none",
      borderRadius: 8,
      padding: "12px 28px",
      fontSize: 15,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "'DM Sans', sans-serif",
      transition: "opacity 0.2s",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
    },
    btnOutline: {
      background: "transparent",
      color: COLORS.text,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 8,
      padding: "12px 28px",
      fontSize: 15,
      fontWeight: 400,
      cursor: "pointer",
      fontFamily: "'DM Sans', sans-serif",
      transition: "all 0.2s",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
    },
    heroBg: {
      position: "absolute",
      top: "10%",
      right: "-5%",
      width: "55%",
      aspectRatio: "1",
      background: `radial-gradient(circle at 60% 40%, ${COLORS.accent}15 0%, transparent 65%)`,
      borderRadius: "50%",
      pointerEvents: "none",
    },
    gridPattern: {
      position: "absolute",
      inset: 0,
      backgroundImage: `linear-gradient(${COLORS.border}44 1px, transparent 1px), linear-gradient(90deg, ${COLORS.border}44 1px, transparent 1px)`,
      backgroundSize: "40px 40px",
      opacity: 0.4,
      zIndex: 1,
      maskImage: "radial-gradient(ellipse at 30% 50%, black 20%, transparent 75%)",
    },
    section: {
      padding: "80px 5%",
      maxWidth: 1100,
      margin: "0 auto",
    },
    sectionLabel: {
      fontFamily: "'Fira Code', monospace",
      fontSize: 13,
      color: COLORS.accent,
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: 12,
    },
    sectionTitle: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "clamp(28px, 4vw, 40px)",
      fontWeight: 700,
      letterSpacing: "-1px",
      margin: "0 0 48px",
      color: COLORS.text,
    },
    aboutGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 48,
      alignItems: "start",
    },
    aboutText: { fontSize: 16, lineHeight: 1.8, color: COLORS.textMuted },
    aboutStats: { display: "flex", flexDirection: "column", gap: 16 },
    statCard: {
      background: COLORS.bgCard,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 12,
      padding: "20px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    statNum: {
      fontFamily: "'Syne', sans-serif",
      fontSize: 32,
      fontWeight: 700,
      color: COLORS.accent,
    },
    statLabel: { fontSize: 13, color: COLORS.textMuted, marginTop: 2 },
    skillsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: 20,
    },
    skillGroup: {
      background: COLORS.bgCard,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 12,
      padding: "20px 20px 16px",
    },
    skillGroupTitle: {
      fontSize: 12,
      fontFamily: "'Fira Code', monospace",
      color: COLORS.accent,
      letterSpacing: 1.5,
      textTransform: "uppercase",
      marginBottom: 14,
    },
    skillTags: { display: "flex", flexWrap: "wrap", gap: 8 },
    skillTag: {
      background: "#111E33",
      border: `1px solid ${COLORS.border}`,
      borderRadius: 6,
      padding: "4px 10px",
      fontSize: 12.5,
      color: COLORS.textMuted,
    },
    projectsGrid: { display: "flex", flexDirection: "column", gap: 24 },
    projectCard: (highlight) => ({
      background: COLORS.bgCard,
      border: `1px solid ${highlight ? COLORS.accent + "55" : COLORS.border}`,
      borderRadius: 16,
      padding: "28px 28px 24px",
      position: "relative",
      overflow: "hidden",
      transition: "border-color 0.2s, background 0.2s",
    }),
    projectTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 },
    projectTag: (highlight) => ({
      fontSize: 11,
      fontFamily: "'Fira Code', monospace",
      letterSpacing: 1,
      textTransform: "uppercase",
      color: highlight ? COLORS.accent : COLORS.gold,
      background: highlight ? COLORS.accentDim : "#F0A50015",
      border: `1px solid ${highlight ? COLORS.accent + "44" : COLORS.gold + "44"}`,
      borderRadius: 4,
      padding: "3px 10px",
    }),
    projectName: {
      fontFamily: "'Syne', sans-serif",
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: "-0.5px",
      color: COLORS.text,
      margin: "4px 0 4px",
    },
    projectFull: { fontSize: 13, color: COLORS.textMuted, marginBottom: 12 },
    projectDesc: { fontSize: 15, lineHeight: 1.7, color: COLORS.textMuted, marginBottom: 20 },
    projectTechs: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 },
    techBadge: {
      background: "#0D1526",
      border: `1px solid ${COLORS.border}`,
      borderRadius: 6,
      padding: "3px 10px",
      fontSize: 12,
      color: "#A8C0D6",
      fontFamily: "'Fira Code', monospace",
    },
    projectLink: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      color: COLORS.accent,
      textDecoration: "none",
      fontSize: 14,
      fontWeight: 500,
      transition: "gap 0.2s",
    },
    contactBox: {
      background: COLORS.bgCard,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 20,
      padding: "48px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },
    contactTitle: {
      fontFamily: "'Syne', sans-serif",
      fontSize: 36,
      fontWeight: 700,
      letterSpacing: "-1px",
      marginBottom: 12,
      color: COLORS.text,
    },
    contactSub: { fontSize: 16, color: COLORS.textMuted, marginBottom: 36 },
    contactLinks: { display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" },
    footer: {
      textAlign: "center",
      padding: "24px 5%",
      borderTop: `1px solid ${COLORS.border}`,
      color: COLORS.textMuted,
      fontSize: 13,
    },
  };

  return (
    <div style={s.root}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        body { margin: 0; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #070D1A; }
        ::-webkit-scrollbar-thumb { background: #1A2840; border-radius: 3px; }
        a:hover { opacity: 0.8; }
      `}</style>

      {/* NAV */}
      <nav style={s.nav}>
        <span style={s.logo}>RH<span style={{ color: COLORS.accent }}>.</span></span>
        <div style={s.navLinks}>
          {navLinks.map(l => (
            <button key={l} style={s.navLink(active === l)} onClick={() => scrollTo(l.toLowerCase())}>{l}</button>
          ))}
        </div>
        <a href="https://github.com/ritik-hedau18" target="_blank" rel="noreferrer" style={{ ...s.btnOutline, padding: "7px 16px", fontSize: 13 }}>
          GitHub
        </a>
      </nav>

      {/* HERO */}
      <section style={s.hero}>
        <div style={s.gridPattern} />
        <div style={s.heroBg} />
        <div style={s.heroInner}>
          <div style={s.badge}>
            <span style={s.dot} />
            Open to Java Developer roles
          </div>
          <h1 style={s.h1}>
            Hi, I'm <span style={s.h1Accent}>Ritik</span><br />Hedau
          </h1>
          <p style={s.tagline}>Java Full Stack Developer</p>
          <p style={s.heroBio}>
            Building scalable, production-grade backend systems using Java & Spring Boot. I specialize in microservices architecture, event-driven systems with Kafka, and clean REST API design.
          </p>
          <div style={s.heroBtns}>
            <button style={s.btnPrimary} onClick={() => scrollTo("projects")}>View Projects →</button>
            <a href="https://drive.google.com/file/d/1eqa1iSJhsC1adpBS1eyyAsApL7TRcmbH/view?usp=drivesdk" target="_blank" rel="noreferrer" style={s.btnOutline}>↓ Resume</a>
            <button style={s.btnOutline} onClick={() => scrollTo("contact")}>Contact Me</button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: COLORS.bgCard, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={s.section}>
          <div style={s.sectionLabel}>// about me</div>
          <h2 style={s.sectionTitle}>Background</h2>
          <div style={s.aboutGrid}>
            <div>
              <p style={s.aboutText}>
                I'm a B.Tech graduate from RGPV University with hands-on experience building production-grade Java backend systems. I've worked across the full backend stack — from designing secure REST APIs and JWT-based auth systems to building event-driven microservices with Kafka and Redis.
              </p>
              <p style={{ ...s.aboutText, marginTop: 16 }}>
                My flagship project TRACE is a real-time fraud detection system built with Spring Cloud microservices, Kafka event streaming, and Redis — the kind of architecture used in real fintech companies.
              </p>
              <p style={{ ...s.aboutText, marginTop: 16 }}>
                I care deeply about clean architecture, scalable system design, and writing backend code that is maintainable, testable, and built to last.
              </p>
            </div>
            <div style={s.aboutStats}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                <img
                  src="https://avatars.githubusercontent.com/u/250507116?v=4"
                  alt="Ritik Hedau"
                  style={{ width: 120, height: 120, borderRadius: "50%", border: `3px solid ${COLORS.accent}`, objectFit: "cover", display: "block" }}
                />
              </div>
              {[
                { num: "5+", label: "Production-grade Projects" },
                { num: "30+", label: "Technologies & Tools" },
                { num: "20+", label: "Microservices Built" },
                { num: "2+", label: "Years of Hands-on Java" },
              ].map(stat => (
                <div key={stat.label} style={s.statCard}>
                  <div>
                    <div style={s.statNum}>{stat.num}</div>
                    <div style={s.statLabel}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div style={s.section}>
          <div style={s.sectionLabel}>// tech stack</div>
          <h2 style={s.sectionTitle}>Skills & Technologies</h2>
          <div style={s.skillsGrid}>
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} style={s.skillGroup}>
                <div style={s.skillGroupTitle}>{group}</div>
                <div style={s.skillTags}>
                  {items.map(s2 => <span key={s2} style={s.skillTag}>{s2}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ background: COLORS.bgCard, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={s.section}>
          <div style={s.sectionLabel}>// work</div>
          <h2 style={s.sectionTitle}>Projects</h2>
          <div style={s.projectsGrid}>
            {projects.map(p => (
              <div key={p.name} style={s.projectCard(p.highlight)}>
                <div style={s.projectTop}>
                  <span style={s.projectTag(p.highlight)}>{p.tag}</span>
                  {p.highlight && <span style={{ fontSize: 12, color: COLORS.accent, fontFamily: "'Fira Code', monospace" }}>★ Featured</span>}
                </div>
                <div style={s.projectName}>{p.name}</div>
                <div style={s.projectFull}>{p.full}</div>
                <p style={s.projectDesc}>{p.desc}</p>
                <div style={s.projectTechs}>
                  {p.tech.map(t => <span key={t} style={s.techBadge}>{t}</span>)}
                </div>
                <a href={p.github} target="_blank" rel="noreferrer" style={s.projectLink}>
                  View on GitHub →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div style={{ ...s.section, paddingBottom: 100 }}>
          <div style={s.sectionLabel}>// contact</div>
          <h2 style={{ ...s.sectionTitle, marginBottom: 0 }}>Let's Connect</h2>
          <div style={{ height: 40 }} />
          <div style={s.contactBox}>
            <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: "60%", height: "60%", background: `radial-gradient(circle, ${COLORS.accent}10 0%, transparent 70%)`, pointerEvents: "none" }} />
            <p style={s.contactTitle}>Open to Opportunities</p>
            <p style={s.contactSub}>Looking for Java Full Stack Developer roles. Let's talk.</p>
            <div style={s.contactLinks}>
              <button style={{ ...s.btnPrimary, cursor: "pointer" }} onClick={copyEmail}>
                {copied ? "✓ Copied!" : "Copy Email"}
              </button>
              <a href="tel:+918269519161" style={s.btnOutline}>📞 +91 82695 19161</a>{/* ← LINE 494 — PHONE NUMBER */}
              <a href="https://github.com/ritik-hedau18" target="_blank" rel="noreferrer" style={s.btnOutline}>GitHub</a>
              <a href="https://www.linkedin.com/in/ritik-hedau-4b51b2203/" target="_blank" rel="noreferrer" style={s.btnOutline}>LinkedIn</a>
            </div>
            <p style={{ ...s.contactSub, marginTop: 24, marginBottom: 0, fontSize: 14 }}>
              📍 Nagpur, Maharashtra, India
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={s.footer}>
        <span>Built by <span style={{ color: COLORS.accent }}>Ritik Hedau</span> — Java Full Stack Developer</span>
      </footer>
    </div>
  );
}
