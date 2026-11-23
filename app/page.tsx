import type { Metadata } from 'next';
import Home from '@/components/pages/Home';
import { getPublications, getFeatured } from '@/content/publications';

export const metadata: Metadata = {
  // Self-referential canonical for the home route (absolute via metadataBase).
  alternates: { canonical: '/' },
};

export default function Page() {
  return <Home pubs={getPublications()} featured={getFeatured()} />;
}
