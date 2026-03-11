'use client';
import { useEffect, useRef, useState } from 'react';
import { ACFFields } from '@/types/wordpress';
import { decodeHtml } from '@/lib/utils';

interface SkillsProps { acf: ACFFields }

function numVal(v: number | string | undefined): number {
  return typeof v === 'string' ? parseInt(v, 10) || 0 : (v ?? 0);
}

/** Ensure the color from WP is a usable CSS value (not an Elementor var). Fall back to brand purple. */
function resolveColor(raw: string | undefined): string {
  if (!raw) return 'var(--brand-purple)';
  if (raw.startsWith('var(--e-')) return 'var(--brand-purple)';
  return raw;
}

function SkillBar({ name, strength, color }: { name: string; strength: number; color: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Build a lighter tint of the bar color for the gradient endpoint
  // We use the color at 85% opacity overlaid on white → approximate it by mixing with white
  // Simpler: just use the color with reduced opacity for the right side
  const barStyle: React.CSSProperties = {
    width: visible ? `${strength}%` : '0%',
    transition: visible ? 'width 0.8s cubic-bezier(0.4,0,0.2,1)' : 'none',
    backgroundImage: `
      repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 5px,
        rgba(255,255,255,0.18) 5px,
        rgba(255,255,255,0.18) 10px
      ),
      linear-gradient(to right, ${color}, ${color}cc)
    `,
    backgroundSize: '28px 100%, 100% 100%',
    // stripe slide animation only — no bar-grow (width is JS-controlled)
    animation: 'stripe-slide var(--stripe-speed) linear infinite',
  };

  return (
    <div ref={ref} className="p-5 bg-white rounded-2xl border border-slate-200">
      <div className="flex justify-between items-center mb-3">
        <span className="font-medium text-slate-800 text-sm">{name}</span>
        <span
          className="text-xs font-semibold tabular-nums transition-opacity duration-500"
          style={{ color, opacity: visible ? 1 : 0 }}
        >
          {strength}%
        </span>
      </div>
      <div className="progress-track">
        <div className="progress-fill-custom" style={barStyle} />
      </div>
    </div>
  );
}

export function SkillsSection({ acf }: SkillsProps) {
  const hardSkills = [
    { name: acf.hard_skill_1,  strength: numVal(acf.hard_skill_1_starke),  color: resolveColor(acf.hard_skill_1_farbe)  },
    { name: acf.hard_skill_2,  strength: numVal(acf.hard_skill_2_starke),  color: resolveColor(acf.hard_skill_2_farbe)  },
    { name: acf.hard_skill_3,  strength: numVal(acf.hard_skill_3_starke),  color: resolveColor(acf.hard_skill_3_farbe)  },
    { name: acf.hard_skill_4,  strength: numVal(acf.hard_skill_4_starke),  color: resolveColor(acf.hard_skill_4_farbe)  },
    { name: acf.hard_skill_5,  strength: numVal(acf.hard_skill_5_starke),  color: resolveColor(acf.hard_skill_5_farbe)  },
    { name: acf.hard_skill_6,  strength: numVal(acf.hard_skill_6_starke),  color: resolveColor(acf.hard_skill_6_farbe)  },
    { name: acf.hard_skill_7,  strength: numVal(acf.hard_skill_7_starke),  color: resolveColor(acf.hard_skill_7_farbe)  },
    { name: acf.hard_skill_8,  strength: numVal(acf.hard_skill_8_starke),  color: resolveColor(acf.hard_skill_8_farbe)  },
    { name: acf.hard_skill_9,  strength: numVal(acf.hard_skill_9_starke),  color: resolveColor(acf.hard_skill_9_farbe)  },
    { name: acf.hard_skill_10, strength: numVal(acf.hard_skill_10_starke), color: resolveColor(acf.hard_skill_10_farbe) },
    { name: acf.hard_skill_11, strength: numVal(acf.hard_skill_11_starke), color: resolveColor(acf.hard_skill_11_farbe) },
    { name: acf.hard_skill_12, strength: numVal(acf.hard_skill_12_starke), color: resolveColor(acf.hard_skill_12_farbe) },
  ].filter(s => s.name);

  const softSkills = [
    acf.soft_skill_1, acf.soft_skill_2, acf.soft_skill_3,
    acf.soft_skill_4, acf.soft_skill_5, acf.soft_skill_6,
  ].filter(Boolean) as string[];

  if (!hardSkills.length && !softSkills.length) return null;

  return (
    <section className="section-white py-16 print-avoid" id="skills">
      <div className="section-container">
        <h2 className="section-title">Meine Skills</h2>
        <div className="divider mt-4 mb-8" />

        {acf.skills_text && (
          <div
            className="body-text mb-10 max-w-2xl prose prose-slate"
            dangerouslySetInnerHTML={{ __html: decodeHtml(acf.skills_text) }}
          />
        )}

        {hardSkills.length > 0 && (
          <div className="mb-10">
            <h3 className="font-heading font-semibold text-slate-700 text-base mb-5">
              Technische Fähigkeiten
            </h3>

            {/* Screen: animated progress bar cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 screen-only">
              {hardSkills.map((skill, i) => (
                <SkillBar key={i} name={skill.name!} strength={skill.strength} color={skill.color} />
              ))}
            </div>

            {/* Print: plain two-column text list */}
            <div className="print-only" style={{ columns: 2, columnGap: '2rem' }}>
              {hardSkills.map((skill, i) => (
                <div key={i} style={{ breakInside: 'avoid', marginBottom: '3pt' }}>
                  {skill.name} — {skill.strength}%
                </div>
              ))}
            </div>
          </div>
        )}

        {softSkills.length > 0 && (
          <div>
            <h3 className="font-heading font-semibold text-slate-700 text-base mb-4">
              Soft Skills
            </h3>
            {/* Screen: emerald badges */}
            <div className="flex flex-wrap gap-2 screen-only">
              {softSkills.map((skill, i) => (
                <span key={i} className="badge badge-emerald">{skill}</span>
              ))}
            </div>
            {/* Print: plain text */}
            <p className="print-only" style={{ margin: 0 }}>
              {softSkills.join(' · ')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
