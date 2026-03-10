'use client';

import { ACFFields } from '@/types/wordpress';

interface HeaderProps {
  acf: ACFFields;
}

export function HeaderSection({ acf }: HeaderProps) {
  const { profilbild, vorname, nachname, bereich } = acf;

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="relative bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-200"></div>
      </div>
      
      <div className="section-container relative">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {profilbild && (
            <div className="relative flex-shrink-0">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden ring-4 ring-primary-500/30 shadow-2xl animate-fade-in">
                <img
                  src={profilbild.url}
                  alt={`${vorname} ${nachname}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent-500 rounded-full border-4 border-dark-900"></div>
            </div>
          )}
          
          <div className="text-center md:text-left animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {vorname} {nachname}
            </h1>
            {bereich && (
              <p className="text-xl md:text-2xl text-primary-300 mt-3 font-medium">
                {bereich}
              </p>
            )}
            <div className="divider mt-6 mx-auto md:mx-0"></div>
          </div>
          
          <button 
            onClick={handlePrint}
            className="no-print btn-print bg-white text-dark-900 hover:bg-primary-50 hover:text-primary-700 ml-auto flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="hidden sm:inline">CV speichern</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>
    </section>
  );
}

interface SocialLinksProps {
  acf: ACFFields;
}

export function SocialLinks({ acf }: SocialLinksProps) {
  const { facebook_link, linkedin_link, xing_link } = acf;

  if (!facebook_link && !linkedin_link && !xing_link) return null;

  return (
    <div className="bg-dark-800 border-b border-dark-700 no-print">
      <div className="section-container py-4">
        <div className="flex justify-center md:justify-start gap-6">
          {facebook_link && (
            <a
              href={facebook_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-dark-300 hover:text-primary-400 transition-colors duration-200 group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
              </svg>
              <span className="text-sm font-medium group-hover:underline">Facebook</span>
            </a>
          )}
          {linkedin_link && (
            <a
              href={linkedin_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-dark-300 hover:text-primary-400 transition-colors duration-200 group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
              </svg>
              <span className="text-sm font-medium group-hover:underline">LinkedIn</span>
            </a>
          )}
          {xing_link && (
            <a
              href={xing_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-dark-300 hover:text-primary-400 transition-colors duration-200 group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.19 12.61c0-.73-.19-1.39-.57-1.93-.38-.56-.89-.98-1.52-1.25.63-.31 1.13-.74 1.49-1.28.36-.55.55-1.17.55-1.9 0-.79-.21-1.48-.61-2.05-.41-.58-.96-1.02-1.63-1.31-.67-.29-1.41-.43-2.21-.43-.8 0-1.54.14-2.21.43-.67.29-1.22.73-1.63 1.31-.41.57-.61 1.26-.61 2.05 0 .73.18 1.35.55 1.9.36.54.86.97 1.49 1.28-.63.27-1.14.69-1.52 1.25-.38.54-.57 1.2-.57 1.93 0 .78.21 1.46.61 2.04.4.57.94 1.01 1.61 1.3.67.29 1.41.44 2.23.44.79 0 1.53-.14 2.2-.42.67-.29 1.22-.72 1.63-1.3.4-.57.61-1.25.61-2.04zM9.77 8.98c0-.47.12-.86.35-1.18.24-.32.55-.49.94-.49.39 0 .7.16.94.49.23.32.35.71.35 1.18 0 .46-.12.85-.35 1.17-.24.33-.55.49-.94.49-.39 0-.7-.16-.94-.49-.23-.32-.35-.71-.35-1.17zm6.73 7.27h-1.68l-.5-1.61h-2.12L11.5 16.25h-1.67l3.67-10.27h1.67l3.67 10.27z"/>
              </svg>
              <span className="text-sm font-medium group-hover:underline">Xing</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

interface ContactInfoProps {
  acf: ACFFields;
}

export function ContactInfo({ acf }: ContactInfoProps) {
  const { e_mail, telefon, adresse, plz, ort } = acf;

  if (!e_mail && !telefon && !adresse) return null;

  return (
    <div className="bg-white border-b border-slate-100 no-print">
      <div className="section-container py-4">
        <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-sm">
          {telefon && (
            <a
              href={`tel:${telefon.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-dark-600 hover:text-primary-600 transition-colors"
            >
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">{telefon}</span>
            </a>
          )}
          {e_mail && (
            <a
              href={`mailto:${e_mail}`}
              className="flex items-center gap-2 text-dark-600 hover:text-primary-600 transition-colors"
            >
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">{e_mail}</span>
            </a>
          )}
          {adresse && plz && ort && (
            <span className="flex items-center gap-2 text-dark-600">
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{adresse}, {plz} {ort}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
