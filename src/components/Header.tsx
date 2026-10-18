'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navLinks, siteConfig, socials } from '@/data/site';
import { asset } from '@/lib/url';
import logo from '@/assets/logo.png';
import { StaggeredMenuPanel, StaggeredMenuToggle } from './StaggeredMenu';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close the mobile menu whenever the route changes.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: lock the page, close on Escape, keep focus inside.
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !menuRef.current) return;
      const focusable = [toggleRef.current, ...menuRef.current.querySelectorAll<HTMLElement>('a')].filter(
        (el): el is HTMLElement => Boolean(el),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled && !menuOpen ? 'bg-black/70 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between" aria-label="Main">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${siteConfig.name} — home`}>
            <Image src={logo} alt="" width={24} height={24} priority className="size-6" />
            <span className="text-[17px] font-semibold tracking-[-0.01em]">{siteConfig.shortName}</span>
          </Link>

          <div className="hidden items-center md:flex">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`text-[15px] transition-colors hover:text-fg ${isActive(link.href) ? 'text-fg' : 'text-muted'}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <span aria-hidden="true" className="mx-6 h-6 w-px bg-line" />
            <a
              href={`mailto:${siteConfig.email}`}
              className="mr-5 text-[15px] text-muted transition-colors hover:text-fg"
            >
              Email
            </a>
            <a href={asset(siteConfig.resume)} target="_blank" rel="noopener noreferrer" className="pill-light">
              Resume
            </a>
          </div>

          <div className="md:hidden">
            <StaggeredMenuToggle open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} buttonRef={toggleRef} />
          </div>
        </nav>
      </header>

      {/* Sibling of <header>, not a child: the header's backdrop-filter would
          otherwise become the containing block and clip this fixed panel. */}
      <StaggeredMenuPanel
        open={menuOpen}
        panelRef={menuRef}
        currentPath={pathname}
        items={[{ label: 'Home', href: '/' }, ...navLinks.map((l) => ({ label: l.label, href: l.href }))]}
        socials={[
          ...socials.map((s) => ({ label: s.name, href: s.url })),
          { label: 'Email', href: `mailto:${siteConfig.email}` },
        ]}
        footer={
          <a href={asset(siteConfig.resume)} target="_blank" rel="noopener noreferrer" className="pill-light">
            Download résumé
          </a>
        }
      />
    </>
  );
}
