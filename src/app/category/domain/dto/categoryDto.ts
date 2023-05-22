import {MediaData} from '../../../../app/property/domain/dto/propertyDto'

export interface StrapiPagination {
  page: number
  pageCount: number
  pageSize: number
  total: number
}

export interface CategoryStrapiMeta{
  pagination: StrapiPagination
}

export interface CategoryDto {
  data: CategoryData[],
  meta: CategoryStrapiMeta
}

export interface CategoryData {
  id: number
  attributes: DatumAttributes
}

export interface DatumAttributes {
  title: string
  maxNumberOfGuests: string
  sizeRoom: string
  amenitiesContentLeft: string
  amenitiesContentRight: string
  bookingTermsContentLeft: string
  bookingTermsContentRight: string
  code: string
  locale: string
  urlVirtualTour: URLVirtualTour
  gallery: Gallery[]
  amenitiesIcons: AmenitiesIcon[]
  isLockoff: boolean
}

export interface Gallery {
  id: number
  title: string
  altText: string
  media: Media
}

export interface AmenitiesIcon {
  id: number
  name: string
}

export interface Media {
  data: MediaData
}

export interface Formats {}

export interface URLVirtualTour {
  id: number
  type: string
  label: null
  url: string
  openNewTab: boolean
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
