import {UserInfoMember} from '../entities/userInfoMember'
import {Response} from '~/src/app/network/common/domain/entity/response'
import type { IsTransferableBonusDTO } from '~/src/app/user/domain/dto/IsTransferableBonusDTO'
import type { IsTransferableResponse } from '~/src/app/user/domain/entities/isTransferableBonus'
import type { IsIHRResponse, IsIHRPayload } from '~/src/app/user/domain/entities/isIHR'

export interface UserMemberRepository {
  withAffiliationNumber(affiliationNumber: string): Promise<Response<UserInfoMember>>
  isTransferableBonus(dto: IsTransferableBonusDTO): Promise<Response<IsTransferableResponse>>
  getIsIHR(paylaod: IsIHRPayload): Promise<Response<IsIHRResponse>>
}
