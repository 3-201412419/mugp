import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import kr from './locales/kr.json';
import en from './locales/en.json';
import ja from './locales/ja.json';
import zh from './locales/zh.json';

const resources = {
  kr: { translation: kr },
  en: { translation: en },
  ja: { translation: ja },
  zh: { translation: zh }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'kr',
    fallbackLng: 'kr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
