import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import {PaymentMembershipRepository} from '../domain/repositories/paymentMembershipRepository'
import membershipPaymentTypes from '../../common/types/membershipPaymentTypes'
import CollectionType from '../domain/entities/collectionType'
import { PaymentMembershipTermsMapper } from '../domain/mapper/paymentMembershipTermsMapper'
import {Response} from '~/src/app/common/domain/entities/response'

@injectable()
export default class GetTermsMembershipPaymentUseCase implements UseCase<null, Response<CollectionType[]>> {
  constructor(
    @inject(membershipPaymentTypes.membershipPaymentsRepository)
    private readonly paymentMembershipRepository: PaymentMembershipRepository
  ) {}

  async run(): Promise<Response<CollectionType[]>> {
    const res = await this.paymentMembershipRepository.getTermsAndConditions()
    // @ts-ignore
    return PaymentMembershipTermsMapper.transform(res.data.data)
  }
}
