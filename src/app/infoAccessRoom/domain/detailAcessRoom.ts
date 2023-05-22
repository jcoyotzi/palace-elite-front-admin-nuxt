import {Agrupador} from './data/agrupador'
import {Forzar} from './data/forzar'

export interface Detailacessroom {
  DESCRIPTION_RMTYPE: null
  RM_TYPE: string
  AGRUPADOR: Agrupador
  AVAILABLEBYGROUP: number
  FORZAR: Forzar
  TOTAL_ACCESS: number
  RECNUM: number
  COMPANY: number
  APPLICATION: string
  IDTYPEROOM: number
  YEARID: number
  PURCHASED: number
  USED: number
  RESERVED: number
  AVAILABLE: number
  DATEFROM: string
  DATETO: string
  TYPEROOMS: string
  ATYPEROOMS: null
  ACTION: string
}
