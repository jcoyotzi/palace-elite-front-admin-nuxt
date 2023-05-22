import {StrapiBlock} from '~/strapi/strapi-blocks.service'

interface MediaData {
  id: number
  attributes: {
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    mime: string
    size: number
    url: string
  }
}

export interface Link {
  attributes: {
    buttonLabel: string
    content: string
    title: string
    image: {
      data: MediaData
    }
  }
}

export interface DirectLinks {
  id: number
  items: {
    data: Link[]
  }
}
export interface OfferMeanDto {
  attributes: {
    content: string
    title: string
  }
}
export interface InfoBannerDto {
  id: number
  title: string
  items: {
    data: OfferMeanDto[]
  }
}
interface OfferDataAttr {
  title: string
  slug: string
  locale: string
  route: string
  blocks: StrapiBlock[]
  hero: any
}

export interface CardOffer {
  caption: string
  title: string
  content: string
  mediaOnLeft: boolean
  isPrimary: boolean
  img: {
    url: string
    title: string
    alt: string
  }
}

export interface OfferData {
  id: number
  attributes: OfferDataAttr
}

export default interface OfferPageDto {
  data: OfferData[]
}
