import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import ownersTypes from '../../common/types/ownersTypes'
import {Response} from '../../common/domain/entities/response'
import {Payload} from '../../common/domain/entities/payload'
import {GetOwnersPayloadDto} from '../domain/dto/getOwnersPayloadDto'
import {OwnersRepository} from '../domain/repositories/ownersRepository'
import {GetOwnersResponseDto} from '../domain/dto/getOwnersResponseDto'

@injectable()
class GetOwnersUseCase
implements UseCase<Payload<GetOwnersPayloadDto>, Response<GetOwnersResponseDto>>
{
  constructor(
    @inject(ownersTypes.ownersRepository)
    private readonly ownersRepository: OwnersRepository
  ) {}

  async run(params: Payload<GetOwnersPayloadDto>): Promise<Response<GetOwnersResponseDto>> {
    return await this.ownersRepository.getOwners(params)
  }
}

export default GetOwnersUseCase
