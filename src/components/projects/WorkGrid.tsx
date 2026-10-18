import type { Project } from '@/data/projects';
import WorkCell from './WorkCell';

/** Two-column bordered frame. An odd last item spans the full width. */
export default function WorkGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="frame reveal grid md:grid-cols-2">
      {projects.map((p, i) => {
        const lastOdd = i === projects.length - 1 && projects.length % 2 === 1;
        return (
          <WorkCell
            key={p.slug}
            project={p}
            index={i}
            className={[
              'border-line',
              i > 0 ? 'border-t' : '',
              i === 1 ? 'md:border-t-0' : '',
              i % 2 === 1 ? 'md:border-l' : '',
              lastOdd ? 'md:col-span-2' : '',
            ].join(' ')}
          />
        );
      })}
    </div>
  );
}
