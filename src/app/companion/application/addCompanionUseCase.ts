import {inject, injectable} from 'inversify'
import UseCase from 'app/common/application/UseCase'
import {Payload} from 'app/network/common/domain/entity/payload'
import {AddCompanionPayloadDto} from 'app/companion/domain/dto/addCompanionPayloadDto'
import {Response} from 'app/common/domain/entities/response'
import {AddCompanionResponseDto} from 'app/companion/domain/dto/addCompanionResponseDto'
import companionTypes from 'app/common/types/companionTypes'
import {CompanionRepository} from 'app/companion/domain/repositories/companionRepository'

@injectable()
export default class AddCompanionUseCase
  implements UseCase<Payload<AddCompanionPayloadDto>, Promise<Response<AddCompanionResponseDto[]>>>
{
  constructor(
    @inject(companionTypes.companionRepository)
    private readonly companionRepository: CompanionRepository
  ) {}

  async run(
    port: Payload<AddCompanionPayloadDto>
  ): Promise<Promise<Response<AddCompanionResponseDto[]>>> {
    return await this.companionRepository.addCompanion(port)
  }
}
