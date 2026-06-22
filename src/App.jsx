import { useState, useEffect, useRef } from "react";
import nexusLogo from "./assets/nexus_logo.png";
import traceLogo from "./assets/trace_logo.png";
import srijanLogo from "./assets/srijan_logo.png";
import foodflowLogo from "./assets/foodflow_logo.png";
import atlasLogo from "./assets/atlas_logo.png";
import echoLogo from "./assets/echo_logo.png";
import vaultLogo from "./assets/vault_logo.png";

// Project Database
// Project Database
const projects = [
  {
    name: "NEXUS",
    logo: nexusLogo,
    full: "Neural Enterprise Knowledge Unification System",
    tag: "AI + Vector RAG",
    desc: "AI-powered document intelligence and workspace collaboration platform. Features a Retrieval-Augmented Generation (RAG) pipeline allowing users to perform semantic search and chat directly with uploaded documents (PDF, DOCX).",
    tech: ["Spring Boot", "Spring AI", "Groq LLaMA 3.3", "Qdrant Vector DB", "React 19", "TypeScript", "PostgreSQL", "Docker"],
    github: "https://github.com/ritik-hedau18/NEXUS",
    hasGithub: true,
    live: "https://ritikbynexus.vercel.app",
    problem: "Organizations struggle to search and extract precise answers from unstructured document silos. Standard keyword search lacks semantic context, forcing employees to scan entire files manually.",
    solution: "Developed an advanced Spring AI backend integrating Jina AI embedding models and a Qdrant Vector DB. Uploaded files are dynamically parsed, split into semantically coherent chunks, indexed, and queried via a context-bounded Retrieval-Augmented Generation (RAG) flow.",
    impact: [
      "85% faster answer retrieval compared to standard file directory searches.",
      "Sub-150ms semantic query latency achieved across thousands of chunks.",
      "100% citation grounding, preventing LLM hallucinations."
    ],
    deepDive: {
      title: "Hybrid Search Optimization",
      detail: "Integrates dense vector similarity scores from Qdrant with BM25 metadata keyword matching. This hybrid pipeline ensures the RAG model retrieves exact matches (like function names or config IDs) while preserving semantic context."
    }
  },
  {
    name: "VAULT",
    logo: vaultLogo,
    full: "Secure Digital Banking & Ledger Engine",
    tag: "FinTech Ledger",
    desc: "Secure banking transaction engine. Utilizes Redis distributed locks and database locks to prevent double-spending, database field-level encryption, Google Authenticator (TOTP) 2FA, and Quartz-scheduled interest jobs.",
    tech: ["Spring Boot", "Redis Distributed Locks", "2FA TOTP", "AES-256-GCM", "PostgreSQL", "MongoDB", "Quartz Scheduler", "React 19"],
    github: "https://github.com/ritik-hedau18/VAULT",
    hasGithub: true,
    live: "https://vaultbyritik.vercel.app",
    problem: "FinTech ledgers are vulnerable to double-spending concurrency bugs, unauthorized account breaches, and data corruption in automated scheduled cron routines.",
    solution: "Engineered a secure ledger database using Redis (Redisson) distributed locks and JPA pessimistic database locks to force strict transactional isolation. Integrated TOTP-based 2FA, encrypted balances, and scheduled daily interest calculations via Quartz.",
    impact: [
      "Blocked 100% of double-spending attempts in multi-threaded race condition tests.",
      "Protected user balances with field-level AES-GCM encryption.",
      "Quartz system processed 50,000+ recurring interest calculations daily without error."
    ],
    deepDive: {
      title: "Redisson Distributed Locks",
      detail: "Wraps financial ledger updates in Redisson distributed locks with a lease-time watchdog. This guarantees mutual exclusion across microservice nodes and auto-releases locks if a node fails mid-transaction."
    }
  },
  {
    name: "TRACE",
    logo: traceLogo,
    full: "Transaction Risk & Anomaly Classification Engine",
    tag: "FinTech Microservices",
    desc: "Real-time financial fraud detection and risk scoring engine. Evaluates transactions against a pluggable 5-rule evaluation engine and triggers asynchronous email alerts and immutable audit logging via Kafka message pipelines.",
    tech: ["Spring Boot", "Spring Cloud", "Kafka", "Redis", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "Spring Security 6"],
    github: "https://github.com/ritik-hedau18/TRACE-Transaction-Risk-and-Anomaly-Classification-Engine",
    hasGithub: true,
    problem: "Payment platforms need to block fraudulent transactions instantly. Processing complex rule evaluations synchronously bottlenecks the user checkout flow and degrades system throughput.",
    solution: "Designed a distributed microservices structure using Spring Cloud. Decoupled transaction ingestion from risk profiling via high-throughput Kafka topics. Implemented a pluggable evaluation engine leveraging Redis for caching hot transaction thresholds.",
    impact: [
      "Evaluates up to 10,000 payment payloads per second with sub-45ms latency.",
      "Reduced main checkout thread overhead by 65% through async event staging.",
      "Pluggable design permits rule changes with zero redeployment downtime."
    ],
    deepDive: {
      title: "Idempotent Event Processing",
      detail: "Implements Kafka transaction IDs and unique UUID checksums in Redis to enforce strict idempotency. If a payment message is re-delivered during a network partition, the consumer rejects it automatically."
    }
  },
  {
    name: "SRIJAN",
    logo: srijanLogo,
    full: "AI-Powered Spring Boot Code Generator",
    tag: "AI Developer Tool",
    desc: "Developer productivity tool that translates natural language product descriptions into production-ready Spring Boot project templates. Renders code inside a Monaco editor and generates downloadable ZIP files.",
    tech: ["Spring Boot", "Spring AI", "Groq LLaMA", "React 19", "TypeScript", "Monaco Editor", "Tailwind CSS", "PostgreSQL"],
    github: "https://github.com/ritik-hedau18/SRIJAN",
    hasGithub: true,
    live: "https://srijanbyritik.vercel.app",
    problem: "Scaffolding backend microservices is a repetitive, error-prone chore that requires configuring entity models, controllers, databases, security, and build dependencies manually.",
    solution: "Engineered an AI code-generation workbench using Spring AI and Groq LLaMA 3. Constructed an intelligent parsing parser that yields structured JSON. Built a Monaco Editor sandbox to preview file structures and compile them into downloadable ZIP packages.",
    impact: [
      "Slashed microservice setup time from 4 hours to under 30 seconds.",
      "Generated templates conform 100% to clean code and dependency rules.",
      "Allowed immediate in-browser inspection of generated Java/XML files."
    ],
    deepDive: {
      title: "LLM Output Self-Correction",
      detail: "Constructs a feedback loop validating Groq LLaMA's outputs against a JSON schema. If parsing fails, the system automatically feeds the syntax error back into a correction prompt, achieving a 98.4% parser success rate."
    }
  },
  {
    name: "BITECRAFT",
    logo: foodflowLogo,
    full: "Full-Stack Food Delivery Application",
    tag: "Spring Boot + React",
    desc: "Production-ready full-stack food delivery application (Zomato/Swiggy-style). Features an optimized Spring Boot 3 REST API paired with a responsive React dashboard. Supports complete order lifecycles, lazy-load database query optimizations, real-time cart state synchronization, and role-based JWT authentication.",
    tech: ["Spring Boot 3", "React 19", "Redux Toolkit", "PostgreSQL", "Spring Security", "JWT", "Hibernate / JPA", "Tailwind CSS", "JUnit & Mockito"],
    github: "https://github.com/ritik-hedau18/Bitecraft",
    hasGithub: true,
    problem: "E-commerce databases struggle under dense menu reads and volatile cart writes, while frontend cart state can easily fall out of sync with backend transactional bounds during concurrent actions.",
    solution: "Developed a secure full-stack platform using Spring Boot 3 and React 19. Designed a Redux Toolkit state machine for local cart management, synchronizing asynchronously with optimized Hibernate databases using join-fetching to resolve N+1 queries.",
    impact: [
      "Eliminated 14 distinct database N+1 query bottlenecks.",
      "Accelerated restaurant menu fetch times by 300% under high loads.",
      "Attained 100% coverage on core transaction logic using JUnit and Mockito tests."
    ],
    deepDive: {
      title: "Preventing Inventory Overselling",
      detail: "Applies JPA optimistic locking (@Version) for fast cart reads/writes, but switches to pessimistic write locks (SELECT FOR UPDATE) on inventory balances during checkout to block concurrent double-reservations."
    }
  },
  {
    name: "ATLAS",
    logo: atlasLogo,
    full: "LinkedIn-Style Professional Network",
    tag: "Distributed Systems",
    desc: "Enterprise-scale professional network built with a 12-microservice topology. Features asynchronous notification events, high-speed profile search queries using Elasticsearch, and system monitoring using Prometheus/Grafana.",
    tech: ["Spring Boot", "Spring Cloud", "Kafka", "Elasticsearch", "Docker", "Kubernetes", "Prometheus", "Grafana", "JMeter"],
    github: "",
    hasGithub: false,
    problem: "Monolithic social platforms struggle with vertical scale limitations, high search latencies for user profiles, and a lack of granular monitoring during traffic peaks.",
    solution: "Designed a 12-microservice topology using Spring Cloud Eureka, Feign clients, and API Gateway. Built a real-time event pipeline using Apache Kafka. Integrated Elasticsearch for instant profile queries and set up Prometheus and Grafana for system health monitoring.",
    impact: [
      "99.99% system uptime achieved through circuit breakers and fallback routing.",
      "Cut user search query response time to <15ms using Elasticsearch indexing.",
      "Validated service stability up to 5,000 concurrent threads using JMeter."
    ],
    deepDive: {
      title: "Distributed Telemetry & Logging",
      detail: "Instruments Resilience4j circuit breakers across Feign clients. In the event of a microservice timeout, telemetry is exported to Prometheus, triggering auto-alerts in Grafana before failures cascade."
    }
  },
  {
    name: "ECHO",
    logo: echoLogo,
    full: "Event-Driven Chat & Hub Operations",
    tag: "Real-time Messaging",
    desc: "Real-time communication and messaging platform. Uses WebSockets and STOMP for live chat, Kafka for asynchronous log queuing, multi-database storage (Postgres/Mongo/Redis), and AES-256 chat history encryption.",
    tech: ["Spring Boot", "WebSocket / STOMP", "Kafka", "PostgreSQL", "MongoDB", "Redis", "React 19", "TypeScript", "Tailwind CSS"],
    github: "",
    hasGithub: false,
    problem: "Real-time messaging applications face chat lag, data loss during outages, and security risks if chat logs are stored in plain text.",
    solution: "Built a robust chat engine using WebSockets and STOMP. Implemented a Kafka buffer to store chat histories asynchronously in MongoDB, minimizing main memory pressure. Encrypted all messages at rest using AES-256.",
    impact: [
      "Supported 8,000+ simultaneous chat connections with zero packet drops.",
      "Zero chat database locking issues during test spikes due to Kafka queuing.",
      "Maintained full encryption compliance for stored historical records."
    ],
    deepDive: {
      title: "Horizontal WebSocket Scaling",
      detail: "Uses a Redis Pub/Sub backplane to synchronize messaging across multiple stateless WebSocket instances. Users connected to separate servers can exchange real-time STOMP packets seamlessly."
    }
  }
];

