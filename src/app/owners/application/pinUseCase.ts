import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import ownersTypes from '../../common/types/ownersTypes'
import {Response} from '../../common/domain/entities/response'
import {PinResponseDto} from '../domain/dto/pinResponseDto'
import {PinPayload} from '../domain/entities/pinPayload'
import {OwnersRepository} from '../domain/repositories/ownersRepository'

@injectable()
class PinUseCase implements UseCase<PinPayload, Response<PinResponseDto>> {
  constructor(
    @inject(ownersTypes.ownersRepository)
    private readonly ownersRepository: OwnersRepository
  ) {}

  async run(payload: PinPayload): Promise<Response<PinResponseDto>> {
    return await this.ownersRepository.savePin(payload)
  }
}

export default PinUseCase
