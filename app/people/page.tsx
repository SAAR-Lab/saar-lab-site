import type { Metadata } from 'next';
import People from '@/components/pages/People';

const description = 'The researchers and engineers of SAAR Lab, the SYNTHI-AI Advanced Research Lab.';

export const metadata: Metadata = {
  title: 'People',
  description,
  alternates: { canonical: '/people' },
  openGraph: { title: 'People · SAAR Lab', description, url: '/people' },
  twitter: { title: 'People · SAAR Lab', description },
};

export default function Page() {
  return <People />;
}
