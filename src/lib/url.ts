import { siteConfig } from '@/data/site';

/** Prefix a public/ asset path with the base path (next/link does this itself, plain <a> does not). */
export function asset(path: string) {
  return `${siteConfig.basePath}${path}`;
}

/** Fully-qualified URL for canonical links, sitemap, feeds and JSON-LD. */
export function absoluteUrl(path = '/') {
  return `${siteConfig.url}${path}`;
}

export function isExternal(href: string) {
  return /^(https?:|mailto:)/.test(href);
}
