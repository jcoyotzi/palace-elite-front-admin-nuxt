import dashboard from './dashboard/dashboard.lang';
import navBar from './navBar.lang';
import booking from './booking/booking';
import bookingCategory from './booking/categorySelector.lang';
import bookingBenefits from './booking/bookingBenefits/bookingBenefits.lang';
import bookingPaymentProcess from './booking/paymentProcess/paymentProcess.lang';
import drawer from './common/drawer.lang';
import filters from './common/filters.lang';
import menu from './common/menu.lang';
import table from './common/table.lang';
import creditCards from './membership/creditCards.lang';
import membership from './membership/membership.lang';
import myContract from './membership/myContract.lang';
import yourReservation from './reservation/yourReservation.lang';
import breadcrumb from './wallet/breadcrumb.lang';
import wallet from './wallet/wallet.lang';
import summary from './wallet/summary.lang';
import universalCredit from './wallet/universalCredit.lang';
import imperial from './weeks/imperial.lang';
import pagination from './weeks/pagination.lang';
import weeks from './weeks/weeks.lang';
import paylink from './paylink.lang';
import bookingsLang from './bookings.lang';
import resortCreditLang from './programs/resortCredit.lang';
import notifications from './notifications/notifications.lang';
import contactUsLang from './contactUs/contactUs.lang';
import loginFormLang from './login/loginForm';

export default {
  strategy: 'prefix_except_default',
  defaultLocale: 'en',
  locales: [
    {
      code: 'en',
      name: 'English'
    },
    {
      code: 'es',
      name: 'Español'
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
    'destinations-and-resorts/index': {
      en: '/destinations-and-resorts',
      es: '/destinos-y-resorts',
    },
    'destinations-and-resorts/_slug': {
      en: '/destinations-and-resorts/:slug',
      es: '/destinos-y-resorts/:slug',
    },
    'offers/index': {
      en: '/offers',
      es: '/ofertas',
    },
    'offers/_slug': {
      en: '/offers/:slug',
      es: '/ofertas/:slug',
    },
    'errors/404-not-found': {
      en: '/404',
      es: '/404',
    },
    '_': {
      en: '/*',
      es: '/*',
    },
  },
  vueI18n: {
    fallbackLocale: 'en',
    silentFallbackWarn: true,
    messages: {
      en: {
        expiration: 'Expiration',
        used: 'Used',
        available: 'Available',
        expired: 'Expired',
        toRelease: 'To Release',
        learnMore: 'Learn More',
        prev: 'Previous',
        next: 'Next',
        ascending: 'Ascending',
        descending: 'Descending',
        sortBy: 'Sort By',
        dashboard: dashboard.messages.en,
        navBar: navBar.messages.en,
        booking: booking.messages.en,
        bookingCategory: bookingCategory.messages.en,
        bookingBenefits: bookingBenefits.messages.en,
        bookingPaymentProcess: bookingPaymentProcess.messages.en,
        drawer: drawer.messages.en,
        filters: filters.messages.en,
        menu: menu.messages.en,
        table: table.messages.en,
        creditCards: creditCards.messages.en,
        membership: membership.messages.en,
        myContract: myContract.messages.en,
        yourReservation: yourReservation.messages.en,
        breadcrumb: breadcrumb.messages.en,
        wallet: wallet.messages.en,
        summary: summary.messages.en,
        universalCredit: universalCredit.messages.en,
        imperial: imperial.messages.en,
        pagination: pagination.messages.en,
        weeks: weeks.messages.en,
        paylink: paylink.messages.en,
        bookingsLang: bookingsLang.messages.en,
        resortCreditLang: resortCreditLang.messages.en,
        notifications: notifications.messages.en,
        contact: contactUsLang.messges.en,
        login: loginFormLang.messages.en
      },
      es: {
        sortBy: 'Ordenar Por',
        prev: 'Anterior',
        next: 'Siguiente',
        learnMore: 'Aprender Más',
        expiration: 'Expiración',
        used: 'Usado',
        available: 'Disponible',
        expired: 'Caducado',
        toRelease: 'Liberar',
        ascending: 'Ascendente',
        descending: 'Descendente',
        dashboard: dashboard.messages.es,
        navBar: navBar.messages.es,
        booking: booking.messages.es,
        bookingCategory: bookingCategory.messages.es,
        bookingBenefits: bookingBenefits.messages.es,
        bookingPaymentProcess: bookingPaymentProcess.messages.es,
        drawer: drawer.messages.es,
        filters: filters.messages.es,
        menu: menu.messages.es,
        table: table.messages.es,
        creditCards: creditCards.messages.es,
        membership: membership.messages.es,
        myContract: myContract.messages.es,
        yourReservation: yourReservation.messages.es,
        breadcrumb: breadcrumb.messages.es,
        wallet: wallet.messages.es,
        summary: summary.messages.es,
        universalCredit: universalCredit.messages.es,
        imperial: imperial.messages.es,
        pagination: pagination.messages.es,
        weeks: weeks.messages.es,
        paylink: paylink.messages.es,
        bookingsLang: bookingsLang.messages.es,
        resortCreditLang: resortCreditLang.messages.es,
        notifications: notifications.messages.es,
        contact: contactUsLang.messges.es,
        login: loginFormLang.messages.es
      }
    }
  }
}
