import StatusCode from '@/src/app/common/domain/entities/statusCode'
import {NetworkMessage} from '@/src/app/common/domain/enums/networkMessage'

export interface Response<T> {
  data?: T
  errors?: NetworkMessage[]
  warnings?: NetworkMessage[]
  statusCode?: StatusCode
  headers?: any
}
