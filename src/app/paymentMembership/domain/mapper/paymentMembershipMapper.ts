import MembershipPaymentResponseDto from '../entities/membershipPaymentResponseEntity'
import PaymentMembershipStatus from '../entities/paymentMambershipStatus'
import {PAYMENT_STATUS} from '../enums/paymentStatus'

export class PaymentMembershipMapper {
  public static transform(paymentResponse: MembershipPaymentResponseDto): PaymentMembershipStatus {
    return {
      message: paymentResponse.data.MessageList._Messages[0]._TextMessage,
      status: paymentResponse.data.Member === null ? PAYMENT_STATUS.FAIL : PAYMENT_STATUS.SUCCESS
    }
  }
}
