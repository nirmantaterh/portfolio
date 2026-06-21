'use client';
import { useEffect, useState, useRef } from 'react';

const THEME_VERSION = '7';
const THEMES = [
  { value: 'paper', label: 'Paper', hint: 'editorial contrast' },
  { value: 'electric', label: 'Electric', hint: 'high contrast' },
  { value: 'midnight', label: 'Midnight', hint: 'subtle dark' },
  { value: 'aurora', label: 'Aurora', hint: 'brighter glow' },
  { value: 'ember', label: 'Ember', hint: 'warm contrast' },
];

export default function SettingsToggle() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('midnight');
  const [cv, setCv] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const savedVersion = localStorage.getItem('theme-version');
    const savedTheme = localStorage.getItem('theme');
    const nextTheme = savedVersion === THEME_VERSION && THEMES.some(option => option.value === savedTheme)
      ? savedTheme
      : 'midnight';
    const savedCv = localStorage.getItem('colorblind') === 'true';

    setTheme(nextTheme);
    setCv(savedCv);
    document.documentElement.setAttribute('data-theme', nextTheme);
    document.documentElement.setAttribute('data-colorblind', savedCv ? 'true' : 'false');
    localStorage.setItem('theme-version', THEME_VERSION);
    localStorage.setItem('theme', nextTheme);
  }, []);

  useEffect(() => {
    function onClickOut(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', onClickOut);
    return () => document.removeEventListener('mousedown', onClickOut);
  }, [open]);

  function setThemeMode(next) {
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    localStorage.setItem('theme-version', THEME_VERSION);
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
          className="absolute top-10 right-0 rounded-xl shadow-2xl p-3 w-64 z-50"
          style={{ background: 'var(--modal-bg)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p className="text-xs font-mono px-1 mb-2" style={{ color: 'var(--fg-muted)' }}>Display</p>

          <div className="space-y-1.5 mb-3">
            {THEMES.map(option => {
              const active = theme === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setThemeMode(option.value)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors"
                  style={{
                    color: 'var(--fg)',
                    background: active ? 'rgba(59,130,246,0.12)' : 'transparent',
                    border: active ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span className="flex items-center gap-2 text-xs">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{
                        background:
                          option.value === 'paper'
                            ? '#2563eb'
                            : option.value === 'ember'
                              ? '#fb923c'
                              : option.value === 'aurora'
                                ? '#60a5fa'
                                : option.value === 'electric'
                                  ? '#22d3ee'
                                  : '#3b82f6',
                      }}
                    />
                    <span>
                      {option.label}
                      <span className="ml-2 text-[10px] uppercase tracking-widest" style={{ color: 'var(--fg-subtle)' }}>
                        {option.hint}
                      </span>
                    </span>
                  </span>
                  {active && <span className="text-[10px] uppercase tracking-widest" style={{ color: option.value === 'paper' ? '#2563eb' : '#22d3ee' }}>active</span>}
                </button>
              );
            })}
          </div>

          <button
            onClick={toggleCv}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors"
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

