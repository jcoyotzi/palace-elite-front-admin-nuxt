import OfferPageDto from '../dto/offerPageDto'
import {PropertiesDto} from '../dto/propertiesDto'
import {Response} from '@/src/app/common/domain/entities/response'

export interface OfferRepository {
  getOfferPage(): Promise<Response<OfferPageDto>>
  getProperties(): Promise<Response<PropertiesDto>>
}
