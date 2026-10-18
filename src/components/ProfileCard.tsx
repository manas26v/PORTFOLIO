'use client';

/*
 * Holographic profile card with spring-based 3D tilt, adapted from React Bits'
 * "Profile Card" (https://reactbits.dev/components/profile-card). Ported to
 * TypeScript; the intro animation now waits until the card scrolls into view.
 *
 * Copyright (c) 2026 David Haz — MIT + Commons Clause License Condition v1.0.
 * Permission is granted to use, copy, modify, merge, publish and distribute the
 * Software as part of an application, website or product. The above copyright
 * notice and this permission notice shall be included in all copies or
 * substantial portions of the Software. Commons Clause: the components
 * themselves may not be sold, sublicensed or redistributed.
 */

import Link from 'next/link';
import { memo, useEffect, useRef, type CSSProperties } from 'react';
import { MailIcon } from './Icons';
import './ProfileCard.css';

// Dark theme + dark foil from the original.
const THEME = {
  '--pc-frame': 'rgba(38, 35, 46, 0.66)',
  '--pc-frame-edge': 'rgba(255, 255, 255, 0.08)',
  '--pc-frame-highlight': 'rgba(255, 255, 255, 0.07)',
  '--pc-frame-shadow': '0 22px 44px -20px rgba(0, 0, 0, 0.8), 0 6px 16px -8px rgba(0, 0, 0, 0.5)',
  '--pc-tile': 'linear-gradient(180deg, #3a3644 0%, #27242f 100%)',
  '--pc-tile-edge': 'rgba(255, 255, 255, 0.07)',
  '--pc-tile-highlight': 'rgba(255, 255, 255, 0.12)',
  '--pc-tile-shadow': '0 4px 10px -4px rgba(0, 0, 0, 0.7)',
  '--pc-ink': '#f4f4f5',
  '--pc-muted': 'rgba(244, 244, 245, 0.6)',
  '--pc-hover': 'brightness(1.12)',
  '--pc-press': 'brightness(0.8)',
  '--pc-shade': 'rgba(0, 0, 0, 0.4)',
  '--pc-blend': 'color-dodge',
  '--pc-holo-filter': 'hue-rotate(0deg)',
  '--pc-sheen': 'rgba(255, 255, 255, 0.16)',
};

const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='500' height='500'><filter id='g' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0.55 0 0 0 -0.24 0.55 0 0 0 -0.24 0.55 0 0 0 -0.24 0 0 0 0 1'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>",
)}")`;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

type Props = {
  avatarUrl: string;
  /** Image used as the holographic foil pattern. */
  iconUrl?: string;
  miniAvatarUrl?: string;
  name: string;
  title: string;
  handle?: string;
  status?: string;
  statusColor?: string;
  contactText?: string;
  contactHref: string;
  radius?: number;
  holo?: number;
  glare?: number;
  tiltStrength?: number;
  parallax?: number;
  className?: string;
};

