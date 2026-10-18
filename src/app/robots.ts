import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/url';

export const dynamic = 'force-static';

// Note: crawlers only read robots.txt at a domain's root. On a project site
// (user.github.io/REPO) this file is informational; the sitemap is still
// discoverable via Search Console.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
