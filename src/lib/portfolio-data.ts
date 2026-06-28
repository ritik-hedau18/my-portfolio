import nexusLogo from "@/assets/nexus_logo.png";
import vaultLogo from "@/assets/vault_logo.png";
import traceLogo from "@/assets/trace_logo.png";
import srijanLogo from "@/assets/srijan_logo.png";
import foodflowLogo from "@/assets/foodflow_logo.png";
import atlasLogo from "@/assets/atlas_logo.png";
import echoLogo from "@/assets/echo_logo.png";

export type Project = {
  logo?: string;
  name: string;
  monogram: string;
  full: string;
  tag: string;
  desc: string;
  tech: string[];
  github: string;
  hasGithub: boolean;
  live?: string;
  problem: string;
  solution: string;
  impact: string[];
  deepDive: { title: string; detail: string };
  year: string;
};

export const projects: Project[] = [
  {
    logo: nexusLogo, name: "NEXUS", monogram: "N", year: "2025",
    full: "Neural Enterprise Knowledge Unification System",
    tag: "AI · Vector RAG",
    desc: "AI-powered document intelligence and workspace collaboration platform. Features a Retrieval-Augmented Generation (RAG) pipeline allowing users to perform semantic search and chat directly with uploaded documents (PDF, DOCX).",
    tech: ["Spring Boot","Spring AI","Groq LLaMA 3.3","Qdrant Vector DB","React 19","TypeScript","PostgreSQL","Docker"],
    github: "https://github.com/ritik-hedau18/NEXUS", hasGithub: true,
    live: "https://ritikbynexus.vercel.app",
    problem: "Organizations struggle to search and extract precise answers from unstructured document silos. Standard keyword search lacks semantic context, forcing employees to scan entire files manually.",
    solution: "Developed an advanced Spring AI backend integrating Jina AI embedding models and a Qdrant Vector DB. Uploaded files are dynamically parsed, split into semantically coherent chunks, indexed, and queried via a context-bounded Retrieval-Augmented Generation (RAG) flow.",
    impact: [
      "85% faster answer retrieval compared to standard file directory searches.",
      "Sub-150ms semantic query latency achieved across thousands of chunks.",
      "100% citation grounding, preventing LLM hallucinations.",
    ],
    deepDive: { title: "Hybrid Search Optimization", detail: "Integrates dense vector similarity scores from Qdrant with BM25 metadata keyword matching. This hybrid pipeline ensures the RAG model retrieves exact matches (like function names or config IDs) while preserving semantic context." },
  },
  {
    logo: vaultLogo, name: "VAULT", monogram: "V", year: "2025",
    full: "Secure Digital Banking & Ledger Engine",
    tag: "FinTech Ledger",
    desc: "Secure banking transaction engine. Utilizes Redis distributed locks and database locks to prevent double-spending, database field-level encryption, Google Authenticator (TOTP) 2FA, and Quartz-scheduled interest jobs.",
    tech: ["Spring Boot","Redis Distributed Locks","2FA TOTP","AES-256-GCM","PostgreSQL","MongoDB","Quartz Scheduler","React 19"],
    github: "https://github.com/ritik-hedau18/VAULT", hasGithub: true,
    live: "https://vaultbyritik.vercel.app",
    problem: "FinTech ledgers are vulnerable to double-spending concurrency bugs, unauthorized account breaches, and data corruption in automated scheduled cron routines.",
    solution: "Engineered a secure ledger database using Redis (Redisson) distributed locks and JPA pessimistic database locks to force strict transactional isolation. Integrated TOTP-based 2FA, encrypted balances, and scheduled daily interest calculations via Quartz.",
    impact: [
      "Blocked 100% of double-spending attempts in multi-threaded race condition tests.",
      "Protected user balances with field-level AES-GCM encryption.",
      "Quartz system processed 50,000+ recurring interest calculations daily without error.",
    ],
    deepDive: { title: "Redisson Distributed Locks", detail: "Wraps financial ledger updates in Redisson distributed locks with a lease-time watchdog. This guarantees mutual exclusion across microservice nodes and auto-releases locks if a node fails mid-transaction." },
  },
  {
    logo: traceLogo, name: "TRACE", monogram: "T", year: "2024",
    full: "Transaction Risk & Anomaly Classification Engine",
    tag: "FinTech Microservices",
    desc: "Real-time financial fraud detection and risk scoring engine. Evaluates transactions against a pluggable 5-rule evaluation engine and triggers asynchronous email alerts and immutable audit logging via Kafka message pipelines.",
    tech: ["Spring Boot","Spring Cloud","Kafka","Redis","PostgreSQL","MongoDB","Docker","Kubernetes","Spring Security 6"],
    github: "https://github.com/ritik-hedau18/TRACE-Transaction-Risk-and-Anomaly-Classification-Engine", hasGithub: true,
    problem: "Payment platforms need to block fraudulent transactions instantly. Processing complex rule evaluations synchronously bottlenecks the user checkout flow and degrades system throughput.",
    solution: "Designed a distributed microservices structure using Spring Cloud. Decoupled transaction ingestion from risk profiling via high-throughput Kafka topics. Implemented a pluggable evaluation engine leveraging Redis for caching hot transaction thresholds.",
    impact: [
      "Evaluates up to 10,000 payment payloads per second with sub-45ms latency.",
      "Reduced main checkout thread overhead by 65% through async event staging.",
      "Pluggable design permits rule changes with zero redeployment downtime.",
    ],
    deepDive: { title: "Idempotent Event Processing", detail: "Implements Kafka transaction IDs and unique UUID checksums in Redis to enforce strict idempotency. If a payment message is re-delivered during a network partition, the consumer rejects it automatically." },
  },
  {
    logo: srijanLogo, name: "SRIJAN", monogram: "S", year: "2024",
    full: "AI-Powered Spring Boot Code Generator",
    tag: "AI Developer Tool",
    desc: "Developer productivity tool that translates natural language product descriptions into production-ready Spring Boot project templates. Renders code inside a Monaco editor and generates downloadable ZIP files.",
    tech: ["Spring Boot","Spring AI","Groq LLaMA","React 19","TypeScript","Monaco Editor","Tailwind CSS","PostgreSQL"],
    github: "https://github.com/ritik-hedau18/SRIJAN", hasGithub: true,
    live: "https://srijanbyritik.vercel.app",
    problem: "Scaffolding backend microservices is a repetitive, error-prone chore that requires configuring entity models, controllers, databases, security, and build dependencies manually.",
    solution: "Engineered an AI code-generation workbench using Spring AI and Groq LLaMA 3. Constructed an intelligent parsing parser that yields structured JSON. Built a Monaco Editor sandbox to preview file structures and compile them into downloadable ZIP packages.",
    impact: [
      "Slashed microservice setup time from 4 hours to under 30 seconds.",
      "Generated templates conform 100% to clean code and dependency rules.",
      "Allowed immediate in-browser inspection of generated Java/XML files.",
    ],
    deepDive: { title: "LLM Output Self-Correction", detail: "Constructs a feedback loop validating Groq LLaMA's outputs against a JSON schema. If parsing fails, the system automatically feeds the syntax error back into a correction prompt, achieving a 98.4% parser success rate." },
  },
  {
    logo: foodflowLogo, name: "BITECRAFT", monogram: "B", year: "2024",
    full: "Full-Stack Food Delivery Application",
    tag: "Spring Boot · React",
    desc: "Production-ready full-stack food delivery application (Zomato/Swiggy-style). Features an optimized Spring Boot 3 REST API paired with a responsive React dashboard. Supports complete order lifecycles, lazy-load database query optimizations, real-time cart state synchronization, and role-based JWT authentication.",
    tech: ["Spring Boot 3","React 19","Redux Toolkit","PostgreSQL","Spring Security","JWT","Hibernate / JPA","Tailwind CSS","JUnit & Mockito"],
    github: "https://github.com/ritik-hedau18/Bitecraft", hasGithub: true,
    problem: "E-commerce databases struggle under dense menu reads and volatile cart writes, while frontend cart state can easily fall out of sync with backend transactional bounds during concurrent actions.",
    solution: "Developed a secure full-stack platform using Spring Boot 3 and React 19. Designed a Redux Toolkit state machine for local cart management, synchronizing asynchronously with optimized Hibernate databases using join-fetching to resolve N+1 queries.",
    impact: [
      "Eliminated 14 distinct database N+1 query bottlenecks.",
      "Accelerated restaurant menu fetch times by 300% under high loads.",
      "Attained 100% coverage on core transaction logic using JUnit and Mockito tests.",
    ],
    deepDive: { title: "Preventing Inventory Overselling", detail: "Applies JPA optimistic locking (@Version) for fast cart reads/writes, but switches to pessimistic write locks (SELECT FOR UPDATE) on inventory balances during checkout to block concurrent double-reservations." },
  },
  {
    logo: atlasLogo, name: "ATLAS", monogram: "A", year: "2023",
    full: "LinkedIn-Style Professional Network",
    tag: "Distributed Systems",
    desc: "Enterprise-scale professional network built with a 12-microservice topology. Features asynchronous notification events, high-speed profile search queries using Elasticsearch, and system monitoring using Prometheus/Grafana.",
    tech: ["Spring Boot","Spring Cloud","Kafka","Elasticsearch","Docker","Kubernetes","Prometheus","Grafana","JMeter"],
    github: "", hasGithub: false,
    problem: "Monolithic social platforms struggle with vertical scale limitations, high search latencies for user profiles, and a lack of granular monitoring during traffic peaks.",
    solution: "Designed a 12-microservice topology using Spring Cloud Eureka, Feign clients, and API Gateway. Built a real-time event pipeline using Apache Kafka. Integrated Elasticsearch for instant profile queries and set up Prometheus and Grafana for system health monitoring.",
    impact: [
      "99.99% system uptime achieved through circuit breakers and fallback routing.",
      "Cut user search query response time to <15ms using Elasticsearch indexing.",
      "Validated service stability up to 5,000 concurrent threads using JMeter.",
    ],
    deepDive: { title: "Distributed Telemetry & Logging", detail: "Instruments Resilience4j circuit breakers across Feign clients. In the event of a microservice timeout, telemetry is exported to Prometheus, triggering auto-alerts in Grafana before failures cascade." },
  },
  {
    logo: echoLogo, name: "ECHO", monogram: "E", year: "2023",
    full: "Event-Driven Chat & Hub Operations",
    tag: "Real-time Messaging",
    desc: "Real-time communication and messaging platform. Uses WebSockets and STOMP for live chat, Kafka for asynchronous log queuing, multi-database storage (Postgres/Mongo/Redis), and AES-256 chat history encryption.",
    tech: ["Spring Boot","WebSocket / STOMP","Kafka","PostgreSQL","MongoDB","Redis","React 19","TypeScript","Tailwind CSS"],
    github: "", hasGithub: false,
    problem: "Real-time messaging applications face chat lag, data loss during outages, and security risks if chat logs are stored in plain text.",
    solution: "Built a robust chat engine using WebSockets and STOMP. Implemented a Kafka buffer to store chat histories asynchronously in MongoDB, minimizing main memory pressure. Encrypted all messages at rest using AES-256.",
    impact: [
      "Supported 8,000+ simultaneous chat connections with zero packet drops.",
      "Zero chat database locking issues during test spikes due to Kafka queuing.",
      "Maintained full encryption compliance for stored historical records.",
    ],
    deepDive: { title: "Horizontal WebSocket Scaling", detail: "Uses a Redis Pub/Sub backplane to synchronize messaging across multiple stateless WebSocket instances. Users connected to separate servers can exchange real-time STOMP packets seamlessly." },
  },
];

