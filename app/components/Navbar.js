import SettingsToggle from './SettingsToggle';

const NAV_ITEMS = [
  { label: 'Impact', href: '#why-hire-me' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
];

const TOP_LINKS = [
  { label: 'Email', href: 'mailto:nt2613@nyu.edu?subject=Opportunity%20for%20Nirman%20Taterh', text: '✉' },
  { label: 'GitHub', href: 'https://github.com/nirmantaterh', text: 'gh' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nirman-taterh/', text: 'in' },
  { label: 'arXiv', href: 'https://arxiv.org/abs/2209.12664', text: 'arXiv' },
  { label: 'Springer', href: 'https://link.springer.com/chapter/10.1007/978-3-031-31164-2_36', text: 'Sp' },
  { label: 'Resume', href: '/resume.pdf', text: 'cv', download: true },
  { label: 'Kaggle', href: 'https://www.kaggle.com/phiesh7w', text: 'kg' },
];

function TopLink({ href, label, text, download = false }) {
  const external = !download && !href.startsWith('mailto:') && !href.startsWith('/');

  return (
    <a
      href={href}
      download={download ? '' : undefined}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={label}
      title={label}
      className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-800/80 bg-zinc-950/60 text-[9px] font-semibold uppercase tracking-[0.22em] text-zinc-400 transition-colors hover:border-zinc-500 hover:text-white"
    >
      <span aria-hidden="true">{text}</span>
    </a>
  );
}

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 w-full z-50 border-b nav-border"
      style={{ backdropFilter: 'blur(20px)', background: 'var(--nav-bg)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pr-2 scrollbar-hide">
          {TOP_LINKS.map(link => (
            <TopLink key={link.label} {...link} />
          ))}
        </div>
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <div className="hidden md:flex gap-7 text-sm">
            {NAV_ITEMS.map(item => (
              <a key={item.label} href={item.href} className="relative transition-colors duration-200 group nav-link">
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue-500 group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            ))}
          </div>
          <SettingsToggle />
        </div>
      </div>
    </nav>
  );
}
