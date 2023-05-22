import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import ownersTypes from '../../common/types/ownersTypes'
import {Response} from '../../common/domain/entities/response'
import {Payload} from '../../common/domain/entities/payload'
import {OwnersRepository} from '../domain/repositories/ownersRepository'
import {SaveOwnerPayloadDto} from '../domain/dto/saveOwnerPayloadDto'
import {SaveOwnerResponseDto} from '../domain/dto/saveOwnerResponseDto'

@injectable()
export class SaveOwnerUseCase
implements UseCase<Payload<SaveOwnerPayloadDto>, Response<SaveOwnerResponseDto>>
{
  constructor(
    @inject(ownersTypes.ownersRepository)
    private readonly ownersRepository: OwnersRepository
  ) {}

  async run(data: Payload<SaveOwnerPayloadDto>): Promise<Response<SaveOwnerResponseDto>> {
    const response = await this.ownersRepository.saveOwner(data)

    // console.log({response})
    return response
  }
}

export default SaveOwnerUseCase
