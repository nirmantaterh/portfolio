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
            AI-native builder with 3+ years shipping production ML systems across NLP, RAG, and recommendation
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8 text-blue-500">About</h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
            AI-native builder with 3+ years shipping production ML systems across NLP, RAG, and recommendation. 
            I consistently move from research to prototype to production systems using modern AI development tools 
            (Cursor, Copilot, LLM APIs).
            <br/><br/>
            Currently pursuing MS in Data Science at NYU (GPA: 3.86/4.0) while researching implicit prosodic 
            encoding in language models (pending publication). I actively track and experiment with emerging AI 
            tools and workflows, regularly prototyping new approaches based on latest research.
            <br/><br/>
            Seeking a high-ownership AI/ML role where speed and real-world impact matter.
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
              <h3 className="text-2xl font-bold">Data Science Intern - LLM/NLP</h3>
              <p className="text-gray-400">Johnson & Johnson • Mar 2025 - Aug 2025 • New York, NY (Remote)</p>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li>• Improved biomedical decision-support model accuracy by 18% by identifying evaluation gaps and iterating transformer-based NLP pipelines end-to-end using Python, HuggingFace, and rapid hypothesis testing</li>
                <li>• Cut preprocessing time by 30% by proactively redesigning the ETL stack before bottlenecks were flagged, improving downstream model reliability across 3 Innovative Medicine R&D initiatives</li>
                <li>• Accelerated team experimentation cycles by 25% by introducing AI-assisted coding workflows (Cursor/Copilot) and building shared evaluation tooling adopted org-wide</li>
              </ul>
            </div>

            {/* Miko - Recent */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-2xl font-bold">Conversational AI Developer</h3>
              <p className="text-gray-400">Miko • Nov 2024 - Jan 2025 • California, USA (Remote)</p>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li>• Reduced LLM hallucinations by 20% across 5,000+ robot interactions by independently redesigning RAG pipelines and tool-calling interfaces; shipped to fix a real failure mode, not a scoped task</li>
                <li>• Improved system throughput by 25% and cut error rate by 15% by building modular Python evaluation pipelines and automating model optimization loops from scratch</li>
                <li>• Increased team delivery speed by 10% by mentoring 3 developers and introducing AI-assisted debugging practices that cut review cycles without adding process overhead</li>
              </ul>
            </div>

            {/* Miko - Intern */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-2xl font-bold">NLP Intern</h3>
              <p className="text-gray-400">Miko • Jun 2022 - Sep 2022 • Mumbai, India</p>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li>• Improved multilingual classification accuracy by 25% and response quality by 35% by rapidly prototyping transformer pipelines (SIEBERT), owning fine-tuning and domain adaptation end-to-end</li>
              </ul>
            </div>

            {/* Last.fm */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-2xl font-bold">Music Recommendation Systems Engineer</h3>
              <p className="text-gray-400">Paramount Global (Last.fm) • Sep 2020 - Feb 2021 • London, UK (Remote)</p>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li>• Increased user engagement by ~50% for 1.9M users by building a hybrid recommender (collaborative filtering + NLP metadata features) for 93K artists, independently identifying the content-signal gap</li>
                <li>• Reduced inference latency by ~30% by deploying distributed training across 4 GPUs and redesigning the data pipeline with no dedicated infra support</li>
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
              <h3 className="text-2xl font-bold mb-3">NLP Research: Prosodic Encoding in LLMs</h3>
              <p className="text-gray-400 mb-4">
                Investigating whether language models implicitly encode prosodic structure without explicit supervision. 
                Built transformer encoder pipeline in PyTorch, targeting ACL-tier venue. Pending publication.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">Research</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">PyTorch</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">NLP</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="border border-gray-800 p-6 rounded-lg hover:border-blue-500 transition">
              <h3 className="text-2xl font-bold mb-3">Large-Scale Review Trust Modeling</h3>
              <p className="text-gray-400 mb-4">
                Achieved 97.7% recall on 26.7M reviews by building fraud classification pipeline in Python and Spark. 
                Reduced sentiment calibration MAE from 1.47 to 0.46 by fine-tuning DeBERTa.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">Python</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">Spark</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">DeBERTa</span>
              </div>
            </div>

            {/* Project 3 */}
            <div className="border border-gray-800 p-6 rounded-lg hover:border-blue-500 transition">
              <h3 className="text-2xl font-bold mb-3">
                <a href="https://link.springer.com/chapter/10.1007/978-3-031-31164-2_36" target="_blank" className="hover:text-blue-400 transition">
                  FinRL Crypto Trading Agent with Sentiment Analysis
                </a>
              </h3>
              <p className="text-gray-400 mb-4">
                Published in ICIVC 2021 (Springer). Outperformed benchmark trading strategies by 10% using FinRL-based RL agent. 
                Achieved 14% accuracy gain with FinBERT sentiment pipelines for financial NLP.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">RL</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">FinBERT</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">Published</span>
              </div>
            </div>

            {/* Project 4 */}
            <div className="border border-gray-800 p-6 rounded-lg hover:border-blue-500 transition">
              <h3 className="text-2xl font-bold mb-3">AI Gaming Platform Optimizer</h3>
              <p className="text-gray-400 mb-4">
                Boosted in-game engagement by 20% and content relevance by 25% by engineering RL-based recommendation system 
                using LangChain tool calls, behavioral signals, and a Kubernetes/Spark simulation framework.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">RL</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">LangChain</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">Kubernetes</span>
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
            Looking for AI/ML internship or entry-level roles in NYC. Open to hybrid, remote, or on-site.
          </p>
          <div className="flex gap-6">
            <a href="mailto:nt2613@nyu.edu" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition">
              Email Me
            </a>
            <a href="https://www.linkedin.com/in/nirman-taterh/" target="_blank" className="px-6 py-3 border border-blue-500 hover:bg-blue-500/10 rounded-lg transition">
              LinkedIn
            </a>
            <a href="https://github.com/nirmantaterh" target="_blank" className="px-6 py-3 border border-blue-500 hover:bg-blue-500/10 rounded-lg transition">
              GitHub
            </a>
            <a href="https://www.kaggle.com/phiesh7w" target="_blank" className="px-6 py-3 border border-blue-500 hover:bg-blue-500/10 rounded-lg transition">
              Kaggle
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