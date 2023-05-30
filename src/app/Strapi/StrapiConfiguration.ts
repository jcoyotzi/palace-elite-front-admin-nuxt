// export enum SingleTypes {
//   Navbar = 'navbar',
//   Menu = 'menu',
//   Footer = 'footer',
// }

export enum BaseTypePages {
  Empty = '',
  Base = 'base',
  Offer = 'offer',
  Resort = 'resort',
};

export enum BasePageSlugs {
  // AccountDetails = 'account-details',
  // AllWeeks = 'all-weeks',
  // AnniversaryWeeks = 'anniversary-weeks',
  // Beneficiaries = 'beneficiaries',
  // Benefits = 'benefits',
  // BonusWeeks = 'bonus-weeks',
  // Bookings = 'bookings',
  // BuildYourSearch = 'build-your-search',
  // ContactUs = 'contact-us',
  // CreditCards = 'credit-cards',
  // Dashboard = 'dashboard',
  // DestinationsAndResorts = 'destinations-and-resorts',
  Empty = '',
  // Guests = 'guests',
  // Home = 'home',
  // ImperialWeeks = 'imperial-weeks',
  // IncentiveWeeks = 'incentive-weeks',
  // Login = 'login',
  // MyContract = 'my-contract',
  // NotFound404 = '404-not-found',
  // Offers = 'offers',
  // Owners = 'owners',
  // PreferentialWeeks = 'preferential-weeks',
  // ReferralProgram = 'referral-program',
  // ResortCredit = 'resort-credit',
  // RewardNights = 'reward-nights',
  // SummaryAndPayments = 'summary-and-payments',
  // UniversalCredits = 'universal-credits',
  BPG = 'bpg',
  BPGPrivacyPolicy = 'bpg-privacypolicy',
  BPGPolicies = 'bpg-policies',
  BPGUniversalCredit = 'bpg-universal-credit',
  BookingCredits = 'booking-credits'
};

export interface ConfigByLocaleInterface {
  [key: string]: {
    resortsPrefix: string,
    offersPrefix: string,
  }
}

export interface RouteLocalization {
  id: number,
  locale: string,
  type: BaseTypePages,
}

export interface RouteWithSlug {
  id: number,
  type: BaseTypePages,
  path: string,
  slug: string,
  slugBase: string,
  locale: string,
  localizations: RouteLocalization[],
}

export const ConfigByLocale: ConfigByLocaleInterface = {
  en: {
    resortsPrefix: 'destinations-and-resorts',
    offersPrefix: 'offers',
  },
  es: {
    resortsPrefix: 'destinos-y-resorts',
    offersPrefix: 'ofertas',
  },
};

export const BasePageSlugsContains = (slug: BasePageSlugs | string) => {
  return Object.values(BasePageSlugs).map(i => i.toString()).includes(slug);
};

export const getConfigByLocale = (locale: string) => {
  return ConfigByLocale[locale];
}
