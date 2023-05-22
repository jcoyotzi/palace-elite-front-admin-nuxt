import {injectable, inject} from 'inversify'
import httpTypes from '../../../../../src/app/common/types/httpTypes'
import {PaymentConfirmationContentEntity} from '../entities/paymentConfirmationContentEntity'
import PaymentConfirmationContentMaopper from '../mapper/PaymentConfirmationContentMapper'
import {PaymentConfirmationContentDto} from '../dto/paymentConfirmationContentDto'
import {PaymentConfirmationContentRepository} from './paymentConfirmationContentRepository'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
import { currentLocale } from '~/src/ui/utils/currentLocaleByCookie'

@injectable()
export default class PaymentConfirmationContentServiceRepository
  implements PaymentConfirmationContentRepository
{
  constructor(@inject(httpTypes.strapiHttpApi) private readonly httpJs: HttpApi) {}

  async getPaymentConfirmationContent(): Promise<PaymentConfirmationContentEntity> {
    const {data} = await this.httpJs.get(`/api/confirmation-card?populate=deep&locale=${currentLocale()}`)
    return PaymentConfirmationContentMaopper.transform(
      // @ts-ignore
      data?.data?.attributes as PaymentConfirmationContentDto
    )
  }
}
