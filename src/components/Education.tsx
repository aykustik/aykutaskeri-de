import { ACFFields } from '@/types/wordpress';
import { decodeHtml } from '@/lib/utils';

interface EducationProps {
  acf: ACFFields;
}

interface Education {
  title: string;
  content: string;
}

export function EducationSection({ acf }: EducationProps) {
  const education: Education[] = [
    { title: acf.ausbildung_1_titel || '', content: acf.ausbildung_1_inhalt || '' },
    { title: acf.ausbildung_2_titel || '', content: acf.ausbildung_2_inhalt || '' },
    { title: acf.ausbildung_3_titel || '', content: acf.ausbildung_3_inhalt || '' },
  ].filter(edu => edu.title);

  const certifications: Education[] = [
    { title: acf.weiterbildung_1_titel || '', content: acf.weiterbildung_1_inhalt || '' },
    { title: acf.weiterbildung_2_titel || '', content: acf.weiterbildung_2_inhalt || '' },
    { title: acf.weiterbildung_3_titel || '', content: acf.weiterbildung_3_inhalt || '' },
    { title: acf.weiterbildung_4_titel || '', content: acf.weiterbildung_4_inhalt || '' },
    { title: acf.weiterbildung_5_titel || '', content: acf.weiterbildung_5_inhalt || '' },
    { title: acf.weiterbildung_6_titel || '', content: acf.weiterbildung_6_inhalt || '' },
    { title: acf.weiterbildung_7_titel || '', content: acf.weiterbildung_7_inhalt || '' },
    { title: acf.weiterbildung_8_titel || '', content: acf.weiterbildung_8_inhalt || '' },
    { title: acf.weiterbildung_9_titel || '', content: acf.weiterbildung_9_inhalt || '' },
    { title: acf.weiterbildung_10_titel || '', content: acf.weiterbildung_10_inhalt || '' },
    { title: acf.weiterbildung_11_titel || '', content: acf.weiterbildung_11_inhalt || '' },
    { title: acf.weiterbildung_12_titel || '', content: acf.weiterbildung_12_inhalt || '' },
  ].filter(cert => cert.title);

  if (education.length === 0 && certifications.length === 0) return null;

  return (
    <section className="py-16 bg-slate-50 print-break-inside" id="education">
      <div className="section-container">
        {certifications.length > 0 && (
          <>
            <div className="mb-10">
              <h2 className="section-title">Weiterbildung</h2>
              <div className="divider mt-4"></div>
            </div>
            {acf.weiterbildung_text && (
              <p className="text-dark-600 mb-8 max-w-2xl leading-relaxed">{decodeHtml(acf.weiterbildung_text)}</p>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              {certifications.map((cert, index) => (
                <div 
                  key={index} 
                  className="card-elevated p-5 hover:shadow-lg transition-all duration-300 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-200 transition-colors">
                      <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h4 
                        className="font-semibold text-dark-800 group-hover:text-primary-600 transition-colors"
                        dangerouslySetInnerHTML={{ __html: decodeHtml(cert.title) }}
                      />
                      {cert.content && (
                        <div 
                          className="text-dark-500 text-sm mt-1 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: decodeHtml(cert.content) }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {education.length > 0 && (
          <>
            <div className="mb-10">
              <h2 className="section-title">Ausbildung</h2>
              <div className="divider mt-4"></div>
            </div>
            {acf.ausbildung_text && (
              <p className="text-dark-600 mb-8 max-w-2xl leading-relaxed">{decodeHtml(acf.ausbildung_text)}</p>
            )}
            <div className="grid md:grid-cols-2 gap-5">
              {education.map((edu, index) => (
                <div 
                  key={index} 
                  className="card-elevated p-6 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                    </div>
                    <div>
                      <h4 
                        className="font-bold text-dark-900 text-lg"
                        dangerouslySetInnerHTML={{ __html: decodeHtml(edu.title) }}
                      />
                      {edu.content && (
                        <div 
                          className="text-dark-600 mt-2 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: decodeHtml(edu.content) }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
