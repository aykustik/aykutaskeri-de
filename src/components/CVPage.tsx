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
import { PrintCV } from './PrintCV';

interface CVPageProps { cv: CVPage }

export function CVPageComponent({ cv }: CVPageProps) {
  const { acf } = cv;
  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      <HeaderSection acf={acf} />
      <HeroSection acf={acf} />
      <section className="no-print">
        <AboutSection acf={acf} />
      </section>
      <SkillsSection acf={acf} />
      <CTASection acf={acf} />

      {/* Career first, then continuing education, then formal education last */}
      <ExperienceSection acf={acf} />
      <section className="no-print">
        <WeiterbildungSection acf={acf} />
        <AusbildungSection acf={acf} />
      </section>

      <PortfolioSection acf={acf} />
      <ContactSection acf={acf} />

      {/* Print-only CV Section - full width, no margins */}
      <section 
        className="print-only" 
        style={{ 
          padding: '0 2.5cm', 
          margin: '0',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        <PrintCV acf={acf} />
      </section>

      <footer className="section-dark text-slate-400 py-8 no-print text-center text-sm">
        <div className="section-container">
          <span>© {new Date().getFullYear()}</span>
          {acf.copyright_text ? (
            <span className="ml-1">— <span dangerouslySetInnerHTML={{ __html: acf.copyright_text }} /></span>
          ) : (
            <span className="ml-1"> {acf.vorname} {acf.nachname}</span>
          )}
        </div>
      </footer>
    </div>
  );
}
