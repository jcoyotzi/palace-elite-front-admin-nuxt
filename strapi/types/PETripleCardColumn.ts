import { Button } from "./common/button"
import { MediaAttributes } from "./common/imageStrapi"

export interface Card {
  id: number
  title: string
  description: string
  image: {
    id: number
    title?: string | null,
    altText: string
    media: {
      data: {
        id: number
        attributes: MediaAttributes
      }
    }
  },
}

export interface PETripleCardColumn {
  id: number
  __component: 'blocks.triple-card-column'
  title: string
  rightButton: Button
  firstCardColumn: Card
  secondCardColumn: Card
  thirdCardColumn: Card
}
