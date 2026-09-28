// api/matrix-chat.js — Anthropic proxy para BienesRaícesHub / Aria
// Compatible con el mismo proxy de Agente Matrix

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { model, max_tokens, system, messages } = req.body;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':    'application/json',
        'x-api-key':       process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model, max_tokens, system, messages }),
    });

    const data = await r.json();
    res.status(r.status).json(data);
  } catch (err) {
    console.error('[aria-chat] Error:', err.message);
    res.status(500).json({ error: 'proxy_error', message: err.message });
  }
}
