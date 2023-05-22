import {inject, injectable} from 'inversify'
import {CompanionRepository} from 'app/companion/domain/repositories/companionRepository'
import {AddCompanionResponseDto} from 'app/companion/domain/dto/addCompanionResponseDto'
import {AddCompanionPayloadDto} from 'app/companion/domain/dto/addCompanionPayloadDto'
import httpTypes from 'app/common/types/httpTypes'
import {HttpApi} from 'app/network/common/domain/entity/httpApi'
import {Response} from 'app/common/domain/entities/response'
import {Payload} from 'app/network/common/domain/entity/payload'

@injectable()
export default class CompanionServiceRepository implements CompanionRepository {
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly http: HttpApi) {}

  addCompanion(
    params: Payload<AddCompanionPayloadDto>
  ): Promise<Response<AddCompanionResponseDto[]>> {
    const {application, ...data} = params.data!
    return this.http.post(`/membership/huesped-invitado/application/${application}`, {
      data
    })
  }
}
