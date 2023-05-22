import {Response} from '../../../common/domain/entities/response'
import {CategoryDto} from '../dto/categoryDto'

export interface CategoryRepository {
  get(hotelCode: string, page: number, locale: string, pageSize?: number): Promise<Response<CategoryDto>>
}
