'use client';
import { useEffect, useState } from 'react';

export default function ColorblindToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('colorblind') === 'true';
    setOn(saved);
    document.documentElement.setAttribute('data-colorblind', saved ? 'true' : 'false');
  }, []);

  function toggle() {
    const next = !on;
    setOn(next);
    document.documentElement.setAttribute('data-colorblind', next ? 'true' : 'false');
    localStorage.setItem('colorblind', next ? 'true' : 'false');
  }

  return (
    <button
      onClick={toggle}
      title={on ? 'Colorblind mode ON — click to disable' : 'Enable colorblind-friendly palette'}
      aria-label="Toggle colorblind mode"
      aria-pressed={on}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all duration-200"
      style={{
        background: on ? 'rgba(96,165,250,0.15)' : 'rgba(255,255,255,0.08)',
        color: on ? '#93c5fd' : '#e4e4e7',
        border: on ? '1px solid rgba(96,165,250,0.5)' : '1px solid rgba(255,255,255,0.15)',
      }}
    >
      ◑ {on ? 'CV: ON' : 'CV'}
    </button>
  );
}
