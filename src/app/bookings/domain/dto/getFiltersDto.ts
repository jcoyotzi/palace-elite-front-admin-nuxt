export interface Resort {
  hotel: string
  name: string
}

export interface Provition {
  id: number
  name: string
}

export default interface GetFiltersDto {
  hotels: Resort[]
  provisions: Provition[]
}
