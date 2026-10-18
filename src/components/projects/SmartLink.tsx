import Link from 'next/link';
import type { ComponentProps } from 'react';
import { isExternal } from '@/lib/url';

/** next/link for internal routes, a new-tab <a> for external URLs, plain text when there's no URL. */
export default function SmartLink({
  href,
  children,
  ...props
}: Omit<ComponentProps<'a'>, 'href'> & { href?: string }) {
  if (!href) return <span {...(props as ComponentProps<'span'>)}>{children}</span>;
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
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
