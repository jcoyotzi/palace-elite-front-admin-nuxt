export interface ProductAccessDto {
  data: ProductAccessData
  errors: null
  warnings: null
}

export interface ProductAccessData {
  _COMPANY: number
  _APPLICATION: string
  _CONTRATO: string
  _PRODUCTOID: string
  _TIPO: string
  _NIGHTS: number
  _TOTAL_DISCOUNT: number
  _REQUIRED_OVERRIDE: boolean
  _MESSAGES: null
  _HEADER: Header[]
  _DETAILS: Detail[]
  _PRODUCTS: Product[]
  _CONTRACTS: any[]
  _AVAILABLE: number
  _EARNED: number
  _USED: number
  _RESERVED: number
  _PURCHASED: number
  _FECHA: Date
  _RMTYPE: string
  _HOTELID: string
}

export interface Detail {
  RECNUM: number
  COMPANY: number
  APPLICATION: string
  IDPRODUCTO: string
  PURCHASED: number
  EARNED: number
  USED: number
  RESERVED: number
  AVAILABLE: number
  UPDATE_DTE: Date
  TIPO: string
}

export interface Header {
  _RECNUM: number
  _COMPANY: number
  _APPLICATION: string
  _PURCHASED: number
  _EARNED: number
  _USED: number
  _RESERVED: number
  _AVAILABLE: number
  _UPDATE_DT: Date
  _TIPO: string
}

export interface Product {
  RECNUM: number
  IDPRODUCTO: string
  DESCRIPCION: string
  TIPO: string
  ESTATUS: string
  NOMBRE_CERT_ESP: string
  NOMBRE_CERT_ING: string
  NOMBRE_CERT_POR: string
  TIENE_COSTO: boolean
  INCLUYE_ULG: boolean
}
