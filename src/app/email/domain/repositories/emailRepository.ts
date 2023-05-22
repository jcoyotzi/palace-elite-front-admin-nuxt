import {Emailentity} from '../entities/emailEntity'
import {Response} from '~/src/app/network/common/domain/entity/response'

export interface EmailRepository {
  postEmail(params: Emailentity): Promise<Response<any>>
}
