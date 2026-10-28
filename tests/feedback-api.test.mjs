import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:net';
import { spawn } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const valid = { name: 'Asha Patel', rating: 5, interest: 'yes', product: 'gifts', opinion: 'I would love a festive chocolate gift box.', email: '', contactConsent: false, website: '' };
const findPort = () => new Promise((resolvePort, reject) => {
  const server = createServer();
  server.once('error', reject);
  server.listen(0, '127.0.0.1', () => { const port = server.address().port; server.close(() => resolvePort(port)); });
});

test('feedback API validates and stores new fields, then rate limits repeated submissions', async () => {
  const temporaryRoot = resolve(tmpdir());
  const temporary = await mkdtemp(join(temporaryRoot, 'harsun-feedback-test-'));
  const port = await findPort();
  const dataFile = join(temporary, 'feedback.jsonl');
  const child = spawn(process.execPath, ['server.mjs', '--dev'], { cwd: root, env: { ...process.env, PORT: String(port), HOST: '127.0.0.1', FEEDBACK_FILE: dataFile, RESEND_API_KEY: '', FEEDBACK_FROM_EMAIL: '', FEEDBACK_ADMIN_EMAIL: '' }, stdio: 'ignore' });
  const base = `http://127.0.0.1:${port}`;
  const submit = payload => fetch(`${base}/api/feedback`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  try {
    let ready = false;
    for (let attempt = 0; attempt < 40; attempt++) {
      try { ready = (await fetch(`${base}/api/health`)).ok; if (ready) break; } catch { /* waiting for server */ }
      await new Promise(resolveWait => setTimeout(resolveWait, 100));
    }
    assert.ok(ready, 'test server started');
    assert.equal((await submit({ ...valid, name: '' })).status, 400);
    assert.equal((await submit({ ...valid, rating: 0 })).status, 400);
    assert.equal((await submit({ ...valid, email: 'asha@example.com', contactConsent: false })).status, 400);
    assert.equal((await submit({ ...valid, website: 'spam' })).status, 200);
    assert.equal((await submit(valid)).status, 201);
    const saved = JSON.parse((await readFile(dataFile, 'utf8')).trim());
    assert.equal(saved.name, valid.name);
    assert.equal(saved.rating, 5);
    assert.equal(saved.email, null);
    assert.deepEqual(await fetch(`${base}/api/feedback/summary`).then(response => response.json()), { responses: 1, interested: 1 });
    for (let count = 0; count < 4; count++) assert.equal((await submit(valid)).status, 201);
    assert.equal((await submit(valid)).status, 429);
  } finally {
    child.kill();
    await new Promise(resolveClose => child.once('close', resolveClose));
    if (!resolve(temporary).startsWith(temporaryRoot + sep)) throw new Error('Refusing to remove test data outside temp directory');
    await rm(temporary, { recursive: true, force: true });
  }
});
