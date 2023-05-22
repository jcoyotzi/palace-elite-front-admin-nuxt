import {PropertyData} from '~/src/app/property/domain/dto/propertyDto'

export interface PropertiesDto {
  data: PropertyData[]
}

export interface IProperty {
  id: number
  title: string
  location?: string
  image: {
    mime: string
    url: string
    alt: string
    title: string
    fromats?: {
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
  }
}
