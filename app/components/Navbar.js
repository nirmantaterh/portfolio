export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-xl font-bold text-blue-500">NT</a>
        <div className="flex gap-8">
          <a href="#about" className="hover:text-blue-500 transition">About</a>
          <a href="#experience" className="hover:text-blue-500 transition">Experience</a>
          <a href="#projects" className="hover:text-blue-500 transition">Projects</a>
          <a href="#contact" className="hover:text-blue-500 transition">Contact</a>
        </div>
      </div>
    </nav>
  );
}