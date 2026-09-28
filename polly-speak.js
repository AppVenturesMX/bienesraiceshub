// api/polly-speak.js — Amazon Polly proxy para Agente Matrix
// Mismo código que Alma — firma SigV4 manual, sin SDK, sin npm

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { text, voiceId = 'Mia', languageCode = 'es-MX' } = req.body || {};
  if (!text) return res.status(400).json({ error: 'text required' });

  const AWS_REGION    = 'us-east-1';
  const ACCESS_KEY    = process.env.AWS_ACCESS_KEY_ID;
  const SECRET_KEY    = process.env.AWS_SECRET_ACCESS_KEY;
  const SERVICE       = 'polly';
  const HOST          = `polly.${AWS_REGION}.amazonaws.com`;
  const ENDPOINT      = `https://${HOST}/v1/speech`;

  const body = JSON.stringify({
    Text: text.substring(0, 3000),
    TextType: 'text',
    VoiceId: voiceId,
    LanguageCode: languageCode,
    OutputFormat: 'mp3',
    Engine: 'neural',
  });

  // ── SigV4 signing ────────────────────────────────────────────────────────
  const enc  = s => encodeURIComponent(s).replace(/%20/g, '+');
  const hex  = b => Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2,'0')).join('');
  const hash = async (msg) => {
    const data = typeof msg === 'string' ? new TextEncoder().encode(msg) : msg;
    return crypto.subtle.digest('SHA-256', data);
  };
  const hmac = async (key, msg) => {
    const k = key instanceof ArrayBuffer ? key :
      (typeof key === 'string' ? new TextEncoder().encode(key) : key);
    const ck = await crypto.subtle.importKey('raw', k, { name:'HMAC', hash:'SHA-256' }, false, ['sign']);
    const data = typeof msg === 'string' ? new TextEncoder().encode(msg) : msg;
    return crypto.subtle.sign('HMAC', ck, data);
  };

  const now   = new Date();
  const ymd   = now.toISOString().slice(0,10).replace(/-/g,'');
  const stamp = now.toISOString().replace(/[-:]/g,'').slice(0,15) + 'Z';

  const payloadHash = hex(await hash(body));
  const headers = {
    'content-type': 'application/json',
    'host': HOST,
    'x-amz-date': stamp,
    'x-amz-content-sha256': payloadHash,
  };
  const signedHeaders = Object.keys(headers).sort().join(';');
  const canonicalHeaders = Object.keys(headers).sort().map(k => `${k}:${headers[k]}\n`).join('');

  const canonicalRequest = [
    'POST', '/v1/speech', '',
    canonicalHeaders, signedHeaders, payloadHash
  ].join('\n');

  const credentialScope = `${ymd}/${AWS_REGION}/${SERVICE}/aws4_request`;
  const stringToSign = ['AWS4-HMAC-SHA256', stamp, credentialScope,
    hex(await hash(canonicalRequest))].join('\n');

  const kDate    = await hmac(`AWS4${SECRET_KEY}`, ymd);
  const kRegion  = await hmac(kDate, AWS_REGION);
  const kService = await hmac(kRegion, SERVICE);
  const kSigning = await hmac(kService, 'aws4_request');
  const signature = hex(await hmac(kSigning, stringToSign));

  const auth = `AWS4-HMAC-SHA256 Credential=${ACCESS_KEY}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  try {
    const pollyRes = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { ...headers, Authorization: auth },
      body,
    });

    if (!pollyRes.ok) {
      const err = await pollyRes.text();
      console.error('[polly-speak] Polly error:', pollyRes.status, err);
      return res.status(502).json({ error: 'polly_error' });
    }

    const audio = await pollyRes.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'no-store');
    res.send(Buffer.from(audio));
  } catch (err) {
    console.error('[polly-speak] Fetch error:', err.message);
    res.status(500).json({ error: 'proxy_error' });
  }
}
