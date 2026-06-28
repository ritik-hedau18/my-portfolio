import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  projects, skills, highlights, experience, navLinks,
  EMAIL, PHONE, LOCATION, RESUME_LINK, GITHUB_URL, LINKEDIN_URL,
  type Project,
} from "@/lib/portfolio-data";
import Terminal from "@/components/portfolio/Terminal";
import MatrixRain from "@/components/portfolio/MatrixRain";
import ArchitectureDiagram from "@/components/portfolio/ArchitectureDiagram";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ritik Hedau — Java Full Stack Developer" },
      { name: "description", content: "Spring Boot, Kafka, AWS, React 19. Multi-tenant SaaS, event-driven pipelines, RAG on Spring AI. 3+ years at Deqode Solutions." },
      { property: "og:title", content: "Ritik Hedau — Java Full Stack Developer" },
      { property: "og:description", content: "Multi-tenant microservices, RAG pipelines, production React frontends." },
    ],
  }),
  component: Portfolio,
});

/* ───────────────────────── Typed text ───────────────────────── */
function TypedText({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [out, setOut] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = texts[idx];
    let t: ReturnType<typeof setTimeout>;
    if (del) {
      if (out === "") t = setTimeout(() => { setDel(false); setIdx((i) => (i + 1) % texts.length); }, 200);
      else t = setTimeout(() => setOut(full.substring(0, out.length - 1)), 28);
    } else {
      if (out === full) t = setTimeout(() => setDel(true), 2400);
      else t = setTimeout(() => setOut(full.substring(0, out.length + 1)), 65);
    }
    return () => clearTimeout(t);
  }, [out, del, idx, texts]);
  return <span className="blink">{out}</span>;
}

