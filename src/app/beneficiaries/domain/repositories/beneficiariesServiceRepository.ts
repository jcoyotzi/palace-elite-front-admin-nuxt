import {inject, injectable} from 'inversify'
import {BeneficiarieDTO} from '../dto/beneficiarieDTO'
import BeneficiarieParamsDTO from '../dto/beneficiarieParamsDTO'
import {SaveBeneficiaryPayloadDto} from '../dto/saveBeneficiaryPayloadDto'
import {SaveBeneficiaryResponseDto} from '../dto/saveBeneficiaryResponseDto'
import {BeneficiariesRepository} from './beneficiariesRepository'
import httpTypes from '~/src/app/common/types/httpTypes'
import {Payload} from '~/src/app/common/domain/entities/payload'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
import {Response} from '~/src/app/network/common/domain/entity/response'

@injectable()
export default class BeneficiariesServiceRepository implements BeneficiariesRepository {
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly http: HttpApi) {}

  getBeneficiaries(payload: BeneficiarieParamsDTO): Promise<Response<BeneficiarieDTO[]>> {
    return this.http.get(
      `/membership/beneficiaries/application/${payload.application}/company/${payload.company}?isNational=${payload.isNational}`
    )
  }

  saveBeneficiary(
    data: Payload<SaveBeneficiaryPayloadDto>
  ): Promise<Response<SaveBeneficiaryResponseDto>> {
    return this.http.post('/membership/save-profile-details', data)
  }
}
