import { ACFFields } from '@/types/wordpress';

interface ExperienceProps {
  acf: ACFFields;
}

interface Experience {
  period: string;
  title: string;
  description: string;
}

export function ExperienceSection({ acf }: ExperienceProps) {
  const experiences: Experience[] = [
    {
      period: acf.berufserfahrung_1_zeitraum || '',
      title: acf.berufserfahrung_1_titel || '',
      description: acf.berufserfahrung_1_beschreibung || '',
    },
    {
      period: acf.berufserfahrung_2_zeitraum || '',
      title: acf.berufserfahrung_2_titel || '',
      description: acf.berufserfahrung_2_beschreibung || '',
    },
    {
      period: acf.berufserfahrung_3_zeitraum || '',
      title: acf.berufserfahrung_3_titel || '',
      description: acf.berufserfahrung_3_beschreibung || '',
    },
    {
      period: acf.berufserfahrung_4_zeitraum || '',
      title: acf.berufserfahrung_4_titel || '',
      description: acf.berufserfahrung_4_beschreibung || '',
    },
    {
      period: acf.berufserfahrung_5_zeitraum || '',
      title: acf.berufserfahrung_5_titel || '',
      description: acf.berufserfahrung_5_beschreibung || '',
    },
  ].filter(exp => exp.title);

  if (experiences.length === 0) return null;

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Berufserfahrung
        </h2>

        {acf.berufserfahrung_text && (
          <p className="text-gray-600 mb-8">{acf.berufserfahrung_text}</p>
        )}

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8 border-l-2 border-blue-500">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-500 rounded-full" />
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <span className="text-sm text-gray-500 font-medium">
                  {exp.period}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">
                  {exp.title}
                </h3>
                <div
                  className="text-gray-600 mt-3 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
