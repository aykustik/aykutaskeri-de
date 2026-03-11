import { ACFFields } from '@/types/wordpress';
import { decodeHtml } from '@/lib/utils';

interface SkillsProps { acf: ACFFields }

function numVal(v: number | string | undefined): number {
  return typeof v === 'string' ? parseInt(v, 10) || 0 : (v ?? 0);
}

export function SkillsSection({ acf }: SkillsProps) {
  const hardSkills = [
    { name: acf.hard_skill_1,  strength: numVal(acf.hard_skill_1_starke),  color: acf.hard_skill_1_farbe  },
    { name: acf.hard_skill_2,  strength: numVal(acf.hard_skill_2_starke),  color: acf.hard_skill_2_farbe  },
    { name: acf.hard_skill_3,  strength: numVal(acf.hard_skill_3_starke),  color: acf.hard_skill_3_farbe  },
    { name: acf.hard_skill_4,  strength: numVal(acf.hard_skill_4_starke),  color: acf.hard_skill_4_farbe  },
    { name: acf.hard_skill_5,  strength: numVal(acf.hard_skill_5_starke),  color: acf.hard_skill_5_farbe  },
    { name: acf.hard_skill_6,  strength: numVal(acf.hard_skill_6_starke),  color: acf.hard_skill_6_farbe  },
    { name: acf.hard_skill_7,  strength: numVal(acf.hard_skill_7_starke),  color: acf.hard_skill_7_farbe  },
    { name: acf.hard_skill_8,  strength: numVal(acf.hard_skill_8_starke),  color: acf.hard_skill_8_farbe  },
    { name: acf.hard_skill_9,  strength: numVal(acf.hard_skill_9_starke),  color: acf.hard_skill_9_farbe  },
    { name: acf.hard_skill_10, strength: numVal(acf.hard_skill_10_starke), color: acf.hard_skill_10_farbe },
    { name: acf.hard_skill_11, strength: numVal(acf.hard_skill_11_starke), color: acf.hard_skill_11_farbe },
    { name: acf.hard_skill_12, strength: numVal(acf.hard_skill_12_starke), color: acf.hard_skill_12_farbe },
  ].filter(s => s.name);

  const softSkills = [
    acf.soft_skill_1, acf.soft_skill_2, acf.soft_skill_3,
    acf.soft_skill_4, acf.soft_skill_5, acf.soft_skill_6,
  ].filter(Boolean) as string[];

  if (!hardSkills.length && !softSkills.length) return null;

  return (
    <section className="section-white py-16 print-avoid" id="skills">
      <div className="section-container">
        <h2 className="section-title">Meine Skills</h2>
        <div className="divider mt-4 mb-8" />

        {acf.skills_text && (
          <div
            className="body-text mb-10 max-w-2xl prose prose-slate"
            dangerouslySetInnerHTML={{ __html: decodeHtml(acf.skills_text) }}
          />
        )}

        {hardSkills.length > 0 && (
          <div className="mb-10">
            <h3 className="font-heading font-semibold text-slate-700 text-base mb-5">Technische Fähigkeiten</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hardSkills.map((skill, i) => {
                const clr = skill.color || '#43C26E';
                return (
                  <div key={i} className="card p-5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-slate-800 text-sm">{skill.name}</span>
                      <span className="text-xs font-semibold tabular-nums" style={{ color: clr }}>{skill.strength}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${skill.strength}%`, backgroundColor: clr }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {softSkills.length > 0 && (
          <div>
            <h3 className="font-heading font-semibold text-slate-700 text-base mb-4">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill, i) => (
                <span key={i} className="badge badge-green">{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
