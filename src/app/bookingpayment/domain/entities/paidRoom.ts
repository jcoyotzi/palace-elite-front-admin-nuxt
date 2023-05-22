import {PayDetail} from './cardPayment'
import {PEPayment} from './PEPayment'

export interface PaidRoomData extends PEPayment {
  cardSelected?: PayDetail['cardSelected']
  cardCreditAmount?: number
  universalCreditAmount?: number
}
