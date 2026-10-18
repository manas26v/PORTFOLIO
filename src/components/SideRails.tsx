import { siteConfig, socials } from '@/data/site';
import { socialIcons } from './Icons';

const rail =
  'fixed bottom-0 z-10 hidden flex-col items-center text-soft after:mt-5 after:block after:h-24 after:w-px after:bg-soft lg:flex';

/** Fixed social links (left) and email (right) on wide screens. */
export default function SideRails() {
  return (
    <>
      <ul className={`${rail} left-10 gap-1`}>
        {socials.map((s) => {
          const Icon = socialIcons[s.icon];
          return (
            <li key={s.name}>
              <a
                href={s.url}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label={s.name}
                className="flex p-2.5 transition-all duration-300 ease-smooth hover:-translate-y-1 hover:text-accent"
              >
                <Icon />
              </a>
            </li>
          );
        })}
      </ul>
      <div className={`${rail} right-10`}>
        <a
          href={`mailto:${siteConfig.email}`}
          className="p-2.5 font-mono text-[13px] tracking-[0.1em] transition-all duration-300 ease-smooth [writing-mode:vertical-rl] hover:-translate-y-1 hover:text-accent"
        >
          {siteConfig.email}
        </a>
      </div>
    </>
  );
}
