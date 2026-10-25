import { createContext, useContext, type ReactNode } from 'react';

/** When true, panels run off the left edge of the screen (desktop capabilities section). */
export const BleedContext = createContext(false);

/* Product-style UI mockups used as section visuals. Purely decorative. */

export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[10px] border border-panel-line bg-panel ${className}`}>{children}</div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-md bg-surface px-2.5 py-1.5 font-mono text-[12px]">
      <span className="text-faint">{label}</span>
      <span className="truncate text-fg">{value}</span>
    </div>
  );
}

function SideHeader({ tabs, active }: { tabs: string[]; active: number }) {
  return (
    <div className="flex gap-1 border-b border-panel-line p-2.5">
      {tabs.map((t, i) => (
        <span key={t} className={`rounded-md px-2.5 py-1 text-[12px] ${i === active ? 'bg-surface text-fg' : 'text-muted'}`}>
          {t}
        </span>
      ))}
    </div>
  );
}

type Track = {
  /** Long bar on the first row (Tailwind classes for border + fill). */
  lead: { label: string; className: string };
  /** Back-to-back segments on the second row. */
  segments: { labels: string[]; className: string };
};

const ruler = ['0s', '2s', '4s', '6s', '8s', '10s', '12s', '14s'];

/** Editor-style toolbar and timeline shown under the canvas on tall desktop panels. */
function Timeline({ track }: { track: Track }) {
  return (
    <div className="border-t border-panel-line">
      <div className="flex items-center gap-1 px-5 py-3">
        {['M5 3l14 9-14 9V3z', 'M4 6h16M4 12h10M4 18h16', 'M12 3v18M3 12h18', 'M4 4h16v16H4z'].map((d, i) => (
          <span
            key={d}
            className={`flex size-9 items-center justify-center rounded-md ${i === 0 ? 'bg-select/90 text-white' : 'text-muted'}`}
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d={d} />
            </svg>
          </span>
        ))}
        <span className="ml-auto h-1 w-24 rounded-full bg-surface">
          <span className="block h-full w-2/5 rounded-full bg-muted" />
        </span>
      </div>
      <div className="flex justify-between border-y border-panel-line px-5 py-2 font-mono text-[11px] text-faint">
        {ruler.map((r) => (
          <span key={r}>{r}</span>
        ))}
      </div>
      <div className="space-y-2 px-5 py-5 font-mono text-[11px]">
        <div
          className={`flex h-9 w-[86%] items-center rounded-md border-[1.5px] px-3 shadow-[0_0_18px_-6px_currentColor] ${track.lead.className}`}
        >
          {track.lead.label}
        </div>
        <div className="flex w-[86%] gap-1">
          {track.segments.labels.map((l) => (
            <div
              key={l}
              className={`flex h-9 flex-1 items-center rounded-md border-[1.5px] px-3 shadow-[0_0_18px_-6px_currentColor] ${track.segments.className}`}
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Canvas + inspector frame shared by all four visuals. In bleed mode (tall
 * desktop panels) it runs off the left screen edge and adds a timeline.
 */
function Workspace({
  canvas,
  inspector,
  canvasClass,
  track,
}: {
  canvas: ReactNode;
  inspector: ReactNode;
  canvasClass: string;
  track: Track;
}) {
  const bleed = useContext(BleedContext);
  return (
    <Panel
      className={`grid h-full ${bleed ? 'grid-cols-[1fr_300px] rounded-l-none border-l-0' : 'grid-cols-[1fr_minmax(0,230px)] max-sm:grid-cols-1'}`}
    >
      <div className="flex min-h-0 flex-col">
        <div className={`relative min-h-[260px] flex-1 overflow-hidden ${canvasClass}`}>
          {/* In bleed mode the background spans to the screen edge while the mock
              itself stays anchored next to the inspector. */}
          <div className={bleed ? 'absolute inset-y-0 right-0 w-full max-w-[640px]' : 'contents'}>{canvas}</div>
        </div>
        {bleed && (
          <div className="flex justify-end">
            <div className="w-full max-w-[720px]">
              <Timeline track={track} />
            </div>
          </div>
        )}
      </div>
      <div className="border-l border-panel-line max-sm:hidden">{inspector}</div>
    </Panel>
  );
}

export function ChatVisual() {
  return (
    <Workspace
      track={{
        lead: { label: 'POST /chat/:conversationId', className: 'border-brand-orange bg-brand-orange/15 text-brand-orange' },
        segments: { labels: ['auth', 'LLM', 'tool call', 'persist'], className: 'border-select bg-block-blue/25 text-[#7cc4ff]' },
      }}
      canvasClass="bg-[radial-gradient(80%_80%_at_30%_30%,#1e3a8a,#020617)]"
      canvas={
        <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 space-y-3 sm:inset-x-10">
          <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-white/90 px-4 py-2.5 text-[13px] text-black">
            How many orders did EMEA ship last week?
          </div>
          <div className="w-fit rounded-xl border border-white/10 bg-black/60 px-3 py-2 font-mono text-[12px] text-muted backdrop-blur">
            <span className="text-brand-orange">⚙ tool</span> run_query(<span className="text-brand-light-blue">&quot;orders&quot;</span>, region:{' '}
            <span className="text-brand-light-blue">&quot;EMEA&quot;</span>) <span className="text-brand-green">✓</span>
          </div>
          <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-md border border-white/10 bg-black/60 px-4 py-2.5 text-[13px] text-fg backdrop-blur">
            EMEA shipped <span className="text-brand-orange">1,204</span> orders last week — up 8% on the week before.
          </div>
        </div>
      }
      inspector={
        <>
          <SideHeader tabs={['Request', 'Tools']} active={0} />
          <div className="space-y-4 p-3">
            <div className="space-y-1.5">
              <p className="text-[12px] text-muted">Route</p>
              <Field label="POST" value="/chat/:id" />
              <Field label="auth" value="JWT" />
            </div>
            <div className="space-y-1.5">
              <p className="text-[12px] text-muted">Context</p>
              <Field label="workspace" value="from token" />
              <Field label="tools" value="run_query, preview_doc" />
            </div>
            <div className="flex items-center justify-between rounded-md bg-surface px-2.5 py-2 text-[12px]">
              <span className="text-muted">Messages</span>
              <span className="text-fg">persisted</span>
            </div>
          </div>
        </>
      }
    />
  );
}

export function DataVisual() {
  const sources = [
    { name: 'Snowflake', color: 'bg-brand-light-blue' },
    { name: 'PostgreSQL', color: 'bg-brand-dark-blue' },
    { name: 'Excel uploads', color: 'bg-brand-green' },
  ];
  return (
    <Workspace
      track={{
        lead: { label: 'import · Snowflake + Excel', className: 'border-block-green bg-block-green/15 text-brand-green' },
        segments: { labels: ['sync schema', 'import', 'retry', 'done'], className: 'border-brand-light-blue bg-brand-light-blue/15 text-brand-light-blue' },
      }}
      canvasClass="bg-[radial-gradient(80%_80%_at_70%_30%,#064e3b,#020617)]"
      canvas={
        <div className="absolute inset-0 flex items-center justify-center gap-6 p-6">
          <div className="space-y-3">
            {sources.map((s) => (
              <div key={s.name} className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-[13px]">
                <span className={`size-2 rounded-full ${s.color}`} /> {s.name}
              </div>
            ))}
          </div>
          <svg viewBox="0 0 60 120" className="h-28 w-10 text-white/30" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M0 20 C30 20 30 60 60 60 M0 60 H60 M0 100 C30 100 30 60 60 60" strokeDasharray="4 4" />
          </svg>
          <div className="rounded-xl border border-white/15 bg-black/70 px-4 py-3">
            <p className="text-[11px] text-muted">Unified</p>
            <p className="text-sm font-semibold">Reporting API</p>
            <p className="mt-1 flex items-center gap-1.5 text-[11px] text-brand-green">
              <span className="size-1.5 rounded-full bg-brand-green" /> Synced 2 min ago
            </p>
          </div>
        </div>
      }
      inspector={
        <>
          <SideHeader tabs={['Sources', 'Jobs']} active={0} />
          <div className="space-y-1.5 p-3">
            {sources.map((s) => (
              <div key={s.name} className="flex items-center justify-between rounded-md bg-surface px-2.5 py-2 text-[12px]">
                <span className="flex items-center gap-2">
                  <span className={`size-1.5 rounded-full ${s.color}`} />
                  {s.name}
                </span>
                <span className="text-brand-green">●</span>
              </div>
            ))}
            <p className="pt-3 text-[12px] text-muted">Schedule</p>
            <Field label="cron" value="*/15 * * * *" />
          </div>
        </>
      }
    />
  );
}

export function SecurityVisual() {
  return (
    <Workspace
      track={{
        lead: { label: 'request · workspace=acme', className: 'border-brand-pink bg-block-pink/20 text-brand-pink' },
        segments: { labels: ['JWT', 'RBAC', 'RLS check', 'rows'], className: 'border-brand-purple bg-block-indigo/30 text-[#c4b5fd]' },
      }}
      canvasClass="bg-[radial-gradient(80%_80%_at_40%_30%,#4c1d95,#020617)]"
      canvas={
        <div className="absolute inset-x-6 top-1/2 grid -translate-y-1/2 grid-cols-2 gap-3 sm:inset-x-10">
          {[
            ['acme', 'bg-brand-pink'],
            ['globex', 'bg-brand-light-blue'],
          ].map(([tenant, color]) => (
            <div key={tenant} className="rounded-xl border border-white/10 bg-black/60 p-4">
              <p className="flex items-center gap-2 text-[12px] text-muted">
                <span className={`size-2 rounded-full ${color}`} /> workspace
              </p>
              <p className="mt-1 text-sm font-semibold">{tenant}</p>
              <div className="mt-4 space-y-1.5">
                {[70, 52, 84].map((w, i) => (
                  <div key={i} className="h-2 rounded-full bg-white/10">
                    <div className={`h-full rounded-full ${color} opacity-70`} style={{ width: `${w}%` }} />
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[11px] text-muted">Sees only its own rows</p>
            </div>
          ))}
        </div>
      }
      inspector={
        <>
          <SideHeader tabs={['Policy', 'Roles']} active={0} />
          <div className="p-3 font-mono text-[11.5px] leading-relaxed text-muted">
            <p>
              <span className="text-brand-pink">ALTER TABLE</span> reports
            </p>
            <p className="pl-3">
              <span className="text-brand-pink">ENABLE ROW LEVEL SECURITY</span>;
            </p>
            <p className="mt-2">
              <span className="text-brand-pink">CREATE POLICY</span> tenant_isolation
            </p>
            <p className="pl-3">
              <span className="text-brand-pink">USING</span> (tenant_id =
            </p>
            <p className="pl-6 text-fg">current_tenant());</p>
          </div>
        </>
      }
    />
  );
}

export function UsageVisual() {
  const quota = 50000;
  const rows = [
    { label: 'workspace · acme', tokens: 41200, color: 'border-block-pink bg-block-pink/25' },
    { label: 'workspace · globex', tokens: 27800, color: 'border-block-indigo bg-block-indigo/30' },
    { label: 'workspace · initech', tokens: 16400, color: 'border-block-blue bg-block-blue/30' },
    { label: 'workspace · umbrella', tokens: 6900, color: 'border-block-green bg-block-green/25' },
  ];
  return (
    <Workspace
      track={{
        lead: { label: 'LLM call · 1,284 tokens', className: 'border-select bg-block-blue/25 text-[#7cc4ff]' },
        segments: { labels: ['count', 'attribute', 'check quota', 'record'], className: 'border-block-green bg-block-green/15 text-brand-green' },
      }}
      canvasClass="bg-panel"
      canvas={
        <div className="absolute inset-6 flex flex-col justify-center gap-3 sm:inset-10">
          <div className="mb-2 flex justify-between font-mono text-[11px] text-faint">
            <span>0</span>
            <span>25k</span>
            <span>50k tokens · quota</span>
          </div>
          {rows.map((r) => (
            <div key={r.label}>
              <p className="mb-1 font-mono text-[11px] text-faint">{r.label}</p>
              <div className="flex items-center gap-3">
                <div
                  className={`h-7 rounded-md border-[1.5px] shadow-[0_0_18px_-4px_currentColor] ${r.color}`}
                  style={{ width: `${Math.max((r.tokens / quota) * 100, 6)}%` }}
                />
                <span className="shrink-0 font-mono text-[12px] text-muted">{Math.round((r.tokens / quota) * 100)}%</span>
              </div>
            </div>
          ))}
        </div>
      }
      inspector={
        <>
          <SideHeader tabs={['Usage', 'Quotas']} active={0} />
          <div className="space-y-1.5 p-3">
            {rows.map((r) => (
              <div key={r.label} className="flex justify-between rounded-md bg-surface px-2.5 py-2 text-[12px]">
                <span className="text-muted">{r.label.replace('workspace · ', '')}</span>
                <span>{(r.tokens / 1000).toFixed(1)}k</span>
              </div>
            ))}
            <p className="pt-3 text-[12px] text-brand-orange">acme · 82% of quota</p>
          </div>
        </>
      }
    />
  );
}
