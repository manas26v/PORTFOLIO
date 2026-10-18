import Image from 'next/image';
import photo from '@/assets/about-me.jpg';
import { siteConfig } from '@/data/site';

/** Square portrait with the offset accent frame. */
export default function AboutPhoto({ className = '' }: { className?: string }) {
  return (
    <div className={`group relative mx-auto w-full max-w-[300px] self-start ${className}`}>
      <div className="relative z-10 aspect-square overflow-hidden rounded bg-accent">
        <Image
          src={photo}
          alt={`Portrait of ${siteConfig.name}`}
          fill
          sizes="300px"
          placeholder="blur"
          className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute left-3.5 top-3.5 size-full rounded border-2 border-accent transition-all duration-300 ease-smooth group-hover:left-2.5 group-hover:top-2.5"
      />
    </div>
  );
}
