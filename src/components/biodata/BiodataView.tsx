export type BiodataData = {
  name: string;
  location: string;
  headline: string;
  summary: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  experience: Array<{
    title?: string;
    organization?: string;
    period?: string;
    bullets?: string[];
    [key: string]: unknown;
  }>;
  projects: Array<{ title?: string; description?: string; [key: string]: unknown }>;
  education: Array<{
    institution?: string;
    major?: string;
    period?: string;
    gpa?: string;
    [key: string]: unknown;
  }>;
  certifications: Array<{
    title?: string;
    issuer?: string;
    period?: string;
    note?: string;
    [key: string]: unknown;
  }>;
  skills: string[];
  languages: string[];
  achievements: string[];
};

type Props = { data: BiodataData };

export default function BiodataView({ data }: Props) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-10">
      <header className="space-y-2 border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <h1 className="text-3xl font-bold tracking-tight">{data.name}</h1>
        {data.headline && <p className="text-neutral-600 dark:text-neutral-400">{data.headline}</p>}
        {data.location && <p className="text-sm text-neutral-500">{data.location}</p>}
        <div className="flex flex-wrap gap-3 pt-2 text-sm">
          {data.phone && <span>{data.phone}</span>}
          {data.email && (
            <a className="underline" href={`mailto:${data.email}`}>
              {data.email}
            </a>
          )}
          {data.linkedin && (
            <a className="underline" href={data.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          {data.github && (
            <a className="underline" href={data.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
        </div>
      </header>

      {data.summary && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Summary</h2>
          <p className="text-neutral-700 dark:text-neutral-300 whitespace-pre-line">{data.summary}</p>
        </section>
      )}

      {data.experience?.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Experience</h2>
          <ul className="space-y-4">
            {data.experience.map((e, i) => (
              <li key={i} className="space-y-1">
                <div className="font-medium">{e.title}</div>
                {e.organization && <div className="text-sm text-neutral-500">{e.organization}</div>}
                {e.period && <div className="text-xs text-neutral-400">{e.period}</div>}
                {e.bullets && e.bullets.length > 0 && (
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {e.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.projects?.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Projects</h2>
          <ul className="space-y-3">
            {data.projects.map((p, i) => (
              <li key={i} className="space-y-1">
                <div className="font-medium">{p.title}</div>
                {p.description && <p className="text-sm text-neutral-600 dark:text-neutral-400">{p.description}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.education?.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Education</h2>
          <ul className="space-y-3">
            {data.education.map((e, i) => (
              <li key={i} className="space-y-1">
                <div className="font-medium">{e.institution}</div>
                {e.major && <div className="text-sm">{e.major}</div>}
                {e.period && <div className="text-xs text-neutral-400">{e.period}</div>}
                {e.gpa && <div className="text-xs text-neutral-400">GPA: {e.gpa}</div>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.certifications?.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Certifications</h2>
          <ul className="space-y-3">
            {data.certifications.map((c, i) => (
              <li key={i} className="space-y-1">
                <div className="font-medium">{c.title}</div>
                {c.issuer && <div className="text-sm text-neutral-500">{c.issuer}</div>}
                {c.period && <div className="text-xs text-neutral-400">{c.period}</div>}
                {c.note && <p className="text-sm text-neutral-600 dark:text-neutral-400">{c.note}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.skills?.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s, i) => (
              <span
                key={i}
                className="rounded-full border border-neutral-300 px-3 py-1 text-xs dark:border-neutral-700"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.languages?.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Languages</h2>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {data.languages.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </section>
      )}

      {data.achievements?.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Achievements</h2>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {data.achievements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
