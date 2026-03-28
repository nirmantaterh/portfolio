import Navbar from './components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen bg-black text-white pt-32 flex items-center">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-6xl font-bold mb-4">Nirman Taterh</h1>
          <p className="text-2xl text-gray-400 mb-2">MS Data Science @ NYU</p>
          <p className="text-xl text-gray-500">Brooklyn, NY</p>
          <p className="text-lg text-gray-400 mt-6 max-w-2xl">
            Building production ML systems | NLP | Recommendation Systems | 3+ years shipping to real users
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8 text-blue-500">About</h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
            I'm a Data Science grad student at NYU with 3 years of production ML experience. 
            I've built recommendation systems serving 1.9M users at Last.fm, reduced hallucinations 
            by 20% in conversational AI at Miko, and improved medical NLP accuracy by 18% at Johnson & Johnson.
            <br/><br/>
            Currently pursuing my MS in Data Science at NYU, focusing on NLP and systematic investing. 
            I ship fast, own problems end-to-end, and use AI to build AI.
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-blue-500">Experience</h2>
          
          <div className="space-y-12">
            {/* J&J */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-2xl font-bold">Machine Learning Engineer</h3>
              <p className="text-gray-400">Johnson & Johnson • 2023-2024</p>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li>• Improved biomedical NLP model accuracy by 18% using domain-specific pretraining</li>
                <li>• Cut preprocessing time by 30% through optimized data pipelines</li>
                <li>• Built end-to-end ML systems for medical text analysis</li>
              </ul>
            </div>

            {/* Miko */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-2xl font-bold">AI Engineer</h3>
              <p className="text-gray-400">Miko (Conversational AI) • 2022-2023</p>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li>• Reduced LLM hallucinations by 20% through RAG system optimization</li>
                <li>• Shipped conversational AI features to production serving thousands of users</li>
                <li>• Built retrieval-augmented generation pipelines from scratch</li>
              </ul>
            </div>

            {/* Last.fm */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-2xl font-bold">ML Engineer</h3>
              <p className="text-gray-400">Last.fm • 2021-2022</p>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li>• Built recommendation system serving 1.9M monthly active users</li>
                <li>• Boosted user engagement by 50% through personalized recommendations</li>
                <li>• Owned entire ML pipeline from data collection to production deployment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-blue-500">Featured Projects</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="border border-gray-800 p-6 rounded-lg hover:border-blue-500 transition">
              <h3 className="text-2xl font-bold mb-3">RAG Evaluation Toolkit</h3>
              <p className="text-gray-400 mb-4">
                Benchmarking framework for retrieval-augmented generation systems. 
                Compares 5 chunking strategies, 3 retrieval methods, 6 evaluation metrics.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">Python</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">LlamaIndex</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">ChromaDB</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="border border-gray-800 p-6 rounded-lg hover:border-blue-500 transition">
              <h3 className="text-2xl font-bold mb-3">Transformer from Scratch</h3>
              <p className="text-gray-400 mb-4">
                Built Transformer encoder in PyTorch for NLP assignment. 
                Achieved 99.87% accuracy on letter counting task.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">PyTorch</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">NLP</span>
              </div>
            </div>

            {/* Project 3 */}
            <div className="border border-gray-800 p-6 rounded-lg hover:border-blue-500 transition">
              <h3 className="text-2xl font-bold mb-3">Systematic Trading Strategy</h3>
              <p className="text-gray-400 mb-4">
                Counter-trend mean reversion strategy on S&P 500 futures. 
                Statistical analysis revealing volatility-regime behavior.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">Python</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">Finance</span>
              </div>
            </div>

            {/* Project 4 */}
            <div className="border border-gray-800 p-6 rounded-lg hover:border-blue-500 transition">
              <h3 className="text-2xl font-bold mb-3">NLP Research: Prosodic Ghosts</h3>
              <p className="text-gray-400 mb-4">
                Investigating whether language models implicitly encode prosodic information. 
                Literature review complete, experiments in progress.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">Research</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">NLP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen bg-black text-white py-20 flex items-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8 text-blue-500">Get In Touch</h2>
          <p className="text-xl text-gray-300 mb-8">
            Looking for ML/Data Science roles in NYC. Open to hybrid, remote, or on-site.
          </p>
          <div className="flex gap-6">
            <a href="mailto:nt2613@nyu.edu" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition">
              Email Me
            </a>
            <a href="https://www.linkedin.com/in/nirman-taterh/" target="_blank" className="px-6 py-3 border border-blue-500 hover:bg-blue-500/10 rounded-lg transition">
              LinkedIn
            </a>
            <a href="https://github.com/nirmantaterh/" target="_blank" className="px-6 py-3 border border-blue-500 hover:bg-blue-500/10 rounded-lg transition">
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-500 py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>© 2026 Nirman Taterh. Built with Next.js</p>
        </div>
      </footer>
    </>
  );
}