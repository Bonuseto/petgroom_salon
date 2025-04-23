const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const path = require('path');

// Create a promise that resolves when i18next is initialized
const i18nextPromise = i18next
  .use(Backend)
  .init({
    fallbackLng: 'en',
    ns: ['emails'],
    defaultNS: 'emails',
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.json'),
    },
    interpolation: {
      escapeValue: false
    },
    initImmediate: false, // This ensures synchronous loading
    debug: true // Enable debug logging
  });

module.exports = {
  i18next,
  i18nextPromise // Export the initialization promise
};