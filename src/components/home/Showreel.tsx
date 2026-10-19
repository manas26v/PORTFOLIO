'use client';

import { useEffect, useRef, useState } from 'react';
import { asset } from '@/lib/url';

/**
 * 15-second motion reel (rendered from intro/reel.js). Plays muted and looped
 * while on screen, pauses off screen, and downloads nothing until it's near the
 * viewport. Reduced-motion visitors get the poster and start it themselves.
 */
export default function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // Set when the visitor pauses (or prefers reduced motion) so scrolling back
  // into view doesn't restart the video. Not rendered, so a ref is enough.
  const userPausedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) userPausedRef.current = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPausedRef.current) {
          video.play().catch(() => setPlaying(false));
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPausedRef.current = false;
      video.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      video.pause();
    }
  };

  return (
    <section aria-labelledby="showreel-heading" className="py-20 md:py-28">
      <div className="container-x mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-14">
        <div>
          <p className="eyebrow reveal mb-4">Showreel 2026</p>
          <h2 id="showreel-heading" className="display-lg reveal max-w-[14ch]">
            Every pixel is code
          </h2>
        </div>
        <p className="reveal max-w-sm text-[17px] leading-relaxed text-muted">
          Fifteen seconds of motion, from bouncing physics to particle systems, rendered frame by frame from code.
        </p>
      </div>

      {/* Full-bleed: edge to edge, filling the screen in landscape (capped at the
          viewport height; ultra-wide screens crop a little top and bottom). */}
      <div className="reveal aspect-video max-h-[100svh] w-full bg-panel">
        <video
          ref={videoRef}
          className="size-full object-cover"
          poster={asset('/showreel/poster.jpg')}
          muted
          loop
          playsInline
          preload="none"
          aria-label="Manas Ranjan Barik — motion showreel, 15 seconds, no audio"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={asset('/showreel/manas-showreel-720.mp4')} type="video/mp4" media="(max-width: 767px)" />
          <source src={asset('/showreel/manas-showreel-1080.mp4')} type="video/mp4" />
        </video>
      </div>
      {/* Below the video: the reel's own HUD occupies all four corners. */}
      <div className="container-x mt-4 flex justify-end">
        <button
          type="button"
          onClick={toggle}
          className="pill-dark"
          aria-label={playing ? 'Pause showreel' : 'Play showreel'}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
            </svg>
          )}
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
    </section>
  );
}
