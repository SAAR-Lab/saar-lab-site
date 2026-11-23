'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { T, type Dict, type Lang } from '@/content/saar';

interface LangValue {
  lang: Lang;
  t: Dict;
  toggle: () => void;
}

const Ctx = createContext<LangValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const toggle = useCallback(() => setLang((l) => (l === 'en' ? 'fr' : 'en')), []);
  const value = useMemo(() => ({ lang, t: T[lang] as Dict, toggle }), [lang, toggle]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang(): LangValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLang must be used within <LangProvider>');
  return ctx;
}