function ProfileCard({
  avatarUrl,
  iconUrl,
  miniAvatarUrl,
  name,
  title,
  handle,
  status,
  statusColor = '#22c55e',
  contactText = 'Contact',
  contactHref,
  radius = 16,
  holo = 0.8,
  glare = 0.5,
  tiltStrength = 12,
  parallax = 8,
  className = '',
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef({ tiltStrength, parallax });

  useEffect(() => {
    settingsRef.current = { tiltStrength, parallax };
  }, [tiltStrength, parallax]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const size = { width: root.offsetWidth, height: root.offsetHeight };
    // Spring state per axis: position, velocity, target (all in -1..1).
    const x = { p: 0, v: 0, target: 0 };
    const y = { p: 0, v: 0, target: 0 };
    const light = { p: 0, target: 0 };
    let raf = 0;
    let last = 0;
    let slowUntil = 0;
    let touchId: number | null = null;

    const write = () => {
      const { tiltStrength: strength, parallax: depth } = settingsRef.current;
      const angle = reduced ? 0 : strength;
      const tilt = Math.min(1, Math.hypot(x.p, y.p));
      const style = root.style;
      style.setProperty('--pc-light-x', `${((x.p + 1) * 0.5 * size.width).toFixed(1)}px`);
      style.setProperty('--pc-light-y', `${((y.p + 1) * 0.5 * size.height).toFixed(1)}px`);
      style.setProperty('--pc-pointer-x', `${((x.p + 1) * 50).toFixed(2)}%`);
      style.setProperty('--pc-pointer-y', `${((y.p + 1) * 50).toFixed(2)}%`);
      style.setProperty('--pc-band-x', `${(50 + x.p * 15).toFixed(2)}%`);
      style.setProperty('--pc-band-y', `${(50 + y.p * 15).toFixed(2)}%`);
      style.setProperty('--pc-rotate-x', `${(y.p * angle).toFixed(3)}deg`);
      style.setProperty('--pc-rotate-y', `${(-x.p * angle).toFixed(3)}deg`);
      style.setProperty('--pc-shift-x', `${(x.p * (reduced ? 0 : depth)).toFixed(2)}px`);
      style.setProperty('--pc-shift-y', `${(y.p * (reduced ? 0 : depth)).toFixed(2)}px`);
      style.setProperty('--pc-reach', tilt.toFixed(4));
      style.setProperty('--pc-tilt', (tilt * light.p).toFixed(4));
      style.setProperty('--pc-active', light.p.toFixed(4));
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      const slow = now < slowUntil;
      const stiffness = slow ? 24 : 120;
      const damping = slow ? 9 : 16;
      const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        for (const axis of [x, y]) {
          axis.v += (stiffness * (axis.target - axis.p) - damping * axis.v) * h;
          axis.p += axis.v * h;
        }
      }
      const tau = light.target > light.p ? 0.18 : slow ? 0.9 : 0.45;
      light.p += (light.target - light.p) * (1 - Math.exp(-dt / tau));
      write();
      const moving =
        Math.abs(x.target - x.p) > 0.0005 ||
        Math.abs(y.target - y.p) > 0.0005 ||
        Math.abs(x.v) > 0.0005 ||
        Math.abs(y.v) > 0.0005 ||
        Math.abs(light.target - light.p) > 0.002;
      if (moving) {
        raf = requestAnimationFrame(frame);
      } else {
        x.p = x.target;
        y.p = y.target;
        light.p = light.target;
        write();
        raf = 0;
      }
    };

    const wake = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const aim = (nx: number, ny: number, on = true) => {
      x.target = clamp(nx, -1, 1);
      y.target = clamp(ny, -1, 1);
      light.target = on ? 1 : 0;
      slowUntil = 0;
      wake();
    };

    const aimAt = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      aim(((event.clientX - rect.left) / rect.width) * 2 - 1, ((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const release = () => aim(0, 0, false);
    const onEnter = (e: PointerEvent) => e.pointerType === 'mouse' && aimAt(e);
    const onMove = (e: PointerEvent) => (e.pointerType === 'mouse' || e.pointerId === touchId) && aimAt(e);
    const onLeave = (e: PointerEvent) => e.pointerType === 'mouse' && release();
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      touchId = e.pointerId;
      aimAt(e);
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== touchId) return;
      touchId = null;
      release();
    };

    root.addEventListener('pointerenter', onEnter);
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    root.addEventListener('pointerdown', onDown);
    root.addEventListener('pointerup', onUp);
    root.addEventListener('pointercancel', onUp);

    const resize = new ResizeObserver(() => {
      size.width = root.offsetWidth;
      size.height = root.offsetHeight;
      write();
    });
    resize.observe(root);
    write();

    // Intro: start tilted toward a corner with the foil lit, then spring back
    // slowly. Played the first time the card is actually on screen.
    const intro = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        intro.disconnect();
        if (reduced) return;
        x.p = 0.62;
        y.p = -0.55;
        light.p = 1;
        slowUntil = performance.now() + 1400;
        write();
        wake();
      },
      { threshold: 0.4 },
    );
    intro.observe(root);

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      intro.disconnect();
      root.removeEventListener('pointerenter', onEnter);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      root.removeEventListener('pointerdown', onDown);
      root.removeEventListener('pointerup', onUp);
      root.removeEventListener('pointercancel', onUp);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`profile-card ${className}`.trim()}
      style={
        {
          ...THEME,
          '--pc-radius': `${Math.max(0, radius)}px`,
          '--pc-backdrop': 'var(--pc-tile)',
          '--pc-holo': clamp(holo, 0, 1),
          '--pc-glare': clamp(glare, 0, 1),
          '--pc-parallax': `${Math.max(0, parallax)}px`,
          '--pc-status': statusColor,
          '--pc-grain': GRAIN,
          '--pc-pattern': iconUrl ? `url("${iconUrl}")` : 'linear-gradient(#000, #000)',
          '--pc-pattern-size': iconUrl ? '180% auto' : '100% 100%',
          '--pc-holo-gain': iconUrl ? 1.25 : 0.75,
          '--pc-holo-detail': iconUrl ? 1 : 0,
        } as CSSProperties
      }
    >
      <div className="profile-card__body">
        <div className="profile-card__tile">
          <span className="profile-card__sheen" />
          <span className="profile-card__holo">
            <span className="profile-card__holo-glow" />
            <span className="profile-card__holo-shift" />
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element -- oversized + transformed for parallax; next/image adds nothing here */}
          <img className="profile-card__photo" src={avatarUrl} alt={name} loading="lazy" draggable={false} />
          <span className="profile-card__scrim" />
          <div className="profile-card__info">
            <h3 className="profile-card__name">{name}</h3>
            <p className="profile-card__title">{title}</p>
          </div>
          <span className="profile-card__tile-rim" />
        </div>

        <div className="profile-card__footer">
          {miniAvatarUrl && (
            <span className="profile-card__avatar">
              {/* eslint-disable-next-line @next/next/no-img-element -- 36px decorative avatar */}
              <img src={miniAvatarUrl} alt="" loading="lazy" draggable={false} />
            </span>
          )}
          <div className="profile-card__meta">
            {handle && <span className="profile-card__handle">@{handle}</span>}
            {status && <span className="profile-card__status">{status}</span>}
          </div>
          <Link href={contactHref} className="profile-card__contact" aria-label={`${contactText} ${name}`}>
            <MailIcon size={16} strokeWidth={1.8} />
            {contactText}
          </Link>
        </div>

        <span className="profile-card__glare" />
        <span className="profile-card__shade" />
        <span className="profile-card__rim" />
      </div>
    </div>
  );
}

export default memo(ProfileCard);
