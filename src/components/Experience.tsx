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
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--brand-purple-light)' }}>
            <svg className="w-5 h-5" fill="none" stroke="var(--brand-purple)" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="section-title mb-0">Berufserfahrung</h2>
        </div>
        <div className="divider mt-2 mb-8" />

        {acf.berufserfahrung_text && (
          <div
            className="body-text mb-10 max-w-2xl prose prose-slate"
            dangerouslySetInnerHTML={{ __html: decodeHtml(acf.berufserfahrung_text) }}
          />
        )}

        <div className="relative">
          {/* Timeline line — screen only */}
          <div className="timeline-line absolute left-4 md:left-6 top-2 bottom-2 w-0.5 screen-only"
               style={{ background: 'linear-gradient(to bottom, var(--brand-purple), var(--brand-purple-grad))' }} />

          <div className="space-y-8">
            {jobs.map((job, i) => (
              <div key={i} className="timeline-item relative pl-12 md:pl-16 print-avoid">
                {/* Timeline dot — first dot pulses, rest are static */}
                <div className={`absolute left-2 md:left-4 top-5 w-5 h-5 rounded-full border-2 border-white shadow-md screen-only ${i === 0 ? 'timeline-dot-first' : 'timeline-dot'}`}
                     style={{ background: 'var(--brand-purple)' }} />

                <div className="card p-6">
                  {job.period && (
                    <span className="period-badge inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 text-white"
                          style={{ background: 'var(--brand-purple)' }}>
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