export const skills: Record<string, { tools: string[]; note: string }> = {
  "Backend Development": {
    tools: ["Java 17/21", "Spring Boot", "Spring Cloud (Eureka, Gateway)", "Spring Security 6", "Spring AI", "Hibernate / JPA", "REST APIs", "Microservices"],
    note: "My primary domain. I design service boundaries around business capabilities, not technical layers. Spring Security and JWT are non-negotiable defaults — auth is never bolted on after the fact.",
  },
  "Messaging & Real-time": {
    tools: ["Apache Kafka", "RabbitMQ", "WebSocket / STOMP", "Event-Driven Architecture"],
    note: "Kafka is my go-to for decoupling services that shouldn't care about each other's availability. WebSocket/STOMP for anything requiring a persistent connection — real-time chat, live notifications.",
  },
  "Databases & Caching": {
    tools: ["PostgreSQL", "MongoDB", "MySQL", "Redis (Distributed Locks / Caching)", "Qdrant (Vector DB)"],
    note: "PostgreSQL for relational integrity and complex queries. MongoDB when the schema genuinely needs to flex. Redis for caching hot paths and distributed locking — not as a shortcut around proper DB design.",
  },
  "DevOps & Cloud": {
    tools: ["AWS (EC2, S3, RDS, IAM, CloudWatch, SNS, SQS, VPC, ECR, ALB)", "Docker & Docker Compose", "Kubernetes", "CI/CD Pipelines", "Git / GitHub", "Maven"],
    note: "Comfortable provisioning and maintaining infra without a dedicated DevOps team. Docker Compose for local development parity. Kubernetes for production orchestration on AWS.",
  },
  "Frontend Development": {
    tools: ["React.js (React 19)", "Redux / Redux Toolkit", "TypeScript", "JavaScript", "Tailwind CSS", "React Query", "Context API", "HTML5 / CSS3"],
    note: "I build frontends that stay in sync with their backends. Redux for complex shared state, React Query for server-state — knowing which tool fits which problem matters more than picking one and applying it everywhere.",
  },
};

