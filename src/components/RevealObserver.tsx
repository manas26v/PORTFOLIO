'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Fades in every `.reveal` element as it scrolls into view, with a small
 * stagger. Mounted once in the root layout and re-run on each navigation.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.visible)'));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' },
    );

    els.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 6) * 0.05}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