/* ───────────────────────── Reveal helper ───────────────────────── */
function Reveal({ children, delay = 0, y = 16 }: { children: React.ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProjectLogo({ p, size }: { p: Project; size: number }) {
  if (p.logo) {
    return (
      <img
        src={p.logo}
        alt={`${p.name} logo`}
        style={{
          width: size, height: size, objectFit: "contain",
          background: "var(--paper-2)", border: "1px solid var(--rule)",
          borderRadius: 4, padding: 6, display: "block",
        }}
      />
    );
  }
  return <span className="mono-tile" style={{ width: size, height: size, fontSize: size * 0.5 }}>{p.monogram}</span>;
}

/* ───────────────────────── Magnetic button ───────────────────────── */
function Magnetic({ children, className = "", as = "button", ...rest }: any) {
  const ref = useRef<HTMLElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  const Comp: any = as;
  return (
    <Comp
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform .35s cubic-bezier(.2,.8,.2,1)" }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/* ───────────────────────── Scroll ticker (hero) ───────────────────────── */
function Ticker({ items }: { items: string[] }) {
  const dup = [...items, ...items];
  return (
    <div style={{ borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", overflow: "hidden", background: "var(--paper-2)" }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 40, padding: "14px 0", whiteSpace: "nowrap" }}
      >
        {dup.map((it, i) => (
          <span key={i} className="mono" style={{ fontSize: 12, color: "var(--ink-2)", letterSpacing: "0.06em" }}>
            <span style={{ color: "var(--accent)" }}>◆</span>&nbsp;&nbsp;{it}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ───────────────────────── Nav ───────────────────────── */
function Nav({ active, onJump, theme, setTheme }: { active: string; onJump: (id: string) => void; theme: string; setTheme: (t: string) => void; }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 60,
        backdropFilter: scrolled ? "blur(14px)" : "none",
        background: scrolled ? "color-mix(in oklab, var(--paper) 80%, transparent)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
        transition: "all .35s ease",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", padding: "14px clamp(20px, 5vw, 56px)", gap: 24 }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); onJump("top"); }} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--ink)" }}>
          <span style={{ width: 28, height: 28, display: "grid", placeItems: "center", background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-display)", fontSize: 16, borderRadius: 2 }}>R</span>
          <span className="mono" style={{ fontSize: 12, letterSpacing: "0.08em" }}>RITIK HEDAU<span style={{ color: "var(--accent)" }}>.</span></span>
        </a>
        <div style={{ display: "flex", justifyContent: "center", gap: 4 }} className="hidden md:flex">
          {navLinks.map((l, i) => (
            <button
              key={l.id}
              onClick={() => onJump(l.id)}
              className="mono"
              style={{
                background: "transparent", border: "none", cursor: "pointer",
                fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
                color: active === l.id ? "var(--ink)" : "var(--ink-3)",
                padding: "6px 12px", position: "relative",
              }}
            >
              <span className="tnum" style={{ color: "var(--ink-3)", marginRight: 8 }}>0{i + 1}</span>
              {l.label}
              {active === l.id && (
                <motion.span layoutId="nav-dot" style={{ position: "absolute", bottom: 0, left: "50%", width: 4, height: 4, background: "var(--accent)", borderRadius: "50%", translate: "-50% 4px" }} />
              )}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => { const t = ["paper", "ink", "ember"]; setTheme(t[(t.indexOf(theme) + 1) % t.length]); }} className="chip" style={{ cursor: "pointer" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
            {theme}
          </button>
          <a href={RESUME_LINK} target="_blank" rel="noreferrer" className="btn btn-solid">Resume ↗</a>
        </div>
      </div>
    </nav>
  );
}

/* ───────────────────────── Sections ───────────────────────── */

function HeroSection({ onHack, onTheme }: { onHack: () => void; onTheme: (t: string) => void }) {
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 600], [0, -60]);
  const titleScale = useTransform(scrollY, [0, 600], [1, 0.96]);

  return (
    <motion.section
      id="top"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "relative", paddingTop: 120 }}
    >
      <div style={{ padding: "0 clamp(20px, 5vw, 56px)" }}>
        {/* meta strip */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end", paddingBottom: 24, borderBottom: "1px solid var(--rule)" }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Portfolio · Vol.&nbsp;III &nbsp;&nbsp;/&nbsp;&nbsp; Pune → Anywhere &nbsp;&nbsp;/&nbsp;&nbsp; Open to Roles
          </div>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", marginRight: 8 }} />
            Available · {new Date().getFullYear()}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 0, paddingTop: 60 }}>
          <motion.div style={{ y: titleY, scale: titleScale }}>
            <Reveal>
              <h1 className="serif" style={{
                fontSize: "clamp(64px, 13.5vw, 220px)", lineHeight: 0.92, letterSpacing: "-0.04em",
                margin: 0, fontWeight: 400, color: "var(--ink)",
              }}>
                Java Full&nbsp;Stack
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="serif" style={{
                fontSize: "clamp(64px, 13.5vw, 220px)", lineHeight: 0.92, letterSpacing: "-0.04em",
                margin: 0, fontWeight: 400, color: "var(--ink)", fontStyle: "italic",
                display: "flex", alignItems: "baseline", gap: "0.25em", flexWrap: "wrap",
              }}>
                <span>Developer</span>
                <span style={{ color: "var(--accent)" }}>—</span>
                <span className="serif" style={{ fontStyle: "normal", fontSize: "0.45em", letterSpacing: "0", color: "var(--ink-3)" }}>
                  building shipped systems.
                </span>
              </h1>
            </Reveal>
          </motion.div>
        </div>

        {/* lower band: 3-column meta */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1.1fr", gap: 40, paddingTop: 80, alignItems: "start" }} className="hero-lower">
          <Reveal delay={0.15}>
            <div>
              <div className="label" style={{ marginBottom: 14 }}>Currently</div>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: 460, margin: 0 }}>
                I'm <span style={{ color: "var(--ink)", fontWeight: 500 }}>Ritik Hedau</span> — a <TypedText texts={["Java Full Stack Developer", "Spring Boot & React 19 Engineer", "AI / RAG Integrator"]} />.
                I design secure multi-tenant microservices, event-driven backends, and modular React 19 interfaces that ship to production.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 26, flexWrap: "wrap" }}>
                <Magnetic as="a" href="#work" onClick={(e: any) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }} className="btn btn-solid">
                  See the work <span>→</span>
                </Magnetic>
                <Magnetic as="a" href="#contact" onClick={(e: any) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="btn btn-ghost">
                  Let's talk
                </Magnetic>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div>
              <div className="label" style={{ marginBottom: 14 }}>Index</div>
              <div style={{ borderTop: "1px solid var(--rule)" }}>
                {[
                  ["01", "Selected work", "07 projects"],
                  ["02", "Practice", "Deqode · 3+ yrs"],
                  ["03", "Stack", "5 ecosystems"],
                  ["04", "Principles", "06"],
                ].map(([n, k, v]) => (
                  <div key={n} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--rule)", alignItems: "baseline" }}>
                    <span className="mono tnum" style={{ fontSize: 11, color: "var(--ink-3)" }}>{n}</span>
                    <span style={{ fontSize: 13, color: "var(--ink)" }}>{k}</span>
                    <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <Terminal onHack={onHack} onChangeTheme={onTheme} />
          </Reveal>
        </div>
      </div>

      <div style={{ marginTop: 80 }}>
        <Ticker items={[
          "Spring Boot 3", "Spring AI", "Apache Kafka", "PostgreSQL", "Qdrant", "AWS · EC2 / S3 / RDS",
          "Kubernetes", "Docker", "Redis · Distributed Locks", "React 19", "TypeScript", "Hibernate JPA",
        ]} />
      </div>
    </motion.section>
  );
}

/* ───────────────────────── Index / About ───────────────────────── */
function IndexSection() {
  return (
    <section id="index" style={{ padding: "120px clamp(20px, 5vw, 56px)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 280px) 1fr", gap: 56, alignItems: "start" }} className="two-col">
        <Reveal>
          <div style={{ position: "sticky", top: 96 }}>
            <div className="label" style={{ marginBottom: 14 }}>§01 · The index</div>
            <h2 className="serif" style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1, letterSpacing: "-0.02em", margin: 0, fontWeight: 400 }}>
              A note from <span style={{ fontStyle: "italic", color: "var(--accent)" }}>the desk</span>.
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ maxWidth: 780, display: "flex", flexDirection: "column", gap: 22 }}>
            <p className="serif" style={{ fontSize: "clamp(22px, 2.6vw, 32px)", lineHeight: 1.35, color: "var(--ink)", margin: 0, fontStyle: "italic" }}>
              I build production systems — the kind that survive Monday-morning traffic, late-night incidents, and quarterly audits without sentiment.
            </p>
            <div className="rule-h" />
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--ink-2)", margin: 0 }}>
              I'm a Java Full Stack Developer with 3+ years building and shipping end-to-end web applications — from Spring Boot microservices and event-driven backends to responsive React frontends. I specialize in secure REST APIs with Spring Security and JWT, AWS infrastructure, and production-ready UIs with React 19, TypeScript, and Tailwind CSS.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--ink-2)", margin: 0 }}>
              At <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Deqode Solutions</strong> in Pune I architect multi-tenant SaaS microservices for international logistics and retail clients — event-driven pipelines on Kafka, services on Docker and Kubernetes, infrastructure provisioned across staging and production on AWS (EC2, S3, RDS, IAM, CloudWatch, SNS, SQS, VPC, ECR, ALB).
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--ink-2)", margin: 0 }}>
              Lately I've been building Retrieval-Augmented Generation platforms — wiring large language models to vector databases (Qdrant) through Spring AI to deliver context-aware, semantically searchable workspaces.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, marginTop: 28, borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
              {[
                { k: "Years shipping", v: "3+" },
                { k: "Production projects", v: "07" },
                { k: "Stack ecosystems", v: "05" },
              ].map((m, i) => (
                <div key={m.k} style={{ padding: "20px 16px", borderLeft: i === 0 ? "none" : "1px solid var(--rule)" }}>
                  <div className="serif tnum" style={{ fontSize: 44, lineHeight: 1, color: "var(--ink)" }}>{m.v}</div>
                  <div className="label" style={{ marginTop: 8 }}>{m.k}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── Work (Projects) ───────────────────────── */
function ProjectRow({ p, i, onOpen, onHover }: { p: Project; i: number; onOpen: () => void; onHover: (i: number | null) => void }) {
  return (
    <motion.button
      onClick={onOpen}
      onMouseEnter={() => onHover(i)}
      onMouseLeave={() => onHover(null)}
      whileHover={{ x: 12 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "grid", gridTemplateColumns: "40px 48px 1fr auto auto", gap: 20,
        alignItems: "center", padding: "24px 0", borderBottom: "1px solid var(--rule)",
        background: "transparent", border: "none", borderTop: i === 0 ? "1px solid var(--rule)" : "none",
        cursor: "pointer", textAlign: "left", width: "100%",
      }}
    >
      <span className="mono tnum" style={{ fontSize: 12, color: "var(--ink-3)" }}>0{i + 1} /</span>
      <ProjectLogo p={p} size={40} />
      <span style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
        <span className="serif" style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1, color: "var(--ink)", letterSpacing: "-0.02em" }}>{p.name}</span>
        <span className="serif" style={{ fontSize: "clamp(16px, 1.6vw, 20px)", color: "var(--ink-3)", fontStyle: "italic" }}>{p.full}</span>
      </span>
      <span className="chip">{p.tag}</span>
      <span className="mono tnum" style={{ fontSize: 13, color: "var(--accent)", minWidth: 40, textAlign: "right" }}>→</span>
    </motion.button>
  );
}

function WorkSection({ onSelect }: { onSelect: (p: Project) => void }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section id="work" style={{ padding: "120px 0 60px", borderTop: "1px solid var(--rule)" }}>
      <div style={{ padding: "0 clamp(20px, 5vw, 56px)" }}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 24, alignItems: "end", marginBottom: 56 }}>
            <div>
              <div className="label" style={{ marginBottom: 12 }}>§02 · Selected work</div>
              <h2 className="serif" style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1, letterSpacing: "-0.025em", margin: 0, fontWeight: 400 }}>
                Seven systems, <span style={{ fontStyle: "italic", color: "var(--accent)" }}>shipped.</span>
              </h2>
            </div>
            <div />
            <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Click a row → case study
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ position: "relative" }}>
            {projects.map((p, i) => (
              <ProjectRow key={p.name} p={p} i={i} onOpen={() => onSelect(p)} onHover={setHover} />
            ))}
            <AnimatePresence>
              {hover !== null && (
                <motion.div
                  key={hover}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "absolute", right: 0, top: -32,
                    pointerEvents: "none",
                    display: "flex", alignItems: "center", gap: 10,
                  }}
                  className="hidden lg:flex"
                >
                  <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{projects[hover].monogram}</span>
                  <span className="mono-tile" style={{ width: 64, fontSize: 32 }}>{projects[hover].monogram}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── Project Detail (overlay) ───────────────────────── */
