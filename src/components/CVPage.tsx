import { CVPage } from '@/types/wordpress';
import { HeaderSection } from './Header';
import { HeroSection } from './Hero';
import { AboutSection } from './About';
import { CTASection } from './CTA';
import { SkillsSection } from './Skills';
import { ExperienceSection } from './Experience';
import { WeiterbildungSection, AusbildungSection } from './Education';
import { PortfolioSection } from './Portfolio';
import { ContactSection } from './Contact';

interface CVPageProps { cv: CVPage }

export function CVPageComponent({ cv }: CVPageProps) {
  const { acf } = cv;
  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      <HeaderSection acf={acf} />
      <HeroSection acf={acf} />
      <AboutSection acf={acf} />
      <SkillsSection acf={acf} />
      <CTASection acf={acf} />

      {/* Career first, then continuing education, then formal education last */}
      <ExperienceSection acf={acf} />
      <WeiterbildungSection acf={acf} />
      <AusbildungSection acf={acf} />

      <PortfolioSection acf={acf} />
      <ContactSection acf={acf} />

      <footer className="section-dark text-slate-400 py-8 no-print text-center text-sm">
        <div className="section-container">
          <span>© {new Date().getFullYear()} {acf.vorname} {acf.nachname}</span>
        </div>
      </footer>
    </div>
  );
}
