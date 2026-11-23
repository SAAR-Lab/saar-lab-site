'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/components/LangProvider';
import { ART, areaLabel, bibtex } from '@/content/saar';
import type { Publication } from '@/content/publications';

export default function Paper({ pub, related }: { pub: Publication; related: Publication[] }) {
  const { t, lang } = useLang();
  const [copied, setCopied] = useState(false);
  const bib = bibtex(pub);

  const copy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(bib);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <article className="px-6 pb-[clamp(96px,12vw,160px)]">
      <div className="mx-auto flex max-w-[860px] flex-col gap-7 pt-[clamp(56px,7vw,96px)]">
        <Link href="/publications" className="text-[15px] text-sa-blue">‹ {t.pp.back}</Link>
        <span className="flex flex-wrap gap-x-[14px] gap-y-[6px] text-sm font-semibold"><span className="text-sa-blue">{areaLabel(pub.area, lang)}</span><span className="text-sa-muted">{pub.type}</span><span className="text-sa-muted">{pub.date}</span></span>
        <h1 className="m-0 text-[clamp(36px,5vw,64px)] font-semibold leading-[1.06] tracking-[-0.015em] [text-wrap:balance]">{pub.title[lang]}</h1>
        <div className="flex flex-col gap-[6px] text-[17px]"><span className="text-sa-ink">{pub.authors}</span><span className="text-sa-muted">{pub.venue}</span></div>
        <div className="flex flex-wrap gap-[10px]">
          {pub.url && <a href={pub.url} target="_blank" rel="noopener" className="flex min-h-[44px] items-center rounded-full bg-sa-blue px-[22px] text-[17px] text-white">{t.pp.open}</a>}
          <button onClick={copy} className="min-h-[44px] cursor-pointer rounded-full border border-sa-line bg-white px-5 text-[17px] text-sa-ink">{copied ? t.pp.copied : t.pp.cite}</button>
        </div>
        <div className="relative aspect-[16/7] overflow-hidden rounded-[24px] bg-black">
          <canvas data-art={ART[pub.area] || 'wave'} aria-hidden="true" className="absolute inset-0 h-full w-full max-w-none" />
        </div>
        {pub.summary && (
          <div className="flex flex-col gap-3">
            <h2 className="m-0 text-2xl font-semibold tracking-[-0.01em]">{t.pp.abstract}</h2>
            <p className="m-0 text-[19px] leading-[1.65] text-sa-ink [text-wrap:pretty]">{pub.summary[lang]}</p>
          </div>
        )}
        <pre className="m-0 whitespace-pre-wrap break-words rounded-2xl bg-sa-mist p-5 font-mono text-[13px] leading-[1.6] text-sa-gray">{bib}</pre>
        {related.length > 0 && (
          <div className="flex flex-col gap-1 border-t border-sa-line pt-7">
            <h2 className="m-0 mb-2 text-2xl font-semibold tracking-[-0.01em]">{t.pp.related}</h2>
            {related.map((p) => (
              <Link key={p.id} href={`/publications/${p.id}`} className="py-2 text-[17px] text-sa-blue">{p.title[lang]} ›</Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
