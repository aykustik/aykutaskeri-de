import { CVSkill } from '@/types/wordpress';

interface SkillsProps {
  skills: CVSkill[];
}

export function SkillsSection({ skills }: SkillsProps) {
  if (!skills || skills.length === 0) return null;

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert':
        return 'bg-green-600';
      case 'advanced':
        return 'bg-blue-600';
      case 'intermediate':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getLevelWidth = (level: string) => {
    switch (level) {
      case 'expert':
        return 'w-full';
      case 'advanced':
        return 'w-4/5';
      case 'intermediate':
        return 'w-3/5';
      default:
        return 'w-2/5';
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Sonstige';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, CVSkill[]>);

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
        Fähigkeiten
      </h2>
      {Object.entries(groupedSkills).map(([category, categorySkills]) => (
        <div key={category} className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {categorySkills.map((skill, index) => (
              <div key={index} className="flex flex-col w-full max-w-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {skill.name}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {skill.level}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getLevelColor(skill.level)} ${getLevelWidth(skill.level)}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
