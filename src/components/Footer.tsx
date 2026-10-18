import Image from 'next/image';
import Link from 'next/link';
import { featuredProjects, projectHref } from '@/data/projects';
import { siteConfig, socials } from '@/data/site';
import { getAllPosts } from '@/lib/blog';
import { asset } from '@/lib/url';
import logo from '@/assets/logo.png';
import { RssIcon, socialIcons } from './Icons';
import SmartLink from './projects/SmartLink';

type Item = { label: string; href?: string };

export default function Footer() {
  const columns: { title: string; items: Item[] }[] = [
    {
      title: 'Pages',
      items: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about/' },
        { label: 'Projects', href: '/projects/' },
        { label: 'Blog', href: '/blog/' },
        { label: 'Contact', href: '/contact/' },
      ],
    },
    {
      title: 'Projects',
      items: featuredProjects.map((p) => ({ label: p.title, href: projectHref(p) })),
    },
    {
      title: 'Writing',
      items: [
        ...getAllPosts()
          .slice(0, 4)
          .map((p) => ({ label: p.title, href: `/blog/${p.slug}/` })),
        { label: 'RSS feed', href: '/feed.xml' },
      ],
    },
    {
      title: 'Connect',
      items: [
        { label: 'Email', href: `mailto:${siteConfig.email}` },
        ...socials.map((s) => ({ label: s.name, href: s.url })),
        { label: 'Résumé', href: siteConfig.resume },
      ],
    },
  ];

  return (
    <footer className="container-x pb-10 pt-20">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_repeat(4,minmax(0,1fr))]">
        <Link href="/" aria-label={`${siteConfig.name} — home`} className="self-start">
          <Image src={logo} alt="" width={28} height={28} className="size-7" />
        </Link>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-[15px] font-medium text-fg">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.items.map((item) => (
                <li key={item.label}>
                  <SmartLink
                    href={item.href}
                    className="text-[15px] text-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mt-20 flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="text-[15px] text-faint">
          © {new Date().getFullYear()} {siteConfig.name}. Designed &amp; built by me.
        </p>
        <ul className="-mx-2 flex items-center">
          {socials.map((s) => {
            const Icon = socialIcons[s.icon];
            return (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="me noopener noreferrer"
                  aria-label={s.name}
                  className="flex p-2 text-muted transition-colors hover:text-fg"
                >
                  <Icon size={18} />
                </a>
              </li>
            );
          })}
          <li>
            <a href={asset('/feed.xml')} aria-label="RSS feed" className="flex p-2 text-muted transition-colors hover:text-fg">
              <RssIcon size={18} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
