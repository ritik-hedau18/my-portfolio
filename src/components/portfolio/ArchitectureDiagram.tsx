const Markers = () => (
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--rule)" />
    </marker>
    <marker id="arrow-accent" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--accent)" />
    </marker>
    <marker id="arrow-ink" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--ink)" />
    </marker>
  </defs>
);

function node(x: number, y: number, title: string, subtitle: string) {
  const w = 100, h = 50;
  return (
    <g key={title}>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={4} className="arch-node" />
      <text x={x} y={y - 2} className="arch-text-title">{title}</text>
      <text x={x} y={y + 14} className="arch-text-subtitle">{subtitle}</text>
    </g>
  );
}

const flow = (d: string, accent: "cyan" | "indigo" = "cyan") => (
  <>
    <path d={d} className="arch-flow-line" markerEnd="url(#arrow)" />
    <path d={d} className={accent === "cyan" ? "arch-flow-pulse" : "arch-flow-pulse-indigo"} markerEnd={accent === "cyan" ? "url(#arrow-accent)" : "url(#arrow-ink)"} />
  </>
);

export default function ArchitectureDiagram({ name }: { name: string }) {
  const subtitle = (label: string) => (
    <div className="label" style={{ marginBottom: 14 }}>{label}</div>
  );
  if (name === "NEXUS") {
    return (
      <div style={{ padding: "20px", border: "1px solid var(--rule)", borderRadius: 8, background: "var(--paper-2)" }}>
        {subtitle("// rag pipeline & similarity search flow")}
        <svg viewBox="0 0 660 120" style={{ width: "100%", height: "auto" }}>
          <Markers />
          {flow("M 110 60 L 150 60")}
          {flow("M 250 60 L 290 60")}
          {flow("M 552 50 Q 470 20 388 50", "indigo")}
          {flow("M 390 60 L 430 60")}
          {flow("M 530 60 L 552 60")}
          {node(60, 60, "Doc Ingest", "PDF / DOCX")}
          {node(200, 60, "Jina AI", "Embeddings")}
          {node(340, 60, "Qdrant", "Vector Index")}
          {node(480, 60, "Groq LLaMA", "RAG Engine")}
          {node(600, 60, "SSE Chat", "User Session")}
        </svg>
      </div>
    );
  }
  if (name === "TRACE") {
    return (
      <div style={{ padding: "20px", border: "1px solid var(--rule)", borderRadius: 8, background: "var(--paper-2)" }}>
        {subtitle("// real-time event-driven fraud analysis")}
        <svg viewBox="0 0 660 120" style={{ width: "100%", height: "auto" }}>
          <Markers />
          {flow("M 110 60 L 150 60")}
          {flow("M 250 60 L 290 60")}
          {flow("M 390 60 L 430 60")}
          {flow("M 390 70 Q 470 100 552 70", "indigo")}
          {node(60, 60, "Client Txn", "HTTP Payload")}
          {node(200, 60, "Gateway", "Spring Cloud")}
          {node(340, 60, "Kafka", "Event Pipeline")}
          {node(480, 60, "Rule Engine", "Strategy · Redis")}
          {node(600, 60, "Audit", "MongoDB Store")}
        </svg>
      </div>
    );
  }
  if (name === "SRIJAN") {
    return (
      <div style={{ padding: "20px", border: "1px solid var(--rule)", borderRadius: 8, background: "var(--paper-2)" }}>
        {subtitle("// natural language → spring boot project")}
        <svg viewBox="0 0 660 120" style={{ width: "100%", height: "auto" }}>
          <Markers />
          {flow("M 110 60 L 150 60")}
          {flow("M 250 60 L 290 60")}
          {flow("M 390 60 L 430 60")}
          {flow("M 530 60 L 552 60")}
          {node(60, 60, "Prompt", "Natural English")}
          {node(200, 60, "Spring AI", "LLaMA 3")}
          {node(340, 60, "Parser", "JSON Structuring")}
          {node(480, 60, "Monaco", "Live Preview")}
          {node(600, 60, "ZIP", "Template Build")}
        </svg>
      </div>
    );
  }
  if (name === "BITECRAFT") {
    return (
      <div style={{ padding: "20px", border: "1px solid var(--rule)", borderRadius: 8, background: "var(--paper-2)" }}>
        {subtitle("// full-stack platform flow & state sync")}
        <svg viewBox="0 0 660 120" style={{ width: "100%", height: "auto" }}>
          <Markers />
          {flow("M 110 60 L 150 60")}
          {flow("M 250 60 L 290 60")}
          {flow("M 390 60 L 430 60")}
          {flow("M 530 60 L 552 60")}
          {node(60, 60, "React UI", "Redux Cart")}
          {node(200, 60, "Axios", "JWT Headers")}
          {node(340, 60, "Gateway", "Security 6")}
          {node(480, 60, "Hibernate", "Entity Graph")}
          {node(600, 60, "Postgres", "Relational")}
        </svg>
      </div>
    );
  }
  return null;
}
