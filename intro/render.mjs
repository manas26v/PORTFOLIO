// Renders intro/reel.js to an MP4 (1920×1080, 60fps, no audio).
//
//   node intro/render.mjs                 → intro/out/manas-showreel.mp4
//   node intro/render.mjs --sheet 0.5     → intro/out/sheet.jpg (one frame every 0.5s)
//   node intro/render.mjs --at 9.8,10.4   → intro/out/frame-9.8.jpg, … (full-size stills)
//
// Needs Google Chrome and ffmpeg on the PATH. Frames are produced by calling
// window.REEL.renderFrame(t) for each exact timestamp, so the output never
// drops or blends frames regardless of machine speed.
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { mkdirSync, mkdtempSync, readFileSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const OUT = join(HERE, 'out');
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sheetArg = process.argv.indexOf('--sheet');
const SHEET_STEP = sheetArg > -1 ? Number(process.argv[sheetArg + 1] || 0.5) : 0;
const atArg = process.argv.indexOf('--at');
const AT = atArg > -1 ? process.argv[atArg + 1].split(',').map(Number) : null;

mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// --- static server for the repo (Chrome blocks web fonts on file:// pages) ---
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.woff2': 'font/woff2' };
const server = createServer((req, res) => {
  const path = normalize(join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
  if (!path.startsWith(ROOT)) return res.writeHead(403).end();
  try {
    statSync(path);
    res.writeHead(200, { 'Content-Type': TYPES[extname(path)] || 'application/octet-stream' });
    res.end(readFileSync(path));
  } catch {
    res.writeHead(404).end();
  }
}).listen(0);
const port = server.address().port;

// --- headless Chrome over the DevTools protocol ---
const debugPort = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn(
  CHROME,
  ['--headless=new', `--remote-debugging-port=${debugPort}`, '--hide-scrollbars', `--user-data-dir=${mkdtempSync(join(tmpdir(), 'reel-'))}`, 'about:blank'],
  { stdio: 'ignore' },
);
let target;
for (let i = 0; i < 60 && !target; i++) {
  await sleep(200);
  try {
    target = (await (await fetch(`http://127.0.0.1:${debugPort}/json`)).json()).find((t) => t.type === 'page');
  } catch {}
}
if (!target) throw new Error('Could not start Chrome');
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
const errors = [];
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
  if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description);
};
const send = (method, params = {}) =>
  new Promise((r) => {
    const i = ++id;
    pending.set(i, r);
    ws.send(JSON.stringify({ id: i, method, params }));
  });
const evaluate = async (expression) => {
  const res = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (res.result?.exceptionDetails) throw new Error(res.result.exceptionDetails.exception?.description);
  return res.result?.result?.value;
};

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: `http://127.0.0.1:${port}/intro/index.html?render` });
for (let i = 0; i < 100; i++) {
  await sleep(100);
  if (await evaluate('!!window.reelReady').catch(() => false)) break;
}
await evaluate('window.reelReady');
const grabFrame = (t, quality) =>
  evaluate(`(REEL.renderFrame(${t}), REEL.canvas.toDataURL('image/jpeg', ${quality}).slice(23))`).then((b64) => Buffer.from(b64, 'base64'));
const { FPS, DUR } = await evaluate('({ FPS: REEL.FPS, DUR: REEL.DUR })');

if (AT) {
  const { writeFileSync } = await import('node:fs');
  for (const t of AT) writeFileSync(join(OUT, `frame-${t}.jpg`), await grabFrame(t, 0.9));
  ws.close();
  chrome.kill();
  server.close();
  if (errors.length) console.error('Page errors:', errors);
  console.log(`Wrote ${AT.length} still(s) to intro/out/`);
  process.exit(0);
}

const grab = (t, quality) =>
  evaluate(`(REEL.renderFrame(${t}), REEL.canvas.toDataURL('image/jpeg', ${quality}).slice(23))`).then((b64) => Buffer.from(b64, 'base64'));

const times = SHEET_STEP
  ? Array.from({ length: Math.floor(DUR / SHEET_STEP) }, (_, i) => +(i * SHEET_STEP + SHEET_STEP / 2).toFixed(3))
  : Array.from({ length: Math.round(DUR * FPS) }, (_, i) => i / FPS);

const ffArgs = SHEET_STEP
  ? ['-y', '-v', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-i', '-', '-vf', `scale=480:-1,tile=6x${Math.ceil(times.length / 6)}`, '-frames:v', '1', join(OUT, 'sheet.jpg')]
  : ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', join(OUT, 'manas-showreel.mp4')];
const ff = spawn('ffmpeg', ffArgs, { stdio: ['pipe', 'inherit', 'inherit'] });
const ffDone = new Promise((r) => ff.on('close', r));

const started = Date.now();
for (let i = 0; i < times.length; i++) {
  const frame = await grab(times[i], SHEET_STEP ? 0.85 : 0.95);
  if (!ff.stdin.write(frame)) await new Promise((r) => ff.stdin.once('drain', r));
  if (!SHEET_STEP && i % 60 === 0) process.stdout.write(`\rframe ${i}/${times.length}`);
}
ff.stdin.end();
const code = await ffDone;
ws.close();
chrome.kill();
server.close();
if (errors.length) console.error('\nPage errors:', errors);
if (code !== 0) throw new Error(`ffmpeg exited with ${code}`);
console.log(`\nDone in ${((Date.now() - started) / 1000).toFixed(1)}s → ${SHEET_STEP ? 'intro/out/sheet.jpg' : 'intro/out/manas-showreel.mp4'}`);
