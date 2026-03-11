import { ACFFields } from '@/types/wordpress';

interface PrintCVProps {
  acf: ACFFields;
}

export function PrintCV({ acf }: PrintCVProps) {
  const {
    vorname,
    nachname,
    bereich,
    firma,
    ansprechpartner,
    e_mail,
    telefon,
    linkedin_link,
    das_zeichnet_mich_aus,
    das_mag_ich_nicht,
  } = acf;

  // Skills (Marketing-Skills) - hard_skill_1 bis hard_skill_12
  const skills = [
    acf.hard_skill_1, acf.hard_skill_2, acf.hard_skill_3,
    acf.hard_skill_4, acf.hard_skill_5, acf.hard_skill_6,
    acf.hard_skill_7, acf.hard_skill_8, acf.hard_skill_9,
    acf.hard_skill_10, acf.hard_skill_11, acf.hard_skill_12,
  ].filter((s): s is string => !!s && s.trim() !== '');

  // Berufserfahrung
  const jobs = [
    { 
      titel: acf.berufserfahrung_1_titel,
      zeitraum: acf.berufserfahrung_1_zeitraum,
      beschreibung: acf.berufserfahrung_1_beschreibung,
      firma: firma
    },
    { 
      titel: acf.berufserfahrung_2_titel,
      zeitraum: acf.berufserfahrung_2_zeitraum,
      beschreibung: acf.berufserfahrung_2_beschreibung,
      firma: firma
    },
    { 
      titel: acf.berufserfahrung_3_titel,
      zeitraum: acf.berufserfahrung_3_zeitraum,
      beschreibung: acf.berufserfahrung_3_beschreibung,
      firma: firma
    },
    { 
      titel: acf.berufserfahrung_4_titel,
      zeitraum: acf.berufserfahrung_4_zeitraum,
      beschreibung: acf.berufserfahrung_4_beschreibung,
      firma: firma
    },
    { 
      titel: acf.berufserfahrung_5_titel,
      zeitraum: acf.berufserfahrung_5_zeitraum,
      beschreibung: acf.berufserfahrung_5_beschreibung,
      firma: firma
    },
  ].filter(j => j.titel);

  // Soft Skills
  const softSkills = [
    acf.soft_skill_1, acf.soft_skill_2, acf.soft_skill_3,
    acf.soft_skill_4, acf.soft_skill_5, acf.soft_skill_6,
  ].filter(Boolean) as string[];

  // Sprachen (Web-Format: anzahl / farbe etc., Print nur Namen)
  const languages = [];
  if (acf.sprache_1) languages.push({ name: acf.sprache_1, pct: acf.sprache_1_starke });
  if (acf.sprache_2 && (acf.sprachen_anzeigen === '2' || acf.sprachen_anzeigen === '3')) languages.push({ name: acf.sprache_2, pct: acf.sprache_2_starke });
  if (acf.sprache_3 && acf.sprachen_anzeigen === '3') languages.push({ name: acf.sprache_3, pct: acf.sprache_3_starke });

  return (
    <section className="print-only" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* HEADER */}
      <div style={{ 
        marginBottom: '12pt', 
        paddingBottom: '8pt', 
        borderBottom: '2pt solid #000' 
      }}>
        <h1 style={{ 
          fontSize: '30pt', 
          fontWeight: 700, 
          margin: 0, 
          lineHeight: 1.1,
          letterSpacing: '-0.02em'
        }}>
          {vorname} {nachname}
        </h1>
        <p style={{ 
          fontSize: '13pt', 
          margin: '4pt 0 0 0', 
          color: '#333',
          fontWeight: 500
        }}>
          {bereich}
        </p>
        <p style={{ 
          fontSize: '10.5pt', 
          margin: '8pt 0 0 0', 
          color: '#555' 
        }}>
          {telefon} | {e_mail} | LinkedIn
        </p>
      </div>

      {/* 2-SPALTEN LAYOUT */}
      <div style={{ display: 'flex', gap: '32pt' }}>
        
        {/* LINKE SPALTE (35%) - SKILLS */}
        <div style={{ flex: '0 0 35%' }}>
          {/* DAS ZEICHNET MICH AUS / DAS MAG ICH NICHT */}
          <div style={{ marginBottom: '16pt' }}>
            {das_zeichnet_mich_aus && (
              <div style={{ marginBottom: '12pt' }}>
                <h2 style={{ 
                  fontSize: '13pt', 
                  fontWeight: 700, 
                  margin: '0 0 6pt 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em'
                }}>
                  Das zeichnet mich aus
                </h2>
                <div 
                  style={{ 
                    fontSize: '10.5pt', 
                    color: '#333',
                    lineHeight: 1.4
                  }}
                  dangerouslySetInnerHTML={{ __html: das_zeichnet_mich_aus }}
                />
              </div>
            )}
            
            {das_mag_ich_nicht && (
              <div>
                <h2 style={{ 
                  fontSize: '13pt', 
                  fontWeight: 700, 
                  margin: '0 0 6pt 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em'
                }}>
                  Das mag ich nicht
                </h2>
                <div 
                  style={{ 
                    fontSize: '10.5pt', 
                    color: '#333',
                    lineHeight: 1.4
                  }}
                  dangerouslySetInnerHTML={{ __html: das_mag_ich_nicht }}
                />
              </div>
            )}
          </div>

          {/* SKILLS */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '16pt' }}>
              <h2 style={{ 
                fontSize: '13pt', 
                fontWeight: 700, 
                margin: '0 0 8pt 0',
                textTransform: 'uppercase',
                letterSpacing: '0.02em'
              }}>
                Skills
              </h2>
              <ul style={{ 
                margin: 0, 
                padding: '0 0 0 16pt',
                fontSize: '10.5pt',
                color: '#333'
              }}>
                {skills.map((skill, i) => (
                  <li key={i} style={{ marginBottom: '2pt' }}>{skill}</li>
                ))}
              </ul>
            </div>
          )}

          {/* TOOLS */}
          <div style={{ marginBottom: '16pt' }}>
            <h2 style={{ 
              fontSize: '13pt', 
              fontWeight: 700, 
              margin: '0 0 8pt 0',
              textTransform: 'uppercase',
              letterSpacing: '0.02em'
            }}>
              Tools
            </h2>
            <ul style={{ 
              margin: 0, 
              padding: '0 0 0 16pt',
              fontSize: '10.5pt',
              color: '#333'
            }}>
              <li>Ahrefs</li>
              <li>Google Analytics</li>
              <li>Notion</li>
              <li>n8n</li>
            </ul>
          </div>

          {/* TECHNOLOGIEN */}
          <div style={{ marginBottom: '16pt' }}>
            <h2 style={{ 
              fontSize: '13pt', 
              fontWeight: 700, 
              margin: '0 0 8pt 0',
              textTransform: 'uppercase',
              letterSpacing: '0.02em'
            }}>
              Technologien
            </h2>
            <ul style={{ 
              margin: 0, 
              padding: '0 0 0 16pt',
              fontSize: '10.5pt',
              color: '#333'
            }}>
              <li>WordPress</li>
              <li>Next.js</li>
              <li>Automation</li>
              <li>AI Tools</li>
            </ul>
          </div>

          {/* SPRACHEN */}
          {languages.length > 0 && (
            <div>
              <h2 style={{ 
                fontSize: '13pt', 
                fontWeight: 700, 
                margin: '0 0 8pt 0',
                textTransform: 'uppercase',
                letterSpacing: '0.02em'
              }}>
                Sprachen
              </h2>
              <ul style={{ 
                margin: 0, 
                padding: '0 0 0 16pt',
                fontSize: '10.5pt',
                color: '#333'
              }}>
                {languages.map((lang, i) => (
                  <li key={i} style={{ marginBottom: '2pt' }}>{lang.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* RECHTE SPALTE (65%) - BERUFSERFAHRUNG */}
        <div style={{ flex: '0 0 65%' }}>
          <h2 style={{ 
            fontSize: '13pt', 
            fontWeight: 700, 
            margin: '0 0 12pt 0',
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            borderBottom: '1pt solid #000',
            paddingBottom: '4pt'
          }}>
            Berufserfahrung
          </h2>
          
          {jobs.map((job, i) => (
            <div key={i} style={{ 
              marginBottom: i < jobs.length - 1 ? '14pt' : 0,
              breakInside: 'avoid'
            }}>
              <p style={{ 
                margin: '0 0 1pt 0', 
                fontWeight: 700,
                fontSize: '10.5pt'
              }}>
                {job.titel}
              </p>
              <p style={{ 
                margin: '0 0 4pt 0', 
                color: '#555',
                fontSize: '10.5pt'
              }}>
                {job.firma} | {job.zeitraum}
              </p>
              
              {job.beschreibung && (
                <div 
                  style={{ 
                    fontSize: '10.5pt', 
                    color: '#333',
                    lineHeight: 1.4,
                    marginLeft: '0'
                  }}
                  dangerouslySetInnerHTML={{ __html: job.beschreibung }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
