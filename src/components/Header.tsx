'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navLinks, siteConfig } from '@/data/site';
import { asset } from '@/lib/url';
import logo from '@/assets/logo.png';

const DELTA = 5;
const SCROLL_THRESHOLD = 50;

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScroll = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu whenever the route changes.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMenuOpen(false);
  }

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > SCROLL_THRESHOLD);
      if (Math.abs(lastScroll.current - y) > DELTA) {
        setHidden(y > lastScroll.current && y > SCROLL_THRESHOLD);
        lastScroll.current = y;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: lock + blur the page, close on Escape, keep focus inside.
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

  const isActive = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 px-6 transition-all duration-300 ease-smooth sm:px-10 lg:px-12',
        scrolled ? 'h-[70px] bg-bg/85 shadow-panel backdrop-blur-md' : 'h-[100px]',
        hidden && !menuOpen ? '-translate-y-full' : '',
      ].join(' ')}
    >
      <nav className="flex h-full items-center justify-between font-mono text-fg" aria-label="Main">
        <Link href="/" aria-label={`${siteConfig.name} — home`} className="group block size-11 shrink-0">
          <Image
            src={logo}
            alt=""
            width={44}
            height={44}
            priority
            className="size-full object-contain transition-transform duration-300 ease-smooth group-hover:scale-110"
          />
        </Link>

        <div
          id="nav-menu"
          ref={menuRef}
          className={[
            'flex items-center',
            // Mobile: slide-in drawer
            'max-md:fixed max-md:inset-y-0 max-md:right-0 max-md:z-40 max-md:h-dvh max-md:w-[min(75vw,400px)] max-md:flex-col max-md:justify-center max-md:bg-surface max-md:px-2.5 max-md:shadow-[-10px_0_30px_-15px_rgb(0_0_0/0.7)] max-md:transition-all max-md:duration-300 max-md:ease-smooth',
            menuOpen ? 'max-md:visible max-md:translate-x-0' : 'max-md:invisible max-md:translate-x-full',
          ].join(' ')}
        >
          <ol className="flex items-center max-md:w-full max-md:flex-col">
            {navLinks.map((link, i) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="mx-1 text-[13px] max-md:mx-0 max-md:mb-5 max-md:text-lg">
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`group relative block p-2.5 text-center transition-colors hover:text-accent ${active ? 'text-accent' : ''}`}
                  >
                    <span className="mr-1 text-accent max-md:mb-1 max-md:mr-0 max-md:block max-md:text-sm">
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-2.5 bottom-1 h-px origin-left bg-accent transition-transform duration-300 ease-smooth max-md:hidden ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                    />
                  </Link>
                </li>
              );
            })}
          </ol>
          <a
            href={asset(siteConfig.resume)}
            className="btn btn-sm ml-4 max-md:mx-auto max-md:mt-8 max-md:px-12 max-md:py-4 max-md:text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="relative z-50 -mr-3 flex p-3 md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="relative block h-6 w-[30px]">
            <span
              className={`absolute left-0 h-0.5 w-[30px] rounded bg-accent transition-all duration-200 ${menuOpen ? 'top-1/2 rotate-45' : 'top-0.5'}`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 rounded bg-accent transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`absolute left-0 h-0.5 w-[30px] rounded bg-accent transition-all duration-200 ${menuOpen ? 'top-1/2 -rotate-45' : 'bottom-0.5'}`}
            />
          </span>
        </button>
      </nav>
    </header>
  );
}
