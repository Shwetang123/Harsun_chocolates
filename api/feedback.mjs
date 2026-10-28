import { randomUUID } from 'node:crypto';
import { sendFeedbackEmail } from '../feedback-email.mjs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const recentByIp = new Map();

function json(status, body) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function handleFeedback(request, sendEmail = sendFeedbackEmail) {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed.' });
  if (!request.headers.get('content-type')?.startsWith('application/json')) return json(415, { error: 'Send JSON data.' });
  if (Number(request.headers.get('content-length')) > 12000) return json(413, { error: 'Feedback is too long.' });

  let raw;
  try { raw = await request.text(); } catch { return json(400, { error: 'Invalid feedback.' }); }
  if (raw.length > 12000) return json(413, { error: 'Feedback is too long.' });
  let input;
  try { input = JSON.parse(raw); } catch { return json(400, { error: 'Invalid feedback.' }); }
  if (!input || typeof input !== 'object' || Array.isArray(input)) return json(400, { error: 'Invalid feedback.' });
  if (input.website) return json(200, { ok: true });

  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const opinion = typeof input.opinion === 'string' ? input.opinion.trim() : '';
  const email = typeof input.email === 'string' ? input.email.trim() : '';
  const { rating, interest, product } = input;
  if (name.length < 2 || name.length > 80 || /[\r\n\x00-\x1f]/.test(name) ||
      !Number.isInteger(rating) || rating < 1 || rating > 5 ||
      !['yes', 'maybe', 'no'].includes(interest) ||
      !['bars', 'handmade', 'gifts', 'unsure'].includes(product) ||
      opinion.length < 10 || opinion.length > 2000 || email.length > 254 ||
      (email && (!input.contactConsent || !emailPattern.test(email)))) {
    return json(400, { error: 'Please complete the feedback form.' });
  }

  const config = {
    apiKey: process.env.RESEND_API_KEY?.trim(),
    from: process.env.FEEDBACK_FROM_EMAIL?.trim(),
    to: process.env.FEEDBACK_ADMIN_EMAIL?.trim(),
  };
  if (!config.apiKey || !emailPattern.test(config.from || '') || !emailPattern.test(config.to || '')) {
    console.error('Feedback email configuration is missing or invalid.');
    return json(503, { error: 'Feedback is temporarily unavailable. Please try again later.' });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const recent = (recentByIp.get(ip) || []).filter(time => now - time < 3600000);
  if (recent.length >= 5) return json(429, { error: 'Please try again later.' });
  recent.push(now);
  recentByIp.set(ip, recent);
  if (recentByIp.size > 10000) recentByIp.clear();

  const record = {
    id: randomUUID(), createdAt: new Date(now).toISOString(), name, rating,
    interest, product, opinion, email: email || null,
    contactConsent: Boolean(email && input.contactConsent),
  };
  try {
    await sendEmail(record, config);
    return json(201, { ok: true });
  } catch (error) {
    console.error('Feedback notification failed:', error);
    return json(502, { error: 'Feedback could not be sent. Please try again.' });
  }
}

export default { fetch: request => handleFeedback(request) };
