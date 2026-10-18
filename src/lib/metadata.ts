import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import { absoluteUrl } from './url';

type PageMeta = {
  title?: string;
  description?: string;
  /** Route path with trailing slash, e.g. "/about/". */
  path: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  /** Path of a page-specific OG image; defaults to the site-wide one. */
  image?: string;
};

/** Canonical URL, Open Graph and Twitter tags for a page, all absolute. */
export function pageMetadata({
  title,
  description = siteConfig.description,
  path,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
  image = '/opengraph-image.png',
}: PageMeta): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const url = absoluteUrl(path);
  const images = [{ url: absoluteUrl(image), width: 1200, height: 630, alt: fullTitle }];

  return {
    ...(title ? { title } : { title: { absolute: siteConfig.title } }),
    description,
    // Child metadata replaces (not merges) `alternates`, so the feed link is repeated here.
    alternates: {
      canonical: url,
      types: { 'application/rss+xml': [{ url: absoluteUrl('/feed.xml'), title: `${siteConfig.name} — Blog` }] },
    },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: 'en_US',
      images,
      ...(type === 'article' && { publishedTime, modifiedTime, authors: [siteConfig.name], tags }),
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: images.map((i) => i.url) },
  };
}
