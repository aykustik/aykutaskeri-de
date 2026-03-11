import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://staging.aykutaskeri.de'),
  title: 'Aykut Askeri - Online-Marketing Experte',
  description: 'Wissenshungrig mit viel Geduld und Verständnis für unterschiedliche Perspektiven. Online-Marketing-Enthusiast.',
  keywords: ['Online-Marketing', 'Digital Marketing', 'CV', 'Lebenslauf', 'Aykut Askeri'],
  authors: [{ name: 'Aykut Askeri' }],
  openGraph: {
    title: 'Aykut Askeri - Online-Marketing Experte',
    description: 'Wissenshungrig mit viel Geduld und Verständnis für unterschiedliche Perspektiven.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={outfit.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
