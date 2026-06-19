'use client';
import { useEffect } from 'react';

export default function ViewTracker() {
  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'home', referrer: document.referrer }),
    }).catch(() => {});

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target.id;
          if (section) {
            fetch('/api/track', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ section, referrer: document.referrer }),
            }).catch(() => {});
          }
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('section[id]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
