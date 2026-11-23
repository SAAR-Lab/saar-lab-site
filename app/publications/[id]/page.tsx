import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Paper from '@/components/pages/Paper';
import { getPublications, getPublication, getRelated, publicationYear, type Publication } from '@/content/publications';

const siteUrl = 'https://saarlab.synthi-ai.com';

export function generateStaticParams() {
  return getPublications().map((p) => ({ id: p.id }));
}

// Build a short, clean meta description from the abstract (fallback to type/authors).
function metaDescription(pub: Publication): string {
  const abstract = pub.summary?.en?.replace(/\s+/g, ' ').trim();
  if (abstract) return abstract.length > 300 ? `${abstract.slice(0, 297).trimEnd()}…` : abstract;
  return `${pub.type} by ${pub.authors} — ${pub.venue}. From SAAR Lab, the SYNTHI-AI Advanced Research Lab.`;
}

// Split the free-text authors string into individual Person nodes for JSON-LD.
function authorNodes(authors: string) {
  return authors
    .split(/\s*(?:,|;|\band\b|&)\s*/i)
    .map((a) => a.trim())
    .filter(Boolean)
    .map((name) => ({ '@type': 'Person', name }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const pub = getPublication(id);
  if (!pub) return {};
  const description = metaDescription(pub);
  const url = `${siteUrl}/publications/${pub.id}`;
  return {
    title: pub.title.en,
    description,
    keywords: ['SAAR Lab', 'SYNTHI-AI', pub.type, pub.area, ...pub.authors.split(/\s*,\s*/)],
    alternates: { canonical: `/publications/${pub.id}` },
    openGraph: {
      type: 'article',
      url,
      title: pub.title.en,
      description,
      siteName: 'SAAR Lab',
      locale: 'en_US',
      alternateLocale: ['fr_FR'],
      publishedTime: publicationYear(pub),
      authors: pub.authors.split(/\s*,\s*/).map((a) => a.trim()),
      images: [{ url: '/assets/saar-mark-dark.png', width: 512, height: 512, alt: 'SAAR Lab' }],
    },
    twitter: { card: 'summary', title: pub.title.en, description, images: ['/assets/saar-mark-dark.png'] },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pub = getPublication(id);
  if (!pub) notFound();

  const url = `${siteUrl}/publications/${pub.id}`;
  const isArticle = pub.type === 'Article';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': isArticle ? 'Article' : 'ScholarlyArticle',
    '@id': `${url}#article`,
    headline: pub.title.en,
    name: pub.title.en,
    description: metaDescription(pub),
    inLanguage: 'en',
    datePublished: publicationYear(pub),
    author: authorNodes(pub.authors),
    publisher: {
      '@type': 'Organization',
      name: 'SYNTHI-AI, Inc.',
      url: 'https://synthi-ai.com',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/assets/saar-mark-dark.png` },
    },
    isPartOf: { '@type': 'ResearchProject', name: pub.venue },
    url,
    mainEntityOfPage: url,
    image: `${siteUrl}/assets/saar-mark-dark.png`,
    ...(pub.url ? { sameAs: pub.url } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Paper pub={pub} related={getRelated(pub)} />
    </>
  );
}
