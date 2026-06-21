'use client';
import { useState, useEffect } from 'react';
import Terminal from './Terminal';

export default function TerminalButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e) {
      const isBackquote = e.key === '`' || e.key === '~' || e.code === 'Backquote';
      const isAltShortcut = (e.ctrlKey || e.metaKey) && e.shiftKey && (e.key.toLowerCase() === 'p' || e.code === 'KeyP');
      if ((e.ctrlKey || e.metaKey) && isBackquote || isAltShortcut) {
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
        title="Open terminal (Ctrl/Cmd + ` or Ctrl/Cmd + Shift + P)"
      >
        &gt;_ terminal
      </button>
      {open && <Terminal onClose={() => setOpen(false)} />}
    </>
  );
}
