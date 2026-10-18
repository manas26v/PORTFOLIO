import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { asset } from '@/lib/url';
import logo from '@/assets/logo-lg.png';

/** Big centered sign-off with a blue glow and the glowing logo mark. */
export default function ClosingCta({ title = "Let's build something great." }: { title?: string }) {
  return (
    <section aria-labelledby="cta-heading" className="relative overflow-hidden pt-28 text-center md:pt-36">
      <div aria-hidden="true" className="glow-logo-halo pointer-events-none absolute inset-x-0 bottom-0 h-[760px]" />
      <div className="container-x relative">
        <h2 id="cta-heading" className="display-xl reveal mx-auto max-w-[16ch]">
          {title}
        </h2>
        <div className="reveal mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/contact/" className="pill-light">
            Get in touch
          </Link>
          <a href={asset(siteConfig.resume)} target="_blank" rel="noopener noreferrer" className="pill-dark">
            Download résumé
          </a>
        </div>
        <div aria-hidden="true" className="reveal mx-auto mt-24 w-[clamp(140px,20vw,230px)] pb-28">
          <Image src={logo} alt="" sizes="230px" className="glow-logo h-auto w-full" />
        </div>
      </div>
    </section>
  );
}
