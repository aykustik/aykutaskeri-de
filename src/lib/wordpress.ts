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
      `${WP_API_URL}/wp/v2/cv?slug=${slug}&_embed`,
      {
        headers: this.getHeaders(),
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch CV: ${response.statusText}`);
    }

    const cvs = await response.json();
    return cvs.length > 0 ? cvs[0] : null;
  }

  async getCVById(id: number): Promise<CVPage | null> {
    const response = await fetch(
      `${WP_API_URL}/wp/v2/cv/${id}?_embed`,
      {
        headers: this.getHeaders(),
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return null;
    }

    return response.json();
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
