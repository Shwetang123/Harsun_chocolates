import { createServer } from 'node:http';
import { readFile, appendFile, mkdir, stat } from 'node:fs/promises';
import { dirname, extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sendFeedbackEmail } from './feedback-email.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const dataFile = resolve(process.env.FEEDBACK_FILE || join(root, 'data', 'feedback.jsonl'));
const notificationFile = resolve(process.env.FEEDBACK_NOTIFICATION_FILE || join(dirname(dataFile), 'feedback-notified.jsonl'));
const dist = join(root, 'dist');
const dev = process.argv.includes('--dev');
const port = Number(process.env.PORT || (dev ? 5174 : 3000));
const host = process.env.HOST || (dev ? '127.0.0.1' : '0.0.0.0');
const emailConfig = { apiKey: process.env.RESEND_API_KEY?.trim(), from: process.env.FEEDBACK_FROM_EMAIL?.trim(), to: process.env.FEEDBACK_ADMIN_EMAIL?.trim() };
const emailConfigured = Object.values(emailConfig).every(Boolean);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const publicDir = join(root, 'public');
if ([dataFile, notificationFile].some(file => [dist, publicDir].some(directory => file === directory || file.startsWith(directory + sep)))) {
  throw new Error('Feedback storage files must be outside public and dist.');
}
if (!dev && (!emailConfigured || !emailPattern.test(emailConfig.from) || !emailPattern.test(emailConfig.to))) {
  throw new Error('Set RESEND_API_KEY, FEEDBACK_FROM_EMAIL, and FEEDBACK_ADMIN_EMAIL before starting the production server.');
}
const recentByIp = new Map();
let writeQueue = Promise.resolve();
let notificationQueue = Promise.resolve();

function json(res, status, value) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  res.end(JSON.stringify(value));
}

async function entries() {
  try { return (await readFile(dataFile, 'utf8')).split('\n').filter(Boolean).map(line => JSON.parse(line)); }
  catch (error) { if (error.code === 'ENOENT') return []; throw error; }
}

async function notifiedIds() {
  try { return new Set((await readFile(notificationFile, 'utf8')).split('\n').filter(Boolean).map(line => JSON.parse(line).id)); }
  catch (error) { if (error.code === 'ENOENT') return new Set(); throw error; }
}

function deliverPendingNotifications() {
  if (!emailConfigured) return Promise.resolve();
  notificationQueue = notificationQueue.catch(() => {}).then(async () => {
    const sent = await notifiedIds();
    for (const record of await entries()) {
      if (sent.has(record.id)) continue;
      try {
        const providerId = await sendFeedbackEmail(record, emailConfig);
        await mkdir(dirname(notificationFile), { recursive: true });
        await appendFile(notificationFile, JSON.stringify({ id: record.id, sentAt: new Date().toISOString(), providerId }) + '\n', 'utf8');
        sent.add(record.id);
      } catch (error) {
        console.error(`Feedback email pending for ${record.id}: ${error.message}`);
      }
    }
  }).catch(error => { console.error(`Feedback notification queue could not be read: ${error.message}`); });
  return notificationQueue;
}

async function readBody(req) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 12000) throw new Error('too_large');
  }
  return JSON.parse(body);
}

const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon' };

async function serveStatic(req, res, pathname) {
  if (dev) return json(res, 404, { error: 'Not found' });
  let decoded;
  try { decoded = decodeURIComponent(pathname); } catch { return json(res, 400, { error: 'Invalid path' }); }
  const candidate = resolve(dist, '.' + decoded);
  if (candidate !== dist && !candidate.startsWith(dist + sep)) return json(res, 403, { error: 'Forbidden' });
  let file = candidate;
  try { if (!(await stat(file)).isFile()) file = join(dist, 'index.html'); }
  catch { file = join(dist, 'index.html'); }
  try {
    const content = await readFile(file);
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
    res.end(content);
  } catch { json(res, 404, { error: 'Build the site first with npm run build.' }); }
}

createServer(async (req, res) => {
  const pathname = new URL(req.url || '/', 'http://localhost').pathname;
  try {
    if (pathname === '/api/health' && req.method === 'GET') return json(res, 200, { ok: true });
    if (pathname === '/api/feedback/summary' && req.method === 'GET') {
      const feedback = await entries();
      return json(res, 200, { responses: feedback.length, interested: feedback.filter(item => item.interest === 'yes').length });
    }
    if (pathname === '/api/feedback' && req.method === 'POST') {
      if (!req.headers['content-type']?.startsWith('application/json')) return json(res, 415, { error: 'Send JSON data.' });
      let input;
      try { input = await readBody(req); } catch { return json(res, 400, { error: 'Invalid feedback.' }); }
      if (!input || typeof input !== 'object' || Array.isArray(input)) return json(res, 400, { error: 'Invalid feedback.' });
      if (input.website) return json(res, 200, { ok: true });
      const interest = input.interest;
      const product = input.product;
      const name = typeof input.name === 'string' ? input.name.trim() : '';
      const rating = input.rating;
      const opinion = typeof input.opinion === 'string' ? input.opinion.trim() : '';
      const email = typeof input.email === 'string' ? input.email.trim() : '';
      if (name.length < 2 || name.length > 80 || /[\r\n\x00-\x1f]/.test(name) || !Number.isInteger(rating) || rating < 1 || rating > 5 || !['yes', 'maybe', 'no'].includes(interest) || !['bars', 'handmade', 'gifts', 'unsure'].includes(product) || opinion.length < 10 || opinion.length > 2000 || email.length > 254 || (email && (!input.contactConsent || !emailPattern.test(email)))) return json(res, 400, { error: 'Please complete the feedback form.' });
      const forwarded = process.env.TRUST_PROXY === 'true' ? req.headers['x-forwarded-for']?.split(',')[0]?.trim() : null;
      const ip = forwarded || req.socket.remoteAddress || 'unknown';
      const now = Date.now();
      const recent = (recentByIp.get(ip) || []).filter(time => now - time < 3600000);
      if (recent.length >= 5) return json(res, 429, { error: 'Please try again later.' });
      recent.push(now); recentByIp.set(ip, recent);
      const record = { id: crypto.randomUUID(), createdAt: new Date(now).toISOString(), name, rating, interest, product, opinion, email: email || null, contactConsent: Boolean(email && input.contactConsent) };
      writeQueue = writeQueue.catch(() => {}).then(async () => { await mkdir(dirname(dataFile), { recursive: true }); await appendFile(dataFile, JSON.stringify(record) + '\n', 'utf8'); });
      await writeQueue;
      void deliverPendingNotifications();
      return json(res, 201, { ok: true });
    }
    if (pathname.startsWith('/api/')) return json(res, 404, { error: 'Not found' });
    if (req.method !== 'GET' && req.method !== 'HEAD') return json(res, 405, { error: 'Method not allowed' });
    return await serveStatic(req, res, pathname);
  } catch (error) { console.error(error); return json(res, 500, { error: 'The server could not save feedback. Please try again.' }); }
}).listen(port, host, () => {
  console.log(`HarSun server ready at http://${host}:${port}`);
  if (!emailConfigured) console.warn('Feedback email notifications are disabled in development until Resend environment variables are set.');
  else void deliverPendingNotifications();
});

setInterval(() => { void deliverPendingNotifications(); }, 60000).unref();
