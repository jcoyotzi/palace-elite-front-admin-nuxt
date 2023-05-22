import { MediaAttributes } from "./common/imageStrapi"

export interface Amenitie {
    id: number
    description: string
    icon: {
        id: number
        name: string
    }
}

export interface PEAmenitiesBanner {
    id: number
    __component: "blocks.amenity-banner",
    title: string
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
    amenities: Amenitie[]
}