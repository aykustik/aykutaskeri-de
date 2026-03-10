import { ACFFields } from '@/types/wordpress';

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
    { name: acf.hard_skill_1 || '', strength: acf.hard_skill_1_starke || 0, color: acf.hard_skill_1_farbe || '#3b82f6' },
    { name: acf.hard_skill_2 || '', strength: acf.hard_skill_2_starke || 0, color: acf.hard_skill_2_farbe || '#3b82f6' },
    { name: acf.hard_skill_3 || '', strength: acf.hard_skill_3_starke || 0, color: acf.hard_skill_3_farbe || '#3b82f6' },
    { name: acf.hard_skill_4 || '', strength: acf.hard_skill_4_starke || 0, color: acf.hard_skill_4_farbe || '#3b82f6' },
    { name: acf.hard_skill_5 || '', strength: acf.hard_skill_5_starke || 0, color: acf.hard_skill_5_farbe || '#3b82f6' },
    { name: acf.hard_skill_6 || '', strength: acf.hard_skill_6_starke || 0, color: acf.hard_skill_6_farbe || '#3b82f6' },
    { name: acf.hard_skill_7 || '', strength: acf.hard_skill_7_starke || 0, color: acf.hard_skill_7_farbe || '#3b82f6' },
    { name: acf.hard_skill_8 || '', strength: acf.hard_skill_8_starke || 0, color: acf.hard_skill_8_farbe || '#3b82f6' },
    { name: acf.hard_skill_9 || '', strength: acf.hard_skill_9_starke || 0, color: acf.hard_skill_9_farbe || '#3b82f6' },
    { name: acf.hard_skill_10 || '', strength: acf.hard_skill_10_starke || 0, color: acf.hard_skill_10_farbe || '#3b82f6' },
    { name: acf.hard_skill_11 || '', strength: acf.hard_skill_11_starke || 0, color: acf.hard_skill_11_farbe || '#3b82f6' },
    { name: acf.hard_skill_12 || '', strength: acf.hard_skill_12_starke || 0, color: acf.hard_skill_12_farbe || '#3b82f6' },
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
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Fähigkeiten
        </h2>

        {acf.skills_text && (
          <p className="text-gray-600 mb-8">{acf.skills_text}</p>
        )}

        {hardSkills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Technische Fähigkeiten
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hardSkills.map((skill, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-800">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.strength}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
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
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
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
