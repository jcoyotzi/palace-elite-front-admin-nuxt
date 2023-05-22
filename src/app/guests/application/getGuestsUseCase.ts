import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import guestsTypes from '../../common/types/guestsTypes'
import {Response} from '../../common/domain/entities/response'
import {Payload} from '../../common/domain/entities/payload'
import {GetGuestsPayloadDto} from '../domain/dto/getGuestsPayloadDto'
import {GuestsRepository} from '../domain/repositories/guestsRepository'
import {GetGuestsResponseDto} from '../domain/dto/getGuestsResponseDto'

@injectable()
class GetGuestsUseCase
  implements UseCase<Payload<GetGuestsPayloadDto>, Response<GetGuestsResponseDto>>
{
  constructor(
    @inject(guestsTypes.guestsRepository)
    private readonly guestsRepository: GuestsRepository
  ) {}

  async run(params: Payload<GetGuestsPayloadDto>): Promise<Response<GetGuestsResponseDto>> {
    return await this.guestsRepository.getGuests(params)
  }
}

export default GetGuestsUseCase