// Tech Stack Categories
const skills = {
  "Backend Development": ["Java 17/21", "Spring Boot", "Spring Cloud (Eureka, Gateway)", "Spring Security 6", "Spring AI", "Hibernate / JPA", "REST APIs", "Microservices"],
  "Messaging & Real-time": ["Apache Kafka", "RabbitMQ", "WebSocket / STOMP", "Event-Driven Architecture"],
  "Databases & Caching": ["PostgreSQL", "MongoDB", "Redis (Distributed Locks / Caching)", "Qdrant (Vector DB)"],
  "DevOps & Cloud": ["AWS (EC2, S3, RDS, IAM)", "Docker & Docker Compose", "Kubernetes", "CI/CD Pipelines", "Git / GitHub", "Maven"],
  "Frontend Development": ["React.js (React 19)", "Redux / Redux Toolkit", "TypeScript", "JavaScript", "Tailwind CSS", "React Query", "Context API", "HTML5 / CSS3"]
};

const navLinks = ["About", "Skills", "Projects", "Highlights", "Contact"];

const EMAIL = "ritikhedau9@gmail.com";
const PHONE = "+91 88156 09602";
const LOCATION = "Nagpur, India";
const RESUME_PATH = "";
const GITHUB_URL = "https://github.com/ritik-hedau18";

const MAILTO = `mailto:${EMAIL}?subject=Opportunity%20for%20Java%20Full%20Stack%20Developer&body=Hi%20Ritik%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect%20regarding%20a%20Java%20Full%20Stack%20Developer%20opportunity.%0A%0ACompany%3A%20%5BYour%20Company%5D%0ARole%3A%20%5BPosition%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ARegards%2C%0A%5BYour%20Name%5D`;