export const highlights = [
  { title: "End-to-End Ownership", desc: "I own features from database modeling and REST API development to polished React frontends. I bridge server-side stability with client-side user experience." },
  { title: "AI-Integrated Backends", desc: "Experienced in designing and implementing Retrieval-Augmented Generation (RAG) pipelines, semantic vector search (Qdrant), and LLM text generation via Spring AI." },
  { title: "Cloud & Container Native", desc: "Autonomously deploy containerized architectures (Docker/Kubernetes) and provision AWS cloud resources (EC2, S3, RDS, IAM, CloudWatch, SNS, SQS, VPC, ECR, ALB) to build scalable, highly available systems." },
  { title: "Security by Design", desc: "Every feature is secured from day one. I implement Spring Security 6, stateless JWT access/refresh token flows, and Role-Based Access Control (RBAC) on both client and server sides." },
  { title: "Performance Aware", desc: "Utilizing Redis caching and distributed locks to prevent race conditions, and Kafka for async message queuing, I write code designed to run efficiently under load." },
  { title: "Production Mindset", desc: "I focus on maintainable, production-ready code. Writing unit tests (JUnit, Mockito), working in Agile environments, and setting up Docker are part of my daily practices." },
];

export const experience = {
  company: "Deqode Solutions Pvt. Ltd.",
  role: "Java Full Stack Developer",
  type: "Full-time",
  period: "April 2023 — Present",
  duration: "3+ Years",
  location: "Pune, India",
  bullets: [
    "Owned the full delivery lifecycle — from database schema design and Spring Boot service layer to React 19 dashboards — across multi-tenant SaaS products serving international logistics and retail clients. Built with Java 17, Hibernate, and Spring Security (JWT/RBAC).",
    "Designed and maintained event-driven data pipelines on Apache Kafka, backed by PostgreSQL, MongoDB, and Redis. Measurable outcomes: 25% reduction in processing delays, 30% drop in API response latency across core service flows.",
    "Led frontend development on several product modules — building component-driven React 19 interfaces with Redux and TypeScript. Focused on rendering performance and perceived load speed; achieved 40% improvement in page load metrics through selective code-splitting and query optimization.",
    "Set up and maintained containerized deployments end-to-end: Dockerized services, Kubernetes orchestration, and AWS infrastructure (EC2, S3, RDS, IAM, CloudWatch, SNS, SQS, VPC, ECR, ALB) across both staging and production. Handled infra provisioning without dedicated DevOps support.",
    "Contributed across the full Agile delivery cycle — sprint planning, daily standups, peer code reviews for junior developers, and retrospectives. Took shared ownership of release quality and delivery timelines.",
  ],
  techUsed: ["Java 17","Spring Boot","Spring Security","Apache Kafka","PostgreSQL","MongoDB","Redis","React 19","Redux","TypeScript","Docker","Kubernetes","AWS"],
  metrics: [
    { k: "Latency cut", v: "30%" },
    { k: "Delay reduction", v: "25%" },
    { k: "Render perf", v: "+40%" },
  ],
};

export const EMAIL = "ritikhedau9@gmail.com";
export const PHONE = "+91 82695 19161";
export const LOCATION = "Pune, India";
export const RESUME_LINK = "https://drive.google.com/file/d/13466HLBk5Fp_itP2wnnt0nwjD-TY48lT/view?usp=drivesdk";
export const GITHUB_URL = "https://github.com/ritik-hedau18";
export const LINKEDIN_URL = "https://www.linkedin.com/in/ritik-hedau/";

export const navLinks = [
  { id: "index", label: "Index" },
  { id: "work", label: "Work" },
  { id: "practice", label: "Practice" },
  { id: "stack", label: "Stack" },
  { id: "principles", label: "Principles" },
  { id: "contact", label: "Contact" },
];
