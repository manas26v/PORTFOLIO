'use client';

import { useEffect } from 'react';
import { LOGO_PATH } from './logo-path';

// Matches the CSS: the wipe plays for 2.8s, then the overlay fades out.
const DURATION_MS = 2800;

/**
 * First-visit splash. Visibility is CSS-driven (see .loader in globals.css), so
 * it can never trap the page; this component only locks scrolling while it
 * plays. The inline script in the root layout skips it on repeat visits.
 */
export default function Loader() {
  useEffect(() => {
    if (document.documentElement.classList.contains('loader-seen')) return;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => (document.body.style.overflow = ''), DURATION_MS);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="loader" aria-hidden="true">
      <svg className="h-auto w-[clamp(160px,32vw,240px)]" viewBox="0 0 1024 1024">
        <defs>
          <mask id="loader-paint" maskUnits="userSpaceOnUse">
            <rect className="loader__sweep" x="180" y="160" width="700" height="700" fill="#fff" />
          </mask>
        </defs>
        <g mask="url(#loader-paint)">
          <g transform="translate(0,1024) scale(0.1,-0.1)">
            <path className="loader__path" d={LOGO_PATH} />
          </g>
        </g>
      </svg>
    </div>
  );
}
