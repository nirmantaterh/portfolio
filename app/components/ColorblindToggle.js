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
      title={`${on ? 'Disable' : 'Enable'} colorblind-friendly mode`}
      className={`w-8 h-8 flex items-center justify-center rounded-md border text-xs font-mono transition-colors ${
        on
          ? 'border-blue-500 text-blue-400 bg-blue-500/10'
          : 'border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600'
      }`}
      aria-label="Toggle colorblind mode"
      aria-pressed={on}
    >
      CV
    </button>
  );
}
