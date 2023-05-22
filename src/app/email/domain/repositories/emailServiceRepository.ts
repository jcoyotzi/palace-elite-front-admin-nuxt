import {injectable, inject} from 'inversify'
import httpTypes from '../../../common/types/httpTypes'
import {Emailentity} from '../entities/emailEntity'
import {EmailRepository} from './emailRepository'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
import {Response} from '~/src/app/network/common/domain/entity/response'

@injectable()
export default class EmailServiceRepository implements EmailRepository {
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly httpJs: HttpApi) {}

  async postEmail(params: Emailentity): Promise<Response<any>> {
    const response = await this.httpJs.post('/membership/send-mail', {
      data: {
        recipientsMail: params.recipientsMail,
        subject: params.recipientsMail,
        message: params.message,
        type: params.type,
        cco: params.cco
      }
    })
    return response
  }
}
