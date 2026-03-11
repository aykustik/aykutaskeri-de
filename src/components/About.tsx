import { ACFFields } from '@/types/wordpress';
import { decodeHtml } from '@/lib/utils';

interface AboutProps { acf: ACFFields }

const LANG_COLORS: Record<string, string> = {
  deutsch:   '#43C26E',
  german:    '#43C26E',
  englisch:  '#575CC2',
  english:   '#575CC2',
  türkisch:  '#C2A73A',
  turkish:   '#C2A73A',
  turkisch:  '#C2A73A',
};

function langColor(name: string | undefined, fallback: string): string {
  if (!name) return fallback;
  return LANG_COLORS[name.toLowerCase()] ?? fallback;
}

function numVal(v: number | string | undefined): number {
  return typeof v === 'string' ? parseInt(v, 10) || 0 : (v ?? 0);
}

function showLangCount(v: string | undefined): number {
  if (!v || v === 'Keine Sprache anzeigen' || v === '0') return 0;
  const n = parseInt(v, 10);
  if (!isNaN(n)) return n;
  if (v.includes('Eine') || v.includes('1')) return 1;
  if (v.includes('Zwei') || v.includes('2')) return 2;
  if (v.includes('Drei') || v.includes('3')) return 3;
  return 0;
}

function LanguageCircle({ name, pct, color }: { name: string; pct: number; color: string }) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90 language-circle-svg" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={r} fill="none" stroke="#e2e8f0" strokeWidth="6" />
          <circle
            cx="48" cy="48" r={r} fill="none"
            stroke={color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-bold text-slate-800">{pct}%</span>
        </div>
      </div>
      <span className="text-sm font-medium text-slate-600">{name}</span>
    </div>
  );
}

const BEREICH_ICONS: Record<number, string> = {
  1: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`,
  2: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  3: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  4: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
};

export function AboutSection({ acf }: AboutProps) {
  const {
    uber_mich_text,
    das_zeichnet_mich_aus, das_mag_ich_nicht,
    bereich_1, bereich_1_text,
    bereich_2, bereich_2_text,
    bereich_3, bereich_3_text,
    bereich_4, bereich_4_text,
    sprachen_anzeigen,
    sprache_1, sprache_1_starke, sprache_1_farbe,
    sprache_2, sprache_2_starke, sprache_2_farbe,
    sprache_3, sprache_3_starke, sprache_3_farbe,
  } = acf;

  const langCount = showLangCount(sprachen_anzeigen);
  const bereiche = [
    { title: bereich_1, text: bereich_1_text, n: 1 },
    { title: bereich_2, text: bereich_2_text, n: 2 },
    { title: bereich_3, text: bereich_3_text, n: 3 },
    { title: bereich_4, text: bereich_4_text, n: 4 },
  ].filter(b => b.title);

  return (
    <section className="section-gray py-16 print-avoid" id="ueber-mich">
      <div className="section-container space-y-12">

        {/* Über mich Text */}
        {uber_mich_text && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="section-title">Über mich</h2>
            </div>
            <div className="divider mb-6" />
            <div
              className="body-text prose prose-slate max-w-3xl"
              dangerouslySetInnerHTML={{ __html: decodeHtml(uber_mich_text) }}
            />
          </div>
        )}

        {/* 4 Bereichs-Kacheln */}
        {bereiche.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bereiche.map(({ title, text, n }) => (
              <div key={n} className="card p-6 print-avoid">
                <div
                  className="w-10 h-10 mb-4 text-[color:var(--brand-green)]"
                  dangerouslySetInnerHTML={{ __html: BEREICH_ICONS[n] }}
                />
                <h3 className="font-heading font-700 text-slate-900 text-base mb-2">{title}</h3>
                {text && <p className="text-slate-500 text-sm leading-relaxed">{text}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Das zeichnet mich aus / Das mag ich nicht + Sprachen */}
        {(das_zeichnet_mich_aus || das_mag_ich_nicht || langCount > 0) && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-5">
              {das_zeichnet_mich_aus && (
                <div className="card p-6 print-avoid">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                         style={{ background: '#e8f8ee' }}>
                      <svg className="w-5 h-5" fill="none" stroke="#43C26E" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-heading font-semibold text-slate-800 text-sm">Das zeichnet mich aus</h3>
                  </div>
                  <div
                    className="prose prose-sm prose-slate max-w-none body-text"
                    dangerouslySetInnerHTML={{ __html: decodeHtml(das_zeichnet_mich_aus) }}
                  />
                </div>
              )}
              {das_mag_ich_nicht && (
                <div className="card p-6 print-avoid">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                         style={{ background: '#fef2f2' }}>
                      <svg className="w-5 h-5" fill="none" stroke="#ef4444" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h3 className="font-heading font-semibold text-slate-800 text-sm">Das mag ich nicht</h3>
                  </div>
                  <div
                    className="prose prose-sm prose-slate max-w-none body-text"
                    dangerouslySetInnerHTML={{ __html: decodeHtml(das_mag_ich_nicht) }}
                  />
                </div>
              )}
            </div>

            {langCount > 0 && (
              <div className="card p-6 print-avoid">
                <h3 className="font-heading font-semibold text-slate-800 mb-6 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  Sprachen
                </h3>
                <div className="flex flex-wrap justify-center gap-6">
                  {sprache_1 && langCount >= 1 && (
                    <LanguageCircle
                      name={sprache_1}
                      pct={numVal(sprache_1_starke)}
                      color={langColor(sprache_1, sprache_1_farbe || '#43C26E')}
                    />
                  )}
                  {sprache_2 && langCount >= 2 && (
                    <LanguageCircle
                      name={sprache_2}
                      pct={numVal(sprache_2_starke)}
                      color={langColor(sprache_2, sprache_2_farbe || '#575CC2')}
                    />
                  )}
                  {sprache_3 && langCount >= 3 && (
                    <LanguageCircle
                      name={sprache_3}
                      pct={numVal(sprache_3_starke)}
                      color={langColor(sprache_3, sprache_3_farbe || '#C2A73A')}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
