export interface TermsAndConditions {
  code: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  locale: string
}

export interface Data {
  id: number
  attributes: TermsAndConditions
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

export interface GetTermsAndConditionsDto {
  data: Data[]
  meta: Meta
}
