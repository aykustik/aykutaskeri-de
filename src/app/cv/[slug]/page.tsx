import { notFound } from 'next/navigation';
import { wpAPI } from '@/lib/wordpress';
import { CVPageComponent } from '@/components/CVPage';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const cv = await wpAPI.getCVBySlug(params.slug);
  
  if (!cv) {
    return {
      title: 'CV nicht gefunden',
    };
  }

  return {
    title: `${cv.acf.vorname} ${cv.acf.nachname} - ${cv.acf.bereich || 'Lebenslauf'}`,
    description: `Online-CV von ${cv.acf.vorname} ${cv.acf.nachname}`,
  };
}

export default async function CVPage({ params }: PageProps) {
  const cv = await wpAPI.getCVBySlug(params.slug);

  if (!cv) {
    notFound();
  }

  return <CVPageComponent cv={cv} />;
}
