import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import beneficiaryType from '../../common/types/beneficiaryType'
import {Response} from '../../common/domain/entities/response'
import {Payload} from '../../common/domain/entities/payload'
import {BeneficiariesRepository} from '../domain/repositories/beneficiariesRepository'
import {SaveBeneficiaryPayloadDto} from '../domain/dto/saveBeneficiaryPayloadDto'
import {SaveBeneficiaryResponseDto} from '../domain/dto/saveBeneficiaryResponseDto'

@injectable()
class SaveBeneficiaryUseCase
  implements UseCase<Payload<SaveBeneficiaryPayloadDto>, Response<SaveBeneficiaryResponseDto>>
{
  constructor(
    @inject(beneficiaryType.beneficiariesRepository)
    private readonly beneficiariesRepository: BeneficiariesRepository
  ) {}

  async run(
    data: Payload<SaveBeneficiaryPayloadDto>
  ): Promise<Response<SaveBeneficiaryResponseDto>> {
    return await this.beneficiariesRepository.saveBeneficiary(data)
  }
}

export default SaveBeneficiaryUseCase