function ProjectDetailOverlay({ p, onBack }: { p: Project; onBack: () => void }) {
  const [showArch, setShowArch] = useState(true);
  const hasArch = ["NEXUS", "TRACE", "SRIJAN", "BITECRAFT"].includes(p.name);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        position: "fixed", inset: 0, zIndex: 70,
        background: "var(--paper)", overflowY: "auto",
      }}
    >
      <div style={{ padding: "32px clamp(20px, 5vw, 56px) 96px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
          <button onClick={onBack} className="btn btn-ghost">← All work</button>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Case Study · {p.year}
          </span>
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "end", borderBottom: "1px solid var(--rule)", paddingBottom: 32 }} className="detail-head">
            <ProjectLogo p={p} size={120} />
            <div>
              <span className="chip">{p.tag}</span>
              <h2 className="serif" style={{ fontSize: "clamp(48px, 8vw, 112px)", lineHeight: 0.95, letterSpacing: "-0.03em", margin: "16px 0 8px", fontWeight: 400 }}>{p.name}</h2>
              <p className="serif" style={{ fontSize: "clamp(20px, 2.4vw, 30px)", color: "var(--ink-3)", fontStyle: "italic", margin: 0 }}>{p.full}</p>
            </div>
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 56, marginTop: 56 }} className="detail-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <div>
              <div className="label" style={{ marginBottom: 16 }}>§ Overview</div>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)", margin: 0 }}>{p.desc}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px solid var(--rule)", borderRadius: 8, overflow: "hidden" }} className="ps-grid">
              <div style={{ padding: 28, background: "var(--paper-2)" }}>
                <div className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.16em", marginBottom: 12, fontWeight: 600 }}>
                  ◯ THE CHALLENGE
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ink-2)", margin: 0 }}>{p.problem}</p>
              </div>
              <div style={{ padding: 28, borderLeft: "1px solid var(--rule)" }}>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink)", letterSpacing: "0.16em", marginBottom: 12, fontWeight: 600 }}>
                  ● THE SOLUTION
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ink-2)", margin: 0 }}>{p.solution}</p>
              </div>
            </div>

            {hasArch && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div className="label">§ System architecture</div>
                  <button onClick={() => setShowArch((s) => !s)} className="chip" style={{ cursor: "pointer" }}>
                    {showArch ? "hide" : "show"}
                  </button>
                </div>
                <AnimatePresence>
                  {showArch && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                      <ArchitectureDiagram name={p.name} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <div>
              <div className="label" style={{ marginBottom: 16 }}>§ Impact</div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {p.impact.map((imp, idx) => (
                  <div key={idx} style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 16, padding: "18px 0", borderTop: idx === 0 ? "1px solid var(--rule)" : "none", borderBottom: "1px solid var(--rule)" }}>
                    <span className="mono tnum" style={{ fontSize: 11, color: "var(--accent)" }}>{String(idx + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: 15, lineHeight: 1.55, color: "var(--ink-2)" }}>{imp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <div className="label" style={{ marginBottom: 14 }}>Links</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {p.hasGithub ? (
                  <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ justifyContent: "space-between", borderRadius: 4 }}>
                    <span>View source</span><span>↗</span>
                  </a>
                ) : (
                  <span className="chip" style={{ justifyContent: "center", padding: "10px 16px", color: "var(--ink-3)" }}>
                    Currently in progress · source private
                  </span>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-accent" style={{ justifyContent: "space-between", borderRadius: 4 }}>
                    <span>Live demo</span><span>↗</span>
                  </a>
                )}
              </div>
            </div>

            <div>
              <div className="label" style={{ marginBottom: 14 }}>Stack</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tech.map((t) => (<span key={t} className="skill-pill">{t}</span>))}
              </div>
            </div>

            <div style={{ padding: 24, background: "var(--paper-2)", border: "1px solid var(--rule)", borderRadius: 8, position: "relative" }}>
              <div className="mono" style={{ fontSize: 10, color: "var(--accent)", letterSpacing: "0.16em", marginBottom: 10, fontWeight: 600 }}>
                ※ TECHNICAL DEEP DIVE
              </div>
              <div className="serif" style={{ fontSize: 22, lineHeight: 1.2, color: "var(--ink)", marginBottom: 12, letterSpacing: "-0.01em" }}>
                {p.deepDive.title}
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--ink-2)", margin: 0 }}>{p.deepDive.detail}</p>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────────────────── Practice (Experience) ───────────────────────── */
function PracticeSection() {
  return (
    <section id="practice" style={{ padding: "120px clamp(20px, 5vw, 56px)", borderTop: "1px solid var(--rule)", background: "var(--paper-2)" }}>
      <Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end", marginBottom: 60, gap: 24 }}>
          <div>
            <div className="label" style={{ marginBottom: 12 }}>§03 · The practice</div>
            <h2 className="serif" style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1, letterSpacing: "-0.025em", margin: 0, fontWeight: 400 }}>
              Three years, <span style={{ fontStyle: "italic", color: "var(--accent)" }}>one desk.</span>
            </h2>
          </div>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {experience.period}
          </div>
        </div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 56, alignItems: "start" }} className="two-col">
        <Reveal>
          <div style={{ position: "sticky", top: 96 }}>
            <span className="chip">{experience.type}</span>
            <h3 className="serif" style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.05, margin: "20px 0 12px", fontWeight: 400, letterSpacing: "-0.02em" }}>
              {experience.role}
            </h3>
            <div style={{ fontSize: 15, color: "var(--accent)", fontWeight: 500, marginBottom: 6 }}>{experience.company}</div>
            <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{experience.location} · {experience.duration}</div>

            <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
              {experience.metrics.map((m, i) => (
                <div key={m.k} style={{ padding: "16px 12px", borderLeft: i === 0 ? "none" : "1px solid var(--rule)" }}>
                  <div className="serif tnum" style={{ fontSize: 32, lineHeight: 1, color: "var(--ink)" }}>{m.v}</div>
                  <div className="label" style={{ marginTop: 6, fontSize: 9 }}>{m.k}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div>
            {experience.bullets.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: 16, padding: "28px 0", borderTop: i === 0 ? "1px solid var(--rule)" : "none", borderBottom: "1px solid var(--rule)" }}
              >
                <span className="mono tnum" style={{ fontSize: 11, color: "var(--ink-3)" }}>§ {String(i + 1).padStart(2, "0")}</span>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--ink-2)", margin: 0 }}>{b}</p>
              </motion.div>
            ))}
            <div style={{ marginTop: 28 }}>
              <div className="label" style={{ marginBottom: 12 }}>Daily tools</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {experience.techUsed.map((t) => (<span key={t} className="skill-pill">{t}</span>))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── Stack (Skills) ───────────────────────── */
function StackSection() {
  const [active, setActive] = useState(0);
  const groups = useMemo(() => Object.entries(skills), []);
  return (
    <section id="stack" style={{ padding: "120px clamp(20px, 5vw, 56px)", borderTop: "1px solid var(--rule)" }}>
      <Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end", marginBottom: 60, gap: 24 }}>
          <div>
            <div className="label" style={{ marginBottom: 12 }}>§04 · The stack</div>
            <h2 className="serif" style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1, letterSpacing: "-0.025em", margin: 0, fontWeight: 400 }}>
              Five ecosystems, <span style={{ fontStyle: "italic", color: "var(--accent)" }}>one toolbox.</span>
            </h2>
          </div>
        </div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 0, border: "1px solid var(--rule)", borderRadius: 10, overflow: "hidden" }} className="stack-grid">
        <div style={{ borderRight: "1px solid var(--rule)", background: "var(--paper-2)" }}>
          {groups.map(([g], i) => (
            <button
              key={g}
              onClick={() => setActive(i)}
              style={{
                display: "block", width: "100%", textAlign: "left", padding: "24px 24px",
                background: active === i ? "var(--paper)" : "transparent", border: "none",
                borderBottom: i < groups.length - 1 ? "1px solid var(--rule)" : "none",
                cursor: "pointer", transition: "all .25s ease",
                borderLeft: `3px solid ${active === i ? "var(--accent)" : "transparent"}`,
              }}
            >
              <div className="mono tnum" style={{ fontSize: 10, color: "var(--ink-3)", marginBottom: 6 }}>0{i + 1}</div>
              <div className="serif" style={{ fontSize: 22, lineHeight: 1.1, color: "var(--ink)", letterSpacing: "-0.01em" }}>{g}</div>
            </button>
          ))}
        </div>
        <div style={{ padding: "44px 44px", background: "var(--paper)" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <div className="label" style={{ marginBottom: 14 }}>{groups[active][0]} · {groups[active][1].tools.length} tools</div>
              <div className="serif" style={{ fontSize: "clamp(30px, 3vw, 44px)", lineHeight: 1.1, color: "var(--ink)", marginBottom: 28, letterSpacing: "-0.02em" }}>
                Working surface for <span style={{ color: "var(--accent)", fontStyle: "italic" }}>{groups[active][0].toLowerCase()}</span>.
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {groups[active][1].tools.map((t) => (<span key={t} className="skill-pill">{t}</span>))}
              </div>
              <p style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: "var(--ink-3)",
                margin: "28px 0 0",
                paddingTop: 24,
                borderTop: "1px solid var(--rule)",
                fontStyle: "italic",
                maxWidth: 560,
              }}>
                {groups[active][1].note}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Principles ───────────────────────── */
