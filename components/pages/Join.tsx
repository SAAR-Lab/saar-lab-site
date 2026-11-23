'use client';

import { useState } from 'react';
import { useLang } from '@/components/LangProvider';
import { ROLES } from '@/content/saar';

export default function Join() {
  const { t, lang } = useLang();
  const [rk, setRk] = useState<'all' | 'res' | 'eng' | 'int'>('all');
  const [open, setOpen] = useState(-1);

  const rkeys: ('all' | 'res' | 'eng' | 'int')[] = ['all', 'res', 'eng', 'int'];
  const roles = ROLES.filter((r) => rk === 'all' || r.k === rk);

  return (
    <section className="px-6 pb-[clamp(96px,12vw,160px)]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[clamp(56px,7vw,96px)]">
        <div className="flex flex-col items-center gap-[18px] pt-[clamp(72px,9vw,120px)] text-center">
          <span className="text-[21px] font-semibold text-sa-blue">{t.join.eyebrow}</span>
          <h1 className="m-0 max-w-[960px] text-[clamp(44px,6.4vw,88px)] font-semibold leading-[1.03] tracking-[-0.015em] [text-wrap:balance]">{t.jp.title}</h1>
          <p className="m-0 max-w-[700px] text-[clamp(19px,1.9vw,21px)] leading-[1.55] text-sa-muted [text-wrap:balance]">{t.jp.lead}</p>
          <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 pt-[6px]">
            <a href="#roles" className="flex min-h-[44px] items-center rounded-full bg-sa-blue px-[22px] text-[17px] text-white">{t.jp.seeRoles}</a>
            <a href="#scholars" className="flex items-center text-[17px] text-sa-blue">SAAR Scholars ›</a>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
          {t.join.items.map(([k, tt, d, cta, subj]) => (
            <div key={tt} className="flex min-h-[240px] flex-col gap-3 rounded-[24px] bg-sa-mist p-8">
              <span className="text-sm font-semibold text-sa-muted">{k}</span>
              <strong className="text-[28px] font-semibold tracking-[-0.01em]">{tt}</strong>
              <span className="text-base leading-[1.55] text-sa-muted">{d}</span>
              <a href={`mailto:research@synthi-ai.com?subject=${encodeURIComponent(subj)}`} className="mt-auto text-[17px] text-sa-blue">{cta} ›</a>
            </div>
          ))}
        </div>

        <div id="roles" className="flex scroll-mt-[72px] flex-col gap-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="m-0 text-[clamp(32px,4vw,52px)] font-semibold tracking-[-0.015em]">{t.jp.rolesTitle}</h2>
            <div className="flex gap-1 rounded-full bg-sa-mist p-1">
              {rkeys.map((k, i) => {
                const on = k === rk;
                return <button key={k} onClick={() => { setRk(k); setOpen(-1); }} className={`min-h-[36px] cursor-pointer rounded-full border-0 px-4 text-sm ${on ? 'bg-white text-sa-ink shadow-[0_2px_6px_rgba(0,0,0,0.08)]' : 'bg-transparent text-sa-muted'}`}>{t.jp.filters[i]}</button>;
              })}
            </div>
          </div>
          <div className="flex flex-col border-t border-sa-line">
            {roles.map((r, i) => {
              const on = i === open;
              const kind = r.k === 'int' ? (lang === 'fr' ? 'Stage' : 'Internship') : (lang === 'fr' ? 'Temps plein' : 'Full-time');
              return (
                <div key={r.t.en} className="border-b border-sa-line">
                  <button onClick={() => setOpen(on ? -1 : i)} className="grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-[6px] border-0 bg-transparent px-1 py-6 text-left">
                    <span className="flex flex-col gap-[6px]"><strong className="text-[21px] font-semibold tracking-[-0.01em] text-sa-ink">{r.t[lang]}</strong><span className="text-[15px] text-sa-muted">{r.team} · Douala · Remote · {kind}</span></span>
                    <span className={`text-2xl text-sa-blue transition-transform duration-300 ${on ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-[400ms] ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="flex max-w-[760px] flex-col gap-[14px] px-1 pb-7">
                        <p className="m-0 text-[17px] leading-[1.6] text-sa-gray">{r.d[lang]}</p>
                        <ul className="m-0 flex list-disc flex-col gap-[6px] pl-5 text-base leading-[1.5] text-sa-gray">{r.req[lang].map((q) => <li key={q}>{q}</li>)}</ul>
                        <a href={`mailto:research@synthi-ai.com?subject=${encodeURIComponent('Application - ' + r.t.en)}`} className="flex min-h-[44px] items-center self-start rounded-full bg-sa-blue px-[22px] text-base text-white">{t.jp.apply}</a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div id="scholars" className="grid scroll-mt-[72px] grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-x-[72px] gap-y-10 rounded-[32px] bg-black p-[clamp(32px,5vw,72px)] text-sa-mist">
          <div className="flex flex-col gap-4">
            <span className="text-sm font-semibold text-[#2997FF]">{t.jp.sch.k}</span>
            <h2 className="m-0 text-[clamp(32px,4vw,52px)] font-semibold leading-[1.06] tracking-[-0.015em]">SAAR Scholars</h2>
            <p className="m-0 text-[18px] leading-[1.55] text-[#A1A1A6]">{t.jp.sch.d}</p>
            <a href="mailto:research@synthi-ai.com?subject=SAAR%20Scholars" className="self-start text-[17px] text-[#2997FF]">{t.jp.sch.cta} ›</a>
          </div>
          <div className="flex flex-col border-t border-[#333336]">
            {t.jp.sch.items.map((s) => (
              <div key={s.t} className="flex flex-col gap-1 border-b border-[#333336] py-[18px]"><strong className="text-[19px] font-semibold">{s.t}</strong><span className="text-[15px] leading-[1.5] text-[#A1A1A6]">{s.d}</span></div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-7">
          <h2 className="m-0 text-[clamp(32px,4vw,52px)] font-semibold tracking-[-0.015em]">{t.jp.howTitle}</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-8 border-t border-sa-line pt-7">
            {t.jp.steps.map(([tt, d], i) => (
              <div key={tt} className="flex flex-col gap-2"><span className="text-sm font-semibold text-sa-blue">{String(i + 1).padStart(2, '0')}</span><strong className="text-[21px] font-semibold">{tt}</strong><span className="text-[15px] leading-[1.5] text-sa-muted">{d}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
