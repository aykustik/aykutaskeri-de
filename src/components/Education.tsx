import { ACFFields } from '@/types/wordpress';
import { decodeHtml } from '@/lib/utils';

interface EducationProps { acf: ACFFields }

export function EducationSection({ acf }: EducationProps) {
  const ausbildung = [
    { title: acf.ausbildung_1_titel, content: acf.ausbildung_1_inhalt },
    { title: acf.ausbildung_2_titel, content: acf.ausbildung_2_inhalt },
    { title: acf.ausbildung_3_titel, content: acf.ausbildung_3_inhalt },
  ].filter(e => e.title);

  const weiterbildung = [
    { title: acf.weiterbildung_1_titel,  content: acf.weiterbildung_1_inhalt  },
    { title: acf.weiterbildung_2_titel,  content: acf.weiterbildung_2_inhalt  },
    { title: acf.weiterbildung_3_titel,  content: acf.weiterbildung_3_inhalt  },
    { title: acf.weiterbildung_4_titel,  content: acf.weiterbildung_4_inhalt  },
    { title: acf.weiterbildung_5_titel,  content: acf.weiterbildung_5_inhalt  },
    { title: acf.weiterbildung_6_titel,  content: acf.weiterbildung_6_inhalt  },
    { title: acf.weiterbildung_7_titel,  content: acf.weiterbildung_7_inhalt  },
    { title: acf.weiterbildung_8_titel,  content: acf.weiterbildung_8_inhalt  },
    { title: acf.weiterbildung_9_titel,  content: acf.weiterbildung_9_inhalt  },
    { title: acf.weiterbildung_10_titel, content: acf.weiterbildung_10_inhalt },
    { title: acf.weiterbildung_11_titel, content: acf.weiterbildung_11_inhalt },
    { title: acf.weiterbildung_12_titel, content: acf.weiterbildung_12_inhalt },
  ].filter(e => e.title);

  if (!ausbildung.length && !weiterbildung.length) return null;

  return (
    <section className="section-white py-16" id="bildung">
      <div className="section-container space-y-12">

        {ausbildung.length > 0 && (
          <div className="print-avoid">
            <h2 className="section-title">Ausbildung</h2>
            <div className="divider mt-4 mb-8" />
            {acf.ausbildung_text && (
              <div className="body-text mb-8 max-w-2xl prose prose-slate"
                   dangerouslySetInnerHTML={{ __html: decodeHtml(acf.ausbildung_text) }} />
            )}
            <div className="grid md:grid-cols-2 gap-5">
              {ausbildung.map((edu, i) => (
                <div key={i} className="card p-6">
                  <div className="flex gap-4">
                    {/* Purple: formal education */}
                    <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center screen-only"
                         style={{ background: 'var(--brand-purple-light)' }}>
                      <svg className="w-5 h-5" fill="none" stroke="var(--brand-purple)" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 text-sm mb-2"
                          dangerouslySetInnerHTML={{ __html: decodeHtml(edu.title!) }} />
                      {edu.content && (
                        <div className="prose prose-sm prose-slate max-w-none body-text"
                             dangerouslySetInnerHTML={{ __html: decodeHtml(edu.content) }} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {weiterbildung.length > 0 && (
          <div className="print-break-before print-avoid">
            <h2 className="section-title">Weiterbildung</h2>
            <div className="divider mt-4 mb-8" />
            {acf.weiterbildung_text && (
              <div className="body-text mb-8 max-w-2xl prose prose-slate"
                   dangerouslySetInnerHTML={{ __html: decodeHtml(acf.weiterbildung_text) }} />
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {weiterbildung.map((cert, i) => (
                <div key={i} className="card p-5 print-avoid">
                  <div className="flex gap-3">
                    {/* Emerald: achievement / certificate */}
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5 screen-only"
                         style={{ background: 'var(--brand-emerald-light)' }}>
                      <svg className="w-4 h-4" fill="none" stroke="var(--brand-emerald)" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm leading-snug"
                          dangerouslySetInnerHTML={{ __html: decodeHtml(cert.title!) }} />
                      {cert.content && (
                        <div className="prose prose-sm prose-slate max-w-none mt-1.5 text-slate-500"
                             dangerouslySetInnerHTML={{ __html: decodeHtml(cert.content) }} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
