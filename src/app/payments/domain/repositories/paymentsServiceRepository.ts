import {injectable, inject} from 'inversify'
import Axios, {AxiosInstance} from 'axios'
import {CardsCreditEntity} from '../entities/cardsCreditEntity'
import PayloadUpdateCardCredit from '../entities/payloadUpdateCardCredit'
import {PaymentsRepository} from './paymentsRepository'
import {Pagination} from '~/src/app/common/domain/entities/pagination'
import {Response} from '~/src/app/common/domain/entities/response'
import httpTypes from '~/src/app/common/types/httpTypes'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
import {Payload} from '~/src/app/common/domain/entities/payload'

@injectable()
export default class PaymentServiceRepository implements PaymentsRepository {
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly http: HttpApi) {}

  getCardCredits(membership: string, isNational: boolean): Promise<Response<CardsCreditEntity>> {
    return this.http.get(
      `/membership/credit-card/application/${membership}?isNational=${isNational}`
    )
  }

  // removeCardCredit(card: CardsCreditEntity): Promise<Response<CardsCreditEntity>> {
  //   //TODO: cambiar endpoint correcto al que entregue back
  //   return this.httpJs.get(`/remove-card-credit/${card.}`);
  // }

  // addCardCredit(card: CardsCreditEntity): Promise<Response<CardsCreditEntity>> {
  //   //TODO: cambiar endpoint correcto al que entregue back
  //   return this.httpJs.post('/add-card-credit', { data: card });
  // }

  updateCardCredit(
    payload: Payload<PayloadUpdateCardCredit>
  ): Promise<Response<CardsCreditEntity>> {
    return this.http.post('/membership/credit-card', payload)
  }
}
