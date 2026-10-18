import { formatDate, getAllPosts } from '@/lib/blog';
import { ogSize, renderOgImage } from '@/lib/og';

export const dynamic = 'force-static';
export const dynamicParams = false;
export const alt = 'Blog post';
export const size = ogSize;
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug)!;
  return renderOgImage({ eyebrow: 'Blog', title: post.title, footer: `${formatDate(post.date)} · ${post.readingTime}` });
}
