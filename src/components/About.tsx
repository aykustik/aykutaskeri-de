import { ACFFields, WPImage } from '@/types/wordpress';

interface AboutProps {
  acf: ACFFields;
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

  return (
    <section className="bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {(das_zeichnet_mich_aus || das_mag_ich_nicht) && (
            <div className="md:col-span-2 space-y-6">
              {das_zeichnet_mich_aus && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-green-700 mb-3">
                    Das zeichnet mich aus
                  </h3>
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: das_zeichnet_mich_aus }}
                  />
                </div>
              )}
              
              {das_mag_ich_nicht && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-red-700 mb-3">
                    Das mag ich nicht
                  </h3>
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: das_mag_ich_nicht }}
                  />
                </div>
              )}
            </div>
          )}

          {showLanguages && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Sprachen
              </h3>
              <div className="space-y-4">
                {sprache_1 && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{sprache_1}</span>
                      <span>{sprache_1_starke || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${sprache_1_starke || 0}%`,
                          backgroundColor: sprache_1_farbe || '#3b82f6'
                        }}
                      />
                    </div>
                  </div>
                )}
                {sprachen_anzeigen !== 'Eine Sprache anzeigen' && sprache_2 && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{sprache_2}</span>
                      <span>{sprache_2_starke || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${sprache_2_starke || 0}%`,
                          backgroundColor: sprache_2_farbe || '#3b82f6'
                        }}
                      />
                    </div>
                  </div>
                )}
                {sprachen_anzeigen === 'Drei Sprachen' && sprache_3 && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{sprache_3}</span>
                      <span>{sprache_3_starke || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${sprache_3_starke || 0}%`,
                          backgroundColor: sprache_3_farbe || '#3b82f6'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
