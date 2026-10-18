import Link from 'next/link';
import { navLinks, siteConfig, socials } from '@/data/site';
import { RssIcon, socialIcons } from './Icons';

export default function Footer() {
  return (
    <footer className="mx-auto mt-10 flex max-w-5xl flex-col items-center gap-5 px-6 pb-8 pt-10 text-center">
      <nav aria-label="Footer" className="font-mono text-[13px]">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-soft transition-colors hover:text-accent">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <ul className="flex items-center gap-1 text-soft lg:hidden">
        {socials.map((s) => {
          const Icon = socialIcons[s.icon];
          return (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="me noopener noreferrer" aria-label={s.name} className="flex p-2.5 hover:text-accent">
                <Icon />
              </a>
            </li>
          );
        })}
      </ul>
      <p className="flex items-center gap-3 font-mono text-[13px] text-muted">
        <span>Designed &amp; Built by {siteConfig.name}</span>
        <a href={`${siteConfig.basePath}/feed.xml`} aria-label="RSS feed" className="text-soft hover:text-accent">
          <RssIcon size={14} />
        </a>
      </p>
    </footer>
  );
}
