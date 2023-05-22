export enum SingleTypes {
  Navbar = 'navbar',
  Menu = 'menu',
  Footer = 'footer',
}

export enum BaseTypePages {
  Empty = '',
  Base = 'base',
  Offer = 'offer',
  Resort = 'resort',
};

export enum BasePageSlugs {
  Empty = '',
  Benefits = 'benefits',
  Bookings = 'bookings',
  Dashboard = 'dashboard',
  BuildYourSearch = 'build-your-search',
  PreferentialWeeks = 'preferential-weeks',
  ContactUs = 'contact-us',
  ReferralProgram = 'referral-program',
  Home = 'home',
  Login = 'login',
  Offers = 'offers',
  Owners = 'owners',
  Guests = 'guests',
  Beneficiaries = 'beneficiaries',
  SummaryAndPayments = 'summary-and-payments',
  AccountDetails = 'account-details',
  MyContract = 'my-contract',
  CreditCards = 'credit-cards',
  DestinationsAndResorts = 'destinations-and-resorts',
  ResortCredit = 'resort-credit',
  ImperialWeeks = 'imperial-weeks',
  BonusWeeks = 'bonus-weeks',
  AnniversaryWeeks = 'anniversary-weeks',
  IncentiveWeeks = 'incentive-weeks',
  AllWeeks = 'all-weeks',
  RewardNights = 'reward-nights',
  UniversalCredits = 'universal-credits',
  NotFound404 = '404-not-found',
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
