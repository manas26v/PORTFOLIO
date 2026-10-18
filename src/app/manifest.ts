import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: `${siteConfig.basePath}/`,
    display: 'standalone',
    background_color: '#18181b',
    theme_color: '#18181b',
    icons: [{ src: `${siteConfig.basePath}/logo_m_s.png`, sizes: '654x654', type: 'image/png', purpose: 'any' }],
  };
}
