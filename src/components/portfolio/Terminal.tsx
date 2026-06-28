import { useEffect, useRef, useState } from "react";

type Props = { onHack: () => void; onChangeTheme: (t: string) => void };

export default function Terminal({ onHack, onChangeTheme }: Props) {
  const [history, setHistory] = useState<string[]>([
    "Ritik Hedau · Developer Console [v2.1.0]",
    "Type 'help' to see available commands.",
    "",
  ]);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  const run = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const args = trimmed.split(/\s+/);
    const main = args[0];
    let out: string[] = [];
    switch (main) {
      case "help":
        out = [
          "available commands:",
          "  help           show this listing",
          "  about          short bio",
          "  skills         print technical stack",
          "  experience     professional work",
          "  projects       completed projects",
          "  theme <name>   paper · ink · ember",
          "  hack           initiate simulation protocol",
          "  clear          clear buffer",
        ];
        break;
      case "about":
        out = [
          "ritik hedau — java full stack developer · pune, india",
          "3+ yrs · deqode solutions · spring boot, kafka, react 19, aws",
        ];
        break;
      case "skills":
        out = [
          "backend  java 17/21 · spring boot · spring security 6 · hibernate jpa",
          "events   apache kafka · rabbitmq · websocket/stomp",
          "data     postgresql · mongodb · mysql · redis · qdrant",
          "devops   docker · kubernetes · aws (ec2, s3, rds, iam, cloudwatch)",
          "front    react 19 · redux · typescript · tailwind css",
        ];
        break;
      case "experience":
        out = [
          "company   deqode solutions pvt. ltd. (full-time)",
          "role      java full stack developer",
          "period    april 2023 – present · pune, india",
          "stack     multi-tenant saas, kafka pipelines, react, k8s, aws",
        ];
        break;
      case "projects":
        out = [
          "nexus      ai rag workspace · qdrant + jina",
          "vault      secure banking · redis locks + 2fa",
          "trace      fraud detection · 7 microservices + kafka",
          "srijan     nl → spring boot generator",
          "bitecraft  full-stack food delivery",
          "atlas      linkedin-style network · elasticsearch",
          "echo       real-time chat · aes-256",
        ];
        break;
      case "theme":
        if (args[1] && ["paper", "ink", "ember"].includes(args[1])) {
          onChangeTheme(args[1]);
          out = [`theme → ${args[1]}`];
        } else {
          out = ["usage: theme [paper | ink | ember]"];
        }
        break;
      case "hack":
        onHack();
        out = ["initializing digital rain protocol…", "matrix stream active."];
        break;
      case "clear":
        setHistory([]);
        return;
      case "":
        out = [];
        break;
      default:
        out = [`command not found: ${main}. try 'help'.`];
    }
    setHistory((prev) => [...prev, `ritik@portfolio $ ${cmd}`, ...out, ""]);
  };

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  return (
    <div className="term">
      <div className="term-head">
        <span className="term-dot" style={{ background: "#E84A4A" }} />
        <span className="term-dot" style={{ background: "#E8B14A" }} />
        <span className="term-dot" style={{ background: "#5BCB6D" }} />
        <span style={{ marginLeft: 10 }}>ritik@portfolio — ~/console</span>
      </div>
      <div className="term-body" ref={bodyRef}>
        {history.map((l, i) => (
          <div key={i} className="term-line">{l}</div>
        ))}
        <form
          onSubmit={(e) => { e.preventDefault(); run(input); setInput(""); }}
          className="term-input"
        >
          <span className="term-prompt">$</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            placeholder="type a command…"
            aria-label="terminal input"
          />
        </form>
      </div>
    </div>
  );
}
