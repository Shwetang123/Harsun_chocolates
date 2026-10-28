import { spawn } from 'node:child_process';

const node = process.execPath;
const api = spawn(node, ['--env-file-if-exists=.env.local', 'server.mjs', '--dev'], { stdio: 'inherit' });
const vite = spawn(node, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1'], { stdio: 'inherit' });
let stopped = false;
function stop(code = 0) {
  if (stopped) return;
  stopped = true;
  api.kill();
  vite.kill();
  process.exit(code);
}
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
api.on('exit', code => stop(code || 0));
vite.on('exit', code => stop(code || 0));
