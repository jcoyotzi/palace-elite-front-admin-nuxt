import {LinkDto} from './navbarDto'

export interface Page {
  data: {
    id: number
    attributes: {
      title: string
      slug: string
      createdAt: Date
      updatedAt: Date
      publishedAt: Date
      locale: string
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
        createdAt: Date
        updatedAt: Date
        publishedAt: Date
        locale: string
      }
    }
  }
}

export interface Localizations {
  data: any[]
}

export interface MenuAttributes {
  loginLabel: string
  logoutLabel: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  locale: string
  primaryLinks: LinkDto[]
  secondaryLinks: LinkDto[]
  telephone: Telephone
  localizations: Localizations
}

export interface Menu {
  id: number
  attributes: MenuAttributes
}

export interface Meta {}

export interface MenuDto {
  data: Menu
  meta: Meta
}
