import { LinkDto } from "~/src/app/layout/domain/dto/navbarDto"

export interface FluffyAttributes {
  title: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  route: string
}

export interface PageData {
  id: number
  attributes: FluffyAttributes
}

export interface Page {
  data: PageData
}

export interface Button {
  id: number
  type: string
  openNewTab: boolean
  label: string
  url: null
  page: Page
}

export interface Large {
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

export interface Formats {
  large: Large
  small: Large
  medium: Large
  thumbnail: Large
}
export interface PurpleAttributes {
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
  createdAt: string
  updatedAt: string
}
export interface MediaData {
  id: number
  attributes: PurpleAttributes
}

export interface Media {
  data: MediaData
}

export interface Countdown {
  id: number
  endDate: string
  hurryLabel: string
  daysLabel: string
  hoursLabel: string
  minutesLabel: string
  secondsLabel: string
  media: Media
}

export interface Localizations {
  data: any[]
}

export interface Block {
  id: number
  __component: string
  title: string
  content: string
  firstButton?: LinkDto
  secondButton?: LinkDto
  countdown: Countdown
  media?: any
}
export interface Hero {
  id: number
  title: string
  altText: string
  autoPlay: boolean
  size: string
  enableNotMemberBanner: boolean
  media: Media
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface DatumAttributes {
  title: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  route: string
  seoMetatags: null
  hero: Hero
  blocks: Block[]
  localizations: Localizations
}

export interface Meta {
  pagination: Pagination
}

export interface Datum {
  id: number
  attributes: DatumAttributes
}

export interface StrapiDashboardDto {
  data: Datum[]
  meta: Meta
}
