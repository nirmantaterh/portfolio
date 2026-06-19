import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import TerminalButton from './components/TerminalButton';
import ScrollReveal from './components/ScrollReveal';
import EmailButton from './components/EmailButton';

/* ─── SVG Visualizations ────────────────────────────── */

function AttentionMapViz() {
  const weights = [
    [0.85, 0.10, 0.03, 0.01, 0.01, 0.00],
    [0.12, 0.76, 0.08, 0.03, 0.01, 0.00],
    [0.04, 0.12, 0.72, 0.08, 0.03, 0.01],
    [0.01, 0.04, 0.11, 0.75, 0.07, 0.02],
    [0.01, 0.02, 0.04, 0.12, 0.74, 0.07],
    [0.00, 0.01, 0.02, 0.05, 0.13, 0.79],
  ];
  const tokens = ['the', 'sound', 'of', 'her', 'voice', 'rose'];
  const cell = 26;
  const pad = 14;

  return (
    <svg viewBox="0 0 200 182" className="w-full h-full opacity-80">
      <text x="4" y="82" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="monospace" transform="rotate(-90,4,82)" textAnchor="middle">Query</text>
      <text x="108" y="178" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="monospace" textAnchor="middle">Key</text>
      {weights.map((row, i) =>
        row.map((w, j) => (
          <rect key={`${i}-${j}`} x={j * cell + pad} y={i * cell + 4} width={cell - 2} height={cell - 2} rx={2}
            fill={`rgba(59,130,246,${w})`} />
        ))
      )}
      {tokens.map((tok, i) => (
        <text key={i} x={i * cell + pad + cell / 2 - 1} y={6 * cell + 14} fill="rgba(255,255,255,0.22)" fontSize="6" fontFamily="monospace" textAnchor="middle">
          {tok}
        </text>
      ))}
    </svg>
  );
}

function FraudNetworkViz() {
  const cx = 100, cy = 68, r = 50;
  const count = 12;
  const fraudIdx = new Set([1, 4, 8]);
  const nodes = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), fraud: fraudIdx.has(i) };
  });

  return (
    <svg viewBox="0 0 200 148" className="w-full h-full opacity-80">
      {nodes.map((n, i) => (
        <line key={i} x1={cx} y1={cy} x2={n.x} y2={n.y}
          className={n.fraud ? 'cb-danger-line' : ''}
          stroke={n.fraud ? 'rgba(239,68,68,0.25)' : 'rgba(59,130,246,0.12)'} strokeWidth="1" />
      ))}
      {nodes.map((n, i) => (
        n.fraud ? (
          /* Diamond shape for fraud nodes — shape+color dual encoding for colorblind safety */
          <polygon key={i}
            className="cb-danger cb-danger-stroke"
            points={`${n.x},${n.y-7} ${n.x+7},${n.y} ${n.x},${n.y+7} ${n.x-7},${n.y}`}
            fill="rgba(239,68,68,0.75)" stroke="rgba(239,68,68,0.9)" strokeWidth="1" />
        ) : (
          <circle key={i} cx={n.x} cy={n.y} r={5}
            fill="rgba(59,130,246,0.35)" stroke="rgba(59,130,246,0.5)" strokeWidth="1" />
        )
      ))}
      <circle cx={cx} cy={cy} r={11} fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.7)" strokeWidth="1.5" />
      <text x={cx} y={cy + 3} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace">model</text>
      <polygon className="cb-danger" points="20,126 27,132 20,138 13,132" fill="rgba(239,68,68,0.75)" />
      <text x={31} y={135} fill="rgba(255,255,255,0.3)" fontSize="6.5" fontFamily="monospace">fraud ◆</text>
      <circle cx={72} cy={132} r={4} fill="rgba(59,130,246,0.35)" />
      <text x={80} y={135} fill="rgba(255,255,255,0.3)" fontSize="6.5" fontFamily="monospace">legitimate</text>
    </svg>
  );
}

