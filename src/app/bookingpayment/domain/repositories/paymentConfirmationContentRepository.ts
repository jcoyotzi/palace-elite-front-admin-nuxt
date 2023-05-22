import { PaymentConfirmationContentEntity } from '../entities/paymentConfirmationContentEntity'

export interface PaymentConfirmationContentRepository {
  getPaymentConfirmationContent(): Promise<PaymentConfirmationContentEntity>
}
