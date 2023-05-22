import {injectable, inject} from 'inversify'
import {GetOwnersPayloadDto} from '../dto/getOwnersPayloadDto'
import {GetOwnersResponseDto} from '../dto/getOwnersResponseDto'
import {PinPayload} from '../entities/pinPayload'
import {PinResponseDto} from '../dto/pinResponseDto'
import {SaveOwnerPayloadDto} from '../dto/saveOwnerPayloadDto'
import {SaveOwnerResponseDto} from '../dto/saveOwnerResponseDto'
import {ValidatePinPayloadDto} from '../dto/validatePinPayloadDto'
import {OwnersRepository} from './ownersRepository'
import httpTypes from '~/src/app/common/types/httpTypes'
import {Response} from '~/src/app/common/domain/entities/response'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
import {Payload} from '~/src/app/common/domain/entities/payload'

@injectable()
class OwnersServiceRepository implements OwnersRepository {
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly http: HttpApi) {}

  getOwners(params: Payload<GetOwnersPayloadDto>): Promise<Response<GetOwnersResponseDto>> {
    return this.http.get('/membership/owners', params)
  }

  savePin(payload: PinPayload): Promise<Response<PinResponseDto>> {
    return this.http.post(`/membership/password-action/${payload.action}/application/${payload.application}/company/${payload.company}?request.isNational=${payload.isNational}`,
      payload.payload
    )
  }

  saveOwner(data: Payload<SaveOwnerPayloadDto>): Promise<Response<SaveOwnerResponseDto>> {
    return this.http.post('/membership/save-profile-details', data)
  }

  validatePin(data: Payload<ValidatePinPayloadDto>): Promise<Response<boolean>> {
    return this.http.post('/membership/validate/password', data)
  }
}

export default OwnersServiceRepository