function PrinciplesSection() {
  return (
    <section id="principles" style={{ padding: "120px clamp(20px, 5vw, 56px)", borderTop: "1px solid var(--rule)", background: "var(--paper-2)" }}>
      <Reveal>
        <div style={{ marginBottom: 56 }}>
          <div className="label" style={{ marginBottom: 12 }}>§05 · Principles</div>
          <h2 className="serif" style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1, letterSpacing: "-0.025em", margin: 0, fontWeight: 400, maxWidth: 900 }}>
            How I <span style={{ fontStyle: "italic", color: "var(--accent)" }}>actually</span> work.
          </h2>
        </div>
      </Reveal>

      <div style={{ borderTop: "1px solid var(--rule)" }}>
        {highlights.map((h, i) => (
          <motion.div
            key={h.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            whileHover="hover"
            style={{
              display: "grid", gridTemplateColumns: "80px 1fr 1.4fr", gap: 32,
              padding: "36px 0", borderBottom: "1px solid var(--rule)", alignItems: "start",
              cursor: "default", position: "relative",
            }}
            className="principle-row"
          >
            <span className="mono tnum" style={{ fontSize: 11, color: "var(--ink-3)" }}>§ 0{i + 1}</span>
            <motion.h3
              className="serif"
              variants={{ hover: { color: "var(--accent-2)" } }}
              style={{ fontSize: "clamp(24px, 2.6vw, 36px)", lineHeight: 1.1, margin: 0, fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)" }}
            >
              {h.title}
            </motion.h3>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ink-2)", margin: 0, maxWidth: 540 }}>{h.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Contact ───────────────────────── */
function ContactSection() {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  return (
    <section id="contact" style={{ padding: "120px clamp(20px, 5vw, 56px) 80px", borderTop: "1px solid var(--rule)", background: "var(--ink)", color: "var(--paper)" }}>
      <Reveal>
        <div className="label" style={{ marginBottom: 16, color: "color-mix(in oklab, var(--paper) 60%, transparent)" }}>§06 · Contact</div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="serif" style={{ fontSize: "clamp(56px, 11vw, 200px)", lineHeight: 0.92, letterSpacing: "-0.035em", margin: "0 0 32px", fontWeight: 400 }}>
          Let's build <span style={{ fontStyle: "italic", color: "var(--accent)" }}>something</span>.
        </h2>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 56, paddingTop: 40, borderTop: "1px solid color-mix(in oklab, var(--paper) 16%, transparent)" }} className="two-col">
        <Reveal>
          <div>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "color-mix(in oklab, var(--paper) 75%, transparent)", maxWidth: 520, margin: 0 }}>
              I'm open to Java Full Stack Developer roles, product engineering positions, and freelance engagements with serious teams. The fastest way to reach me is email.
            </p>
            <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
              <a href={`mailto:${EMAIL}?subject=Opportunity%20for%20Java%20Full%20Stack%20Developer&body=Hi%20Ritik%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect%20regarding%20a%20Java%20Full%20Stack%20Developer%20opportunity.%0A%0ACompany%3A%20%5BYour%20Company%5D%0ARole%3A%20%5BPosition%5D%0ALocation%3A%20%5BCity%20%2F%20Remote%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ARegards%2C%0A%5BYour%20Name%5D`} className="link-underline mono" style={{ fontSize: "clamp(18px, 2.4vw, 30px)", color: "var(--paper)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}>
                {EMAIL} <span style={{ color: "var(--accent)" }}>↗</span>
              </a>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20 }}>
                <Magnetic as="button" onClick={copy} className="btn btn-accent">
                  {copied ? "✓ Copied" : "Copy email"}
                </Magnetic>
                <a href={`tel:${PHONE.replace(/\s+/g, "")}`} className="btn" style={{ borderColor: "color-mix(in oklab, var(--paper) 30%, transparent)", color: "var(--paper)" }}>{PHONE}</a>
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="btn" style={{ borderColor: "color-mix(in oklab, var(--paper) 30%, transparent)", color: "var(--paper)" }}>LinkedIn ↗</a>
                <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn" style={{ borderColor: "color-mix(in oklab, var(--paper) 30%, transparent)", color: "var(--paper)" }}>GitHub ↗</a>
                <a href={RESUME_LINK} target="_blank" rel="noreferrer" className="btn btn-accent">Resume ↗</a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div style={{ border: "1px solid color-mix(in oklab, var(--paper) 14%, transparent)", borderRadius: 8, padding: 28 }}>
            <div className="label" style={{ marginBottom: 16, color: "color-mix(in oklab, var(--paper) 50%, transparent)" }}>Cardstock</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                ["Name", "Ritik Hedau"],
                ["Role", "Java Full Stack Developer"],
                ["Company", "Deqode Solutions"],
                ["Tenure", "3+ Years"],
                ["Location", LOCATION],
                ["Education", "B.Tech · RGPV Bhopal"],
                ["Status", "Open to opportunities"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 16, fontSize: 13, paddingBottom: 12, borderBottom: "1px solid color-mix(in oklab, var(--paper) 10%, transparent)" }}>
                  <span className="mono" style={{ color: "color-mix(in oklab, var(--paper) 50%, transparent)", letterSpacing: "0.06em", textTransform: "uppercase", fontSize: 10 }}>{k}</span>
                  <span style={{ color: "var(--paper)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <div style={{ marginTop: 80, display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 16, paddingTop: 24, borderTop: "1px solid color-mix(in oklab, var(--paper) 12%, transparent)" }}>
        <span className="mono" style={{ fontSize: 11, color: "color-mix(in oklab, var(--paper) 50%, transparent)", letterSpacing: "0.1em" }}>
          © {new Date().getFullYear()} RITIK HEDAU · ALL RIGHTS RESERVED
        </span>
        <span className="mono" style={{ fontSize: 11, color: "color-mix(in oklab, var(--paper) 50%, transparent)" }}>◆</span>
        <span className="mono" style={{ fontSize: 11, color: "color-mix(in oklab, var(--paper) 50%, transparent)", letterSpacing: "0.1em", textAlign: "right" }}>
          DESIGNED & BUILT IN PUNE
        </span>
      </div>
    </section>
  );
}

/* ───────────────────────── Scroll spy ───────────────────────── */
function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const handler = () => {
      let cur = "top";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) cur = id;
      }
      setActive(cur);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ids]);
  return active;
}

