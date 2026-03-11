'use client';
import { ACFFields } from '@/types/wordpress';

interface HeroProps { acf: ACFFields }

export function HeroSection({ acf }: HeroProps) {
  const { vorname, bereich } = acf;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative overflow-hidden py-20 md:py-32"
      id="intro"
      style={{ background: 'linear-gradient(160deg, #ffffff 0%, #f0f0ff 60%, #eeeffe 100%)' }}
    >
      {/* Decorative background blob */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--brand-purple-grad) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--brand-purple) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        aria-hidden="true"
      />

      <div className="section-container relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">

          {/* Left: headline */}
          <div className="animate-fade-in-up">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase"
                 style={{ background: 'var(--brand-purple-light)', color: 'var(--brand-purple)' }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'var(--brand-purple)' }} />
              Online-Marketing · Hamburg
            </div>

            <h2 className="font-heading font-bold text-slate-900 leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}>
              Hi! Ich bin{' '}
              <span
                style={{
                  color: 'var(--brand-purple)',
                  display: 'inline-block',
                }}
              >
                {vorname}.
              </span>
            </h2>

            {bereich && (
              <p className="mt-5 text-lg md:text-xl text-slate-500 font-medium max-w-md leading-relaxed">
                Und ich liebe{' '}
                <span className="font-semibold text-slate-700">{bereich}.</span>
              </p>
            )}
          </div>

          {/* Right: CTAs */}
          <div className="flex flex-col gap-3 md:items-end animate-fade-in-up delay-200 flex-shrink-0">
            <button
              onClick={() => scrollTo('skills')}
              className="btn btn-primary"
              style={{ minWidth: '160px' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Zu den Skills
            </button>
            <button
              onClick={() => scrollTo('kontakt')}
              className="btn btn-outline"
              style={{ minWidth: '160px' }}
            >
              Kennenlernen
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
