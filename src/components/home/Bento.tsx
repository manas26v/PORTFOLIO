import { jobs, skills } from '@/data/experience';

const job = jobs[0];

const orbs = [
  'from-[#ff8a5b] to-[#b5361b]',
  'from-[#7ee2c0] to-[#1f7a63]',
  'from-[#a78bfa] to-[#3b2a6d]',
  'from-[#60a5fa] to-[#1e3a8a]',
];

/** Bento grid of small visual cells about day-to-day work. */
export default function Bento() {
  return (
    <section aria-labelledby="bento-heading" className="container-x py-20 md:py-28">
      <h2 id="bento-heading" className="display-lg reveal max-w-[12ch]">
        Shipping to production, every day
      </h2>

      <div className="frame reveal mt-14 grid lg:grid-cols-3">
        {/* Timeline */}
        <div className="border-line p-6 sm:p-9 lg:col-span-2 lg:border-r">
          <div aria-hidden="true" className="relative h-52 overflow-hidden">
            <div className="absolute inset-x-0 top-0 flex justify-between font-mono text-[11px] text-faint">
              <span>2024</span>
              <span>2025</span>
              <span>2026</span>
              <span>Next</span>
            </div>
            <div className="absolute bottom-0 left-[38%] top-5 w-px bg-select" />
            <span className="absolute left-[38%] top-5 -translate-x-1/2 rounded bg-select px-1.5 py-0.5 font-mono text-[11px]">
              Dec 2024
            </span>
            {[
              { left: '38%', width: '62%', top: 58, c: 'border-block-pink bg-block-pink/20' },
              { left: '44%', width: '56%', top: 92, c: 'border-block-indigo bg-block-indigo/25' },
              { left: '52%', width: '48%', top: 126, c: 'border-block-blue bg-block-blue/25' },
              { left: '60%', width: '40%', top: 160, c: 'border-block-green bg-block-green/20' },
            ].map((b, i) => (
              <div
                key={i}
                className={`absolute h-7 rounded-md border-[1.5px] shadow-[0_0_16px_-6px_currentColor] ${b.c}`}
                style={{ left: b.left, width: b.width, top: b.top }}
              />
            ))}
          </div>
          <p className="mt-8 text-[13px] font-medium text-muted">Experience</p>
          <p className="mt-1.5 max-w-lg text-lg leading-snug">
            {job.title} at {job.company} since {job.range.split(/\s[–-]\s/)[0]}: the Breww.ai chat backend, LLM tool
            execution and multi-tenant access control.
          </p>
        </div>

        {/* Notifications */}
        <div className="border-t border-line p-6 sm:p-9 lg:border-t-0">
          <div aria-hidden="true" className="flex h-52 flex-col justify-center gap-3">
            {[
              ['Tests passed', 'bg-block-green'],
              ['RLS policy applied', 'bg-block-indigo'],
              ['Deployed to production', 'bg-block-pink'],
            ].map(([text, color], i) => (
              <div
                key={text}
                className={`flex w-max items-center gap-2.5 rounded-lg border border-panel-line bg-surface py-2 pl-2 pr-4 text-[14px] ${i === 2 ? 'outline outline-1 outline-offset-4 outline-select' : ''}`}
              >
                <span className={`flex size-7 items-center justify-center rounded-md ${color}`}>
                  <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="white" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {text}
              </div>
            ))}
          </div>
          <p className="mt-8 text-[13px] font-medium text-muted">Shipping</p>
          <p className="mt-1.5 text-lg leading-snug">Reviewed, tested and released with care.</p>
        </div>

        {/* Curve */}
        <div className="border-t border-line p-6 sm:p-9 lg:border-r">
          <div aria-hidden="true" className="relative h-52">
            <svg viewBox="0 0 300 200" className="size-full" fill="none">
              <defs>
                <filter id="bento-glow">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
              </defs>
              <path d="M20 40 C 140 40, 150 170, 280 170" stroke="#2f8cff" strokeWidth="6" opacity="0.5" filter="url(#bento-glow)" />
              <path d="M20 40 C 140 40, 150 170, 280 170" stroke="#2f8cff" strokeWidth="2.5" />
              <circle cx="20" cy="40" r="5" fill="#000" stroke="#777" />
              <circle cx="280" cy="170" r="9" fill="#2f8cff" />
            </svg>
            <span className="absolute left-0 top-0 font-mono text-[11px] text-faint">failed imports</span>
          </div>
          <p className="mt-8 text-[13px] font-medium text-muted">Reliability</p>
          <p className="mt-1.5 text-lg leading-snug">Schema sync and automated retries cut failed data imports by 40%.</p>
        </div>

        {/* Toolbox */}
        <div className="border-t border-line p-6 sm:p-9 lg:col-span-2">
          <ul aria-label="Core skills" className="grid min-h-52 grid-cols-2 content-center gap-x-4 gap-y-4 sm:gap-x-8">
            {skills.slice(0, 6).map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                <span aria-hidden="true" className={`size-9 shrink-0 rounded-full bg-gradient-to-br ${orbs[i % orbs.length]}`} />
                <span className="text-[15px]">{s}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[13px] font-medium text-muted">Toolbox</p>
          <p className="mt-1.5 max-w-lg text-lg leading-snug">
            The stack I reach for daily, from NestJS services and React to PostgreSQL and Redis.
          </p>
        </div>
      </div>
    </section>
  );
}
