import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import TerminalButton from './components/TerminalButton';
import ScrollReveal from './components/ScrollReveal';

const SKILLS = [
  { category: 'Language Models', tags: ['PyTorch', 'HuggingFace', 'DeBERTa-v3', 'BGE-M3', 'ColBERT', 'LoRA/PEFT'], highlight: true },
  { category: 'RAG & Agents', tags: ['LangGraph', 'Qdrant', 'RAGatouille', 'FastAPI'] },
  { category: 'Reinforcement Learning', tags: ['FinRL-X', 'SAC', 'TD3', 'Stable Baselines 3', 'FinBERT'] },
  { category: 'Infrastructure', tags: ['Docker', 'AWS', 'MLflow', 'Spark', 'Kubernetes'] },
  { category: 'Languages', tags: ['Python', 'Go', 'TypeScript', 'React', 'SQL'] },
];

function SectionHeading({ children }) {
  return (
    <div className="mb-12">
      <h2 className="text-4xl font-bold text-white">{children}</h2>
      <span className="block w-10 h-0.5 bg-blue-500 mt-3 rounded-full" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="hero-bg text-white pt-36 pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
            Open to AI/ML roles
          </span>
          <h1 className="text-6xl font-bold mb-4 tracking-tight">Nirman Taterh</h1>
          <p className="text-2xl text-zinc-400 mb-1">MS Data Science @ NYU</p>
          <p className="text-lg text-zinc-500 mb-6">Brooklyn, NY</p>
          <p className="text-lg text-zinc-300 max-w-2xl leading-relaxed">
            AI-native builder with 3+ years shipping production ML systems across NLP, RAG, and recommendation.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="/resume.pdf" download className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition font-semibold">
              ↓ Resume
            </a>
            <TerminalButton />
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* About */}
      <section id="about" className="text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeading>About</SectionHeading>
            <p className="text-lg text-zinc-300 leading-relaxed max-w-3xl">
              AI-native builder with 3+ years shipping production ML systems across NLP, RAG, and recommendation.
              I consistently move from research to prototype to production using modern AI development tools
              (Cursor, Copilot, LLM APIs).
              <br /><br />
              Currently pursuing MS in Data Science at NYU (GPA: 3.86/4.0) while researching implicit prosodic
              encoding in language models (pending publication). I actively track and experiment with emerging AI
              tools and workflows, regularly prototyping new approaches based on latest research.
              <br /><br />
              Seeking a high-ownership AI/ML role where speed and real-world impact matter.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Skills */}
      <section id="skills" className="text-white py-20 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeading>Skills</SectionHeading>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILLS.map((group, i) => (
              <ScrollReveal key={group.category} delay={i * 80}>
                <div className={`rounded-xl p-5 h-full transition border ${
                  group.highlight
                    ? 'border-blue-500/40 bg-blue-500/5 hover:border-blue-500/70'
                    : 'border-zinc-800 hover:border-zinc-600'
                }`}>
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-zinc-800 text-zinc-300 rounded text-xs font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Experience */}
      <section id="experience" className="text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeading>Experience</SectionHeading>
          </ScrollReveal>

          <div className="space-y-10">
            {[
              {
                role: 'Data Science Intern — LLM/NLP',
                company: 'Johnson & Johnson',
                date: 'Mar – Aug 2025',
                location: 'New York, NY (Remote)',
                bullets: [
                  'Improved biomedical decision-support model accuracy by 18% by identifying evaluation gaps and iterating transformer-based NLP pipelines end-to-end using Python, HuggingFace, and rapid hypothesis testing',
                  'Cut preprocessing time by 30% by proactively redesigning the ETL stack before bottlenecks were flagged, improving downstream model reliability across 3 Innovative Medicine R&D initiatives',
                  'Accelerated team experimentation cycles by 25% by introducing AI-assisted coding workflows (Cursor/Copilot) and building shared evaluation tooling adopted org-wide',
                ],
              },
              {
                role: 'Conversational AI Developer',
                company: 'Miko',
                date: 'Nov 2024 – Jan 2025',
                location: 'California, USA (Remote)',
                bullets: [
                  'Reduced LLM hallucinations by 20% across 5,000+ robot interactions by independently redesigning RAG pipelines and tool-calling interfaces; shipped to fix a real failure mode, not a scoped task',
                  'Improved system throughput by 25% and cut error rate by 15% by building modular Python evaluation pipelines and automating model optimization loops from scratch',
                  'Increased team delivery speed by 10% by mentoring 3 developers and introducing AI-assisted debugging practices that cut review cycles without adding process overhead',
                ],
              },
              {
                role: 'NLP Intern',
                company: 'Miko',
                date: 'Jun – Sep 2022',
                location: 'Mumbai, India',
                bullets: [
                  'Improved multilingual classification accuracy by 25% and response quality by 35% by rapidly prototyping transformer pipelines (SIEBERT), owning fine-tuning and domain adaptation end-to-end',
                ],
              },
              {
                role: 'Music Recommendation Systems Engineer',
                company: 'Paramount Global (Last.fm)',
                date: 'Sep 2020 – Feb 2021',
                location: 'London, UK (Remote)',
                bullets: [
                  'Increased user engagement by ~50% for 1.9M users by building a hybrid recommender (collaborative filtering + NLP metadata features) for 93K artists, independently identifying the content-signal gap',
                  'Reduced inference latency by ~30% by deploying distributed training across 4 GPUs and redesigning the data pipeline with no dedicated infra support',
                ],
              },
            ].map((job, i) => (
              <ScrollReveal key={job.role} delay={i * 80}>
                <div className="border-l-2 border-blue-500/60 pl-6">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <h3 className="text-xl font-bold text-white">{job.role}</h3>
                    <span className="text-xs font-mono text-zinc-500 border border-zinc-700 px-2 py-0.5 rounded shrink-0">
                      {job.date}
                    </span>
                  </div>
                  <p className="text-blue-400 font-semibold text-sm mb-0.5">{job.company}</p>
                  <p className="text-zinc-500 text-sm mb-4">{job.location}</p>
                  <ul className="space-y-2">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="text-zinc-300 text-sm leading-relaxed">• {b}</li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Projects */}
      <section id="projects" className="text-white py-20 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeading>Featured Projects</SectionHeading>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                type: 'NLP Research',
                title: 'Prosodic Encoding in LLMs',
                desc: 'Investigating whether language models implicitly encode prosodic structure without explicit supervision. Built transformer encoder pipeline in PyTorch, targeting ACL-tier venue. Pending publication.',
                tags: ['Research', 'PyTorch', 'NLP'],
                link: null,
              },
              {
                type: 'Systems',
                title: 'Large-Scale Review Trust Modeling',
                desc: 'Achieved 97.7% recall on 26.7M reviews by building fraud classification pipeline in Python and Spark. Reduced sentiment calibration MAE from 1.47 to 0.46 by fine-tuning DeBERTa.',
                tags: ['Python', 'Spark', 'DeBERTa'],
                link: null,
              },
              {
                type: 'Published Paper',
                title: 'FinRL Crypto Trading Agent with Sentiment Analysis',
                desc: 'Published in ICIVC 2021 (Springer). Outperformed benchmark trading strategies by 10% using FinRL-based RL agent. Achieved 14% accuracy gain with FinBERT sentiment pipelines for financial NLP.',
                tags: ['RL', 'FinBERT', 'Published'],
                link: 'https://link.springer.com/chapter/10.1007/978-3-031-31164-2_36',
              },
              {
                type: 'Reinforcement Learning',
                title: 'AI Gaming Platform Optimizer',
                desc: 'Boosted in-game engagement by 20% and content relevance by 25% by engineering RL-based recommendation system using LangChain tool calls, behavioral signals, and a Kubernetes/Spark simulation framework.',
                tags: ['RL', 'LangChain', 'Kubernetes'],
                link: null,
              },
            ].map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 80}>
                <div className="border border-zinc-800 hover:border-zinc-600 p-6 rounded-xl transition h-full flex flex-col">
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">{p.type}</p>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                        {p.title} ↗
                      </a>
                    ) : p.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed flex-1 mb-4">{p.desc}</p>
                  <div className="flex gap-2 flex-wrap">
                    {p.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-zinc-800 text-zinc-400 rounded text-xs font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Contact */}
      <section id="contact" className="text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeading>Get In Touch</SectionHeading>
            <p className="text-lg text-zinc-300 mb-3">
              Looking for AI/ML internship or entry-level roles in NYC. Open to hybrid, remote, or on-site.
            </p>
            <p className="text-sm text-zinc-500 mb-8">Actively interviewing — response within 24h</p>
            <div className="flex flex-wrap gap-3 items-center">
              <a href="mailto:nt2613@nyu.edu" className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-lg transition font-semibold text-lg">
                Email Me
              </a>
              <a href="https://www.linkedin.com/in/nirman-taterh/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-zinc-700 hover:border-zinc-400 rounded-lg transition text-sm text-zinc-300 hover:text-white">
                LinkedIn
              </a>
              <a href="https://github.com/nirmantaterh" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-zinc-700 hover:border-zinc-400 rounded-lg transition text-sm text-zinc-300 hover:text-white">
                GitHub
              </a>
              <a href="https://www.kaggle.com/phiesh7w" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-zinc-700 hover:border-zinc-400 rounded-lg transition text-sm text-zinc-300 hover:text-white">
                Kaggle
              </a>
              <a href="/resume.pdf" download className="px-4 py-2 border border-zinc-700 hover:border-zinc-400 rounded-lg transition text-sm text-zinc-300 hover:text-white">
                ↓ Resume
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="border-t border-zinc-800 py-6">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <p className="text-zinc-500 text-sm">© 2026 Nirman Taterh</p>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/nirman-taterh/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-300 text-sm transition">LinkedIn</a>
            <a href="https://github.com/nirmantaterh" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-300 text-sm transition">GitHub</a>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </>
  );
}
