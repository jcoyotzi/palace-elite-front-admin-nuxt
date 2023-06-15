export interface Category extends DataStrapi {
  order?: number
  title: string
  bpg: string
  hotelDescription?: string
  maxNumberOfGuests?: string
  rmType: string
  resume?: string
  ocupacion_max: string
  // ocupacion_min: string
  estancias_min: string
  validity: number
  roomTypeDescription: string
  roomTypeId: string
  discountRate: number
  dateTo?: string
  tooltip: string
  code?: string
  commercialCode?: string
  dateToText?: string
  property?: string
  description?: string
  hotel: string
  defaultOccupancy: number
  maxOccupancy: number
  totalAccess: number
}

export interface Categorie extends DataStrapi {
  rmType: string
  hotel: string
  defaultOccupancy: number
  maxOccupancy: number
  recnum: number
  idTypeRoom: string
  operaId: string
}

interface DataStrapi {
  updatedAt: string
  publishedAt: string
  createdAt: string
}
