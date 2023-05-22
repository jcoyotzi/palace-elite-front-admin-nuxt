import {PinActions} from '../enum/pinActions'
import {MembershipTable} from '~/src/app/common/domain/entities/membershipTable'

export interface PinModal {
  action: PinActions
  owner: MembershipTable
}
