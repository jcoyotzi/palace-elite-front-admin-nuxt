import { NetworkMessage } from '../enums/networkMessage'
import StatusCode from './statusCode'

export interface Response<T> {
  data?: T
  errors?: NetworkMessage[]
  warnings?: NetworkMessage[]
  statusCode?: StatusCode
  headers?: any
}