// Custom Intersection Observer hook for animation on scroll
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
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
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Scroll Spy Hook
function useScrollSpy() {
  const [active, setActive] = useState("About");
  
  useEffect(() => {
    const handler = () => {
      const sections = navLinks.map(n => document.getElementById(n.toLowerCase()));
      let currentSection = "About";
      sections.forEach(s => {
        if (s && window.scrollY >= s.offsetTop - 150) {
          currentSection = s.id.charAt(0).toUpperCase() + s.id.slice(1);
        }
      });
      setActive(currentSection);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  
  return active;
}

function scrollTo(id) {
  const target = document.getElementById(id);
  if (target) {
    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth"
    });
  }
}

// Typing Text Effect
function TypedText({ texts }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    let timer;
    const currentFullText = texts[index];
    
    if (isDeleting) {
      if (displayed === "") {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 150);
      } else {
        timer = setTimeout(() => {
          setDisplayed(currentFullText.substring(0, displayed.length - 1));
        }, 30);
      }
    } else {
      if (displayed === currentFullText) {
        timer = setTimeout(() => setIsDeleting(true), 2500);
      } else {
        timer = setTimeout(() => {
          setDisplayed(currentFullText.substring(0, displayed.length + 1));
        }, 70);
      }
    }

    return () => clearTimeout(timer);
  }, [displayed, isDeleting, index, texts]);

  return (
    <span>
      {displayed}
      <span className="blink-cursor"></span>
    </span>
  );
}

// SVGs collection for a premium look
const Icons = {
  Github: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  ),
  ExternalLink: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  ),
  Email: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  ),
  Location: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  ),

  // Highlight Cards Custom SVGs
  Ownership: () => (
    <svg viewBox="0 0 24 24" width="32" height="32" stroke="url(#cyan-blue-grad)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="cyan-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
      <line x1="8" y1="21" x2="16" y2="21"></line>
      <line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>
  ),
  Ai: () => (
    <svg viewBox="0 0 24 24" width="32" height="32" stroke="url(#cyan-blue-grad)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0 1 7.54 16.59l-1.42-1.42A8 8 0 1 0 5.88 15.17L4.46 16.59A10 10 0 0 1 12 2z"></path>
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M12 7v2M12 15v2M7 12H5M19 12h-2"></path>
    </svg>
  ),
  Cloud: () => (
    <svg viewBox="0 0 24 24" width="32" height="32" stroke="url(#cyan-blue-grad)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 24 24" width="32" height="32" stroke="url(#cyan-blue-grad)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  ),
  Speed: () => (
    <svg viewBox="0 0 24 24" width="32" height="32" stroke="url(#cyan-blue-grad)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  ),
  Product: () => (
    <svg viewBox="0 0 24 24" width="32" height="32" stroke="url(#cyan-blue-grad)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  )
};

function MatrixRain({ onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const katakana = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabet = katakana.split('');

    const fontSize = 16;
    const columns = Math.ceil(canvas.width / fontSize);

    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    const timer = setTimeout(() => {
      clearInterval(interval);
      if (onClose) onClose();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [onClose]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: 0.75
      }}
    />
  );
}

function TerminalWidget({ onHack, onChangeTheme }) {
  const [history, setHistory] = useState([
    "Welcome to Ritik Hedau's Developer Console [Version 2.1.0]",
    "Type 'help' to see list of available commands.",
    ""
  ]);
  const [inputValue, setInputValue] = useState("");
  const terminalBodyRef = useRef(null);

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const args = trimmed.split(/\s+/);
    const mainCommand = args[0];

    let output = [];

    switch (mainCommand) {
      case "help":
        output = [
          "Available commands:",
          "  help           Display this help listing",
          "  skills         Print technical developer skill stack",
          "  projects       Show consolidated completed projects",
          "  theme <name>   Switch page theme (deepspace, matrix, cyberpunk)",
          "  hack           Initiate simulation protocol",
          "  clear          Clear console scroll buffer"
        ];
        break;
      case "skills":
        output = [
          "Technical Stack:",
          "  Backend:  Java 17/21, Spring Boot, Spring Security 6, Hibernate JPA",
          "  Events:   Apache Kafka, Event-driven Messaging Architectures",
          "  Data:     PostgreSQL, MongoDB, Redis Caching & Distributed Locks",
          "  DevOps:   Docker & Docker Compose, Kubernetes Clusters, AWS Deployments",
          "  Frontend: React 19, Redux, TypeScript, Tailwind CSS"
        ];
        break;
      case "projects":
        output = [
          "Completed Projects:",
          "  * NEXUS: AI Workspace Retrieval-Augmented Generation (RAG) platform",
          "  * TRACE: Real-time FinTech Fraud Microservices & Kafka Pipeline",
          "  * SRIJAN: Plain-English Spring Boot Code template Builder",
          "  * FoodFlow: REST API food-delivery server with JWT Security",
          "Type 'help' or explore cards below for interactive previews."
        ];
        break;
      case "theme":
        if (args[1] === "deepspace" || args[1] === "matrix" || args[1] === "cyberpunk") {
          onChangeTheme(args[1]);
          output = [`Theme changed successfully to: ${args[1]}`];
        } else {
          output = ["Usage: theme [deepspace | matrix | cyberpunk]"];
        }
        break;
      case "hack":
        onHack();
        output = ["Initializing digital rain simulation protocol...", "Matrix hacking stream activated."];
        break;
      case "clear":
        setHistory([]);
        return;
      case "":
        output = [];
        break;
      default:
        output = [`Command not found: ${mainCommand}. Type 'help' for suggestions.`];
    }

    setHistory(prev => [...prev, `ritik-portfolio $ ${cmd}`, ...output, ""]);
  };

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommand(inputValue);
    setInputValue("");
  };

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <span className="terminal-button terminal-red"></span>
        <span className="terminal-button terminal-yellow"></span>
        <span className="terminal-button terminal-green"></span>
        <span className="terminal-title">developer@ritik: ~</span>
      </div>
      <div className="terminal-body" ref={terminalBodyRef}>
        {history.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <form onSubmit={handleSubmit} className="terminal-input-line">
          <span className="terminal-prompt">$</span>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="terminal-input-box"
            autoFocus
            autoComplete="off"
            spellCheck="false"
            placeholder="Type a command..."
          />
        </form>
      </div>
    </div>
  );
}

