import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const CHAT_IDS = ["5330198316", "-4949723456"];

// Basic in-memory rate limiter (per edge function instance)
// 5 requests per IP per 10 minutes
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const ipHits = new Map<string, number[]>();

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const hits = (ipHits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  ipHits.set(ip, hits);
  // Opportunistic cleanup
  if (ipHits.size > 5000) {
    for (const [k, v] of ipHits) {
      if (v.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) ipHits.delete(k);
    }
  }
  return hits.length > RATE_LIMIT_MAX;
};

const escapeHtml = (s: string): string =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const sanitizeField = (s: unknown, maxLen: number): string => {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, maxLen);
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Identify caller IP for rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();

    const name = sanitizeField(body?.name, 100);
    const phone = sanitizeField(body?.phone, 32);
    const event_type = sanitizeField(body?.event_type, 100);
    const message = sanitizeField(body?.message, 1000);

    if (!name || !phone || !event_type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Basic phone format check (digits, +, spaces, dashes, parentheses)
    if (!/^[+\d\s\-()]{6,32}$/.test(phone)) {
      return new Response(
        JSON.stringify({ error: 'Invalid phone format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Save lead to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase.from('leads').insert({
      name,
      phone,
      event_type,
      message: message || '',
    });

    if (dbError) {
      console.error('DB insert error:', dbError);
    }

    const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
    if (!TELEGRAM_BOT_TOKEN) {
      throw new Error('Telegram configuration missing');
    }

    const envChatIds = Deno.env.get('TELEGRAM_CHAT_ID');
    const allChatIds = [...CHAT_IDS];
    if (envChatIds) {
      envChatIds.split(',').forEach(id => {
        const trimmed = id.trim();
        if (trimmed && !allChatIds.includes(trimmed)) {
          allChatIds.push(trimmed);
        }
      });
    }

    // Escape user input before embedding into HTML-formatted Telegram message
    const text = `📩 New lead from website

👤 Name: ${escapeHtml(name)}
📞 Phone: ${escapeHtml(phone)}
🎯 Event type: ${escapeHtml(event_type)}
📝 Message: ${escapeHtml(message) || '—'}`;

    const results = await Promise.allSettled(
      allChatIds.map(chatId =>
        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: 'HTML',
          }),
        }).then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            console.error(`Failed to send to chat ${chatId}:`, data);
            throw new Error(`Failed for chat ${chatId}`);
          }
          return data;
        })
      )
    );

    const allFailed = results.every(r => r.status === 'rejected');
    if (allFailed) {
      throw new Error('Failed to send to all Telegram chats');
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send message' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
