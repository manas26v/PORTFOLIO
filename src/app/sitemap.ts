import type { MetadataRoute } from 'next';
import { detailedProjects } from '@/data/projects';
import { getAllPosts } from '@/lib/blog';
import { absoluteUrl } from '@/lib/url';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ['/', '/about/', '/projects/', '/blog/', '/contact/'].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.8,
  }));
  const projects = detailedProjects.map((p) => ({
    url: absoluteUrl(`/projects/${p.slug}/`),
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));
  const posts = getAllPosts().map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}/`),
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));
  return [...pages, ...projects, ...posts];
}
