import {Store, Pinia} from 'pinia-class-component'
import {lazyInject} from '../../container'
import membershipPaymentTypes from '~/src/app/common/types/membershipPaymentTypes'
import AddPaymentMembershipUseCase from '~/src/app/paymentMembership/application/addMembershipPaymentUseCase'
import {PayloadMembershipPayment} from '~/src/app/paymentMembership/domain/entities/payloadMembershipEntity'
import {ParamsAmountPromiseEntity} from '~/src/app/paymentMembership/domain/entities/paramsAmountPromiseEntity'
import GetAmountPromiseUseCase from '~/src/app/paymentMembership/application/getAmountPromiseUseCase'
import {PAYMENT_STATUS} from '~/src/app/paymentMembership/domain/enums/paymentStatus'
import PaymentMembershipStatus from '~/src/app/paymentMembership/domain/entities/paymentMambershipStatus'
import {PaymentOptions} from '~/src/app/paymentMembership/domain/enums/paymentOptions'
import {CardPaymentEntity} from '~/src/app/paymentMembership/domain/entities/cardPaymentEntity'
import dashboardTypes from '~/src/app/common/types/dashboardTypes'
import UseCase from '~/src/app/common/application/UseCase'
import {Response} from '~/src/app/network/common/domain/entity/response'
import { MembershipPaymentsPayload } from '~/src/app/dashboard/domain/dto/membershipPaymentsPayload'
import { MembershipPaymentsDto } from '~/src/app/dashboard/domain/dto/membershipPaymentsDto'

@Store({
  name: 'membershipPaymentStore'
})
export class MembershipPaymentStore extends Pinia {
  @lazyInject(membershipPaymentTypes.addMembershipPaymentUseCase)
  private readonly addPaymentMembershipUseCase!: AddPaymentMembershipUseCase

  @lazyInject(membershipPaymentTypes.getTermsMembershipPaymentUseCase)
  private readonly getTermsAndConditionUseCase!: any

  @lazyInject(membershipPaymentTypes.getAmountPromiseUseCase)
  private readonly getAmountPromiseUseCase!: GetAmountPromiseUseCase

  @lazyInject(dashboardTypes.getMembershipPaymentsUseCase)
  private readonly getMembershipPayments!: UseCase<
    MembershipPaymentsPayload,
    Response<MembershipPaymentsDto>
  >

  // public addPaymentMembershipUseCase = container.get<AddPaymentMembershipUseCase>(membershipPaymentTypes.addMembershipPaymentUseCase)

  addPaymentResponse: PaymentMembershipStatus = {}

  amountPromise: number | null = null

  monthlyFee = null

  lateFee = null

  paymentSelectedMethod: PaymentOptions | null = null

  isNewCardValid: boolean = false

  isStoredSelectedCardValid: boolean = false

  newCard: CardPaymentEntity = {}

  storedCard: CardPaymentEntity = {}

  termsAndConditions: any | null= null

  privacyNotices: any | null= null

  membershipPayments: any | null = null

  saveNewCard(card: CardPaymentEntity) {
    this.newCard = card
  }

  useStoredCard(card: CardPaymentEntity) {
    this.storedCard = card
  }

  clearNewCard() {
    this.newCard = {}
  }

  setValidCardForm(value: boolean) {
    this.isNewCardValid = value
  }

  setStoredCardValid(value: boolean) {
    this.isStoredSelectedCardValid = value
  }

  async addPaymet(payload: PayloadMembershipPayment) {
    try {
      const response = await this.addPaymentMembershipUseCase.run(payload)
      this.addPaymentResponse = response
    } catch (error) {
      this.addPaymentResponse = {
        message: 'An error has occurred',
        status: PAYMENT_STATUS.FAIL
      }
    }
  }

  async getAmountPromise(params: ParamsAmountPromiseEntity) {
    try {
      const response = await this.getAmountPromiseUseCase.run(params)
      this.amountPromise = response
    } catch (error) {}
  }

  async getTermsAndCoditions(){
    try {
      const data = await this.getTermsAndConditionUseCase.run() || null
      if(!data) return
      const {terms, privacy} = data
      this.termsAndConditions = terms
      this.privacyNotices = privacy
    } catch (error) {

    }
  }

  public async fetchMembershipPaymentsData(payload: MembershipPaymentsPayload) {
    try {
      const {data}: any = await this.getMembershipPayments.run(payload)
      if (data) this.membershipPayments = data.data
    } catch (e: any) {
      console.error(e)
    }
  }

  get membershipPaymentsData() {
    return this.membershipPayments
  }
}
