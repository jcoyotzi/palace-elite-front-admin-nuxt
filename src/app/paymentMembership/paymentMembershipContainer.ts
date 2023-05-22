import {ContainerModule, interfaces} from 'inversify'
import membershipPaymentTypes from '../common/types/membershipPaymentTypes'
import UseCase from '../common/application/UseCase'
import PaymentMembershipServiceRepository from './domain/repositories/paymentMembershipServiceRepository'
import {PaymentMembershipRepository} from './domain/repositories/paymentMembershipRepository'
import AddMembershipPaymentUseCase from './application/addMembershipPaymentUseCase'
import GetAmountPromiseUseCase from './application/getAmountPromiseUseCase'
import {AmountPromiseRepository} from './domain/repositories/amountPromiseRepository'
import AmountPromiseRepositoryService from './domain/repositories/amountPromiseServiceRepository'
import {ParamsAmountPromiseEntity} from './domain/entities/paramsAmountPromiseEntity'
import GetTermsMembershipPaymentUseCase from './application/getTermsAndConditionsUseCase'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<PaymentMembershipRepository>(membershipPaymentTypes.membershipPaymentsRepository).to(
    PaymentMembershipServiceRepository
  )
  bind<AddMembershipPaymentUseCase>(membershipPaymentTypes.addMembershipPaymentUseCase).to(
    AddMembershipPaymentUseCase
  )
  bind<AmountPromiseRepository>(membershipPaymentTypes.amountPromiseRepository).to(
    AmountPromiseRepositoryService
  )
  bind<UseCase<ParamsAmountPromiseEntity, number>>(
    membershipPaymentTypes.getAmountPromiseUseCase
  ).to(GetAmountPromiseUseCase)

  bind<GetTermsMembershipPaymentUseCase>(membershipPaymentTypes.getTermsMembershipPaymentUseCase).to(
    GetTermsMembershipPaymentUseCase
  )
})
