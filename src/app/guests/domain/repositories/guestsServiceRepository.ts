import {injectable, inject} from 'inversify'
import {GetGuestsPayloadDto} from '../dto/getGuestsPayloadDto'
import {GetGuestsResponseDto} from '../dto/getGuestsResponseDto'
import {SaveGuestPayloadDto} from '../dto/saveGuestPayloadDto'
import {SaveGuestResponseDto} from '../dto/saveGuestResponseDto'
import {AddGuestResponseDto} from '../dto/addGuestResponseDto'
import {AddGuestPayloadDto} from '../dto/addGuestPayloadDto'
import {GuestsRepository} from './guestsRepository'
import httpTypes from '~/src/app/common/types/httpTypes'
import {Response} from '~/src/app/common/domain/entities/response'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
import {Payload} from '~/src/app/common/domain/entities/payload'

@injectable()
class GuestsServiceRepository implements GuestsRepository {
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly http: HttpApi) {}

  getGuests(params: Payload<GetGuestsPayloadDto>): Promise<Response<GetGuestsResponseDto>> {
    const {application, company, isNational} = params?.params!

    return this.http.get(
      `/membership/guests/aplication/${application}/company/${company}?isNational=${isNational}`
    )
  }

  saveGuest(data: Payload<SaveGuestPayloadDto>): Promise<Response<SaveGuestResponseDto>> {
    return this.http.post('/membership/save-profile-details', data)
  }

  addGuest(payload: Payload<AddGuestPayloadDto>): Promise<Response<AddGuestResponseDto>> {
    return this.http.post('/membership/guest-and-social-network', payload)
  }
}

export default GuestsServiceRepository
