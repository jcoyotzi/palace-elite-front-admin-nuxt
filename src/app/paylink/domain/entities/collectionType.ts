export default interface CollectionType {
  id: number
  attributes: CollectionTypeAttributes
}

export interface CollectionTypeAttributes {
  code: string
  content: string
  createdAt: string
  local: string
  publishedAt: string
  title: string
  updatedAt: string
}
