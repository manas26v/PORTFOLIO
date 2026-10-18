import Link from 'next/link';
import ProfileCard from '@/components/ProfileCard';
import { siteConfig, socials } from '@/data/site';
import profile from '@/assets/profile-cutout.webp';
import logo from '@/assets/logo-lg.png';

// "@handle" comes from the GitHub link, so it stays in sync with the socials data.
const github = socials.find((s) => s.icon === 'github');
const handle = github ? new URL(github.url).pathname.replace(/\//g, '') : undefined;

export default function ProfileSection() {
  return (
    <section aria-labelledby="profile-heading" className="container-x py-20 md:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
        <div>
          <h2 id="profile-heading" className="display-lg reveal max-w-[12ch]">
            The person behind the code
          </h2>
          <p className="reveal mt-6 max-w-xl text-lg leading-relaxed text-muted">
            I&apos;m {siteConfig.name}, a {siteConfig.jobTitle.toLowerCase()} at {siteConfig.employer.name}. I care
            about clean code, sound system design and software that delivers real business value.
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-3">
            <Link href="/about/" className="pill-light">
              More about me
            </Link>
            {github && (
              <a href={github.url} target="_blank" rel="me noopener noreferrer" className="pill-dark">
                GitHub
              </a>
            )}
          </div>
        </div>

        <div className="reveal flex justify-center lg:justify-end">
          <ProfileCard
            avatarUrl={profile.src}
            iconUrl={logo.src}
            miniAvatarUrl={logo.src}
            name={siteConfig.name}
            title={siteConfig.jobTitle}
            handle={handle}
            status="Open to work"
            contactText="Contact"
            contactHref="/contact/"
          />
        </div>
      </div>
    </section>
  );
}
