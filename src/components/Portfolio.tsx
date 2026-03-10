import { ACFFields, WPImage } from '@/types/wordpress';

interface PortfolioProps {
  acf: ACFFields;
}

interface Project {
  title: string;
  text: string;
  image?: WPImage;
  link?: string;
}

export function PortfolioSection({ acf }: PortfolioProps) {
  const projects: Project[] = [
    {
      title: acf.portfolio_1_titel || '',
      text: acf.portfolio_1_text || '',
      image: acf.portfolio_1_bild,
      link: acf.portfolio_1_link,
    },
    {
      title: acf.portfolio_2_titel || '',
      text: acf.portfolio_2_text || '',
      image: acf.portfolio_2_bild,
      link: acf.portfolio_2_link,
    },
    {
      title: acf.portfolio_3_titel || '',
      text: acf.portfolio_3_text || '',
      image: acf.portfolio_3_bild,
      link: acf.portfolio_3_link,
    },
    {
      title: acf.portfolio_4_titel || '',
      text: acf.portfolio_4_text || '',
      image: acf.portfolio_4_bild,
      link: acf.portfolio_4_link,
    },
    {
      title: acf.portfolio_5_titel || '',
      text: acf.portfolio_5_text || '',
      image: acf.portfolio_5_bild,
      link: acf.portfolio_5_link,
    },
    {
      title: acf.portfolio_6_titel || '',
      text: acf.portfolio_6_text || '',
      image: acf.portfolio_6_bild,
      link: acf.portfolio_6_link,
    },
  ].filter(project => project.title);

  if (projects.length === 0) return null;

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Portfolio
        </h2>

        {acf.portfolio_text && (
          <p className="text-gray-600 mb-8">{acf.portfolio_text}</p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {project.image && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image.url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                {project.text && (
                  <div 
                    className="text-gray-600 text-sm mb-3 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: project.text }}
                  />
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Projekt ansehen →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
