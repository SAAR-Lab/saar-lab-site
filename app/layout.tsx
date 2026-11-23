import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LangProvider } from '@/components/LangProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SaarMotion from '@/components/SaarMotion';
import { SCHOLAR } from '@/content/saar';

const siteUrl = 'https://saarlab.synthi-ai.com';
const description =
  'SAAR Lab — the SYNTHI-AI Advanced Research Lab. Research in language, vision and efficient AI, published openly and turned into models that serve the people who need them most.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'SAAR Lab — Advancing intelligence through research', template: '%s · SAAR Lab' },
  description,
  applicationName: 'SAAR Lab',
  keywords: ['SAAR Lab', 'SYNTHI-AI', 'AI research', 'African language models', 'computer vision', 'edge AI', 'machine learning', 'Africa', 'publications'],
  authors: [{ name: 'SYNTHI-AI, Inc.', url: 'https://synthi-ai.com' }],
  creator: 'SYNTHI-AI, Inc.',
  publisher: 'SYNTHI-AI, Inc.',
  category: 'science',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', siteName: 'SAAR Lab', url: siteUrl, locale: 'en_US', alternateLocale: ['fr_FR'],
    title: 'SAAR Lab — Advancing intelligence through research', description,
    images: [{ url: '/assets/saar-mark-dark.png', width: 512, height: 512, alt: 'SAAR Lab' }],
  },
  twitter: { card: 'summary', title: 'SAAR Lab — Advancing intelligence through research', description, images: ['/assets/saar-mark-dark.png'] },
  icons: { icon: [{ url: '/assets/saar-mark-dark.png', type: 'image/png' }], shortcut: ['/favicon.png'], apple: [{ url: '/assets/saar-mark-dark.png' }] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
};

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'ResearchOrganization',
  '@id': `${siteUrl}/#organization`,
  name: 'SAAR Lab',
  alternateName: 'SYNTHI-AI Advanced Research Lab',
  url: siteUrl,
  logo: `${siteUrl}/assets/saar-mark-dark.png`,
  description,
  parentOrganization: {
    '@type': 'Organization',
    name: 'SYNTHI-AI, Inc.',
    url: 'https://synthi-ai.com',
  },
  location: [
    { '@type': 'Place', address: { '@type': 'PostalAddress', addressRegion: 'Delaware', addressCountry: 'US' } },
    { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'Douala', addressCountry: 'CM' } },
  ],
  sameAs: ['https://synthi-ai.com', 'https://synthi-ai.org', SCHOLAR],
};

const siteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: 'SAAR Lab',
  url: siteUrl,
  description,
  inLanguage: 'en',
  publisher: { '@id': `${siteUrl}/#organization` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }} />
        <LangProvider>
          <div className="flex min-h-screen flex-col overflow-x-clip">
            <SaarMotion />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </LangProvider>
      </body>
    </html>
  );
}
