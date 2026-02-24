import { useState, useEffect, useRef, useCallback } from "react";
import "./portfolio.css";

/* ─── DATA ─────────────────────────────────────────────────────────────── */
const EXPERIENCES = [
  {
    id: "macys",
    company: "Macy's",
    emoji: "🛍️",
    role: "Software Engineer",
    period: "Sep 2019 – Jan 2026",
    color: "#e23b3b",
    bullets: [
      "Built features for Macy's & Bloomingdale's platforms, supporting 100M+ monthly users.",
      "Co-led redesign → $50M annual revenue increase, +20% mobile traffic, +15% conversion.",
      "Migrated Backbone.js → Vue.js: site perf +30%, load times −20%.",
      "Mentored juniors & shaped technical strategy, accelerating delivery by 18%.",
      "Implemented WCAG 2.1, boosting accessibility compliance by 30%.",
    ],
  },
  {
    id: "dv",
    company: "DoubleVerify",
    emoji: "✅",
    role: "Front-End Engineer",
    period: "Sep 2018 – Aug 2019",
    color: "#3b82f6",
    bullets: [
      "Delivered ad-control features → engagement +20%, support tickets −15%.",
      "Fixed perf bottlenecks → app efficiency +25%, load times −10%.",
      "Built reusable UI components → dev speed +30%, duplication −20%.",
      "Partnered with UX on design system → user satisfaction +15%.",
      "Refactored Salesforce Apex → TypeScript/Angular5: maintainability +40%, bugs −20%.",
    ],
  },
];

const SKILLS = {
  Languages: ["JavaScript (ES6+)", "TypeScript"],
  Frontend: ["React", "Vue", "Nuxt", "HTML", "CSS", "SASS", "Redux"],
  Backend: ["Node.js", "Express", "REST APIs", "MongoDB", "MySQL"],
  Testing: ["Jest", "Vitest"],
  Tools: ["Git", "Webpack", "Vite"],
  Practices: ["Agile", "WCAG", "Perf Optimization"],
};

const EDUCATION = [
  { year: "2016", school: "Hack Reactor", degree: "Advanced Software Engineering", emoji: "⚡" },
  { year: "2013", school: "Hunter College", degree: "B.A. in Psychology", emoji: "🧠" },
];

const CLI_RESPONSES: Record<string, string> = {
  help: `Available commands:\n  about       — Who is Nav?\n  skills      — Technical skills\n  experience  — Work history\n  contact     — Get in touch\n  hire        — 👀\n  clear       — Clear terminal\n  ls          — List files\n  whoami      — Current user\n  pwd         — Working directory`,
  about:
    "Nav Ghuman — Senior Software Engineer with 7+ years building high-scale web platforms. Shipped features for 100M+ users at Macy's and DoubleVerify.",
  skills:
    "Languages: JS (ES6+), TypeScript\nFrontend: React, Vue, Nuxt, Redux\nBackend: Node.js, Express, MongoDB\nTesting: Jest, Vitest\nTools: Git, Webpack, Vite",
  experience:
    "→ Macy's (2019–2026): Led features for 100M+ users, $50M revenue impact\n→ DoubleVerify (2018–2019): Perf optimization, reusable component systems",
  contact:
    "📧 navkiran.ghuman@gmail.com\n📱 516-236-6339\n🔗 linkedin.com/in/-nghuman",
  hire: "🎉 Great taste! Drop a line at navkiran.ghuman@gmail.com\nP.S. — He's really good, trust the metrics.",
  ls: "about.md  skills.json  experience/  education/  contact.txt  secret.exe",
  "secret.exe": "__EASTER_EGG__",
  whoami: "software engineer by day, Knicks fan since the playground days 🏀, capturing moments 📷, happiest somewhere new ✈️",
  pwd: "/home/nav/portfolio",
  date: new Date().toDateString(),
};

