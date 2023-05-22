interface Media {
  id: string
  attributes: {
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    formats: {
      large: {
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
      small: {
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
      medium: {
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

export interface Hero {
  id: number
  title: string
  altText: string
  autoPlay: boolean
  size: string
  enableNotMemberBanner: false
  media: {
    data: Media
  }
}

export interface Block {
  id: number
  __component: string
  title: string
  content: string
  media: {
    id: number
    title: string
    altText: string
    media?: {
      data: Media
    }
  }
}

interface StrapiResortCreditAttributes {
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
}

interface Datum {
  id: number
  attributes: StrapiResortCreditAttributes
}

export interface StrapiResortCreditDto {
  data: Datum[]
}

export default StrapiResortCreditDto