function TradingCurveViz() {
  const baselinePath = 'M 14,68 L 174,58';
  const agentPath = 'M 14,68 Q 60,64 90,48 Q 125,30 155,16 L 174,13';
  const agentArea = `${agentPath} L 174,78 L 14,78 Z`;
  const baseArea = `${baselinePath} L 174,78 L 14,78 Z`;

  return (
    <svg viewBox="0 0 188 90" className="w-full h-full opacity-80">
      <defs>
        <linearGradient id="agent-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(59,130,246,0.15)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0)" />
        </linearGradient>
      </defs>
      {[20, 40, 60].map(y => (
        <line key={y} x1="14" y1={y} x2="174" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      <line x1="14" y1="78" x2="174" y2="78" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <line x1="14" y1="8" x2="14" y2="78" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <path d={baseArea} fill="rgba(255,255,255,0.02)" />
      <path className="cb-rl-area" d={agentArea} fill="url(#agent-grad)" />
      <path d={baselinePath} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4,3" />
      <path className="cb-rl-line" d={agentPath} fill="none" stroke="rgba(59,130,246,0.9)" strokeWidth="2" strokeLinecap="round" />
      <circle className="cb-rl-fill" cx="174" cy="13" r="3" fill="rgba(59,130,246,0.9)" />
      <text x="100" y="87" textAnchor="middle" fill="rgba(255,255,255,0.18)" fontSize="6" fontFamily="monospace">time steps →</text>
      <text x="177" y="62" fill="rgba(255,255,255,0.25)" fontSize="6" fontFamily="monospace">B/H</text>
      <text x="177" y="16" fill="rgba(59,130,246,0.8)" fontSize="6" fontFamily="monospace">RL</text>
    </svg>
  );
}

function AgentArchViz() {
  return (
    <svg viewBox="0 0 200 112" className="w-full h-full opacity-80">
      <defs>
        <marker id="arr-b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="rgba(59,130,246,0.7)" />
        </marker>
        <marker id="arr-v" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="rgba(139,92,246,0.7)" />
        </marker>
      </defs>
      <rect x="6" y="34" width="52" height="44" rx="6" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.25)" strokeWidth="1" />
      <text x="32" y="54" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">Env</text>
      <text x="32" y="66" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="5.5" fontFamily="monospace">Kubernetes</text>
      <rect x="74" y="22" width="52" height="68" rx="6" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.35)" strokeWidth="1.5" />
      <text x="100" y="53" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="monospace">RL Agent</text>
      <text x="100" y="65" textAnchor="middle" fill="rgba(139,92,246,0.8)" fontSize="6" fontFamily="monospace">SAC / TD3</text>
      <rect x="142" y="34" width="52" height="44" rx="6" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.25)" strokeWidth="1" />
      <text x="168" y="54" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">Reward</text>
      <text x="168" y="66" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="5.5" fontFamily="monospace">LangGraph</text>
      <line x1="58" y1="56" x2="74" y2="56" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5" markerEnd="url(#arr-b)" />
      <line x1="126" y1="56" x2="142" y2="56" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" markerEnd="url(#arr-v)" />
      <path d="M 168,78 Q 168,100 100,100 Q 32,100 32,78" fill="none" stroke="rgba(59,130,246,0.18)" strokeWidth="1" strokeDasharray="3,2" />
      <text x="50" y="50" fill="rgba(255,255,255,0.2)" fontSize="5.5" fontFamily="monospace">state</text>
      <text x="127" y="50" fill="rgba(255,255,255,0.2)" fontSize="5.5" fontFamily="monospace">action</text>
      <text x="100" y="108" textAnchor="middle" fill="rgba(255,255,255,0.18)" fontSize="5.5" fontFamily="monospace">reward signal</text>
    </svg>
  );
}

/* ─── Data ──────────────────────────────────────────── */

const PROJECTS = [
  {
    type: 'NLP Research',
    title: 'Prosodic Encoding in LLMs',
    desc: 'Investigating whether language models implicitly encode prosodic structure without explicit supervision. Transformer encoder pipeline in PyTorch. Pending publication at ACL-tier venue.',
    tags: ['PyTorch', 'Transformers', 'NLP'],
    viz: AttentionMapViz,
    vizLabel: 'attention map',
    link: null,
  },
  {
    type: 'Systems',
    title: 'Large-Scale Review Trust Modeling',
    desc: '97.7% recall on 26.7M reviews. Fraud classification pipeline in Python and Spark. Reduced sentiment calibration MAE from 1.47 → 0.46 by fine-tuning DeBERTa-v3 with LoRA.',
    tags: ['DeBERTa-v3', 'Spark', 'LoRA'],
    viz: FraudNetworkViz,
    vizLabel: 'fraud detection network',
    link: null,
  },
  {
    type: 'Published Paper',
    title: 'FinRL Crypto Trading Agent',
    desc: 'Published in ICIVC 2021 (Springer). Outperformed benchmark trading strategies by 10%. 14% accuracy gain with FinBERT sentiment analysis pipeline for financial NLP.',
    tags: ['FinRL-X', 'FinBERT', 'Published'],
    viz: TradingCurveViz,
    vizLabel: 'performance vs baseline',
    link: 'https://link.springer.com/chapter/10.1007/978-3-031-31164-2_36',
  },
  {
    type: 'Reinforcement Learning',
    title: 'AI Gaming Platform Optimizer',
    desc: '+20% in-game engagement, +25% content relevance. RL-based recommendation system using LangGraph tool calls, behavioral signals, and a Kubernetes/Spark simulation framework.',
    tags: ['SAC/TD3', 'LangGraph', 'Kubernetes'],
    viz: AgentArchViz,
    vizLabel: 'multi-agent architecture',
    link: null,
  },
];

const CAPABILITIES = [
  {
    name: 'LLM Systems',
    desc: 'Fine-tuning, alignment, and production deployment of transformer-based models.',
    tools: ['PyTorch', 'HuggingFace', 'DeBERTa-v3', 'LoRA/PEFT', 'BGE-M3'],
  },
  {
    name: 'Retrieval & Agents',
    desc: 'Production RAG pipelines, agentic orchestration, and vector retrieval at scale.',
    tools: ['LangGraph', 'Qdrant', 'RAGatouille', 'ColBERT'],
  },
  {
    name: 'Infrastructure',
    desc: 'Scalable ML systems, distributed training, and experiment tracking.',
    tools: ['Docker', 'AWS', 'Spark', 'MLflow', 'Kubernetes'],
  },
  {
    name: 'Research & Evaluation',
    desc: 'Model benchmarking, evaluation harness design, and academic research methodology.',
    tools: ['BGE-M3', 'ColBERT', 'FastAPI', 'HuggingFace Evals'],
  },
  {
    name: 'Reinforcement Learning',
    desc: 'RL agents for sequential decision making, reward modeling, and policy optimization.',
    tools: ['FinRL-X', 'SAC', 'TD3', 'Stable Baselines 3'],
  },
];

const EXPLORING = [
  { topic: 'World Models', sub: 'V-JEPA and embodied learning architectures', tag: 'Research' },
  { topic: 'Agentic Evaluation', sub: 'Robust evals for multi-step AI agents', tag: 'Eval' },
  { topic: 'Long Context RAG', sub: 'Beyond chunk-and-retrieve at production scale', tag: 'RAG' },
  { topic: 'Test-Time Compute', sub: 'Scaling inference-time reasoning with search', tag: 'Inference' },
  { topic: 'Loop Engineering', sub: 'AI coding workflow and agentic pipeline automation', tag: 'Dev' },
  { topic: 'Speculative Decoding', sub: 'Inference optimization for production LLM serving', tag: 'Systems' },
];

const EXPERIENCE = [
  {
    role: 'Data Science Intern — LLM/NLP',
    company: 'Johnson & Johnson',
    date: 'Mar – Aug 2025',
    location: 'New York, NY (Remote)',
    bullets: [
      'Improved biomedical decision-support model accuracy by 18% by identifying evaluation gaps and iterating transformer-based NLP pipelines end-to-end',
      'Cut preprocessing time by 30% by proactively redesigning the ETL stack before bottlenecks were flagged, improving reliability across 3 R&D initiatives',
      'Accelerated team experimentation by 25% by introducing AI-assisted coding workflows (Cursor/Copilot) and building shared evaluation tooling adopted org-wide',
    ],
  },
  {
    role: 'Conversational AI Developer',
    company: 'Miko',
    date: 'Nov 2024 – Jan 2025',
    location: 'California, USA (Remote)',
    bullets: [
      'Reduced LLM hallucinations by 20% across 5,000+ robot interactions by independently redesigning RAG pipelines and tool-calling interfaces',
      'Improved system throughput by 25% and cut error rate by 15% by building modular Python evaluation pipelines and automating model optimization loops',
      'Increased team delivery speed by 10% by mentoring 3 developers and introducing AI-assisted debugging practices',
    ],
  },
  {
    role: 'NLP Intern',
    company: 'Miko',
    date: 'Jun – Sep 2022',
    location: 'Mumbai, India',
    bullets: [
      'Improved multilingual classification accuracy by 25% and response quality by 35% by rapidly prototyping transformer pipelines (SIEBERT), owning fine-tuning end-to-end',
    ],
  },
  {
    role: 'Music Recommendation Systems Engineer',
    company: 'Paramount Global (Last.fm)',
    date: 'Sep 2020 – Feb 2021',
    location: 'London, UK (Remote)',
    bullets: [
      'Increased user engagement by ~50% for 1.9M users with a hybrid recommender (collaborative filtering + NLP metadata features) for 93K artists',
      'Reduced inference latency by ~30% by deploying distributed training across 4 GPUs and redesigning the data pipeline with no dedicated infra support',
    ],
  },
];

/* ─── Section Heading ───────────────────────────────── */
function Heading({ children, mono }) {
  return (
    <div className="mb-12">
      {mono && <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-3">{mono}</p>}
      <h2 className="text-3xl font-bold text-white tracking-tight">{children}</h2>
      <span className="block w-8 h-px bg-blue-500 mt-4" />
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="text-white pt-40 pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/25 bg-green-500/8 text-green-400 text-xs mb-8 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              open to ai/ml roles · nyc / remote
            </span>
          </ScrollReveal>

          <ScrollReveal delay={60}>
            <h1 className="text-7xl font-bold tracking-tight text-white mb-6 leading-none">
              Nirman Taterh
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed mb-4">
              Building production AI systems<br />
              from research to deployment.
            </p>
            <div className="flex gap-3 flex-wrap mb-10">
              {['NLP', 'RAG', 'Agents', 'RL'].map(tag => (
                <span key={tag} className="text-xs font-mono text-zinc-500 border border-zinc-800 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <div className="flex flex-wrap gap-6 mb-10">
              {[
                { stat: '+18%', label: 'model accuracy', where: 'J&J' },
                { stat: '−20%', label: 'LLM hallucinations', where: 'Miko' },
                { stat: '+50%', label: 'user engagement', where: 'Last.fm' },
              ].map(({ stat, label, where }) => (
                <div key={stat} className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white font-mono">{stat}</span>
                  <span className="text-zinc-500 text-sm">{label}</span>
                  <span className="text-zinc-700 text-xs font-mono">@ {where}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <div className="flex flex-wrap gap-3 items-center mb-12">
              {['Johnson & Johnson', 'Miko', 'Paramount'].map(c => (
                <span key={c} className="text-xs text-zinc-600 border border-zinc-800/80 px-3 py-1.5 rounded font-mono">
                  {c}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/resume.pdf" download className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors duration-200">
                ↓ Resume
              </a>
              <TerminalButton />
              <a href="https://github.com/nirmantaterh" target="_blank" rel="noopener noreferrer"
                className="px-5 py-2.5 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white rounded-lg text-sm transition-colors duration-200">
                GitHub ↗
              </a>
            </div>
            <p className="text-xs text-zinc-600 mt-5 font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />
              ai assistant available — ask anything about me via the chat widget ↘
            </p>
          </ScrollReveal>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── About ── */}
      <section id="about" className="text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <Heading mono="01 — about">Background</Heading>
            <div className="grid md:grid-cols-2 gap-12">
              <p className="text-zinc-400 leading-relaxed">
                I build production ML and AI systems. Three years across NLP, RAG, recommendation, and RL —
                always owning the full stack from data to evaluation to shipping.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Currently pursuing MS in Data Science at NYU (GPA 3.86/4.0). I prototype fast, evaluate
                rigorously, and move from experiment to production without losing fidelity.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── Experience ── */}
      <section id="experience" className="text-white py-20" style={{ background: 'var(--section-alt-bg)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <Heading mono="02 — experience">Work History</Heading>
          </ScrollReveal>
          <div className="space-y-10">
            {EXPERIENCE.map((job, i) => (
              <ScrollReveal key={job.role} delay={i * 70}>
                <div className="grid md:grid-cols-[200px_1fr] gap-6">
                  <div className="shrink-0">
                    <p className="text-blue-400 font-semibold text-sm">{job.company}</p>
                    <p className="text-zinc-600 text-xs font-mono mt-1">{job.date}</p>
                    <p className="text-zinc-700 text-xs mt-0.5">{job.location}</p>
                  </div>
                  <div className="border-l border-zinc-800 pl-6">
                    <h3 className="text-white font-semibold mb-3">{job.role}</h3>
                    <ul className="space-y-2">
                      {job.bullets.map((b, j) => (
                        <li key={j} className="text-zinc-400 text-sm leading-relaxed flex gap-2">
                          <span className="text-zinc-700 mt-1.5 shrink-0">·</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── Skills ── */}
      <section id="skills" className="text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <Heading mono="03 — capabilities">Technical Skills</Heading>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAPABILITIES.map((cap, i) => (
              <ScrollReveal key={cap.name} delay={i * 70}>
                <div className="card-lift border border-zinc-800/80 rounded-xl p-5 h-full"
                  style={{ background: 'var(--card-bg)' }}>
                  <h3 className="text-white font-semibold text-sm mb-2">{cap.name}</h3>
                  <p className="text-zinc-600 text-xs leading-relaxed mb-4">{cap.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cap.tools.map(tool => (
                      <span key={tool} className="text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── Projects ── */}
      <section id="projects" className="text-white py-20" style={{ background: 'var(--section-alt-bg)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <Heading mono="04 — projects">Featured Work</Heading>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p, i) => {
              const Viz = p.viz;
              return (
                <ScrollReveal key={p.title} delay={i * 70}>
                  <div className="card-lift border border-zinc-800/80 rounded-xl overflow-hidden h-full flex flex-col"
                    style={{ background: 'var(--card-bg)' }}>
                    {/* Visualization */}
                    <div className="border-b border-zinc-800/60 relative" style={{ background: 'var(--viz-bg)', height: 160 }}>
                      <div className="absolute inset-0 p-4 flex items-center justify-center">
                        <Viz />
                      </div>
                      <span className="absolute bottom-2 right-3 text-zinc-700 text-xs font-mono">{p.vizLabel}</span>
                    </div>
                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-2">{p.type}</p>
                      <h3 className="text-white font-semibold mb-2">
                        {p.link ? (
                          <a href={p.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                            {p.title} ↗
                          </a>
                        ) : p.title}
                      </h3>
                      <p className="text-zinc-500 text-sm leading-relaxed flex-1 mb-4">{p.desc}</p>
                      <div className="flex gap-2 flex-wrap">
                        {p.tags.map(tag => (
                          <span key={tag} className="text-xs font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── Currently Exploring ── */}
      <section className="text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <Heading mono="05 — interests">Currently Exploring</Heading>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXPLORING.map((item, i) => (
              <ScrollReveal key={item.topic} delay={i * 60}>
                <div className="card-lift border border-zinc-800/60 rounded-xl p-4 flex flex-col gap-2 group"
                  style={{ background: 'var(--section-alt-bg)' }}>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-white text-sm font-semibold group-hover:text-blue-300 transition-colors">{item.topic}</h3>
                    <span className="text-xs font-mono text-zinc-700 border border-zinc-800 px-1.5 py-0.5 rounded shrink-0">{item.tag}</span>
                  </div>
                  <p className="text-zinc-600 text-xs leading-relaxed">{item.sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── Contact ── */}
      <section id="contact" className="text-white py-20" style={{ background: 'var(--section-alt-bg)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <Heading mono="06 — contact">Get In Touch</Heading>
            <p className="text-zinc-400 max-w-xl leading-relaxed mb-2">
              Looking for AI/ML internship or entry-level roles in NYC. Open to hybrid, remote, or on-site.
            </p>
            <p className="text-xs text-zinc-600 font-mono mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
              actively interviewing · response within 24h
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <EmailButton className="px-7 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-sm transition-colors duration-200">
                Email Me
              </EmailButton>
              {[
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nirman-taterh/' },
                { label: 'GitHub', href: 'https://github.com/nirmantaterh' },
                { label: 'Kaggle', href: 'https://www.kaggle.com/phiesh7w' },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="px-4 py-3 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white rounded-lg text-sm transition-colors duration-200">
                  {label}
                </a>
              ))}
              <a href="/resume.pdf" download
                className="px-4 py-3 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white rounded-lg text-sm transition-colors duration-200">
                ↓ Resume
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="border-t border-white/[0.05] py-6">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <p className="text-zinc-700 text-xs font-mono">© 2026 Nirman Taterh</p>
          <div className="flex gap-5">
            <a href="https://www.linkedin.com/in/nirman-taterh/" target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:text-zinc-400 text-xs transition-colors">LinkedIn</a>
            <a href="https://github.com/nirmantaterh" target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:text-zinc-400 text-xs transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </>
  );
}
