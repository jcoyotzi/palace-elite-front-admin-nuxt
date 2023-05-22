import {Availability} from './availability'
import {AvailableDate} from './availableDate'

export interface RoomInfoAvailability {
  _available: boolean
  _stopSell: boolean
  _no_dep: boolean
  _no_arv: boolean
  _hotel: string
  _rmtype: string
  _arvdate: Date
  _departdate: Date
  _bed: string
  _adults: number
  _childs: number
  _kids: number
  _contract: string
  _agency: string
  _isNational: boolean
  _availability: Availability[]
  _reason: string
  _availableDate: AvailableDate
}