/* ─── MATRIX RAIN ───────────────────────────────────────────────────────── */
function MatrixRain({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);
    const chars = "NAVGHUMAN01アイウエオカキクケコサシスセソ∑∆πΩ≠∞√</>{}[]";

    let raf: number;
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px 'DM Mono', monospace`;
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = y === 1 ? "#ffffff" : `rgba(0,255,136,${Math.random() * 0.8 + 0.2})`;
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const fadeTimer = setTimeout(() => setFading(true), 3200);
    const doneTimer = setTimeout(onDone, 4000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`matrix-rain${fading ? " matrix-rain--fading" : ""}`}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
      <div className="matrix-rain__overlay">
        {/* <div className="matrix-rain__emoji">🚀</div> */}
        <div className="matrix-rain__title">EASTER EGG UNLOCKED</div>
        <div className="matrix-rain__quote">
          "The most expensive words in engineering are<br />'It would be cool if-'"
          <div className="matrix-rain__author">— JEAN-LOUIS GASSEE</div>
        </div>
        {/* <div className="matrix-rain__hint">type: secret.exe to replay</div> */}
      </div>
    </div>
  );
}

/* ─── PARTICLES ─────────────────────────────────────────────────────────── */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,255,136,0.25)";
        ctx.fill();
      });
      dots.forEach((a, i) =>
        dots.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,255,136,${0.08 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        })
      );
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={canvasRef} className="particles-canvas" />;
}

/* ─── CUSTOM CURSOR ─────────────────────────────────────────────────────── */
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.18);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.18);
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top = ring.current.y + "px";
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

/* ─── DRAGGABLE WINDOW ──────────────────────────────────────────────────── */
let zCounter = 10;

interface WindowProps {
  title: string;
  emoji: string;
  children: React.ReactNode;
  defaultPos: { x: number; y: number };
  defaultSize: { w: number; h: number };
  onClose: () => void;
  color?: string;
}

function Window({ title, emoji, children, defaultPos, defaultSize, onClose, color = "#00ff88" }: WindowProps) {
  const [pos, setPos] = useState(defaultPos);
  const [minimized, setMinimized] = useState(false);
  const [zIdx, setZIdx] = useState(10);
  const dragging = useRef(false);
  const origin = useRef({ mx: 0, my: 0, wx: 0, wy: 0 });

  const bringToFront = () => { zCounter++; setZIdx(zCounter); };

  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".window__btn")) return;
    dragging.current = true;
    origin.current = { mx: e.clientX, my: e.clientY, wx: pos.x, wy: pos.y };
    bringToFront();
    e.preventDefault();
  };

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!dragging.current) return;
      setPos({
        x: origin.current.wx + e.clientX - origin.current.mx,
        y: origin.current.wy + e.clientY - origin.current.my,
      });
    };
    const up = () => { dragging.current = false; };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <div
      className="window"
      onClick={bringToFront}
      style={{
        left: pos.x, top: pos.y, zIndex: zIdx, width: defaultSize.w,
        border: `1px solid ${color}33`,
        boxShadow: `0 0 40px ${color}15, 0 12px 40px rgba(0,0,0,0.7)`,
      }}
    >
      <div className="window__titlebar" onMouseDown={onMouseDown} style={{ borderBottom: `1px solid ${color}22` }}>
        <button className="window__btn window__btn--close" onClick={onClose} />
        <button className="window__btn window__btn--min" onClick={() => setMinimized((m) => !m)} />
        <button className="window__btn window__btn--max" />
        <span className="window__title">{emoji} {title}</span>
      </div>
      {!minimized && (
        <div className="window__body" style={{ maxHeight: defaultSize.h }}>
          {children}
        </div>
      )}
    </div>
  );
}

/* ─── TERMINAL ──────────────────────────────────────────────────────────── */
type HistoryEntry = { type: "input" | "sys" | "output"; text: string };

function Terminal({ onClose, onEasterEgg }: { onClose: () => void; onEasterEgg: () => void }) {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: "sys", text: "Portfolio OS v2.0.26 — Nav Ghuman" },
    { type: "sys", text: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState("");
  const [cmdHist, setCmdHist] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = useCallback((cmd: string) => {
    const t = cmd.trim().toLowerCase();

    if (t === "clear") {
      setHistory([{ type: "sys", text: 'Cleared. Type "help" for commands.' }]);
      setCmdHist((h) => [cmd, ...h]);
      setHistIdx(-1);
      setInput("");
      return;
    }

    const res = CLI_RESPONSES[t];

    // Easter egg — trigger matrix rain
    if (res === "__EASTER_EGG__") {
      setHistory((h) => [
        ...h,
        { type: "input", text: `nav@portfolio:~$ ${cmd}` },
        { type: "output", text: "executing secret.exe..." },
        { type: "output", text: "⚠️  classified content detected. stand by." },
      ]);
      setCmdHist((h) => [cmd, ...h]);
      setHistIdx(-1);
      setInput("");
      setTimeout(onEasterEgg, 600);
      return;
    }

    setHistory((h) => [
      ...h,
      { type: "input", text: `nav@portfolio:~$ ${cmd}` },
      { type: "output", text: res || `command not found: ${t}. Try "help".` },
    ]);
    setCmdHist((h) => [cmd, ...h]);
    setHistIdx(-1);
    setInput("");
  }, [onEasterEgg]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) run(input);
    if (e.key === "ArrowUp") {
      const i = Math.min(histIdx + 1, cmdHist.length - 1);
      setHistIdx(i);
      setInput(cmdHist[i] || "");
    }
    if (e.key === "ArrowDown") {
      const i = Math.max(histIdx - 1, -1);
      setHistIdx(i);
      setInput(cmdHist[i] || "");
    }
  };

  return (
    <Window title="terminal" emoji=">_" defaultPos={{ x: 40, y: 80 }} defaultSize={{ w: 520, h: 340 }} onClose={onClose} color="#00ff88">
      <div className="terminal__output" onClick={() => inputRef.current?.focus()}>
        {history.map((h, i) => (
          <div key={i} className={`terminal__line--${h.type === "input" ? "input" : h.type === "sys" ? "sys" : "output"}`}>
            {h.text}
          </div>
        ))}
        <div className="terminal__input-row">
          <span className="terminal__prompt">nav@portfolio:~$</span>
          <input
            ref={inputRef}
            className="terminal__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            autoFocus
            spellCheck={false}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </Window>
  );
}

/* ─── SKILLS ────────────────────────────────────────────────────────────── */
function SkillsWindow({ onClose }: { onClose: () => void }) {
  return (
    <Window title="skills.json" emoji="⚡" defaultPos={{ x: 600, y: 80 }} defaultSize={{ w: 400, h: 400 }} onClose={onClose} color="#facc15">
      {Object.entries(SKILLS).map(([cat, items]) => (
        <div className="skills__category" key={cat}>
          <div className="skills__label">{cat}</div>
          <div className="skills__tags">
            {items.map((s) => (
              <span className="skills__tag" key={s}>{s}</span>
            ))}
          </div>
        </div>
      ))}
    </Window>
  );
}

/* ─── EXPERIENCE ────────────────────────────────────────────────────────── */
function ExpWindow({ exp, pos, onClose }: { exp: typeof EXPERIENCES[0]; pos: { x: number; y: number }; onClose: () => void }) {
  return (
    <Window title={exp.company} emoji={exp.emoji} defaultPos={pos} defaultSize={{ w: 460, h: 360 }} onClose={onClose} color={exp.color}>
      <div className="exp__meta">
        <div className="exp__role" style={{ color: exp.color }}>{exp.role}</div>
        <div className="exp__period">{exp.period}</div>
      </div>
      {exp.bullets.map((b, i) => (
        <div className="exp__bullet" key={i}>
          <span className="exp__arrow" style={{ color: exp.color }}>▸</span>
          <span className="exp__text">{b}</span>
        </div>
      ))}
    </Window>
  );
}

/* ─── ABOUT ─────────────────────────────────────────────────────────────── */
function AboutWindow({ onClose }: { onClose: () => void }) {
  const stats = [
    { label: "Users Served", value: "100M+", color: "#00ff88" },
    { label: "Revenue Impact", value: "$50M", color: "#facc15" },
    { label: "Years Exp.", value: "7+", color: "#f97316" },
    { label: "Perf Gains", value: "30%↑", color: "#a78bfa" },
  ];
  return (
    <Window title="nav_ghuman.md" emoji="👤" defaultPos={{ x: 580, y: 120 }} defaultSize={{ w: 480, h: 380 }} onClose={onClose} color="#00ff88">
      <div className="about__header">
        <div className="about__avatar">👨🏽‍💻</div>
        <div>
          <div className="about__name">Nav Ghuman</div>
          <div className="about__role">Senior Software Engineer</div>
        </div>
      </div>
      <p className="about__bio">
        Specializing in high-scale web platforms and performance-driven UX. Proven track record delivering revenue-impacting features for products serving 100M+ monthly users.
      </p>
      <div className="about__stats">
        {stats.map((s) => (
          <div className="about__stat" key={s.label}>
            <div className="about__stat-num" style={{ color: s.color }}>{s.value}</div>
            <div className="about__stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="about__links">
        {[
          ["📧", "navkiran.ghuman@gmail.com", "mailto:navkiran.ghuman@gmail.com"],
          ["📱", "516-236-6339", "tel:5162366339"],
          ["🔗", "linkedin.com/in/-nghuman", "https://linkedin.com/in/-nghuman"],
        ].map(([ic, label, href]) => (
          <a key={label} href={href} className="about__link" target="_blank" rel="noreferrer">
            <span>{ic}</span>
            <span>{label}</span>
          </a>
        ))}
      </div>
    </Window>
  );
}

/* ─── EDUCATION ─────────────────────────────────────────────────────────── */
function EduWindow({ onClose }: { onClose: () => void }) {
  return (
    <Window title="education/" emoji="🎓" defaultPos={{ x: 700, y: 440 }} defaultSize={{ w: 340, h: 230 }} onClose={onClose} color="#a78bfa">
      {EDUCATION.map((e) => (
        <div className="edu__item" key={e.school}>
          <div className="edu__header">
            <span className="edu__emoji">{e.emoji}</span>
            <div>
              <div className="edu__school">{e.school}</div>
              <div className="edu__year">{e.year}</div>
            </div>
          </div>
          <div className="edu__degree">{e.degree}</div>
        </div>
      ))}
    </Window>
  );
}

/* ─── DOCK ──────────────────────────────────────────────────────────────── */
const DOCK_APPS = [
  { id: "about",    emoji: "👤",  label: "About" },
  { id: "macys",    emoji: "🛍️", label: "Macy's" },
  { id: "dv",       emoji: "✅",  label: "DoubleVerify" },
  { id: "skills",   emoji: "⚡",  label: "Skills" },
  { id: "edu",      emoji: "🎓",  label: "Education" },
  { id: "terminal", emoji: ">_",  label: "Terminal" },
];

function Dock({ onOpen }: { onOpen: (id: string) => void }) {
  const [hov, setHov] = useState<string | null>(null);
  return (
    <div className="dock">
      {DOCK_APPS.map((a) => (
        <div
          key={a.id}
          className="dock__item"
          onClick={() => onOpen(a.id)}
          onMouseEnter={() => setHov(a.id)}
          onMouseLeave={() => setHov(null)}
        >
          <span className={a.emoji === ">_" ? "dock__emoji--terminal" : "dock__emoji"}>{a.emoji}</span>
          {hov === a.id && <div className="dock__tooltip">{a.label}</div>}
        </div>
      ))}
    </div>
  );
}

/* ─── MENU BAR ──────────────────────────────────────────────────────────── */
function MenuBar({ onOpen }: { onOpen: (id: string) => void }) {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  );
  useEffect(() => {
    const t = setInterval(
      () => setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })),
      1000
    );
    return () => clearInterval(t);
  }, []);
  return (
    <div className="menubar">
      <div className="menubar__left">
        <div className="menubar__brand">◉ Portfolio OS</div>
        <div className="menubar__name">Nav Ghuman</div>
      </div>
      <div className="menubar__right">
        <div className="menubar__clock">{time}</div>
        <button className="menubar__terminal-btn" onClick={() => onOpen("terminal")}>
          {">_"} terminal
        </button>
      </div>
    </div>
  );
}

/* ─── DESKTOP ICONS ─────────────────────────────────────────────────────── */

/* ─── MOBILE FEED ───────────────────────────────────────────────────────── */
function MobileFeed() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  return (
    <div style={{ minHeight: "100vh", background: "#080808" }}>
      <Particles />
      <MenuBar onOpen={() => {}} />
      <div className="mobile-feed">
        <AboutWindow onClose={() => {}} />
        <ExpWindow exp={EXPERIENCES[0]} pos={{ x: 0, y: 0 }} onClose={() => {}} />
        <ExpWindow exp={EXPERIENCES[1]} pos={{ x: 0, y: 0 }} onClose={() => {}} />
        <SkillsWindow onClose={() => {}} />
        <EduWindow onClose={() => {}} />
      </div>
      {showEasterEgg && <MatrixRain onDone={() => setShowEasterEgg(false)} />}
    </div>
  );
}

/* ─── DESKTOP ───────────────────────────────────────────────────────────── */
type OpenState = Record<string, boolean>;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

function Desktop() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState<OpenState>({ terminal: true, about: true });
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  if (isMobile) return <MobileFeed />;

  const openW = (id: string) => setOpen((o) => ({ ...o, [id]: true }));
  const closeW = (id: string) => setOpen((o) => ({ ...o, [id]: false }));

  return (
    <div style={{ minHeight: "100vh", background: "#080808" }}>
      <Cursor />
      <Particles />
      <MenuBar onOpen={openW} />
      <div className="desktop-hint">drag windows · click dock · type in terminal</div>

      {open.terminal && <Terminal onClose={() => closeW("terminal")} onEasterEgg={() => setShowEasterEgg(true)} />}
      {open.about    && <AboutWindow onClose={() => closeW("about")} />}
      {open.skills   && <SkillsWindow onClose={() => closeW("skills")} />}
      {open.macys    && <ExpWindow exp={EXPERIENCES[0]} pos={{ x: 80,  y: 110 }} onClose={() => closeW("macys")} />}
      {open.dv       && <ExpWindow exp={EXPERIENCES[1]} pos={{ x: 160, y: 150 }} onClose={() => closeW("dv")} />}
      {open.edu      && <EduWindow onClose={() => closeW("edu")} />}

      {showEasterEgg && <MatrixRain onDone={() => setShowEasterEgg(false)} />}

      <Dock onOpen={openW} />
    </div>
  );
}

/* ─── BOOT SCREEN ───────────────────────────────────────────────────────── */
function Boot({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<{ text: string; final: boolean }[]>([]);
  const BOOT_LINES = [
    "Initializing Portfolio OS...",
    "Loading nav_ghuman.profile......... OK",
    "Mounting /experience............... OK",
    "Mounting /skills.json.............. OK",
    "Starting particle engine........... OK",
    "Launching desktop environment...... OK",
    "🚀 Welcome.",
  ];
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setLines((l) => [...l, { text: BOOT_LINES[i], final: i === BOOT_LINES.length - 1 }]);
      i++;
      if (i >= BOOT_LINES.length) {
        clearInterval(t);
        setTimeout(onDone, 800);
      }
    }, 300);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="boot-screen">
      <div className="boot-logo">N<span>.</span>G</div>
      <div className="boot-lines">
        {lines.map((l, i) => (
          <div key={i} className={`boot-line ${l.final ? "boot-line--final" : "boot-line--normal"}`}>
            {">"} {l.text}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ROOT ──────────────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [booted, setBooted] = useState(false);
  return (
    <>
      {!booted && <Boot onDone={() => setBooted(true)} />}
      {booted && <Desktop />}
    </>
  );
}