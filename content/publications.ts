// Lecture des publications depuis content/publications.md (source unique).
// Parseur zéro-dépendance (fs) — exécuté côté serveur au build (SSG).
// Ne JAMAIS importer ce module depuis un composant client : il utilise fs.
import fs from 'node:fs';
import path from 'node:path';

export interface Publication {
  id: string;
  date: string;
  type: string;
  area: string;
  featured: boolean;
  authors: string;
  venue: string;
  url: string;
  title: { en: string; fr: string };
  summary: { en: string; fr: string } | null;
}

const META_KEYS = ['id', 'date', 'type', 'area', 'featured', 'authors', 'venue', 'url', 'title', 'title_fr'] as const;

function parseBlock(raw: string): Publication | null {
  const lines = raw.split('\n');
  const meta: Record<string, string> = {};
  const sections: Record<string, string[]> = {};
  let current: string | null = null;

  for (const line of lines) {
    const heading = line.match(/^##\s+(.+?)\s*$/);
    if (heading) {
      current = heading[1].toLowerCase();
      sections[current] = [];
      continue;
    }
    if (current) {
      sections[current].push(line);
      continue;
    }
    const kv = line.match(/^([a-z_]+):\s*(.*)$/i);
    if (kv && (META_KEYS as readonly string[]).includes(kv[1])) {
      meta[kv[1]] = kv[2].trim();
    }
  }

  if (!meta.id || !meta.title) return null;

  const clean = (arr?: string[]) => (arr ? arr.join('\n').trim() : '');
  const abstract = clean(sections['abstract']);
  const resume = clean(sections['résumé'] || sections['resume']);
  const summary = abstract || resume ? { en: abstract, fr: resume || abstract } : null;

  return {
    id: meta.id,
    date: meta.date || '',
    type: meta.type || 'Article',
    area: meta.area || 'ethics',
    featured: meta.featured === 'true',
    authors: meta.authors || 'SAAR Lab',
    venue: meta.venue || (meta.type === 'Article' ? 'SYNTHI-AI Blog' : 'Venue to be provided'),
    url: meta.url || '',
    title: { en: meta.title, fr: meta.title_fr || meta.title },
    summary,
  };
}

let cache: Publication[] | null = null;

export function getPublications(): Publication[] {
  if (cache) return cache;
  const file = path.join(process.cwd(), 'content', 'publications.md');
  const src = fs.readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  cache = src
    .split(/^---\s*$/m)
    .map((b) => b.trim())
    .filter(Boolean)
    .map(parseBlock)
    .filter((p): p is Publication => p !== null);
  return cache;
}

export const getPublication = (id: string): Publication | undefined =>
  getPublications().find((p) => p.id === id);

export const getFeatured = (): Publication =>
  getPublications().find((p) => p.featured) || getPublications()[0];

export const getRelated = (pub: Publication, n = 3): Publication[] =>
  getPublications().filter((p) => p.area === pub.area && p.id !== pub.id).slice(0, n);

export const publicationYear = (p: Publication): string =>
  (String(p.date).match(/\d{4}/) || ['—'])[0];
