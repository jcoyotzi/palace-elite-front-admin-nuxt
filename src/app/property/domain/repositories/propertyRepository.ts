import {PropertyDto} from '../dto/propertyDto'
import {Response} from '@/src/app/common/domain/entities/response'

export interface PropertyRepository {
  get(locale: string): Promise<Response<PropertyDto>>
}