const Markers = () => (
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(243, 244, 246, 0.2)" />
    </marker>
    <marker id="arrow-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#06B6D4" />
    </marker>
    <marker id="arrow-indigo" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#6366F1" />
    </marker>
  </defs>
);

function ArchitectureVisualizer({ name }) {

  const renderNode = (x, y, title, subtitle) => {
    const w = 95;
    const h = 50;
    return (
      <g key={title}>
        <rect 
          x={x - w/2} 
          y={y - h/2} 
          width={w} 
          height={h} 
          rx={8} 
          className="arch-node"
        />
        <text x={x} y={y - 2} className="arch-text-title">{title}</text>
        <text x={x} y={y + 14} className="arch-text-subtitle">{subtitle}</text>
      </g>
    );
  };

  if (name === "NEXUS") {
    return (
      <div className="arch-container">
        <div style={{ fontSize: "0.85rem", color: "#06B6D4", fontFamily: "'Fira Code', monospace", marginBottom: 12, fontWeight: 500 }}>
          // RAG Pipeline & Similarity Search Flow
        </div>
        <svg viewBox="0 0 660 120" style={{ width: "100%", height: "auto" }}>
          <Markers />
          {/* Paths */}
          <path d="M 107.5 60 L 152.5 60" className="arch-flow-line" markerEnd="url(#arrow)" />
          <path d="M 107.5 60 L 152.5 60" className="arch-flow-pulse" markerEnd="url(#arrow-cyan)" />
          
          <path d="M 247.5 60 L 292.5 60" className="arch-flow-line" markerEnd="url(#arrow)" />
          <path d="M 247.5 60 L 292.5 60" className="arch-flow-pulse" markerEnd="url(#arrow-cyan)" />
          
          <path d="M 552.5 50 Q 470 20 387.5 50" className="arch-flow-line" markerEnd="url(#arrow)" />
          <path d="M 552.5 50 Q 470 20 387.5 50" className="arch-flow-pulse-indigo" markerEnd="url(#arrow-indigo)" />
          
          <path d="M 387.5 60 L 432.5 60" className="arch-flow-line" markerEnd="url(#arrow)" />
          <path d="M 387.5 60 L 432.5 60" className="arch-flow-pulse" markerEnd="url(#arrow-cyan)" />
          
          <path d="M 527.5 60 L 552.5 60" className="arch-flow-line" markerEnd="url(#arrow)" />
          <path d="M 527.5 60 L 552.5 60" className="arch-flow-pulse" markerEnd="url(#arrow-cyan)" />

          {/* Nodes */}
          {renderNode(60, 60, "Doc Ingestion", "PDF / DOCX")}
          {renderNode(200, 60, "Jina AI API", "Embedding Model")}
          {renderNode(340, 60, "Qdrant DB", "Vector Index")}
          {renderNode(480, 60, "Groq LLaMA", "RAG LLM Engine")}
          {renderNode(600, 60, "SSE Chat UI", "User Session")}
        </svg>
      </div>
    );
  }

  if (name === "TRACE") {
    return (
      <div className="arch-container">
        <div style={{ fontSize: "0.85rem", color: "#06B6D4", fontFamily: "'Fira Code', monospace", marginBottom: 12, fontWeight: 500 }}>
          // Real-time Event-Driven Fraud Analysis
        </div>
        <svg viewBox="0 0 660 120" style={{ width: "100%", height: "auto" }}>
          <Markers />
          {/* Paths */}
          <path d="M 107.5 60 L 152.5 60" className="arch-flow-line" markerEnd="url(#arrow)" />
          <path d="M 107.5 60 L 152.5 60" className="arch-flow-pulse" markerEnd="url(#arrow-cyan)" />
          
          <path d="M 247.5 60 L 292.5 60" className="arch-flow-line" markerEnd="url(#arrow)" />
          <path d="M 247.5 60 L 292.5 60" className="arch-flow-pulse" markerEnd="url(#arrow-cyan)" />
          
          <path d="M 387.5 60 L 432.5 60" className="arch-flow-line" markerEnd="url(#arrow)" />
          <path d="M 387.5 60 L 432.5 60" className="arch-flow-pulse" markerEnd="url(#arrow-cyan)" />
          
          <path d="M 387.5 70 Q 470 100 552.5 70" className="arch-flow-line" markerEnd="url(#arrow)" />
          <path d="M 387.5 70 Q 470 100 552.5 70" className="arch-flow-pulse-indigo" markerEnd="url(#arrow-indigo)" />

          {/* Nodes */}
          {renderNode(60, 60, "Client Txn", "HTTP Payload")}
          {renderNode(200, 60, "API Gateway", "Spring Cloud")}
          {renderNode(340, 60, "Kafka Broker", "Event Pipeline")}
          {renderNode(480, 60, "Rule Engine", "Strategy + Redis")}
          {renderNode(600, 60, "Audit Service", "MongoDB Store")}
        </svg>
      </div>
    );
  }

  if (name === "SRIJAN") {
    return (
      <div className="arch-container">
        <div style={{ fontSize: "0.85rem", color: "#06B6D4", fontFamily: "'Fira Code', monospace", marginBottom: 12, fontWeight: 500 }}>
          // Natural Language to Spring Boot Project Compilation
        </div>
        <svg viewBox="0 0 660 120" style={{ width: "100%", height: "auto" }}>
          <Markers />
          {/* Paths */}
          <path d="M 107.5 60 L 152.5 60" className="arch-flow-line" markerEnd="url(#arrow)" />
          <path d="M 107.5 60 L 152.5 60" className="arch-flow-pulse" markerEnd="url(#arrow-cyan)" />
          
          <path d="M 247.5 60 L 292.5 60" className="arch-flow-line" markerEnd="url(#arrow)" />
          <path d="M 247.5 60 L 292.5 60" className="arch-flow-pulse" markerEnd="url(#arrow-cyan)" />
          
          <path d="M 387.5 60 L 432.5 60" className="arch-flow-line" markerEnd="url(#arrow)" />
          <path d="M 387.5 60 L 432.5 60" className="arch-flow-pulse" markerEnd="url(#arrow-cyan)" />

          <path d="M 527.5 60 L 552.5 60" className="arch-flow-line" markerEnd="url(#arrow)" />
          <path d="M 527.5 60 L 552.5 60" className="arch-flow-pulse" markerEnd="url(#arrow-cyan)" />

          {/* Nodes */}
          {renderNode(60, 60, "User Prompt", "Natural English")}
          {renderNode(200, 60, "Spring AI", "LLaMA 3 API")}
          {renderNode(340, 60, "Parser Engine", "JSON Structuring")}
          {renderNode(480, 60, "Monaco Editor", "Live Code Preview")}
          {renderNode(600, 60, "ZIP Generator", "Template Builder")}
        </svg>
      </div>
    );
  }

  if (name === "FoodFlow") {
    return (
      <div className="arch-container">
        <div style={{ fontSize: "0.85rem", color: "#06B6D4", fontFamily: "'Fira Code', monospace", marginBottom: 12, fontWeight: 500 }}>
          // Full-Stack Platform Flow & State Sync
        </div>
        <svg viewBox="0 0 660 120" style={{ width: "100%", height: "auto" }}>
          <Markers />
          {/* Paths */}
          <path d="M 107.5 60 L 152.5 60" className="arch-flow-line" markerEnd="url(#arrow)" />
          <path d="M 107.5 60 L 152.5 60" className="arch-flow-pulse" markerEnd="url(#arrow-cyan)" />
          
          <path d="M 247.5 60 L 292.5 60" className="arch-flow-line" markerEnd="url(#arrow)" />
          <path d="M 247.5 60 L 292.5 60" className="arch-flow-pulse" markerEnd="url(#arrow-cyan)" />
          
          <path d="M 387.5 60 L 432.5 60" className="arch-flow-line" markerEnd="url(#arrow)" />
          <path d="M 387.5 60 L 432.5 60" className="arch-flow-pulse" markerEnd="url(#arrow-cyan)" />

          <path d="M 527.5 60 L 552.5 60" className="arch-flow-line" markerEnd="url(#arrow)" />
          <path d="M 527.5 60 L 552.5 60" className="arch-flow-pulse" markerEnd="url(#arrow-cyan)" />

          {/* Nodes */}
          {renderNode(60, 60, "React UI", "Redux Cart Store")}
          {renderNode(200, 60, "Axios client", "JWT Auth Headers")}
          {renderNode(340, 60, "Spring Gateway", "Spring Security 6")}
          {renderNode(480, 60, "Hibernate ORM", "Entity Graph Join")}
          {renderNode(600, 60, "PostgreSQL", "Relational Store")}
        </svg>
      </div>
    );
  }

  return null;
}

