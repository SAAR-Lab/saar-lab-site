'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/components/LangProvider';
import { AREAS, SCHOLAR, areaLabel } from '@/content/saar';
import type { Publication } from '@/content/publications';

const year = (p: Publication) => (String(p.date).match(/\d{4}/) || ['—'])[0];

export default function PublicationsList({ pubs }: { pubs: Publication[] }) {
  const { t, lang } = useLang();
  const [q, setQ] = useState('');
  const [area, setArea] = useState('all');
  const [type, setType] = useState('all');

  const ql = q.trim().toLowerCase();
  const list = pubs.filter(
    (p) => (area === 'all' || p.area === area) && (type === 'all' || p.type === type) && (!ql || (p.title[lang] + ' ' + p.authors).toLowerCase().includes(ql))
  );
  const years = [...new Set(list.map(year))].sort().reverse().map((y) => ({ year: y, items: list.filter((p) => year(p) === y) }));

  const areaFilters = [['all', t.pubs.all] as [string, string]].concat(AREAS.map((a) => [a[0], a[2][lang][0]] as [string, string]));
  const types = ['all', ...Array.from(new Set(pubs.map((p) => p.type)))];

  return (
    <section className="px-6 pb-[clamp(96px,12vw,160px)]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
        <div className="flex flex-col gap-[18px] pb-[clamp(40px,5vw,64px)] pt-[clamp(72px,9vw,120px)]">
          <span className="text-[21px] font-semibold text-sa-blue">{t.pubs.eyebrow}</span>
          <h1 className="m-0 text-[clamp(44px,6.4vw,88px)] font-semibold leading-[1.03] tracking-[-0.015em]">{t.pp.title}</h1>
          <p className="m-0 max-w-[720px] text-[clamp(19px,1.9vw,21px)] leading-[1.55] text-sa-muted">{t.pp.lead}</p>
        </div>

        <input value={q} onChange={(e) => setQ(e.target.value)} type="search" placeholder={t.pubs.search} className="min-h-[52px] rounded-[14px] border border-sa-line bg-white px-[18px] text-[17px] [outline-color:#1556F0]" />

        <div className="flex flex-col gap-3">
          <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
            {areaFilters.map(([k, n]) => {
              const on = k === area;
              return <button key={k} onClick={() => setArea(k)} className={`min-h-[36px] flex-none cursor-pointer rounded-full border px-4 text-sm ${on ? 'border-sa-ink bg-sa-ink text-white' : 'border-sa-line bg-white text-sa-ink'}`}>{n}</button>;
            })}
          </div>
          <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
            {types.map((k) => {
              const on = k === type;
              return <button key={k} onClick={() => setType(k)} className={`min-h-[32px] flex-none cursor-pointer rounded-lg border-0 px-3 text-[13px] font-medium ${on ? 'bg-sa-dim text-sa-ink' : 'bg-transparent text-sa-muted'}`}>{k === 'all' ? t.pp.all : k}</button>;
            })}
          </div>
        </div>

        <span className="text-sm text-sa-muted">{t.pp.count(list.length)}</span>

        {years.map((y) => (
          <div key={y.year} className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-x-10 gap-y-4 border-t border-sa-ink pt-5">
            <strong className="text-[28px] font-semibold tracking-[-0.01em]">{y.year}</strong>
            <div className="flex flex-col [grid-column:span_4]">
              {y.items.map((p) => (
                <Link key={p.id} href={`/publications/${p.id}`} className="mb-6 flex flex-col gap-2 border-b border-sa-line px-1 pb-6 text-sa-ink">
                  <span className="flex flex-wrap gap-x-[14px] gap-y-[6px] text-[13px] font-semibold"><span className="text-sa-blue">{areaLabel(p.area, lang)}</span><span className="text-sa-muted">{p.type}</span><span className="text-sa-muted">{p.venue}</span></span>
                  <strong className="text-[23px] font-semibold leading-[1.25] tracking-[-0.01em]">{p.title[lang]}</strong>
                  <span className="text-[15px] text-sa-muted">{p.authors}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
        {list.length === 0 && <p className="m-0 py-10 text-[17px] text-sa-muted">{t.pubs.empty}</p>}

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-[24px] bg-sa-mist p-[clamp(24px,3vw,36px)]">
          <span className="max-w-[640px] text-[17px] leading-[1.5] text-sa-ink">{t.pp.scholarNote}</span>
          <a href={SCHOLAR} target="_blank" rel="noopener" className="flex min-h-[44px] items-center rounded-full bg-sa-blue px-[22px] text-[17px] text-white">Google Scholar</a>
        </div>
      </div>
    </section>
  );
}
