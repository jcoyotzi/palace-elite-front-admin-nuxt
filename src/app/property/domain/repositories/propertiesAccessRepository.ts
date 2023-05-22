import {PropertyAccessDto} from '../dto/PropertyAccessDto/PropertyAccessDto'
import {PropertyAccessRequestDto} from '../dto/PropertyAccessDto/PropertyAccessRequestDto'
import {Response} from '~/src/app/common/domain/entities/response'

export interface PropertiesAccessRepository {
  get(params: PropertyAccessRequestDto): Promise<Response<PropertyAccessDto>>
}
