import { CVPage } from '@/types/wordpress';
import { HeaderSection, SocialLinks, ContactInfo } from './Header';
import { AboutSection } from './About';
import { SkillsSection } from './Skills';
import { ExperienceSection } from './Experience';
import { EducationSection } from './Education';
import { PortfolioSection } from './Portfolio';

interface CVPageProps {
  cv: CVPage;
}

export function CVPageComponent({ cv }: CVPageProps) {
  const { acf } = cv;

  return (
    <div className="min-h-screen bg-slate-50">
      <HeaderSection acf={acf} />
      <SocialLinks acf={acf} />
      <ContactInfo acf={acf} />
      
      <div className="print-container">
        <AboutSection acf={acf} />
        <SkillsSection acf={acf} />
        <ExperienceSection acf={acf} />
        <EducationSection acf={acf} />
        <PortfolioSection acf={acf} />
      </div>
      
      <footer className="bg-dark-900 text-dark-300 py-12 no-print">
        <div className="section-container text-center">
          <p className="text-lg font-medium text-white mb-2">
            {acf.vorname} {acf.nachname}
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
}
