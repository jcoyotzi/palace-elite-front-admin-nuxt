import PaymentMembershipStatus from '../entities/paymentMambershipStatus'
import {PayloadMembershipPayment} from '../entities/payloadMembershipEntity'
import CollectionType from '~/src/app/paylink/domain/entities/collectionType'
import {Response} from '~/src/app/common/domain/entities/response'
export interface PaymentMembershipRepository {
  addPaymentMembership(payload: PayloadMembershipPayment): Promise<PaymentMembershipStatus>
  getTermsAndConditions(): Promise<Response<CollectionType[]>>
}
