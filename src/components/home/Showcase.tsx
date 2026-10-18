import Image from 'next/image';
import type { ReactNode } from 'react';
import photo from '@/assets/about-me.jpg';
import { skills } from '@/data/experience';

/* Decorative, auto-scrolling mosaic of tiles built from real portfolio data. */

type Tile = { w: 'wide' | 'narrow'; className: string; content: ReactNode };

const width = { wide: 'w-[300px] sm:w-[476px]', narrow: 'w-[170px] sm:w-[236px]' };

function Chip({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${className}`}>{children}</span>;
}

const rowOne: Tile[] = [
  {
    w: 'wide',
    className: 'bg-[#2b7de9]',
    content: (
      <Image src={photo} alt="" fill sizes="476px" className="object-cover" placeholder="blur" />
    ),
  },
  {
    w: 'narrow',
    className: 'bg-gradient-to-b from-white via-[#ffd9bf] to-brand-orange',
    content: (
      <div className="absolute inset-x-5 top-10 rounded-[22px] border-[5px] border-[#1a1a1a] bg-white p-3 text-[10px] text-black shadow-2xl sm:inset-x-8">
        <div className="mx-auto mb-3 h-3 w-14 rounded-full bg-[#1a1a1a]" />
        <p className="font-semibold">Science tutor</p>
        <div className="mt-2 rounded-xl rounded-tl-sm bg-[#f1f1f1] p-2">Why is the sky blue?</div>
        <div className="mt-2 rounded-xl rounded-tr-sm bg-brand-orange p-2 text-white">
          Rayleigh scattering — shorter blue wavelengths scatter more… <span className="opacity-70">p. 142</span>
        </div>
        <div className="mt-2 flex gap-1">
          <Chip className="bg-black/5">RAG</Chip>
          <Chip className="bg-black/5">Ollama</Chip>
        </div>
      </div>
    ),
  },
  {
    w: 'wide',
    className: 'bg-[#4be05a]',
    content: (
      <div className="absolute left-8 top-1/2 w-[120%] -translate-y-1/3 -rotate-[10deg] rounded-2xl bg-[#0b0b0b] p-5 font-mono text-[12px] leading-relaxed text-[#c8c8c8] shadow-2xl sm:text-[13px]">
        <p className="text-[#4be05a]">$ curl api/v1/reports?tenant=acme</p>
        <p>HTTP/1.1 200 OK · 38 ms</p>
        <p className="mt-2 text-white">{'{ "rows": 1204, "sources": ["snowflake", "postgres"] }'}</p>
        <p className="mt-2 text-[#4be05a]">$ npm run test</p>
        <p>✓ 214 passed</p>
      </div>
    ),
  },
  {
    w: 'narrow',
    className: 'bg-gradient-to-br from-[#0a0a0a] to-[#1d1d1d]',
    content: (
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <p className="font-display text-5xl font-semibold tracking-[-0.04em]">99.9%</p>
        <p className="mt-1 text-xs text-muted">API uptime, last 90 days</p>
        <div className="mt-4 flex h-8 items-end gap-[3px]">
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} className="flex-1 rounded-sm bg-brand-green" style={{ height: `${55 + ((i * 37) % 45)}%` }} />
          ))}
        </div>
      </div>
    ),
  },
];

const rowTwo: Tile[] = [
  {
    w: 'narrow',
    className: 'bg-gradient-to-b from-[#0f5fd8] via-[#1c8cf5] to-[#03205c]',
    content: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute size-44 rounded-full bg-[#67c6ff]/40 blur-2xl" />
        <div className="relative flex size-24 items-center justify-center rounded-full bg-gradient-to-b from-white to-[#cfd8e3] shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
          <svg viewBox="0 0 24 24" className="size-10 text-[#0f5fd8]" fill="none" stroke="currentColor" strokeWidth="2">
            <ellipse cx="12" cy="5" rx="8" ry="3" />
            <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
          </svg>
        </div>
      </div>
    ),
  },
  {
    w: 'wide',
    className: 'bg-[radial-gradient(70%_80%_at_60%_40%,#1235d6_0%,#050a3a_55%,#000_100%)]',
    content: (
      <div className="absolute right-6 top-8 w-[62%] rotate-[8deg] rounded-[26px] border border-white/15 bg-gradient-to-b from-[#2457ff] to-[#0b1a7a] p-5 shadow-[0_30px_60px_rgba(0,0,0,0.6)] sm:right-14">
        <p className="text-[11px] text-white/70">Integrity report · Class 9B</p>
        <p className="mt-2 font-display text-5xl font-semibold tracking-[-0.04em]">92</p>
        <p className="text-xs text-white/70">/100 originality</p>
        <div className="mt-4 space-y-1.5">
          {[88, 64, 92].map((v, i) => (
            <div key={i} className="h-1.5 rounded-full bg-white/15">
              <div className="h-full rounded-full bg-white/80" style={{ width: `${v}%` }} />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    w: 'narrow',
    className: 'bg-gradient-to-b from-[#20b49a] to-[#0b3d35]',
    content: (
      <div className="absolute inset-4 font-mono text-[11px] leading-relaxed text-white/90">
        <p className="text-white/60">-- tenant isolation</p>
        <p>
          <span className="text-[#9ff5e2]">CREATE POLICY</span> tenant_rls
        </p>
        <p>
          <span className="text-[#9ff5e2]">ON</span> reports
        </p>
        <p>
          <span className="text-[#9ff5e2]">USING</span> (tenant_id =
        </p>
        <p className="pl-3">current_setting(</p>
        <p className="pl-6">&apos;app.tenant&apos;));</p>
      </div>
    ),
  },
  {
    w: 'wide',
    className: 'bg-gradient-to-br from-brand-purple via-[#6d28d9] to-[#1e0b4b]',
    content: (
      <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-2 p-8">
        {[...skills, 'Snowflake', 'REST', 'Ollama', 'FAISS'].map((s) => (
          <span key={s} className="rounded-full bg-white/12 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur">
            {s}
          </span>
        ))}
      </div>
    ),
  },
];

function Row({ tiles, reverse, duration }: { tiles: Tile[]; reverse?: boolean; duration: string }) {
  // Two copies side by side; the CSS animation slides the track by exactly one copy.
  const list = [...tiles, ...tiles];
  return (
    <div className="overflow-hidden">
      <div
        className={`marquee flex h-[220px] w-max gap-2.5 sm:h-[420px] ${reverse ? 'marquee-reverse' : ''}`}
        style={{ '--marquee-duration': duration } as React.CSSProperties}
      >
        {list.map((t, i) => (
          <div key={i} className={`relative h-full shrink-0 overflow-hidden rounded-[10px] ${width[t.w]} ${t.className}`}>
            {t.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Showcase() {
  return (
    <div aria-hidden="true" className="marquee-pause space-y-2.5 [mask-image:linear-gradient(to_bottom,black_80%,transparent)]">
      <Row tiles={rowOne} duration="80s" />
      <Row tiles={rowTwo} duration="95s" reverse />
    </div>
  );
}
