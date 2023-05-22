interface Localizations {
  data: []
}

interface Testimonial {
  authorName: string
  authorOrigin: string
  caption: string
  testimonial: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  localizations: Localizations
}

interface PurpleAttributes {
  title: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
}
interface PageData {
  id: number
  attributes: PurpleAttributes
}
interface Page {
  data: PageData
}
interface Button {
  id: number
  type: string
  openNewTab: boolean
  label: string
  url: null
  page: Page
}

interface Large {
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

interface Formats {
  large?: Large
  small: Large
  medium: Large
  thumbnail: Large
}

interface FluffyAttributes {
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

interface MediaData {
  id: number
  attributes: FluffyAttributes
}

interface MediaMedia {
  data: MediaData
}

interface BlockMedia {
  id: number
  title: string
  altText: string
  media: MediaMedia
}

interface Block {
  id: number
  __component: string
  title?: string
  size?: string
  enableNotMemberBanner?: boolean
  media?: BlockMedia
  content?: string
  description?: string
  firstButton?: Button
  secondButton?: Button
  items?: Testimonial[]
}

interface StrapiPreferentialAttributes {
  title: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  seoMetatags: null
  blocks: Block[]
  localizations: Localizations
}

interface Datum {
  id: number
  attributes: StrapiPreferentialAttributes
}

export interface StrapiPreferentialDto {
  data: Datum[]
}
