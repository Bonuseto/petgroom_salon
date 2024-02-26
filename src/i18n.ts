// i18n.js or i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import plTranslation from './locales/pl.json';
import uaTranslation from './locales/ua.json';
import ruTranslation from './locales/ru.json';

// Initialize i18next
i18n
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language if translation is missing
    resources: {
      en: {
        translation: enTranslation // English translation file
      },
      pl: {
        translation: plTranslation // Polish translation file
      },
      ua: {
        translation: uaTranslation // Ukranian translation file
      },
      ru: {
        translation: ruTranslation // Russian translation file
      }
    },
    interpolation: {
      escapeValue: false // not needed for React
    }
  });

export default i18n;