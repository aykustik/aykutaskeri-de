import { WPCV, CVPage, ACFFields, RankMathMeta, RankMathAPIResponse } from '@/types/wordpress';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://wp.aykutaskeri.de/wp-json';

/** Normalize ACF field names: hyphens to underscores, fix known special cases */
function normalizeACF(raw: Record<string, unknown>): ACFFields {
  const out: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(raw)) {
    const normalized = key.replace(/-/g, '_');
    out[normalized] = val;
  }
  return out as ACFFields;
}

class WordPressAPI {
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (process.env.WP_AUTH_HEADER) {
      headers['Authorization'] = `Basic ${process.env.WP_AUTH_HEADER}`;
    }
    return headers;
  }

  async getCVBySlug(slug: string): Promise<CVPage | null> {
    const res = await fetch(`${WP_API_URL}/wp/v2/cv?slug=${slug}`, {
      headers: this.getHeaders(),
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Failed to fetch CV: ${res.statusText}`);

    const cvs = await res.json();
    if (!cvs.length) return null;
    const cv = cvs[0];

    const acfRes = await fetch(`${WP_API_URL}/acf/v3/cv/${cv.id}`, {
      headers: this.getHeaders(),
      next: { revalidate: 60 },
    });
    if (acfRes.ok) {
      const acfData = await acfRes.json();
      cv.acf = normalizeACF(acfData.acf || {});
    }

    return cv as CVPage;
  }

  async getAllCVs(): Promise<WPCV[]> {
    const res = await fetch(`${WP_API_URL}/wp/v2/cv?per_page=100`, {
      headers: this.getHeaders(),
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Failed to fetch CVs: ${res.statusText}`);
    return res.json();
  }

  /**
   * Fetch RankMath SEO metadata for a given URL
   * Requires Headless CMS Support to be enabled in RankMath settings
   */
  async getRankMathMeta(url: string): Promise<RankMathMeta | null> {
    try {
      const res = await fetch(
        `${WP_API_URL}/rankmath/v1/getHead?url=${encodeURIComponent(url)}`,
        {
          headers: this.getHeaders(),
          next: { revalidate: 60 },
        }
      );

      if (!res.ok) {
        console.warn(`RankMath API returned ${res.status}: ${res.statusText}`);
        return null;
      }

      const data: RankMathAPIResponse = await res.json();
      
      if (!data.success || !data.head) {
        console.warn('RankMath API returned no data');
        return null;
      }

      return this.parseRankMathHead(data.head);
    } catch (error) {
      console.error('Error fetching RankMath metadata:', error);
      return null;
    }
  }

  /**
   * Parse RankMath HTML head content and extract metadata
   */
  private parseRankMathHead(html: string): RankMathMeta {
    const meta: RankMathMeta = {};

    // Parse title
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    if (titleMatch) meta.title = titleMatch[1].trim();

    // Helper function to extract meta content
    const getMetaContent = (name: string): string | undefined => {
      // Try name attribute first
      let match = html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["']`, 'i'));
      if (match) return match[1];
      // Try property attribute (for OG tags)
      match = html.match(new RegExp(`<meta[^>]+property=["']${name}["'][^>]+content=["']([^"']*)["']`, 'i'));
      if (match) return match[1];
      return undefined;
    };

    // Standard meta tags
    meta.description = getMetaContent('description');
    meta.robots = getMetaContent('robots');

    // Canonical link
    const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
    if (canonicalMatch) meta.canonical = canonicalMatch[1];

    // Open Graph tags
    meta.ogTitle = getMetaContent('og:title');
    meta.ogDescription = getMetaContent('og:description');
    meta.ogImage = getMetaContent('og:image');
    meta.ogUrl = getMetaContent('og:url');
    meta.ogType = getMetaContent('og:type');

    // Twitter Card tags
    meta.twitterCard = getMetaContent('twitter:card');
    meta.twitterTitle = getMetaContent('twitter:title');
    meta.twitterDescription = getMetaContent('twitter:description');
    meta.twitterImage = getMetaContent('twitter:image');

    // Schema.org JSON-LD
    const schemaMatch = html.match(/<script type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
    if (schemaMatch) {
      meta.schema = schemaMatch.map(script => {
        const content = script.replace(/<script[^>]*>|<\/script>/gi, '');
        try {
          return JSON.parse(content);
        } catch {
          return {};
        }
      }).filter(s => Object.keys(s).length > 0);
    }

    return meta;
  }
}

export const wpAPI = new WordPressAPI();
