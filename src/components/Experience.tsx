import { ACFFields } from '@/types/wordpress';
import { decodeHtml } from '@/lib/utils';

interface ExperienceProps { acf: ACFFields }

export function ExperienceSection({ acf }: ExperienceProps) {
  const jobs = [
    { period: acf.berufserfahrung_1_zeitraum, title: acf.berufserfahrung_1_titel, desc: acf.berufserfahrung_1_beschreibung },
    { period: acf.berufserfahrung_2_zeitraum, title: acf.berufserfahrung_2_titel, desc: acf.berufserfahrung_2_beschreibung },
    { period: acf.berufserfahrung_3_zeitraum, title: acf.berufserfahrung_3_titel, desc: acf.berufserfahrung_3_beschreibung },
    { period: acf.berufserfahrung_4_zeitraum, title: acf.berufserfahrung_4_titel, desc: acf.berufserfahrung_4_beschreibung },
    { period: acf.berufserfahrung_5_zeitraum, title: acf.berufserfahrung_5_titel, desc: acf.berufserfahrung_5_beschreibung },
  ].filter(j => j.title);

  if (!jobs.length) return null;

  return (
    <section className="section-gray py-16 print-avoid" id="berufserfahrung">
      <div className="section-container">
        <h2 className="section-title">Berufserfahrung</h2>
        <div className="divider mt-4 mb-8" />

        {acf.berufserfahrung_text && (
          <div
            className="body-text mb-10 max-w-2xl prose prose-slate"
            dangerouslySetInnerHTML={{ __html: decodeHtml(acf.berufserfahrung_text) }}
          />
        )}

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-6 top-2 bottom-2 w-0.5"
               style={{ background: 'linear-gradient(to bottom, #43C26E, #575CC2)' }} />

          <div className="space-y-8">
            {jobs.map((job, i) => (
              <div key={i} className="relative pl-12 md:pl-16 print-avoid">
                {/* Dot */}
                <div className="absolute left-2 md:left-4 top-5 w-5 h-5 rounded-full border-2 border-white shadow-md"
                     style={{ background: '#43C26E' }} />
                <div className="card p-6">
                  {job.period && (
                    <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 text-white"
                          style={{ background: '#43C26E' }}>
                      {job.period}
                    </span>
                  )}
                  <h3 className="font-heading font-bold text-slate-900 text-lg mb-3">{job.title}</h3>
                  {job.desc && (
                    <div
                      className="prose prose-sm prose-slate max-w-none body-text"
                      dangerouslySetInnerHTML={{ __html: decodeHtml(job.desc) }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
