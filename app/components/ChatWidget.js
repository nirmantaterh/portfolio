'use client';
import { useState, useRef, useEffect } from 'react';

const GREETINGS = {
  recruiter: "Hi! Looks like you came from LinkedIn — I'm Nirman's AI assistant. Ask me about his availability, skills, or I can build a custom pitch for your role.",
  engineer: "Hey! I'm Nirman's portfolio AI. Ask me about his RAG architecture, model tradeoffs, or the technical decisions behind his projects.",
  neutral: "Hi! I'm Nirman's AI assistant. Ask me about his experience, skills, or projects — or I can build a targeted pitch for your team.",
};

const CHIPS = {
  recruiter: [
    { label: 'Available now?', msg: 'Is Nirman currently available for roles and when could he start?' },
    { label: 'Strongest skill?', msg: "What is Nirman's strongest technical skill and how has he applied it in production?" },
    { label: '🎯 Build a pitch', pitch: true },
  ],
  engineer: [
    { label: 'RAG architecture?', msg: 'Walk me through your RAG pipeline architecture — what tradeoffs did you make and why?' },
    { label: 'Biggest failure?', msg: 'What was the biggest technical failure or tradeoff you made in a project and what did you learn?' },
    { label: 'ColBERT vs BM25?', msg: 'What is your take on ColBERT versus BM25 for retrieval, and when would you use each?' },
  ],
  neutral: [
    { label: 'Best project?', msg: "What is Nirman's most impressive project and what made it hard?" },
    { label: 'RAG experience?', msg: 'What is your experience with RAG systems in production?' },
    { label: '🎯 Build a pitch', pitch: true },
  ],
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState('neutral');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(true);
  const [pitchMode, setPitchMode] = useState(false);
  const [pitchInput, setPitchInput] = useState('');
  const bottomRef = useRef(null);

  // Detect visitor intent from referrer
  useEffect(() => {
    const ref = document.referrer || '';
    if (ref.includes('linkedin.com')) setIntent('recruiter');
    else if (ref.includes('github.com') || ref.includes('stackoverflow.com')) setIntent('engineer');
    else setIntent('neutral');
  }, []);

  // Set greeting based on intent
  useEffect(() => {
    setMessages([{ role: 'assistant', content: GREETINGS[intent] }]);
  }, [intent]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, pitchMode]);

  async function send(text) {
    const content = text || input.trim();
    if (!content || loading) return;

    setChipsVisible(false);
    setPitchMode(false);
    const userMsg = { role: 'user', content };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setPitchInput('');
    setLoading(true);

    const placeholder = { role: 'assistant', content: '' };
    setMessages([...history, placeholder]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let streamed = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        streamed += decoder.decode(value, { stream: true });
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: streamed };
          return updated;
        });
      }
    } catch {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: 'Something went wrong. Try again.' };
        return updated;
      });
    }
    setLoading(false);
  }

  function handleChip(chip) {
    if (chip.pitch) { setPitchMode(true); setChipsVisible(false); return; }
    send(chip.msg);
  }

  function sendPitch() {
    if (!pitchInput.trim()) return;
    send(`PITCH_REQUEST: ${pitchInput.trim()}`);
  }

  const chips = CHIPS[intent];

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!open && (
          <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />
        )}
        <button
          onClick={() => setOpen(o => !o)}
          className="relative w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-xl transition-all text-xl"
          aria-label="Chat with Nirman's AI assistant"
        >
          {open ? '✕' : '💬'}
        </button>
      </div>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-xl shadow-2xl flex flex-col border"
          style={{ height: 480, background: 'var(--modal-bg)', borderColor: 'rgba(128,128,128,0.15)' }}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b flex items-center gap-2 shrink-0" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Ask about Nirman</span>
            {intent !== 'neutral' && (
              <span className="ml-1 text-xs px-1.5 py-0.5 rounded font-mono" style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa' }}>
                {intent}
              </span>
            )}
            <span className="ml-auto text-xs" style={{ color: 'var(--fg-subtle)' }}>Groq · llama-3.3-70b</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span
                  className="text-sm px-3 py-2 rounded-xl max-w-[88%] leading-relaxed"
                  style={{
                    background: m.role === 'user' ? '#2563eb' : 'rgba(255,255,255,0.06)',
                    color: m.role === 'user' ? '#fff' : 'var(--fg)',
                    borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  }}
                >
                  {m.content || <span style={{ opacity: 0.4 }}>▋</span>}
                </span>
              </div>
            ))}

            {/* Suggested chips */}
            {chipsVisible && messages.length === 1 && (
              <div className="space-y-1.5 pt-1">
                {chips.map((chip, i) => (
                  <button
                    key={i}
                    onClick={() => handleChip(chip)}
                    className="w-full text-left text-xs px-3 py-2 rounded-lg transition-colors"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      color: chip.pitch ? '#60a5fa' : 'var(--fg-muted)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            )}

            {/* Pitch mode panel */}
            {pitchMode && (
              <div className="rounded-xl p-3 space-y-2" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <p className="text-xs font-mono" style={{ color: '#60a5fa' }}>🎯 Build a custom pitch</p>
                <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>Describe your team's stack, role, or what you're looking for:</p>
                <textarea
                  autoFocus
                  value={pitchInput}
                  onChange={e => setPitchInput(e.target.value)}
                  placeholder="e.g. We're a fintech startup building RAG features on top of GPT-4. Need someone who can own the retrieval layer..."
                  className="w-full text-xs p-2 rounded-lg outline-none resize-none"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--fg)', border: '1px solid rgba(255,255,255,0.08)', minHeight: 72 }}
                  onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) sendPitch(); }}
                />
                <div className="flex gap-2">
                  <button onClick={sendPitch} disabled={!pitchInput.trim()}
                    className="flex-1 text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors disabled:opacity-40"
                    style={{ background: '#2563eb', color: '#fff' }}>
                    Generate pitch
                  </button>
                  <button onClick={() => { setPitchMode(false); setChipsVisible(true); }}
                    className="text-xs px-3 py-1.5 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--fg-muted)' }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t shrink-0 flex gap-2" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="Ask anything..."
              disabled={loading}
              className="flex-1 text-sm px-3 py-2 rounded-lg outline-none"
              style={{ background: 'var(--input-bg)', color: 'var(--fg)', border: '1px solid rgba(255,255,255,0.07)' }}
            />
            <button onClick={() => send()} disabled={loading || !input.trim()}
              className="px-3 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-40"
              style={{ background: '#2563eb', color: '#fff' }}>
              {loading ? '…' : '→'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
