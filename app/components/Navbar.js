import SettingsToggle from './SettingsToggle';

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 w-full z-50 border-b nav-border"
      style={{ backdropFilter: 'blur(20px)', background: 'var(--nav-bg)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-sm font-semibold tracking-widest" style={{ color: 'var(--fg)' }}>NT</a>
        <div className="flex items-center gap-6">
          <div className="flex gap-7 text-sm">
            {['About', 'Experience', 'Projects', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="relative transition-colors duration-200 group nav-link">
                {item}
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
