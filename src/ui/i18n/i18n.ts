import messages from './messages/messages'

export default {
  strategy: 'prefix_except_default',
  defaultLocale: 'en',
  locales: [
    {
      code: 'en',
      short: 'EN',
      name: 'English',
    },
    {
      code: 'es',
      short: 'ES',
      name: 'Español',
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
  parsePages: true,
  pages: {
    //
  },
  vueI18n: {
    fallbackLocale: 'en',
    silentFallbackWarn: true,
    messages,
  }
}