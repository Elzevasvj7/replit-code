import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import data_en from './public/languages/en.json';
import data_es from './public/languages/es.json';

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: 'es',
  returnObjects: true,
  resources: {
    en: {
      global: data_en,
    },
    es: {
      global: data_es,
    },
  },
});

export default i18n;
