'use client';
import { useState, useRef, useEffect } from 'react';

const COMMANDS = {
  help: () => 'Commands: whoami · skills · experience · projects · contact · clear · exit',
  whoami: () => 'Nirman Taterh — AI/ML Engineer\nMS Data Science @ NYU (GPA 3.86/4.0) · Brooklyn, NY\n3+ years shipping production ML systems across NLP, RAG, and recommendation.',
  skills: () => `Language Models  PyTorch · HuggingFace · DeBERTa-v3 · BGE-M3 · ColBERT
RAG & Agents     LangGraph · Qdrant · RAGatouille · FastAPI
Reinforcement RL FinRL-X · SAC/TD3 · Stable Baselines 3
Infrastructure   Docker · AWS · MLflow · Spark
Languages        Python · Go · TypeScript · React`,
  experience: () => `[2025] Data Science Intern (LLM/NLP) · Johnson & Johnson
       → +18% model accuracy · -30% preprocessing time
[2025] Conversational AI Developer · Miko
       → -20% hallucinations across 5K+ robot interactions
[2022] NLP Intern · Miko
       → +25% multilingual classification accuracy
[2021] Recommendation Engineer · Paramount / Last.fm
       → +50% engagement for 1.9M users`,
  projects: () => `[1] Prosodic Encoding in LLMs — pending publication (ACL-tier)
[2] Review Trust Modeling — 97.7% recall on 26.7M reviews
[3] FinRL Crypto Agent — Published, Springer ICIVC 2021
[4] AI Gaming Platform Optimizer — +20% engagement`,
  contact: () => `Email    nt2613@nyu.edu
LinkedIn linkedin.com/in/nirman-taterh
GitHub   github.com/nirmantaterh
Kaggle   kaggle.com/phiesh7w`,
};

export default function Terminal({ onClose }) {
  const [lines, setLines] = useState([
    { type: 'system', text: '┌─ nirman.sh ─────────────────────────────────┐' },
    { type: 'system', text: '  AI/ML Engineer portfolio terminal' },
    { type: 'system', text: '  Type "help" to see commands. ESC to close.' },
    { type: 'system', text: '└─────────────────────────────────────────────┘' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [lines]);

  function run(cmd) {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newLines = [{ type: 'input', text: `$ ${cmd.trim()}` }];

    if (trimmed === 'clear') {
      setLines([{ type: 'system', text: 'Cleared. Type "help" for commands.' }]);
      return;
    }
    if (trimmed === 'exit') { onClose(); return; }

    const fn = COMMANDS[trimmed];
    newLines.push(fn
      ? { type: 'output', text: fn() }
      : { type: 'error', text: `command not found: ${trimmed}. Try "help"` }
    );
    setLines(prev => [...prev, ...newLines]);
  }

  function onKey(e) {
    if (e.key === 'Enter') { run(input); setInput(''); }
    if (e.key === 'Escape') onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-gray-950 border border-gray-700 rounded-xl shadow-2xl flex flex-col font-mono text-sm"
        style={{ height: 460 }}
        onClick={e => e.stopPropagation()}
      >
        {/* macOS-style title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 shrink-0">
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-3 text-gray-500 text-xs">nirman.sh</span>
        </div>

        {/* Output */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {lines.map((l, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap ${
                l.type === 'input' ? 'text-blue-400' :
                l.type === 'error' ? 'text-red-400' :
                l.type === 'system' ? 'text-gray-500' :
                'text-green-400'
              }`}
            >
              {l.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-800 px-4 py-3 flex items-center gap-2 shrink-0">
          <span className="text-blue-400 select-none">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            className="flex-1 bg-transparent text-white outline-none caret-blue-400"
            autoComplete="off"
            spellCheck="false"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  );
}
