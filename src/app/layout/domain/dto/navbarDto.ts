import {PageTypes} from '../types/LinkTypes'

export interface LocaleOption {
  label: string
  id: number
}

export interface LinkDto {
  id: number
  type: PageTypes
  openNewTab: boolean
  label: string
  url?: string
  page?: {
    data?: {
      id: number
      attributes: {
        title?: string
        slug?: string
        route?: string
        locale?: string
        seoMetatags?: object
        hero?: object
        blocks?: []
        localizations?: {
          data: []
        }
      }
    }
  }
}

export interface MediaDTO {
  id: number
  title: string
  altText: boolean
  media: {
    data: {
      id: number
      attributes: {
        name: string
        alternativeText: string
        caption: string
        width: number
        height: number
        formats: {
          thumbnail: {
            ext: string
            url: string
            hash: string
            mime: string
            name: string
            path: null
            size: number
            width: number
            height: number
          }
        }
        hash: string
        ext: string
        mime: string
        size: number
        url: string
        previewUrl: null
        provider: string
        provider_metadata: null
        createdAt: string
        updatedAt: string
      }
    }
  }
}

export interface Telephone {
  id: number
  telephone: {
    data: {
      id: number
      attributes: {
        telephone: string
        createdAt: string
        updatedAt: string
        publishedAt: string
        locale: string
        localizations: {
          data: []
        }
      }
    }
  }
}

export interface Submenu {
  id: number
  title: string
  links: LinkDto[]
}

export interface PropertieDTO {
  id: number
  attributes: {
    title: string
    comingSoon: boolean
    comingSoonLabel: string
    externalId: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string
    logo: MediaDTO
    media: MediaDTO
    link: LinkDto
    resortCity: {
      data: {
        attributes: {
          locale: string
          name: string
          properties: any[]
        }
      }
    }
    localizations: {
      data: []
    }
  }
}

export interface DestinationsAndResortsDto {
  id: boolean
  label: string
  properties: {
    data: PropertieDTO[]
  }
}
export interface Navbar {
  id: string
  attributes: {
    loginLabel: string
    createdAt?: string
    updatedAt?: string
    publishedAt: string
    locale: string
    benefitsLabel: string
    membershipLabel: string
    topAlertBanner: LinkDto
    contactUs: LinkDto
    telephone: Telephone
    home: LinkDto
    destinationsAndResorts: DestinationsAndResortsDto
    dashboard: LinkDto
    benefitsWeeks: Submenu
    benefitsPrograms: Submenu
    benefitsWallet: Submenu
    membershipMyInformation: Submenu
    bookings: LinkDto
    offers: LinkDto
    logo: MediaDTO
    logoMobile: MediaDTO
  }
}

export interface NavbarDto {
  data: Navbar
}
