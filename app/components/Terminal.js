'use client';
import { useState, useRef, useEffect } from 'react';

const COMMANDS = {
  help: () => ({
    lines: [
      { t: 'dim', v: 'available commands' },
      { t: 'gap' },
      { t: 'row', k: 'whoami', v: 'profile and background' },
      { t: 'row', k: 'experience', v: 'work history and impact' },
      { t: 'row', k: 'projects', v: 'featured projects' },
      { t: 'row', k: 'research', v: 'current research and interests' },
      { t: 'row', k: 'skills', v: 'technical capabilities' },
      { t: 'row', k: 'contact', v: 'reach out' },
      { t: 'row', k: 'clear', v: 'clear terminal' },
    ],
  }),

  whoami: () => ({
    lines: [
      { t: 'box-top' },
      { t: 'box-row', v: 'Nirman Taterh' },
      { t: 'box-row', v: 'MS Data Science @ NYU  ·  GPA 3.86 / 4.0' },
      { t: 'box-row', v: 'Brooklyn, NY' },
      { t: 'box-row', v: '' },
      { t: 'box-row', v: 'AI-native builder · 3+ years production ML' },
      { t: 'box-row', v: 'NLP · RAG · Agents · Reinforcement Learning' },
      { t: 'box-bot' },
    ],
  }),

  experience: () => ({
    lines: [
      { t: 'dim', v: 'work history' },
      { t: 'gap' },
      { t: 'exp', year: '2025', company: 'Johnson & Johnson', role: 'Data Science Intern (LLM/NLP)' },
      { t: 'stat', v: '+18% model accuracy  ·  −30% preprocessing time  ·  +25% team velocity' },
      { t: 'gap' },
      { t: 'exp', year: '2024', company: 'Miko', role: 'Conversational AI Developer' },
      { t: 'stat', v: '−20% hallucinations across 5K+ robot interactions  ·  +25% throughput' },
      { t: 'gap' },
      { t: 'exp', year: '2022', company: 'Miko', role: 'NLP Intern' },
      { t: 'stat', v: '+25% multilingual classification accuracy  ·  +35% response quality' },
      { t: 'gap' },
      { t: 'exp', year: '2021', company: 'Paramount / Last.fm', role: 'Recommendation Engineer' },
      { t: 'stat', v: '+50% engagement for 1.9M users  ·  −30% inference latency' },
    ],
  }),

  projects: () => ({
    lines: [
      { t: 'dim', v: 'featured projects' },
      { t: 'gap' },
      { t: 'proj', n: '01', title: 'Prosodic Encoding in LLMs', type: 'NLP Research', meta: 'pending publication · ACL-tier' },
      { t: 'proj', n: '02', title: 'Review Trust Modeling', type: 'Systems', meta: '97.7% recall · 26.7M reviews · DeBERTa' },
      { t: 'proj', n: '03', title: 'FinRL Crypto Trading Agent', type: 'RL / Published', meta: 'Springer ICIVC 2021 · +10% vs benchmark' },
      { t: 'proj', n: '04', title: 'AI Gaming Platform Optimizer', type: 'RL / Systems', meta: '+20% engagement · LangGraph · Kubernetes' },
    ],
  }),

  research: () => ({
    lines: [
      { t: 'dim', v: 'research & exploration' },
      { t: 'gap' },
      { t: 'label', v: 'active research' },
      { t: 'arrow', v: 'Implicit prosodic structure in transformer representations' },
      { t: 'meta', v: 'venue: ACL-tier  ·  status: pending publication' },
      { t: 'gap' },
      { t: 'label', v: 'currently exploring' },
      { t: 'arrow', v: 'World Models — V-JEPA and embodied learning architectures' },
      { t: 'arrow', v: 'Agentic Evaluation — robust evals for multi-step agents' },
      { t: 'arrow', v: 'Long Context RAG — beyond chunk-and-retrieve' },
      { t: 'arrow', v: 'Test-Time Compute — scaling inference-time reasoning' },
      { t: 'arrow', v: 'Loop Engineering — AI coding workflow automation' },
    ],
  }),

  skills: () => ({
    lines: [
      { t: 'dim', v: 'technical capabilities' },
      { t: 'gap' },
      { t: 'skill-group', k: 'LLM Systems    ', v: 'PyTorch · HuggingFace · DeBERTa-v3 · LoRA/PEFT · BGE-M3' },
      { t: 'skill-group', k: 'Retrieval      ', v: 'LangGraph · Qdrant · RAGatouille · ColBERT' },
      { t: 'skill-group', k: 'Infrastructure ', v: 'Docker · AWS · Spark · MLflow · Kubernetes' },
      { t: 'skill-group', k: 'RL             ', v: 'FinRL-X · SAC · TD3 · Stable Baselines 3' },
      { t: 'skill-group', k: 'Languages      ', v: 'Python · Go · TypeScript · React · SQL' },
    ],
  }),

  contact: () => ({
    lines: [
      { t: 'dim', v: 'get in touch' },
      { t: 'gap' },
      { t: 'row', k: 'email    ', v: 'nt2613@nyu.edu' },
      { t: 'row', k: 'linkedin ', v: 'linkedin.com/in/nirman-taterh' },
      { t: 'row', k: 'github   ', v: 'github.com/nirmantaterh' },
      { t: 'row', k: 'kaggle   ', v: 'kaggle.com/phiesh7w' },
      { t: 'gap' },
      { t: 'status', v: 'actively interviewing  ·  response within 24h' },
    ],
  }),
};

