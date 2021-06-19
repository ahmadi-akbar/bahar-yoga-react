import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import store from './functions/store';
import en from './language/en/translation';
import ar from './language/ar/translation';
import { setLanguage } from './functions';

if (!store.getState().store.lan) setLanguage('en');

// the translations
const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

export default i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: store.getState().store.lan || 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
