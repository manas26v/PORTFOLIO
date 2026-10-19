/*
 * MANAS — Showreel 2026. A 15-second motion piece where every frame is code.
 *
 * renderFrame(t) is a pure function of time (seconds): same t, same pixels.
 * That lets render.mjs capture exact frames at 60fps, and lets the preview
 * scrub to any moment. Scenes are listed in SCENES; each draws a full frame.
 */
(() => {
  const W = 1920;
  const H = 1080;
  const FPS = 60;
  const DUR = 15;

  const COLOR = {
    black: '#070707',
    ink: '#f4f2ee',
    cream: '#efebe3',
    orange: '#ff5a1f',
    blue: '#2348ff',
    dim: 'rgba(244,242,238,0.45)',
  };

  const canvas = document.getElementById('reel');
  const ctx = canvas.getContext('2d');

  // ---------- helpers ----------
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, k) => a + (b - a) * k;
  /** Progress of t through [a, b], clamped to 0..1. */
  const prog = (t, a, b) => clamp((t - a) / (b - a));
  const ease = {
    outExpo: (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)),
    inExpo: (x) => (x <= 0 ? 0 : Math.pow(2, 10 * x - 10)),
    outCubic: (x) => 1 - Math.pow(1 - x, 3),
    inOutCubic: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
    outBack: (x) => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    },
    inQuad: (x) => x * x,
    outQuad: (x) => 1 - (1 - x) * (1 - x),
  };
  /** Deterministic hash → 0..1, so "random" details are identical every render. */
  const hash = (a, b = 0, c = 0) => {
    let h = Math.imul(a | 0, 374761393) ^ Math.imul(b | 0, 668265263) ^ Math.imul(c | 0, 2147483647);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };

  const font = {
    display: (weight, size) => `${weight} ${size}px GS, "Helvetica Neue", Arial, sans-serif`,
    mono: (size, weight = 400) => `${weight} ${size}px Menlo, ui-monospace, monospace`,
  };

  function fill(c, color) {
    c.fillStyle = color;
    c.fillRect(0, 0, W, H);
  }

  function text(c, str, x, y, { f, color, align = 'left', base = 'alphabetic', spacing = 0 }) {
    c.font = f;
    c.fillStyle = color;
    c.textAlign = align;
    c.textBaseline = base;
    c.letterSpacing = `${spacing}px`;
    c.fillText(str, x, y);
    c.letterSpacing = '0px';
  }

  function circle(c, x, y, r, color) {
    c.beginPath();
    c.arc(x, y, Math.max(0, r), 0, Math.PI * 2);
    c.fillStyle = color;
    c.fill();
  }

  /** Glossy orange ball (radial highlight). */
  function ball(c, x, y, r, sx = 1, sy = 1) {
    c.save();
    c.translate(x, y);
    c.scale(sx, sy);
    const g = c.createRadialGradient(-r * 0.35, -r * 0.4, r * 0.1, 0, 0, r);
    g.addColorStop(0, '#ff9a6a');
    g.addColorStop(0.55, COLOR.orange);
    g.addColorStop(1, '#c2360a');
    circle(c, 0, 0, r, g);
    c.restore();
  }

  // ---------- 01 · INTRO: ball drops, bounces, fills the frame ----------
  const GROUND = 700;
  const BALL_R = 34;
  function ballY(t) {
    const g = GROUND - BALL_R;
    if (t < 0.15) return -120;
    if (t < 0.55) return lerp(-120, g, ease.inQuad(prog(t, 0.15, 0.55)));
    if (t < 0.78) return lerp(g, 380, ease.outQuad(prog(t, 0.55, 0.78)));
    if (t < 1.0) return lerp(380, g, ease.inQuad(prog(t, 0.78, 1.0)));
    if (t < 1.12) return lerp(g, 560, ease.outQuad(prog(t, 1.0, 1.12)));
    if (t < 1.24) return lerp(560, g, ease.inQuad(prog(t, 1.12, 1.24)));
    return g;
  }
  const ballX = (t) => lerp(W / 2 - 260, W / 2, ease.outCubic(prog(t, 0.15, 1.24)));
  const CONTACTS = [0.55, 1.0, 1.24];

  function sceneIntro(c, t) {
    fill(c, COLOR.black);
    // ground line
    const lw = ease.outExpo(prog(t, 0.0, 0.6)) * 1000;
    c.strokeStyle = 'rgba(244,242,238,0.35)';
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(W / 2 - lw / 2, GROUND);
    c.lineTo(W / 2 + lw / 2, GROUND);
    c.stroke();
    const la = prog(t, 0.3, 0.6);
    text(c, 'y = 700  // ground', W / 2 + 380, GROUND + 34, { f: font.mono(14), color: `rgba(244,242,238,${0.4 * la})` });
    // caption typing
    const cap = '> manas.showreel(2026)';
    const n = Math.floor(prog(t, 0.05, 0.6) * cap.length);
    text(c, cap.slice(0, n) + (t % 0.5 < 0.25 ? '_' : ''), W / 2, 300, {
      f: font.mono(22),
      color: COLOR.dim,
      align: 'center',
    });

    // contact ripples
    for (const ct of CONTACTS) {
      const k = prog(t, ct, ct + 0.5);
      if (k <= 0 || k >= 1) continue;
      c.strokeStyle = `rgba(255,90,31,${0.6 * (1 - k)})`;
      c.lineWidth = 2;
      c.beginPath();
      c.ellipse(ballX(ct), GROUND, 30 + k * 160, 6 + k * 20, 0, 0, Math.PI * 2);
      c.stroke();
    }

    // zoom-out: ball flies at the camera and floods the frame
    const z = ease.inExpo(prog(t, 1.26, 1.6));
    if (z > 0) {
      const x = lerp(ballX(t), W / 2, z);
      const y = lerp(ballY(t), H / 2, z);
      ball(c, x, y, lerp(BALL_R, 1300, z));
      return;
    }

    // motion trail
    for (let k = 8; k >= 1; k--) {
      const tt = t - k * 0.014;
      if (tt < 0.15) continue;
      c.globalAlpha = 0.1 * (1 - k / 9);
      ball(c, ballX(tt), ballY(tt), BALL_R);
    }
    c.globalAlpha = 1;
    // squash & stretch
    let sy = 1;
    for (const ct of CONTACTS) {
      const k = prog(t, ct, ct + 0.1);
      if (k > 0 && k < 1) sy = Math.min(sy, 1 - 0.38 * Math.sin(k * Math.PI));
    }
    const v = Math.abs(ballY(t + 0.005) - ballY(t - 0.005)) / 0.01; // px/s
    if (sy === 1) sy = 1 + Math.min(0.25, v / 9000);
    const y = ballY(t) + (BALL_R - BALL_R * sy) * (sy < 1 ? 1 : 0);
    ball(c, ballX(t), y, BALL_R, 1 / sy, sy);
  }

  // ---------- 02 · KINETIC TYPE: EVERY / pixel / is / CODE. ----------
  const GLYPHS = '#$%&/<>{}[]01_=+*';
  function sceneType(c, t) {
    if (t < 2.0) {
      // EVERY — slides up out of a mask, underline draws in
      const u = t - 1.6;
      fill(c, COLOR.orange);
      const k = ease.outExpo(prog(u, 0, 0.28));
      c.save();
      c.beginPath();
      c.rect(0, 300, W, 330);
      c.clip();
      text(c, 'EVERY', W / 2, 600 + (1 - k) * 330, { f: font.display(700, 330), color: '#121212', align: 'center', spacing: -14 });
      c.restore();
      const uw = ease.outExpo(prog(u, 0.08, 0.34)) * 1020;
      c.fillStyle = '#121212';
      c.fillRect(W / 2 - 510, 640, uw, 10);
      text(c, '01', W / 2 - 510, 290, { f: font.mono(18), color: 'rgba(18,18,18,0.6)' });
      return;
    }
    if (t < 2.4) {
      // pixel — settles from wide tracking and a slight overscale
      const u = t - 2.0;
      fill(c, COLOR.cream);
      const k = ease.outExpo(prog(u, 0, 0.3));
      c.save();
      c.translate(W / 2, 580);
      c.scale(lerp(1.25, 1, k), lerp(1.25, 1, k));
      text(c, 'pixel', 0, 0, { f: font.display(500, 360), color: COLOR.blue, align: 'center', spacing: lerp(60, -12, k) });
      c.restore();
      if (u % 0.2 < 0.12) {
        c.fillStyle = COLOR.blue;
        c.fillRect(W / 2 + 470, 330, 12, 290);
      }
      return;
    }
    if (t < 2.8) {
      // is — drops in with overshoot, a ring expands behind it
      const u = t - 2.4;
      fill(c, COLOR.blue);
      const r = ease.outExpo(prog(u, 0.02, 0.4)) * 900;
      c.strokeStyle = `rgba(244,242,238,${0.35 * (1 - prog(u, 0.1, 0.4))})`;
      c.lineWidth = 3;
      c.beginPath();
      c.arc(W / 2, H / 2, r, 0, Math.PI * 2);
      c.stroke();
      const k = ease.outBack(prog(u, 0, 0.26));
      text(c, 'is', W / 2, lerp(-200, 640, k), { f: font.display(600, 440), color: COLOR.cream, align: 'center', spacing: -10 });
      return;
    }
    // CODE. — scrambles, locks letter by letter, then glitches and settles
    const u = t - 2.8;
    fill(c, '#0a0a0a');
    const target = 'CODE';
    const frameNo = Math.floor(t * 30);
    let str = '';
    for (let i = 0; i < target.length; i++) {
      const lock = 0.05 + i * 0.08;
      str += u >= lock ? target[i] : GLYPHS[Math.floor(hash(frameNo, i) * GLYPHS.length)];
    }
    const glitch = 1 - prog(u, 0, 0.45);
    const y = 610;
    c.globalCompositeOperation = 'lighter';
    const off = glitch * 18 * (hash(frameNo, 7) - 0.5) * 2;
    text(c, str, W / 2 - 40 + off, y, { f: font.display(700, 330), color: 'rgba(255,40,40,0.9)', align: 'center', spacing: -10 });
    text(c, str, W / 2 - 40 - off, y, { f: font.display(700, 330), color: 'rgba(40,90,255,0.9)', align: 'center', spacing: -10 });
    text(c, str, W / 2 - 40, y, { f: font.display(700, 330), color: 'rgba(60,255,120,0.9)', align: 'center', spacing: -10 });
    c.globalCompositeOperation = 'source-over';
    // the full stop pops in last
    const dot = ease.outBack(prog(u, 0.42, 0.62));
    circle(c, W / 2 + 395, y - 26, 34 * dot, COLOR.orange);
    // glitch bars
    for (let i = 0; i < 6; i++) {
      if (hash(frameNo, i, 3) > glitch) continue;
      c.fillStyle = i % 2 ? COLOR.orange : COLOR.ink;
      c.fillRect(hash(frameNo, i, 4) * W, hash(frameNo, i, 5) * H, 40 + hash(frameNo, i, 6) * 400, 6 + hash(frameNo, i, 8) * 18);
    }
    const cap = 'const reel = render(every.pixel)';
    const n = Math.floor(prog(u, 0.3, 0.75) * cap.length);
    text(c, cap.slice(0, n), W / 2, 720, { f: font.mono(22), color: COLOR.dim, align: 'center' });
  }

  // ---------- 03 · GRID SYSTEMS: radar → dot grid → pluses → squares ----------
  const SP = 54;
  function sceneGrid(c, t) {
    const u = t - 3.6;
    fill(c, '#141414');
    const cx = W / 2;
    const cy = H / 2;
    // radar
    const ra = 1 - prog(u, 0.6, 0.9);
    if (ra > 0) {
      c.save();
      c.globalAlpha = ra;
      const s = ease.outBack(prog(u, 0, 0.35));
      c.strokeStyle = 'rgba(244,242,238,0.35)';
      c.lineWidth = 2;
      for (const r of [60, 120, 180]) {
        c.beginPath();
        c.arc(cx, cy, r * s, 0, Math.PI * 2);
        c.stroke();
      }
      const a = u * 7;
      c.fillStyle = 'rgba(255,90,31,0.18)';
      c.beginPath();
      c.moveTo(cx, cy);
      c.arc(cx, cy, 180 * s, a, a + 0.6);
      c.closePath();
      c.fill();
      for (let i = 0; i < 4; i++) circle(c, cx + Math.cos(i * 1.7 + 0.4) * 90 * s, cy + Math.sin(i * 1.7 + 0.4) * 70 * s, 4, COLOR.orange);
      circle(c, cx, cy, 7, COLOR.ink);
      text(c, 'SCAN // 0x3F2A', cx + 210, cy - 170, { f: font.mono(14), color: COLOR.dim });
      c.restore();
    }
    // grid
    const reveal = ease.outCubic(prog(u, 0.35, 1.0)) * 1400;
    const sq = ease.outCubic(prog(u, 1.05, 1.4));
    const cols = Math.ceil(W / SP) + 1;
    const rows = Math.ceil(H / SP) + 1;
    const ox = (W - (cols - 1) * SP) / 2;
    const oy = (H - (rows - 1) * SP) / 2;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const x = ox + i * SP;
        const y = oy + j * SP;
        const d = Math.hypot(x - cx, y - cy);
        if (d > reveal) continue;
        const front = clamp(1 - (reveal - d) / 160);
        const wave = Math.sin(d * 0.018 - u * 7);
        if (sq > 0) {
          // squares rotating into alignment, coloured by travelling bands
          const s = lerp(10, 24, sq);
          let col = COLOR.ink;
          if (Math.sin(i * 0.5 + j * 0.32 - u * 6) > 0.82) col = COLOR.orange;
          else if (Math.cos(i * 0.36 - j * 0.6 + u * 5) > 0.84) col = COLOR.blue;
          c.save();
          c.translate(x, y);
          c.rotate((1 - sq) * Math.PI * 0.25 + Math.sin(d * 0.01 - u * 4) * 0.15 * sq);
          c.fillStyle = col;
          c.fillRect(-s / 2, -s / 2, s, s);
          c.restore();
        } else if (u > 0.75 && wave > 0.72) {
          // plus signs ride the wave
          c.fillStyle = hash(i, j) > 0.85 ? COLOR.orange : COLOR.blue;
          c.fillRect(x - 11, y - 3, 22, 6);
          c.fillRect(x - 3, y - 11, 6, 22);
        } else {
          circle(c, x, y, 7 + front * 6, COLOR.ink);
        }
      }
    }
  }

  // ---------- 04 · TERRAIN: isometric blocks, ball hopping across ----------
  const N = 20;
  const TW = 64;
  function blockColor(i, j) {
    const h = hash(i, j, 11);
    if (h < 0.08) return [255, 90, 31];
    if (h < 0.16) return [35, 72, 255];
    const g = 205 + Math.floor(hash(i, j, 12) * 25);
    return [g, g - 4, g - 12];
  }
  const rgb = (c, k) => `rgb(${c.map((v) => Math.round(v * k)).join(',')})`;

  function terrainHeight(i, j, u) {
    const d = Math.hypot(i - N / 2, j - N / 2);
    const rise = ease.outBack(clamp((u - d * 0.03) / 0.45));
    return rise * (24 + 80 * (0.5 + 0.5 * Math.sin(d * 0.55 - u * 3.2)) + 50 * hash(i, j, 13));
  }

  function sceneTerrain(c, t) {
    const u = t - 5.2;
    const g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#0b0b0e');
    g.addColorStop(1, '#1a1a20');
    fill(c, g);
    const sc = lerp(1.0, 1.32, ease.inOutCubic(prog(u, 0, 2)));
    const cx = W / 2 + lerp(60, -40, prog(u, 0, 2));
    const cy = 330 - lerp(0, 120, ease.inOutCubic(prog(u, 0, 2)));
    const P = (i, j, z) => [cx + (i - j) * (TW / 2) * sc, cy + (i + j) * (TW / 4) * sc - z * sc];

    for (let s = 0; s <= 2 * (N - 1); s++) {
      for (let i = 0; i < N; i++) {
        const j = s - i;
        if (j < 0 || j >= N) continue;
        const h = terrainHeight(i, j, u);
        const col = blockColor(i, j);
        const a = P(i, j, h);
        const b = P(i + 1, j, h);
        const cc = P(i + 1, j + 1, h);
        const d = P(i, j + 1, h);
        const b0 = P(i + 1, j, 0);
        const c0 = P(i + 1, j + 1, 0);
        const d0 = P(i, j + 1, 0);
        // left face
        c.fillStyle = rgb(col, 0.72);
        c.beginPath();
        c.moveTo(d[0], d[1]);
        c.lineTo(cc[0], cc[1]);
        c.lineTo(c0[0], c0[1]);
        c.lineTo(d0[0], d0[1]);
        c.fill();
        // right face
        c.fillStyle = rgb(col, 0.52);
        c.beginPath();
        c.moveTo(cc[0], cc[1]);
        c.lineTo(b[0], b[1]);
        c.lineTo(b0[0], b0[1]);
        c.lineTo(c0[0], c0[1]);
        c.fill();
        // top
        c.fillStyle = rgb(col, 1);
        c.beginPath();
        c.moveTo(a[0], a[1]);
        c.lineTo(b[0], b[1]);
        c.lineTo(cc[0], cc[1]);
        c.lineTo(d[0], d[1]);
        c.fill();
      }
    }

    // ball hops block to block along the diagonal
    const hop = 0.4;
    const k = Math.max(0, u - 0.4) / hop;
    const n = Math.floor(k);
    const f = k - n;
    const path = (m) => [3 + m * 2.4, 5 + m * 1.9];
    const [i0, j0] = path(n);
    const [i1, j1] = path(n + 1);
    const bi = lerp(i0, i1, f);
    const bj = lerp(j0, j1, f);
    const top = lerp(terrainHeight(Math.round(i0), Math.round(j0), u), terrainHeight(Math.round(i1), Math.round(j1), u), f);
    const lift = u > 0.4 ? 150 * 4 * f * (1 - f) : 0;
    const [sx, sy] = P(bi + 0.5, bj + 0.5, top);
    const r = 26 * sc;
    c.fillStyle = 'rgba(0,0,0,0.35)';
    c.beginPath();
    c.ellipse(sx, sy, r * (1 - f * (1 - f)), r * 0.45, 0, 0, Math.PI * 2);
    c.fill();
    if (u > 0.25) ball(c, sx, sy - r - lift * sc, r);
    text(c, 'terrain.generate({ seed: 0x2A, size: 20 })', 140, H - 150, { f: font.mono(16), color: COLOR.dim });
  }

  // ---------- 05 · TYPE WALL ----------
  const ROW_WORDS = ['BACKEND', 'SYSTEMS', 'SCALE', 'APIs'];
  const BAND_WORDS = ['NODE.JS', 'POSTGRESQL', 'TYPESCRIPT', 'FASTAPI'];
  function sceneWall(c, t) {
    const u = t - 7.2;
    fill(c, COLOR.blue);
    const rowH = 124;
    const smear = ease.inExpo(prog(u, 1.3, 1.6));
    const collapse = ease.inExpo(prog(u, 1.42, 1.6));
    c.save();
    c.translate(W / 2, H / 2);
    c.scale(1 + smear * 2.2, 1 - collapse * 0.97);
    c.translate(-W / 2, -H / 2);
    for (let r = -1; r < 10; r++) {
      const y = 70 + r * rowH;
      if (r === 4) continue;
      const word = ROW_WORDS[(r + 4) % ROW_WORDS.length];
      const solid = r % 2 === 0;
      c.font = font.display(solid ? 700 : 500, 104);
      c.letterSpacing = '-3px';
      const unit = `${word} · `;
      const uw = c.measureText(unit).width;
      const dir = r % 2 ? 1 : -1;
      const enter = (1 - ease.outExpo(prog(u, 0, 0.3))) * W * dir;
      let x = ((u * (180 + (r % 3) * 70) * dir + r * 137) % uw) - uw + enter;
      c.textBaseline = 'middle';
      c.textAlign = 'left';
      while (x < W + uw) {
        if (solid) {
          c.fillStyle = COLOR.cream;
          c.fillText(unit, x, y);
        } else {
          c.strokeStyle = 'rgba(239,235,227,0.85)';
          c.lineWidth = 2;
          c.strokeText(unit, x, y);
        }
        x += uw;
      }
      c.letterSpacing = '0px';
    }
    // orange band with a slot-machine word roll on every beat
    const by = 70 + 4 * rowH;
    const bandH = 150 * ease.outExpo(prog(u, 0.05, 0.3));
    c.fillStyle = COLOR.orange;
    c.fillRect(0, by - bandH / 2, W, bandH);
    c.save();
    c.beginPath();
    c.rect(0, by - bandH / 2, W, bandH);
    c.clip();
    const idx = Math.min(BAND_WORDS.length - 1, Math.floor(u / 0.4));
    const roll = ease.outExpo(prog(u - idx * 0.4, 0, 0.16));
    const draw = (w, dy) => text(c, w, W / 2, by + dy, { f: font.display(700, 116), color: '#111', align: 'center', base: 'middle', spacing: -4 });
    draw(BAND_WORDS[idx], (1 - roll) * 150);
    if (idx > 0) draw(BAND_WORDS[idx - 1], -roll * 150);
    c.restore();
    c.restore();
    if (collapse > 0) {
      c.fillStyle = `rgba(7,7,7,${collapse})`;
      c.fillRect(0, 0, W, H);
    }
  }

  // ---------- 06 · PARTICLES: sphere → helix → galaxy → collapse ----------
  const NP = 2600;
  const PARTS = Array.from({ length: NP }, (_, i) => {
    // sphere (Fibonacci)
    const yS = 1 - (i / (NP - 1)) * 2;
    const rS = Math.sqrt(1 - yS * yS);
    const th = i * 2.399963;
    const sphere = [Math.cos(th) * rS * 320, yS * 320, Math.sin(th) * rS * 320];
    // helix: two strands plus rungs
    const strand = i % 2;
    const along = (i / NP) * 2 - 1;
    const hx = along * 680;
    const rung = i % 11 === 0;
    const ang = hx * 0.011 + strand * Math.PI;
    const rr = rung ? lerp(-1, 1, hash(i, 2)) * 170 : 170;
    const helix = [hx, Math.cos(ang) * rr + (hash(i, 3) - 0.5) * 14, Math.sin(ang) * rr + (hash(i, 4) - 0.5) * 14];
    // galaxy: two-armed spiral
    const gr = 30 + Math.pow(hash(i, 5), 0.7) * 560;
    const gth = strand * Math.PI + gr * 0.0125 + (hash(i, 6) - 0.5) * 0.5;
    const galaxy = [Math.cos(gth) * gr, (hash(i, 7) - 0.5) * 26, Math.sin(gth) * gr];
    return {
      sphere,
      helix,
      galaxy,
      delay: hash(i, 8) * 0.22,
      tint: rung ? COLOR.ink : strand ? COLOR.orange : '#3b63ff',
      gTint: gr < 110 && hash(i, 9) < 0.5 ? COLOR.ink : strand ? COLOR.orange : '#3b63ff',
    };
  });

  function sceneParticles(c, t) {
    const u = t - 8.8;
    fill(c, '#050505');
    const born = ease.outExpo(prog(u, 0, 0.45));
    const col = ease.inExpo(prog(t, 10.55, 10.8));
    // Only the sphere spins on its own; the helix lies sideways so its twist reads.
    const rotY = 0.35 + u * 0.25;
    const tilt = lerp(0.25, 0.9, ease.inOutCubic(prog(t, 10.0, 10.5)));
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const cosX = Math.cos(tilt);
    const sinX = Math.sin(tilt);
    const f = 1000;
    c.globalCompositeOperation = 'lighter';
    for (const p of PARTS) {
      const k1 = ease.inOutCubic(prog(t, 9.35 + p.delay, 9.75 + p.delay));
      const k2 = ease.inOutCubic(prog(t, 9.95 + p.delay, 10.3 + p.delay));
      const ss = u * 1.8;
      const sx0 = p.sphere[0] * Math.cos(ss) + p.sphere[2] * Math.sin(ss);
      const sz0 = -p.sphere[0] * Math.sin(ss) + p.sphere[2] * Math.cos(ss);
      let x = lerp(lerp(sx0, p.helix[0], k1), p.galaxy[0], k2);
      let y = lerp(lerp(p.sphere[1], p.helix[1], k1), p.galaxy[1], k2);
      let z = lerp(lerp(sz0, p.helix[2], k1), p.galaxy[2], k2);
      const s = born * (1 - col) * 1.3;
      x *= s;
      y *= s;
      z *= s;
      // helix spins around its own axis; everything turns around Y, galaxy tilts toward us
      const spin = u * 2.2 * k1 * (1 - k2);
      const y2 = y * Math.cos(spin) - z * Math.sin(spin);
      const z2 = y * Math.sin(spin) + z * Math.cos(spin);
      const x3 = x * cosY + z2 * sinY;
      const z3 = -x * sinY + z2 * cosY;
      const y4 = y2 * cosX - z3 * sinX;
      const z4 = y2 * sinX + z3 * cosX;
      const pr = f / (f + z4 + 400);
      const size = 3.4 * pr;
      const px = W / 2 + x3 * pr;
      const py = H / 2 + y4 * pr;
      c.fillStyle = k2 > 0.5 ? p.gTint : k1 > 0.5 ? p.tint : COLOR.ink;
      // soft glow halo, then the bright core
      c.globalAlpha = 0.07;
      c.fillRect(px - size * 2, py - size * 2, size * 4, size * 4);
      c.globalAlpha = clamp(0.45 + 0.55 * pr);
      c.fillRect(px - size / 2, py - size / 2, size, size);
    }
    c.globalAlpha = 1;
    c.globalCompositeOperation = 'source-over';
    // implosion flash
    const fl = prog(t, 10.7, 10.8);
    if (fl > 0) circle(c, W / 2, H / 2, 20 + fl * 120, `rgba(255,255,255,${fl})`);
    text(c, `particles: ${NP.toLocaleString('en-US')}  // morph(sphere → helix → galaxy)`, 140, H - 150, { f: font.mono(16), color: COLOR.dim });
  }

  // ---------- 07 · RECAP: grid of every scene, zoom, glitch ----------
  // [scene, start time inside that scene, label, playback rate] — rates keep each
  // cell inside its scene's interesting window while the grid is on screen.
  const RECAP = [
    [sceneIntro, 0.75, 'BOUNCE', 0.3],
    [sceneType, 1.85, 'TYPE', 0.5],
    [sceneGrid, 4.55, 'GRID', 0.5],
    [sceneTerrain, 6.4, 'TERRAIN', 0.5],
    [sceneType, 3.4, 'CODE', 0.5],
    [sceneWall, 7.85, 'TYPE WALL', 0.5],
    [sceneParticles, 9.7, 'HELIX', 0.3],
    [sceneTerrain, 6.9, 'TERRAIN', 0.5],
    [sceneParticles, 10.3, 'GALAXY', 0.3],
  ];
  const buffer = document.createElement('canvas');
  buffer.width = W;
  buffer.height = H;
  const bctx = buffer.getContext('2d');

  function sceneRecap(c, t) {
    const u = t - 10.8;
    fill(c, '#050505');
    const gap = 16;
    const cw = (W - 260 - gap * 2) / 3;
    const ch = (cw * 9) / 16;
    const ox = 130;
    const oy = (H - (ch * 3 + gap * 2)) / 2;
    const zoom = ease.inOutCubic(prog(u, 0.95, 1.4));
    RECAP.forEach(([fn, base, label, rate], idx) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      let x = ox + col * (cw + gap);
      let y = oy + row * (ch + gap);
      let w = cw;
      let h = ch;
      // No overshoot here: a growing cell would spill over its neighbours.
      const pop = ease.outExpo(prog(u, idx * 0.045, idx * 0.045 + 0.4));
      if (pop <= 0) return;
      const center = idx === 4;
      if (center) {
        x = lerp(x, 0, zoom);
        y = lerp(y, 0, zoom);
        w = lerp(w, W, zoom);
        h = lerp(h, H, zoom);
      } else if (zoom > 0) {
        c.globalAlpha = 1 - zoom;
      }
      c.save();
      c.translate(x + w / 2, y + h / 2);
      c.scale(pop, pop);
      c.translate(-w / 2, -h / 2);
      c.beginPath();
      c.rect(0, 0, w, h);
      c.clip();
      c.scale(w / W, h / H);
      fn(c, base + u * rate);
      c.restore();
      c.globalAlpha = 1;
      if (!center || zoom < 0.2) {
        c.strokeStyle = 'rgba(244,242,238,0.18)';
        c.lineWidth = 1;
        c.strokeRect(x, y, w, h);
        text(c, `${String(idx + 1).padStart(2, '0')} ${label}`, x + 12, y + h - 12, { f: font.mono(12), color: 'rgba(244,242,238,0.7)' });
      }
    });
    // glitch slices into the outro
    const gl = prog(u, 1.4, 1.6);
    if (gl > 0) {
      bctx.drawImage(canvas, 0, 0);
      const frameNo = Math.floor(t * FPS);
      for (let i = 0; i < 14; i++) {
        const sy = hash(frameNo, i, 21) * H;
        const sh = 10 + hash(frameNo, i, 22) * 80;
        const dx = (hash(frameNo, i, 23) - 0.5) * 260 * gl;
        c.drawImage(buffer, 0, sy, W, sh, dx, sy, W, sh);
      }
      c.fillStyle = `rgba(255,90,31,${0.25 * gl})`;
      c.fillRect(0, hash(frameNo, 30) * H, W, 40);
    }
  }

  // ---------- 08 · OUTRO: MANAS. ----------
  function sceneOutro(c, t) {
    const u = t - 12.4;
    fill(c, COLOR.black);
    // faint drifting dot grid (callback to scene 03)
    c.fillStyle = 'rgba(244,242,238,0.07)';
    for (let y = 27; y < H; y += SP) for (let x = 27 + ((u * 12) % SP); x < W; x += SP) c.fillRect(x - 2, y - 2, 4, 4);

    const X = 170;
    const BASE = 600;
    const size = 300;
    c.font = font.display(700, size);
    c.letterSpacing = '-14px';
    const word = 'MANAS';
    let x = X;
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      const w = c.measureText(ch).width;
      const k = ease.outExpo(prog(u, 0.05 + i * 0.06, 0.6 + i * 0.06));
      c.save();
      c.beginPath();
      c.rect(x - 20, BASE - size, w + 40, size + 60);
      c.clip();
      c.fillStyle = COLOR.ink;
      c.textAlign = 'left';
      c.textBaseline = 'alphabetic';
      c.fillText(ch, x, BASE + (1 - k) * size * 1.1);
      c.restore();
      x += w;
    }
    c.letterSpacing = '0px';
    // the full stop: an orange ball that drops in and bounces once (callback to scene 01)
    const dropT = prog(u, 0.45, 0.85);
    const dy = dropT < 0.6 ? lerp(-500, 0, ease.inQuad(dropT / 0.6)) : -60 * Math.sin(((dropT - 0.6) / 0.4) * Math.PI);
    if (dropT > 0) circle(c, x + 30, BASE - 32 + dy, 34, COLOR.orange);

    // detail line + labels
    const lw = ease.outExpo(prog(u, 0.7, 1.2)) * (W - X * 2);
    c.fillStyle = 'rgba(244,242,238,0.3)';
    c.fillRect(X, BASE + 70, lw, 2);
    const a = prog(u, 0.85, 1.2);
    const ink = `rgba(244,242,238,${a})`;
    const dim = `rgba(244,242,238,${0.5 * a})`;
    text(c, 'SOFTWARE DEVELOPER', X, BASE + 120, { f: font.mono(20, 700), color: ink, spacing: 2 });
    text(c, 'BACKEND · APIs · DATA SYSTEMS', X, BASE + 152, { f: font.mono(18), color: dim, spacing: 1 });
    text(c, 'SHOWREEL 2026', W - X, BASE + 120, { f: font.mono(20, 700), color: ink, align: 'right', spacing: 2 });
    text(c, 'every pixel of this reel is code', W - X, BASE + 152, { f: `italic ${font.display(500, 22)}`, color: dim, align: 'right' });
    const b = prog(u, 1.1, 1.4);
    if (b > 0) {
      const on = u % 0.8 < 0.55;
      circle(c, X + 8, H - 160, 7, on ? COLOR.orange : 'rgba(255,90,31,0.35)');
      text(c, 'AVAILABLE FOR NEW PROJECTS', X + 28, H - 154, { f: font.mono(16), color: `rgba(244,242,238,${0.75 * b})`, spacing: 1.5 });
    }
  }

  // ---------- timeline ----------
  const SCENES = [
    { from: 0, to: 1.6, draw: sceneIntro, label: 'INTRO', hud: 'light' },
    { from: 1.6, to: 3.6, draw: sceneType, label: 'KINETIC TYPE', hud: (t) => (t < 2.4 ? 'dark' : 'light') },
    { from: 3.6, to: 5.2, draw: sceneGrid, label: 'GRID SYSTEMS', hud: 'light' },
    { from: 5.2, to: 7.2, draw: sceneTerrain, label: 'TERRAIN', hud: 'light' },
    { from: 7.2, to: 8.8, draw: sceneWall, label: 'TYPE WALL', hud: 'light' },
    { from: 8.8, to: 10.8, draw: sceneParticles, label: 'PARTICLES', hud: 'light' },
    { from: 10.8, to: 12.4, draw: sceneRecap, label: 'RECAP', hud: 'light' },
    { from: 12.4, to: DUR + 1, draw: sceneOutro, label: 'OUTRO', hud: 'light' },
  ];
  // Moments that hit hard: a white flash and a short camera shake.
  const IMPACTS = [1.6, 2.8, 3.6, 5.2, 7.2, 8.8, 10.8, 12.4];
  const BOUNCES = [0.55, 1.0, 1.24];

  // ---------- HUD, grain, vignette ----------
  const grain = Array.from({ length: 6 }, (_, n) => {
    const g = document.createElement('canvas');
    g.width = g.height = 256;
    const gx = g.getContext('2d');
    const img = gx.createImageData(256, 256);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = hash(i, n, 99) * 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    gx.putImageData(img, 0, 0);
    return g;
  });

  function timecode(t) {
    const f = Math.floor(t * FPS);
    const s = Math.floor(f / FPS);
    return `00:00:${String(s).padStart(2, '0')}:${String(f % FPS).padStart(2, '0')}`;
  }

  function hud(c, t, scene, idx) {
    const tone = typeof scene.hud === 'function' ? scene.hud(t) : scene.hud;
    const ink = tone === 'dark' ? 'rgba(18,18,18,0.72)' : 'rgba(244,242,238,0.62)';
    const a = prog(t, 0.1, 0.4);
    c.globalAlpha = a;
    c.strokeStyle = ink;
    c.lineWidth = 2;
    const m = 40;
    const L = 26;
    for (const [x, y, dx, dy] of [
      [m, m, 1, 1],
      [W - m, m, -1, 1],
      [m, H - m, 1, -1],
      [W - m, H - m, -1, -1],
    ]) {
      c.beginPath();
      c.moveTo(x + dx * L, y);
      c.lineTo(x, y);
      c.lineTo(x, y + dy * L);
      c.stroke();
    }
    const f = font.mono(14);
    text(c, 'MANAS RANJAN BARIK — SHOWREEL 2026', m + 40, m + 6, { f, color: ink, base: 'middle', spacing: 1 });
    text(c, `1920×1080 · 60FPS · REC ${t % 1 < 0.6 ? '●' : '○'}`, W - m - 40, m + 6, { f, color: ink, align: 'right', base: 'middle', spacing: 1 });
    text(c, `TC ${timecode(t)}`, m + 40, H - m - 6, { f, color: ink, base: 'middle', spacing: 1 });
    text(c, `${String(idx + 1).padStart(2, '0')} / 08  ${scene.label}`, W - m - 40, H - m - 6, { f, color: ink, align: 'right', base: 'middle', spacing: 1 });
    // progress
    c.fillStyle = ink;
    c.fillRect(m + 340, H - m - 7, (W - 2 * m - 760) * (t / DUR), 2);
    c.globalAlpha = 1;
  }

  const vignette = (() => {
    const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 1.05);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, 'rgba(0,0,0,0.45)');
    return g;
  })();

  function renderFrame(t) {
    t = clamp(t, 0, DUR - 1e-6);
    const idx = SCENES.findIndex((s) => t >= s.from && t < s.to);
    const scene = SCENES[idx];

    // camera shake after impacts and bounces
    let sx = 0;
    let sy = 0;
    for (const it of [...IMPACTS, ...BOUNCES]) {
      if (t < it || t > it + 0.4) continue;
      const amp = (IMPACTS.includes(it) ? 10 : 5) * Math.exp(-(t - it) * 14);
      sx += Math.sin((t - it) * 90) * amp;
      sy += Math.cos((t - it) * 77) * amp;
    }
    ctx.save();
    ctx.translate(sx, sy);
    ctx.fillStyle = '#000';
    ctx.fillRect(-20, -20, W + 40, H + 40);
    scene.draw(ctx, t);
    ctx.restore();

    // white flash on impacts
    for (const it of IMPACTS) {
      const k = prog(t, it, it + 0.08);
      if (t >= it && k < 1) {
        ctx.fillStyle = `rgba(255,255,255,${0.35 * (1 - k)})`;
        ctx.fillRect(0, 0, W, H);
      }
    }
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, W, H);
    hud(ctx, t, scene, idx);
    // film grain
    ctx.globalAlpha = 0.06;
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = ctx.createPattern(grain[Math.floor(t * FPS) % grain.length], 'repeat');
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }

  window.REEL = { W, H, FPS, DUR, renderFrame, canvas };
  window.reelReady = document.fonts.ready.then(() => document.fonts.load(font.display(700, 100))).then(() => {
    renderFrame(0);
    return true;
  });
})();
