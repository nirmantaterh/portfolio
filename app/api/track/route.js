import { getSupabase } from '../../../lib/supabase';

export async function POST(req) {
  const { section, referrer } = await req.json();
  const sb = getSupabase();
  if (sb) await sb.from('page_views').insert({ section: section || 'home', referrer: referrer || '' });
  return new Response('ok');
}
