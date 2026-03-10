import { ACFFields } from '@/types/wordpress';
import { decodeHtml } from '@/lib/utils';

interface ExperienceProps {
  acf: ACFFields;
}

interface Experience {
  period: string;
  title: string;
  description: string;
  company?: string;
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
    <section className="py-16 bg-white" id="experience">
      <div className="section-container">
        <div className="mb-10">
          <h2 className="section-title">Berufserfahrung</h2>
          <div className="divider mt-4"></div>
        </div>

        {acf.berufserfahrung_text && (
          <div className="text-dark-600 mb-10 max-w-2xl leading-relaxed" dangerouslySetInnerHTML={{ __html: decodeHtml(acf.berufserfahrung_text) }} />
        )}

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-300"></div>
          
          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 z-10"></div>
                
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="card-elevated p-6 hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full mb-3">
                      {exp.period}
                    </span>
                    <h3 className="text-lg font-bold text-dark-900 mb-1">
                      {exp.title}
                    </h3>
                    <div 
                      className="text-dark-600 prose prose-sm max-w-none mt-3"
                      dangerouslySetInnerHTML={{ __html: decodeHtml(exp.description) }}
                    />
                  </div>
                </div>
                
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
