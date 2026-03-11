'use client';
import Image from 'next/image';
import { ACFFields } from '@/types/wordpress';

interface HeaderProps { acf: ACFFields }

export function HeaderSection({ acf }: HeaderProps) {
  const { profilbild, vorname, nachname, bereich, e_mail, telefon, adresse, plz, ort } = acf;

  return (
    <header className="section-dark text-white" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          {profilbild && (
            <div className="relative flex-shrink-0">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden"
                   style={{ border: '3px solid rgba(87,92,194,0.5)' }}>
                <Image src={profilbild.url} alt={`${vorname} ${nachname}`}
                     className="w-full h-full object-cover"
                     width={176} height={176} />
              </div>
            </div>
          )}

          {/* Name + Titel */}
          <div className="text-center md:text-left flex-1">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white tracking-tight">
              {vorname} {nachname}
            </h1>
            {bereich && (
              <p className="text-lg mt-2 font-medium" style={{ color: 'var(--brand-purple-grad)' }}>{bereich}</p>
            )}
            <div className="divider mt-4 mx-auto md:mx-0" />

            {/* Kontaktdaten kompakt */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-5 text-sm text-slate-300">
              {telefon && (
                <a href={`tel:${telefon.replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {telefon}
                </a>
              )}
              {e_mail && (
                <a href={`mailto:${e_mail}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {e_mail}
                </a>
              )}
              {adresse && plz && ort && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {adresse}, {plz} {ort}
                </span>
              )}
            </div>
          </div>

          {/* PDF Button + Social */}
          <div className="flex flex-col items-center gap-4 no-print">
            <button
              onClick={() => window.print()}
              className="btn btn-white gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden sm:inline">CV als PDF</span>
            </button>
            <SocialIcons acf={acf} />
          </div>
        </div>
      </div>
    </header>
  );
}

function SocialIcons({ acf }: { acf: ACFFields }) {
  const { facebook_link, linkedin_link, xing_link } = acf;
  if (!facebook_link && !linkedin_link && !xing_link) return null;
  return (
    <div className="flex items-center gap-3">
      {facebook_link && (
        <a href={facebook_link} target="_blank" rel="noopener noreferrer"
           className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
           title="Facebook">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
          </svg>
        </a>
      )}
      {linkedin_link && (
        <a href={linkedin_link} target="_blank" rel="noopener noreferrer"
           className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
           title="LinkedIn">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
          </svg>
        </a>
      )}
      {xing_link && (
        <a href={xing_link} target="_blank" rel="noopener noreferrer"
           className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
           title="Xing">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.182 2.006L9.77 8.368 5.5 15.992H9.09l4.27-7.624L9.77 2.006H6.182zM20.5 2.006l-7.888 13.98L15.9 22h3.588l-3.288-6.014L20.5 2.006H17.5z"/>
          </svg>
        </a>
      )}
    </div>
  );
}

// Keep ContactInfo exported for backward compat (unused now, but safe)
export function ContactInfo({ acf }: { acf: ACFFields }) { return null; }
export function SocialLinks({ acf }: { acf: ACFFields }) { return null; }
