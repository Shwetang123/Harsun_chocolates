const interestLabels = { yes: 'Yes', maybe: 'Maybe', no: 'Probably not' };
const productLabels = { bars: 'Everyday chocolate bars', handmade: 'Handmade treats', gifts: 'Chocolate gift boxes', unsure: 'Not sure yet' };

export function buildFeedbackEmail(record, { from, to }) {
  const rating = Number.isInteger(record.rating) && record.rating >= 1 && record.rating <= 5 ? `${record.rating}/5` : 'Not provided';
  const text = [
    'New HarSun review and feedback',
    '',
    `Name: ${record.name || 'Not provided'}`,
    `Email: ${record.email || 'Not provided'}`,
    `Rating: ${rating}`,
    `Interested in buying after launch: ${interestLabels[record.interest] || 'Not provided'}`,
    `Most interesting product: ${productLabels[record.product] || 'Not provided'}`,
    `Submitted (UTC): ${record.createdAt}`,
    `Contact permission: ${record.contactConsent ? 'Yes' : 'No'}`,
    `Feedback ID: ${record.id}`,
    '',
    'Feedback:',
    record.opinion,
  ].join('\n');

  return {
    from,
    to: [to],
    subject: `New HarSun feedback${rating === 'Not provided' ? '' : ` — ${rating}`}`,
    text,
  };
}

export async function sendFeedbackEmail(record, config, fetchImpl = fetch) {
  const response = await fetchImpl('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `harsun-feedback-${record.id}`,
    },
    body: JSON.stringify(buildFeedbackEmail(record, config)),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Email provider returned HTTP ${response.status}`);
  const result = await response.json();
  if (!result?.id) throw new Error('Email provider did not confirm the message');
  return result.id;
}
