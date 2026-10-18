import Link from 'next/link';
import type { ComponentProps } from 'react';
import { asset, isExternal } from '@/lib/url';

/**
 * One link component for every kind of href:
 * - external URLs / mailto → new-tab <a>
 * - static files in public/ (anything with an extension) → <a> with the base path added
 * - app routes → next/link (which adds the base path itself)
 * - no href → plain text
 */
export default function SmartLink({
  href,
  children,
  ...props
}: Omit<ComponentProps<'a'>, 'href'> & { href?: string }) {
  if (!href) return <span {...(props as ComponentProps<'span'>)}>{children}</span>;
  if (isExternal(href)) {
    const newTab = !href.startsWith('mailto:');
    return (
      <a href={href} {...(newTab && { target: '_blank', rel: 'noopener noreferrer' })} {...props}>
        {children}
      </a>
    );
  }
  if (/\.[a-z0-9]+$/i.test(href)) {
    return (
      <a href={asset(href)} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
