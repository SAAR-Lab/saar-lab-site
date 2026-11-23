'use client';

import { useLang } from './LangProvider';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-sa-line bg-sa-mist text-sa-muted">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-7 text-xs">
        <span className="flex items-center gap-[10px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/saar-mark-dark.png" alt="" className="h-[22px] w-[22px] rounded-md" />
          {t.foot.line}
        </span>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a href="mailto:research@synthi-ai.com" className="text-sa-gray">research@synthi-ai.com</a>
          <a href="https://synthi-ai.com" className="text-sa-gray">synthi-ai.com</a>
          <a href="https://synthi-ai.org/privacy/" className="text-sa-gray">{t.foot.privacy}</a>
          <a href="https://www.linkedin.com/company/synthi-ai/" target="_blank" rel="noopener" className="text-sa-gray">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
