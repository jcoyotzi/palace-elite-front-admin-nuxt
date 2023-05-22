import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import guestsTypes from '../../common/types/guestsTypes'
import {Response} from '../../common/domain/entities/response'
import {GuestsRepository} from '../domain/repositories/guestsRepository'
import {AddGuestPayloadDto} from '../domain/dto/addGuestPayloadDto'
import {AddGuestResponseDto} from '../domain/dto/addGuestResponseDto'
import {Payload} from '../../common/domain/entities/payload'

@injectable()
class AddGuestUseCase
  implements UseCase<Payload<AddGuestPayloadDto>, Response<AddGuestResponseDto>>
{
  constructor(
    @inject(guestsTypes.guestsRepository)
    private readonly guestsRepository: GuestsRepository
  ) {}

  async run(payload: Payload<AddGuestPayloadDto>): Promise<Response<AddGuestResponseDto>> {
    return await this.guestsRepository.addGuest(payload)
  }
}

export default AddGuestUseCase
