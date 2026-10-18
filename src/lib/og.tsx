import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { siteConfig } from '@/data/site';

// Read once at build time and inlined, since the images are prerendered.
const logo = `data:image/png;base64,${readFileSync(join(process.cwd(), 'public/logo_m_s.png')).toString('base64')}`;

export const ogSize = { width: 1200, height: 630 };

/** Shared 1200×630 social card: logo, eyebrow, title and site URL. */
export function renderOgImage({ eyebrow, title, footer }: { eyebrow: string; title: string; footer?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #18181b 0%, #1f1f23 60%, #1b2433 100%)',
          color: '#f4f4f5',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse only renders plain <img> */}
          <img src={logo} width={96} height={96} alt="" />
          <div style={{ display: 'flex', fontSize: 26, color: '#4d9fff', letterSpacing: 2 }}>{eyebrow.toUpperCase()}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: title.length > 48 ? 60 : 76, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>
            {title}
          </div>
          <div style={{ marginTop: 24, width: 120, height: 6, background: '#4d9fff', borderRadius: 3 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#a1a1aa' }}>
          <span>{siteConfig.name}</span>
          <span>{footer ?? siteConfig.url.replace(/^https?:\/\//, '')}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