/* ───────────────────────── Theme apply ───────────────────────── */
function applyTheme(theme: string) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "paper") {
    root.style.setProperty("--paper", "oklch(0.965 0.012 80)");
    root.style.setProperty("--paper-2", "oklch(0.94 0.014 80)");
    root.style.setProperty("--ink", "oklch(0.18 0.012 60)");
    root.style.setProperty("--ink-2", "oklch(0.32 0.01 60)");
    root.style.setProperty("--ink-3", "oklch(0.52 0.012 60)");
    root.style.setProperty("--accent", "oklch(0.58 0.19 35)");
    root.style.setProperty("--accent-2", "oklch(0.42 0.13 35)");
    root.style.setProperty("--rule", "oklch(0.85 0.012 70)");
  } else if (theme === "ink") {
    root.style.setProperty("--paper", "oklch(0.16 0.008 60)");
    root.style.setProperty("--paper-2", "oklch(0.22 0.008 60)");
    root.style.setProperty("--ink", "oklch(0.96 0.008 80)");
    root.style.setProperty("--ink-2", "oklch(0.82 0.01 70)");
    root.style.setProperty("--ink-3", "oklch(0.62 0.01 70)");
    root.style.setProperty("--rule", "oklch(0.32 0.008 60)");
    root.style.setProperty("--accent", "oklch(0.78 0.17 60)");
    root.style.setProperty("--accent-2", "oklch(0.62 0.16 60)");
  } else if (theme === "ember") {
    root.style.setProperty("--paper", "oklch(0.22 0.04 30)");
    root.style.setProperty("--paper-2", "oklch(0.27 0.04 30)");
    root.style.setProperty("--ink", "oklch(0.96 0.02 60)");
    root.style.setProperty("--ink-2", "oklch(0.84 0.02 60)");
    root.style.setProperty("--ink-3", "oklch(0.64 0.02 60)");
    root.style.setProperty("--rule", "oklch(0.36 0.04 30)");
    root.style.setProperty("--accent", "oklch(0.75 0.2 50)");
    root.style.setProperty("--accent-2", "oklch(0.6 0.18 45)");
  }
}

