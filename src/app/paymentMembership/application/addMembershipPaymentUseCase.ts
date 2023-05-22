import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import membershipPaymentTypes from '../../common/types/membershipPaymentTypes'
import {PayloadMembershipPayment} from '../domain/entities/payloadMembershipEntity'
import {PaymentMembershipRepository} from '../domain/repositories/paymentMembershipRepository'
import PaymentMembershipStatus from '../domain/entities/paymentMambershipStatus'
@injectable()
export default class AddPaymentMembershipUseCase
  implements UseCase<PayloadMembershipPayment, PaymentMembershipStatus>
{
  constructor(
    @inject(membershipPaymentTypes.membershipPaymentsRepository)
    private readonly membershipPaymentsRepository: PaymentMembershipRepository
  ) {}

  async run(payload: PayloadMembershipPayment): Promise<PaymentMembershipStatus> {
    return await this.membershipPaymentsRepository.addPaymentMembership(payload)
  }
}
