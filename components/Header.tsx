'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from './LangProvider';

const ROUTES = ['/', '/publications', '/people', '/join'];

export default function Header() {
  const { t, toggle } = useLang();
  const pathname = usePathname();
  const activeIndex = pathname === '/' ? 0 : ROUTES.findIndex((r) => r !== '/' && pathname.startsWith(r));

  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.08] bg-sa-fog/80 [backdrop-filter:saturate(1.8)_blur(20px)] [-webkit-backdrop-filter:saturate(1.8)_blur(20px)]">
      <div className="mx-auto flex h-[52px] max-w-[1200px] items-center justify-between gap-5 px-6">
        <Link href="/" className="flex items-center gap-[10px] text-sa-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/saar-mark-light.png" alt="" className="h-7 w-7 object-contain [mix-blend-mode:multiply]" />
          <span className="text-[17px] font-bold tracking-[-0.01em]">SAAR <span className="font-medium text-sa-blue">Lab</span></span>
        </Link>

        <nav className="hidden items-center gap-1 nav:flex">
          {t.nav.map((label, i) => (
            <Link key={label} href={ROUTES[i]} className={`px-3 py-2 text-xs transition-colors hover:text-sa-ink ${i === activeIndex ? 'text-sa-blue' : 'text-sa-gray'}`}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-[10px]">
          <button onClick={toggle} aria-label="Language" className="h-7 w-10 cursor-pointer rounded-full border border-sa-line bg-transparent text-xs text-sa-ink">
            {t.langSwitch}
          </button>
          <a href="https://synthi-ai.com" className="whitespace-nowrap text-xs text-sa-muted">SYNTHI-AI ↗</a>
        </div>
      </div>
    </header>
  );
}
