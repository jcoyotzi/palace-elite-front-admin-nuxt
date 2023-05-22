export interface Small {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path?: any
  size: number
  width: number
  height: number
}

export interface Thumbnail {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path?: any
  size: number
  width: number
  height: number
}

export interface Formats {
  small: Small
  thumbnail: Thumbnail
}

export interface Attributes2 {
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
  previewUrl?: any
  provider: string
  provider_metadata?: any
  createdAt: Date
  updatedAt: Date
}

export interface Data {
  id: number
  attributes: Attributes2
}

export interface Media {
  data: Data
}

export interface Gallery {
  id: number
  title: string
  altText: string
  media: Media
}

export interface Attributes3 {
  title: string
  slug: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  locale: string
  route: string
}

export interface Data2 {
  id: number
  attributes: Attributes3
}

export interface Page {
  data: Data2
}

export interface UrlVirtualTour {
  id: number
  type: string
  openNewTab: boolean
  label: string
  url?: any
  page: Page
}

export interface AmenitiesIcon {
  id: number
  name: string
}

export interface Property {
  data?: any
}

export interface Localizations {
  data: any[]
}

export interface CategorieAttributesDTO {
  title: string
  maxNumberOfGuests: string
  sizeRoom: string
  amenitiesContentLeft: string
  amenitiesContentRight: string
  bookingTermsContentLeft: string
  bookingTermsContentRight: string
  code: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  locale: string
  isLockoff: boolean
  resume: string
  gallery: Gallery[]
  urlVirtualTour: UrlVirtualTour
  amenitiesIcons: AmenitiesIcon[]
  property: Property
  localizations: Localizations
}

export interface CategorieDTO {
  id: number
  attributes: CategorieAttributesDTO
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface Meta {
  pagination: Pagination
}

export interface GetCategoriesDto {
  data: CategorieDTO[]
  meta: Meta
}
