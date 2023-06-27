export interface AccessGolfCourse {
  id: number
  hotel: string
  description: string
}

export interface AffiliateInfo {
  recnum: string
  name: string
  application: string
  lastContract: string
  sale: number
  interval: string
  nationality: string
  company: number
  email: string
  country: string
  countryCode: string
  lang: string
  intervalPlus: string
  intervalNumber: string
  intervalPrevious: string
  intervalPlatinum: string
  rewardsScheme: number
  program: string
  yachtDiscount: number
  grAccess: number
  golfRounds: number
  golfSale: string
  stayByMarket: true
  market: string
  isNational: number
  referPersons: number
  accessGolfCourse: AccessGolfCourse[]
}