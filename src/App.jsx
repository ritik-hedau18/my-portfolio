import { useState, useEffect, useRef } from "react";

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
];

const skills = {
  "Backend": ["Java 17", "Spring Boot 3", "Spring Security 6", "Spring Cloud", "REST APIs", "Microservices", "JWT", "Hibernate", "JPA"],
  "Messaging & Cache": ["Apache Kafka", "Redis", "Event-Driven Architecture"],
  "Databases": ["PostgreSQL", "MySQL", "MongoDB"],
  "DevOps & Tools": ["Docker", "Git", "GitHub", "Postman", "IntelliJ IDEA"],
  "Frontend": ["React", "JavaScript", "TypeScript", "HTML5", "CSS3"],
};

const navLinks = ["About", "Skills", "Projects", "Experience", "Contact"];


function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

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


function TypedText({ text }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [text]);
  return (
    <span>
      {displayed}
      <span style={{ borderRight: "2px solid #00C896", marginLeft: 2, animation: "blink 1s step-end infinite" }}></span>
    </span>
  );
}

function ProjectCard({ p, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn delay={index * 0.12}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? COLORS.bgCardHover : COLORS.bgCard,
          border: `1px solid ${p.highlight ? (hovered ? COLORS.accent : COLORS.accent + "55") : (hovered ? COLORS.border + "ff" : COLORS.border)}`,
          borderRadius: 16,
          padding: "28px 28px 24px",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered ? `0 12px 40px ${p.highlight ? COLORS.accent + "22" : "#00000044"}` : "none",
          cursor: "default",
        }}
      >
        {p.highlight && (
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
          }} />
        )}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <span style={{
            fontSize: 11, fontFamily: "'Fira Code', monospace", letterSpacing: 1,
            textTransform: "uppercase",
            color: p.highlight ? COLORS.accent : COLORS.gold,
            background: p.highlight ? COLORS.accentDim : "#F0A50015",
            border: `1px solid ${p.highlight ? COLORS.accent + "44" : COLORS.gold + "44"}`,
            borderRadius: 4, padding: "3px 10px",
          }}>{p.tag}</span>
          {p.highlight && <span style={{ fontSize: 12, color: COLORS.accent, fontFamily: "'Fira Code', monospace" }}>★ Featured</span>}
        </div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px", color: COLORS.text, margin: "4px 0 4px" }}>{p.name}</div>
        <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 12 }}>{p.full}</div>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.textMuted, marginBottom: 20 }}>{p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          {p.tech.map(t => (
            <span key={t} style={{
              background: "#0D1526", border: `1px solid ${COLORS.border}`,
              borderRadius: 6, padding: "3px 10px", fontSize: 12,
              color: "#A8C0D6", fontFamily: "'Fira Code', monospace",
            }}>{t}</span>
          ))}
        </div>
        <a href={p.github} target="_blank" rel="noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          color: COLORS.accent, textDecoration: "none", fontSize: 14, fontWeight: 500,
          transition: "gap 0.2s",
        }}>
          View on GitHub →
        </a>
      </div>
    </FadeIn>
  );
}