/* ───────────────────────── Root ───────────────────────── */
function Portfolio() {
  const [theme, setTheme] = useState(() => {
    applyTheme("paper");
    return "paper";
  });
  const [isHacking, setIsHacking] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const active = useScrollSpy(navLinks.map((l) => l.id));

  useEffect(() => { applyTheme(theme); }, [theme]);

  useEffect(() => { document.body.style.overflow = selected ? "hidden" : ""; }, [selected]);

  const jump = (id: string) => {
    const el = id === "top" ? document.body : document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: id === "top" ? 0 : (el as HTMLElement).offsetTop - 60, behavior: "smooth" });
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ minHeight: "100vh", position: "relative", overflowX: "hidden" }}
    >
      <div className="paper-grain" />
      {isHacking && <MatrixRain onClose={() => setIsHacking(false)} />}

      <Nav active={active} onJump={jump} theme={theme} setTheme={setTheme} />

      <HeroSection onHack={() => setIsHacking(true)} onTheme={setTheme} />
      <IndexSection />
      <WorkSection onSelect={setSelected} />
      <PracticeSection />
      <StackSection />
      <PrinciplesSection />
      <ContactSection />

      <AnimatePresence>
        {selected && <ProjectDetailOverlay p={selected} onBack={() => setSelected(null)} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .two-col, .detail-grid, .stack-grid, .ps-grid { grid-template-columns: 1fr !important; }
          .hero-lower { grid-template-columns: 1fr !important; }
          .detail-head { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.main>
  );
}
