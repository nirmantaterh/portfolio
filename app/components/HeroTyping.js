'use client';
import { useState, useEffect } from 'react';

const ROLES = [
  'ML/AI Engineer',
  'LLM Systems Builder',
  'Agentic Systems Developer',
  'Evaluation Infrastructure',
  'Production AI Engineer',
  'Multi-Agent Systems',
];

export default function HeroTyping() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = ROLES[idx];

    if (!deleting && displayed === target) {
      const t = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (deleting && displayed === '') {
      setDeleting(false);
      setIdx(i => (i + 1) % ROLES.length);
      return;
    }

    const speed = deleting ? 35 : 65;
    const t = setTimeout(() => {
      setDisplayed(d => deleting ? d.slice(0, -1) : target.slice(0, d.length + 1));
    }, speed);

    return () => clearTimeout(t);
  }, [displayed, deleting, idx]);

  return (
    <span className="font-mono" style={{ color: '#60a5fa' }}>
      {displayed}
      <span className="animate-pulse ml-0.5" style={{ color: '#3b82f6' }}>|</span>
    </span>
  );
}
