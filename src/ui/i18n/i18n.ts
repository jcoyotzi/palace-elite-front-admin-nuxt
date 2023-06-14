import messages from './messages/messages.lang'

export default {
  strategy: 'prefix_except_default',
  defaultLocale: 'en',
  locales: [
    {
      code: 'en',
      name: 'English',
    },
    {
      code: 'es',
      name: 'Español',
    },
    {
      code: 'pt',
      name: 'Português',
    }
  ],
  seo: false,
  detectBrowserLanguage: {
    alwaysRedirect: false,
    fallbackLocale: 'en',
    redirectOn: 'root', // recommended
    useCookie: true,
    cookieAge: 365,
    cookieCrossOrigin: false,
    cookieDomain: null,
    cookieKey: 'i18n_redirected',
    cookieSecure: true,
  },
  parsePages: false,
  pages: {
    'index': {
      en: '/',
      es: '/',
    },
  },
  vueI18n: {
    fallbackLocale: 'en',
    silentFallbackWarn: true,
    messages,
  }
}