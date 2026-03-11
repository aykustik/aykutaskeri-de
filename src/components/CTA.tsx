'use client';
import { ACFFields } from '@/types/wordpress';
import { decodeHtml } from '@/lib/utils';

interface CTAProps { acf: ACFFields }

export function CTASection({ acf }: CTAProps) {
  const { cta_header, cta_text } = acf;
  if (!cta_header && !cta_text) return null;

  const scrollToKontakt = () => {
    document.getElementById('kennenlernen')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 no-print" id="cta-section" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 55%, #0f172a 100%)' }}>
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            {cta_header && (
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                {cta_header}
              </h2>
            )}
            {cta_text && (
              <div
                className="text-slate-300 text-lg max-w-xl leading-relaxed prose prose-invert"
                dangerouslySetInnerHTML={{ __html: decodeHtml(cta_text) }}
              />
            )}
          </div>
          <button
            onClick={scrollToKontakt}
            className="btn btn-orange flex-shrink-0 text-base px-8 py-4"
          >
            Jetzt kennenlernen
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
