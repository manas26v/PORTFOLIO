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

/** Canvas on the left, inspector on the right — the frame shared by all four visuals. */
function Workspace({ canvas, inspector, canvasClass }: { canvas: ReactNode; inspector: ReactNode; canvasClass: string }) {
  const bleed = useContext(BleedContext);
  return (
    <Panel
      className={`grid h-full grid-cols-[1fr_minmax(0,230px)] max-sm:grid-cols-1 ${bleed ? 'rounded-l-none border-l-0' : ''}`}
    >
      <div className={`relative min-h-[260px] overflow-hidden ${canvasClass}`}>
        {/* In bleed mode the background spans to the screen edge while the mock
            itself stays anchored next to the inspector. */}
        <div className={bleed ? 'absolute inset-y-0 right-0 w-full max-w-[640px]' : 'contents'}>{canvas}</div>
      </div>
      <div className="border-l border-panel-line max-sm:hidden">{inspector}</div>
    </Panel>
  );
}

export function ApiVisual() {
  return (
    <Workspace
      canvasClass="bg-[radial-gradient(80%_80%_at_30%_30%,#1e3a8a,#020617)]"
      canvas={
        <div className="absolute inset-6 rounded-xl border border-white/10 bg-black/60 p-5 font-mono text-[13px] leading-relaxed backdrop-blur sm:inset-10">
          <p>
            <span className="rounded bg-brand-green/20 px-1.5 text-brand-green">GET</span>{' '}
            <span className="text-fg">/api/v1/reports/:id</span>
          </p>
          <p className="mt-3 text-faint">{'// 200 OK · 41 ms'}</p>
          <p className="text-muted">{'{'}</p>
          <p className="pl-4 text-muted">
            &quot;id&quot;: <span className="text-brand-light-blue">&quot;rpt_1042&quot;</span>,
          </p>
          <p className="pl-4 text-muted">
            &quot;status&quot;: <span className="text-brand-light-blue">&quot;ready&quot;</span>,
          </p>
          <p className="pl-4 text-muted">
            &quot;rows&quot;: <span className="text-brand-orange">1204</span>
          </p>
          <p className="text-muted">{'}'}</p>
        </div>
      }
      inspector={
        <>
          <SideHeader tabs={['Request', 'Schema']} active={0} />
          <div className="space-y-4 p-3">
            <div className="space-y-1.5">
              <p className="text-[12px] text-muted">Route</p>
              <Field label="GET" value="/reports/:id" />
              <Field label="auth" value="bearer" />
            </div>
            <div className="space-y-1.5">
              <p className="text-[12px] text-muted">Validation</p>
              <Field label="id" value="string · required" />
              <Field label="tenant" value="from token" />
            </div>
            <div className="flex items-center justify-between rounded-md bg-surface px-2.5 py-2 text-[12px]">
              <span className="text-muted">Rate limit</span>
              <span className="text-fg">100 / min</span>
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
      canvasClass="bg-[radial-gradient(80%_80%_at_40%_30%,#4c1d95,#020617)]"
      canvas={
        <div className="absolute inset-6 grid grid-cols-2 gap-3 sm:inset-10">
          {[
            ['acme', 'bg-brand-pink'],
            ['globex', 'bg-brand-light-blue'],
          ].map(([tenant, color]) => (
            <div key={tenant} className="rounded-xl border border-white/10 bg-black/60 p-4">
              <p className="flex items-center gap-2 text-[12px] text-muted">
                <span className={`size-2 rounded-full ${color}`} /> tenant
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

export function PerformanceVisual() {
  const bars = [
    { label: 'Before', ms: 820, color: 'border-block-pink bg-block-pink/25' },
    { label: 'Index', ms: 310, color: 'border-block-indigo bg-block-indigo/30' },
    { label: 'Query plan', ms: 140, color: 'border-block-blue bg-block-blue/30' },
    { label: 'Cache', ms: 38, color: 'border-block-green bg-block-green/25' },
  ];
  return (
    <Workspace
      canvasClass="bg-panel"
      canvas={
        <div className="absolute inset-6 flex flex-col justify-center gap-3 sm:inset-10">
          <div className="mb-2 flex justify-between font-mono text-[11px] text-faint">
            <span>0 ms</span>
            <span>400</span>
            <span>800</span>
          </div>
          {bars.map((b) => (
            <div key={b.label} className="flex items-center gap-3">
              <div
                className={`h-9 rounded-md border-[1.5px] shadow-[0_0_18px_-4px_currentColor] ${b.color}`}
                style={{ width: `${Math.max((b.ms / 820) * 100, 6)}%` }}
              />
              <span className="shrink-0 font-mono text-[12px] text-muted">{b.ms} ms</span>
            </div>
          ))}
        </div>
      }
      inspector={
        <>
          <SideHeader tabs={['Profile', 'Plan']} active={0} />
          <div className="space-y-1.5 p-3">
            {bars.map((b) => (
              <div key={b.label} className="flex justify-between rounded-md bg-surface px-2.5 py-2 text-[12px]">
                <span className="text-muted">{b.label}</span>
                <span>{b.ms} ms</span>
              </div>
            ))}
            <p className="pt-3 text-[12px] text-brand-green">p95 down 95%</p>
          </div>
        </>
      }
    />
  );
}
