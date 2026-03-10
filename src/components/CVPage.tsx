import { CVPage } from '@/types/wordpress';
import { HeaderSection, SocialLinks } from './Header';
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
    <div className="min-h-screen bg-white">
      <HeaderSection acf={acf} />
      <SocialLinks acf={acf} />
      <AboutSection acf={acf} />
      <SkillsSection acf={acf} />
      <ExperienceSection acf={acf} />
      <EducationSection acf={acf} />
      <PortfolioSection acf={acf} />
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} {acf.vorname} {acf.nachname}. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
}
