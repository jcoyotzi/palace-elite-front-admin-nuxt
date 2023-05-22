import {inject, injectable} from 'inversify'
import {UserInfoMember} from '../entities/userInfoMember'
import {Response} from '../../../network/common/domain/entity/response'
import httpTypes from '../../../common/types/httpTypes'
import {HttpApi} from '../../../network/common/domain/entity/httpApi'
import {UserMemberRepository} from '~/src/app/user/domain/repositories/userMemberRepository'
import {IsTransferableBonusDTO} from '~/src/app/user/domain/dto/IsTransferableBonusDTO'
import type {IsIHRPayload, IsIHRResponse} from '~/src/app/user/domain/entities/isIHR'

@injectable()
export class UserMemberServiceRepository implements UserMemberRepository {
  constructor(
    @inject(httpTypes.intelligenceXHttpApi) private readonly http: HttpApi,
    @inject(httpTypes.apiUrl) private readonly httpServerless: HttpApi
  ) {}

  withAffiliationNumber(affiliationNumber: string): Promise<Response<UserInfoMember>> {
    return this.http.get(`/membership/current-info-user-member/application/${affiliationNumber}`)
  }

  isTransferableBonus(dto: IsTransferableBonusDTO): Promise<Response<any>> {
    return this.httpServerless.get(
      `/membership/api/v1/transferablebonus?arrivalDate=${dto.arrivalDate}&departDate=${dto.departDate}&hotel=${dto.hotel}`
    )
  }

  getIsIHR({hotel, folio, agencyCode, contract}: IsIHRPayload): Promise<Response<IsIHRResponse>> {
    return this.http.get(
      `/bookings/do-member-payment-panamanian/hotel/${hotel}/folio/${folio}`, {
        params: {
          contract,
          agencyCode
        }
      }
    )
  }
}
