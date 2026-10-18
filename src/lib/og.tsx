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
          background: 'radial-gradient(60% 70% at 50% 120%, #1d3fb8 0%, #000 70%)',
          color: '#fafafa',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse only renders plain <img> */}
          <img src={logo} width={96} height={96} alt="" />
          <div style={{ display: 'flex', fontSize: 22, color: '#000', background: '#fafafa', borderRadius: 999, padding: '8px 22px' }}>{eyebrow}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: title.length > 48 ? 64 : 82, fontWeight: 700, lineHeight: 1, letterSpacing: -3, maxWidth: 1000 }}>
            {title}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#a3a3a3' }}>
          <span>{siteConfig.name}</span>
          <span>{footer ?? siteConfig.url.replace(/^https?:\/\//, '')}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
