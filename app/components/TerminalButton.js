'use client';
import { useState, useEffect } from 'react';
import Terminal from './Terminal';

export default function TerminalButton() {
  const [open, setOpen] = useState(false);

  // also open on Ctrl+` or Ctrl+~
  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setOpen(o => !o);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 border border-gray-600 hover:border-green-400 hover:text-green-400 rounded-lg text-sm transition font-mono text-gray-300"
        title="Open terminal (Ctrl+`)"
      >
        &gt;_ terminal
      </button>
      {open && <Terminal onClose={() => setOpen(false)} />}
    </>
  );
}
