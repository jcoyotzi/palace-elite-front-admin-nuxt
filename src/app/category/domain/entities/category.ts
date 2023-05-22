import {AttributesMedia} from '../../../../app/property/domain/dto/propertyDto'

export interface CategoryEntity {
  area: string
  code: string
  images: AttributesMedia[]
  items: ItemContent[]
  lastRooms?: number
  max: number
  title: string
  tour?: string
  sizeRoom: string
  isLockoff: boolean
}

export interface ItemContent {
  appendIcons: string[]
  content: {
    contentLeft: string
    contentRight: string
  }
  header: string
}