// Project Card component
function ProjectGridCard({ p, index, onClick }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <FadeIn delay={index * 0.06}>
      <div
        className="project-grid-card"
        onClick={onClick}
        onMouseMove={handleMouseMove}
      >
        {p.logo && (
          <div className="project-logo-container">
            <img src={p.logo} alt={`${p.name} Logo`} />
          </div>
        )}
        <div className="project-grid-card-name">{p.name}</div>
        <span className="project-grid-card-tag">{p.tag}</span>
        <div className="project-grid-card-full">{p.full}</div>
        <div className="project-grid-card-hint">
          <span>View Details →</span>
        </div>
      </div>
    </FadeIn>
  );
}

function ProjectDetailView({ p, onBack }) {
  const [expandedPanel, setExpandedPanel] = useState("architecture");

  return (
    <div className="project-detail-view">
      <button className="project-detail-back-btn" onClick={onBack}>
        ← All Projects
      </button>

      <div
        className="glass-panel"
        style={{
          borderRadius: 20,
          padding: "clamp(24px, 4vw, 44px)",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(243, 244, 246, 0.06)",
        }}
      >
        {/* Glow Line Top */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, transparent, var(--accent-cyan), transparent)",
        }} />

        {/* Header: Logo + Title */}
        <div className="project-detail-header" style={{ display: "flex", gap: "28px", alignItems: "center", flexWrap: "wrap", marginBottom: "32px" }}>
          {p.logo && (
            <div className="project-detail-logo">
              <img src={p.logo} alt={`${p.name} Logo`} />
            </div>
          )}
          <div style={{ flex: 1, minWidth: "250px" }}>
            <span style={{
              fontSize: "0.7rem",
              fontFamily: "'Fira Code', monospace",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "var(--accent-cyan)",
              background: "rgba(6, 182, 212, 0.08)",
              border: "1px solid rgba(6, 182, 212, 0.15)",
              borderRadius: 4,
              padding: "4px 10px",
              display: "inline-block",
              marginBottom: 10,
            }}>{p.tag}</span>
            <h3 style={{ fontSize: "clamp(1.8rem, 3vw, 2.3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 6, letterSpacing: "-0.8px", lineHeight: 1.1 }}>{p.name}</h3>
            <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", fontStyle: "italic", margin: 0 }}>{p.full}</p>
          </div>
        </div>

        {/* Detail Grid */}
        <div className="project-detail-grid">
          {/* Left Column: Description, Problem/Solution, Architecture */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div>
              <h4 className="detail-section-title">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-cyan)" }}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Project Overview
              </h4>
              <p style={{ fontSize: "1.02rem", lineHeight: 1.75, color: "var(--text-muted)", margin: 0 }}>{p.desc}</p>
            </div>

            {/* Problem & Solution Card */}
            {(p.problem || p.solution) && (
              <div>
                <h4 className="detail-section-title">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-cyan)" }}>
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                  Engineering Challenge & Solution
                </h4>
                <div className="problem-solution-card">
                  <div>
                    <h5 style={{ fontSize: "0.88rem", fontWeight: 700, color: "#EF4444", marginBottom: 10, letterSpacing: "1px", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#EF4444" }}></span>
                      THE CHALLENGE
                    </h5>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--text-muted)", margin: 0 }}>{p.problem}</p>
                  </div>
                  <div style={{ borderLeft: "1px solid rgba(243, 244, 246, 0.08)", paddingLeft: "20px" }} className="sol-divider">
                    <h5 style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--accent-cyan)", marginBottom: 10, letterSpacing: "1px", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--accent-cyan)" }}></span>
                      THE SOLUTION
                    </h5>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--text-muted)", margin: 0 }}>{p.solution}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Architecture Visualizer (Inline when available) */}
            {p.hasGithub && ["NEXUS", "TRACE", "SRIJAN", "FoodFlow"].includes(p.name) && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h4 className="detail-section-title" style={{ margin: 0, border: "none", padding: 0 }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-cyan)" }}>
                      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                      <polyline points="2 17 12 22 22 17"></polyline>
                      <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                    System Architecture
                  </h4>
                  <button
                    onClick={() => setExpandedPanel(expandedPanel === "architecture" ? null : "architecture")}
                    className="btn-arch-toggle"
                    style={{
                      padding: "6px 12px",
                      fontSize: "0.75rem",
                      background: expandedPanel === "architecture" ? "rgba(6, 182, 212, 0.08)" : "transparent",
                      borderColor: expandedPanel === "architecture" ? "var(--accent-cyan)" : "rgba(6, 182, 212, 0.12)"
                    }}
                  >
                    {expandedPanel === "architecture" ? "Hide Diagram" : "Show Diagram"}
                  </button>
                </div>
                {expandedPanel === "architecture" && (
                  <ArchitectureVisualizer name={p.name} />
                )}
              </div>
            )}
          </div>

          {/* Right Column: Meta info, Tech stack, Actions, Impact, Testimonial */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {/* Tech Stack section */}
            <div>
              <h4 className="detail-section-title">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-cyan)" }}>
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                Tech Stack
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {p.tech.map(t => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div>
              <h4 className="detail-section-title">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-cyan)" }}>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Project Assets & Links
              </h4>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {p.hasGithub ? (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                    style={{
                      borderRadius: 8,
                      padding: "10px 18px",
                      fontSize: "0.85rem",
                      textDecoration: "none",
                      flex: 1,
                      justifyContent: "center"
                    }}
                  >
                    <Icons.Github />
                    <span>View Code</span>
                    <Icons.ExternalLink />
                  </a>
                ) : (
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    color: "var(--text-muted)",
                    fontSize: "0.85rem",
                    fontStyle: "italic",
                    opacity: 0.75,
                    border: "1px dashed rgba(243, 244, 246, 0.08)",
                    borderRadius: 8,
                    padding: "10px 18px",
                    flex: 1
                  }}>
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 2 }}>
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>Currently Working</span>
                  </div>
                )}

                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                    style={{
                      borderRadius: 8,
                      padding: "10px 18px",
                      fontSize: "0.85rem",
                      textDecoration: "none",
                      flex: 1,
                      justifyContent: "center",
                      color: "#030712"
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <span>Live Demo</span>
                    <Icons.ExternalLink />
                  </a>
                )}
              </div>
            </div>

            {/* Impact / Results section */}
            {p.impact && p.impact.length > 0 && (
              <div>
                <h4 className="detail-section-title">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-cyan)" }}>
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                  Engineering Impact
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {p.impact.map((imp, idx) => (
                    <li key={idx} style={{ display: "flex", gap: 10, fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                      <span style={{ color: "var(--accent-cyan)", fontWeight: 700, flexShrink: 0 }}>✓</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical Deep Dive section */}
            {p.deepDive && (
              <div>
                <h4 className="detail-section-title">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-cyan)" }}>
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  Technical Deep Dive
                </h4>
                <div className="deep-dive-card">
                  <div style={{ position: "absolute", top: 12, right: 16, opacity: 0.08, color: "var(--accent-cyan)", pointerEvents: "none" }}>
                    <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </div>
                  <div className="deep-dive-title">{p.deepDive.title}</div>
                  <div className="deep-dive-detail">{p.deepDive.detail}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Back Button */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "40px", borderTop: "1px solid rgba(243, 244, 246, 0.05)", paddingTop: "24px" }}>
          <button className="project-detail-back-btn" onClick={onBack} style={{ margin: 0 }}>
            ← Back to All Projects
          </button>
        </div>
      </div>
    </div>
  );
}

// Skill Group component
function SkillGroup({ group, items, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn delay={index * 0.06}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="glass-panel"
        style={{
          borderRadius: 14,
          padding: "24px",
          height: "100%",
          transform: hovered ? "translateY(-3px)" : "none",
          border: `1px solid ${hovered ? "rgba(6, 182, 212, 0.2)" : "rgba(243, 244, 246, 0.05)"}`,
        }}
      >
        <div style={{
          fontSize: "0.8rem",
          fontFamily: "'Fira Code', monospace",
          color: "#06B6D4",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          marginBottom: 16,
          fontWeight: 600
        }}>
          {group}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {items.map(item => (
            <span key={item} className="tech-badge" style={{ background: "rgba(31, 41, 55, 0.35)", color: "var(--text)" }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

// Value Highlight Card component
function HighlightCard({ item }) {
  const [hovered, setHovered] = useState(false);
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-panel glass-panel-glow"
      style={{
        borderRadius: 16,
        padding: "32px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: hovered ? "translateY(-4px)" : "none",
        border: `1px solid ${hovered ? "rgba(6, 182, 212, 0.25)" : "rgba(243, 244, 246, 0.05)"}`,
        cursor: "default",
        height: "100%",
      }}
    >
      <div style={{ marginBottom: 18, filter: hovered ? "drop-shadow(0 0 6px rgba(6, 182, 212, 0.3))" : "none", transition: "all 0.2s" }}>
        {item.icon()}
      </div>
      <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text)", marginBottom: 10 }}>{item.title}</h3>
      <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--text-muted)", margin: 0 }}>{item.desc}</p>
    </div>
  );
}

export default function Portfolio() {
  const active = useScrollSpy();
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("deepspace"); // deepspace, matrix, cyberpunk
  const [isHacking, setIsHacking] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    document.body.className = theme === "deepspace" ? "" : `theme-${theme}`;
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightItems = [
    {
      icon: Icons.Ownership,
      title: "End-to-End Ownership",
      desc: "I own features from database modeling and REST API development to polished React frontends. I bridge server-side stability with client-side user experience.",
    },
    {
      icon: Icons.Ai,
      title: "AI-Integrated Backends",
      desc: "Experienced in designing and implementing Retrieval-Augmented Generation (RAG) pipelines, semantic vector search (Qdrant), and LLM text generation via Spring AI.",
    },
    {
      icon: Icons.Cloud,
      title: "Cloud & Container Native",
      desc: "Autonomously deploy containerized architectures (Docker/Kubernetes) and provision AWS cloud resources (EC2, S3, RDS) to build scalable, highly available systems.",
    },
    {
      icon: Icons.Lock,
      title: "Security by Design",
      desc: "Every feature is secured from day one. I implement Spring Security 6, stateless JWT access/refresh token flows, and Role-Based Access Control (RBAC) on both client and server sides.",
    },
    {
      icon: Icons.Speed,
      title: "Performance Aware",
      desc: "Utilizing Redis caching and distributed locks to prevent race conditions, and Kafka for async message queuing, I write code designed to run efficiently under load.",
    },
    {
      icon: Icons.Product,
      title: "Production Mindset",
      desc: "I focus on maintainable, production-ready code. Writing unit tests (JUnit, Mockito), working in Agile environments, and setting up Docker are part of my daily practices.",
    }
  ];
  return (
    <div style={{ minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      {/* Matrix Hacking Overlay */}
      {isHacking && <MatrixRain onClose={() => setIsHacking(false)} />}

      {/* Decorative Blur Background Blobs */}
      <div className="floating-blob blob-cyan" style={{ top: "10%", right: "-5%", width: "50%", aspectRatio: "1" }} />
      <div className="floating-blob blob-indigo" style={{ bottom: "20%", left: "-10%", width: "40%", aspectRatio: "1" }} />
      <div className="bg-grid-pattern" />

      {/* NAVIGATION HEADER */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 6%", height: 72,
        background: scrolled ? "rgba(3, 7, 18, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(243, 244, 246, 0.05)" : "none",
        transition: "all 0.3s ease",
      }}>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "1.35rem", letterSpacing: "-0.5px" }}>
          RH<span style={{ color: "#06B6D4" }}>.</span>
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          {navLinks.map(l => (
            <button 
              key={l} 
              onClick={() => scrollTo(l.toLowerCase())} 
              className={`nav-link ${active === l ? "active" : ""}`}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px 16px",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {l}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button 
            onClick={() => {
              const themes = ["deepspace", "matrix", "cyberpunk"];
              const nextIdx = (themes.indexOf(theme) + 1) % themes.length;
              setTheme(themes[nextIdx]);
            }}
            className="btn-theme-selector"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            <span>🎨 Theme:</span>
            <span style={{ color: "var(--accent-cyan)", textTransform: "capitalize", fontWeight: 600 }}>{theme}</span>
          </button>
          
          <a 
            href={GITHUB_URL} 
            target="_blank" 
            rel="noreferrer" 
            className="btn-secondary" 
            style={{ borderRadius: 8, padding: "8px 16px", fontSize: "0.85rem" }}
          >
            <Icons.Github />
            <span>GitHub</span>
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "120px 6% 60px",
        position: "relative",
        zIndex: 2,
      }}>
        <div className="hero-grid" style={{ 
          display: "grid", 
          gridTemplateColumns: "1.2fr 1fr", 
          gap: 64, 
          width: "100%", 
          alignItems: "center" 
        }}>
          <div>
            {/* Status Badge */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(6, 182, 212, 0.08)",
              border: "1px solid rgba(6, 182, 212, 0.2)",
              borderRadius: 24,
              padding: "6px 16px",
              fontSize: "0.85rem",
              color: "#06B6D4",
              marginBottom: 28,
              fontFamily: "'Fira Code', monospace",
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#06B6D4", display: "inline-block", animation: "pulse-slow 2s infinite" }} />
              Open to Opportunities
            </div>

            <h1 style={{
              fontSize: "clamp(36px, 5.5vw, 68px)",
              fontWeight: 800,
              lineHeight: 1.05,
              margin: "0 0 16px",
              letterSpacing: "-2.5px",
            }}>
              Engineering Scalable<br />
              <span className="text-gradient">Full-Stack Applications</span>
            </h1>

            <p style={{
              fontSize: "clamp(18px, 2.5vw, 24px)",
              fontWeight: 400,
              color: "var(--text-muted)",
              marginBottom: 24,
              fontFamily: "'Outfit', sans-serif"
            }}>
              I'm <span style={{ color: "var(--text)", fontWeight: 500 }}>Ritik Hedau</span>, a <TypedText texts={["Java Full Stack Developer", "Full Stack Software Engineer", "AI/RAG Integrator"]} />
            </p>

            <p style={{
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "var(--text-muted)",
              maxWidth: 620,
              marginBottom: 44,
            }}>
              Specialized in crafting secure multi-tenant microservices, event-driven backends, and modular React UIs. I bridge server reliability with fluid interface architecture, creating production-grade applications that scale.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("projects")} className="btn-primary" style={{ borderRadius: 8, padding: "12px 28px", fontSize: "0.95rem" }}>
                <span>Explore Projects</span>
                <span>→</span>
              </button>
              <a href={RESUME_PATH} download="Ritik_Hedau_Resume.pdf" className="btn-secondary" style={{ borderRadius: 8, padding: "12px 28px", fontSize: "0.95rem", textDecoration: "none" }}>
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Download Resume</span>
              </a>
              <button onClick={() => scrollTo("contact")} className="btn-secondary" style={{ borderRadius: 8, padding: "12px 28px", fontSize: "0.95rem" }}>
                <span>Let's Connect</span>
              </button>
            </div>
          </div>
          <div>
            <TerminalWidget onHack={() => { setIsHacking(true); setTheme("matrix"); }} onChangeTheme={setTheme} />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" style={{
        position: "relative",
        zIndex: 2,
        padding: "100px 6% 60px",
        background: "rgba(10, 15, 30, 0.3)",
        borderTop: "1px solid rgba(243, 244, 246, 0.03)",
        borderBottom: "1px solid rgba(243, 244, 246, 0.03)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.8rem", color: "#06B6D4", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>// background</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-1px", marginBottom: 48 }}>About Me</h2>
          </FadeIn>

          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 64, alignItems: "start" }}>
            <FadeIn delay={0.1}>
              <div>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: 20 }}>
                  I am a Java Full Stack Developer with 2+ years of experience engineering high-performance web applications, distributed microservices, and interactive client-side interfaces. I specialize in building robust backend services with Spring Boot and writing clean, responsive frontends in React.js and TypeScript.
                </p>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: 20 }}>
                  I am a self-driven software engineer who thrives on solving complex programming challenges and building clean architectures. My technical experience covers designing event-driven microservices with Apache Kafka/RabbitMQ, modeling relational and NoSQL database schemas, and orchestrating container environments using Docker and Kubernetes on AWS.
                </p>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: 20 }}>
                  I am constantly exploring new technologies to keep my skills on the cutting edge. Recently, I have been building AI-integrated solutions using Spring AI, incorporating large language models (LLMs) with vector databases (Qdrant) to design context-aware, semantic search-enabled workspaces.
                </p>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)", margin: 0 }}>
                  I approach development with a production mindset—meaning I design software around clean architecture patterns, code testability (JUnit, Mockito), stateless session securities, and containerized deployment scaling.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="glass-panel" style={{
                borderRadius: 16,
                padding: "36px 28px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid rgba(243, 244, 246, 0.05)"
              }}>
                <div className="profile-img-container" style={{ marginBottom: 20 }}>
                  <div className="profile-img-glow" />
                  <img
                    src="https://avatars.githubusercontent.com/u/250507116?v=4"
                    alt="Ritik Hedau"
                    className="profile-img"
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text)" }}>Ritik Hedau</h3>
                  <div style={{ fontSize: "0.9rem", color: "#06B6D4", marginTop: 4, fontWeight: 500 }}>Java Full Stack Developer</div>
                  <div style={{ width: "60px", height: 1, background: "rgba(6, 182, 212, 0.3)", margin: "16px auto" }} />
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.85rem", color: "var(--text-muted)", textAlign: "left" }}>
                    <div style={{ display: "flex", gap: 10 }}>
                      <span style={{ color: "#06B6D4" }}>📍 Location:</span>
                      <span>{LOCATION}</span>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <span style={{ color: "#06B6D4" }}>🎓 Education:</span>
                      <span>B.Tech · RGPV Bhopal</span>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <span style={{ color: "#06B6D4" }}>💼 Experience:</span>
                      <span>2+ Years Experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" style={{
        position: "relative",
        zIndex: 2,
        padding: "100px 6% 60px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.8rem", color: "#06B6D4", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>// tech stack</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-1px", marginBottom: 12 }}>Skills & Technologies</h2>
          </FadeIn>
          
          <div className="skills-grid">
            {Object.entries(skills).map(([group, items], i) => (
              <SkillGroup key={group} group={group} items={items} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" style={{
        position: "relative",
        zIndex: 2,
        padding: "100px 6% 60px",
        background: "rgba(10, 15, 30, 0.3)",
        borderTop: "1px solid rgba(243, 244, 246, 0.03)",
        borderBottom: "1px solid rgba(243, 244, 246, 0.03)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.8rem", color: "#06B6D4", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>// work</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-1px", marginBottom: 12 }}>Projects Showcase</h2>
          </FadeIn>
          
          {selectedProject === null ? (
            <div className="projects-grid">
              {projects.map((p, i) => (
                <ProjectGridCard
                  key={p.name}
                  p={p}
                  index={i}
                  onClick={() => {
                    setSelectedProject(p);
                    setTimeout(() => {
                      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 50);
                  }}
                />
              ))}
            </div>
          ) : (
            <ProjectDetailView
              p={selectedProject}
              onBack={() => setSelectedProject(null)}
            />
          )}
        </div>
      </section>

      {/* WHAT I BRING (HIGHLIGHTS) */}
      <section id="highlights" style={{
        position: "relative",
        zIndex: 2,
        padding: "100px 6% 60px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.8rem", color: "#06B6D4", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>// values</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-1px", marginBottom: 12 }}>What I Bring</h2>
          </FadeIn>
          
          <div className="cards-grid">
            {highlightItems.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.05}>
                <HighlightCard item={item} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" style={{
        position: "relative",
        zIndex: 2,
        padding: "100px 6% 120px",
        background: "rgba(10, 15, 30, 0.3)",
        borderTop: "1px solid rgba(243, 244, 246, 0.03)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.8rem", color: "#06B6D4", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>// connect</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-1px", marginBottom: 40 }}>Let's Talk</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="glass-panel" style={{
              borderRadius: 24,
              padding: "56px 40px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              border: "1px solid rgba(243, 244, 246, 0.05)"
            }}>
              {/* Radial gradient background aura */}
              <div style={{
                position: "absolute", 
                top: "30%", 
                left: "50%", 
                transform: "translate(-50%,-50%)", 
                width: "50%", 
                aspectRatio: "1", 
                background: "radial-gradient(circle, rgba(6, 182, 212, 0.07) 0%, transparent 70%)", 
                pointerEvents: "none" 
              }} />

              <h3 style={{ fontSize: "2.2rem", fontWeight: 700, letterSpacing: "-1px", marginBottom: 12, color: "var(--text)" }}>
                Start a Conversation
              </h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", marginBottom: 40, maxWidth: 520, margin: "0 auto 40px" }}>
                I am looking for Java Full Stack Developer opportunities. Please get in touch.
              </p>

              {/* Email Card Link */}
              <div style={{ marginBottom: 44 }}>
                <a
                  href={MAILTO}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "16px 32px",
                    border: "1px solid rgba(243, 244, 246, 0.08)",
                    borderRadius: 12,
                    textDecoration: "none",
                    color: "var(--text)",
                    fontSize: "1.05rem",
                    fontFamily: "'Fira Code', monospace",
                    transition: "all 0.3s ease",
                    background: "rgba(17, 24, 39, 0.5)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent-cyan)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(6, 182, 212, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(243, 244, 246, 0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Icons.Email />
                  <span>{EMAIL}</span>
                  <Icons.ExternalLink />
                </a>
              </div>

              {/* Grid of contact links */}
              <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
                <button 
                  className="btn-primary" 
                  onClick={copyEmail} 
                  style={{ borderRadius: 8, padding: "12px 28px", fontSize: "0.9rem" }}
                >
                  <span>{copied ? "✓ Copied!" : "📋 Copy Email Address"}</span>
                </button>
                <a 
                  href={`tel:${PHONE.replace(/\s+/g, '')}`} 
                  className="btn-secondary" 
                  style={{ borderRadius: 8, padding: "12px 28px", fontSize: "0.9rem", textDecoration: "none" }}
                >
                  <Icons.Phone />
                  <span>{PHONE}</span>
                </a>

                <a 
                  href={GITHUB_URL} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-secondary" 
                  style={{ borderRadius: 8, padding: "12px 28px", fontSize: "0.9rem", textDecoration: "none" }}
                >
                  <Icons.Github />
                  <span>GitHub</span>
                </a>
              </div>
              
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginTop: 40, fontSize: "0.9rem", color: "var(--text-muted)" }}>
                <Icons.Location />
                <span>{LOCATION}</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        textAlign: "center", 
        padding: "32px 5%",
        borderTop: "1px solid rgba(243, 244, 246, 0.04)",
        color: "var(--text-muted)", 
        fontSize: "0.85rem",
        background: "#030712",
        position: "relative",
        zIndex: 2
      }}>
        <span>Built by <span style={{ color: "#06B6D4", fontWeight: 500 }}>Ritik Hedau</span> — Java Full Stack Developer</span>
      </footer>
    </div>
  );
}