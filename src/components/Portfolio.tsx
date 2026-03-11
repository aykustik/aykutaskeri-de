import { ACFFields } from '@/types/wordpress';
import { decodeHtml } from '@/lib/utils';

interface PortfolioProps { acf: ACFFields }

export function PortfolioSection({ acf }: PortfolioProps) {
  const projects = [
    { title: acf.portfolio_1_titel, text: acf.portfolio_1_text, image: acf.portfolio_1_bild, link: acf.portfolio_1_link },
    { title: acf.portfolio_2_titel, text: acf.portfolio_2_text, image: acf.portfolio_2_bild, link: acf.portfolio_2_link },
    { title: acf.portfolio_3_titel, text: acf.portfolio_3_text, image: acf.portfolio_3_bild, link: acf.portfolio_3_link },
    { title: acf.portfolio_4_titel, text: acf.portfolio_4_text, image: acf.portfolio_4_bild, link: acf.portfolio_4_link },
    { title: acf.portfolio_5_titel, text: acf.portfolio_5_text, image: acf.portfolio_5_bild, link: acf.portfolio_5_link },
    { title: acf.portfolio_6_titel, text: acf.portfolio_6_text, image: acf.portfolio_6_bild, link: acf.portfolio_6_link },
  ].filter(p => p.title);

  if (!projects.length) return null;

  return (
    <section className="section-gray py-16 screen-only" id="portfolio">
      <div className="section-container">
        <h2 className="section-title">Portfolio</h2>
        <div className="divider mt-4 mb-8" />

        {acf.portfolio_text && (
          <div className="body-text mb-10 max-w-2xl prose prose-slate"
               dangerouslySetInnerHTML={{ __html: decodeHtml(acf.portfolio_text) }} />
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <a
              key={i}
              href={p.link || '#'}
              target={p.link ? '_blank' : '_self'}
              rel={p.link ? 'noopener noreferrer' : undefined}
              className="card block overflow-hidden group cursor-pointer"
            >
              {p.image && (
                <div className="h-40 overflow-hidden bg-slate-100 flex items-center justify-center p-6">
                  <img
                    src={p.image.url}
                    alt={p.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-heading font-bold text-slate-900 text-base mb-2 transition-colors group-hover:text-brand-purple">
                  {p.title}
                </h3>
                {p.text && (
                  <div className="text-slate-500 text-sm leading-relaxed line-clamp-3"
                       dangerouslySetInnerHTML={{ __html: decodeHtml(p.text) }} />
                )}
                {p.link && (
                  <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold"
                        style={{ color: 'var(--brand-emerald)' }}>
                    Ansehen
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
