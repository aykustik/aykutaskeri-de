'use client';
import { ACFFields } from '@/types/wordpress';
import { decodeHtml } from '@/lib/utils';
import { useState } from 'react';

interface ContactProps { acf: ACFFields }

export function ContactSection({ acf }: ContactProps) {
  const { kontakt_text, e_mail, telefon, adresse, plz, ort } = acf;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Kontaktaufnahme von ${name}`);
    const body = encodeURIComponent(`Von: ${name}\nE-Mail: ${email}\n\n${message}`);
    window.location.href = `mailto:${e_mail}?subject=${subject}&body=${body}`;
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

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="card p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
              <input
                type="text" required value={name} onChange={e => setName(e.target.value)}
                placeholder="Dein Name"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
                style={{ '--tw-ring-color': 'var(--brand-purple)' } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">E-Mail</label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="deine@email.de"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
                style={{ '--tw-ring-color': 'var(--brand-purple)' } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Nachricht</label>
              <textarea
                required rows={5} value={message} onChange={e => setMessage(e.target.value)}
                placeholder="Terminvorschlag, Feedback oder kurze Vorstellung..."
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition resize-none"
                style={{ '--tw-ring-color': 'var(--brand-purple)' } as React.CSSProperties}
              />
            </div>
            <button type="submit" className="btn btn-primary w-full justify-center">
              Nachricht senden
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
