import {PayDetail} from './cardPayment'

export interface PayNow {
  payload: PayDetail
  roomIndex: number
}
