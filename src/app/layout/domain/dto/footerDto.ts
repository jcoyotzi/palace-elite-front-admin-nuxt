export interface Url {
  url: string
}

export interface Formats {
  small: Url
  medium: Url
  large: Url
}

export interface FluffyAttributes {
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: null
  provider: string
  provider_metadata: null
}

export interface MediaData {
  id: number
  attributes: FluffyAttributes
}

export interface MediaMedia {
  data: MediaData
}

export interface AttributesMedia {
  id: number
  title: string
  altText: string
  media: MediaMedia
}

export interface PurpleAttributes {
  slug: string
  title: string
  locale: string
}

export interface PageData {
  id: number
  attributes: PurpleAttributes
}

export interface Page {
  data: PageData
}

export interface Link {
  id: number
  type: string
  label: string
  url: null
  openNewTab: boolean
  page: Page
}

export interface LogoAttributes {
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: null
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

export interface LogoData {
  id: number
  attributes: LogoAttributes
}

export interface LogoMedia {
  data: LogoData
}

export interface Logo {
  id: number
  title: string
  altText: string
  media: LogoMedia
}

export interface Attributes {
  comingSoon: boolean
  comingSoonLabel: string
  externalId: string
  locale: string
  title: string
  link: Link
  media: AttributesMedia
  logo: Logo
}

export interface PropertyData {
  id: number
  attributes: Attributes
}

export interface FooterDto {
  data: PropertyData[]
}
