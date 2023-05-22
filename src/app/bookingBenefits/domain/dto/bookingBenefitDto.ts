export interface BookingBenefitResponseDto {
  data: BookingBenefitDto[]
  meta: Meta
}

export interface BookingBenefitDto {
  id: number
  attributes: PurpleAttributes
}

export interface PurpleAttributes {
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  locale: string
  benefits: Benefits
}

export interface Benefits {
  data: BenefitsDatum[]
}

export interface BenefitsDatum {
  id: number
  attributes: StrapiBeneffitsFluffyAttributes
}

export interface StrapiBeneffitsFluffyAttributes {
  caption?: string
  createdAt: Date
  description: string
  externalId: string
  locale: string
  media: AttributesMedia
  moreDetailsContent?: string
  moreDetailsLabel: string
  publishedAt: Date
  recommended: boolean
  title: string
  updatedAt: Date
  maxPax?: number
  dependsOnOcupation?: boolean
}

export interface AttributesMedia {
  id: number
  title: string
  altText: string
  media: MediaMedia
}

export interface MediaMedia {
  data: Data
}

export interface Data {
  id: number
  attributes: DataAttributes
}

export interface DataAttributes {
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
  createdAt: Date
  updatedAt: Date
}

export interface Formats {
  thumbnail: Thumbnail
}

export interface Thumbnail {
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

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
