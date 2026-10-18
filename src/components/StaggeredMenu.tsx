/*
 * Mobile navigation with a staggered slide-in, adapted from React Bits'
 * "Staggered Menu" (https://reactbits.dev/components/staggered-menu).
 * Rebuilt with CSS transitions instead of GSAP, keeping the original timing.
 *
 * Copyright (c) 2026 David Haz — MIT + Commons Clause License Condition v1.0.
 * Permission is granted to use, copy, modify, merge, publish and distribute the
 * Software as part of an application, website or product. The above copyright
 * notice and this permission notice shall be included in all copies or
 * substantial portions of the Software. Commons Clause: the components
 * themselves may not be sold, sublicensed or redistributed.
 */

import Link from 'next/link';
import type { CSSProperties, RefObject } from 'react';

type Item = { label: string; href: string };
type Social = { label: string; href: string };

const delay = (s: number) => ({ '--sm-delay': `${s}s` }) as CSSProperties;

// Timeline (seconds), mirroring the original:
// pre-layers start 0.07s apart, the panel follows, then labels rise one by one.
const LAYER_STAGGER = 0.07;
const LAYERS = ['bg-accent', 'bg-surface'];
const PANEL_AT = (LAYERS.length - 1) * LAYER_STAGGER + 0.08;
const PANEL_DURATION = 0.65;
const ITEMS_AT = PANEL_AT + PANEL_DURATION * 0.15;
const SOCIALS_AT = PANEL_AT + PANEL_DURATION * 0.4;

/** The toggle: a rolling "Menu" / "Close" label and a plus that spins into an ×. */
export function StaggeredMenuToggle({
  open,
  onToggle,
  buttonRef,
}: {
  open: boolean;
  onToggle: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onToggle}
      data-open={open || undefined}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      aria-controls="staggered-menu-panel"
      className="sm-toggle"
    >
      <span className="sm-toggle-textWrap" aria-hidden="true">
        {/* Rolls through the alternating labels; open shows the last line. */}
        <span className="sm-toggle-textInner">
          {['Menu', 'Close', 'Menu', 'Close'].map((l, i) => (
            <span key={i} className="sm-toggle-line">
              {l}
            </span>
          ))}
        </span>
      </span>
      <span className="sm-icon" aria-hidden="true">
        <span className="sm-icon-line" />
        <span className="sm-icon-line sm-icon-line-v" />
      </span>
    </button>
  );
}

/** Full-screen panel with the layered, staggered entrance. */
export function StaggeredMenuPanel({
  open,
  items,
  socials,
  footer,
  panelRef,
  currentPath,
}: {
  open: boolean;
  items: Item[];
  socials: Social[];
  footer?: React.ReactNode;
  panelRef: RefObject<HTMLDivElement | null>;
  currentPath: string;
}) {
  return (
    <div className="sm-wrapper md:hidden" data-open={open || undefined}>
      <div className="sm-prelayers" aria-hidden="true">
        {LAYERS.map((bg, i) => (
          <div key={bg} className={`sm-prelayer ${bg}`} style={delay(i * LAYER_STAGGER)} />
        ))}
      </div>

      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="sm-panel"
        style={delay(PANEL_AT)}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile">
          <ul className="sm-panel-list">
            {items.map((it, i) => (
              <li key={it.href} className="sm-panel-itemWrap">
                <Link
                  href={it.href}
                  className="sm-panel-item"
                  aria-current={(it.href === '/' ? currentPath === '/' : currentPath.startsWith(it.href)) ? 'page' : undefined}
                  style={delay(ITEMS_AT + 0.1 + i * 0.08)}
                >
                  <span className="sm-panel-itemLabel" style={delay(ITEMS_AT + i * 0.1)}>
                    {it.label}
                  </span>
                  <span className="sm-panel-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm-socials">
          <h3 className="sm-socials-title" style={delay(SOCIALS_AT)}>
            Socials
          </h3>
          <ul className="sm-socials-list">
            {socials.map((s, i) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(!s.href.startsWith('mailto:') && { target: '_blank', rel: 'me noopener noreferrer' })}
                  className="sm-socials-link"
                  style={delay(SOCIALS_AT + 0.04 + i * 0.08)}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          {footer && (
            <div className="sm-socials-link mt-6" style={delay(SOCIALS_AT + 0.04 + socials.length * 0.08)}>
              {footer}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
