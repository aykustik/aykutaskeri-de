import { ACFFields } from '@/types/wordpress';
import { decodeHtml } from '@/lib/utils';

interface AboutProps {
  acf: ACFFields;
}

const LANGUAGE_COLORS = {
  german: '#43C26E',
  english: '#575CC2',
  turkish: '#C2A73A',
};

function LanguageCircle({ name, percentage, color }: { name: string; percentage: number; color: string }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90 language-circle-svg" viewBox="0 0 96 96">
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            className="text-slate-200"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-dark-800">{percentage}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-dark-600">{name}</span>
    </div>
  );
}

export function AboutSection({ acf }: AboutProps) {
  const {
    das_zeichnet_mich_aus,
    das_mag_ich_nicht,
    sprachen_anzeigen,
    sprache_1,
    sprache_2,
    sprache_3,
    sprache_1_starke,
    sprache_2_starke,
    sprache_3_starke,
    sprache_1_farbe,
    sprache_2_farbe,
    sprache_3_farbe,
  } = acf;

  const showLanguages = sprachen_anzeigen && sprachen_anzeigen !== 'Keine Sprache anzeigen';

  const getLanguageColor = (lang: string | undefined, fallback: string) => {
    if (!lang) return fallback;
    const langLower = lang.toLowerCase();
    if (langLower.includes('deutsch') || langLower.includes('german')) return LANGUAGE_COLORS.german;
    if (langLower.includes('englisch') || langLower.includes('english')) return LANGUAGE_COLORS.english;
    if (langLower.includes('türkisch') || langLower.includes('turkish') || langLower.includes('türkce')) return LANGUAGE_COLORS.turkish;
    return fallback;
  };

  if (!das_zeichnet_mich_aus && !das_mag_ich_nicht && !showLanguages) return null;

  return (
    <section className="py-16 bg-white print-break-inside" id="about">
      <div className="section-container">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {(das_zeichnet_mich_aus || das_mag_ich_nicht) && (
              <div className="grid md:grid-cols-2 gap-6">
                {das_zeichnet_mich_aus && (
                  <div className="card-elevated p-6 animate-fade-in-up">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-dark-900">
                        Das zeichnet mich aus
                      </h3>
                    </div>
                    <div 
                      className="prose prose-sm max-w-none text-dark-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: decodeHtml(das_zeichnet_mich_aus) }}
                    />
                  </div>
                )}
                
                {das_mag_ich_nicht && (
                  <div className="card-elevated p-6 animate-fade-in-up animation-delay-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-dark-900">
                        Das mag ich nicht
                      </h3>
                    </div>
                    <div 
                      className="prose prose-sm max-w-none text-dark-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: decodeHtml(das_mag_ich_nicht) }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {showLanguages && (
            <div className="animate-fade-in-up animation-delay-200">
              <div className="card-elevated p-6">
                <h3 className="text-lg font-semibold text-dark-900 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  Sprachen
                </h3>
                <div className="flex flex-wrap justify-center gap-6">
                  {sprache_1 && (
                    <LanguageCircle 
                      name={sprache_1} 
                      percentage={sprache_1_starke || 0} 
                      color={getLanguageColor(sprache_1, sprache_1_farbe || LANGUAGE_COLORS.german)} 
                    />
                  )}
                  {sprachen_anzeigen !== 'Eine Sprache anzeigen' && sprache_2 && (
                    <LanguageCircle 
                      name={sprache_2} 
                      percentage={sprache_2_starke || 0} 
                      color={getLanguageColor(sprache_2, sprache_2_farbe || LANGUAGE_COLORS.english)} 
                    />
                  )}
                  {sprachen_anzeigen === 'Drei Sprachen' && sprache_3 && (
                    <LanguageCircle 
                      name={sprache_3} 
                      percentage={sprache_3_starke || 0} 
                      color={getLanguageColor(sprache_3, sprache_3_farbe || LANGUAGE_COLORS.turkish)} 
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
