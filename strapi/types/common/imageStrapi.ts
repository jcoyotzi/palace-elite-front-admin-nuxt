export interface Format {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path?: string | null,
    size: 480.71,
    width: 500,
    height: 369
  }

export interface MediaAttributes {
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: {
    small: Format
    medium: Format
    thumbnail: Format
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl?: string | null
  provider: string
  provider_metadata?: any
}
  
export interface ImageStrapi {
  id: number
  title: string
  subtitle?: string
  caption?: string
  link?: {
    data: {
      id: 11,
      attributes: {
        title: string
        slug: string
        locale: string,
        localizations: {
          data: [
            {
              id: number
              attributes: {
                title: string
                slug: string
                locale: string
              }
            }
          ]
        }
      }
    }
  }
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
  }
}