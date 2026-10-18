const tech = ['Node.js', 'TypeScript', 'PostgreSQL', 'Express', 'Python', 'FastAPI', 'Snowflake', 'Ollama'];

export default function TechStrip() {
  return (
    <section aria-labelledby="tech-heading" className="container-x py-20 text-center md:py-24">
      <h2 id="tech-heading" className="eyebrow reveal">
        Technologies I ship with
      </h2>
      <ul className="reveal mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
        {tech.map((t) => (
          <li key={t} className="font-display text-2xl font-semibold tracking-[-0.03em] text-[#8a8a8a] sm:text-[26px]">
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}
