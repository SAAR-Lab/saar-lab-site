import type { Metadata } from 'next';
import PublicationsList from '@/components/pages/PublicationsList';
import { getPublications } from '@/content/publications';

const description = 'Papers, articles, datasets and code from SAAR Lab, the SYNTHI-AI Advanced Research Lab — searchable by research area and year.';

export const metadata: Metadata = {
  title: 'Publications',
  description,
  alternates: { canonical: '/publications' },
  openGraph: { title: 'Publications · SAAR Lab', description, url: '/publications' },
  twitter: { title: 'Publications · SAAR Lab', description },
};

export default function Page() {
  return <PublicationsList pubs={getPublications()} />;
}
