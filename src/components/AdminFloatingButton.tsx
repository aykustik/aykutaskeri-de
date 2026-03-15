'use client';

import { useEffect, useState } from 'react';

interface AuthStatus {
  logged_in: boolean;
  display_name?: string;
  can_edit?: boolean;
}

interface AdminFloatingButtonProps {
  postId?: number;
}

export function AdminFloatingButton({ postId }: AdminFloatingButtonProps) {
  const [authStatus, setAuthStatus] = useState<AuthStatus | null>(null);

  useEffect(() => {
    fetch('/api/auth-status', {
      cache: 'no-store',
    })
      .then((res) => res.json())
      .then((data: AuthStatus) => setAuthStatus(data))
      .catch(() => setAuthStatus({ logged_in: false }));
  }, []);

  // Nicht eingeloggt oder keine Edit-Rechte → nichts rendern
  if (!authStatus?.logged_in || !authStatus?.can_edit) {
    return null;
  }

  const editUrl = postId
    ? `https://wp.aykutaskeri.de/wp-admin/post.php?post=${postId}&action=edit`
    : `https://wp.aykutaskeri.de/wp-admin/`;

  return (
    <a
      href={editUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={postId ? 'In WordPress bearbeiten' : 'WordPress Dashboard'}
      className="no-print"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        zIndex: 9999,
        width: '2.75rem',
        height: '2.75rem',
        borderRadius: '50%',
        backgroundColor: '#2271b1',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
        textDecoration: 'none',
        transition: 'background-color 0.2s ease, transform 0.2s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#135e96';
        (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#2271b1';
        (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
      }}
    >
      {/* Pencil / Edit Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    </a>
  );
}