function renderLine(line, i) {
  switch (line.t) {
    case 'gap':
      return <div key={i} className="h-1" />;
    case 'dim':
      return <div key={i} className="text-zinc-600 text-xs uppercase tracking-widest mb-1">{line.v}</div>;
    case 'label':
      return <div key={i} className="text-zinc-400 text-xs font-semibold mt-1">{line.v}</div>;
    case 'row':
      return (
        <div key={i} className="flex gap-4">
          <span className="text-blue-400 font-mono w-24 shrink-0">{line.k}</span>
          <span className="text-zinc-300">{line.v}</span>
        </div>
      );
    case 'skill-group':
      return (
        <div key={i} className="flex gap-4">
          <span className="text-violet-400 font-mono text-xs shrink-0">{line.k}</span>
          <span className="text-zinc-300 text-xs">{line.v}</span>
        </div>
      );
    case 'exp':
      return (
        <div key={i} className="flex gap-4 items-baseline">
          <span className="text-zinc-600 font-mono text-xs w-10 shrink-0">{line.year}</span>
          <span className="text-blue-400 font-semibold text-sm w-44 shrink-0">{line.company}</span>
          <span className="text-zinc-300 text-sm">{line.role}</span>
        </div>
      );
    case 'stat':
      return <div key={i} className="text-zinc-500 text-xs ml-14 mt-0.5">{line.v}</div>;
    case 'proj':
      return (
        <div key={i} className="flex gap-4 items-baseline">
          <span className="text-zinc-600 font-mono text-xs w-6 shrink-0">{line.n}</span>
          <span className="text-white font-semibold text-sm w-56 shrink-0">{line.title}</span>
          <span className="text-violet-400 text-xs w-28 shrink-0">{line.type}</span>
          <span className="text-zinc-500 text-xs">{line.meta}</span>
        </div>
      );
    case 'arrow':
      return (
        <div key={i} className="flex gap-2 text-sm mt-0.5">
          <span className="text-blue-500 shrink-0">→</span>
          <span className="text-zinc-300">{line.v}</span>
        </div>
      );
    case 'meta':
      return <div key={i} className="text-zinc-600 text-xs ml-5">{line.v}</div>;
    case 'status':
      return (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400">{line.v}</span>
        </div>
      );
    case 'box-top':
      return <div key={i} className="text-zinc-700 font-mono text-xs">╭{'─'.repeat(48)}╮</div>;
    case 'box-row':
      return (
        <div key={i} className="text-zinc-700 font-mono text-xs flex">
          <span>│ </span>
          <span className="text-zinc-300 flex-1">{line.v}</span>
          <span className="ml-auto"> │</span>
        </div>
      );
    case 'box-bot':
      return <div key={i} className="text-zinc-700 font-mono text-xs">╰{'─'.repeat(48)}╯</div>;
    default:
      return null;
  }
}

const INITIAL_LINES = [
  { type: 'system', text: '  Nirman Taterh — AI/ML Engineer' },
  { type: 'system', text: '  Type help to see available commands. ESC or click outside to close.' },
  { type: 'divider' },
];

export default function Terminal({ onClose }) {
  const [history, setHistory] = useState(INITIAL_LINES);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

  function run(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory(INITIAL_LINES);
      return;
    }
    if (cmd === 'exit') { onClose(); return; }

    const result = COMMANDS[cmd];
    const newEntries = [{ type: 'input', text: cmd }];
    if (result) {
      newEntries.push({ type: 'output', lines: result().lines });
    } else {
      newEntries.push({ type: 'error', text: `command not found: ${cmd}` });
    }
    setHistory(prev => [...prev, ...newEntries]);
  }

  function onKey(e) {
    if (e.key === 'Enter') { run(input); setInput(''); }
    if (e.key === 'Escape') onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl flex flex-col rounded-2xl border border-white/[0.08] shadow-2xl"
        style={{ height: 520, background: '#0a0a0c', fontFamily: 'var(--font-geist-mono), monospace' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] shrink-0">
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-zinc-600 text-xs">nirman.sh</span>
          <span className="ml-auto text-zinc-700 text-xs">ESC to close</span>
        </div>

        {/* Output */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 text-sm">
          {history.map((entry, i) => {
            if (entry.type === 'divider')
              return <div key={i} className="border-t border-white/[0.04] my-2" />;
            if (entry.type === 'system')
              return <div key={i} className="text-zinc-600 text-xs">{entry.text}</div>;
            if (entry.type === 'input')
              return (
                <div key={i} className="flex gap-2 items-center mt-3">
                  <span className="text-blue-400">❯</span>
                  <span className="text-white">{entry.text}</span>
                </div>
              );
            if (entry.type === 'error')
              return <div key={i} className="text-red-400 text-xs ml-5 mt-1">{entry.text} — try &quot;help&quot;</div>;
            if (entry.type === 'output')
              return (
                <div key={i} className="ml-5 mt-1 space-y-0.5">
                  {entry.lines.map((line, j) => renderLine(line, j))}
                </div>
              );
            return null;
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/[0.06] px-5 py-3 flex items-center gap-3 shrink-0">
          <span className="text-blue-400 text-sm">❯</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            className="flex-1 bg-transparent text-white text-sm outline-none caret-blue-400 placeholder-zinc-700"
            placeholder="type a command..."
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}
