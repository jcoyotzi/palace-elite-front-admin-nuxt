import {ContainerModule, interfaces} from 'inversify'
import paymentTypes from '../common/types/paymentTypes'
import GetCardCreditUseCase from './application/getCardCreditUseCase'
import RemoveCardCreditUseCase from './application/removeCardCreditUseCase'
import AddCardCreditUseCase from './application/addCardCreditUseCase'
import UpdateCardCreditUseCase from './application/updateCardCreditUseCase'
import {PaymentsRepository} from './domain/repositories/paymentsRepository'
import PaymentsServiceRepository from './domain/repositories/paymentsServiceRepository'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<PaymentsRepository>(paymentTypes.paymentsRepository).to(PaymentsServiceRepository)
  bind<GetCardCreditUseCase>(paymentTypes.getCardCreditUseCase).to(GetCardCreditUseCase)
  bind<RemoveCardCreditUseCase>(paymentTypes.removeCardCreditUseCase).to(RemoveCardCreditUseCase)
  bind<AddCardCreditUseCase>(paymentTypes.addCardCreditUseCase).to(AddCardCreditUseCase)
  bind<UpdateCardCreditUseCase>(paymentTypes.updateCardCreditUseCase).to(UpdateCardCreditUseCase)
})
