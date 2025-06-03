'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Cookies from 'js-cookie';
import enTranslation from '../../public/user/locales/en/common.json';
import neTranslation from '../../public/user/locales/ne/common.json';

const storedLang = Cookies.get('lang');

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ne: { translation: neTranslation },
    },
    lng: storedLang , // use stored language or fallback to 'en'
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
  
// import i18next from 'i18next';
// import HttpBackend from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import { initReactI18next } from 'react-i18next';

// const initI18n = async () => {
//   if (!i18next.isInitialized) {
//     await i18next
//       .use(HttpBackend)
//       .use(LanguageDetector)
//       .use(initReactI18next)
//       .init({
//         fallbackLng: 'en',
//         supportedLngs: ['en', 'ne'],
//         backend: {
//           loadPath: '/locales/{{lng}}/{{ns}}.json',
//         },
//         ns: ['common'],
//         defaultNS: 'common',
//         interpolation: {
//           escapeValue: false,
//         },
//         detection: {
//           order: ['cookie', 'htmlTag'],
//           caches: ['cookie'],
//         },
//       });
//   }
//   return i18next;
// };

// export default initI18n;
