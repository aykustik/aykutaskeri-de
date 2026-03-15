import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface AuthStatusResponse {
  logged_in: boolean;
  can_edit: boolean;
  roles: string[];
  user?: {
    id: number;
    display_name: string;
    email: string;
  } | null;
}

export async function GET(request: NextRequest): Promise<NextResponse<AuthStatusResponse>> {
  const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://wp.aykutaskeri.de/wp-json';

  try {
    const cookieHeader = request.headers.get('cookie') || '';

    const wpResponse = await fetch(`${WP_API_URL}/headless-auth/v1/status`, {
      method: 'GET',
      headers: {
        'Cookie': cookieHeader,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      credentials: 'include',
    });

    if (!wpResponse.ok) {
      return NextResponse.json(
        {
          logged_in: false,
          can_edit: false,
          roles: [],
          user: null,
        },
        { status: wpResponse.status }
      );
    }

    const data: AuthStatusResponse = await wpResponse.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('[auth/status] Error:', error);

    return NextResponse.json({
      logged_in: false,
      can_edit: false,
      roles: [],
      user: null,
    });
  }
}
