import { ACFFields } from '@/types/wordpress';
import { decodeHtml } from '@/lib/utils';

interface SkillsProps {
  acf: ACFFields;
}

interface Skill {
  name: string;
  strength: number;
  color: string;
}

export function SkillsSection({ acf }: SkillsProps) {
  const hardSkills: Skill[] = [
    { name: acf.hard_skill_1 || '', strength: acf.hard_skill_1_starke || 0, color: acf.hard_skill_1_farbe || '#0ea5e9' },
    { name: acf.hard_skill_2 || '', strength: acf.hard_skill_2_starke || 0, color: acf.hard_skill_2_farbe || '#0ea5e9' },
    { name: acf.hard_skill_3 || '', strength: acf.hard_skill_3_starke || 0, color: acf.hard_skill_3_farbe || '#0ea5e9' },
    { name: acf.hard_skill_4 || '', strength: acf.hard_skill_4_starke || 0, color: acf.hard_skill_4_farbe || '#0ea5e9' },
    { name: acf.hard_skill_5 || '', strength: acf.hard_skill_5_starke || 0, color: acf.hard_skill_5_farbe || '#0ea5e9' },
    { name: acf.hard_skill_6 || '', strength: acf.hard_skill_6_starke || 0, color: acf.hard_skill_6_farbe || '#0ea5e9' },
    { name: acf.hard_skill_7 || '', strength: acf.hard_skill_7_starke || 0, color: acf.hard_skill_7_farbe || '#0ea5e9' },
    { name: acf.hard_skill_8 || '', strength: acf.hard_skill_8_starke || 0, color: acf.hard_skill_8_farbe || '#0ea5e9' },
    { name: acf.hard_skill_9 || '', strength: acf.hard_skill_9_starke || 0, color: acf.hard_skill_9_farbe || '#0ea5e9' },
    { name: acf.hard_skill_10 || '', strength: acf.hard_skill_10_starke || 0, color: acf.hard_skill_10_farbe || '#0ea5e9' },
    { name: acf.hard_skill_11 || '', strength: acf.hard_skill_11_starke || 0, color: acf.hard_skill_11_farbe || '#0ea5e9' },
    { name: acf.hard_skill_12 || '', strength: acf.hard_skill_12_starke || 0, color: acf.hard_skill_12_farbe || '#0ea5e9' },
  ].filter(s => s.name);

  const softSkills = [
    acf.soft_skill_1,
    acf.soft_skill_2,
    acf.soft_skill_3,
    acf.soft_skill_4,
    acf.soft_skill_5,
    acf.soft_skill_6,
  ].filter(Boolean);

  if (hardSkills.length === 0 && softSkills.length === 0) return null;

  return (
    <section className="py-16 bg-slate-50 print-break-inside" id="skills">
      <div className="section-container">
        <div className="mb-10">
          <h2 className="section-title">Meine Skills</h2>
          <div className="divider mt-4"></div>
        </div>

        {acf.skills_text && (
          <div className="text-dark-600 mb-10 max-w-2xl leading-relaxed" dangerouslySetInnerHTML={{ __html: decodeHtml(acf.skills_text) }} />
        )}

        {hardSkills.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-dark-700 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Technische Fähigkeiten
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {hardSkills.map((skill, index) => (
                <div 
                  key={index} 
                  className="card-elevated p-5 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-dark-800">{skill.name}</span>
                    <span className="text-sm font-medium" style={{ color: skill.color }}>{skill.strength}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${skill.strength}%`,
                        backgroundColor: skill.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {softSkills.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-dark-700 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {softSkills.map((skill, index) => (
                <span
                  key={index}
                  className="badge-primary hover:bg-primary-100 hover:scale-105 transition-all duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
