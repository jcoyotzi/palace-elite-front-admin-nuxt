export interface MediaData {
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

export interface BlockMedia {
  id: number
  title: string
  altText: string
  media: {data: MediaData}
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

export interface OfferCard {
  title: string
  description: string
  link: {
    id: number
    openNewTab: false,
    label: string
    url: string | null
  },
  media: BlockMedia
}

export interface OfferCardGrid {
  id: number
  title: string
  firstOfferCard: OfferCard
  secondOfferCard: OfferCard | null
}
export interface ContactMeanDto {
  id: number
  description: string
  title: string
}
export interface InfoBannerDto {
  id: number
  title: string
  departments: ContactMeanDto[]
}

export interface ContactPageBlock {
  id: number
  __component: string
  title: string
  size: string
  enableNotMemberBanner: boolean
  media?: BlockMedia
}

interface ContactDataAttr {
  title: string
  slug: string
  locale: string
  route: string
  blocks: ContactPageBlock[]
  hero: {
    id: number
    title: string
    altText: string
    autoPlay: boolean
    size: string
    enableNotMemberBanner: boolean
    media: {data: MediaData},
    mediaMobile: {data: MediaData},
    countdown: any
}
}

export interface ContactData {
  id: number
  attributes: ContactDataAttr
}

export default interface ContactPageDto {
  data: ContactData[]
}
