import { getSupabase } from '../../../lib/supabase';

export async function POST(req) {
  const { name, email, message } = await req.json();

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return new Response(JSON.stringify({ error: 'All fields required' }), { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
  }

  const sb = getSupabase();
  if (!sb) return new Response(JSON.stringify({ error: 'DB unavailable' }), { status: 500 });
  const { error } = await sb.from('contact_messages').insert({
    name: name.trim().slice(0, 100),
    email: email.trim().slice(0, 200),
    message: message.trim().slice(0, 2000),
  });

  if (error) return new Response(JSON.stringify({ error: 'Failed to save' }), { status: 500 });
  return new Response(JSON.stringify({ ok: true }));
}
