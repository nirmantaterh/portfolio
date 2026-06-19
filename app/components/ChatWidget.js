'use client';
import { useState, useRef, useEffect } from 'react';

const INITIAL = [{ role: 'assistant', content: "Hi! I'm Nirman's AI assistant. Ask me about his experience, skills, projects, or background." }];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input.trim() };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
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
      let text = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: text };
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

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!open && (
          <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />
        )}
        <button
          onClick={() => setOpen(o => !o)}
          className="relative w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-xl transition-all text-xl"
          aria-label="Chat with Nirman's AI assistant"
          title="Ask me anything about Nirman"
        >
          {open ? '✕' : '💬'}
        </button>
      </div>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-xl shadow-2xl flex flex-col border" style={{ height: 420, background: 'var(--modal-bg)', borderColor: 'rgba(128,128,128,0.15)' }}>
          <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white text-sm font-semibold">Ask about Nirman</span>
            <span className="ml-auto text-xs text-gray-500">powered by Groq</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span className={`text-sm px-3 py-2 rounded-xl max-w-[85%] leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-blue-500 text-white rounded-br-sm'
                    : 'bg-gray-800 text-gray-200 rounded-bl-sm'
                }`}>
                  {m.content || <span className="opacity-50">▋</span>}
                </span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="p-3 border-t border-gray-800 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="Ask anything..."
              disabled={loading}
              className="flex-1 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg outline-none placeholder-gray-500 disabled:opacity-50"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-40 rounded-lg text-white text-sm transition"
            >
              {loading ? '…' : '→'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
