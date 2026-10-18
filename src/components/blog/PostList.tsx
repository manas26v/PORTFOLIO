import Link from 'next/link';
import { ArrowUpRightIcon } from '@/components/Icons';
import { formatDate, type PostMeta } from '@/lib/blog';

/** Hairline-separated post rows. */
export default function PostList({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) return <p className="reveal text-muted">No posts yet. Check back soon.</p>;
  return (
    <ul className="border-t border-line">
      {posts.map((post) => (
        <li key={post.slug} className="reveal group relative grid gap-2 border-b border-line py-8 md:grid-cols-[200px_1fr_auto] md:gap-10">
          <p className="text-[15px] text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="block text-faint">{post.readingTime}</span>
          </p>
          <div>
            <h3 className="font-display text-2xl font-medium tracking-[-0.02em] sm:text-[28px]">
              <Link href={`/blog/${post.slug}/`} className="after:absolute after:inset-0">
                {post.title}
              </Link>
            </h3>
            <p className="mt-2 max-w-2xl text-muted">{post.description}</p>
          </div>
          <span
            aria-hidden="true"
            className="hidden size-11 items-center justify-center rounded-full border border-line transition-colors group-hover:bg-fg group-hover:text-black md:flex"
          >
            <ArrowUpRightIcon size={16} />
          </span>
        </li>
      ))}
    </ul>
  );
}
