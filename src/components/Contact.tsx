'use client';
import { useState } from 'react';
import { ACFFields } from '@/types/wordpress';
import { decodeHtml } from '@/lib/utils';

interface ContactProps { acf: ACFFields }

export function ContactSection({ acf }: ContactProps) {
  const { 
    kontakt_text, e_mail, telefon, adresse, plz, ort,
    stellenbezeichnung, anstellungsart_gewunscht, beworbene_anstellungsart, firma, ansprechpartner,
    ansprechpartner_e_mail
  } = acf;
  const [response, setResponse] = useState<'yes' | 'no' | ''>('');
  const [message, setMessage] = useState('');
  const [absenderEmail, setAbsenderEmail] = useState(ansprechpartner_e_mail || '');
  const [responseError, setResponseError] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (value: string): string => {
    if (!value) return 'Bitte gib deine E-Mail-Adresse ein.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Bitte gib eine gültige E-Mail-Adresse ein.';
    return '';
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmail(absenderEmail));
  };

  const handleEmailChange = (value: string) => {
    setAbsenderEmail(value);
    if (emailTouched) setEmailError(validateEmail(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentEmailError = validateEmail(absenderEmail);
    setEmailTouched(true);
    setEmailError(currentEmailError);

    if (!response) {
      setResponseError(true);
      if (currentEmailError) return;
      return;
    }
    setResponseError(false);
    if (currentEmailError) return;

    setIsLoading(true);
    setError('');

    const now = new Date();
    const dateStr = now.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

    try {
      const res = await fetch('https://aykutaskeri.de/wp-json/custom/v1/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          absender_email: absenderEmail,
          cv_email: e_mail,
          cv_firma: firma || '-',
          cv_ansprechpartner: ansprechpartner || '-',
          stellenbezeichnung: stellenbezeichnung || '',
          anstellungsart_gewunscht: anstellungsart_gewunscht || '',
          beworbene_anstellungsart: beworbene_anstellungsart || '',
          response,
          nachricht: message,
          url: pageUrl,
          datum: dateStr,
          uhrzeit: timeStr,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsSuccess(true);
        setResponse('');
        setMessage('');
        setAbsenderEmail('');
        setEmailTouched(false);
        setEmailError('');
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError(data.message || 'Fehler beim Senden');
      }
    } catch {
      setError('Verbindungsfehler. Bitte später erneut versuchen.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section-gray py-16 no-print" id="kennenlernen">
      <div className="section-container">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--brand-purple-light)' }}>
              <svg className="w-5 h-5" fill="none" stroke="var(--brand-purple)" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="section-title mb-0">Kurz und schmerzlos</h2>
          </div>
          <div className="divider mt-2" />
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
              <div className="flex flex-wrap gap-4">
                <label className="cursor-pointer group">
                  <input
                    type="radio"
                    name="response"
                    value="yes"
                    checked={response === 'yes'}
                    onChange={() => { setResponse('yes'); setResponseError(false); }}
                    className="peer sr-only"
                  />
                  <span className="flex items-center gap-2 px-5 py-3 rounded-full border-2 border-slate-200 transition-all duration-200 ease-apple hover:border-brand-purple hover:shadow-md hover:-translate-y-0.5 peer-checked:border-brand-purple peer-checked:bg-brand-purple-light">
                    <svg className="w-4 h-4 text-brand-purple opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-medium text-slate-600 group-hover:text-brand-purple peer-checked:text-brand-purple transition-colors">
                      Ja, auf jeden Fall!
                    </span>
                  </span>
                </label>
                <label className="cursor-pointer group">
                  <input
                    type="radio"
                    name="response"
                    value="no"
                    checked={response === 'no'}
                    onChange={() => { setResponse('no'); setResponseError(false); }}
                    className="peer sr-only"
                  />
                  <span className="flex items-center gap-2 px-5 py-3 rounded-full border-2 border-slate-200 transition-all duration-200 ease-apple hover:border-brand-brick hover:shadow-md hover:-translate-y-0.5 peer-checked:border-brand-brick peer-checked:bg-brand-brick-light">
                    <svg className="w-4 h-4 text-brand-brick opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm font-medium text-slate-600 group-hover:text-brand-brick peer-checked:text-brand-brick transition-colors">
                      Nein, lieber nicht.
                    </span>
                  </span>
                </label>
              </div>
              {responseError && (
                <p className="mt-2 text-sm text-red-600">Bitte wähle eine Option aus.</p>
              )}
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

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Deine E-Mail-Adresse <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={absenderEmail}
                onChange={e => handleEmailChange(e.target.value)}
                onBlur={handleEmailBlur}
                placeholder="damit ich dir antworten kann"
                className={`w-full px-4 py-3 border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition ${emailError ? 'border-red-400' : 'border-slate-200'}`}
                style={{ '--tw-ring-color': 'var(--brand-purple)' } as React.CSSProperties}
              />
              {emailError && (
                <p className="mt-2 text-sm text-red-600">{emailError}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Wird gesendet...
                </>
              ) : (
                <>
                  Nachricht senden
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </>
              )}
            </button>

            {isSuccess && (
              <p className="text-sm text-green-600 text-center bg-green-50 py-2 px-4 rounded-lg">
                ✓ Nachricht wurde erfolgreich gesendet!
              </p>
            )}

            {error && (
              <p className="text-sm text-red-600 text-center bg-red-50 py-2 px-4 rounded-lg">
                {error}
              </p>
            )}


          </form>
        </div>
      </div>
    </section>
  );
}
