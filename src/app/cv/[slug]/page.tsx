import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { wpAPI } from '@/lib/wordpress';
import { CVPageComponent } from '@/components/CVPage';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cv = await wpAPI.getCVBySlug(params.slug);

  if (!cv) {
    return {
      title: 'CV nicht gefunden',
    };
  }

  // Fetch RankMath SEO metadata
  const pageUrl = `https://aykutaskeri.de/cv/${params.slug}/`;
  const rankMathMeta = await wpAPI.getRankMathMeta(pageUrl);

  // If RankMath data is available, use it
  if (rankMathMeta && rankMathMeta.title) {
    const metadata: Metadata = {
      title: rankMathMeta.title,
    };

    if (rankMathMeta.description) {
      metadata.description = rankMathMeta.description;
    }

    if (rankMathMeta.canonical) {
      metadata.alternates = {
        canonical: rankMathMeta.canonical,
      };
    }

    if (rankMathMeta.robots) {
      const robotsParts = rankMathMeta.robots.split(',').map(s => s.trim());
      metadata.robots = {
        index: !robotsParts.includes('noindex'),
        follow: !robotsParts.includes('nofollow'),
      };
    }

    // Open Graph
    if (rankMathMeta.ogTitle || rankMathMeta.ogDescription || rankMathMeta.ogImage) {
      metadata.openGraph = {
        title: rankMathMeta.ogTitle || rankMathMeta.title,
        description: rankMathMeta.ogDescription || rankMathMeta.description,
        url: rankMathMeta.ogUrl || pageUrl,
        type: (rankMathMeta.ogType as any) || 'website',
      };

      if (rankMathMeta.ogImage) {
        metadata.openGraph.images = [
          {
            url: rankMathMeta.ogImage,
          },
        ];
      }
    }

    // Twitter Card
    if (rankMathMeta.twitterCard) {
      metadata.twitter = {
        card: rankMathMeta.twitterCard as any,
        title: rankMathMeta.twitterTitle || rankMathMeta.title,
        description: rankMathMeta.twitterDescription || rankMathMeta.description,
      };

      if (rankMathMeta.twitterImage) {
        metadata.twitter.images = [rankMathMeta.twitterImage];
      }
    }

    return metadata;
  }

  // Fallback: Use CV data (should not happen if RankMath is configured)
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
