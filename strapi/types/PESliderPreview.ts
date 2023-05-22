import { MediaAttributes } from "./common/imageStrapi"

export interface PESliderPreview {
  id: number
  __component: 'blocks.image-slider'
  images: {
    id: number
    title?: string | null
    altText: string
    media: {
      data: {
        id: number
        attributes: MediaAttributes
      }
    }
  }[]
}
