'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  async function submit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) { setStatus('sent'); setForm({ name: '', email: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-xl p-6 text-center" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}>
        <p className="text-green-400 font-semibold mb-1">Message received!</p>
        <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>I'll get back to you within 24h.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3 max-w-md">
      <div className="grid grid-cols-2 gap-3">
        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="px-3 py-2 rounded-lg text-sm outline-none"
          style={{ background: 'var(--input-bg)', color: 'var(--fg)', border: '1px solid rgba(255,255,255,0.08)' }}
        />
        <input
          required type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="px-3 py-2 rounded-lg text-sm outline-none"
          style={{ background: 'var(--input-bg)', color: 'var(--fg)', border: '1px solid rgba(255,255,255,0.08)' }}
        />
      </div>
      <textarea
        required
        placeholder="Message"
        rows={4}
        value={form.message}
        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
        className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
        style={{ background: 'var(--input-bg)', color: 'var(--fg)', border: '1px solid rgba(255,255,255,0.08)' }}
      />
      <div className="flex gap-3 items-center">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-5 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
          style={{ background: '#2563eb', color: '#fff' }}
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        {status === 'error' && <p className="text-xs text-red-400">Something went wrong. Try again.</p>}
      </div>
    </form>
  );
}
