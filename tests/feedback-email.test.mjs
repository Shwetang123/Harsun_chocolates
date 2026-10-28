import test from 'node:test';
import assert from 'node:assert/strict';
import { buildFeedbackEmail, sendFeedbackEmail } from '../feedback-email.mjs';

const record = {
  id: 'a24b5b34-1e67-4d44-987f-f4b4c78f2518',
  createdAt: '2026-10-28T12:30:00.000Z',
  name: 'Asha Patel',
  rating: 5,
  interest: 'yes',
  product: 'gifts',
  opinion: 'I would love a warm Diwali gift assortment.',
  email: 'asha@example.com',
  contactConsent: true,
};
const config = { apiKey: 'test-only-key', from: 'feedback@example.com', to: 'owner@example.com' };

test('notification contains the requested fields and consent status', () => {
  const message = buildFeedbackEmail(record, config);
  assert.equal(message.from, config.from);
  assert.deepEqual(message.to, [config.to]);
  assert.match(message.subject, /5\/5/);
  for (const value of ['Asha Patel', 'asha@example.com', '5/5', '2026-10-28T12:30:00.000Z', record.opinion, 'Chocolate gift boxes', 'Contact permission: Yes']) {
    assert.ok(message.text.includes(value));
  }
});

test('Resend request keeps credentials server side and uses a stable idempotency key', async () => {
  let request;
  const fakeFetch = async (url, options) => { request = { url, options }; return new Response(JSON.stringify({ id: 'email_123' }), { status: 200 }); };
  assert.equal(await sendFeedbackEmail(record, config, fakeFetch), 'email_123');
  assert.equal(request.url, 'https://api.resend.com/emails');
  assert.equal(request.options.headers.Authorization, 'Bearer test-only-key');
  assert.equal(request.options.headers['Idempotency-Key'], `harsun-feedback-${record.id}`);
  assert.equal(JSON.parse(request.options.body).to[0], 'owner@example.com');
});

test('provider errors keep the notification pending', async () => {
  await assert.rejects(() => sendFeedbackEmail(record, config, async () => new Response('{}', { status: 503 })), /HTTP 503/);
});
