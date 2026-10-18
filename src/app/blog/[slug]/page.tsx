import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { ArrowLeftIcon } from '@/components/Icons';
import { siteConfig } from '@/data/site';
import { formatDate, getAllPosts, getPost } from '@/lib/blog';
import { pageMetadata } from '@/lib/metadata';
import { absoluteUrl } from '@/lib/url';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
    tags: post.tags,
    image: `/blog/${post.slug}/opengraph-image.png`,
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const all = getAllPosts();
  const i = all.findIndex((p) => p.slug === slug);
  const newer = all[i - 1];
  const older = all[i + 1];

  return (
    <article className="mx-auto max-w-3xl pb-16 pt-36 md:pt-44">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          url: absoluteUrl(`/blog/${post.slug}/`),
          image: absoluteUrl(`/blog/${post.slug}/opengraph-image.png`),
          keywords: post.tags.join(', '),
          author: { '@type': 'Person', name: siteConfig.name, url: absoluteUrl('/') },
        }}
      />

      <Link href="/blog/" className="reveal inline-flex items-center gap-2 font-mono text-sm text-accent hover:underline">
        <ArrowLeftIcon size={16} /> All posts
      </Link>

      <header className="mb-12 mt-8 border-b border-line pb-10">
        <div className="reveal flex flex-wrap gap-x-3 gap-y-1 font-mono text-[13px] text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
          {post.updated && (
            <>
              <span aria-hidden="true">·</span>
              <span>
                Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
              </span>
            </>
          )}
        </div>
        <h1 className="reveal mt-4 font-display text-[clamp(34px,6vw,56px)] font-bold leading-[1.08] text-fg">
          {post.title}
        </h1>
        <p className="reveal mt-5 text-xl leading-relaxed text-soft">{post.description}</p>
        {post.tags.length > 0 && (
          <ul className="reveal mt-6 flex flex-wrap gap-2" aria-label="Tags">
            {post.tags.map((t) => (
              <li key={t} className="rounded-full bg-accent-tint px-3 py-1 font-mono text-xs text-accent">
                {t}
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="prose-portfolio" dangerouslySetInnerHTML={{ __html: post.html }} />

      {(newer || older) && (
        <nav aria-label="More posts" className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
          {older ? (
            <Link href={`/blog/${older.slug}/`} className="group rounded border border-line p-5 transition-colors hover:border-accent">
              <span className="font-mono text-xs text-muted">← Older</span>
              <span className="mt-1 block font-mono text-fg group-hover:text-accent">{older.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link href={`/blog/${newer.slug}/`} className="group rounded border border-line p-5 text-right transition-colors hover:border-accent">
              <span className="font-mono text-xs text-muted">Newer →</span>
              <span className="mt-1 block font-mono text-fg group-hover:text-accent">{newer.title}</span>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
