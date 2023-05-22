export interface PropertyAllowed {
  _hotel: string
  _operaId: string
}

interface PropertyAccessData {
  Hoteles: PropertyAllowed[]
  AccessBaglioni?: boolean
}

export interface PropertyAccessDto {
  data: PropertyAccessData
}
