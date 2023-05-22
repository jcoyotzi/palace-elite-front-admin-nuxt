/* Definición de interfaz para Repositorio */

import {AddGuestResponseDto} from '../dto/addGuestResponseDto'
import {GetGuestsPayloadDto} from '../dto/getGuestsPayloadDto'
import {GetGuestsResponseDto} from '../dto/getGuestsResponseDto'
import {SaveGuestPayloadDto} from '../dto/saveGuestPayloadDto'
import {SaveGuestResponseDto} from '../dto/saveGuestResponseDto'
import {AddGuestPayloadDto} from '../dto/addGuestPayloadDto'
import {Response} from '@/src/app/common/domain/entities/response'
import {Payload} from '~/src/app/common/domain/entities/payload'

export interface GuestsRepository {
  getGuests(payload: Payload<GetGuestsPayloadDto>): Promise<Response<GetGuestsResponseDto>>
  saveGuest(payload: Payload<SaveGuestPayloadDto>): Promise<Response<SaveGuestResponseDto>>
  addGuest(payload: Payload<AddGuestPayloadDto>): Promise<Response<AddGuestResponseDto>>
}
