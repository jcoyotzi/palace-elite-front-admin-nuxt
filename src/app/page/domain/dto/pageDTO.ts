export interface SEOMetatags {
  id: number
  title: string
  description: string
  keywords: string
  facebookOgTitle: string
  facebookOgDescription: string
  facebookOgImage: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
}

export interface Localizations {
  data: any[]
}

export interface DatumAttributes {
  title: string
  slug: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  locale: string
  seoMetatags: SEOMetatags | null
  blocks: any[]
  localizations: Localizations
}

export default interface PageDTO {
  id: number
  attributes: DatumAttributes
}
