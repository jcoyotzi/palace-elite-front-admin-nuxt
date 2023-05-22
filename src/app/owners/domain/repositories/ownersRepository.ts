/* Definición de interfaz para Repositorio */

import {ValidatePinPayloadDto} from '../dto/validatePinPayloadDto'
import {ValidatePinResponseDto} from '../dto/validatePinResponseDto'
import {GetOwnersPayloadDto} from '../dto/getOwnersPayloadDto'
import {GetOwnersResponseDto} from '../dto/getOwnersResponseDto'
import {SaveOwnerPayloadDto} from '../dto/saveOwnerPayloadDto'
import {PinResponseDto} from '../dto/pinResponseDto'
import {SaveOwnerResponseDto} from '../dto/saveOwnerResponseDto'
import {PinPayload} from '../entities/pinPayload'
import {Response} from '@/src/app/common/domain/entities/response'
import {Payload} from '~/src/app/common/domain/entities/payload'

export interface OwnersRepository {
  getOwners(payload: Payload<GetOwnersPayloadDto>): Promise<Response<GetOwnersResponseDto>>

  savePin(payload: PinPayload): Promise<Response<PinResponseDto>>

  saveOwner(payload: Payload<SaveOwnerPayloadDto>): Promise<Response<SaveOwnerResponseDto>>

  validatePin(payload: Payload<ValidatePinPayloadDto>): Promise<Response<ValidatePinResponseDto>>
}
