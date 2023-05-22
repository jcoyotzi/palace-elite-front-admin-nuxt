import { MediaAttributes } from "./common/imageStrapi"

interface Slide {
        id: 1
        attributes: {
          title: string
          locale: string
          media: {
            id: number
            title: string
            altText: string
            media: {
              data: {
                id: number
                attributes: MediaAttributes
              }
            }
          }
          localizations: {
            data: []
          }
          link: null
        }
      }

export interface PESmallSliderBanner {
  id: number
  __component: 'blocks.carousel'
  title: string
  description: string
  items: {
    data: Slide[]
  }
  button: null
}
