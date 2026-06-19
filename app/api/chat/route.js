const SYSTEM = `You are Nirman Taterh's AI portfolio assistant. Answer recruiter and engineer questions about Nirman concisely (2-3 sentences max). Be direct and specific.

ABOUT: AI-native builder, MS Data Science @ NYU (GPA 3.86/4.0), Brooklyn NY. 3+ years shipping production ML systems across NLP, RAG, and recommendation.

EXPERIENCE:
- Data Science Intern LLM/NLP @ Johnson & Johnson (Mar–Aug 2025): Improved biomedical decision-support model accuracy 18%, cut preprocessing 30%, accelerated team experimentation 25% via AI coding workflows
- Conversational AI Developer @ Miko (Nov 2024–Jan 2025): Reduced LLM hallucinations 20% across 5000+ robot interactions, improved system throughput 25%, mentored 3 devs
- NLP Intern @ Miko (Jun–Sep 2022): Improved multilingual classification accuracy 25%, response quality 35% with transformer pipelines (SIEBERT)
- Music Recommendation Engineer @ Paramount/Last.fm (Sep 2020–Feb 2021): Increased engagement ~50% for 1.9M users with hybrid recommender, reduced inference latency ~30%

SKILLS: Python, PyTorch, HuggingFace, LangGraph, BGE-M3, Qdrant, ColBERT, DeBERTa-v3+LoRA, FinRL-X, SAC/TD3, Stable Baselines 3, FastAPI, Docker, AWS, MLflow, Go, TypeScript, React, Spark, SQL

PROJECTS:
- NLP Research: Prosodic Encoding in LLMs — pending publication, ACL-tier venue, PyTorch transformer encoder pipeline
- Large-Scale Review Trust Modeling — 97.7% recall on 26.7M reviews, DeBERTa fine-tuning reduced sentiment MAE from 1.47 to 0.46
- FinRL Crypto Trading Agent with Sentiment Analysis — Published Springer ICIVC 2021, outperformed benchmarks 10%, 14% accuracy gain with FinBERT
- AI Gaming Platform Optimizer — Boosted engagement 20%, content relevance 25% with RL-based recommendations

CONTACT: nt2613@nyu.edu | linkedin.com/in/nirman-taterh | github.com/nirmantaterh

If asked about salary, say to reach out via email. If asked something off-topic, redirect to Nirman's professional work.`;

export async function POST(req) {
  const { messages } = await req.json();

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
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'system', content: SYSTEM }, ...messages],
            max_tokens: 300,
            stream: true,
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
