import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const CHAT_IDS = ["5330198316", "-4949723456"];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, event_type, message } = await req.json();

    if (!name || !phone || !event_type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
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

    const text = `📩 New lead from website

👤 Name: ${name}
📞 Phone: ${phone}
🎯 Event type: ${event_type}
📝 Message: ${message || '—'}`;

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
