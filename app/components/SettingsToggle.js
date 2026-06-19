'use client';
import { useEffect, useState, useRef } from 'react';

export default function SettingsToggle() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [cv, setCv] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedCv = localStorage.getItem('colorblind') === 'true';
    setTheme(savedTheme);
    setCv(savedCv);
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('data-colorblind', savedCv ? 'true' : 'false');
  }, []);

  useEffect(() => {
    function onClickOut(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', onClickOut);
    return () => document.removeEventListener('mousedown', onClickOut);
  }, [open]);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  function toggleCv() {
    const next = !cv;
    setCv(next);
    document.documentElement.setAttribute('data-colorblind', next ? 'true' : 'false');
    localStorage.setItem('colorblind', next ? 'true' : 'false');
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Display settings"
        title="Display settings"
        className="w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-200"
        style={{
          background: open ? 'rgba(255,255,255,0.1)' : 'transparent',
          color: '#a1a1aa',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        ⊞
      </button>

      {open && (
        <div
          className="absolute top-10 right-0 rounded-xl shadow-2xl p-3 w-52 z-50"
          style={{ background: 'var(--modal-bg)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p className="text-xs font-mono px-1 mb-2" style={{ color: 'var(--fg-muted)' }}>Display</p>

          {/* Theme row */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-2 py-2 rounded-lg text-sm transition-colors"
            style={{ color: 'var(--fg)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span className="flex items-center gap-2 text-xs">
              {theme === 'dark' ? '☾' : '☀'}
              {theme === 'dark' ? 'Dark mode' : 'Light mode'}
            </span>
            {/* Toggle pill */}
            <span className="relative inline-flex h-4 w-7 items-center rounded-full transition-colors duration-200"
              style={{ background: theme === 'light' ? '#3b82f6' : 'rgba(255,255,255,0.15)' }}>
              <span className="inline-block h-3 w-3 rounded-full bg-white shadow transition-transform duration-200"
                style={{ transform: theme === 'light' ? 'translateX(14px)' : 'translateX(2px)' }} />
            </span>
          </button>

          {/* Colorblind row */}
          <button
            onClick={toggleCv}
            className="w-full flex items-center justify-between px-2 py-2 rounded-lg text-sm transition-colors"
            style={{ color: 'var(--fg)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span className="flex items-center gap-2 text-xs">
              ◑ Colorblind mode
            </span>
            <span className="relative inline-flex h-4 w-7 items-center rounded-full transition-colors duration-200"
              style={{ background: cv ? '#648FFF' : 'rgba(255,255,255,0.15)' }}>
              <span className="inline-block h-3 w-3 rounded-full bg-white shadow transition-transform duration-200"
                style={{ transform: cv ? 'translateX(14px)' : 'translateX(2px)' }} />
            </span>
          </button>

          {cv && (
            <p className="text-xs px-2 mt-1 leading-relaxed" style={{ color: 'var(--fg-subtle)' }}>
              IBM safe palette · shape+color encoding
            </p>
          )}
        </div>
      )}
    </div>
  );
}
