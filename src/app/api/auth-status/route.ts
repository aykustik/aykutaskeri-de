import { NextResponse } from 'next/server';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://wp.aykutaskeri.de/wp-json';
const WP_AUTH_HEADER = process.env.WP_AUTH_HEADER;

export async function GET() {
  if (!WP_AUTH_HEADER) {
    return NextResponse.json(
      { logged_in: false, error: 'No auth header configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${WP_API_URL}/custom/v1/auth-status`, {
      headers: {
        'Authorization': `Basic ${WP_AUTH_HEADER}`,
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { logged_in: false, error: 'Failed to fetch auth status' },
      { status: 500 }
    );
  }
}
