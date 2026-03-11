import { WPCV, CVPage, ACFFields } from '@/types/wordpress';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://aykutaskeri.de/wp-json';

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
}

export const wpAPI = new WordPressAPI();
