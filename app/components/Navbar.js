export default function Navbar() {
  return (
    <nav
      className="fixed top-0 w-full z-50 border-b border-white/[0.05]"
      style={{ backdropFilter: 'blur(20px)', background: 'rgba(5,5,5,0.75)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-sm font-semibold text-white tracking-widest">NT</a>
        <div className="flex gap-8 text-sm">
          {['About', 'Experience', 'Projects', 'Contact'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-zinc-500 hover:text-white transition-colors duration-200 group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue-500 group-hover:w-full transition-all duration-300 ease-out" />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
