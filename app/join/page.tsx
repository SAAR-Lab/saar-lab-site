import type { Metadata } from 'next';
import Join from '@/components/pages/Join';

const description = 'Open roles, internships and the SAAR Scholars fellowship at SAAR Lab — research that reaches people.';

export const metadata: Metadata = {
  title: 'Join',
  description,
  alternates: { canonical: '/join' },
  openGraph: { title: 'Join · SAAR Lab', description, url: '/join' },
  twitter: { title: 'Join · SAAR Lab', description },
};

export default function Page() {
  return <Join />;
}
