import {Response} from '@/src/app/common/domain/entities/response'
import { GetTermsAndConditionsDto } from '~/src/app/bookings/domain/dto/getTermsAndConditionsDto'
import { GetModalAndContentDto } from '../dto/modalAndContentDto'

export interface ModalAndContentRepository {
  getModal(code: string): Promise<Response<GetModalAndContentDto>>
}