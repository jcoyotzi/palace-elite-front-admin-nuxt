import { TermsAndConditions } from "~/src/app/bookings/domain/dto/getTermsAndConditionsDto"

export interface ModalAndContent extends TermsAndConditions {
  image: any
  video: any
}

export interface Data {
  id: number
  attributes: ModalAndContent
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface Meta {
  pagination: Pagination
}

export interface GetModalAndContentDto {
  data: Data[]
  meta: Meta
}

export interface ModalContent {
  code: string
  title: string | null
  content: string | null
  locale: string
  image: any
  video: any
}