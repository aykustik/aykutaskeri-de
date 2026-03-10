import { WPCV, CVPage, ACFFields } from '@/types/wordpress';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://aykutaskeri.de/wp-json';

class WordPressAPI {
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (process.env.WP_AUTH_HEADER) {
      headers['Authorization'] = `Basic ${process.env.WP_AUTH_HEADER}`;
    }

    return headers;
  }

  async getAllCVs(): Promise<WPCV[]> {
    const response = await fetch(`${WP_API_URL}/wp/v2/cv?per_page=100`, {
      headers: this.getHeaders(),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch CVs: ${response.statusText}`);
    }

    return response.json();
  }

  async getCVBySlug(slug: string): Promise<CVPage | null> {
    const response = await fetch(
      `${WP_API_URL}/wp/v2/cv?slug=${slug}`,
      {
        headers: this.getHeaders(),
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch CV: ${response.statusText}`);
    }

    const cvs = await response.json();
    if (cvs.length === 0) return null;

    const cv = cvs[0];
    
    const acfResponse = await fetch(
      `${WP_API_URL}/acf/v3/cv/${cv.id}`,
      {
        headers: this.getHeaders(),
        next: { revalidate: 60 },
      }
    );

    if (acfResponse.ok) {
      const acfData = await acfResponse.json();
      cv.acf = acfData.acf || {};
    }

    return cv as CVPage;
  }

  async getCVById(id: number): Promise<CVPage | null> {
    const response = await fetch(
      `${WP_API_URL}/wp/v2/cv/${id}`,
      {
        headers: this.getHeaders(),
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return null;
    }

    const cv = await response.json();
    
    const acfResponse = await fetch(
      `${WP_API_URL}/acf/v3/cv/${id}`,
      {
        headers: this.getHeaders(),
        next: { revalidate: 60 },
      }
    );

    if (acfResponse.ok) {
      const acfData = await acfResponse.json();
      cv.acf = acfData.acf || {};
    }

    return cv as CVPage;
  }

  async getPublishedCVs(): Promise<CVPage[]> {
    const response = await fetch(
      `${WP_API_URL}/wp/v2/cv?status=publish&per_page=100`,
      {
        headers: this.getHeaders(),
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch published CVs: ${response.statusText}`);
    }

    return response.json();
  }

  async getACFFields(cvId: number): Promise<ACFFields | null> {
    const response = await fetch(
      `${WP_API_URL}/acf/v3/cv/${cvId}`,
      {
        headers: this.getHeaders(),
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.acf || null;
  }
}

export const wpAPI = new WordPressAPI();
