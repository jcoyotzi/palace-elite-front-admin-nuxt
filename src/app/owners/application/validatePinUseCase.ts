import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import ownersTypes from '../../common/types/ownersTypes'
import {Response} from '../../common/domain/entities/response'
import {Payload} from '../../common/domain/entities/payload'
import {OwnersRepository} from '../domain/repositories/ownersRepository'
import {ValidatePinPayloadDto} from '../domain/dto/validatePinPayloadDto'
import {ValidatePinResponseDto} from '../domain/dto/validatePinResponseDto'

@injectable()
class ValidatePinUseCase
  implements UseCase<Payload<ValidatePinPayloadDto>, Response<ValidatePinResponseDto>>
{
  constructor(
    @inject(ownersTypes.ownersRepository)
    private readonly ownersRepository: OwnersRepository
  ) {}

  async run(data: Payload<ValidatePinPayloadDto>): Promise<Response<ValidatePinResponseDto>> {
    return await this.ownersRepository.validatePin(data)
  }
}

export default ValidatePinUseCase
