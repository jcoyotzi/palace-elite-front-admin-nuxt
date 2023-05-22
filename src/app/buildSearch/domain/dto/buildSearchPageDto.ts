import {BlockMedia, MediaData} from '~/src/app/contact/domain/dto/contactPageDto'

export interface BuildSearchBlock {
  id: number
  __component: string
  title: string
  size: string
  enableNotMemberBanner?: boolean
  media?: BlockMedia
}

interface BuildSearchDataAttr {
  [x: string]: any
  object: any
  title: string
  slug: string
  locale: string
  route: string
  hero: {
    title: string
    altText: string
    size: string
    enableNotMemberBanner: boolean
    media: {data: MediaData}
    mediaMobile?: {data: MediaData}
  }
  blocks: BuildSearchBlock[]
}

export default interface BuildSearchPageDto {
  data: {
    id: number
    attributes: BuildSearchDataAttr
  }[]
}
