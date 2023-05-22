import {injectable, inject} from 'inversify'
import {PayloadMembershipPayment} from '../entities/payloadMembershipEntity'
import {PaymentMembershipMapper} from '../mapper/paymentMembershipMapper'
import PaymentMembershipStatus from '../entities/paymentMambershipStatus'
import MembershipPaymentResponseDto from '../entities/membershipPaymentResponseEntity'
import {PaymentMembershipRepository} from './paymentMembershipRepository'
import httpTypes from '~/src/app/common/types/httpTypes'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
import CollectionType from '~/src/app/paylink/domain/entities/collectionType'
import {Response} from '~/src/app/common/domain/entities/response'
import { currentLocale } from '~/src/ui/utils/currentLocaleByCookie'


@injectable()
export default class PaymentMembershipServiceRepository implements PaymentMembershipRepository {
  constructor(
    @inject(httpTypes.intelligenceXHttpApi) private readonly http: HttpApi,
    @inject(httpTypes.strapiHttpApi) private readonly httpSpi: HttpApi
  ) {}

  async addPaymentMembership(payload: PayloadMembershipPayment): Promise<PaymentMembershipStatus> {
    try {
      const response = await this.http.post(
        `/payments/payment-fee-call-center/application/${payload.affiliationId}`,
        payload.payload
      )
      return PaymentMembershipMapper.transform(response.data as MembershipPaymentResponseDto)
    } catch (error) {
      throw error
    }
  }

  getTermsAndConditions(): Promise<Response<CollectionType[]>> {
    const query = [
      `filters[code][$in][0]=membership-payment-terms-conditions`,
      `filters[code][$in][1]=membership-privacy-notices`,
      `locale=${currentLocale()}`
    ].join('&');

    return this.httpSpi.get(`/api/terms-and-conditions?${query}`)
  }
}
