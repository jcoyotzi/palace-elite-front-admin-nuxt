import {Response} from 'app/common/domain/entities/response'
import {AddCompanionResponseDto} from 'app/companion/domain/dto/addCompanionResponseDto'
import {AddCompanionPayloadDto} from 'app/companion/domain/dto/addCompanionPayloadDto'
import {Payload} from 'app/network/common/domain/entity/payload'

export interface CompanionRepository {
  addCompanion(
    params: Payload<AddCompanionPayloadDto>
  ): Promise<Response<AddCompanionResponseDto[]>>
}
