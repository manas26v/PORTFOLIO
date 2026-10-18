import { siteConfig } from '@/data/site';
import { ogSize, renderOgImage } from '@/lib/og';

export const dynamic = 'force-static';
export const alt = siteConfig.title;
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return renderOgImage({ eyebrow: siteConfig.jobTitle, title: 'Building reliable systems behind great products.' });
}
