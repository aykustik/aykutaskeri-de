import { ACFFields, WPImage } from '@/types/wordpress';

interface HeaderProps {
  acf: ACFFields;
}

export function HeaderSection({ acf }: HeaderProps) {
  const { profilbild, vorname, nachname, bereich, e_mail, telefon, adresse, plz, ort } = acf;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {profilbild && (
            <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={profilbild.url}
                alt={`${vorname} ${nachname}`}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">
              {vorname} {nachname}
            </h1>
            {bereich && (
              <p className="text-xl text-blue-600 mt-1">
                {bereich}
              </p>
            )}
          </div>

          <div className="md:ml-auto flex flex-col gap-2 text-sm text-gray-600">
            {telefon && (
              <a href={`tel:${telefon.replace(/\s/g, '')}`} className="hover:text-blue-600">
                📞 {telefon}
              </a>
            )}
            {e_mail && (
              <a href={`mailto:${e_mail}`} className="hover:text-blue-600">
                ✉️ {e_mail}
              </a>
            )}
            {adresse && plz && ort && (
              <span className="hover:text-blue-600">
                📍 {adresse}, {plz} {ort}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

interface SocialLinksProps {
  acf: ACFFields;
}

export function SocialLinks({ acf }: SocialLinksProps) {
  const { facebook_link, linkedin_link, xing_link } = acf;

  if (!facebook_link && !linkedin_link && !xing_link) return null;

  return (
    <div className="flex gap-4 justify-center py-4">
      {facebook_link && (
        <a
          href={facebook_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          Facebook
        </a>
      )}
      {linkedin_link && (
        <a
          href={linkedin_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-900"
        >
          LinkedIn
        </a>
      )}
      {xing_link && (
        <a
          href={xing_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-gray-900"
        >
          Xing
        </a>
      )}
    </div>
  );
}
