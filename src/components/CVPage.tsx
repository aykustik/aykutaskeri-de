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
      {/* Print-only CV Section - ABSOLUT POSITIONIERT */}
      <section 
        className="print-only" 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          minHeight: '100vh',
          padding: '1.5cm',
          background: 'white',
          zIndex: 9999
        }}
      >
        <PrintCV acf={acf} />
      </section>

      {/* Web-Sections (werden im Print ausgeblendet) */}
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
