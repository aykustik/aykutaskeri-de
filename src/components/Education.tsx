import { ACFFields } from '@/types/wordpress';

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
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        {certifications.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
              Weiterbildung
            </h2>
            {acf.weiterbildung_text && (
              <p className="text-gray-600 mb-6">{acf.weiterbildung_text}</p>
            )}
            <div className="grid gap-4 md:grid-cols-2 mb-12">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 
                    className="font-semibold text-gray-800"
                    dangerouslySetInnerHTML={{ __html: cert.title }}
                  />
                  {cert.content && (
                    <div 
                      className="text-gray-600 text-sm mt-2 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: cert.content }}
                    />
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {education.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
              Ausbildung
            </h2>
            {acf.ausbildung_text && (
              <p className="text-gray-600 mb-6">{acf.ausbildung_text}</p>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              {education.map((edu, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 
                    className="font-semibold text-gray-800"
                    dangerouslySetInnerHTML={{ __html: edu.title }}
                  />
                  {edu.content && (
                    <div 
                      className="text-gray-600 text-sm mt-2 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: edu.content }}
                    />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
