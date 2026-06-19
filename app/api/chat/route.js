async function getGitHubRepos() {
  try {
    // next: revalidate uses Next.js built-in CDN cache — survives serverless cold starts
    const res = await fetch(
      'https://api.github.com/users/nirmantaterh/repos?sort=updated&per_page=12&type=public',
      { headers: { 'User-Agent': 'nirman-portfolio' }, next: { revalidate: 600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.map(r => ({
      name: r.name,
      desc: r.description || '',
      lang: r.language || '',
      stars: r.stargazers_count,
      updated: r.pushed_at?.slice(0, 10),
    }));
  } catch {
    return [];
  }
}

const BASE_SYSTEM = `You are Nirman Taterh's AI portfolio assistant. You have access to Google Search — use it when asked about current AI trends, recent papers, or anything requiring up-to-date information. For questions about Nirman specifically, use the facts below.

## WHO IS NIRMAN
AI-native builder. MS Data Science @ NYU (GPA 3.86/4.0). Brooklyn, NY. 3+ years shipping production ML systems across NLP, RAG, recommendation, and RL.

## EXPERIENCE
- Data Science Intern LLM/NLP @ Johnson & Johnson (Mar–Aug 2025): +18% biomedical model accuracy, -30% preprocessing time, +25% team velocity via AI coding workflows.
- Conversational AI Developer @ Miko (Nov 2024–Jan 2025): -20% LLM hallucinations across 5K+ robot interactions, +25% system throughput. Mentored 3 devs.
- NLP Intern @ Miko (Jun–Sep 2022): +25% multilingual classification accuracy, +35% response quality.
- Music Recommendation Engineer @ Paramount/Last.fm (Sep 2020–Feb 2021): +50% engagement for 1.9M users, -30% inference latency with distributed training across 4 GPUs.

## SKILLS
LLM Systems: PyTorch, HuggingFace, DeBERTa-v3, LoRA/PEFT, BGE-M3, ColBERT
RAG & Agents: LangGraph, Qdrant, RAGatouille, FastAPI
Reinforcement Learning: FinRL-X, SAC, TD3, Stable Baselines 3
Infrastructure: Docker, AWS, Spark, MLflow, Kubernetes
Languages: Python, Go, TypeScript, React, SQL

## PROJECTS
1. Prosodic Encoding in LLMs — NLP research, pending publication ACL-tier.
2. Large-Scale Review Trust Modeling — 97.7% recall on 26.7M reviews. DeBERTa MAE 1.47→0.46.
3. FinRL Crypto Trading Agent — Published Springer ICIVC 2021. +10% vs benchmark.
4. AI Gaming Platform Optimizer — +20% engagement. RL with LangGraph + Kubernetes.

## CONTACT
nt2613@nyu.edu | linkedin.com/in/nirman-taterh | github.com/nirmantaterh
Currently interviewing. Response within 24h.

---

## RESPONSE MODES

**Standard Q&A** — 2–4 sentences. Speak in first person as Nirman ("I built...", "my approach was...", "I chose X because..."). Explain WHY decisions were made, tradeoffs, failure modes. Never just list facts.

**Technical deep dive** — Up to 8 sentences. Reference real constraints and learnings.

**PITCH_REQUEST mode** — Starts with "PITCH_REQUEST:". Write exactly 3 paragraphs in FIRST PERSON as Nirman speaking directly to the reader. Use "I", "my", "I've built" — not "Nirman" or "he". Structure: skills match → production impact → velocity signal.

**Current AI topics** — Use Google Search to give up-to-date answers about AI trends, papers, tools, and industry news. Connect to Nirman's work where relevant.

**Off-topic** — Redirect to professional topics. Never invent facts about Nirman not listed here.`;

export async function POST(req) {
  const body = await req.json();
  // Sanitize: cap history, enforce roles, strip control chars, limit message length
  const messages = (body.messages ?? [])
    .slice(-20)
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({
      role: m.role,
      content: String(m.content ?? '').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '').slice(0, 2000),
    }));

  const repos = await getGitHubRepos();
  const repoSection = repos.length > 0
    ? `\n\n## GITHUB REPOS (live)\n${repos.map(r =>
        `- ${r.name}${r.desc ? ': ' + r.desc : ''} [${r.lang}] ★${r.stars} · ${r.updated}`
      ).join('\n')}`
    : '';

  const SYSTEM = BASE_SYSTEM + repoSection;

  // Convert messages from OpenAI format to Gemini format
  const geminiMessages = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        if (!process.env.GEMINI_API_KEY) {
          controller.enqueue(encoder.encode('Chat unavailable: API key not configured.'));
          controller.close();
          return;
        }

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${process.env.GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: geminiMessages,
              systemInstruction: { parts: [{ text: SYSTEM }] },
              tools: [{ googleSearch: {} }],
              generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.7,
              },
            }),
          }
        );

        if (!res.ok) {
          // 429 quota hit — fall back to Groq silently
          if (res.status === 429 && process.env.GROQ_API_KEY) {
            const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
              method: 'POST',
              headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [{ role: 'system', content: SYSTEM }, ...messages],
                max_tokens: 500, stream: true, temperature: 0.7,
              }),
            });
            if (groqRes.ok) {
              const reader = groqRes.body.getReader();
              const decoder = new TextDecoder();
              let buf = '';
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buf += decoder.decode(value, { stream: true });
                const lines = buf.split('\n'); buf = lines.pop() ?? '';
                for (const line of lines) {
                  if (!line.startsWith('data: ')) continue;
                  const d = line.slice(6); if (d === '[DONE]') continue;
                  try { const t = JSON.parse(d).choices?.[0]?.delta?.content; if (t) controller.enqueue(encoder.encode(t)); } catch {}
                }
              }
              controller.close(); return;
            }
          }
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
            const data = line.slice(6).trim();
            if (!data || data === '[DONE]') continue;
            try {
              const json = JSON.parse(data);
              const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
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
