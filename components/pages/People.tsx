'use client';

import Link from 'next/link';
import { useLang } from '@/components/LangProvider';
import { PEOPLE } from '@/content/saar';

export default function People() {
  const { t, lang } = useLang();
  const groups: [string, string][] = [['lead', t.pg.lead], ['res', t.pg.res]];

  return (
    <section className="px-6 pb-[clamp(96px,12vw,160px)]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[clamp(48px,6vw,72px)]">
        <div className="flex flex-col gap-[18px] pb-[clamp(40px,5vw,64px)] pt-[clamp(72px,9vw,120px)]">
          <span className="text-[21px] font-semibold text-sa-blue">{t.people.eyebrow}</span>
          <h1 className="m-0 max-w-[900px] text-[clamp(44px,6.4vw,88px)] font-semibold leading-[1.03] tracking-[-0.015em] [text-wrap:balance]">{t.people.title}</h1>
          <p className="m-0 max-w-[720px] text-[clamp(19px,1.9vw,21px)] leading-[1.55] text-sa-muted">{t.people.lead}</p>
        </div>

        {groups.map(([g, title]) => (
          <div key={g} className="flex flex-col gap-6">
            <h2 className="m-0 border-t border-sa-line pt-6 text-[clamp(26px,2.6vw,34px)] font-semibold tracking-[-0.01em]">{title}</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-x-6 gap-y-8">
              {PEOPLE.filter((m) => m.g === g).map((m) => {
                const ini = m.n.split(' ').map((s) => s[0]).slice(0, 2).join('');
                return (
                  <div key={m.n} className="flex flex-col gap-[10px]">
                    <div className="aspect-[4/5] overflow-hidden rounded-[20px] bg-sa-mist">
                      {m.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.photo} alt={m.n} loading="lazy" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[64px] font-semibold text-[#A1A1A6]">{ini}</div>
                      )}
                    </div>
                    <strong className="pt-[6px] text-[21px] font-semibold tracking-[-0.01em]">{m.n}</strong>
                    <span className="text-[15px] font-semibold text-sa-blue">{m.r[lang]}</span>
                    <span className="text-[15px] leading-[1.5] text-sa-muted">{m.b[lang]}</span>
                    <div className="flex flex-wrap gap-2">
                      {m.tags.map((tg) => <span key={tg} className="rounded-full bg-sa-mist px-[10px] py-[5px] text-[13px] text-sa-ink">{tg}</span>)}
                    </div>
                    {m.scholar && <a href={m.scholar} target="_blank" rel="noopener" className="text-[15px] text-sa-blue">Google Scholar ›</a>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5 rounded-[28px] bg-sa-mist p-[clamp(28px,4vw,48px)]">
          <div className="flex max-w-[640px] flex-col gap-2"><strong className="text-[28px] font-semibold tracking-[-0.01em]">{t.pg.ctaTitle}</strong><span className="text-[17px] leading-[1.5] text-sa-muted">{t.pg.ctaText}</span></div>
          <Link href="/join" className="flex min-h-[44px] items-center rounded-full bg-sa-blue px-[22px] text-[17px] text-white">{t.pg.cta}</Link>
        </div>
      </div>
    </section>
  );
}
