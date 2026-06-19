'use client';
import { useState, useEffect } from 'react';

function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function GitHubActivity() {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/nirmantaterh/events?per_page=30')
      .then(r => r.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        const pushes = data
          .filter(e => e.type === 'PushEvent')
          .slice(0, 4)
          .map(e => ({
            repo: e.repo.name.replace('nirmantaterh/', ''),
            message: e.payload.commits?.[0]?.message?.split('\n')[0]?.slice(0, 60) || 'update',
            time: e.created_at,
          }));
        setCommits(pushes);
      })
      .catch(() => {});
  }, []);

  if (commits.length === 0) return null;

  return (
    <div className="mt-12 max-w-xl">
      <p className="text-xs font-mono mb-3 flex items-center gap-2" style={{ color: 'var(--fg-subtle)' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
        recent github activity
      </p>
      <div className="space-y-1.5">
        {commits.map((c, i) => (
          <div key={i} className="flex items-baseline gap-3 text-xs">
            <span className="font-mono shrink-0" style={{ color: '#60a5fa', minWidth: 80 }}>{c.repo}</span>
            <span className="truncate" style={{ color: 'var(--fg-muted)' }}>{c.message}</span>
            <span className="shrink-0 font-mono" style={{ color: 'var(--fg-subtle)' }}>{timeAgo(c.time)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
