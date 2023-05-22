import StatusCode from '@/src/app/common/domain/entities/statusCode'
import {NetworkMessage} from '@/src/app/common/domain/enums/networkMessage'

export interface HttpResponse<T> {
  data?: T
  statusCode: StatusCode
  errors?: NetworkMessage[]
}
