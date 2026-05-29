import { useState, useEffect, useRef } from "react";

// Project Database
const projects = [
  {
    name: "NEXUS",
    full: "Neural Enterprise Knowledge Unification System",
    tag: "AI + Vector RAG",
    desc: "AI-powered document intelligence and workspace collaboration platform. Features a Retrieval-Augmented Generation (RAG) pipeline allowing users to perform semantic search and chat directly with uploaded documents (PDF, DOCX).",
    tech: ["Spring Boot", "Spring AI", "Groq LLaMA 3.3", "Qdrant Vector DB", "React 19", "TypeScript", "PostgreSQL", "Docker"],
    github: "https://github.com/ritik-hedau18/NEXUS",
    hasGithub: true,
    live: "https://nexus-ritik.netlify.app",
  },
  {
    name: "TRACE",
    full: "Transaction Risk & Anomaly Classification Engine",
    tag: "FinTech Microservices",
    desc: "Real-time financial fraud detection and risk scoring engine. Evaluates transactions against a pluggable 5-rule evaluation engine and triggers asynchronous email alerts and immutable audit logging via Kafka message pipelines.",
    tech: ["Spring Boot", "Spring Cloud", "Kafka", "Redis", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "Spring Security 6"],
    github: "https://github.com/ritik-hedau18/TRACE-Transaction-Risk-and-Anomaly-Classification-Engine",
    hasGithub: true,
  },
  {
    name: "SRIJAN",
    full: "AI-Powered Spring Boot Code Generator",
    tag: "AI Developer Tool",
    desc: "Developer productivity tool that translates natural language product descriptions into production-ready Spring Boot project templates. Renders code inside a Monaco editor and generates downloadable ZIP files.",
    tech: ["Spring Boot", "Spring AI", "Groq LLaMA", "React 19", "TypeScript", "Monaco Editor", "Tailwind CSS", "PostgreSQL"],
    github: "https://github.com/ritik-hedau18/SRIJAN",
    hasGithub: true,
  },
  {
    name: "FoodFlow",
    full: "Food Delivery Backend API",
    tag: "RESTful Web Services",
    desc: "Production-ready REST API for a multi-role food delivery service. Supports complete order lifecycles, lazy-load database query optimizations, custom cart state management, and role-based JWT authentication.",
    tech: ["Java 17", "Spring Boot 3", "PostgreSQL", "Spring Security", "JWT", "Hibernate", "JPA", "JUnit", "Mockito"],
    github: "https://github.com/ritik-hedau18/food-delivery-backend",
    hasGithub: true,
  },
  {
    name: "ATLAS",
    full: "LinkedIn-Style Professional Network",
    tag: "Distributed Systems",
    desc: "Enterprise-scale professional network built with a 12-microservice topology. Features asynchronous notification events, high-speed profile search queries using Elasticsearch, and system monitoring using Prometheus/Grafana.",
    tech: ["Spring Boot", "Spring Cloud", "Kafka", "Elasticsearch", "Docker", "Kubernetes", "Prometheus", "Grafana", "JMeter"],
    github: "",
    hasGithub: false,
  },
  {
    name: "ECHO",
    full: "Event-Driven Chat & Hub Operations",
    tag: "Real-time Messaging",
    desc: "Real-time communication and messaging platform. Uses WebSockets and STOMP for live chat, Kafka for asynchronous log queuing, multi-database storage (Postgres/Mongo/Redis), and AES-256 chat history encryption.",
    tech: ["Spring Boot", "WebSocket / STOMP", "Kafka", "PostgreSQL", "MongoDB", "Redis", "React 19", "TypeScript", "Tailwind CSS"],
    github: "",
    hasGithub: false,
  },
  {
    name: "VAULT",
    full: "Secure Digital Banking & Ledger Engine",
    tag: "FinTech Ledger",
    desc: "Secure banking transaction engine. Utilizes Redis distributed locks and database locks to prevent double-spending, database field-level encryption, Google Authenticator (TOTP) 2FA, and Quartz-scheduled interest jobs.",
    tech: ["Spring Boot", "Redis Distributed Locks", "2FA TOTP", "AES-256-GCM", "PostgreSQL", "MongoDB", "Quartz Scheduler", "React 19"],
    github: "",
    hasGithub: false,
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
      timer = setTimeout(() => {
        setDisplayed(currentFullText.substring(0, displayed.length - 1));
      }, 30);
    } else {
      timer = setTimeout(() => {
        setDisplayed(currentFullText.substring(0, displayed.length + 1));
      }, 70);
    }

    if (!isDeleting && displayed === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
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

    let animationId;
    
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

function InteractivePlayground({ name }) {
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (name === "NEXUS") {
      setLogs(["[SYSTEM] NEXUS AI active. Type a prompt (e.g. 'Summarize doc' or 'Explain database schema') to query doc index."]);
    } else if (name === "TRACE") {
      setLogs(["[SYSTEM] TRACE Risk Scoring ready. Click a trigger button to evaluate transactions via Spring Cloud microservices."]);
    } else if (name === "SRIJAN") {
      setLogs(["[SYSTEM] SRIJAN Code Engine online. Describe a Java class or endpoints to generate production code templates."]);
    } else if (name === "FoodFlow") {
      setLogs(["[SYSTEM] FoodFlow API ready. Select a mock route payload or trigger request parameters to test JWT auth flows."]);
    }
  }, [name]);

  const runNexus = (query) => {
    if (!query) return;
    setLoading(true);
    setLogs(prev => [...prev, `\nuser@nexus:~$ query "${query}"`]);
    
    setTimeout(() => {
      setLogs(prev => [...prev, `[INFO] Parsing uploaded PDF chunks...`]);
    }, 400);

    setTimeout(() => {
      setLogs(prev => [...prev, `[INFO] Retrieved context similarity match: 0.941 (Qdrant index 4)`]);
    }, 800);

    setTimeout(() => {
      setLogs(prev => [...prev, `[LLM] Streaming response via Server-Sent Events (SSE)...`]);
    }, 1200);

    setTimeout(() => {
      setLogs(prev => [...prev, `\nassistant@nexus:~$ Based on your documents, the system architecture utilizes Spring Security 6 stateless JWT tokens. NEXUS parses files and maps them to Qdrant vector spaces, resolving similarity indexes dynamically.\n[Source Citation: docs/security_spec.pdf#L42]`]);
      setLoading(false);
    }, 1800);
  };

  const runSrijan = (desc) => {
    if (!desc) return;
    setLoading(true);
    setLogs(prev => [...prev, `\nuser@srijan:~$ generate "${desc}"`]);

    setTimeout(() => {
      setLogs(prev => [...prev, `[AI] Calling Groq LLaMA-3.3-70b code generator model...`]);
    }, 400);

    setTimeout(() => {
      setLogs(prev => [...prev, `[COMPILER] Creating files and structuring Maven dependencies...`]);
    }, 900);

    setTimeout(() => {
      const generatedCode = `\n// Generated file: PaymentController.java\n@RestController\n@RequestMapping("/api/payments")\npublic class PaymentController {\n\n    @Autowired\n    private PaymentService paymentService;\n\n    @PostMapping("/charge")\n    public ResponseEntity<PaymentResponse> charge(@RequestBody ChargeRequest req) {\n        PaymentResponse res = paymentService.process(req);\n        return ResponseEntity.ok(res);\n    }\n}`;
      setLogs(prev => [...prev, generatedCode]);
      setLoading(false);
    }, 1600);
  };

  const triggerTrace = (isFraud) => {
    setLoading(true);
    setLogs(prev => [...prev, `\n[Kafka] Publishing transaction payload event...`]);

    setTimeout(() => {
      setLogs(prev => [...prev, `[Gateway] Route authenticated: JWT verified.`]);
    }, 300);

    setTimeout(() => {
      setLogs(prev => [...prev, `[Kafka] Event broker received payload at partition 2.`]);
    }, 600);

    setTimeout(() => {
      if (isFraud) {
        setLogs(prev => [
          ...prev,
          `[RuleEngine] Evaluating strategy rules (Velocity, Odd-Hour, Blacklist)...`,
          `[Redis] Velocity violation detected: 5 txns in 2 mins from device DEV_83912.`,
          `[MongoDB] Immutable audit log written for BLOCK event.`,
          `\n[STATUS] TRANSACTION BLOCKED (Risk Score: 92/100)\nEmail Alert dispatched asynchronously via Kafka.`
        ]);
      } else {
        setLogs(prev => [
          ...prev,
          `[RuleEngine] Strategy checks complete. Risk score: 8/100`,
          `[MongoDB] Audit log entry created.`,
          `\n[STATUS] TRANSACTION APPROVED (Approved instantly)`
        ]);
      }
      setLoading(false);
    }, 1200);
  };

  const runFoodFlow = (endpoint) => {
    setLoading(true);
    setLogs(prev => [...prev, `\nHTTP GET http://localhost:8080/api/v1${endpoint}`]);

    setTimeout(() => {
      setLogs(prev => [...prev, `Headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.ey..." }`]);
    }, 300);

    setTimeout(() => {
      setLogs(prev => [
        ...prev,
        `[Security] JWT payload signature validated. Claims: { role: "CUSTOMER" }`,
        `[Hibernate] Executing query: SELECT o FROM Order o WHERE o.user.id = :userId`,
        `[PostgreSQL] Connection pool active (10ms query execution)`,
        `\nResponse: 200 OK\n{\n  "status": "SUCCESS",\n  "data": {\n    "orderId": 9324,\n    "items": ["Garlic Bread", "Margherita Pizza"],\n    "total": 35.50,\n    "status": "PREPARING"\n  }\n}`
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim() || loading) return;
    if (name === "NEXUS") {
      runNexus(inputVal);
    } else if (name === "SRIJAN") {
      runSrijan(inputVal);
    }
    setInputVal("");
  };

  return (
    <div className="playground-container">
      <div style={{ fontSize: "0.85rem", color: "#06B6D4", fontFamily: "'Fira Code', monospace", marginBottom: 12, fontWeight: 500 }}>
        // Interactive Live Demo & Simulator
      </div>

      {name === "TRACE" && (
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <button 
            disabled={loading}
            onClick={() => triggerTrace(false)} 
            className="btn-primary" 
            style={{ borderRadius: 6, padding: "8px 16px", fontSize: "0.85rem", background: "linear-gradient(135deg, #10B981 0%, #059669 100%)", boxShadow: "none" }}
          >
            Trigger Approved Txn
          </button>
          <button 
            disabled={loading}
            onClick={() => triggerTrace(true)} 
            className="btn-primary" 
            style={{ borderRadius: 6, padding: "8px 16px", fontSize: "0.85rem", background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)", boxShadow: "none" }}
          >
            Trigger Fraud Txn
          </button>
        </div>
      )}

      {name === "FoodFlow" && (
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          {["/orders/history", "/cart/items", "/profile"].map(route => (
            <button 
              key={route}
              disabled={loading}
              onClick={() => runFoodFlow(route)}
              className="btn-secondary"
              style={{ borderRadius: 6, padding: "6px 14px", fontSize: "0.8rem" }}
            >
              GET {route}
            </button>
          ))}
        </div>
      )}

      {(name === "NEXUS" || name === "SRIJAN") && (
        <form onSubmit={handleSend} style={{ display: "flex", gap: 8 }}>
          <input 
            type="text" 
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={name === "NEXUS" ? "Ask a question about database security..." : "Explain requirement, e.g. 'Build Payment Service'..."}
            className="playground-input"
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary" 
            style={{ borderRadius: 6, padding: "8px 16px", height: "38px", fontSize: "0.85rem" }}
          >
            Send
          </button>
        </form>
      )}

      <div className="playground-console">
        {logs.map((log, i) => (
          <div key={i} style={{ color: log.startsWith("\nuser") ? "#3B82F6" : log.includes("STATUS") || log.includes("assistant") || log.includes("Response") ? "#06B6D4" : "#4ADE80" }}>
            {log}
          </div>
        ))}
        {loading && <div style={{ color: "#06B6D4", animation: "pulse-slow 1s infinite" }}>System processing...</div>}
      </div>
    </div>
  );
}

function ArchitectureVisualizer({ name }) {
  // Arrow Markers
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
          // RESTful API Endpoint Security & DB Mapping Flow
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
          {renderNode(60, 60, "REST Call", "Client Request")}
          {renderNode(200, 60, "JWT Filter", "Spring Security 6")}
          {renderNode(340, 60, "Controller Layer", "Endpoints & DTOs")}
          {renderNode(480, 60, "Hibernate ORM", "JPA Entity Mapping")}
          {renderNode(600, 60, "PostgreSQL", "Relational Database")}
        </svg>
      </div>
    );
  }

  return null;
}

// Project Card component
function ProjectCard({ p, index }) {
  const [hovered, setHovered] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState(null); // null | "architecture" | "playground"

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <FadeIn delay={index * 0.08}>
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="glass-panel glass-panel-glow"
        style={{
          borderRadius: 16,
          padding: "32px",
          position: "relative",
          overflow: "hidden",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          border: `1px solid ${hovered ? "rgba(6, 182, 212, 0.25)" : "rgba(243, 244, 246, 0.05)"}`,
        }}
      >
        {/* Glow Line Top */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: hovered ? "linear-gradient(90deg, transparent, #06B6D4, transparent)" : "transparent",
          transition: "all 0.3s ease",
        }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{
            fontSize: "0.7rem",
            fontFamily: "'Fira Code', monospace",
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "#06B6D4",
            background: "rgba(6, 182, 212, 0.08)",
            border: "1px solid rgba(6, 182, 212, 0.15)",
            borderRadius: 4,
            padding: "4px 10px",
          }}>{p.tag}</span>
        </div>

        <h3 style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>{p.name}</h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 16, fontStyle: "italic" }}>{p.full}</p>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--text-muted)", marginBottom: 24 }}>{p.desc}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {p.tech.map(t => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          {p.hasGithub ? (
            <a 
              href={p.github} 
              target="_blank" 
              rel="noreferrer" 
              style={{
                display: "inline-flex", 
                alignItems: "center", 
                gap: 8,
                color: "#06B6D4", 
                textDecoration: "none", 
                fontSize: "0.9rem", 
                fontWeight: 500,
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.transform = "translateX(2px)"}
              onMouseLeave={(e) => e.target.style.transform = "none"}
            >
              <Icons.Github />
              <span>Explore Codebase</span>
              <Icons.ExternalLink />
            </a>
          ) : (
            <div style={{
              display: "inline-flex", 
              alignItems: "center", 
              gap: 6,
              color: "var(--text-muted)", 
              fontSize: "0.85rem", 
              fontStyle: "italic",
              opacity: 0.75
            }}>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 2 }}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>Currently Working / Repo Pushing Pending</span>
            </div>
          )}

          {p.live && (
            <a 
              href={p.live} 
              target="_blank" 
              rel="noreferrer" 
              style={{
                display: "inline-flex", 
                alignItems: "center", 
                gap: 8,
                color: "#10B981", 
                textDecoration: "none", 
                fontSize: "0.9rem", 
                fontWeight: 500,
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.transform = "translateX(2px)"}
              onMouseLeave={(e) => e.target.style.transform = "none"}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <span>Live Project</span>
              <Icons.ExternalLink />
            </a>
          )}

          {p.hasGithub && (
            <div style={{ display: "flex", gap: 10, marginLeft: "auto" }}>
              <button
                onClick={() => setExpandedPanel(expandedPanel === "architecture" ? null : "architecture")}
                className="btn-arch-toggle"
                style={{
                  background: expandedPanel === "architecture" ? "rgba(6, 182, 212, 0.08)" : "rgba(6, 182, 212, 0.04)",
                  borderColor: expandedPanel === "architecture" ? "var(--accent-cyan)" : "rgba(6, 182, 212, 0.12)"
                }}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
                <span>Architecture</span>
              </button>

              <button
                onClick={() => setExpandedPanel(expandedPanel === "playground" ? null : "playground")}
                className="btn-arch-toggle"
                style={{
                  background: expandedPanel === "playground" ? "rgba(6, 182, 212, 0.08)" : "rgba(6, 182, 212, 0.04)",
                  borderColor: expandedPanel === "playground" ? "var(--accent-cyan)" : "rgba(6, 182, 212, 0.12)"
                }}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                <span>Playground</span>
              </button>
            </div>
          )}
        </div>

        {p.hasGithub && expandedPanel === "architecture" && (
          <ArchitectureVisualizer name={p.name} />
        )}

        {p.hasGithub && expandedPanel === "playground" && (
          <InteractivePlayground name={p.name} />
        )}
      </div>
    </FadeIn>
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
          
          <div className="projects-list">
            {projects.map((p, i) => <ProjectCard key={p.name} p={p} index={i} />)}
          </div>
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