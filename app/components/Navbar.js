import SettingsToggle from './SettingsToggle';

const NAV_ITEMS = [
  { label: 'Impact', href: '#why-hire-me' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
  { label: 'CV', href: '/resume.pdf', download: true },
];

const TOP_LINKS = [
  { label: 'Email', href: 'mailto:nt2613@nyu.edu?subject=Opportunity%20for%20Nirman%20Taterh', icon: EmailIcon },
  { label: 'GitHub', href: 'https://github.com/nirmantaterh', icon: GitHubIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nirman-taterh/', icon: LinkedInIcon },
  { label: 'arXiv', href: 'https://arxiv.org/abs/2209.12664', text: 'arXiv' },
  { label: 'Springer', href: 'https://link.springer.com/chapter/10.1007/978-3-031-31164-2_36', text: 'Sp' },
  { label: 'Resume', href: '/resume.pdf', text: 'cv', download: true },
  { label: 'Kaggle', href: 'https://www.kaggle.com/phiesh7w', text: 'kg' },
];

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M12 2.2c-5.4 0-9.8 4.4-9.8 9.8 0 4.3 2.8 8 6.8 9.2.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 0 1.5 1.1 1.5 1.1.8 1.4 2.1 1 2.7.8.1-.6.3-1 .6-1.2-2.2-.3-4.5-1.1-4.5-4.9 0-1.1.4-2.1 1.1-2.8-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1a9.7 9.7 0 0 1 5.1 0c1.9-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7.7.7 1.1 1.7 1.1 2.8 0 3.8-2.3 4.6-4.5 4.9.3.2.7.8.7 1.6v2.4c0 .3.2.6.7.5 4-1.2 6.8-4.9 6.8-9.2 0-5.4-4.4-9.8-9.8-9.8Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M4.5 3.5A1.5 1.5 0 0 1 6 2h12A1.5 1.5 0 0 1 19.5 3.5v17A1.5 1.5 0 0 1 18 22H6a1.5 1.5 0 0 1-1.5-1.5v-17ZM7 9H5v8h2V9Zm-1-1.1A1.2 1.2 0 1 0 6 5.5a1.2 1.2 0 0 0 0 2.4ZM11 9H9v8h2v-4.4c0-1.2.4-2.1 1.5-2.1 1 0 1.5.7 1.5 2v4.5h2v-4.9c0-2.4-1.2-3.6-2.9-3.6-1.3 0-2 .7-2.1 1.1V9Z" />
    </svg>
  );
}

function TopLink({ href, label, text, icon: Icon, download = false }) {
  const external = !download && !href.startsWith('mailto:') && !href.startsWith('/');

  return (
    <a
      href={href}
      download={download ? '' : undefined}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={label}
      title={label}
      className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-800/80 bg-zinc-950/60 text-zinc-400 transition-colors hover:border-zinc-500 hover:text-white"
    >
      {Icon ? (
        <Icon />
      ) : (
        <span className="text-[9px] font-semibold uppercase tracking-[0.22em]" aria-hidden="true">
          {text}
        </span>
      )}
    </a>
  );
}

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 w-full z-50 border-b nav-border"
      style={{ backdropFilter: 'blur(20px)', background: 'var(--nav-bg)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pr-2 scrollbar-hide">
          {TOP_LINKS.map(link => (
            <TopLink key={link.label} {...link} />
          ))}
        </div>
        <div className="flex items-center gap-3 md:gap-5 shrink-0 justify-between md:justify-end">
          <div className="flex items-center gap-3 text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.18em] text-zinc-500 overflow-x-auto pr-2 scrollbar-hide">
            {NAV_ITEMS.map(item => {
              const external = !!item.download;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  download={item.download ? '' : undefined}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="relative transition-colors duration-200 group nav-link whitespace-nowrap"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue-500 group-hover:w-full transition-all duration-300 ease-out" />
                </a>
              );
            })}
          </div>
          <SettingsToggle />
        </div>
      </div>
    </nav>
  );
}