function SkillGroup({ group, items, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn delay={index * 0.08}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? COLORS.bgCardHover : COLORS.bgCard,
          border: `1px solid ${hovered ? COLORS.accent + "44" : COLORS.border}`,
          borderRadius: 12, padding: "20px 20px 16px",
          transition: "all 0.25s ease",
          transform: hovered ? "translateY(-2px)" : "none",
        }}
      >
        <div style={{ fontSize: 12, fontFamily: "'Fira Code', monospace", color: COLORS.accent, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>{group}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {items.map(item => (
            <span key={item} style={{
              background: "#111E33", border: `1px solid ${COLORS.border}`,
              borderRadius: 6, padding: "4px 10px", fontSize: 12.5, color: COLORS.textMuted,
            }}>{item}</span>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

export default function Portfolio() {
  const active = useScrollSpy();
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Fira+Code:wght@400;500&display=swap";
    document.head.appendChild(link);

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("ritikhedau18@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: COLORS.bg, color: COLORS.text, fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes heroFadeIn { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        body { margin: 0; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #070D1A; }
        ::-webkit-scrollbar-thumb { background: #1A2840; border-radius: 3px; }
        a:hover { opacity: 0.85; }
        .hero-word { display:inline-block; animation: heroFadeIn 0.6s ease both; }
        .nav-link-hover:hover { color: #00C896 !important; background: #00C89622 !important; }
        .stat-card:hover { border-color: #00C89644 !important; background: #111E33 !important; }
        .contact-btn:hover { opacity: 0.85; transform: translateY(-1px); transition: all 0.2s; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5%", height: 64,
        background: scrolled ? "rgba(7,13,26,0.95)" : "rgba(7,13,26,0.7)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${scrolled ? COLORS.border : "transparent"}`,
        transition: "all 0.3s ease",
      }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: COLORS.accent, letterSpacing: "-0.5px" }}>
          RH<span style={{ color: COLORS.text }}>.</span>
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          {navLinks.map(l => (
            <button key={l} className="nav-link-hover" onClick={() => scrollTo(l.toLowerCase())} style={{
              background: active === l ? COLORS.accentDim : "transparent",
              border: "none", cursor: "pointer", padding: "6px 14px", borderRadius: 6,
              fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 400,
              color: active === l ? COLORS.accent : COLORS.textMuted,
              transition: "all 0.2s",
            }}>{l}</button>
          ))}
        </div>
        <a href="https://github.com/ritik-hedau18" target="_blank" rel="noreferrer" style={{
          background: "transparent", color: COLORS.text, border: `1px solid ${COLORS.border}`,
          borderRadius: 8, padding: "7px 16px", fontSize: 13, textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.2s",
        }}>GitHub</a>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "80px 5% 40px", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(${COLORS.border}44 1px, transparent 1px), linear-gradient(90deg, ${COLORS.border}44 1px, transparent 1px)`,
          backgroundSize: "40px 40px", opacity: 0.4, zIndex: 1,
          maskImage: "radial-gradient(ellipse at 30% 50%, black 20%, transparent 75%)",
        }} />
        <div style={{
          position: "absolute", top: "10%", right: "-5%", width: "55%", aspectRatio: "1",
          background: `radial-gradient(circle at 60% 40%, ${COLORS.accent}18 0%, transparent 65%)`,
          borderRadius: "50%", pointerEvents: "none", zIndex: 1,
          animation: "float 6s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "20%", width: "30%", aspectRatio: "1",
          background: `radial-gradient(circle, ${COLORS.gold}08 0%, transparent 70%)`,
          borderRadius: "50%", pointerEvents: "none", zIndex: 1,
        }} />

        <div style={{ maxWidth: 720, position: "relative", zIndex: 2 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: COLORS.accentDim, border: `1px solid ${COLORS.accent}44`,
            borderRadius: 20, padding: "5px 14px", fontSize: 13, color: COLORS.accent,
            marginBottom: 28, fontFamily: "'Fira Code', monospace",
            animation: "heroFadeIn 0.5s ease both",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: COLORS.accent, display: "inline-block", animation: "pulse 2s infinite" }} />
            Open to Java Full Stack Developer roles
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(42px, 6vw, 72px)",
            fontWeight: 800, lineHeight: 1.05, margin: "0 0 6px",
            letterSpacing: "-2px", color: COLORS.text,
            animation: "heroFadeIn 0.6s ease 0.1s both",
          }}>
            Hi, I'm <span style={{ color: COLORS.accent }}>Ritik</span><br />Hedau
          </h1>

          <p style={{
            fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 300,
            color: COLORS.textMuted, margin: "0 0 24px", letterSpacing: "0.5px",
            animation: "heroFadeIn 0.6s ease 0.2s both",
          }}>
            <TypedText text="Java Full Stack Developer" />
          </p>

          <p style={{
            fontSize: 16, lineHeight: 1.75, color: COLORS.textMuted,
            maxWidth: 560, margin: "0 0 40px",
            animation: "heroFadeIn 0.6s ease 0.35s both",
          }}>
            Building scalable, production-grade backend systems using Java & Spring Boot. I specialize in microservices architecture, event-driven systems with Kafka, and clean REST API design.
          </p>

          <div style={{
            display: "flex", gap: 14, flexWrap: "wrap",
            animation: "heroFadeIn 0.6s ease 0.5s both",
          }}>
            <button onClick={() => scrollTo("projects")} style={{
              background: COLORS.accent, color: "#070D1A", border: "none",
              borderRadius: 8, padding: "12px 28px", fontSize: 15, fontWeight: 600,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>View Projects →</button>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" style={{
              background: "transparent", color: COLORS.text, border: `1px solid ${COLORS.border}`,
              borderRadius: 8, padding: "12px 28px", fontSize: 15, fontWeight: 400,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
            }}>↓ Resume</a>
            <button onClick={() => scrollTo("contact")} style={{
              background: "transparent", color: COLORS.text, border: `1px solid ${COLORS.border}`,
              borderRadius: 8, padding: "12px 28px", fontSize: 15, fontWeight: 400,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>Contact Me</button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: COLORS.bgCard, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ padding: "80px 5%", maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 13, color: COLORS.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>// about me</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-1px", margin: "0 0 48px", color: COLORS.text }}>Background</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <FadeIn delay={0.1}>
              <div>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.textMuted, margin: "0 0 16px" }}>
                  I'm a B.Tech graduate from RGPV University with hands-on experience building production-grade Java backend systems. I've worked across the full backend stack — from designing secure REST APIs and JWT-based auth systems to building event-driven microservices with Kafka and Redis.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.textMuted, margin: "0 0 16px" }}>
                  My flagship project TRACE is a real-time fraud detection system built with Spring Cloud microservices, Kafka event streaming, and Redis — the kind of architecture used in real fintech companies.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.textMuted, margin: 0 }}>
                  I care deeply about clean architecture, scalable system design, and writing backend code that is maintainable, testable, and built to last.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
                <div style={{ position: "relative", marginBottom: 8 }}>
                  <div style={{
                    position: "absolute", inset: -4, borderRadius: "50%",
                    background: `conic-gradient(${COLORS.accent}, ${COLORS.gold}, ${COLORS.accent})`,
                    animation: "gradientShift 3s linear infinite",
                    backgroundSize: "200% 200%",
                  }} />
                  <img
                    src="https://avatars.githubusercontent.com/u/250507116?v=4"
                    alt="Ritik Hedau"
                    style={{ width: 120, height: 120, borderRadius: "50%", border: `4px solid ${COLORS.bg}`, objectFit: "cover", display: "block", position: "relative" }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: COLORS.text }}>Ritik Hedau</div>
                  <div style={{ fontSize: 14, color: COLORS.accent, marginTop: 4 }}>Java Full Stack Developer</div>
                  <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 4 }}>📍 Nagpur, Maharashtra</div>
                  <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 2 }}>🎓 B.Tech · RGPV University</div>
                  <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 2 }}>💼 2+ Years Experience</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div style={{ padding: "80px 5%", maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 13, color: COLORS.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>// tech stack</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-1px", margin: "0 0 48px", color: COLORS.text }}>Skills & Technologies</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {Object.entries(skills).map(([group, items], i) => (
              <SkillGroup key={group} group={group} items={items} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ background: COLORS.bgCard, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ padding: "80px 5%", maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 13, color: COLORS.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>// work</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-1px", margin: "0 0 48px", color: COLORS.text }}>Projects</h2>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {projects.map((p, i) => <ProjectCard key={p.name} p={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ padding: "80px 5%", maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 13, color: COLORS.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>// experience</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-1px", margin: "0 0 48px", color: COLORS.text }}>Work Experience</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{
              background: COLORS.bgCard, border: `1px solid ${COLORS.border}`,
              borderRadius: 16, padding: "36px 40px", position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, width: 3, height: "100%",
                background: `linear-gradient(180deg, ${COLORS.accent}, ${COLORS.accent}22)`,
                borderRadius: "3px 0 0 3px",
              }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 8 }}>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>
                    Java Software Developer
                  </div>
                  <div style={{ fontSize: 15, color: COLORS.accent, fontWeight: 500 }}>
                    Emizen Tech · Full-time · Hybrid
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{
                    fontFamily: "'Fira Code', monospace", fontSize: 13,
                    color: COLORS.textMuted, background: COLORS.accentDim,
                    border: `1px solid ${COLORS.accent}33`, borderRadius: 6,
                    padding: "4px 12px",
                  }}>Dec 2023 – Present</div>
                  <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 6 }}>Pune, Maharashtra · Remote</div>
                </div>
              </div>
              <div style={{ width: "100%", height: 1, background: COLORS.border, margin: "20px 0" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "Developed and maintained production-grade REST APIs using Java and Spring Boot, handling business logic, request validation, and exception management across distributed microservices.",
                  "Integrated Spring Data JPA and Hibernate for ORM-based database operations on PostgreSQL and MySQL, writing optimized queries for data retrieval and persistence.",
                  "Implemented Spring Security with JWT authentication to secure API endpoints, supporting role-based access control across multiple services.",
                  "Collaborated with front-end teams to deliver full stack features, contributing to UI integration using JavaScript and React.js alongside backend API contracts.",
                  "Managed source control using Git/GitHub, dependency builds with Maven, and end-to-end API testing and debugging with Postman.",
                ].map((point, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ color: COLORS.accent, fontSize: 16, marginTop: 2, flexShrink: 0 }}>▹</span>
                    <span style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.textMuted }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What I Bring */}
      <section id="highlights" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ padding: "80px 5%", maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 13, color: COLORS.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>// value</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-1px", margin: "0 0 48px", color: COLORS.text }}>What I Bring</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              {
                icon: "🏗️",
                title: "System Design First",
                desc: "I think in systems, not just features. TRACE is built with the same distributed architecture patterns used by fintech companies at scale.",
              },
              {
                icon: "🔐",
                title: "Security by Default",
                desc: "Every project I ship has proper JWT auth, role-based access control, and Spring Security 6 integration — not bolted on after.",
              },
              {
                icon: "⚡",
                title: "Performance Aware",
                desc: "Redis caching, lazy-loaded JPA queries, and Kafka async processing — I write code that stays fast under load.",
              },
              {
                icon: "🧹",
                title: "Clean Code Discipline",
                desc: "Modular, well-structured codebases with clear separation of concerns. Every repo has a proper README with architecture diagrams.",
              },
              {
                icon: "📦",
                title: "Production Mindset",
                desc: "Docker, environment configs, proper error handling — my projects are built to be deployed, not just demonstrated locally.",
              },
              {
                icon: "📅",
                title: "Consistent Learner",
                desc: "I focus on steady progress every day, improving my skills step by step with discipline and dedication.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <HighlightCard item={item} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div style={{ padding: "80px 5% 100px", maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 13, color: COLORS.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>// contact</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-1px", margin: "0 0 40px", color: COLORS.text }}>Let's Connect</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{
              background: COLORS.bgCard, border: `1px solid ${COLORS.border}`,
              borderRadius: 20, padding: "56px 48px", textAlign: "center", position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, left: "20%", right: "20%", height: 2,
                background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
              }} />
              <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: "60%", height: "60%", background: `radial-gradient(circle, ${COLORS.accent}10 0%, transparent 70%)`, pointerEvents: "none" }} />

              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 700, letterSpacing: "-1px", marginBottom: 12, color: COLORS.text, position: "relative" }}>
                Open to Opportunities
              </p>
              <p style={{ fontSize: 16, color: COLORS.textMuted, marginBottom: 40, position: "relative" }}>
                Looking for Java Full Stack Developer roles. Let's talk.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", position: "relative" }}>
                <button className="contact-btn" onClick={copyEmail} style={{
                  background: COLORS.accent, color: "#070D1A", border: "none",
                  borderRadius: 8, padding: "12px 28px", fontSize: 15, fontWeight: 600,
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  display: "inline-flex", alignItems: "center", gap: 8,
                }}>
                  {copied ? "✓ Copied!" : "📋 Copy Email"}
                </button>
                <a href="tel:+918269519161" className="contact-btn" style={{
                  background: "transparent", color: COLORS.text, border: `1px solid ${COLORS.border}`,
                  borderRadius: 8, padding: "12px 28px", fontSize: 15, fontWeight: 400,
                  textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
                }}>📞 +91 82695 19161</a>
                <a href="https://github.com/ritik-hedau18" target="_blank" rel="noreferrer" className="contact-btn" style={{
                  background: "transparent", color: COLORS.text, border: `1px solid ${COLORS.border}`,
                  borderRadius: 8, padding: "12px 28px", fontSize: 15, fontWeight: 400,
                  textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
                }}>GitHub</a>
                <a href="https://www.linkedin.com/in/ritik-hedau-4b51b2203/" target="_blank" rel="noreferrer" className="contact-btn" style={{
                  background: "transparent", color: COLORS.text, border: `1px solid ${COLORS.border}`,
                  borderRadius: 8, padding: "12px 28px", fontSize: 15, fontWeight: 400,
                  textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
                }}>LinkedIn</a>
              </div>
              <p style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 28, marginBottom: 0, position: "relative" }}>
                📍 Nagpur, Maharashtra, India
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        textAlign: "center", padding: "24px 5%",
        borderTop: `1px solid ${COLORS.border}`,
        color: COLORS.textMuted, fontSize: 13,
      }}>
        <span>Built by <span style={{ color: COLORS.accent }}>Ritik Hedau</span> — Java Full Stack Developer</span>
      </footer>
    </div>
  );
}

function HighlightCard({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? COLORS.bgCardHover : COLORS.bgCard,
        border: `1px solid ${hovered ? COLORS.accent + "44" : COLORS.border}`,
        borderRadius: 14, padding: "24px",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? `0 8px 24px ${COLORS.accent}15` : "none",
        cursor: "default", height: "100%",
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 14 }}>{item.icon}</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: COLORS.text, marginBottom: 10 }}>{item.title}</div>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.textMuted, margin: 0 }}>{item.desc}</p>
    </div>
  );
}