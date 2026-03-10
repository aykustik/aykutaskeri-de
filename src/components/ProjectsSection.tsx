import { CVProject } from '@/types/wordpress';

interface ProjectsProps {
  projects: CVProject[];
}

export function ProjectsSection({ projects }: ProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
        Projekte
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-32 object-cover rounded mb-3"
              />
            )}
            <h3 className="text-lg font-semibold text-gray-900">
              {project.title}
            </h3>
            <div
              className="text-gray-600 text-sm mb-2"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-3">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline"
                >
                  Live Demo →
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 text-sm hover:underline"
                >
                  GitHub →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
