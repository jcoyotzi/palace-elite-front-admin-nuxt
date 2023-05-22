import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import guestsTypes from '../../common/types/guestsTypes'
import {Response} from '../../common/domain/entities/response'
import {Payload} from '../../common/domain/entities/payload'
import {GuestsRepository} from '../domain/repositories/guestsRepository'
import {SaveGuestPayloadDto} from '../domain/dto/saveGuestPayloadDto'
import {SaveGuestResponseDto} from '../domain/dto/saveGuestResponseDto'

@injectable()
class SaveGuestUseCase
  implements UseCase<Payload<SaveGuestPayloadDto>, Response<SaveGuestResponseDto>>
{
  constructor(
    @inject(guestsTypes.guestsRepository)
    private readonly guestsRepository: GuestsRepository
  ) {}

  async run(data: Payload<SaveGuestPayloadDto>): Promise<Response<SaveGuestResponseDto>> {
    return await this.guestsRepository.saveGuest(data)
  }
}

export default SaveGuestUseCase
