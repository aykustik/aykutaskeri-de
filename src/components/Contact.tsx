'use client';
import { useState } from 'react';
import { ACFFields } from '@/types/wordpress';
import { decodeHtml } from '@/lib/utils';

interface ContactProps { acf: ACFFields }

export function ContactSection({ acf }: ContactProps) {
  const { 
    kontakt_text, e_mail, telefon, adresse, plz, ort,
    stellenbezeichnung, anstellungsart_gewunscht, beworbene_anstellungsart, firma, ansprechpartner
  } = acf;
  const [response, setResponse] = useState<'yes' | 'no' | ''>('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!response) return;
    
    const now = new Date();
    const dateStr = now.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

    const subject = response === 'yes' 
      ? 'Ja, ich möchte Aykut kennenlernen!' 
      : 'Nein, Interesse leider nicht';

    const cvInfo = [
      stellenbezeichnung ? `Stellenbezeichnung: ${stellenbezeichnung}` : null,
      anstellungsart_gewunscht ? `Anstellungsart (gewünscht): ${anstellungsart_gewunscht}` : null,
      beworbene_anstellungsart ? `Anstellungsart (beworben): ${beworbene_anstellungsart}` : null,
      firma ? `Firma: ${firma}` : null,
      ansprechpartner ? `Ansprechpartner: ${ansprechpartner}` : null,
    ].filter(Boolean).join('\n');

    const footer = `\n\n---\nDatum: ${dateStr}\nUhrzeit: ${timeStr}\nURL: ${pageUrl}`;

    const body = response === 'yes'
      ? `Hallo Aykut,

ich bin interessiert und würde mich gerne mit dir unterhalten.

Meine Nachricht:
${message}

${cvInfo ? cvInfo + '\n' : ''}${footer}`
      : `Hallo Aykut,

leider ist es dieses Mal nicht passend. Aber ich danke für deine Zeit!

Meine Nachricht:
${message}

${cvInfo ? cvInfo + '\n' : ''}${footer}`;

    window.location.href = `mailto:${e_mail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="section-gray py-16 no-print" id="kontakt">
      <div className="section-container">
        <div className="mb-10">
          <h2 className="section-title">Kontakt</h2>
          <div className="divider mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Text + Kontaktdaten */}
          <div>
            {kontakt_text && (
              <div
                className="body-text prose prose-slate max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: decodeHtml(kontakt_text) }}
              />
            )}
            <div className="space-y-4">
              {telefon && (
                <a href={`tel:${telefon.replace(/\s/g, '')}`}
                   className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors group cursor-pointer">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                       style={{ background: 'var(--brand-purple-light)' }}>
                    <svg className="w-5 h-5" fill="none" stroke="var(--brand-purple)" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="font-medium group-hover:underline">{telefon}</span>
                </a>
              )}
              {e_mail && (
                <a href={`mailto:${e_mail}`}
                   className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors group cursor-pointer">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                       style={{ background: 'var(--brand-purple-light)' }}>
                    <svg className="w-5 h-5" fill="none" stroke="var(--brand-purple)" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="font-medium group-hover:underline">{e_mail}</span>
                </a>
              )}
              {adresse && (
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                       style={{ background: 'var(--brand-purple-light)' }}>
                    <svg className="w-5 h-5" fill="none" stroke="var(--brand-purple)" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span>{adresse}, {plz} {ort}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Simple Form */}
          <form onSubmit={handleSubmit} className="card p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Sollen wir uns kennenlernen?
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="response"
                    value="yes"
                    checked={response === 'yes'}
                    onChange={() => setResponse('yes')}
                    className="w-4 h-4 text-brand-purple focus:ring-brand-purple"
                    required
                  />
                  <span className="text-slate-700 group-hover:text-brand-purple transition-colors">
                    Ja, auf jeden Fall!
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="response"
                    value="no"
                    checked={response === 'no'}
                    onChange={() => setResponse('no')}
                    className="w-4 h-4 text-brand-purple focus:ring-brand-purple"
                    required
                  />
                  <span className="text-slate-700 group-hover:text-brand-purple transition-colors">
                    Nein, lieber nicht.
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Nachricht
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="z. B. Weitere Informationen, Terminvorschläge, Ansprechpartner"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition resize-none"
                style={{ '--tw-ring-color': 'var(--brand-purple)' } as React.CSSProperties}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full justify-center"
              disabled={!response}
            >
              Nachricht senden
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>

            <p className="text-xs text-slate-400 text-center">
              Nutze das Textfeld für ein kurzes Feedback oder Informationen zu den nächsten Schritten wie z. B. Terminvorschläge.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
