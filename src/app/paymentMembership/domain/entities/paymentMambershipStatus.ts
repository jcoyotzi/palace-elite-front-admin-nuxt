import {PAYMENT_STATUS} from '../enums/paymentStatus'
export default interface PaymentMembershipStatus {
  status?: PAYMENT_STATUS
  message?: string | null
}
