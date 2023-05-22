import {CardsCreditEntity} from './cardsCreditEntity'
export default interface PayloadUpdateCardCredit {
  InfoCreditCard: CardsCreditEntity[]
  recNum: number
  application: string
  company: number
  lang: string
  monthPaym: string
  isNational: boolean
  terms: boolean
}
