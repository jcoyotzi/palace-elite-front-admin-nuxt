import {LinkEntity} from './linkEntity'

export interface ImageStrapi {
  mime: string
  url: string
  alt: string
  title: string
  formats: {
    small: {
      url: string
    }
    medium: {
      url: string
    }
    large: {
      url: string
    }
  }
  alternativeText: string
  caption: string
}

export interface Auth {
  onlyShowToAuthenticate: boolean
}

export interface Submenu extends Auth {
  title: string
  items: LinkEntity[]
}

export interface Propertie {
  label: string
  url: string
  link: any | null
  img: ImageStrapi | null
  comingSoon: boolean
  comingSoonLabel: string
  resortCity: {
    name: string
    properties: any[]
  } | null
}

export interface Destination extends Auth {
  label: string
  url: string
}

export interface Destinations extends Auth {
  properties: Propertie[] | null
  destinations: Destination[]
  destinationTitle: string
}

export interface ContactUs extends Auth {
  link?: LinkEntity | null
}

export interface Phone extends Auth {
  phoneNumber: string
}

export interface LoginLabel extends Auth {
  label: string
}

export interface Home extends Auth {
  link: LinkEntity | null
}

export interface Dashboard extends Auth {
  link: LinkEntity | null
}

export interface Bookings extends Auth {
  link: LinkEntity | null
}

export interface Offers extends Auth {
  link: LinkEntity | null
}

export interface Benefits extends Auth {
  label: string
  weeks: {
    label: string
    links: LinkEntity[]
  }
  programs: {
    label: string
    links: LinkEntity[]
  }
  wallet: {
    label: string
    links: LinkEntity[]
  }
}

export interface Membership extends Auth {
  label: string
  information: {
    label: string
    links: LinkEntity[]
  }
}

export interface NavbarEntity {
  // First row
  logoImg: ImageStrapi | null
  logoIcon: ImageStrapi | null
  contactUs: ContactUs | null
  phone: Phone | null

  // Second Row
  home: Home
  destinations: Destinations
  dashboard: Dashboard
  benefits: Benefits //
  membership: Membership
  bookings: Bookings
  offers: Offers
  loginLabel: LoginLabel
}
