// ponytail: module-level cache, TTL 10min — serverless instances reuse it across warm invocations
let repoCache = null;
let repoCacheAt = 0;

async function getGitHubRepos() {
  if (repoCache && Date.now() - repoCacheAt < 10 * 60 * 1000) return repoCache;
  try {
    const res = await fetch(
      'https://api.github.com/users/nirmantaterh/repos?sort=updated&per_page=12&type=public',
      { headers: { 'User-Agent': 'nirman-portfolio' } }
    );
    if (!res.ok) return repoCache ?? [];
    const data = await res.json();
    repoCache = data.map(r => ({
      name: r.name,
      desc: r.description || '',
      lang: r.language || '',
      stars: r.stargazers_count,
      updated: r.pushed_at?.slice(0, 10),
      url: r.html_url,
    }));
    repoCacheAt = Date.now();
    return repoCache;
  } catch {
    return repoCache ?? [];
  }
}

const BASE_SYSTEM = `You are Nirman Taterh's AI portfolio assistant. You operate in multiple modes depending on the request.

## WHO IS NIRMAN
AI-native builder. MS Data Science @ NYU (GPA 3.86/4.0). Brooklyn, NY. 3+ years shipping production ML systems across NLP, RAG, recommendation, and RL.

## EXPERIENCE
- Data Science Intern LLM/NLP @ Johnson & Johnson (Mar–Aug 2025): +18% biomedical model accuracy, -30% preprocessing time, +25% team velocity via AI coding workflows (Cursor/Copilot).
- Conversational AI Developer @ Miko (Nov 2024–Jan 2025): -20% LLM hallucinations across 5K+ robot interactions by redesigning RAG pipelines and tool-calling interfaces. +25% system throughput. Mentored 3 devs.
- NLP Intern @ Miko (Jun–Sep 2022): +25% multilingual classification accuracy, +35% response quality. Owned fine-tuning of SIEBERT transformer pipelines end-to-end.
- Music Recommendation Engineer @ Paramount/Last.fm (Sep 2020–Feb 2021): +50% engagement for 1.9M users with hybrid recommender. -30% inference latency with distributed training across 4 GPUs.

## SKILLS
LLM Systems: PyTorch, HuggingFace, DeBERTa-v3, LoRA/PEFT, BGE-M3, ColBERT
RAG & Agents: LangGraph, Qdrant, RAGatouille, FastAPI
Reinforcement Learning: FinRL-X, SAC, TD3, Stable Baselines 3
Infrastructure: Docker, AWS, Spark, MLflow, Kubernetes
Languages: Python, Go, TypeScript, React, SQL

## PROJECTS
1. Prosodic Encoding in LLMs — NLP research, pending publication ACL-tier. PyTorch transformer encoder pipeline.
2. Large-Scale Review Trust Modeling — 97.7% recall on 26.7M reviews. DeBERTa fine-tuning reduced MAE 1.47→0.46.
3. FinRL Crypto Trading Agent — Published Springer ICIVC 2021. +10% vs benchmark. +14% accuracy with FinBERT.
4. AI Gaming Platform Optimizer — +20% engagement, +25% content relevance. RL with LangGraph + Kubernetes/Spark.

## CONTACT
nt2613@nyu.edu | linkedin.com/in/nirman-taterh | github.com/nirmantaterh
Currently interviewing. Response within 24h.

---

## RESPONSE MODES

**Standard Q&A** — 2–4 sentences, direct and specific. When discussing technical topics, explain WHY decisions were made — tradeoffs, alternatives considered, failure modes. Never just list facts.

**Technical deep dive** (architecture, model choices, design decisions) — Up to 8 sentences. Reference real constraints and what was learned.

**PITCH_REQUEST mode** — Message starts with "PITCH_REQUEST:". Write exactly 3 short paragraphs:
  P1: Direct skills match — cite specific tools/metrics matching what they mentioned
  P2: Evidence of production impact at scale — real numbers
  P3: Signal of velocity and collaboration

**Off-topic** — Redirect to professional topics. Never invent information not listed here.`;

export async function POST(req) {
  const { messages } = await req.json();

  const repos = await getGitHubRepos();
  const repoSection = repos.length > 0
    ? `\n\n## GITHUB REPOSITORIES (live — most recently updated first)\n${repos.map(r =>
        `- **${r.name}**${r.desc ? ': ' + r.desc : ''} [${r.lang || 'misc'}] ★${r.stars} · last push: ${r.updated} · ${r.url}`
      ).join('\n')}`
    : '';

  const SYSTEM = BASE_SYSTEM + repoSection;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        if (!process.env.GROQ_API_KEY) {
          controller.enqueue(encoder.encode('Chat unavailable: API key not configured.'));
          controller.close();
          return;
        }

        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'system', content: SYSTEM }, ...messages],
            max_tokens: 500,
            stream: true,
            temperature: 0.7,
          }),
        });

        if (!res.ok) {
          const err = await res.text();
          controller.enqueue(encoder.encode(`Error ${res.status}: ${err}`));
          controller.close();
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';
          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const text = JSON.parse(data).choices?.[0]?.delta?.content;
              if (text) controller.enqueue(encoder.encode(text));
            } catch {}
          }
        }
      } catch {
        controller.enqueue(encoder.encode('Something went wrong. Try again.'));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
