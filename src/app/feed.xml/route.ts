import { siteConfig } from '@/data/site';
import { getAllPosts } from '@/lib/blog';
import { absoluteUrl } from '@/lib/url';

export const dynamic = 'force-static';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
  const posts = getAllPosts();
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${absoluteUrl(`/blog/${p.slug}/`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/blog/${p.slug}/`)}</guid>
      <description>${esc(p.description)}</description>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
${p.tags.map((t) => `      <category>${esc(t)}</category>`).join('\n')}
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(siteConfig.name)} — Blog</title>
    <link>${absoluteUrl('/blog/')}</link>
    <description>${esc(siteConfig.description)}</description>
    <language>en</language>
    <atom:link href="${absoluteUrl('/feed.xml')}" rel="self" type="application/rss+xml" />
${posts[0] ? `    <lastBuildDate>${new Date(`${posts[0].date}T00:00:00Z`).toUTCString()}</lastBuildDate>\n` : ''}${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
