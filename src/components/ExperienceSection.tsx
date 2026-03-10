import { CVExperience } from '@/types/wordpress';

interface ExperienceProps {
  experiences: CVExperience[];
}

export function ExperienceSection({ experiences }: ExperienceProps) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
        Berufserfahrung
      </h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="relative pl-4 border-l-2 border-blue-500">
            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-500 rounded-full" />
            <h3 className="text-lg font-semibold text-gray-900">
              {exp.position}
            </h3>
            <p className="text-blue-600 font-medium">{exp.company}</p>
            <p className="text-sm text-gray-500 mb-2">
              {exp.start_date} - {exp.current ? 'Heute' : exp.end_date}
              {exp.location && ` • ${exp.location}`}
            </p>
            <div
              className="text-gray-700 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: exp.description }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
