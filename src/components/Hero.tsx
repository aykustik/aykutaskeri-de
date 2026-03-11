'use client';
import { ACFFields } from '@/types/wordpress';

interface HeroProps { acf: ACFFields }

export function HeroSection({ acf }: HeroProps) {
  const { vorname, bereich } = acf;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-white py-16 md:py-24" id="intro">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="animate-fade-in-up">
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
              Hi!<br />
              <span>Ich bin </span>
              <span style={{ color: 'var(--brand-purple)' }}>{vorname}.</span>
            </h2>
            {bereich && (
              <p className="mt-4 text-xl md:text-2xl text-slate-500 font-medium">
                Und ich liebe <span className="text-slate-700 font-semibold">{bereich}.</span>
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 md:items-end animate-fade-in-up delay-200">
            <button
              onClick={() => scrollTo('skills')}
              className="btn btn-primary"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Zu den Skills
            </button>
            <button
              onClick={() => scrollTo('kontakt')}
              className="btn btn-outline"
            >
              Kennenlernen
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
