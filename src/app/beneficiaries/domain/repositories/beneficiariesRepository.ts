/* Definición de interfaz para Repositorio */

import BeneficiarieParamsDTO from '../dto/beneficiarieParamsDTO'
import {BeneficiarieDTO} from '../dto/beneficiarieDTO'
import {SaveBeneficiaryPayloadDto} from '../dto/saveBeneficiaryPayloadDto'
import {SaveBeneficiaryResponseDto} from '../dto/saveBeneficiaryResponseDto'
import {Response} from '~/src/app/network/common/domain/entity/response'
import {Payload} from '~/src/app/common/domain/entities/payload'

export interface BeneficiariesRepository {
  getBeneficiaries(payload: BeneficiarieParamsDTO): Promise<Response<BeneficiarieDTO[]>>
  saveBeneficiary(
    payload: Payload<SaveBeneficiaryPayloadDto>
  ): Promise<Response<SaveBeneficiaryResponseDto>>
}
