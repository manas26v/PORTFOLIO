import { siteConfig } from '@/data/site';
import Link from 'next/link';

export default function ContactCta({ num }: { num?: string }) {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="mx-auto max-w-xl py-24 text-center md:py-32">
      <p className="reveal mb-5 font-mono text-base text-accent">{num ? `${num}. ` : ''}What&apos;s Next?</p>
      <h2 id="contact-heading" className="reveal font-mono text-[clamp(40px,5vw,60px)] font-semibold leading-tight text-fg">
        Get In Touch
      </h2>
      <p className="reveal mt-5 text-lg">
        I&apos;m currently looking for new opportunities and my inbox is always open. Whether you have a question or
        just want to say hi, I&apos;ll try my best to get back to you!
      </p>
      <div className="reveal mt-12 flex flex-wrap justify-center gap-4">
        <a href={`mailto:${siteConfig.email}`} className="btn">
          Say Hello
        </a>
        <Link href="/contact/" className="btn border-line text-soft hover:border-accent hover:text-accent">
          Other ways to reach me
        </Link>
      </div>
    </section>
  );
}
