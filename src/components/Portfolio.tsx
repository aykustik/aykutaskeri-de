import { ACFFields, WPImage } from '@/types/wordpress';
import { decodeHtml } from '@/lib/utils';

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
    <section className="py-16 bg-white" id="portfolio">
      <div className="section-container">
        <div className="mb-10">
          <h2 className="section-title">Portfolio</h2>
          <div className="divider mt-4"></div>
        </div>

        {acf.portfolio_text && (
          <p className="text-dark-600 mb-10 max-w-2xl leading-relaxed">{decodeHtml(acf.portfolio_text)}</p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link || '#'}
              target={project.link ? '_blank' : '_self'}
              rel={project.link ? 'noopener noreferrer' : undefined}
              className="card-elevated overflow-hidden group hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {project.image && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image.url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {project.title}
                </h3>
                {project.text && (
                  <div 
                    className="text-dark-500 text-sm mb-3 line-clamp-2 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: decodeHtml(project.text) }}
                  />
                )}
                {project.link && (
                  <span className="inline-flex items-center text-sm font-medium text-primary-600 group-hover:underline">
                    Projekt ansehen 
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
