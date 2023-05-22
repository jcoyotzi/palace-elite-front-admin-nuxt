import dayjs from 'dayjs'
import {MembershipPaymentsDto} from '../dto/membershipPaymentsDto'
import {usdFormatter} from '~/src/app/common/mapper/moneyFormatters'

export class MembershipPaymentsAdapter {
  static mapCard(dto: MembershipPaymentsDto) {
    const object = dto.data
    if (!object) return null
    return this.mapPayload(object)
  }

  static mapPayload(payload: any) {
    const {dueDate, completedPayments, amount, totalPayments} = payload
    return {
      subtitle: `Due Date: ${
        dueDate ? dayjs(dueDate).format('MMM DD, YYYY') : '-'
      } | Payment ${completedPayments} of ${totalPayments}`,
      amount: `${usdFormatter.format(amount)} USD`
    }
  }
}
