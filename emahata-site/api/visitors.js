const { neon } = require('@neondatabase/serverless');
const { createHash, createHmac, randomUUID, timingSafeEqual } = require('node:crypto');
const COOKIE = 'mhatati_visitor';
const digest = value => createHash('sha256').update(value).digest();
function authorized(req) {
  const expected = String(process.env.ADMIN_PASSWORD || '').trim();
  const supplied = String(req.headers.authorization || '').replace(/^Bearer /, '');
  return !!expected && timingSafeEqual(digest(expected), digest(supplied));
}
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!['GET', 'POST'].includes(req.method)) return res.status(405).json({ error: 'Method not allowed' });
  if (req.method === 'GET' && !authorized(req)) return res.status(401).json({ error: 'Admin login required' });
  if (!process.env.DATABASE_URL || !String(process.env.ADMIN_PASSWORD || '').trim()) return res.status(503).json({ error: 'Visitor storage unavailable' });
  if (req.method === 'POST') {
    if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') return res.status(204).end();
    if (authorized(req) || /bot|crawler|spider|headless|lighthouse|monitor|slurp|facebookexternalhit/i.test(req.headers['user-agent'] || '')) return res.status(204).end();
    const origin = req.headers.origin;
    if (!origin || !req.headers.host || origin !== `https://${req.headers.host}`) return res.status(403).json({ error: 'Same-origin request required' });
    if (req.headers['sec-fetch-site'] && req.headers['sec-fetch-site'] !== 'same-origin') return res.status(403).json({ error: 'Same-origin request required' });
  }
  try {
    const sql = neon(process.env.DATABASE_URL);
    if (req.method === 'GET') {
      const rows = await sql`SELECT COUNT(*)::text AS total, COUNT(*) FILTER (WHERE (last_seen AT TIME ZONE 'Africa/Algiers')::date = (NOW() AT TIME ZONE 'Africa/Algiers')::date)::text AS today FROM mhatati_visitors`;
      return res.status(200).json({ total: rows[0].total, today: rows[0].today });
    }
    const secret = String(process.env.ADMIN_PASSWORD).trim();
    const sign = id => createHmac('sha256', secret).update('visitor:' + id).digest('hex');
    const raw = String(req.headers.cookie || '').split(';').map(x => x.trim()).find(x => x.startsWith(COOKIE + '='));
    const token = raw ? raw.slice(COOKIE.length + 1) : '';
    let [id, signature] = token.split('.');
    if (!/^[a-f0-9-]{36}$/.test(id || '') || !/^[a-f0-9]{64}$/.test(signature || '') || !timingSafeEqual(digest(signature), digest(sign(id)))) id = randomUUID();
    const hash = createHash('sha256').update(id).digest('hex');
    await sql`INSERT INTO mhatati_visitors (visitor_hash) VALUES (${hash}) ON CONFLICT (visitor_hash) DO UPDATE SET last_seen = NOW()`;
    res.setHeader('Set-Cookie', `${COOKIE}=${id}.${sign(id)}; Path=/; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax`);
    return res.status(204).end();
  } catch {
    return res.status(503).json({ error: 'Unable to access visitor database. Please retry.' });
  }
};
