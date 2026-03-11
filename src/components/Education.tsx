'use client';
import { useState, useEffect, useRef } from 'react';
import { ACFFields } from '@/types/wordpress';
import { decodeHtml } from '@/lib/utils';

interface EducationProps { acf: ACFFields }

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', color: 'var(--brand-purple)' }}
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function WeiterbildungSection({ acf }: EducationProps) {
  const weiterbildung = [
    { title: acf.weiterbildung_1_titel,  content: acf.weiterbildung_1_inhalt  },
    { title: acf.weiterbildung_2_titel,  content: acf.weiterbildung_2_inhalt  },
    { title: acf.weiterbildung_3_titel,  content: acf.weiterbildung_3_inhalt  },
    { title: acf.weiterbildung_4_titel,  content: acf.weiterbildung_4_inhalt  },
    { title: acf.weiterbildung_5_titel,  content: acf.weiterbildung_5_inhalt  },
    { title: acf.weiterbildung_6_titel,  content: acf.weiterbildung_6_inhalt  },
    { title: acf.weiterbildung_7_titel,  content: acf.weiterbildung_7_inhalt  },
    { title: acf.weiterbildung_8_titel,  content: acf.weiterbildung_8_inhalt  },
    { title: acf.weiterbildung_9_titel,  content: acf.weiterbildung_9_inhalt  },
    { title: acf.weiterbildung_10_titel, content: acf.weiterbildung_10_inhalt },
    { title: acf.weiterbildung_11_titel, content: acf.weiterbildung_11_inhalt },
    { title: acf.weiterbildung_12_titel, content: acf.weiterbildung_12_inhalt },
  ].filter(e => e.title);

  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  if (!weiterbildung.length) return null;

  const toggle = (i: number) =>
    setOpenSet(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <section className="section-white py-16" id="weiterbildung">
      <div className="section-container">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--brand-purple-light)' }}>
            <svg className="w-5 h-5" fill="none" stroke="var(--brand-purple)" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h2 className="section-title mb-0">Weiterbildung</h2>
        </div>
        <div className="divider mt-2 mb-8" />
        {acf.weiterbildung_text && (
          <div className="body-text mb-8 max-w-2xl prose prose-slate"
               dangerouslySetInnerHTML={{ __html: decodeHtml(acf.weiterbildung_text) }} />
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {weiterbildung.map((cert, i) => {
            const isOpen = openSet.has(i);
            const hasContent = !!cert.content;
            return (
              <div
                key={i}
                className={`card print-avoid overflow-hidden${hasContent ? ' card-interactive cursor-pointer' : ''}`}
                onClick={hasContent ? () => toggle(i) : undefined}
                role={hasContent ? 'button' : undefined}
                aria-expanded={hasContent ? isOpen : undefined}
              >
                <div className="flex gap-3 items-center p-5">
                  <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center screen-only"
                       style={{ background: 'var(--brand-emerald-light)' }}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="var(--brand-emerald)" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4
                    className="font-semibold text-slate-800 text-sm leading-snug flex-1"
                    dangerouslySetInnerHTML={{ __html: decodeHtml(cert.title!) }}
                  />
                  {hasContent && <Chevron open={isOpen} />}
                </div>

                {hasContent && (
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isOpen ? '500px' : '0px',
                      opacity: isOpen ? 1 : 0,
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <div
                      className="px-5 pb-5 prose prose-sm prose-slate max-w-none text-slate-500"
                      dangerouslySetInnerHTML={{ __html: decodeHtml(cert.content!) }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AusbildungSection({ acf }: EducationProps) {
  const ausbildung = [
    { title: acf.ausbildung_1_titel, content: acf.ausbildung_1_inhalt },
    { title: acf.ausbildung_2_titel, content: acf.ausbildung_2_inhalt },
    { title: acf.ausbildung_3_titel, content: acf.ausbildung_3_inhalt },
  ].filter(e => e.title);

  const [openSet, setOpenSet] = useState<Set<number>>(new Set());
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.timeline-card');
    if (cards.length === 0) return;

    const observers: IntersectionObserver[] = [];

    cards.forEach((card, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndices((prev) => {
              const next = new Set(prev);
              next.add(index);
              return next;
            });
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(card);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const maxActiveIndex = activeIndices.size > 0 ? Math.max(...Array.from(activeIndices)) : -1;

  const toggle = (i: number) =>
    setOpenSet(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  if (!ausbildung.length) return null;

  return (
    <section className="section-gray py-16" id="ausbildung">
      <div className="section-container">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--brand-purple-light)' }}>
            <svg className="w-5 h-5" fill="none" stroke="var(--brand-purple)" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </div>
          <h2 className="section-title mb-0">Ausbildung</h2>
        </div>
        <div className="divider mt-2 mb-8" />
        {acf.ausbildung_text && (
          <div className="body-text mb-8 max-w-2xl prose prose-slate"
               dangerouslySetInnerHTML={{ __html: decodeHtml(acf.ausbildung_text) }} />
        )}

        <div ref={containerRef} className="relative">
          <TimelineLine containerRef={containerRef} maxIndex={maxActiveIndex} accordionTrigger={openSet} />

          <div className="space-y-4">
            {ausbildung.map((edu, i) => {
              const isOpen = openSet.has(i);
              const hasContent = !!edu.content;
              const isActive = activeIndices.has(i);

              return (
                <div key={i} className="timeline-item relative pl-12 md:pl-16 print-avoid">
                  <div
                    className={`absolute left-2 md:left-4 w-5 h-5 rounded-full border-2 border-white shadow-md screen-only transition-all duration-500 ${
                      isActive ? 'timeline-dot-active' : 'timeline-dot-inactive'
                    }`}
                    style={{
                      background: isActive ? 'var(--brand-purple)' : '#cbd5e1',
                      top: '28px',
                    }}
                  />

                  <div
                    className={`timeline-card card overflow-hidden${hasContent ? ' card-interactive cursor-pointer' : ''} transition-all duration-700 ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    onClick={hasContent ? () => toggle(i) : undefined}
                    role={hasContent ? 'button' : undefined}
                    aria-expanded={hasContent ? isOpen : undefined}
                  >
                    <div className="flex items-center gap-3 p-6">
                      <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center screen-only"
                           style={{ background: 'var(--brand-purple-light)' }}>
                        <svg className="w-4 h-4" fill="none" stroke="var(--brand-purple)" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                      </div>
                      <h3
                        className="font-heading font-bold text-slate-900 text-sm leading-snug flex-1"
                        dangerouslySetInnerHTML={{ __html: decodeHtml(edu.title!) }}
                      />
                      {hasContent && <Chevron open={isOpen} />}
                    </div>

                    {hasContent && (
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{
                          maxHeight: isOpen ? '500px' : '0px',
                          opacity: isOpen ? 1 : 0,
                          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        <div
                          className="px-6 pb-6 prose prose-sm prose-slate max-w-none body-text"
                          dangerouslySetInnerHTML={{ __html: decodeHtml(edu.content!) }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineLine({ containerRef, maxIndex, accordionTrigger }: { containerRef: React.RefObject<HTMLDivElement>; maxIndex: number; accordionTrigger?: Set<number> }) {
  const lineRef = useRef<HTMLDivElement>(null);
  const [fillHeight, setFillHeight] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    const cards = container.querySelectorAll('.timeline-card');
    if (cards.length === 0) return;

    const updateHeight = () => {
      if (maxIndex < 0) {
        setFillHeight(0);
        return;
      }

      const activeCard = cards[maxIndex] as HTMLElement;
      if (!activeCard) {
        setFillHeight(0);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const cardRect = activeCard.getBoundingClientRect();
      const relativeTop = cardRect.top - containerRect.top + cardRect.height;
      setFillHeight(Math.max(0, relativeTop - 8));
    };

    updateHeight();
    window.addEventListener('scroll', updateHeight, { passive: true });
    window.addEventListener('resize', updateHeight);
    requestAnimationFrame(updateHeight);

    return () => {
      window.removeEventListener('scroll', updateHeight);
      window.removeEventListener('resize', updateHeight);
    };
  }, [containerRef, maxIndex, accordionTrigger]);

  return (
    <div ref={lineRef} className="timeline-line absolute left-4 md:left-6 top-2 bottom-2 w-0.5 screen-only">
      <div
        style={{
          background: 'linear-gradient(to bottom, var(--brand-purple), var(--brand-purple-grad))',
          height: `${fillHeight}px`,
          transition: 'height 0.3s ease-out',
        }}
      />
    </div>
  );
}

export function EducationSection({ acf }: EducationProps) {
  return (
    <>
      <WeiterbildungSection acf={acf} />
      <AusbildungSection acf={acf} />
    </>
  );
}
