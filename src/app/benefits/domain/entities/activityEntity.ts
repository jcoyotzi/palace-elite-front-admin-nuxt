interface ImageStrapi {
  mime: string
  url: string
  alt: string
  title: string
  formats: {
    small: {
      url: string
    }
    medium: {
      url: string
    }
    large: {
      url: string
    }
  }
  alternativeText: string
  caption: string
}

interface ActivityImage {
  name?: string
  alternativeText?: string
  caption?: string
  width?: number
  height?: number
  formats?: {
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
  hash?: string
  ext?: string
  mime?: string
  size?: number
  url?: string
  previewUrl?: null
  provider?: string
  provider_metadata?: null
  createdAt?: string
  updatedAt?: string
}

export default interface ActivityEntity {
  id?: string
  image: ActivityImage
  title: string
  details?: string
  seeDetailsLabel?: string
  price: number
  quantity: number
  unit?: string
  category: string
  minPax?: number
  maxPax?: number
  paxLabel?: string
  priceLabel?: string
}
export interface activitiesByCategory {
  [key: string]: ActivityEntity[]
}
