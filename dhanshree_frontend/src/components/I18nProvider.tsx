'use client';

import { ReactNode, useEffect, useState } from 'react';
// import initI18n from '@/lib/i18';
import i18n from '@/lib/i18';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    i18next.on('initialized', () => console.log('i18n initialized', i18next.language));
i18next.on('languageChanged', (lng) => console.log('language changed to', lng));

    // initI18n().then(() => setReady(true));
    i18n.init().then(() => setReady(true));
  }, []);

  if (!ready) return null; // Prevent mismatch during hydration

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
