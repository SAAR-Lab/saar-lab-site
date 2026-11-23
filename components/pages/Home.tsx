'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/components/LangProvider';
import { AREAS, ART, SCHOLAR, areaLabel } from '@/content/saar';
import type { Publication } from '@/content/publications';

export default function Home({ pubs, featured }: { pubs: Publication[]; featured: Publication }) {
  const { t, lang } = useLang();
  const [q, setQ] = useState('');
  const [area, setArea] = useState('all');

  const ql = q.trim().toLowerCase();
  const preview = pubs
    .filter((p) => (area === 'all' || p.area === area) && (!ql || p.title[lang].toLowerCase().includes(ql)))
    .slice(0, 5);

  const filters = [['all', t.pubs.all] as [string, string]].concat(AREAS.map((a) => [a[0], a[2][lang][0]] as [string, string]));

  return (
    <>
      {/* Hero */}
      <section id="top" className="relative overflow-hidden px-6 pb-[clamp(72px,9vw,128px)] pt-[clamp(88px,12vw,168px)]">
        <canvas data-field="1" aria-hidden="true" className="absolute inset-0 h-full w-full max-w-none" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.6)_55%,rgba(255,255,255,0)_100%)]" />
        <div className="relative mx-auto flex max-w-[1000px] flex-col items-center gap-6 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img data-reveal="0" data-spin="1" src="/assets/saar-mark-light.png" alt="SAAR Lab" className="h-[88px] w-[88px] object-contain [mix-blend-mode:multiply]" />
          <span data-reveal="0" className="text-[21px] font-semibold text-sa-muted">{t.hero.eyebrow}</span>
          <h1 data-reveal="1" className="m-0 text-[clamp(44px,7.4vw,96px)] font-semibold leading-[1.03] tracking-[-0.015em] [text-wrap:balance]">{t.hero.title}</h1>
          <p data-reveal="2" className="m-0 max-w-[720px] text-[clamp(19px,1.9vw,23px)] leading-[1.5] text-sa-muted [text-wrap:balance]">{t.hero.lead}</p>
          <div data-reveal="3" className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            <Link href="/publications" className="flex min-h-[44px] items-center rounded-full bg-sa-blue px-[22px] text-[17px] text-white transition-colors hover:bg-sa-blue-700">{t.hero.a}</Link>
            <a href={SCHOLAR} target="_blank" rel="noopener" className="text-[17px] text-sa-blue">{t.hero.b} ›</a>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section id="featured" className="px-6 pb-[clamp(88px,10vw,140px)]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-5">
          <h2 className="m-0 text-[clamp(28px,3vw,40px)] font-semibold tracking-[-0.01em]">{t.featured}</h2>
          <Link data-reveal="1" href={`/publications/${featured.id}`} className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] overflow-hidden rounded-[28px] bg-sa-mist text-sa-ink">
            <div className="relative min-h-[clamp(280px,30vw,420px)] overflow-hidden bg-black">
              <canvas data-art={ART[featured.area] || 'wave'} aria-hidden="true" className="absolute inset-0 h-full w-full max-w-none" />
            </div>
            <div className="flex flex-col justify-center gap-[14px] p-[clamp(28px,4vw,56px)]">
              <span className="text-sm font-semibold text-sa-blue">{areaLabel(featured.area, lang)} · {featured.type}</span>
              <strong className="text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-[-0.01em] [text-wrap:balance]">{featured.title[lang]}</strong>
              {featured.summary && <span className="text-[17px] leading-[1.55] text-sa-muted">{featured.summary[lang]}</span>}
              <span className="text-sm text-sa-muted">{featured.authors} · {featured.date}</span>
              <span className="pt-[6px] text-[17px] text-sa-blue">{t.read} ›</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Research areas */}
      <section id="areas" className="bg-sa-mist px-6 py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-[clamp(48px,6vw,72px)]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-end gap-x-20 gap-y-6">
            <div className="flex flex-col gap-[18px]">
              <span data-reveal="0" className="text-[21px] font-semibold text-sa-blue">{t.areas.eyebrow}</span>
              <h2 data-reveal="1" className="m-0 text-[clamp(36px,4.6vw,64px)] font-semibold leading-[1.05] tracking-[-0.015em] [text-wrap:balance]">{t.areas.title}</h2>
            </div>
            <p data-reveal="2" className="m-0 text-[19px] leading-[1.55] text-sa-muted">{t.areas.lead}</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4">
            {AREAS.map(([key, art, d]) => {
              const count = pubs.filter((p) => p.area === key).length;
              return (
                <Link key={key} data-reveal="1" href="/publications" className="flex min-h-[240px] flex-col gap-3 rounded-[24px] bg-white p-7 transition-[transform,box-shadow] duration-[400ms] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
                  <span className="relative h-12 w-12 overflow-hidden rounded-[14px] bg-black">
                    <canvas data-art={art} aria-hidden="true" className="absolute inset-0 h-full w-full max-w-none" />
                  </span>
                  <strong className="mt-auto text-2xl font-semibold tracking-[-0.01em]">{d[lang][0]}</strong>
                  <span className="text-base leading-[1.5] text-sa-muted">{d[lang][1]}</span>
                  <span className="text-[15px] text-sa-blue">{t.areas.n(count)} ›</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Publications preview */}
      <section id="publications" className="px-6 py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <div className="flex flex-col gap-[18px]">
              <span className="text-[21px] font-semibold text-sa-blue">{t.pubs.eyebrow}</span>
              <h2 className="m-0 text-[clamp(36px,4.6vw,64px)] font-semibold leading-[1.05] tracking-[-0.015em]">{t.pubs.title}</h2>
            </div>
            <input value={q} onChange={(e) => setQ(e.target.value)} type="search" placeholder={t.pubs.search} className="min-h-[44px] flex-[0_1_320px] rounded-xl border border-sa-line bg-white px-4 text-base [outline-color:#1556F0]" />
          </div>
          <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
            {filters.map(([k, n]) => {
              const on = k === area;
              return (
                <button key={k} onClick={() => setArea(k)} className={`min-h-[36px] flex-none cursor-pointer rounded-full border px-4 text-sm transition-colors ${on ? 'border-sa-ink bg-sa-ink text-white' : 'border-sa-line bg-white text-sa-ink'}`}>{n}</button>
              );
            })}
          </div>
          <div className="flex flex-col border-t border-sa-line">
            {preview.map((p) => (
              <Link key={p.id} href={`/publications/${p.id}`} className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-x-8 gap-y-2 border-b border-sa-line px-1 py-6 text-sa-ink transition-colors hover:bg-sa-fog">
                <span className="flex flex-col gap-1 text-sm text-sa-muted"><span>{p.date}</span><span className="font-semibold text-sa-blue">{areaLabel(p.area, lang)}</span></span>
                <span className="flex min-w-0 flex-col gap-[6px] [grid-column:span_3]">
                  <strong className="text-[21px] font-semibold leading-[1.25] tracking-[-0.01em]">{p.title[lang]}</strong>
                  <span className="text-[15px] text-sa-muted">{p.authors}</span>
                </span>
                <span className="flex items-start justify-start"><span className="rounded-full bg-sa-mist px-[10px] py-[5px] text-[13px] font-medium text-sa-ink">{p.type}</span></span>
              </Link>
            ))}
            {preview.length === 0 && <p className="m-0 px-1 py-10 text-[17px] text-sa-muted">{t.pubs.empty}</p>}
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            <Link href="/publications" className="text-[17px] text-sa-blue">{t.pubs.allLink} ›</Link>
            <a href={SCHOLAR} target="_blank" rel="noopener" className="text-[17px] text-sa-blue">{t.pubs.scholar} ›</a>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section id="principles" className="bg-black px-6 py-[clamp(96px,12vw,160px)] text-sa-mist">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-[clamp(48px,6vw,72px)]">
          <h2 data-reveal="0" className="m-0 max-w-[900px] text-[clamp(36px,5vw,72px)] font-semibold leading-[1.05] tracking-[-0.015em] [text-wrap:balance]">{t.princ.title}</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-14 gap-y-10 border-t border-[#333336] pt-10">
            {t.princ.items.map((p) => (
              <div key={p.k} data-reveal="1" className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-[#2997FF]">{p.k}</span>
                <strong className="text-[28px] font-semibold leading-[1.12] tracking-[-0.01em]">{p.t}</strong>
                <p className="m-0 text-[17px] leading-[1.55] text-[#A1A1A6]">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* People preview */}
      <section id="people" className="px-6 py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-x-20 gap-y-12">
          <div className="flex flex-col gap-[18px]">
            <span data-reveal="0" className="text-[21px] font-semibold text-sa-blue">{t.people.eyebrow}</span>
            <h2 data-reveal="1" className="m-0 text-[clamp(36px,4.6vw,64px)] font-semibold leading-[1.05] tracking-[-0.015em] [text-wrap:balance]">{t.people.title}</h2>
            <p data-reveal="2" className="m-0 text-[19px] leading-[1.55] text-sa-muted">{t.people.lead}</p>
          </div>
          <div data-reveal="1" className="grid grid-cols-[minmax(0,200px)_minmax(0,1fr)] items-center gap-7 rounded-[28px] bg-sa-mist p-7">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://synthi-ai.org/founder/image1.jpeg" alt="Vincess Dongmo" className="aspect-[4/5] w-full rounded-[18px] bg-sa-dim object-cover" />
            <div className="flex flex-col gap-[10px]">
              <strong className="text-[28px] font-semibold tracking-[-0.01em]">Vincess Dongmo</strong>
              <span className="text-[15px] font-semibold text-sa-blue">{t.people.role}</span>
              <span className="text-base leading-[1.55] text-sa-muted">{t.people.bio}</span>
              <a href={SCHOLAR} target="_blank" rel="noopener" className="text-base text-sa-blue">Google Scholar ›</a>
            </div>
          </div>
          <Link href="/people" className="text-[17px] text-sa-blue">{t.people.allLink} ›</Link>
        </div>
      </section>

      {/* Join preview */}
      <section id="join" className="bg-sa-mist px-6 py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-[clamp(48px,6vw,72px)]">
          <div className="flex flex-col items-center gap-[18px] text-center">
            <span data-reveal="0" className="text-[21px] font-semibold text-sa-blue">{t.join.eyebrow}</span>
            <h2 data-reveal="1" className="m-0 max-w-[900px] text-[clamp(40px,5.6vw,80px)] font-semibold leading-[1.05] tracking-[-0.015em] [text-wrap:balance]">{t.join.title}</h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
            {t.join.items.map(([k, tt, d, cta, subj]) => (
              <div key={tt} data-reveal="1" className="flex min-h-[260px] flex-col gap-3 rounded-[24px] bg-white p-8">
                <span className="text-sm font-semibold text-sa-muted">{k}</span>
                <strong className="text-[28px] font-semibold tracking-[-0.01em]">{tt}</strong>
                <span className="text-base leading-[1.55] text-sa-muted">{d}</span>
                <a href={`mailto:research@synthi-ai.com?subject=${encodeURIComponent(subj)}`} className="mt-auto text-[17px] text-sa-blue">{cta} ›</a>
              </div>
            ))}
          </div>
          <Link href="/join" className="self-center text-[17px] text-sa-blue">{t.join.allLink} ›</Link>
        </div>
      </section>
    </>
  );
}
