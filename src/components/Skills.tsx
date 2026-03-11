'use client';
import { useEffect, useRef, useState } from 'react';
import { ACFFields } from '@/types/wordpress';
import { decodeHtml } from '@/lib/utils';

interface SkillsProps { acf: ACFFields }

function numVal(v: number | string | undefined): number {
  return typeof v === 'string' ? parseInt(v, 10) || 0 : (v ?? 0);
}

function SkillBar({ name, strength }: { name: string; strength: number }) {
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

  return (
    <div ref={ref} className="card p-5">
      <div className="flex justify-between items-center mb-3">
        <span className="font-medium text-slate-800 text-sm">{name}</span>
        <span
          className="text-xs font-semibold tabular-nums transition-opacity duration-500"
          style={{ color: 'var(--brand-purple)', opacity: visible ? 1 : 0 }}
        >
          {strength}%
        </span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: visible ? `${strength}%` : '0%',
            transition: visible ? 'width 0.8s cubic-bezier(0.4,0,0.2,1)' : 'none',
          }}
        />
      </div>
    </div>
  );
}

export function SkillsSection({ acf }: SkillsProps) {
  const hardSkills = [
    { name: acf.hard_skill_1,  strength: numVal(acf.hard_skill_1_starke)  },
    { name: acf.hard_skill_2,  strength: numVal(acf.hard_skill_2_starke)  },
    { name: acf.hard_skill_3,  strength: numVal(acf.hard_skill_3_starke)  },
    { name: acf.hard_skill_4,  strength: numVal(acf.hard_skill_4_starke)  },
    { name: acf.hard_skill_5,  strength: numVal(acf.hard_skill_5_starke)  },
    { name: acf.hard_skill_6,  strength: numVal(acf.hard_skill_6_starke)  },
    { name: acf.hard_skill_7,  strength: numVal(acf.hard_skill_7_starke)  },
    { name: acf.hard_skill_8,  strength: numVal(acf.hard_skill_8_starke)  },
    { name: acf.hard_skill_9,  strength: numVal(acf.hard_skill_9_starke)  },
    { name: acf.hard_skill_10, strength: numVal(acf.hard_skill_10_starke) },
    { name: acf.hard_skill_11, strength: numVal(acf.hard_skill_11_starke) },
    { name: acf.hard_skill_12, strength: numVal(acf.hard_skill_12_starke) },
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
                <SkillBar key={i} name={skill.name!} strength={skill.strength} />
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
