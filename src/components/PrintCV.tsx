import { ACFFields } from '@/types/wordpress';

interface PrintCVProps {
  acf: ACFFields;
}

export function PrintCV({ acf }: PrintCVProps) {
  const {
    vorname,
    nachname,
    bereich,
    adresse,
    plz,
    ort,
    e_mail,
    telefon,
    linkedin_link,
    profilbild,
    das_zeichnet_mich_aus,
    kontakt_text,
  } = acf;

  // Hard Skills in 3 Gruppen aufteilen (1-4, 5-8, 9-12)
  const skillsGroup1 = [
    acf.hard_skill_1, acf.hard_skill_2, acf.hard_skill_3, acf.hard_skill_4,
  ].filter((s): s is string => !!s && s.trim() !== '');

  const skillsGroup2 = [
    acf.hard_skill_5, acf.hard_skill_6, acf.hard_skill_7, acf.hard_skill_8,
  ].filter((s): s is string => !!s && s.trim() !== '');

  const skillsGroup3 = [
    acf.hard_skill_9, acf.hard_skill_10, acf.hard_skill_11, acf.hard_skill_12,
  ].filter((s): s is string => !!s && s.trim() !== '');

  // Soft Skills
  const softSkills = [
    acf.soft_skill_1, acf.soft_skill_2, acf.soft_skill_3,
    acf.soft_skill_4, acf.soft_skill_5, acf.soft_skill_6,
  ].filter((s): s is string => !!s && s.trim() !== '');

  // Berufserfahrung (alle 5 Jobs)
  const jobs = [
    { 
      titel: acf.berufserfahrung_1_titel,
      zeitraum: acf.berufserfahrung_1_zeitraum,
      beschreibung: acf.berufserfahrung_1_beschreibung,
    },
    { 
      titel: acf.berufserfahrung_2_titel,
      zeitraum: acf.berufserfahrung_2_zeitraum,
      beschreibung: acf.berufserfahrung_2_beschreibung,
    },
    { 
      titel: acf.berufserfahrung_3_titel,
      zeitraum: acf.berufserfahrung_3_zeitraum,
      beschreibung: acf.berufserfahrung_3_beschreibung,
    },
    { 
      titel: acf.berufserfahrung_4_titel,
      zeitraum: acf.berufserfahrung_4_zeitraum,
      beschreibung: acf.berufserfahrung_4_beschreibung,
    },
    { 
      titel: acf.berufserfahrung_5_titel,
      zeitraum: acf.berufserfahrung_5_zeitraum,
      beschreibung: acf.berufserfahrung_5_beschreibung,
    },
  ].filter(j => j.titel);

  // Sprachen
  const sprachen = [];
  if (acf.sprache_1) sprachen.push(acf.sprache_1);
  if (acf.sprache_2 && (acf.sprachen_anzeigen === '2' || acf.sprachen_anzeigen === '3')) sprachen.push(acf.sprache_2);
  if (acf.sprache_3 && acf.sprachen_anzeigen === '3') sprachen.push(acf.sprache_3);

  // Kleinere Headlines (12pt statt 13pt)
  const sectionTitleStyle = {
    fontSize: '12pt',
    fontWeight: 700,
    margin: '0 0 8pt 0',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.02em',
    color: '#2563eb',
    borderBottom: '1pt solid #2563eb',
    paddingBottom: '3pt',
  };

  const textStyle = {
    fontSize: '10.5pt',
    color: '#333',
    lineHeight: 1.4,
  };

  // Split jobs: First 3 on page 1, rest on page 2
  const jobsPage1 = jobs.slice(0, 3);
  const jobsPage2 = jobs.slice(3);

  return (
    <section className="print-only" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* SEITE 1 */}
      <div style={{ pageBreakAfter: 'always' }}>
        {/* HEADER MIT BILD */}
        <div style={{ 
          marginBottom: '16pt', 
          paddingBottom: '12pt', 
          borderBottom: '2pt solid #000',
          display: 'flex',
          alignItems: 'center',
          gap: '20pt'
        }}>
          {profilbild?.url && (
            <img 
              src={profilbild.url} 
              alt={`${vorname} ${nachname}`}
              style={{
                width: '80pt',
                height: '80pt',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2pt solid #ddd'
              }}
            />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ 
              fontSize: '30pt', 
              fontWeight: 700, 
              margin: 0, 
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#000'
            }}>
              {vorname} {nachname}
            </h1>
            <p style={{ 
              fontSize: '13pt', 
              margin: '6pt 0 0 0', 
              color: '#333',
              fontWeight: 500
            }}>
              {bereich}
            </p>
            <p style={{ 
              fontSize: '10.5pt', 
              margin: '6pt 0 0 0', 
              color: '#555' 
            }}>
              {e_mail} • {telefon} • LinkedIn
            </p>
          </div>
        </div>

        {/* HAUPT-LAYOUT SEITE 1: 2 SPALTEN (35/65) */}
        <div style={{ display: 'flex', gap: '32pt' }}>
          
          {/* LINKE SPALTE (35%) */}
          <div style={{ flex: '0 0 35%' }}>
            
            {/* DAS ZEICHNET MICH AUS */}
            {das_zeichnet_mich_aus && (
              <div style={{ marginBottom: '16pt' }}>
                <h2 style={sectionTitleStyle}>Das zeichnet mich aus</h2>
                <div style={textStyle} dangerouslySetInnerHTML={{ __html: das_zeichnet_mich_aus }} />
              </div>
            )}

            {/* SKILLS */}
            {(skillsGroup1.length > 0 || skillsGroup2.length > 0 || skillsGroup3.length > 0) && (
              <div style={{ marginBottom: '16pt' }}>
                <h2 style={sectionTitleStyle}>Skills</h2>
                
                {skillsGroup1.length > 0 && (
                  <ul style={{ margin: '0 0 8pt 0', padding: '0 0 0 16pt', ...textStyle }}>
                    {skillsGroup1.map((skill, i) => (
                      <li key={i} style={{ marginBottom: '2pt' }}>{skill}</li>
                    ))}
                  </ul>
                )}

                {skillsGroup2.length > 0 && (
                  <ul style={{ margin: '0 0 8pt 0', padding: '0 0 0 16pt', ...textStyle }}>
                    {skillsGroup2.map((skill, i) => (
                      <li key={i} style={{ marginBottom: '2pt' }}>{skill}</li>
                    ))}
                  </ul>
                )}

                {skillsGroup3.length > 0 && (
                  <ul style={{ margin: 0, padding: '0 0 0 16pt', ...textStyle }}>
                    {skillsGroup3.map((skill, i) => (
                      <li key={i} style={{ marginBottom: '2pt' }}>{skill}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* SOFT SKILLS */}
            {softSkills.length > 0 && (
              <div style={{ marginBottom: '16pt' }}>
                <h2 style={sectionTitleStyle}>Soft Skills</h2>
                <ul style={{ margin: 0, padding: '0 0 0 16pt', ...textStyle }}>
                  {softSkills.map((skill, i) => (
                    <li key={i} style={{ marginBottom: '2pt' }}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* SPRACHEN */}
            {sprachen.length > 0 && (
              <div>
                <h2 style={sectionTitleStyle}>Sprachen</h2>
                <ul style={{ margin: 0, padding: '0 0 0 16pt', ...textStyle }}>
                  {sprachen.map((sprache, i) => (
                    <li key={i} style={{ marginBottom: '2pt' }}>{sprache}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RECHTE SPALTE (65%) */}
          <div style={{ flex: '0 0 65%' }}>
            
            {/* BERUFSERFAHRUNG - SEITE 1 (erste 3 Jobs) */}
            {jobsPage1.length > 0 && (
              <div>
                <h2 style={sectionTitleStyle}>Berufserfahrung</h2>
                
                {jobsPage1.map((job, i) => (
                  <div key={i} style={{ marginBottom: i < jobsPage1.length - 1 ? '12pt' : 0, pageBreakInside: 'avoid' }}>
                    <p style={{ 
                      margin: '0 0 2pt 0', 
                      fontWeight: 700,
                      fontSize: '10.5pt'
                    }}>
                      {job.titel}
                    </p>
                    <p style={{ 
                      margin: '0 0 4pt 0', 
                      color: '#555',
                      fontSize: '10.5pt',
                      fontStyle: 'italic'
                    }}>
                      {job.zeitraum}
                    </p>
                    
                    {job.beschreibung && (
                      <div 
                        style={{ ...textStyle, marginLeft: '0' }}
                        dangerouslySetInnerHTML={{ __html: job.beschreibung }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEITE 2 */}
      <div>
        <div style={{ display: 'flex', gap: '32pt' }}>
          
          {/* LINKE SPALTE (35%) - KONTAKT */}
          <div style={{ flex: '0 0 35%' }}>
            <div>
              <h2 style={sectionTitleStyle}>Kontakt</h2>
              
              {kontakt_text && (
                <div style={{ ...textStyle, marginBottom: '12pt' }} dangerouslySetInnerHTML={{ __html: kontakt_text }} />
              )}
              
              {/* Kontaktdaten mit Icons */}
              <div style={{ ...textStyle }}>
                {telefon && (
                  <div style={{ marginBottom: '6pt', display: 'flex', alignItems: 'center', gap: '6pt' }}>
                    <span style={{ fontSize: '12pt' }}>📞</span>
                    <span>{telefon}</span>
                  </div>
                )}
                
                {e_mail && (
                  <div style={{ marginBottom: '6pt', display: 'flex', alignItems: 'center', gap: '6pt' }}>
                    <span style={{ fontSize: '12pt' }}>✉️</span>
                    <span>{e_mail}</span>
                  </div>
                )}
                
                {(adresse || plz || ort) && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6pt' }}>
                    <span style={{ fontSize: '12pt' }}>📍</span>
                    <span>
                      {adresse && <div>{adresse}</div>}
                      {(plz || ort) && <div>{plz} {ort}</div>}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RECHTE SPALTE (65%) - REST JOBS */}
          <div style={{ flex: '0 0 65%' }}>
            {jobsPage2.length > 0 && (
              <div>
                <h2 style={{ ...sectionTitleStyle, color: 'transparent', borderBottom: '1pt solid transparent' }}>&nbsp;</h2>
                
                {jobsPage2.map((job, i) => (
                  <div key={i} style={{ marginBottom: i < jobsPage2.length - 1 ? '12pt' : 0, pageBreakInside: 'avoid' }}>
                    <p style={{ 
                      margin: '0 0 2pt 0', 
                      fontWeight: 700,
                      fontSize: '10.5pt'
                    }}>
                      {job.titel}
                    </p>
                    <p style={{ 
                      margin: '0 0 4pt 0', 
                      color: '#555',
                      fontSize: '10.5pt',
                      fontStyle: 'italic'
                    }}>
                      {job.zeitraum}
                    </p>
                    
                    {job.beschreibung && (
                      <div 
                        style={{ ...textStyle, marginLeft: '0' }}
                        dangerouslySetInnerHTML={{ __html: job.beschreibung }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
