import test from 'node:test';
import assert from 'node:assert/strict';
import { handleFeedback } from '../api/feedback.mjs';

const valid = {
  name: 'Asha Patel', rating: 5, interest: 'yes', product: 'gifts',
  opinion: 'I would love a chocolate gift assortment.', email: '', contactConsent: false,
};
const request = body => new Request('https://harsun.example/api/feedback', {
  method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.10' },
  body: JSON.stringify(body),
});

test('Vercel feedback sends to the configured inbox before confirming success', async () => {
  const previous = [process.env.RESEND_API_KEY, process.env.FEEDBACK_FROM_EMAIL, process.env.FEEDBACK_ADMIN_EMAIL];
  process.env.RESEND_API_KEY = 'test-only-key';
  process.env.FEEDBACK_FROM_EMAIL = 'feedback@example.com';
  process.env.FEEDBACK_ADMIN_EMAIL = 'shwetang11082002@gmail.com';
  try {
    let sent;
    const response = await handleFeedback(request(valid), async (record, config) => { sent = { record, config }; return 'email_123'; });
    assert.equal(response.status, 201);
    assert.equal(sent.config.to, 'shwetang11082002@gmail.com');
    assert.equal(sent.record.opinion, valid.opinion);
    assert.ok(sent.record.createdAt);
  } finally {
    for (const [index, key] of ['RESEND_API_KEY', 'FEEDBACK_FROM_EMAIL', 'FEEDBACK_ADMIN_EMAIL'].entries()) {
      if (previous[index] === undefined) delete process.env[key];
      else process.env[key] = previous[index];
    }
  }
});

test('Vercel feedback rejects invalid submissions', async () => {
  const response = await handleFeedback(request({ ...valid, rating: 9 }), async () => { throw new Error('Email must not be called'); });
  assert.equal(response.status, 400);
});
