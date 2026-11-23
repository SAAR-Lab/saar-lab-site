import type { MetadataRoute } from 'next';
import { getPublications } from '@/content/publications';

export const dynamic = 'force-static';

const base = 'https://saarlab.synthi-ai.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ['/', '/publications', '/people', '/join'].map((p) => ({
    url: base + p,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: p === '/' ? 1 : 0.8,
  }));
  const pubs = getPublications().map((p) => ({
    url: `${base}/publications/${p.id}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));
  return [...staticRoutes, ...pubs];
}
