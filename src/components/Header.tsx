'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navLinks, siteConfig } from '@/data/site';
import { asset } from '@/lib/url';
import logo from '@/assets/logo.png';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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
          scrolled || menuOpen ? 'bg-black/70 backdrop-blur-xl' : 'bg-transparent'
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

          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 flex size-10 items-center justify-center md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 h-[1.5px] w-5 rounded bg-fg transition-all duration-300 ${menuOpen ? 'top-1/2 rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-5 rounded bg-fg transition-all duration-300 ${menuOpen ? 'top-1/2 -rotate-45' : 'top-full'}`}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Sibling of <header>, not a child: the header's backdrop-filter would
          otherwise become the containing block and clip this fixed panel. */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`fixed inset-x-0 bottom-0 top-16 z-40 bg-black transition-all duration-300 ease-smooth md:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <ul className="container-x flex flex-col pt-4">
          {navLinks.map((link) => (
            <li key={link.href} className="border-b border-line">
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className="block py-4 font-display text-3xl font-semibold tracking-[-0.03em]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="container-x mt-8 flex gap-3">
          <a href={asset(siteConfig.resume)} target="_blank" rel="noopener noreferrer" className="pill-light">
            Resume
          </a>
          <a href={`mailto:${siteConfig.email}`} className="pill-dark">
            Email me
          </a>
        </div>
      </div>
    </>
  );
}
